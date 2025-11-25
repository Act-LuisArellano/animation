import React, { useRef, useEffect } from 'react';
import { Settings, Brain, ArrowRight } from 'lucide-react';
import { P1DataIcon, P1NewDataIcon, P2TestFileStack, ScoreCard } from './shared';

// ==========================================
// PHASE 2: EVALUATION (FIXED & RESTORED)
// ==========================================

export const Phase2Animation = ({ isActive }: { isActive: boolean }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<any>(null);

    // Refs
    const stepTextRef = useRef<HTMLDivElement>(null);
    const modelRef = useRef<HTMLDivElement>(null);
    const gearRef = useRef<HTMLDivElement>(null);
    const flowArrowRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current || typeof window === 'undefined') return;
        const gsap = (window as any).gsap;
        if (!gsap) return;

        const setText = (text: string) => {
            return gsap.timeline()
                .to(stepTextRef.current, { opacity: 0, duration: 0.4 })
                .set(stepTextRef.current, { textContent: text })
                .to(stepTextRef.current, { opacity: 1, duration: 0.4 });
        };

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ repeat: -1, repeatDelay: 6, paused: !isActive });
            timelineRef.current = tl;

            // --- INITIAL STATE ---
            gsap.set('.yellow-item', { scale: 0, opacity: 0, x: -250, y: 0 });
            gsap.set('.blue-train-item', { scale: 0, opacity: 0, x: 0, y: 0 });
            gsap.set('.red-test-item-single', { scale: 0, opacity: 0, x: 0, y: 0 });
            gsap.set('.test-stack', { scale: 0, opacity: 0, x: -200, y: 0 });
            gsap.set('.stack-label', { opacity: 0 });
            gsap.set('.score-item', { scale: 0, opacity: 0, x: 250 });
            gsap.set(modelRef.current, { scale: 0, opacity: 0 });
            gsap.set(gearRef.current, { scale: 0, opacity: 0, rotation: -180 }); // Start hidden/rotated
            gsap.set('.model-icon', { color: '#64748b' }); // Start slate
            gsap.set('.model-ring', { borderColor: '#e2e8f0' });
            gsap.set(flowArrowRef.current, { opacity: 0, scale: 0, x: -100 });

            // ===========================================
            // PHASE 1 LOGIC (Visualized in Phase 2)
            // ===========================================

            tl.addLabel('fine-tune-start')
                .add(setText("1. Ingest Participant Submission"))
                .to('.yellow-item', { scale: 1, opacity: 1, stagger: 0.2, duration: 1, ease: "back.out" })

                .add(setText("2. Init Base Model"))
                .to(modelRef.current, { scale: 1, opacity: 1, duration: 1 }, "<")
                .to('.yellow-item', { x: 0, y: 0, scale: 0.2, opacity: 0, duration: 1.6, stagger: 0.2, ease: "power2.in" })

                // --- STANDARDIZED FINE-TUNING ---
                .add(setText("3. Fine-Tuning: Domain Adaptation"))
                // Gear Appears
                .to(gearRef.current, { scale: 1, opacity: 1, rotation: 0, duration: 2.4, ease: "elastic.out(1, 0.7)" })
                // Model becomes Green (and stays Green)
                .to('.model-icon', { color: '#10b981', duration: 1 }, "<")
                .to('.model-ring', { borderColor: '#10b981', duration: 1 }, "<")

                .add(setText("Model Adapted. Freezing Weights."))
                .to(modelRef.current, { x: 0, scale: 0.9, duration: 1.6 });

            // ===========================================
            // PHASE 2: BLIND EVALUATION
            // ===========================================

            tl.addLabel('step-6-recover')
                .add(setText("4. Retrieving Blind Test Set"))
                .to(modelRef.current, { x: 180, duration: 1.6, ease: "power2.inOut" })

                .to('.blue-train-item', { scale: 1, opacity: 1, stagger: 0.1, duration: 0.8 })
                .to('.red-test-item-single', { scale: 1, opacity: 1, stagger: 0.1, duration: 0.8 }, "<")

                .add(setText("5. Partitioning Hidden Data"))
                .to('.blue-train-item', { scale: 0.8, opacity: 0, y: 20, duration: 1.2 })

                .to('.red-test-item-single', { x: -200, scale: 1, opacity: 0, duration: 1.6, ease: "power2.inOut" }, "<0.1")
                .to('.test-stack', { scale: 1, opacity: 1, stagger: 0.2, duration: 1 }, "-=0.3");

            // ===========================================
            // PHASE 3: INFERENCE (SLOWED DOWN)
            // ===========================================

            tl.addLabel('inference')
                .add(setText("6. Inference: Evaluation on Blind Data"))
                .to(modelRef.current, { x: 0, duration: 1.6 })

                .set(flowArrowRef.current, { x: -120, scale: 0, opacity: 0 })
                // Slower entry arrow
                .to(flowArrowRef.current, { x: -60, scale: 1, opacity: 1, duration: 2.0 })

                // Slower processing pulse
                .to('.model-icon', { scale: 1.1, duration: 0.8, yoyo: true, repeat: 3 })

                // Slower exit arrow
                .to(flowArrowRef.current, { x: 0, scale: 0, opacity: 0, duration: 1.6 });

            // ===========================================
            // PHASE 4: SCORING
            // ===========================================

            tl.addLabel('split-results')
                .add(setText("7. Calculating Metrics"))
                .to('.score-center', { scale: 1, opacity: 1, x: 220, duration: 1, ease: "back.out" })

                .add(setText("8. Categorical Performance Report"))
                .to('.test-stack-top', { y: -120, duration: 2, ease: "power3.out" })
                .to('.test-stack-bottom', { y: 120, duration: 2, ease: "power3.out" }, "<")
                .to('.score-top', { scale: 1, opacity: 1, x: 220, y: -120, duration: 2, ease: "power3.out" }, "<")
                .to('.score-bottom', { scale: 1, opacity: 1, x: 220, y: 120, duration: 2, ease: "power3.out" }, "<")
                .to('.stack-label', { opacity: 1, duration: 1 }, "<0.5")
                .to('.test-stack', { x: -220, duration: 1 }, "<")

                .add(setText("Final Phase Evaluation Complete"))
                .to(containerRef.current, { opacity: 0, delay: 6, duration: 2 });

        }, containerRef);
        return () => ctx.revert();
    }, []);

    useEffect(() => {
        if (timelineRef.current) {
            if (isActive) timelineRef.current.play();
            else timelineRef.current.pause();
        }
    }, [isActive]);

    return (
        <div ref={containerRef} className="relative w-full h-full flex items-center justify-center overflow-hidden">
            <div className="absolute top-12 w-full text-center z-20">
                <p ref={stepTextRef} className="text-xl md:text-2xl font-bold text-slate-700 transition-colors"></p>
            </div>

            {/* PARTICIPANT DATA */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={`yellow-${i}`} className="absolute yellow-item" style={{ marginTop: (i * 30) - 30, marginLeft: (i * 20) }}>
                        <P1NewDataIcon label={`SUBMIT ${i + 1}`} />
                    </div>
                ))}
            </div>

            {/* ORIGINAL DATA SPLIT */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div key={`train-${i}`} className="absolute blue-train-item" style={{ marginLeft: (i * 25) - 100, marginTop: (i % 2 === 0 ? -40 : 40) }}>
                        <P1DataIcon label="OLD TRAIN" />
                    </div>
                ))}
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={`test-single-${i}`} className="absolute red-test-item-single" style={{ marginLeft: (i * 25) + 50, marginTop: (i % 2 !== 0 ? -30 : 30) }}>
                        <P1DataIcon label="OLD TEST" isTest />
                    </div>
                ))}
                <div className="absolute test-stack test-stack-top z-10"><P2TestFileStack label="GROUP A" subLabel="Open Q." /></div>
                <div className="absolute test-stack test-stack-center z-20"><P2TestFileStack label="GROUP B" subLabel="Change S." /></div>
                <div className="absolute test-stack test-stack-bottom z-10"><P2TestFileStack label="GROUP C" subLabel="Speech" /></div>
            </div>

            {/* MODEL CENTER */}
            <div ref={modelRef} className="absolute z-30 flex flex-col items-center justify-center">
                <div className="relative">
                    <div className="absolute inset-0 rounded-full border-4 border-slate-200 scale-150 model-ring transition-colors"></div>
                    {/* GEAR ICON for Finetuned State */}
                    <div ref={gearRef} className="absolute -top-4 -right-4 bg-white text-emerald-600 p-1.5 rounded-full z-20 shadow-lg border border-emerald-100">
                        <Settings size={20} className="animate-spin-slow" />
                    </div>
                    <div className="relative bg-white p-6 rounded-2xl shadow-xl border border-slate-100 z-10">
                        <Brain size={64} className="text-slate-500 model-icon transition-colors" />
                    </div>
                    <div className="absolute -bottom-10 w-40 -left-10 text-center font-bold text-slate-500 text-sm">
                        Fine-tuned Model
                    </div>
                </div>
            </div>

            {/* FLOW ARROW */}
            <div ref={flowArrowRef} className="absolute z-20 text-slate-300">
                <ArrowRight size={48} strokeWidth={3} />
            </div>

            {/* SCORES */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="absolute score-item score-top z-10"><ScoreCard score="91.4%" label="Open Q." /></div>
                <div className="absolute score-item score-center z-20"><ScoreCard score="94.2%" label="Change S." /></div>
                <div className="absolute score-item score-bottom z-10"><ScoreCard score="88.7%" label="Speech" /></div>
            </div>

        </div>
    );
};
