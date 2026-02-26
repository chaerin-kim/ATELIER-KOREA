"use client";

import { useState } from "react";
import Link from "next/link";
import { useCollectionStore } from "@/store/collection-store";
import ateliersData from "@/data/ateliers.json";
import { IAtelier, PaceType, CollectionTheme, ISavedRoute } from "@/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2, ArrowRight, Check, Map, Save } from "lucide-react";
import { AtelierCard } from "@/features/ateliers/components/atelier-card";

export default function RouteBuilderPage() {
  const [step, setStep] = useState<'input' | 'processing' | 'result'>('input');

  // Inputs
  const [duration, setDuration] = useState(4);
  const [pace, setPace] = useState<PaceType>('Balanced');
  const [theme, setTheme] = useState<CollectionTheme | 'Any'>('Any');

  // Result
  const [generatedRoute, setGeneratedRoute] = useState<IAtelier[]>([]);

  const saveRoute = useCollectionStore((state) => state.saveRoute);

  const handleGenerate = () => {
    setStep('processing');

    setTimeout(() => {
      // Simple logic
      let candidates = ateliersData as IAtelier[];

      if (theme !== 'Any') {
        candidates = candidates.filter(a => a.collectionId === theme);
      }

      // Filter by pace if possible, but relax if too strict
      const paceMatch = candidates.filter(a => a.paceTag === pace);
      if (paceMatch.length > 0) candidates = paceMatch;

      // Select count based on duration
      const count = duration >= 5 ? 2 : 1;

      // Randomly pick
      const shuffled = [...candidates].sort(() => 0.5 - Math.random());
      setGeneratedRoute(shuffled.slice(0, count));

      setStep('result');
    }, 1500);
  };

  const handleSaveRoute = () => {
    const newRoute: ISavedRoute = {
      id: Date.now().toString(),
      title: `${duration} Days - ${pace} Pace Journey`,
      atelierSlugs: generatedRoute.map(a => a.slug),
      createdAt: new Date().toISOString(),
    };
    saveRoute(newRoute);
    alert("Route saved to My Collection!");
  };

  return (
    <main className="min-h-screen pt-24 pb-20 px-4 md:px-8 bg-stone-50 max-w-4xl mx-auto">
      <header className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-serif text-stone-900 mb-4">Travel Curator</h1>
        <p className="text-stone-500 font-light max-w-lg mx-auto">
          Tell us your time and tempo. We will curate a heritage journey for you.
        </p>
      </header>

      {step === 'input' && (
        <div className="bg-white p-8 md:p-12 rounded-sm shadow-sm border border-stone-100 space-y-10">
          {/* Duration Input */}
          <div className="space-y-4">
            <label className="text-sm uppercase tracking-widest text-stone-400 font-medium">How many days?</label>
            <div className="flex gap-4">
              {[2, 3, 4, 5, 6, 7].map((d) => (
                <button
                  key={d}
                  onClick={() => setDuration(d)}
                  className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center text-lg font-serif transition-all",
                    duration === d ? "bg-stone-900 text-white" : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                  )}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Pace Input */}
          <div className="space-y-4">
            <label className="text-sm uppercase tracking-widest text-stone-400 font-medium">Your Pace</label>
            <div className="grid grid-cols-3 gap-4">
              {(['Slow', 'Balanced', 'Deep'] as PaceType[]).map((p) => (
                <button
                  key={p}
                  onClick={() => setPace(p)}
                  className={cn(
                    "py-4 px-2 rounded-sm border transition-all text-center",
                    pace === p
                      ? "border-stone-900 bg-stone-50 text-stone-900 font-medium"
                      : "border-stone-200 text-stone-500 hover:border-stone-400"
                  )}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Theme Input */}
          <div className="space-y-4">
            <label className="text-sm uppercase tracking-widest text-stone-400 font-medium">Preferred Theme</label>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value as any)}
              className="w-full p-4 border border-stone-200 rounded-sm bg-transparent font-serif text-lg focus:outline-none focus:border-stone-900"
            >
              <option value="Any">Surprise Me (Any Theme)</option>
              <option value="Sea">Sea - The Infinite Horizon</option>
              <option value="Ritual">Ritual - Sacred Silence</option>
              <option value="Grain">Grain - Earth's Texture</option>
              <option value="Raw">Raw - Wild Elements</option>
            </select>
          </div>

          <div className="pt-8 flex justify-center">
            <Button size="lg" onClick={handleGenerate} className="px-12 text-lg h-14 bg-stone-900 text-stone-50">
              Curate My Journey <ArrowRight className="ml-2" />
            </Button>
          </div>
        </div>
      )}

      {step === 'processing' && (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="animate-spin text-stone-900 w-12 h-12 mb-6" />
          <p className="font-serif text-xl text-stone-600 animate-pulse">
            Consulting the archives...
          </p>
        </div>
      )}

      {step === 'result' && (
        <div className="space-y-12">
          <div className="bg-stone-900 text-stone-50 p-8 rounded-sm text-center">
            <span className="text-stone-400 text-xs uppercase tracking-widest mb-2 block">Your Curated Route</span>
            <h2 className="text-3xl md:text-4xl font-serif mb-4">
              {duration} Days, {pace} Pace
            </h2>
            <div className="flex justify-center gap-4 mt-8">
              <Button variant="outline" className="border-stone-600 text-stone-300 hover:text-stone-900 hover:bg-stone-200" onClick={handleSaveRoute}>
                <Save className="mr-2 h-4 w-4" /> Save Route
              </Button>
              <Button variant="ghost" className="text-stone-400 hover:text-white" onClick={() => setStep('input')}>
                Start Over
              </Button>
            </div>
          </div>

          {/* Timeline View */}
          <div className="relative border-l border-stone-300 ml-6 md:ml-12 pl-8 md:pl-12 space-y-16 py-8">
            {generatedRoute.map((atelier, index) => (
              <div key={atelier.slug} className="relative">
                {/* Timeline Dot */}
                <div className="absolute -left-[41px] md:-left-[57px] top-0 w-6 h-6 rounded-full bg-stone-900 border-4 border-stone-50 z-10" />

                <div className="mb-2 text-sm text-stone-500 uppercase tracking-widest font-medium">
                  Destination {index + 1}
                </div>

                <AtelierCard atelier={atelier} className="w-full max-w-sm" />

                <div className="mt-6 p-6 bg-white border border-stone-100 rounded-sm">
                  <h4 className="font-serif text-lg mb-2 flex items-center gap-2">
                    <Map size={16} /> Travel Logistics
                  </h4>
                  <p className="text-stone-600 font-light text-sm">
                    Arrive via {atelier.howToArrive.method} ({atelier.howToArrive.time}). <br />
                    Recommended stay: {atelier.recommendedNights} nights.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
