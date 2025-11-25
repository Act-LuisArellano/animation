'use client';

import React, { useEffect, useState } from 'react';
import { Sparkles, Layout, Layers, CheckCircle2 } from 'lucide-react';
import { Encyclopedia } from '@/components/animation/encyclopedia';
import { Phase1Animation } from '@/components/animation/phase1';
import { Phase2Animation } from '@/components/animation/phase2';

// ==========================================
// 4. MAIN APP SHELL (Roulette)
// ==========================================

export default function AIChallengeApp() {
  const [activePhase, setActivePhase] = useState(0);
  const [isGsapLoaded, setIsGsapLoaded] = useState(false);

  useEffect(() => {
    // Load GSAP globally once
    if (typeof window !== 'undefined' && !(window as any).gsap) {
      const script = document.createElement('script');
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js";
      script.async = true;
      script.onload = () => setIsGsapLoaded(true);
      document.body.appendChild(script);
      // Load TextPlugin for dynamic text
      const script2 = document.createElement('script');
      script2.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/TextPlugin.min.js";
      script2.async = true;
      script2.onload = () => {
        if ((window as any).gsap) (window as any).gsap.registerPlugin((window as any).TextPlugin);
      };
      document.body.appendChild(script2);
    } else {
      setIsGsapLoaded(true);
    }
  }, []);

  const phases = [
    { id: 0, title: "Encyclopedia", icon: <Layout size={18} />, color: "bg-slate-600" },
    { id: 1, title: "Development", icon: <Layers size={18} />, color: "bg-blue-600" },
    { id: 2, title: "Evaluation", icon: <CheckCircle2 size={18} />, color: "bg-rose-600" },
  ];

  if (!isGsapLoaded) return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center text-slate-400 gap-4">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
      <span className="font-mono text-sm">Initializing Simulation Engine...</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-4 font-sans selection:bg-indigo-100">

      {/* --- HEADER --- */}
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-black text-slate-800 tracking-tight flex items-center gap-3">
          <Sparkles className="text-amber-400 fill-amber-400" /> AI Challenge Workflow
        </h1>
        <p className="text-slate-500 font-medium">Interactive Pipeline Visualization</p>
      </div>

      {/* --- ROULETTE WINDOW --- */}
      <div className="relative w-full max-w-5xl h-[650px] bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">

        {/* CAROUSEL TRACK */}
        <div
          className="flex w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ transform: `translateX(-${activePhase * 100}%)` }}
        >
          {/* CARD 0: ENCYCLOPEDIA */}
          <div className="w-full h-full flex-shrink-0 relative overflow-hidden">
            <Encyclopedia />
          </div>

          {/* CARD 1: PHASE 1 */}
          <div className="w-full h-full flex-shrink-0 relative overflow-hidden bg-white">
            <Phase1Animation isActive={activePhase === 1} />
          </div>

          {/* CARD 2: PHASE 2 */}
          <div className="w-full h-full flex-shrink-0 relative overflow-hidden bg-white">
            <Phase2Animation isActive={activePhase === 2} />
          </div>
        </div>

        {/* --- NAVIGATION BAR --- */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center items-center z-50 pointer-events-none">
          <div className="bg-white/90 backdrop-blur-md p-2 rounded-full shadow-2xl border border-slate-200 pointer-events-auto flex gap-2">
            {phases.map((phase) => {
              const isActive = activePhase === phase.id;
              return (
                <button
                  key={phase.id}
                  onClick={() => setActivePhase(phase.id)}
                  className={`
                        relative px-6 py-3 rounded-full font-bold text-sm transition-all duration-500 ease-out flex items-center gap-2 overflow-hidden
                        ${isActive ? `${phase.color} text-white shadow-lg shadow-indigo-200` : 'bg-transparent text-slate-500 hover:bg-slate-100'}
                        `}
                  style={{
                    transform: isActive ? 'scale(1.05)' : 'scale(1)',
                    minWidth: isActive ? '160px' : '60px' // Expands when active
                  }}
                >
                  <span className="relative z-10">{phase.icon}</span>
                  {isActive && (
                    <span className="relative z-10 animate-in fade-in slide-in-from-left-2 duration-300 whitespace-nowrap">
                      {phase.title}
                    </span>
                  )}
                  {/* Bouncing Dot for Active State */}
                  {isActive && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white/50 rounded-full animate-bounce" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Progress Dots (Visual Indicator) */}
        <div className="absolute top-6 right-6 flex gap-2">
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-500 ${activePhase === i ? 'w-8 bg-slate-800' : 'w-2 bg-slate-200'}`}
            />
          ))}
        </div>

      </div>

      <div className="mt-6 text-slate-400 text-xs font-mono">
        v2.0 • Phase Automation System
      </div>

    </div>
  );
}