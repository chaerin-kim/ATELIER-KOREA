import Link from "next/link";
import Image from "next/image";
import collectionsData from "@/data/collections.json";
import { ICollection } from "@/types";

// Force static rendering for collection list
export const dynamic = 'force-static';

export default function CollectionsPage() {
  const collections = collectionsData as ICollection[];

  return (
    <main className="min-h-screen pt-24 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
      <header className="mb-16 text-center space-y-4">
        <h1 className="text-4xl md:text-6xl font-serif text-stone-900">The Collections</h1>
        <p className="text-stone-500 max-w-xl mx-auto font-light">
          Four elements. Four paths. <br/>
          Choose a collection to begin your journey into Korea's heritage.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {collections.map((collection) => (
          <Link 
            key={collection.id} 
            href={`/collections/${collection.id}`}
            className="group block relative aspect-[4/3] overflow-hidden rounded-sm"
          >
            <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
              <Image
                src={collection.heroImage}
                alt={collection.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
            </div>
            
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-6">
              <span className="text-sm uppercase tracking-widest mb-3 opacity-90 font-medium">
                {collection.subtitle}
              </span>
              <h2 className="text-3xl md:text-5xl font-serif italic mb-2">
                {collection.title}
              </h2>
              <p className="text-stone-200 text-sm max-w-xs opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                {collection.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
