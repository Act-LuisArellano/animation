import React from 'react';
import { FileText, FileArchive, Settings, Brain, CheckCircle2 } from 'lucide-react';

// ==========================================
// SHARED ASSETS & HELPERS
// ==========================================

// A generic Icon helper for the Encyclopedia (Phase 0)
export const EncyclopediaIcon = ({ type, label }: { type: 'train' | 'test' | 'raw' | 'zip'; label: string }) => {
    let colorClass = "text-blue-500";
    let bgClass = "bg-white";
    let borderClass = "border-slate-200";

    if (type === 'test') { colorClass = "text-rose-500"; }
    if (type === 'raw') { colorClass = "text-amber-500"; bgClass = "bg-amber-50"; borderClass = "border-amber-100"; }
    if (type === 'zip') {
        return (
            <div className="bg-white p-2 rounded-lg shadow-sm border border-amber-200 flex items-center gap-2">
                <FileArchive size={20} className="text-amber-500" />
                <span className="text-[10px] font-bold text-slate-700">{label}</span>
            </div>
        );
    }

    return (
        <div className={`flex flex-col items-center justify-center p-2 rounded shadow-sm w-12 h-16 ${bgClass} ${borderClass} border`}>
            <FileText className={`w-6 h-6 ${colorClass}`} />
            <div className="mt-1 w-full space-y-0.5">
                <div className={`h-0.5 w-full bg-current opacity-20 rounded`}></div>
                <div className={`h-0.5 w-2/3 bg-current opacity-20 rounded`}></div>
            </div>
            <span className={`text-[7px] mt-1 opacity-70 font-mono ${colorClass}`}>{label}</span>
        </div>
    );
};

export const EncyclopediaModel = ({ type }: { type: 'base' | 'tuned' }) => (
    <div className="relative transform scale-75">
        <div className={`absolute inset-0 rounded-full border-2 scale-150 ${type === 'tuned' ? 'border-emerald-500' : 'border-slate-200'}`}></div>
        {type === 'tuned' && (
            <div className="absolute -top-3 -right-3 bg-white text-emerald-600 p-1 rounded-full border border-emerald-100">
                <Settings size={12} />
            </div>
        )}
        <div className="relative bg-white p-3 rounded-xl shadow-sm border border-slate-100">
            <Brain size={32} className={type === 'tuned' ? 'text-emerald-500' : 'text-slate-400'} />
        </div>
    </div>
);

// Phase 1 Helpers
export const P1DataIcon = ({ className, label, isTest }: { className?: string, label?: string, isTest?: boolean }) => (
    <div className={`flex flex-col items-center justify-center p-2 bg-white border rounded shadow-sm w-16 h-20 ${className}`}>
        <FileText className={`w-8 h-8 ${isTest ? 'text-rose-500' : 'text-blue-500'}`} />
        <div className="mt-1 w-full space-y-1">
            <div className="h-1 w-full bg-slate-200 rounded"></div>
            <div className="h-1 w-2/3 bg-slate-200 rounded"></div>
        </div>
        {label && <span className="text-[8px] mt-1 text-slate-500 font-mono">{label}</span>}
    </div>
);

export const P1NewDataIcon = ({ className, label }: { className?: string, label?: string }) => (
    <div className={`flex flex-col items-center justify-center p-2 bg-amber-50 border border-amber-100 rounded shadow-sm w-16 h-20 ${className}`}>
        <FileText className="w-8 h-8 text-amber-500" />
        <div className="mt-1 w-full space-y-1">
            <div className="h-1 w-full bg-amber-200 rounded"></div>
            <div className="h-1 w-2/3 bg-amber-200 rounded"></div>
        </div>
        {label && <span className="text-[8px] mt-1 text-amber-600 font-mono">{label}</span>}
    </div>
);

// Phase 2 Helpers
export const P2DataIcon = ({ className, label, isTest }: { className?: string, label?: string, isTest?: boolean }) => (
    <div className={`flex flex-col items-center justify-center p-2 bg-white border rounded shadow-sm w-14 h-16 ${className}`}>
        <FileText className={`w-6 h-6 ${isTest ? 'text-rose-500' : 'text-blue-500'}`} />
        <div className="mt-1 w-full space-y-0.5">
            <div className="h-0.5 w-full bg-slate-200 rounded"></div>
            <div className="h-0.5 w-2/3 bg-slate-200 rounded"></div>
        </div>
        {label && <span className="text-[7px] mt-1 text-slate-500 font-mono">{label}</span>}
    </div>
);

export const P2NewDataIcon = ({ className, label }: { className?: string, label?: string }) => (
    <div className={`flex flex-col items-center justify-center p-2 bg-amber-50 border border-amber-100 rounded shadow-sm w-16 h-20 ${className}`}>
        <FileText className="w-8 h-8 text-amber-500" />
        <div className="mt-1 w-full space-y-1">
            <div className="h-1 w-full bg-amber-200 rounded"></div>
            <div className="h-1 w-2/3 bg-amber-200 rounded"></div>
        </div>
        {label && <span className="text-[8px] mt-1 text-amber-600 font-mono">{label}</span>}
    </div>
);

export const P2TestFileStack = ({ className, label, subLabel }: { className?: string, label: string, subLabel?: string }) => (
    <div className={`relative w-16 h-20 ${className}`}>
        <div className="absolute top-0 left-0 transform translate-x-3 translate-y-2 opacity-40"><P1DataIcon isTest className="border-rose-200" /></div>
        <div className="absolute top-0 left-0 transform translate-x-1.5 translate-y-1 opacity-70"><P1DataIcon isTest className="border-rose-300" /></div>
        <div className="absolute top-0 left-0 shadow-md bg-rose-50/50"><P1DataIcon isTest className="border-rose-400" /></div>
        <div className="absolute -bottom-2 -right-8 bg-white border border-rose-200 px-2 py-1 rounded shadow-md stack-label z-10 flex flex-col items-start min-w-[60px]">
            <span className="block text-[9px] font-bold text-rose-700 whitespace-nowrap">{label}</span>
            {subLabel && <span className="block text-[7px] text-rose-500 font-mono leading-tight">{subLabel}</span>}
        </div>
    </div>
);

export const ScoreCard = ({ className, score, label }: { className?: string, score: string, label: string }) => (
    <div className={`flex flex-col items-center justify-center p-2 bg-emerald-50 border border-emerald-100 rounded-lg shadow-sm w-24 h-20 ${className}`}>
        <CheckCircle2 className="w-6 h-6 text-emerald-500 mb-1" />
        <div className="flex items-baseline gap-1">
            <span className="text-emerald-700 font-bold text-xl">{score}</span>
        </div>
        <span className="text-[9px] text-emerald-600 font-mono uppercase tracking-tighter">{label}</span>
    </div>
);
