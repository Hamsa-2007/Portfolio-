import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Sparkles, Zap } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [epoch, setEpoch] = useState(1);
  const [statusText, setStatusText] = useState('Allocating Neural Tensor Memory...');
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsDone(true);
          setTimeout(() => {
            onComplete();
          }, 600);
          return 100;
        }

        const nextVal = prev + Math.floor(Math.random() * 8) + 4;
        const currentProgress = Math.min(nextVal, 100);

        if (currentProgress < 25) {
          setStatusText('Loading Transformer Attention Weights...');
          setEpoch(2);
        } else if (currentProgress < 50) {
          setStatusText('Calibrating Multi-Agent Synaptic Graph...');
          setEpoch(5);
        } else if (currentProgress < 75) {
          setStatusText('Synthesizing 3D Neural Coordinates...');
          setEpoch(8);
        } else if (currentProgress < 95) {
          setStatusText('Optimizing Loss: 0.0028 · Model Ready');
          setEpoch(10);
        } else {
          setStatusText('System Initialized. Launching Interface...');
          setEpoch(10);
        }

        return currentProgress;
      });
    }, 85);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#070B14] text-white select-none px-6"
        >
          {/* Ambient Glows */}
          <div className="absolute w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[120px] pointer-events-none -top-20 -left-20 animate-pulse" />
          <div className="absolute w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[120px] pointer-events-none -bottom-20 -right-20 animate-pulse" />

          {/* Central Hologram Core */}
          <div className="relative mb-10 flex items-center justify-center">
            <div className="w-28 h-28 rounded-full border-2 border-dashed border-purple-500/40 animate-[spin_8s_linear_infinite]" />
            <div className="absolute w-36 h-36 rounded-full border border-blue-500/20 animate-[spin_12s_linear_infinite_reverse]" />
            
            <div className="absolute w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-600/30 to-blue-600/30 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-[0_0_35px_rgba(139,92,246,0.5)]">
              <Cpu className="w-9 h-9 text-cyan-300 animate-pulse" />
            </div>
          </div>

          {/* Title and Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-2xl md:text-3xl font-display font-bold tracking-wider text-white mb-2 flex items-center justify-center gap-2">
              <span>HAMSA PRIYA M.</span>
              <Sparkles className="w-5 h-5 text-amber-400" />
            </h1>
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-400/80 font-mono">
              AI / ML Engineer & Autonomous Systems
            </p>
          </motion.div>

          {/* Training Telemetry Box */}
          <div className="w-full max-w-md bg-slate-900/70 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md shadow-2xl">
            <div className="flex justify-between items-center text-xs font-mono text-slate-400 mb-2">
              <span className="flex items-center gap-1.5 text-purple-400">
                <Zap className="w-3.5 h-3.5" /> Epoch {epoch}/10
              </span>
              <span className="text-white font-bold">{progress}%</span>
            </div>

            {/* Glowing Multi-color Progress Bar */}
            <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-amber-400 shadow-[0_0_15px_rgba(139,92,246,0.8)]"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut', duration: 0.2 }}
              />
            </div>

            {/* Dynamic Status Log */}
            <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span className="truncate pr-2">{statusText}</span>
              <span className="text-emerald-400 shrink-0 font-bold">lr: 3e-4</span>
            </div>
          </div>

          {/* Footer Sub-indicator */}
          <div className="mt-8 flex items-center gap-4 text-[10px] font-mono uppercase tracking-widest text-slate-500">
            <span>CUDA v12.4</span>
            <span>•</span>
            <span>PyTorch 2.4</span>
            <span>•</span>
            <span>WebAssembly GL</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
