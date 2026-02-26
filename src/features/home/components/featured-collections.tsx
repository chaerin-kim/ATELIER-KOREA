"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ICollection } from "@/types";

const COLLECTIONS: ICollection[] = [
  {
    id: "Sea",
    title: "The Infinite Horizon",
    subtitle: "Sea",
    heroImage: "/images/hero/slide-3.jpg",
    description: "",
    atelierSlugs: [],
  },
  {
    id: "Ritual",
    title: "Sacred Silence",
    subtitle: "Ritual",
    heroImage: "/images/hero/slide-1.jpg",
    description: "",
    atelierSlugs: [],
  },
  {
    id: "Grain",
    title: "Earth's Texture",
    subtitle: "Grain",
    heroImage: "/images/grain/gallery3.jpg",
    description: "",
    atelierSlugs: [],
  },
  {
    id: "Raw",
    title: "Wild Elements",
    subtitle: "Raw",
    heroImage: "/images/hero/slide-2.jpg",
    description: "",
    atelierSlugs: [],
  },
];

export function FeaturedCollections() {
  return (
    <section className="py-20 px-4 md:px-8 bg-stone-50">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-5xl font-serif text-stone-900">
            Curated Collections
          </h2>
          <p className="text-stone-500 max-w-2xl mx-auto font-light">
            Each collection is a curated journey through Korea&apos;s hidden
            heritage. Choose your pace, choose your element.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[80vh] w-full">
          {COLLECTIONS.map((collection) => (
            <Link
              key={collection.id}
              href={`/collections/${collection.id}`}
              className="group relative overflow-hidden rounded-sm w-full h-full block"
            >
              <motion.div
                className="absolute inset-0 z-0"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <img
                  src={collection.heroImage}
                  alt={collection.title}
                  className="w-full h-full object-cover transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-500" />
              </motion.div>

              <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 text-center p-6">
                <span className="text-xs uppercase tracking-[0.3em] mb-2 opacity-80 group-hover:opacity-100 transition-opacity">
                  {collection.subtitle}
                </span>
                <h3 className="text-3xl md:text-4xl font-serif italic mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  {collection.title}
                </h3>
                <span className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100 text-sm border-b border-white pb-1">
                  Discover Collection
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
