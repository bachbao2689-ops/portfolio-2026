"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const PROJECTS = [
  { id: 'project-1', name: 'Deserted Outpost', slug: 'example' },
  { id: 'project-2', name: 'Forgotten Ruins', slug: 'example' },
  { id: 'project-3', name: 'Cyber Slums', slug: 'example' },
  { id: 'project-4', name: 'Neon City', slug: 'example' },
  { id: 'project-5', name: 'Forest Temple', slug: 'example' },
];

export default function Home() {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <main className="h-screen w-full bg-[#FFF48D] overflow-hidden relative flex flex-col items-center justify-center text-[#0E0E0C] font-sans selection:bg-black selection:text-[#FFF48D]">
      {/* Top Nav */}
      <nav className="absolute top-0 left-0 w-full p-8 flex justify-between items-center z-50">
        <div className="font-bold text-2xl tracking-tighter">bachbao*</div>
        <div className="flex gap-6 items-center text-sm font-semibold uppercase tracking-widest border border-black/20 rounded-full px-6 py-2">
          <button className="hover:text-gray-500 transition-colors">Sound: OFF</button>
          <div className="w-1 h-4 bg-black/20 mx-2"></div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
            Live Session
          </div>
        </div>
      </nav>

      {/* Main Hero */}
      <div className="text-center z-10 flex flex-col items-center mt-[-10vh]">
        <span className="text-xs font-mono uppercase tracking-[0.2em] mb-4 text-gray-700">
          ( Choose your project )
        </span>
        
        <div className="h-[120px] flex items-center justify-center mb-4">
          <AnimatePresence mode="wait">
            <motion.h1 
              key={hoveredProject || "default"}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="text-7xl md:text-9xl font-black tracking-tighter whitespace-nowrap"
            >
              {hoveredProject ? hoveredProject : "This portfolio is awake."}
            </motion.h1>
          </AnimatePresence>
        </div>

        {/* Central Graphic (Mascot / DOT placeholder) */}
        <div className="w-48 h-48 relative my-12 group cursor-crosshair">
           <motion.div 
             animate={{ rotate: 360 }} 
             transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
             className="absolute inset-0 flex items-center justify-center"
           >
             {[...Array(60)].map((_, i) => (
                <div key={i} className="absolute w-1.5 h-1.5 bg-black rounded-full" style={{
                  top: `${Math.sin(i * 12) * (Math.random() * 40 + 40) + 96}px`,
                  left: `${Math.cos(i * 12) * (Math.random() * 40 + 40) + 96}px`,
                  opacity: Math.random() * 0.5 + 0.5
                }} />
              ))}
           </motion.div>
           <div className="absolute inset-0 flex items-center justify-center gap-4 group-hover:scale-110 transition-transform duration-500">
             <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center relative overflow-hidden">
               <motion.div 
                 className="w-4 h-4 bg-black rounded-full absolute"
                 animate={{
                   x: (mousePos.x / (typeof window !== 'undefined' ? window.innerWidth : 1)) * 10 - 5,
                   y: (mousePos.y / (typeof window !== 'undefined' ? window.innerHeight : 1)) * 10 - 5,
                 }}
               />
             </div>
             <div className="w-12 h-12 bg-black rounded-full mt-4" />
             <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center relative overflow-hidden">
               <motion.div 
                 className="w-4 h-4 bg-black rounded-full absolute"
                 animate={{
                   x: (mousePos.x / (typeof window !== 'undefined' ? window.innerWidth : 1)) * 10 - 5,
                   y: (mousePos.y / (typeof window !== 'undefined' ? window.innerHeight : 1)) * 10 - 5,
                 }}
               />
             </div>
           </div>
           
           <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-center whitespace-nowrap">
             <div className="font-bold text-2xl tracking-widest mb-1">D O T</div>
             <div className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">the quick tour</div>
           </div>
        </div>
      </div>

      {/* Bottom Dock Navigation */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex items-center bg-[#0E0E0C] p-2 rounded-full gap-2 shadow-2xl z-50 transform hover:scale-105 transition-transform duration-300">
        <button className="w-12 h-12 rounded-full bg-[#FFF48D] flex items-center justify-center text-xl font-bold hover:bg-white transition-colors">
          ‹
        </button>
        
        <div className="flex gap-3 px-4">
          {PROJECTS.map((project, i) => (
            <Link 
              key={project.id} 
              href={`/projects/${project.slug}`}
              onMouseEnter={() => setHoveredProject(project.name)}
              onMouseLeave={() => setHoveredProject(null)}
              className="w-12 h-12 rounded-full bg-white/10 hover:bg-[#FFF48D] hover:scale-110 transition-all duration-300 flex items-center justify-center text-white/50 hover:text-black font-mono text-xs overflow-hidden group border border-transparent hover:border-[#FFF48D]"
            >
               {/* Pattern inside the circle to mimic project thumbnails */}
               <div className="absolute inset-0 opacity-20 group-hover:opacity-100 flex flex-wrap gap-[1px] p-2">
                 {[...Array(9)].map((_, idx) => (
                   <div key={idx} className="w-[8px] h-[8px] bg-current rounded-full" />
                 ))}
               </div>
            </Link>
          ))}
        </div>

        <button className="w-12 h-12 rounded-full bg-[#FFF48D] flex items-center justify-center text-xl font-bold hover:bg-white transition-colors">
          ›
        </button>

        <div className="w-px h-8 bg-white/20 mx-2"></div>

        <Link href="/projects/example" className="bg-[#FFF48D] text-black px-8 py-3 rounded-full font-bold uppercase text-xs tracking-widest flex items-center gap-2 hover:bg-white transition-colors">
          Let Dot drive ➔
        </Link>
      </div>
      
      {/* Bottom links */}
      <div className="absolute bottom-6 w-full flex justify-between px-8 font-mono text-[10px] uppercase tracking-widest text-gray-600">
        <div className="hover:text-black cursor-pointer transition-colors border-b border-transparent hover:border-black">
          Skip · Explore Yourself ➔
        </div>
        <div>
          ← / → To Switch
        </div>
      </div>
    </main>
  );
}
