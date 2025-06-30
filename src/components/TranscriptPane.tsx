"use client";

import React, { FC, useRef, useEffect } from "react";
import { MessageBubble, Message } from "@/components/MessageBubble";
import { RotateCcw, Mic, MicOff, Pause, AlertTriangle, Phone } from "lucide-react";
import { useConversation } from "@elevenlabs/react";
import { useCallback, useState } from "react";
import Waveform from "@/components/Waveform";
import { LessonIntroCard } from "@/components/LessonIntroCard";
import './TranscriptPane.css';
import { useLesson } from '@/contexts/LessonContext';
import { useSession } from '@/contexts/SessionContext';
import { CongratsBanner } from '@/components/CongratsBanner';

interface TranscriptPaneProps {
  duration: string;
  setDuration: (duration: string) => void;
  onRestart?: () => void;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

export const TranscriptPane: FC<TranscriptPaneProps> = ({ duration, setDuration, onRestart, messages, setMessages }) => {
  const lesson = useLesson();
  const { addMessage, endLesson } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [showIntroCard, setShowIntroCard] = useState(true);
  const [isAISpeaking, setIsAISpeaking] = useState(false);
  const [isUserSpeaking, setIsUserSpeaking] = useState(false);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [showPauseDialog, setShowPauseDialog] = useState(false);
  const [showMicDialog, setShowMicDialog] = useState(false);
  const [showCongratsBanner, setShowCongratsBanner] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const userEndedRef = useRef(false);
  
  const conversation = useConversation({
    onConnect: () => {
      console.log("🟢 ElevenLabs: connected");
      setIsLoading(false);
      setStartTime(new Date());
    },
    onDisconnect: () => {
      console.log("🔴 ElevenLabs: disconnected");
      setIsLoading(false);
      setStartTime(null);
      setIsAISpeaking(false);
      setIsUserSpeaking(false);
      // Clean up audio context
      if (audioContext) {
        audioContext.close();
        setAudioContext(null);
        setAnalyser(null);
        // Stop microphone tracks if any
        if (mediaStream) {
          mediaStream.getTracks().forEach((t) => t.stop());
          setMediaStream(null);
        }
      }

      // If the session was ended by the user, navigation has already happened.
      // Otherwise (AI-initiated end) show the Congrats banner and wait for user action.
      if (userEndedRef.current) {
        // Reset flag for next sessions
        userEndedRef.current = false;
        navigateToFeedback();
      } else {
        setShowCongratsBanner(true);
      }
    },
    onMessage: (messageData: any) => {
      console.log('📝 ElevenLabs onMessage - Raw data:', messageData);
      console.log('📝 ElevenLabs onMessage - Type:', typeof messageData);
      console.log('📝 ElevenLabs onMessage - Keys:', messageData && typeof messageData === 'object' ? Object.keys(messageData) : 'not an object');
      
      // Try to extract message and source from whatever format we get
      let message: string = '';
      let source: 'user' | 'ai' = 'ai';
      
      // Handle string directly
      if (typeof messageData === 'string') {
        message = messageData;
        source = 'ai';
      }
      // Handle object with message property
      else if (messageData && typeof messageData === 'object') {
        if (messageData.message) {
          message = messageData.message;
          source = messageData.source || messageData.from || 'ai';
        } else if (messageData.text) {
          message = messageData.text;
          source = messageData.source || messageData.from || 'ai';
        } else {
          // Log the structure so we can see what we're getting
          console.log('📝 Unknown message structure:', JSON.stringify(messageData, null, 2));
          return;
        }
      } else {
        console.log('📝 Unexpected message type:', typeof messageData, messageData);
        return;
      }
      
      if (!message) {
        console.log('📝 No message text found in:', messageData);
        return;
      }
      
      const newMessage: Message = {
        id: `${source}-${Date.now()}`,
        from: source,
        text: message,
        time: new Date().toLocaleTimeString('en-US', {
          hour12: true,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
      };
      
      console.log('📝 Adding message to state:', newMessage);
      setMessages(prev => [...prev, newMessage]);
      addMessage({ role: source === 'user' ? 'user' : 'assistant', content: message });
    },
    onError: (err: any) => {
      console.error("❌ ElevenLabs error", err);
      setIsLoading(false);
    },
  });

  // Auto-scroll to bottom when new messages appear
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Update duration timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (startTime) {
      interval = setInterval(() => {
        const now = new Date();
        const diff = Math.floor((now.getTime() - startTime.getTime()) / 1000);
        const minutes = Math.floor(diff / 60);
        const seconds = diff % 60;
        setDuration(`${minutes}:${seconds.toString().padStart(2, '0')}`);
      }, 1000);
    }
    
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [startTime]);

  const startConversation = useCallback(async () => {
    try {
      console.log('🚀 Starting conversation with agentId:', lesson.agentId);
      setIsLoading(true);
      // Clear messages when starting a new conversation
      setMessages([]);
      setDuration("0:00");
      setShowIntroCard(false);
      
      // Get user media and set up audio analysis
      console.log('🎤 Requesting microphone access...');
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setMediaStream(stream);
      console.log('🎤 Microphone access granted');
      
      // Set up audio context for microphone activity detection
      const context = new (window.AudioContext || (window as any).webkitAudioContext)();
      const source = context.createMediaStreamSource(stream);
      const analyserNode = context.createAnalyser();
      analyserNode.fftSize = 256;
      source.connect(analyserNode);
      
      setAudioContext(context);
      setAnalyser(analyserNode);
      
      console.log('🔌 Starting ElevenLabs session...');
      
      // Debug: Log conversation object properties
      console.log('🔍 Conversation object properties:', Object.getOwnPropertyNames(conversation));
      console.log('🔍 Conversation prototype methods:', Object.getOwnPropertyNames(Object.getPrototypeOf(conversation)));
      
      const sessionId = await conversation.startSession({
        agentId: lesson.agentId,
      });
      
      console.log('📋 Session ID:', sessionId);
      console.log('✅ ElevenLabs session started successfully');
      
      // Debug: Check what's actually available on the conversation object after connection
      setTimeout(() => {
        console.log('🔍 Post-connection conversation status:', conversation.status);
        console.log('🔍 Post-connection conversation isSpeaking:', conversation.isSpeaking);
        console.log('🔍 Available conversation methods:', Object.getOwnPropertyNames(conversation).filter(prop => typeof (conversation as any)[prop] === 'function'));
      }, 1000);
    } catch (err) {
      console.error("❌ Failed to start ElevenLabs conversation", err);
      setIsLoading(false);
    }
  }, [conversation, lesson]);

  const hasNavigatedRef = useRef(false);

  const navigateToFeedback = useCallback(() => {
    if (hasNavigatedRef.current) return;
    hasNavigatedRef.current = true;
    endLesson();
  }, [endLesson]);

  const stopConversation = useCallback(async () => {
    // Mark that this termination came from the user so onDisconnect knows.
    userEndedRef.current = true;
    await conversation.endSession();

    // Stop mic tracks for safety but KEEP transcript state so feedback page has it
    if (mediaStream) {
      mediaStream.getTracks().forEach((t) => t.stop());
      setMediaStream(null);
    }

    navigateToFeedback();
  }, [conversation, mediaStream, navigateToFeedback]);

  const restartTranscript = useCallback(() => {
    // Only clear messages and reset state, don't start new session
    setMessages([]);
    setDuration("0:00");
    setStartTime(null);
    setShowIntroCard(true);
    if (onRestart) {
      onRestart();
    }
  }, [onRestart]);

  const isConnected = conversation.status === "connected";
  
  // Use ElevenLabs SDK's built-in isSpeaking to determine AI speaking state
  const isAgentSpeaking = conversation.isSpeaking || false;
  
  // Debug log for conversation status
  React.useEffect(() => {
    console.log('🔄 Conversation status changed:', conversation.status);
  }, [conversation.status]);
  
  // Update our local state based on the SDK's isSpeaking
  React.useEffect(() => {
    console.log('🗣️ Agent speaking state changed:', isAgentSpeaking);
    if (isAgentSpeaking) {
      setIsAISpeaking(true);
      setIsUserSpeaking(false);
    } else {
      setIsAISpeaking(false);
    }
  }, [isAgentSpeaking]);

  // Microphone activity detection
  useEffect(() => {
    if (!analyser || !audioContext) return;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    let animationFrame: number;

    const detectActivity = () => {
      analyser.getByteFrequencyData(dataArray);
      
      // Calculate average volume
      const sum = dataArray.reduce((a, b) => a + b, 0);
      const average = sum / bufferLength;
      
      // Threshold for detecting speech (adjust as needed)
      const threshold = 20;
      
      // Only set user speaking if AI is not speaking
      if (!isAgentSpeaking) {
        setIsUserSpeaking(average > threshold);
      }
      
      animationFrame = requestAnimationFrame(detectActivity);
    };

    detectActivity();

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [analyser, audioContext, isAgentSpeaking]);

  const handleReportClick = () => {
    setShowReportDialog(true);
    // Auto-close after 2 seconds
    setTimeout(() => {
      setShowReportDialog(false);
    }, 2000);
  };

  const handlePauseClick = () => {
    if (isConnected) {
      setShowPauseDialog(true);
      // Auto-close after 2 seconds
      setTimeout(() => {
        setShowPauseDialog(false);
      }, 2000);
    }
  };

  const handleMicClick = () => {
    if (isConnected) {
      setShowMicDialog(true);
      // Auto-close after 2 seconds
      setTimeout(() => {
        setShowMicDialog(false);
      }, 2000);
    }
  };

  const handleSeeFeedback = useCallback(() => {
    setShowCongratsBanner(false);
    navigateToFeedback();
  }, [navigateToFeedback]);

  return (
  <section className="transcript-pane">
    {/* Header */}
    <div className="transcript-header">
      <div className="transcript-header-content">
        <h3>Lesson Transcript</h3>
        <p>Duration: {duration}</p>
      </div>

      {/* situation pill */}
      <span className="transcript-situation-pill">
        Situation 1/3
      </span>
    </div>

    {/* Scrollable region */}
    <div
      ref={scrollRef}
      role="log"
      className="transcript-content"
    >
      {messages.length === 0 && showIntroCard ? (
        <div className="transcript-intro-container">
          <LessonIntroCard
            illustration={<img src="/LessonIntro.png" alt="Lesson illustration" className="transcript-intro-illustration" />}
            points={lesson.points}
            minutes={lesson.durationMins}
            title={lesson.title}
            module={lesson.module}
            paragraphs={lesson.intro.paragraphs}
            onStart={startConversation}
          />
        </div>
      ) : messages.length === 0 && !showIntroCard ? (
        // No placeholder text when intro card hidden and no messages
        <></>
      ) : (
        (() => {
          console.log('🎨 Rendering messages:', messages.length, messages);
          return messages.map((m) => (
            <MessageBubble key={m.id} message={m} />
          ));
        })()
      )}
    </div>

    {/* Bottom toolbar with lesson controls */}
    <footer className="transcript-footer">
      {/* Left: Restart button */}
      <button 
        onClick={restartTranscript}
        disabled={isLoading}
        className="transcript-toolbar-button"
      >
        <RotateCcw className="transcript-toolbar-button-icon" />
        <span className="transcript-toolbar-button-text">Restart</span>
      </button>

      {/* Center: Main controls with integrated waveform */}
      <div className="transcript-center-controls">
        {/* Microphone */}
        <button 
          disabled={!isConnected}
          onClick={handleMicClick}
          className={`transcript-mic-button ${
            isConnected 
              ? 'connected' 
              : 'disconnected'
          }`}
        >
          {isConnected ? (
            <Mic className="transcript-mic-icon" />
          ) : (
            <MicOff className="transcript-mic-icon" />
          )}
        </button>

        {/* Start/End Lesson button */}
        <button
          onClick={isConnected ? stopConversation : startConversation}
          disabled={isLoading}
          className={`transcript-lesson-button ${
            isConnected
              ? 'connected'
              : isLoading
              ? 'loading'
              : 'disconnected'
          }`}
        >
          {isConnected && <Phone className="transcript-lesson-button-icon" />}
          <span>{isLoading ? 'Loading...' : (isConnected ? 'End Lesson' : 'Start Lesson')}</span>
        </button>

        {/* Pause */}
        <button 
          disabled={!isConnected}
          onClick={handlePauseClick}
          className={`transcript-mic-button ${
            isConnected 
              ? 'connected' 
              : 'disconnected'
          }`}
        >
          <Pause className="transcript-mic-icon" />
        </button>
      </div>

      {/* Right: Report button */}
      <button className="transcript-toolbar-button" onClick={handleReportClick}>
        <AlertTriangle className="transcript-toolbar-button-icon" />
        <span className="transcript-toolbar-button-text">Report</span>
      </button>

      {/* Congrats banner appears above the waveform when an AI-ended session finishes */}
      {showCongratsBanner && (
        <div className="congrats-banner-wrapper">
          <CongratsBanner onBegin={handleSeeFeedback} />
        </div>
      )}

      <Waveform 
        isAISpeaking={isAISpeaking}
        isUserSpeaking={isUserSpeaking}
      />
    </footer>

    {/* Report Dialog */}
    {showReportDialog && (
      <div className="report-dialog-overlay">
        <div className="report-dialog">
          <div className="report-dialog-content">
            <div className="report-dialog-emoji">😢</div>
            <p className="report-dialog-text">Haven't set this up lol</p>
          </div>
        </div>
      </div>
    )}

    {/* Pause Dialog */}
    {showPauseDialog && (
      <div className="report-dialog-overlay">
        <div className="report-dialog">
          <div className="report-dialog-content">
            <div className="report-dialog-emoji">😢</div>
            <p className="report-dialog-text">Haven't set this up lol</p>
          </div>
        </div>
      </div>
    )}

    {/* Mic Dialog */}
    {showMicDialog && (
      <div className="report-dialog-overlay">
        <div className="report-dialog">
          <div className="report-dialog-content">
            <div className="report-dialog-emoji">😢</div>
            <p className="report-dialog-text">Haven't set this up lol</p>
          </div>
        </div>
      </div>
    )}
  </section>
  );
}; 