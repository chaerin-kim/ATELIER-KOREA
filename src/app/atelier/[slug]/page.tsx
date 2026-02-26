import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ateliersData from "@/data/ateliers.json";
import { IAtelier } from "@/types";
import { AtelierActions } from "@/features/ateliers/components/atelier-actions";
import { ArrowLeft, Moon, MapPin, Coffee, Utensils } from "lucide-react";
import { cn } from "@/lib/utils";

// Generate static params for all ateliers
export async function generateStaticParams() {
  const ateliers = ateliersData as IAtelier[];
  return ateliers.map((atelier) => ({
    slug: atelier.slug,
  }));
}

export default async function AtelierDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const ateliers = ateliersData as IAtelier[];
  const atelier = ateliers.find((a) => a.slug === slug);

  if (!atelier) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-stone-50 pb-32">
      {/* Hero Section */}
      <section className="relative h-screen w-full">
        <Image
          src={atelier.heroImage}
          alt={atelier.displayName}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/20" />
        
        <div className="absolute top-0 left-0 p-6 z-20">
          <Link href={`/collections/${atelier.collectionId}`} className="text-white/80 hover:text-white flex items-center gap-2 transition-colors">
            <ArrowLeft size={20} /> Back to {atelier.collectionId}
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 text-white z-10 bg-gradient-to-t from-black/60 to-transparent pt-32">
          <span className="text-sm uppercase tracking-[0.3em] mb-4 block opacity-80">
            {atelier.collectionId} Collection
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif leading-none mb-6">
            {atelier.displayName}
          </h1>
          <div className="flex gap-6 text-sm font-light tracking-wide opacity-90">
             <span className="flex items-center gap-2"><MapPin size={14} /> {atelier.location.region}</span>
             <span className="flex items-center gap-2"><Moon size={14} /> {atelier.recommendedNights} Nights</span>
             <span className="uppercase border border-white/30 px-2 py-0.5 text-xs rounded-full">{atelier.paceTag} Pace</span>
          </div>
        </div>
      </section>

      {/* Concept Section */}
      <section className="py-24 px-6 md:px-12 max-w-4xl mx-auto text-center">
        <div className="space-y-6">
          {atelier.conceptLines.map((line, idx) => (
            <p key={idx} className="text-2xl md:text-4xl font-serif text-stone-800 leading-relaxed">
              {line}
            </p>
          ))}
        </div>
        <div className="mt-16 pt-8 border-t border-stone-200">
          <p className="text-stone-500 italic font-serif text-lg">
            "{atelier.rarityText}"
          </p>
        </div>
      </section>

      {/* The Stay */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <h2 className="text-xs uppercase tracking-widest text-stone-400 mb-12 border-b border-stone-100 pb-4">
            Where to Stay
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {atelier.stayRecommendations.map((stay, idx) => (
              <div key={idx} className="space-y-4 group">
                <div className="aspect-video bg-stone-100 rounded-sm overflow-hidden relative">
                  {/* Placeholder for stay image */}
                  <div className="absolute inset-0 bg-stone-200 flex items-center justify-center text-stone-400 font-light">
                    Stay Image
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-serif text-stone-900">{stay.name}</h3>
                  <span className="text-xs text-stone-500 uppercase tracking-wider mb-2 block">{stay.type}</span>
                  <p className="text-stone-600 font-light leading-relaxed">
                    {stay.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Table & Arrival */}
      <section className="py-20 max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-16">
        <div>
          <h2 className="text-xs uppercase tracking-widest text-stone-400 mb-8 border-b border-stone-200 pb-4">
            The Table
          </h2>
          <div className="space-y-8">
            {atelier.tableHighlights.map((table, idx) => (
              <div key={idx} className="flex gap-4 items-start">
                <div className="bg-stone-100 p-3 rounded-full text-stone-600">
                  <Utensils size={18} />
                </div>
                <div>
                  <h3 className="text-lg font-serif text-stone-900">{table.name}</h3>
                  <p className="text-stone-500 text-sm mb-1">{table.dish}</p>
                  <p className="text-stone-600 font-light text-sm">
                    {table.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xs uppercase tracking-widest text-stone-400 mb-8 border-b border-stone-200 pb-4">
            How to Arrive
          </h2>
          <div className="bg-stone-100 p-8 rounded-sm space-y-6">
            <div className="flex justify-between items-center border-b border-stone-200 pb-4">
              <span className="text-stone-500 text-sm">Travel Time</span>
              <span className="font-serif text-xl">{atelier.howToArrive.time}</span>
            </div>
            <div className="flex justify-between items-center border-b border-stone-200 pb-4">
              <span className="text-stone-500 text-sm">Method</span>
              <span className="font-medium">{atelier.howToArrive.method}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-stone-500 text-sm">Transfer</span>
              <span className="font-medium">{atelier.howToArrive.transferSimplicity}</span>
            </div>
            
            {atelier.howToArrive.travelMinutesFromSeoul && (
              <p className="text-xs text-stone-400 mt-4 text-center">
                *Estimated from Seoul Station / Incheon Airport
              </p>
            )}
          </div>
        </div>
      </section>
      
      {/* Floating Actions */}
      <AtelierActions atelier={atelier} />
    </main>
  );
}
