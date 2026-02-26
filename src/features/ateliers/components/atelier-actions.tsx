"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bookmark, CheckCircle } from "lucide-react";
import { IAtelier } from "@/types";
import { useCollectionStore } from "@/store/collection-store";
import { CompleteAtelierModal } from "./complete-atelier-modal";
import { cn } from "@/lib/utils";

interface AtelierActionsProps {
  atelier: IAtelier;
}

export function AtelierActions({ atelier }: AtelierActionsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isSaved, toggleSaveAtelier, hasPiece } = useCollectionStore();
  
  const saved = isSaved(atelier.slug);
  const completed = hasPiece(atelier.slug);

  return (
    <>
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 flex gap-4 bg-white/10 backdrop-blur-md p-2 rounded-full border border-white/20 shadow-xl">
        <Button 
          variant="secondary"
          className={cn(
            "rounded-full transition-all duration-300",
            saved ? "bg-stone-800 text-stone-50 hover:bg-stone-700" : "bg-white text-stone-900 hover:bg-stone-100"
          )}
          onClick={() => toggleSaveAtelier(atelier.slug)}
        >
          <Bookmark size={16} className={cn("mr-2", saved && "fill-current")} />
          {saved ? "Saved" : "Save"}
        </Button>

        <Button 
          variant="primary"
          className={cn(
            "rounded-full transition-all duration-300 shadow-lg",
            completed ? "bg-stone-600 cursor-default" : "bg-stone-900 hover:scale-105"
          )}
          onClick={() => !completed && setIsModalOpen(true)}
          disabled={completed}
        >
          {completed ? (
            <>
              <CheckCircle size={16} className="mr-2" />
              Collected
            </>
          ) : (
            "Complete Atelier"
          )}
        </Button>
      </div>

      <CompleteAtelierModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        atelier={atelier} 
      />
    </>
  );
}
