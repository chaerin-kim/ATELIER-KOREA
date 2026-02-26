import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import collectionsData from "@/data/collections.json";
import ateliersData from "@/data/ateliers.json";
import { ICollection, IAtelier } from "@/types";
import { AtelierCard } from "@/features/ateliers/components/atelier-card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export async function generateStaticParams() {
  const collections = collectionsData as ICollection[];
  return collections.map((collection) => ({
    id: collection.id,
  }));
}

export default async function CollectionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const collections = collectionsData as ICollection[];
  const ateliers = ateliersData as IAtelier[];

  const collection = collections.find((c) => c.id === id);
  
  if (!collection) {
    notFound();
  }

  const collectionAteliers = ateliers.filter((a) => a.collectionId === id);

  return (
    <main className="min-h-screen pb-20 bg-stone-50">
      {/* Hero Section for Collection */}
      <section className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden flex items-end pb-20">
        <div className="absolute inset-0">
          <Image
            src={collection.heroImage}
            alt={collection.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/40 to-transparent" />
        </div>
        
        <div className="relative z-10 px-4 md:px-8 max-w-7xl mx-auto w-full text-white">
          <Link href="/collections" className="inline-flex items-center text-sm mb-6 opacity-80 hover:opacity-100 transition-opacity">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Collections
          </Link>
          <span className="block text-sm uppercase tracking-[0.3em] mb-2 text-atelier-highlight font-medium">
            {collection.subtitle} Collection
          </span>
          <h1 className="text-5xl md:text-7xl font-serif mb-6 leading-tight">
            {collection.title}
          </h1>
          <p className="text-lg md:text-xl font-light text-stone-200 max-w-2xl leading-relaxed">
            {collection.description}
          </p>
        </div>
      </section>

      {/* Atelier List */}
      <section className="px-4 md:px-8 py-20 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12 border-b border-stone-200 pb-4">
          <h2 className="text-3xl font-serif text-stone-800">
            The Ateliers
            <span className="text-stone-400 ml-4 text-lg font-sans font-light">
              {collectionAteliers.length} destinations
            </span>
          </h2>
        </div>

        {collectionAteliers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {collectionAteliers.map((atelier) => (
              <AtelierCard key={atelier.slug} atelier={atelier} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-stone-400 font-light italic">
            Ateliers coming soon to this collection.
          </div>
        )}
        
        <div className="mt-20 text-center">
          <p className="text-stone-500 mb-6 italic">
            Looking for something else?
          </p>
          <Button asChild variant="outline" className="border-stone-300 text-stone-600 hover:text-stone-900">
             <Link href="/collections">View All Collections</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
