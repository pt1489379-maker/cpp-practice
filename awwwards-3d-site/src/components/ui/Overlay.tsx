"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function Overlay() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 0, 0, 1]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  
  const [messages, setMessages] = useState([
    { role: "ai", content: "System initialized. I am your creative AI assistant. What crazy idea are we building today?" }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isModalOpen) {
      scrollToBottom();
    }
  }, [messages, isModalOpen]);

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);

    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: "ai", 
        content: `Analyzing parameters for "${userMessage}"... Generating 3D coordinates. (Note: I am a visual prototype. Connect me to the Google Gemini API to unlock real capabilities!)` 
      }]);
    }, 1000);
  };

  return (
    <div className="absolute top-0 left-0 w-full z-10 pointer-events-none">
      <nav className="fixed top-0 left-0 w-full p-8 flex justify-between items-center mix-blend-difference pointer-events-auto">
        <div className="text-2xl font-bold tracking-tighter"></div>
        <div className="flex gap-8 text-sm uppercase tracking-widest hidden md:flex">
          <button onClick={() => setIsContactOpen(true)} className="hover:text-gray-400 transition-colors uppercase cursor-pointer">Help</button>
        </div>
      </nav>

      <section className="h-screen flex flex-col justify-center px-12 md:px-24">
        <motion.h1 
          className="text-4xl md:text-6xl font-extrabold tracking-tighter text-gradient pb-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          INNOVATE.<br />
          ELEVATE.<br />
          CREATE.
        </motion.h1>

      </section>

      <section id="work" className="h-[200vh] flex items-center justify-center relative">
        <motion.div 
          className="glass p-12 rounded-3xl max-w-2xl backdrop-blur-md border border-white/10 pointer-events-auto"
          style={{ y, opacity }}
        >
          <h2 className="text-4xl font-bold mb-4">Discover the Unseen</h2>
          <p className="text-gray-300">
            Scroll down to interact with the environment. The camera gracefully navigates through the 3D space, revealing particle systems and iridescent geometries reacting to your movement.
          </p>
        </motion.div>
      </section>
      


      <section className="h-screen flex flex-col items-center justify-center text-center">
        <h2 className="text-5xl md:text-8xl font-bold mb-8 text-gradient">READY?</h2>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-8 py-4 glass rounded-full font-bold uppercase tracking-widest hover:bg-white/10 transition-colors pointer-events-auto cursor-pointer"
        >
          Start Project
        </button>
      </section>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm pointer-events-auto"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="glass p-6 md:p-8 rounded-3xl w-full max-w-3xl relative h-[80vh] flex flex-col"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors cursor-pointer z-10"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
              
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse"></div>
                <h3 className="text-2xl font-bold">Creative AI Terminal</h3>
              </div>
              
              <div className="flex-1 overflow-y-auto mb-4 pr-2 flex flex-col gap-4 text-left">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] rounded-2xl p-4 ${msg.role === 'user' ? 'bg-white text-black rounded-tr-sm' : 'bg-white/10 text-gray-200 rounded-tl-sm border border-white/5 shadow-lg'}`}>
                      {msg.content}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              
              <form className="relative flex items-center" onSubmit={handleChatSubmit}>
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me to build something crazy..." 
                  className="w-full bg-white/5 border border-white/10 rounded-full pl-6 pr-16 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 transition-colors" 
                  autoFocus
                />
                <button 
                  type="submit" 
                  className="absolute right-2 p-3 bg-white text-black rounded-full hover:bg-gray-200 transition-colors cursor-pointer disabled:opacity-50"
                  disabled={!input.trim()}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isContactOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm pointer-events-auto"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="glass p-8 md:p-12 rounded-3xl w-full max-w-md relative flex flex-col items-center text-center shadow-2xl"
            >
              <button 
                onClick={() => setIsContactOpen(false)}
                className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors cursor-pointer z-10"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
              
              <h3 className="text-3xl font-bold mb-6 text-gradient">Get In Touch</h3>
              
              <a href="mailto:xyzz@gmail.com" className="w-full mb-4 px-6 py-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors flex items-center justify-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                xyzz@gmail.com
              </a>
              
              <a href="tel:1234567891" className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors flex items-center justify-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                1234567891
              </a>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
