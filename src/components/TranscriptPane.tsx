"use client";

import { FC, useRef, useEffect } from "react";
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
}

export const TranscriptPane: FC<TranscriptPaneProps> = ({ duration, setDuration, onRestart }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [showIntroCard, setShowIntroCard] = useState(true);

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
    },
    onMessage: (msg) => {
      console.log("ElevenLabs message", msg);
      
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
      await navigator.mediaDevices.getUserMedia({ audio: true });
      await conversation.startSession({
        agentId: process.env.NEXT_PUBLIC_ELEVEN_AGENT_ID || "YOUR_AGENT_ID",
      });
    } catch (err) {
      console.error("Failed to start ElevenLabs conversation", err);
      setIsLoading(false);
    }
  }, [conversation]);

  const stopConversation = useCallback(async () => {
    await conversation.endSession();
  }, [conversation]);

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
            title="Customer needs to consult with their spouse"
            module="Handling Customer Objections"
            paragraphs={[
              "The customer needs to consult their spouse before making a decision about the purchase.",
              "The customer is interested in a United Platinum tier for their family. They are a frequent traveler with United. You have offered them it at a $59.99 / month price.",
              "The customer has explained their needs, but now has asked for more time to consult with their spouse. How should you respond to keep the deal alive?"
            ]}
            /* Removed Begin Lesson CTA; conversation can be started via toolbar */
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
      <button className="transcript-toolbar-button">
        <AlertTriangle className="transcript-toolbar-button-icon" />
        <span className="transcript-toolbar-button-text">Report</span>
      </button>

      {/* Waveform UI - integrated into footer */}
      <Waveform isRecording={isConnected} audioLevel={0.5} />
    </footer>
  </section>
  );
}; 