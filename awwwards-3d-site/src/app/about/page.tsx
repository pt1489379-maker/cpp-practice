"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden flex flex-col items-center justify-center p-8">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-[100px]"></div>
      </div>

      <motion.div 
        className="glass p-10 md:p-16 rounded-3xl max-w-4xl z-10 text-center backdrop-blur-md border border-white/10 relative"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Link href="/" className="absolute top-8 left-8 text-gray-400 hover:text-white transition-colors flex items-center gap-2 uppercase tracking-widest text-sm font-bold">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          Back Home
        </Link>
        
        <motion.h1 
          className="text-5xl md:text-7xl font-extrabold tracking-tighter text-gradient mb-8 mt-8 md:mt-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          About This Project
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-2xl text-gray-300 leading-relaxed space-y-6 text-left"
        >
          <p>
            Welcome to the cutting edge of web design. This project was conceived to push the boundaries of what is possible in the browser, creating an <strong>"Awwwards Site of the Day"</strong> caliber experience.
          </p>
          <p>
            Powered by <strong>Next.js</strong>, we utilize <strong>React Three Fiber</strong> and <strong>GLSL Shaders</strong> to render stunning, interactive 3D elements that react in real-time. <strong>GSAP</strong> and <strong>Framer Motion</strong> handle the buttery-smooth animations and cinematic scrolling.
          </p>
          <p>
            Currently, it features an interactive iridescent geometry and a fully functioning Creative AI Terminal simulation. As the project evolves, this description will be updated to reflect the latest crazy ideas and capabilities we add to the site!
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
