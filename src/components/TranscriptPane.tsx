"use client";

import React, { FC, useRef, useEffect } from "react";
import { MessageBubble, Message } from "@/components/MessageBubble";
import { RotateCcw, Mic, MicOff, Pause, AlertTriangle, Phone } from "lucide-react";
import { useConversation } from "@elevenlabs/react";
import { useCallback, useState } from "react";
import Waveform from "@/components/Waveform";
import { LessonIntroCard } from "@/components/LessonIntroCard";
import './TranscriptPane.css';

interface TranscriptPaneProps {
  duration: string;
  setDuration: (duration: string) => void;
  onRestart?: () => void;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

export const TranscriptPane: FC<TranscriptPaneProps> = ({ duration, setDuration, onRestart, messages, setMessages }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [showIntroCard, setShowIntroCard] = useState(true);
  const [isAISpeaking, setIsAISpeaking] = useState(false);
  const [isUserSpeaking, setIsUserSpeaking] = useState(false);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [showPauseDialog, setShowPauseDialog] = useState(false);
  const [showMicDialog, setShowMicDialog] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  
  const conversation = useConversation({
    onConnect: () => {
      console.log("ElevenLabs: connected");
      setIsLoading(false);
      setStartTime(new Date());
    },
    onDisconnect: () => {
      console.log("ElevenLabs: disconnected");
      setIsLoading(false);
      setStartTime(null);
      setIsAISpeaking(false);
      setIsUserSpeaking(false);
      // Clean up audio context
      if (audioContext) {
        audioContext.close();
        setAudioContext(null);
        setAnalyser(null);
      }
    },
    onMessage: (msg) => {
      console.log("ElevenLabs message", msg);
      console.log("Message source:", msg.source); // Debug: see what source values we get
      
      // Handle messages from ElevenLabs React SDK
      const newMessage: Message = {
        id: `${msg.source}-${Date.now()}`,
        from: msg.source === 'ai' ? 'ai' : 'user',
        text: msg.message,
        time: new Date().toLocaleTimeString('en-US', { 
          hour12: true, 
          hour: '2-digit', 
          minute: '2-digit', 
          second: '2-digit' 
        }),
      };
      setMessages(prev => [...prev, newMessage]);

    },
    onError: (err) => {
      console.error("ElevenLabs error", err);
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
      setIsLoading(true);
      // Clear messages when starting a new conversation
      setMessages([]);
      setDuration("0:00");
      setShowIntroCard(false);
      
      // Get user media and set up audio analysis
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Set up audio context for microphone activity detection
      const context = new (window.AudioContext || (window as any).webkitAudioContext)();
      const source = context.createMediaStreamSource(stream);
      const analyserNode = context.createAnalyser();
      analyserNode.fftSize = 256;
      source.connect(analyserNode);
      
      setAudioContext(context);
      setAnalyser(analyserNode);
      
      await conversation.startSession({
        agentId: process.env.NEXT_PUBLIC_ELEVEN_AGENT_ID!,
      });
    } catch (err) {
      console.error("Failed to start ElevenLabs conversation", err);
      setIsLoading(false);
    }
  }, [conversation]);

  const stopConversation = useCallback(async () => {
    await conversation.endSession();
    // After ending, restart the lesson like the restart button
    setMessages([]);
    setDuration("0:00");
    setStartTime(null);
    setShowIntroCard(true);
    if (onRestart) {
      onRestart();
    }
  }, [conversation, onRestart]);

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
  
  // Update our local state based on the SDK's isSpeaking
  React.useEffect(() => {
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
            points={25}
            minutes={25}
            title="Handling Missing Baggage Claims"
            module="United Customer Care - Baggage"
            paragraphs={[
              "The customer is calling to report that their baggage has not arrived at their destination.",
              "The customer got off their flight and their baggage did not arrive with them. They need to be assisted with steps regarding the claim process.",
              "They have a connecting flight in 2 hours, so you will need to handle a transfer. They are frustrated and want to know what to do next."
            ]}
            onStart={startConversation}
          />
        </div>
      ) : messages.length === 0 && !showIntroCard ? (
        // No placeholder text when intro card hidden and no messages
        <></>
      ) : (
        messages.map((m) => (
          <MessageBubble key={m.id} message={m} />
        ))
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

      {/* Waveform UI - integrated into footer */}
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