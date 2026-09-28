"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion';
import Link from 'next/link';

// Simple implementation of Lenis for smooth scrolling in a Next.js App Router project
// In a real project, we'd wrap the whole app, but here we can wrap the page.
import { ReactLenis } from '@studio-freight/react-lenis';

export default function ProjectStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress for the whole page
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Make scroll slightly springy for the icon
  const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 100, mass: 0.1 });

  // Icon transformations
  const iconY = useTransform(smoothProgress, [0, 0.25, 0.5, 0.75, 1], ["0vh", "30vh", "50vh", "70vh", "85vh"]);
  const iconX = useTransform(smoothProgress, [0, 0.25, 0.5, 0.75, 1], ["0vw", "10vw", "-10vw", "10vw", "0vw"]);
  const iconRotate = useTransform(smoothProgress, [0, 1], [0, 360 * 2]);
  const iconScale = useTransform(smoothProgress, [0, 0.5, 1], [1, 1.2, 1]);

  // Section 01 Transformations
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);

  // Section 02 Transformations
  const sec2Opacity = useTransform(scrollYProgress, [0.1, 0.25, 0.4], [0, 1, 0]);
  const sec2Scale = useTransform(scrollYProgress, [0.1, 0.25], [0.8, 1]);

  // Section 03 Transformations (Horizontal Scroll)
  const sec3Opacity = useTransform(scrollYProgress, [0.3, 0.5, 0.75], [0, 1, 0]);
  const cardsX = useTransform(scrollYProgress, [0.4, 0.7], ["0%", "-60%"]);

  // Section 04 Transformations
  const sec4Opacity = useTransform(scrollYProgress, [0.7, 0.85], [0, 1]);
  const sec4Y = useTransform(scrollYProgress, [0.7, 0.85], [100, 0]);

  return (
    <ReactLenis root>
      <main ref={containerRef} className="bg-[#FFF48D] text-[#0E0E0C] relative font-sans selection:bg-black selection:text-[#FFF48D]">
        
        {/* Navigation */}
        <nav className="fixed top-0 left-0 w-full p-8 flex justify-between items-center z-[100] pointer-events-none mix-blend-difference text-white">
          <Link href="/" className="font-bold text-2xl tracking-tighter pointer-events-auto">bachbao*</Link>
          <div className="flex gap-6 items-center text-sm font-semibold uppercase tracking-widest pointer-events-auto">
            <Link href="/">Work</Link>
            <Link href="/">FAQ</Link>
            <button className="bg-white text-black px-6 py-2 rounded-full hover:scale-105 transition-transform font-bold">Book a call ➔</button>
          </div>
        </nav>

        {/* Floating Storytelling Icon */}
        <motion.div 
          className="fixed top-24 left-1/2 z-50 mix-blend-difference text-white pointer-events-none"
          style={{ y: iconY, x: iconX, rotate: iconRotate, scale: iconScale, translateX: "-50%" }}
        >
          <div className="w-16 h-16 relative flex items-center justify-center">
            {/* The "DOT" character placeholder */}
            <div className="w-full h-full bg-white rounded-full flex items-center justify-center relative">
              <div className="absolute top-4 left-3 w-3 h-3 bg-black rounded-full" />
              <div className="absolute top-4 right-3 w-3 h-3 bg-black rounded-full" />
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-4 h-4 bg-black rounded-full" />
              {/* Little floating dots around */}
              {[...Array(8)].map((_, i) => (
                <div key={i} className="absolute w-1 h-1 bg-white rounded-full" style={{
                  top: `${Math.sin(i * 45) * 40 + 32}px`,
                  left: `${Math.cos(i * 45) * 40 + 32}px`,
                }} />
              ))}
            </div>
          </div>
          {/* Tooltip that appears sometimes */}
          <motion.div 
            style={{ opacity: useTransform(scrollYProgress, [0, 0.1, 0.2], [0, 1, 0]) }}
            className="absolute top-[-60px] left-1/2 -translate-x-1/2 bg-[#0E0E0C] text-white text-[10px] font-mono px-4 py-2 rounded-lg whitespace-nowrap after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-[#0E0E0C]"
          >
            I'm your guide. Scroll down.
          </motion.div>
        </motion.div>

        {/* Scroll Container ensures we have height to scroll */}
        <div className="h-[400vh] relative">
          
          {/* 1. Hero Section (0 - 0.25) */}
          <motion.div 
            style={{ opacity: heroOpacity, y: heroY }}
            className="fixed inset-0 flex flex-col justify-center px-8 md:px-24 pointer-events-none"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-gray-700 mb-8 block">
                  ● LEVEL ART · LIGHTING · STORYTELLING · 2026
                </span>
                <h1 className="text-6xl md:text-9xl font-black mb-8 tracking-tighter leading-[0.85]">
                  The<br/>Deserted<br/>
                  <span className="inline-block border-2 border-black rounded-[100%] px-4 py-2 mt-4 transform -rotate-2">Outpost.</span>
                </h1>
                <p className="text-lg md:text-xl font-medium max-w-sm mt-12">
                  How do you tell a story of abandonment without a single word? Environmental storytelling and player guidance.
                </p>
              </div>
              <div className="flex justify-center items-center relative">
                <div className="text-[10rem] md:text-[15rem] font-serif tracking-widest text-black/5 mix-blend-multiply" style={{ textShadow: '4px 4px 0px rgba(0,0,0,0.1)' }}>
                  LIVE
                </div>
              </div>
            </div>
          </motion.div>

          {/* 2. Introduction Section (0.25 - 0.5) */}
          <motion.div 
            style={{ opacity: sec2Opacity, scale: sec2Scale }}
            className="fixed inset-0 flex flex-col justify-center px-8 md:px-24 bg-[#FAF7EA] pointer-events-none z-10"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-gray-500 mb-8 block">
                  ● WHAT WE DO
                </span>
                <h2 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.9]">
                  We don't just<br/>build <span className="underline decoration-4 underline-offset-8">levels.</span>
                </h2>
              </div>
              <div className="max-w-md">
                <p className="text-xl font-bold mb-8">
                  A studio working at the intersection of Art and Psychology — everything we ship guides the player, and every element has a purpose.
                </p>
                <ul className="font-mono text-xs uppercase tracking-widest text-gray-500 space-y-2">
                  <li>◆ Visual Communication</li>
                  <li>◆ Lighting & Composition</li>
                  <li>◆ Environmental Storytelling</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* 3. Horizontal Scroll Section (0.5 - 0.75) */}
          <motion.div 
            style={{ opacity: sec3Opacity }}
            className="fixed inset-0 flex flex-col justify-center bg-[#FFF48D] pointer-events-none z-20 overflow-hidden"
          >
            <div className="px-8 md:px-24 w-full h-full flex flex-col justify-center">
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-gray-500 mb-8 block">
                ● HOW WE WORK
              </span>
              <h2 className="text-6xl md:text-8xl font-black mb-16 tracking-tighter leading-[0.9]">
                No filler.<br/>Three steps.
              </h2>
              
              <motion.div 
                style={{ x: cardsX }}
                className="flex gap-6 w-[200vw]"
              >
                {/* Cards */}
                <div className="w-[400px] border-2 border-black rounded-3xl p-8 bg-[#FFF48D] flex-shrink-0 relative overflow-hidden">
                  <span className="font-mono text-[10px] text-gray-500 block mb-4">01 · BLOCKOUT</span>
                  <h3 className="text-4xl font-bold mb-4">Layout → Flow</h3>
                  <p className="text-lg font-medium">Establishing scale, composition, and the critical path before any assets are placed.</p>
                </div>
                <div className="w-[400px] border-2 border-black rounded-3xl p-8 bg-[#FFF48D] flex-shrink-0">
                  <span className="font-mono text-[10px] text-gray-500 block mb-4">02 · LIGHTING</span>
                  <h3 className="text-4xl font-bold mb-4">Guiding Eyes</h3>
                  <p className="text-lg font-medium">Using contrast, color temperature, and brightness to silently tell the player where to go.</p>
                </div>
                <div className="w-[400px] border-2 border-black rounded-3xl p-8 bg-[#FFF48D] flex-shrink-0">
                  <span className="font-mono text-[10px] text-gray-500 block mb-4">03 · DRESSING</span>
                  <h3 className="text-4xl font-bold mb-4">The Story</h3>
                  <p className="text-lg font-medium">Placing props logically. A scattered chair or a locked door tells a story of what happened here.</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* 4. Final Dark Section (0.75 - 1.0) */}
          <motion.div 
            style={{ opacity: sec4Opacity, y: sec4Y }}
            className="fixed inset-0 bg-[#0E0E0C] text-[#FFF48D] flex flex-col justify-center px-8 md:px-24 z-30 pointer-events-auto"
          >
            <div className="text-center max-w-5xl mx-auto">
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-gray-500 mb-8 block">
                ( OUR PROMISE )
              </span>
              <h2 className="text-6xl md:text-[8rem] font-black tracking-tighter leading-[0.85] mb-12 text-[#FFF48D]">
                WE BUILD WORLDS THAT SPEAK.
              </h2>
              <div className="flex justify-between items-end border-b border-[#FFF48D]/20 pb-4">
                <p className="text-left text-lg max-w-sm text-gray-300">
                  Visual communication and player psychology aren't add-ons — they're how we build from day one.
                </p>
                <div className="text-right">
                  <span className="font-mono text-[10px] uppercase block mb-2">Ready?</span>
                  <button className="bg-[#FFF48D] text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-white transition-colors">
                    Start a project
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar Controls (Sticky across the page) */}
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center bg-[#0E0E0C] p-2 rounded-full gap-4 shadow-2xl z-50 text-white font-mono text-[10px] uppercase tracking-widest px-6">
          <Link href="/" className="hover:text-[#FFF48D] transition-colors border border-white/20 px-3 py-1 rounded-full">ESC</Link>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div>
            <span>Recording</span>
          </div>
          <div className="w-px h-4 bg-white/20"></div>
          <button className="hover:text-[#FFF48D] transition-colors">Sound: Off</button>
        </div>

      </main>
    </ReactLenis>
  );
}
