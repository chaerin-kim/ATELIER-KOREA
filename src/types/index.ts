// Common Types
export type CollectionTheme = 'Sea' | 'Ritual' | 'Grain' | 'Raw' | 'Taste';
export type PaceType = 'Slow' | 'Balanced' | 'Deep';

// Entity: Collection
export interface ICollection {
  id: CollectionTheme;
  title: string;
  subtitle: string;
  heroImage: string;
  description: string;
  atelierSlugs: string[];
}

// Entity: Stay Recommendation
export interface IStay {
  name: string;
  description: string;
  type: string; // e.g., "Hanok", "Boutique"
  image?: string; // Optional image path
}

// Entity: Table Recommendation
export interface ITable {
  name: string;
  dish: string;
  description: string;
  type?: string;
  image?: string;
}

// Entity: Piece (Collectible Card)
export interface IPieceChoice {
  id: string;
  label: string;
  generatedLine: string;
}

export interface IPiece {
  id: string;
  baseName: string; // e.g., "Harbor Dawn"
  question: string;
  choices: IPieceChoice[];
  cardTemplate: string; // MVP fixed
}

// Entity: Atelier
export interface IAtelier {
  slug: string;
  displayName: string;
  collectionId: CollectionTheme;
  heroImage: string;
  galleryImages: string[];
  conceptLines: string[]; // 4-6 lines
  rarityText: string;
  recommendedNights: number;
  bestSeason: string;
  paceTag: PaceType;
  stayRecommendations: IStay[];
  tableHighlights: ITable[];
  howToArrive: {
    time: string;
    method: string;
    transferSimplicity: string;
    travelMinutesFromSeoul?: number;
  };
  piece: IPiece;
  location: {
    region: string;
    lat?: number;
    lng?: number;
  };
}

// User State (Zustand)
export interface IIssuedPiece {
  pieceId: string;
  atelierSlug: string;
  choiceId: string;
  issuedAt: string; // ISO Date
  generatedLine: string;
}

export interface ISavedRoute {
  id: string;
  title: string;
  atelierSlugs: string[];
  createdAt: string;
}
