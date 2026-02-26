import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

/** About 페이지 메타데이터 */
export const metadata = {
  title: "About | ATELIER KOREA",
  description:
    "Why ATELIER KOREA exists — curated heritage travel beyond Seoul.",
};

/** 비교 테이블 데이터 */
const COMPARISON_DATA = [
  {
    label: "Discovery",
    conventional: "Ranked lists & algorithms",
    atelier: "Curated collections by sensibility",
  },
  {
    label: "Trust",
    conventional: "Star ratings & stranger reviews",
    atelier: "Editorial imagery & brand authority",
  },
  {
    label: "Question",
    conventional: '"What is there?"',
    atelier: '"Why should I feel this?"',
  },
  {
    label: "Audience",
    conventional: "Everyone, everywhere",
    atelier: "Selective — for travelers with taste",
  },
] as const;

/** 4개 컬렉션 테마 데이터 */
const COLLECTION_THEMES = [
  {
    id: "Sea",
    title: "The Infinite Horizon",
    description: "Waves, silence, and the edge of thought.",
    color: "bg-atelier-sea",
  },
  {
    id: "Ritual",
    title: "Sacred Silence",
    description: "Timeless practices in a rushing world.",
    color: "bg-atelier-ritual",
  },
  {
    id: "Grain",
    title: "Earth's Texture",
    description: "Handcraft, warmth, and deep roots.",
    color: "bg-atelier-grain",
  },
  {
    id: "Raw",
    title: "Wild Elements",
    description: "Unfiltered nature, volcanic and vast.",
    color: "bg-atelier-raw",
  },
] as const;

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-stone-50">
      {/* ─── Hero Section ─── */}
      <section className="relative h-[70vh] md:h-[80vh] w-full flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero/slide-1.png"
            alt="Korean heritage courtyard"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/30 to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-12 pb-16 md:pb-24 text-white">
          <p className="text-xs md:text-sm uppercase tracking-[0.4em] text-stone-300 mb-4">
            Our Story
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif leading-[1.05] mb-6">
            Korea is deeper
            <br />
            <span className="italic">than Seoul.</span>
          </h1>
          <p className="text-lg md:text-xl font-light text-stone-200 max-w-2xl leading-relaxed">
            We exist because the most meaningful places in Korea are the ones
            most travelers never find.
          </p>
        </div>
      </section>

      {/* ─── The Problem ─── */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-4xl mx-auto">
        <p className="text-xs uppercase tracking-[0.3em] text-stone-400 mb-8">
          The Problem
        </p>

        <h2 className="text-3xl md:text-5xl font-serif text-stone-900 leading-tight mb-12">
          97% of foreign visitors
          <br />
          <span className="text-stone-400">see 3% of Korea.</span>
        </h2>

        <div className="space-y-6 text-lg font-light text-stone-600 leading-relaxed">
          <p>
            Seoul. Busan. Maybe Jeju. That&apos;s the itinerary for nearly every
            foreign traveler. And it makes sense — these cities are familiar,
            well-documented, and easy to navigate.
          </p>
          <p>
            But Korea&apos;s most profound cultural heritage lives elsewhere.
            In Andong, where 600-year-old houses still breathe. In Yangyang,
            where dawn breaks over an empty shore. In Jeonju, where hanji paper
            is still pressed by hand.
          </p>
          <p>
            These places aren&apos;t hidden by distance — most are under 3 hours
            from Seoul. They&apos;re hidden by{" "}
            <strong className="text-stone-800">a lack of trust.</strong>
          </p>
        </div>
      </section>

      {/* ─── The Fear ─── */}
      <section className="bg-stone-900 text-white py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <div className="border-l-2 border-stone-600 pl-8 md:pl-12">
            <p className="text-2xl md:text-4xl font-serif italic leading-snug text-stone-200 mb-8">
              &ldquo;What if I travel 3 hours to the countryside
              <br className="hidden md:block" />
              and it&apos;s not worth it?&rdquo;
            </p>
            <p className="text-stone-400 font-light leading-relaxed max-w-2xl">
              This is the real barrier. Not distance, not language — but the
              fear of disappointment. When you search for these places, you
              find sparse English reviews and low-quality tourism photos. Nothing
              that says{" "}
              <em className="text-stone-200">
                &ldquo;this place is worth your time.&rdquo;
              </em>
            </p>
          </div>
        </div>
      </section>

      {/* ─── Our Answer ─── */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-5xl mx-auto">
        <p className="text-xs uppercase tracking-[0.3em] text-stone-400 mb-8">
          Our Answer
        </p>

        <h2 className="text-3xl md:text-5xl font-serif text-stone-900 leading-tight mb-6">
          Curation, not information.
        </h2>
        <p className="text-lg font-light text-stone-600 leading-relaxed max-w-3xl mb-20">
          We don&apos;t list every place. We select a few and present them the
          way they deserve — with editorial imagery, poetic storytelling, and a
          level of craft that says:{" "}
          <strong className="text-stone-800">
            &ldquo;If we chose this place, it will not disappoint you.&rdquo;
          </strong>
        </p>

        {/* Comparison Grid */}
        <div className="border border-stone-200 rounded-sm overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-3 bg-stone-100 text-xs uppercase tracking-widest text-stone-500">
            <div className="p-4 md:p-6" />
            <div className="p-4 md:p-6 border-l border-stone-200">
              Conventional Travel
            </div>
            <div className="p-4 md:p-6 border-l border-stone-200 text-stone-800 font-medium">
              Atelier Korea
            </div>
          </div>

          {/* Table Rows */}
          {COMPARISON_DATA.map((row) => (
            <div
              key={row.label}
              className="grid grid-cols-3 border-t border-stone-200"
            >
              <div className="p-4 md:p-6 text-sm font-medium text-stone-800">
                {row.label}
              </div>
              <div className="p-4 md:p-6 border-l border-stone-200 text-sm text-stone-500 font-light">
                {row.conventional}
              </div>
              <div className="p-4 md:p-6 border-l border-stone-200 text-sm text-stone-800">
                {row.atelier}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Two Pillars ─── */}
      <section className="bg-white py-24 md:py-32">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <p className="text-xs uppercase tracking-[0.3em] text-stone-400 mb-8">
            How We Build Trust
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            {/* Pillar 1 */}
            <div className="space-y-6">
              <div className="w-12 h-[2px] bg-stone-900" />
              <h3 className="text-2xl md:text-3xl font-serif text-stone-900">
                Premium Visuals
                <br />
                <span className="text-stone-400 italic">as a promise.</span>
              </h3>
              <p className="text-stone-600 font-light leading-relaxed">
                Every page features editorial-grade photography, cinematic
                full-screen layouts, and magazine-level typography. This
                isn&apos;t decoration — it&apos;s a signal. When the
                presentation is this considered, the place must be too. The
                visual quality becomes a guarantee of the experience itself.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="space-y-6">
              <div className="w-12 h-[2px] bg-stone-900" />
              <h3 className="text-2xl md:text-3xl font-serif text-stone-900">
                Taste matching
                <br />
                <span className="text-stone-400 italic">
                  over mass appeal.
                </span>
              </h3>
              <p className="text-stone-600 font-light leading-relaxed">
                We don&apos;t show you everything — we show you{" "}
                <em>your</em> thing. Four sensibility-driven collections let
                you find places that resonate with who you are, not just what&apos;s
                popular. The moment you choose a collection, the destination
                stops being a gamble and starts feeling like{" "}
                <strong className="text-stone-800">your discovery.</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── The Collections ─── */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-5xl mx-auto">
        <p className="text-xs uppercase tracking-[0.3em] text-stone-400 mb-8">
          Four Sensibilities
        </p>
        <h2 className="text-3xl md:text-5xl font-serif text-stone-900 leading-tight mb-16">
          Choose by feeling,
          <br />
          <span className="text-stone-400">not by location.</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {COLLECTION_THEMES.map((theme) => (
            <Link
              key={theme.id}
              href={`/collections/${theme.id}`}
              className="group flex items-start gap-5 p-6 md:p-8 bg-white border border-stone-100 rounded-sm hover:border-stone-300 transition-colors"
            >
              <div
                className={`w-3 h-3 rounded-full mt-2 ${theme.color} shrink-0`}
              />
              <div>
                <h3 className="font-serif text-xl md:text-2xl text-stone-900 mb-1 group-hover:italic transition-all">
                  {theme.title}
                </h3>
                <p className="text-xs uppercase tracking-widest text-stone-400 mb-3">
                  {theme.id}
                </p>
                <p className="text-stone-500 font-light text-sm leading-relaxed">
                  {theme.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── The Piece System ─── */}
      <section className="bg-stone-900 text-white py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-stone-500 mb-8">
            Collect Your Journey
          </p>
          <h2 className="text-3xl md:text-5xl font-serif leading-tight mb-8">
            Every place becomes
            <br />
            <span className="italic text-stone-300">a piece of you.</span>
          </h2>
          <p className="text-stone-400 font-light leading-relaxed max-w-2xl mx-auto mb-12">
            At each atelier, you answer a question — about silence, texture,
            the ocean, or the wind. Your answer generates a personal poetic
            card, a &ldquo;Piece,&rdquo; that captures your experience in
            words. Collect them all, and your journey becomes a story only you
            can tell.
          </p>

          <div className="inline-flex flex-col items-center gap-4 bg-white/5 border border-white/10 rounded-sm p-8 md:p-10 max-w-md mx-auto">
            <p className="text-sm text-stone-500 uppercase tracking-widest">
              Example
            </p>
            <p className="font-serif text-lg text-stone-300 italic">
              &ldquo;What does the ocean teach you?&rdquo;
            </p>
            <div className="w-8 h-[1px] bg-stone-600 my-2" />
            <p className="text-stone-400 text-sm">You chose: Patience</p>
            <p className="font-serif text-xl text-white leading-snug">
              &ldquo;The tide knows no haste.
              <br />
              Neither do I.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* ─── Who This Is For ─── */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-4xl mx-auto">
        <p className="text-xs uppercase tracking-[0.3em] text-stone-400 mb-8">
          Who This Is For
        </p>
        <h2 className="text-3xl md:text-5xl font-serif text-stone-900 leading-tight mb-12">
          Not for everyone.
          <br />
          <span className="text-stone-400 italic">That&apos;s the point.</span>
        </h2>

        <div className="space-y-8 text-stone-600 font-light leading-relaxed">
          <p className="text-lg">
            ATELIER KOREA is for the traveler who chooses Aesop over duty-free
            perfume. Who reads Kinfolk, not guidebooks. Who would rather sit in
            a 400-year-old courtyard than queue for a photo spot.
          </p>
          <p className="text-lg">
            These travelers don&apos;t need more options — they need{" "}
            <strong className="text-stone-800">better curation.</strong> A
            trusted voice that says: &ldquo;Go here. Trust us. You won&apos;t
            regret it.&rdquo;
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-stone-200">
            {[
              { label: "Age", value: "25 – 40" },
              { label: "Style", value: "Slow Travel" },
              { label: "Values", value: "Depth over speed" },
              { label: "Sensibility", value: "Quiet Luxury" },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-xs uppercase tracking-widest text-stone-400 mb-2">
                  {item.label}
                </p>
                <p className="font-serif text-lg text-stone-800">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="bg-white border-t border-stone-200 py-24 md:py-32">
        <div className="max-w-3xl mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-5xl font-serif text-stone-900 mb-6">
            Begin your curation.
          </h2>
          <p className="text-stone-500 font-light mb-10 max-w-lg mx-auto">
            Choose a collection. Discover an atelier. Collect your pieces. Your
            journey into Korea&apos;s hidden heritage starts here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-stone-900 text-stone-50 hover:bg-stone-800 px-10 py-6 text-sm tracking-[0.2em] uppercase"
            >
              <Link href="/collections">
                Explore Collections <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-stone-300 text-stone-600 hover:text-stone-900 px-10 py-6 text-sm tracking-[0.2em] uppercase"
            >
              <Link href="/route-builder">Curate My Journey</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="py-8 text-center text-stone-400 text-sm border-t border-stone-200">
        <p>
          &copy; {new Date().getFullYear()} ATELIER KOREA. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
