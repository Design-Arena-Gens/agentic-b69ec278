"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MdArrowBack, MdSend, MdMic, MdTranslate, MdSearch } from "react-icons/md";

interface Message {
  id: number;
  type: "user" | "ai";
  content: string;
  timestamp: string;
}

export default function AIAssistantPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "ai",
      content: "Hello! I'm your AI assistant. I can help you with voice-to-text, translation between Hindi and English, answer your questions, and help you search. How can I assist you today?",
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<"en" | "hi">("en");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      const userMessage: Message = {
        id: Date.now(),
        type: "user",
        content: inputText,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages([...messages, userMessage]);

      // Simulate AI response
      setTimeout(() => {
        const aiResponse: Message = {
          id: Date.now() + 1,
          type: "ai",
          content: getAIResponse(inputText),
          timestamp: new Date().toLocaleTimeString(),
        };
        setMessages((prev) => [...prev, aiResponse]);
      }, 1000);

      setInputText("");
    }
  };

  const getAIResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();

    if (lowerInput.includes("route") || lowerInput.includes("traffic")) {
      return "For current traffic conditions, I recommend using Google Maps. The best time to travel is usually early morning (5-7 AM) or late evening (10 PM onwards) to avoid heavy traffic.";
    } else if (lowerInput.includes("fuel") || lowerInput.includes("petrol")) {
      return "Current average petrol price in India is around ₹100-105 per liter. For better fuel efficiency, maintain steady speed, keep tires properly inflated, and avoid sudden acceleration.";
    } else if (lowerInput.includes("earning") || lowerInput.includes("income")) {
      return "To maximize your earnings: 1) Work during peak hours (8-10 AM, 6-9 PM), 2) Know the busy areas in your city, 3) Keep your vehicle clean, 4) Provide excellent customer service.";
    } else if (lowerInput.includes("translate") || lowerInput.includes("hindi")) {
      return "I can help translate between Hindi and English. Just type your text and select the language option. For example: 'Mujhe airport jaana hai' translates to 'I need to go to the airport'.";
    } else {
      return "I'm here to help! You can ask me about routes, traffic, fuel prices, earning tips, or request translations between Hindi and English. What would you like to know?";
    }
  };

  const handleVoiceInput = () => {
    setIsListening(!isListening);
    // In a real app, this would integrate with Web Speech API or Gemini API
    if (!isListening) {
      alert("Voice input would be activated here using Gemini API for voice-to-text conversion.");
    }
  };

  const quickActions = [
    { icon: <MdTranslate />, label: "Translate", action: "translate" },
    { icon: <MdSearch />, label: "Search Routes", action: "search" },
    { icon: <MdMic />, label: "Voice Input", action: "voice" },
  ];

  const handleQuickAction = (action: string) => {
    if (action === "translate") {
      setInputText("Please translate: ");
    } else if (action === "search") {
      setInputText("Show me the best route to ");
    } else if (action === "voice") {
      handleVoiceInput();
    }
  };

  return (
    <div className="min-h-screen bg-light flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
            >
              <MdArrowBack className="text-2xl" />
            </button>
            <div>
              <h1 className="text-2xl font-bold">AI Assistant</h1>
              <p className="text-sm opacity-90">Powered by Gemini AI</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setSelectedLanguage("en")}
              className={`px-3 py-1 rounded-full text-sm font-semibold transition-colors ${
                selectedLanguage === "en" ? "bg-white text-pink-500" : "bg-white bg-opacity-20"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setSelectedLanguage("hi")}
              className={`px-3 py-1 rounded-full text-sm font-semibold transition-colors ${
                selectedLanguage === "hi" ? "bg-white text-pink-500" : "bg-white bg-opacity-20"
              }`}
            >
              हिं
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex space-x-3 overflow-x-auto">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={() => handleQuickAction(action.action)}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-full shadow-md hover:shadow-lg transition-all active:scale-95 whitespace-nowrap"
            >
              <span className="text-lg">{action.icon}</span>
              <span className="text-sm font-semibold">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] p-4 rounded-2xl shadow-md ${
                message.type === "user"
                  ? "bg-gradient-to-r from-primary to-secondary text-white"
                  : "bg-white text-gray-800"
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <p
                className={`text-xs mt-2 ${
                  message.type === "user" ? "text-white text-opacity-75" : "text-gray-500"
                }`}
              >
                {message.timestamp}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 p-4">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
          <button
            type="button"
            onClick={handleVoiceInput}
            className={`p-3 rounded-full transition-all active:scale-95 ${
              isListening
                ? "bg-red-500 text-white animate-pulse"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            <MdMic className="text-2xl" />
          </button>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={
              selectedLanguage === "en"
                ? "Type your message..."
                : "अपना संदेश लिखें..."
            }
            className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-full focus:border-primary focus:outline-none"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="p-3 bg-gradient-to-r from-primary to-secondary text-white rounded-full shadow-md hover:shadow-lg transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <MdSend className="text-2xl" />
          </button>
        </form>
      </div>
    </div>
  );
}
