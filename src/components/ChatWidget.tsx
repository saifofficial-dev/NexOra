import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquare, X, Send, Bot, User, 
  ChevronDown, Phone, ExternalLink, Loader2, Sparkles
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import Markdown from 'react-markdown';

const WHATSAPP_NUMBER = "923265163629";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;

const NEXORA_CONTEXT = `
You are NexBot, the official AI assistant for NexOra labs. 
NexOra labs is an elite engineering firm specializing in cutting-edge AI and automation solutions.

Our Core Services:
1. Custom AI Agents: We build secure, fine-tuned conversational agents using localized RAG (Retrieval-Augmented Generation) pipelines. Tech: LangChain, OpenAI, Pinecone.
2. Workflow Automation: We eliminate manual data entry by connecting entire tech stacks via intelligent triggers and robotic process automation (RPA). Tech: n8n, Make, Zapier.
3. Web & Mobile Engineering: We develop scalable, blazingly fast full-stack applications with enterprise-grade infrastructure. Tech: Next.js, React Native, AWS, Supabase.
4. AI Voice Infrastructure: We deploy ultra-low-latency voice bots for inbound triage and outbound sales, directly integrated with CRMs. Tech: Twilio, Deepgram, Vapi.

Our Mission:
We engineer bespoke AI solutions to help ambitious firms 10x their operational speed. We are a team of advanced AI researchers and ML engineers obsessed with performance and scalability.

Guidelines for you:
- Be professional, technical yet accessible, and helpful.
- Keep responses concise and focused on how NexOra can solve the user's problem.
- your tone should be sophisticated, data-driven, and forward-thinking.
- If a user asks a highly specific technical question or wants to start a project, encourage them to "Chat with an Engineer" via the WhatsApp link provided in the UI.
- If you don't know something about the company specifically, suggest speaking to a human expert.
`;

interface Message {
  role: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'bot', 
      content: "Hello! I'm NexBot. How can I help you accelerate your operations with AI today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
            { role: 'user', parts: [{ text: NEXORA_CONTEXT + "\n\nUser Question: " + input }] }
        ],
      });

      const botMessage: Message = {
        role: 'bot',
        content: response.text || "I apologize, I'm having trouble connecting to my central processing unit. Please try again or contact our engineers directly via WhatsApp.",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("AI Chat Error:", error);
      const errorMessage: Message = {
        role: 'bot',
        content: "I'm currently experiencing high latency. For immediate assistance, please connect with our engineers via WhatsApp.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-sans flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-6 w-[350px] sm:w-[400px] h-[550px] bg-secondary border border-white/10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col glass"
          >
            {/* Header */}
            <div className="p-4 bg-white/[0.03] border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-neon-blue to-neon-purple p-[1px]">
                  <div className="w-full h-full bg-secondary rounded-xl flex items-center justify-center">
                    <Bot size={20} className="text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm">NexBot</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-[10px] text-text-muted uppercase tracking-widest">Neural Link Latency: 42ms</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-text-muted hover:text-white transition-colors p-1"
                id="close-chat"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: msg.role === 'user' ? 10 : -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] flex items-start gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-lg shrink-0 flex items-center justify-center ${msg.role === 'user' ? 'bg-neon-blue/20' : 'bg-white/5 border border-white/10'}`}>
                      {msg.role === 'user' ? <User size={16} className="text-neon-blue" /> : <Bot size={16} className="text-neon-purple" />}
                    </div>
                    <div className={`p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-neon-blue text-black font-medium' : 'bg-white/5 border border-white/10 text-white/90'}`}>
                        <div className="markdown-body prose prose-invert prose-sm max-w-none">
                            <Markdown>{msg.content}</Markdown>
                        </div>
                    </div>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[85%] flex items-start gap-2">
                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                        <Loader2 size={16} className="text-neon-purple animate-spin" />
                    </div>
                    <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-text-muted text-xs font-mono italic">
                        Synthesizing...
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Footer / Input */}
            <div className="p-4 bg-white/[0.02] border-t border-white/5">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Query NexBot..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm text-white focus:outline-none focus:border-neon-blue transition-colors"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center hover:bg-neon-blue hover:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col items-end gap-3 translate-x-2">
        {!isOpen && (
            <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full flex items-center gap-2 shadow-xl mb-1"
            >
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-mono text-white/70 tracking-widest uppercase">Assistant Online</span>
            </motion.div>
        )}
        
        <motion.button
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className={`
                relative w-20 h-20 rounded-3xl flex items-center justify-center transition-all duration-500 
                shadow-[0_10px_20px_rgba(0,0,0,0.4),inset_0_2px_4px_rgba(255,255,255,0.1)]
                ${isOpen 
                    ? 'bg-white text-black' 
                    : 'bg-[#1a1a1a] border-t border-white/20 text-white'
                }
            `}
            style={{
                perspective: '1000px',
                transformStyle: 'preserve-3d',
            } as any}
            id="chat-toggle"
        >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
            
            <AnimatePresence mode="wait">
            {isOpen ? (
                <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                >
                    <X size={28} />
                </motion.div>
            ) : (
                <motion.div
                    key="msg"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="flex flex-col items-center justify-center w-full h-full"
                >
                    {/* 3D Robotic Animation */}
                    <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-3xl">
                        {React.createElement('dotlottie-wc', {
                            src: "https://lottie.host/c9fb5a79-2fb7-4ed2-bf74-20c84c6013e4/vZoAXODKYO.lottie",
                            autoplay: true,
                            loop: true,
                            style: { width: '100%', height: '100%', transform: 'scale(1.5)' }
                        })}
                        <div className="absolute inset-0 bg-neon-cyan/5 blur-xl rounded-full pointer-events-none" />
                    </div>
                </motion.div>
            )}
            </AnimatePresence>

            {/* Glowing Ring Border Effect */}
            {!isOpen && (
                <div className="absolute inset-0 rounded-3xl border border-white/5 pointer-events-none">
                    <div className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_300deg,#06b6d4_360deg)] animate-[spin_6s_linear_infinite] opacity-30" />
                    <div className="absolute inset-[1px] bg-[#1a1a1a]/40 rounded-[23px] backdrop-blur-[2px]" />
                </div>
            )}
        </motion.button>
      </div>
    </div>
  );
};
