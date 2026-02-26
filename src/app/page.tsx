import { Hero } from "@/features/home/components/hero";
import { FeaturedCollections } from "@/features/home/components/featured-collections";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Hero />
      <FeaturedCollections />
      
      {/* Footer Placeholder */}
      <footer className="py-8 text-center text-stone-400 text-sm border-t border-stone-200 mt-auto">
        <p>&copy; {new Date().getFullYear()} ATELIER KOREA. All rights reserved.</p>
      </footer>
    </main>
  );
}
