import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { IIssuedPiece, ISavedRoute } from '@/types';

interface CollectionState {
  savedAtelierSlugs: string[];
  issuedPieces: IIssuedPiece[];
  savedRoutes: ISavedRoute[];
  
  // Actions
  toggleSaveAtelier: (slug: string) => void;
  isSaved: (slug: string) => boolean;
  issuePiece: (piece: IIssuedPiece) => void;
  hasPiece: (atelierSlug: string) => boolean;
  saveRoute: (route: ISavedRoute) => void;
}

export const useCollectionStore = create<CollectionState>()(
  persist(
    (set, get) => ({
      savedAtelierSlugs: [],
      issuedPieces: [],
      savedRoutes: [],

      toggleSaveAtelier: (slug) => {
        set((state) => {
          const isAlreadySaved = state.savedAtelierSlugs.includes(slug);
          if (isAlreadySaved) {
            return { savedAtelierSlugs: state.savedAtelierSlugs.filter((s) => s !== slug) };
          } else {
            return { savedAtelierSlugs: [...state.savedAtelierSlugs, slug] };
          }
        });
      },

      isSaved: (slug) => get().savedAtelierSlugs.includes(slug),

      issuePiece: (piece) => {
        set((state) => {
           // Prevent duplicate issuance for same atelier
           const exists = state.issuedPieces.some(p => p.atelierSlug === piece.atelierSlug);
           if (exists) return state;
           return { issuedPieces: [piece, ...state.issuedPieces] };
        });
      },

      hasPiece: (atelierSlug) => get().issuedPieces.some(p => p.atelierSlug === atelierSlug),
      
      saveRoute: (route) => set((state) => ({ savedRoutes: [...state.savedRoutes, route] })),
    }),
    {
      name: 'atelier-korea-storage',
    }
  )
);
