"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = pathname === "/";
  const headerClass = cn(
    "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out px-6 py-4 flex items-center justify-between",
    isScrolled || !isHome
      ? "bg-stone-50/80 backdrop-blur-md border-b border-stone-200 text-stone-900"
      : "bg-transparent text-white"
  );

  const linkClass = cn(
    "text-sm tracking-wide hover:opacity-70 transition-opacity",
    isScrolled || !isHome ? "text-stone-600 hover:text-stone-900" : "text-white/90 hover:text-white"
  );

  return (
    <header className={headerClass}>
      <Link href="/" className="font-serif text-xl tracking-tighter z-50">
        ATELIER
      </Link>

      {/* Desktop Nav */}
      <nav className="hidden md:flex gap-8 items-center">
        <Link href="/collections" className={linkClass}>Collections</Link>
        <Link href="/route-builder" className={linkClass}>Travel Curator</Link>
        <Link href="/collection" className={linkClass}>My Collection</Link>
      </nav>

      {/* Mobile Menu Toggle */}
      <button 
        className="md:hidden z-50"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Nav Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-stone-50 z-40 flex flex-col items-center justify-center gap-8 text-stone-900">
          <Link href="/collections" className="text-2xl font-serif" onClick={() => setIsMobileMenuOpen(false)}>Collections</Link>
          <Link href="/route-builder" className="text-2xl font-serif" onClick={() => setIsMobileMenuOpen(false)}>Travel Curator</Link>
          <Link href="/collection" className="text-2xl font-serif" onClick={() => setIsMobileMenuOpen(false)}>My Collection</Link>
        </div>
      )}
    </header>
  );
}
