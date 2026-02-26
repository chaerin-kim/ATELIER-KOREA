"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Share2, Download } from "lucide-react";
import { IAtelier, IIssuedPiece } from "@/types";
import { useCollectionStore } from "@/store/collection-store";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CompleteAtelierModalProps {
  isOpen: boolean;
  onClose: () => void;
  atelier: IAtelier;
}

export function CompleteAtelierModal({ isOpen, onClose, atelier }: CompleteAtelierModalProps) {
  const [step, setStep] = useState<'question' | 'generating' | 'card'>('question');
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const issuePiece = useCollectionStore((state) => state.issuePiece);
  const piece = atelier.piece;

  const handleChoice = (choiceId: string) => {
    setSelectedChoiceId(choiceId);
    setStep('generating');

    // Simulate "crafting" delay
    setTimeout(() => {
      const choice = piece.choices.find((c) => c.id === choiceId);
      if (!choice) return;

      const newPiece: IIssuedPiece = {
        pieceId: piece.id,
        atelierSlug: atelier.slug,
        choiceId: choice.id,
        issuedAt: new Date().toISOString(),
        generatedLine: choice.generatedLine,
      };

      issuePiece(newPiece);
      setStep('card');
    }, 2000);
  };

  const currentChoice = piece.choices.find(c => c.id === selectedChoiceId);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-stone-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-stone-50 w-full max-w-md rounded-sm overflow-hidden shadow-2xl relative min-h-[500px] flex flex-col"
            >
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 text-stone-400 hover:text-stone-900 z-10"
              >
                <X size={24} />
              </button>

              {/* Step 1: Question */}
              {step === 'question' && (
                <div className="p-8 flex flex-col h-full justify-center">
                  <span className="text-xs uppercase tracking-widest text-stone-400 mb-6 text-center">
                    Reflection
                  </span>
                  <h3 className="text-2xl font-serif text-center mb-10 leading-relaxed">
                    "{piece.question}"
                  </h3>
                  
                  <div className="space-y-3">
                    {piece.choices.map((choice) => (
                      <button
                        key={choice.id}
                        onClick={() => handleChoice(choice.id)}
                        className="w-full text-left p-4 rounded-sm border border-stone-200 hover:border-stone-900 hover:bg-stone-100 transition-all font-light text-stone-600 hover:text-stone-900"
                      >
                        {choice.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Generating Animation */}
              {step === 'generating' && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-stone-100">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 border-t-2 border-l-2 border-stone-900 rounded-full mb-6"
                  />
                  <p className="font-serif text-stone-600 animate-pulse">
                    Crafting your piece...
                  </p>
                </div>
              )}

              {/* Step 3: Card View */}
              {step === 'card' && currentChoice && (
                <div className="flex flex-col h-full bg-stone-900 text-stone-50">
                  {/* Card Visual */}
                  <div className="flex-1 relative p-8 flex flex-col justify-between overflow-hidden">
                    <div className="absolute inset-0 opacity-40">
                      <img src={atelier.heroImage} className="w-full h-full object-cover grayscale" alt="" />
                    </div>
                    
                    <div className="relative z-10 pt-8">
                       <span className="text-xs uppercase tracking-widest opacity-70 block mb-2">
                        {atelier.collectionId} Collection
                      </span>
                      <h2 className="text-3xl font-serif italic">{piece.baseName}</h2>
                    </div>

                    <div className="relative z-10 pb-8">
                      <p className="text-xl font-serif leading-relaxed mb-4">
                        "{currentChoice.generatedLine}"
                      </p>
                      <div className="flex justify-between items-end border-t border-white/20 pt-4">
                        <span className="text-xs opacity-60">
                          {atelier.displayName} <br/>
                          {new Date().toLocaleDateString()}
                        </span>
                        <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center">
                          <span className="text-[10px]">KR</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="bg-stone-800 p-4 flex gap-2">
                    <Button className="flex-1 bg-stone-100 text-stone-900 hover:bg-white" onClick={onClose}>
                      <Check size={16} className="mr-2" />
                      Save to Collection
                    </Button>
                    <Button variant="outline" className="border-stone-600 text-stone-300 hover:bg-stone-700">
                      <Share2 size={16} />
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
