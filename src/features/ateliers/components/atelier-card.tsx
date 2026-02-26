"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { IAtelier } from "@/types";
import { cn } from "@/lib/utils";

interface AtelierCardProps {
  atelier: IAtelier;
  className?: string;
}

export function AtelierCard({ atelier, className }: AtelierCardProps) {
  return (
    <Link href={`/atelier/${atelier.slug}`} className={cn("group block relative overflow-hidden rounded-sm aspect-[3/4]", className)}>
      <motion.div
        className="absolute inset-0 z-0"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image
          src={atelier.heroImage}
          alt={atelier.displayName}
          fill
          className="object-cover transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
      </motion.div>

      <div className="absolute bottom-0 left-0 w-full p-6 text-white z-10 flex flex-col gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
        <span className="text-xs uppercase tracking-widest opacity-80 font-sans">
          {atelier.collectionId} Collection
        </span>
        <h3 className="text-2xl font-serif leading-tight">
          {atelier.displayName}
        </h3>
        <p className="text-sm text-stone-300 font-light line-clamp-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
          {atelier.conceptLines[0]}
        </p>
      </div>
    </Link>
  );
}
