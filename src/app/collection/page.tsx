"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCollectionStore } from "@/store/collection-store";
import { AtelierCard } from "@/features/ateliers/components/atelier-card";
import ateliersData from "@/data/ateliers.json";
import { IAtelier } from "@/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export default function MyCollectionPage() {
  const [isClient, setIsClient] = useState(false);
  const [activeTab, setActiveTab] = useState<'saved' | 'pieces'>('saved');
  
  const savedAtelierSlugs = useCollectionStore((state) => state.savedAtelierSlugs);
  const issuedPieces = useCollectionStore((state) => state.issuedPieces);
  
  // Hydration fix
  useEffect(() => {
    setIsClient(true);
  }, []);

  const savedAteliers = (ateliersData as IAtelier[]).filter((a) => 
    savedAtelierSlugs.includes(a.slug)
  );

  if (!isClient) {
     return (
       <div className="min-h-screen flex items-center justify-center bg-stone-50">
         <Loader2 className="animate-spin text-stone-400" />
       </div>
     );
  }

  return (
    <main className="min-h-screen pt-24 pb-20 px-4 md:px-8 bg-stone-50 max-w-7xl mx-auto">
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-serif text-stone-900 mb-2">My Collection</h1>
        <p className="text-stone-500 font-light">
          Your curated journey through Korea's heritage.
        </p>
      </header>

      {/* Tabs */}
      <div className="flex gap-8 border-b border-stone-200 mb-12">
        <button
          onClick={() => setActiveTab('saved')}
          className={cn(
            "pb-4 text-sm uppercase tracking-widest transition-colors relative",
            activeTab === 'saved' ? "text-stone-900 font-medium" : "text-stone-400 hover:text-stone-600"
          )}
        >
          Saved Ateliers
          <span className="ml-2 text-xs bg-stone-200 px-2 py-0.5 rounded-full text-stone-600">{savedAteliers.length}</span>
          {activeTab === 'saved' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-stone-900" />}
        </button>
        <button
          onClick={() => setActiveTab('pieces')}
          className={cn(
            "pb-4 text-sm uppercase tracking-widest transition-colors relative",
            activeTab === 'pieces' ? "text-stone-900 font-medium" : "text-stone-400 hover:text-stone-600"
          )}
        >
          Collected Pieces
          <span className="ml-2 text-xs bg-stone-200 px-2 py-0.5 rounded-full text-stone-600">{issuedPieces.length}</span>
          {activeTab === 'pieces' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-stone-900" />}
        </button>
      </div>

      {/* Content */}
      <div className="min-h-[400px]">
        {activeTab === 'saved' && (
          <>
            {savedAteliers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                {savedAteliers.map((atelier) => (
                  <AtelierCard key={atelier.slug} atelier={atelier} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center space-y-6 border border-dashed border-stone-200 rounded-sm">
                <p className="text-stone-400 font-serif text-xl italic">
                  "The journey of a thousand miles begins with a single step."
                </p>
                <p className="text-stone-500 text-sm">You haven't saved any ateliers yet.</p>
                <Button asChild variant="outline">
                  <Link href="/collections">Explore Collections</Link>
                </Button>
              </div>
            )}
          </>
        )}

        {activeTab === 'pieces' && (
          <>
             {issuedPieces.length > 0 ? (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                 {issuedPieces.map((piece, idx) => {
                   const atelier = (ateliersData as IAtelier[]).find(a => a.slug === piece.atelierSlug);
                   if (!atelier) return null;
                   
                   return (
                     <div key={idx} className="bg-stone-900 text-stone-50 p-8 rounded-sm aspect-[3/4] flex flex-col justify-between relative overflow-hidden group hover:shadow-2xl transition-all duration-500">
                        {/* Background Image with opacity */}
                        <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500">
                          <img src={atelier.heroImage} className="w-full h-full object-cover grayscale" alt="" />
                        </div>

                        <div className="relative z-10 pt-4">
                           <span className="text-[10px] uppercase tracking-widest opacity-60 block mb-2">
                             {atelier.collectionId} Collection
                           </span>
                           <h3 className="text-2xl font-serif italic text-white/90">
                             {(atelier.piece.choices.find(c => c.id === piece.choiceId)?.label) || "Reflection"}
                           </h3>
                        </div>

                        <div className="relative z-10 pb-4">
                           <p className="text-lg font-serif leading-relaxed mb-6 text-white/80">
                             "{piece.generatedLine}"
                           </p>
                           <div className="flex justify-between items-end border-t border-white/20 pt-4">
                             <span className="text-[10px] opacity-50 uppercase tracking-widest">
                               {atelier.displayName} <br/>
                               {new Date(piece.issuedAt).toLocaleDateString()}
                             </span>
                             <div className="w-6 h-6 rounded-full border border-white/30 flex items-center justify-center">
                               <span className="text-[8px]">KR</span>
                             </div>
                           </div>
                        </div>
                     </div>
                   );
                 })}
               </div>
             ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center space-y-6 border border-dashed border-stone-200 rounded-sm">
                  <p className="text-stone-400 font-serif text-xl italic">
                    "Collect moments, not things."
                  </p>
                  <p className="text-stone-500 text-sm">
                    Complete an atelier journey to earn your first piece.
                  </p>
                  <Button asChild variant="outline">
                    <Link href="/collections">Start a Journey</Link>
                  </Button>
                </div>
             )}
          </>
        )}
      </div>
    </main>
  );
}
