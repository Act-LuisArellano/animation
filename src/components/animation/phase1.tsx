import React, { useRef, useEffect } from 'react';
import { Settings, Brain, ArrowRight, FileArchive, Upload } from 'lucide-react';
import { P1DataIcon, P1NewDataIcon } from './shared';

// ==========================================
// PHASE 1: DEVELOPMENT
// ==========================================

export const Phase1Animation = ({ isActive }: { isActive: boolean }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<any>(null);

    const modelRef = useRef<HTMLDivElement>(null);
    const gearRef = useRef<HTMLDivElement>(null);
    const appUiRef = useRef<HTMLDivElement>(null);
    const dropzoneFileRef = useRef<HTMLDivElement>(null);
    const resultsRef = useRef<HTMLDivElement>(null);
    const stepTextRef = useRef<HTMLDivElement>(null);
    const flowArrowRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current || typeof window === 'undefined') return;
        const gsap = (window as any).gsap;
        if (!gsap) return;

        const setText = (text: string) => {
            return gsap.timeline()
                .to(stepTextRef.current, { opacity: 0, duration: 0.2 })
                .set(stepTextRef.current, { textContent: text })
                .to(stepTextRef.current, { opacity: 1, duration: 0.2 });
        };

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ repeat: -1, repeatDelay: 2, paused: !isActive });
            timelineRef.current = tl;

            // --- INITIAL SETUP ---
            gsap.set('.data-item', { scale: 0, opacity: 0 });
            gsap.set('.new-data-item', { scale: 0, opacity: 0 });
            gsap.set('.test-item', { opacity: 1 });
            gsap.set(modelRef.current, { scale: 0, opacity: 0, x: 0, y: 0 });
            gsap.set(gearRef.current, { scale: 0, opacity: 0, rotation: -180 });
            gsap.set('.model-icon', { color: '#64748b' });
            gsap.set('.model-icon', { color: '#64748b' });
            gsap.set('.model-ring', { borderColor: '#e2e8f0' });

            gsap.set(appUiRef.current, { opacity: 0, y: 20, x: -180, scale: 0.9, display: 'none' });
            gsap.set(resultsRef.current, { opacity: 0, scale: 0.9 });
            gsap.set(dropzoneFileRef.current, { y: -190, x: -180, opacity: 0, scale: 0, rotate: -10 });
            gsap.set(flowArrowRef.current, { opacity: 0, x: 0, scale: 0 });
            gsap.set('.arrow-inner', { rotation: 0 });
            gsap.set(stepTextRef.current, { opacity: 1 });

            // --- SEQUENCE ---
            tl.addLabel('start')
                .add(setText("1. Challenge Start: Public Dataset"))
                .to('.data-item', { scale: 1, opacity: 1, stagger: 0.05, duration: 0.5, ease: "back.out(1.7)" })
                .to('.json-tooltip', { opacity: 1, duration: 0.5 }, "-=0.5")
                .to('.json-tooltip', { opacity: 0, duration: 0.5, delay: 0.5 })

                .add(setText("2. Partitioning: Train vs Validation"))
                .to('.train-item', { x: -200, y: 0, duration: 0.8, ease: "power2.inOut" }, "split")
                .to('.test-item', { x: 100, y: 0, duration: 0.8, ease: "power2.inOut" }, "split")
                .add(setText("3. Holding Validation Set"))
                .to('.test-item', { opacity: 0, scale: 0, duration: 0.5, delay: 0.2 });

            tl.addLabel('training')
                .add(setText("4. Base Model Initialization"))
                .to(modelRef.current, { scale: 1, opacity: 1, duration: 0.5, ease: "back.out" })
                .add(setText("5. Training with Public Data"))
                .to('.train-item', { x: 0, y: 0, scale: 0, opacity: 0, stagger: 0.1, duration: 0.6, ease: "power2.in" });

            tl.addLabel('finetuning')
                .add(setText("6. Fine-Tuning: Domain Adaptation"))
                .to(gearRef.current, { scale: 1, opacity: 1, rotation: 0, duration: 1.2, ease: "elastic.out(1, 0.7)" })
                .to('.model-icon', { color: '#10b981', duration: 0.5 }, "<")
                .to('.model-ring', { borderColor: '#10b981', duration: 0.5 }, "<")
                .to(modelRef.current, { scale: 1.1, duration: 0.2, yoyo: true, repeat: 1 }, "<0.2")
                .add(setText("Model Adaptation Complete"))
                .to({}, { duration: 0.5 });

            tl.addLabel('prep')
                .add(setText("7. Model Serialization"))
                .to(modelRef.current, { x: 220, scale: 0.8, duration: 1, ease: "power2.inOut" });

            tl.add(setText("8. Generating Submission Data"))
                .to('.new-data-item', { scale: 1, opacity: 1, stagger: 0.1, duration: 0.5, ease: "back.out(1.7)" })
                .to({}, { duration: 0.5 })

            tl.add(setText("9. Packaging Submission"))
                .to(dropzoneFileRef.current, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)" })
                .to('.new-data-item', { x: -180, y: -190, scale: 0.2, opacity: 0, stagger: 0.05, duration: 0.6, ease: "power2.in" }, "-=0.2")
                .to(dropzoneFileRef.current, { scale: 1.1, duration: 0.1, yoyo: true, repeat: 1 });

            tl.add(setText("10. Simulating Evaluation Environment"))
                .set(appUiRef.current, { display: 'flex' })
                .to(appUiRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" })
                .add(setText("11. Ingesting Submission"))
                .to(dropzoneFileRef.current, { y: -80, rotate: 0, duration: 0.8, ease: "bounce.out" })

                .add(setText("12. Processing: Tuned Model Inference"))
                .set(flowArrowRef.current, { x: -80, opacity: 0, scale: 0 })
                .set('.arrow-inner', { rotation: 0 })

                .to(flowArrowRef.current, { opacity: 1, scale: 1, duration: 0.5 })
                .to(flowArrowRef.current, { x: 120, duration: 1.5, ease: "power1.inOut" })

                .to(modelRef.current, { scale: 0.9, duration: 0.4, yoyo: true, repeat: 1 })

                .add(setText("13. Generating Output Metrics"))
                .to('.arrow-inner', { rotation: 180, duration: 0.3 })
                .to('.flow-label', { textContent: "Score", duration: 0.1 }, "<")
                .to(flowArrowRef.current, { x: -80, duration: 1.2, ease: "power1.inOut" })
                .to(flowArrowRef.current, { opacity: 0, scale: 0, duration: 0.3 })

                .to('.processing-bar', { width: '100%', duration: 0.5 })
                .to(resultsRef.current, { opacity: 1, scale: 1, duration: 0.5, ease: "back.out" })
                .fromTo('.chart-bar', { scaleY: 0 }, { scaleY: 1, stagger: 0.1, duration: 0.5 }, "<")

                .to(containerRef.current, { opacity: 0, duration: 1, delay: 3 });

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
            <div className="absolute top-10 w-full text-center z-20">
                <p ref={stepTextRef} className="text-xl md:text-2xl font-bold text-slate-700 transition-colors">Phase 1: Development</p>
            </div>

            {/* DATASET LAYER */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {Array.from({ length: 10 }).map((_, i) => {
                    const isTest = i >= 7;
                    const offsetX = (i % 5) * 40 - 80;
                    const offsetY = Math.floor(i / 5) * 50 - 25;
                    return (
                        <div key={i} className={`absolute data-item ${isTest ? 'test-item' : 'train-item'}`} style={{ marginLeft: offsetX, marginTop: offsetY }}>
                            {i === 0 && (
                                <div className="absolute -top-12 left-10 bg-slate-900 text-green-400 text-[8px] font-mono p-2 rounded shadow-lg opacity-0 json-tooltip pointer-events-none whitespace-pre border border-slate-700 z-50">
                                    {`{"text": "Meds taken?",\n "label": "Close"}`}
                                </div>
                            )}
                            <P1DataIcon isTest={isTest} label={isTest ? "VAL" : "TRAIN"} />
                        </div>
                    );
                })}
            </div>

            {/* NEW DATA LAYER */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[25]">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={`new-${i}`} className="absolute new-data-item" style={{ marginLeft: -250 + (i * 70), marginTop: 50 + (i % 2 * 30) }}>
                        <P1NewDataIcon label={`RAW ${i + 1}`} />
                    </div>
                ))}
            </div>

            {/* MODEL LAYER */}
            <div ref={modelRef} className="absolute z-10 flex flex-col items-center justify-center">
                <div className="relative">
                    <div className="absolute inset-0 rounded-full border-4 border-slate-200 scale-150 model-ring transition-colors"></div>
                    <div ref={gearRef} className="absolute -top-4 -right-4 bg-white text-emerald-600 p-1.5 rounded-full z-20 shadow-md border border-emerald-100">
                        <Settings size={20} className="animate-spin-slow" />
                    </div>
                    <div className="relative bg-white p-6 rounded-2xl shadow-xl border border-slate-100 z-10">
                        <Brain size={64} className="text-slate-500 model-icon transition-colors" />
                    </div>
                    <div className="absolute -bottom-8 w-full text-center font-bold text-slate-500 text-sm">Base Model</div>
                </div>
            </div>

            {/* ARROW LAYER */}
            <div ref={flowArrowRef} className="absolute z-15 flex flex-col items-center justify-center text-indigo-500">
                <div className="bg-white p-2 rounded-full shadow-lg border border-indigo-100 arrow-inner">
                    <ArrowRight size={32} />
                </div>
                <span className="text-[10px] font-bold mt-1 bg-indigo-50 px-2 rounded flow-label">Input</span>
            </div>

            {/* ZIP FILE LAYER */}
            <div ref={dropzoneFileRef} className="absolute z-30 pointer-events-none">
                <div className="bg-white p-3 rounded-lg shadow-xl border border-amber-200 flex items-center gap-3 relative">
                    <FileArchive size={28} className="text-amber-500" />
                    <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-700">submission.zip</span>
                    </div>
                </div>
            </div>

            {/* UI LAYER */}
            <div ref={appUiRef} className="absolute z-20 w-[400px] bg-white rounded-xl shadow-2xl border border-slate-200 flex-col overflow-hidden hidden">
                <div className="h-8 bg-slate-100 border-b border-slate-200 flex items-center px-3 gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                    <span className="ml-2 text-xs text-slate-400 font-medium">Evaluation Sandbox</span>
                </div>
                <div className="p-6 flex flex-col items-center gap-6">
                    <div className="w-full h-32 border-2 border-dashed border-indigo-200 bg-indigo-50/50 rounded-lg flex flex-col items-center justify-center">
                        <span className="text-indigo-300 mb-2"><Upload size={24} /></span>
                    </div>
                    <div className="w-full h-1 bg-slate-100 rounded overflow-hidden">
                        <div className="h-full bg-emerald-500 w-0 processing-bar"></div>
                    </div>
                    <div ref={resultsRef} className="w-full bg-slate-50 rounded-lg p-4 border border-slate-100">
                        <div className="flex justify-between items-end mb-4">
                            <div>
                                <h3 className="text-sm font-bold text-slate-700">Performance</h3>
                                <p className="text-xs text-slate-500">Validation Metric</p>
                            </div>
                            <div className="text-3xl font-bold text-emerald-600">0.942</div>
                        </div>
                        <div className="flex items-end justify-between h-16 gap-2">
                            {[40, 70, 55, 90, 85, 60, 95].map((h, i) => (
                                <div key={i} className="w-full bg-indigo-400 rounded-t-sm opacity-80 chart-bar origin-bottom" style={{ height: `${h}%` }}></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
