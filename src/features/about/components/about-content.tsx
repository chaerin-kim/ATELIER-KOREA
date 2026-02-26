"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

type TLang = "en" | "ko";

/** 다국어 텍스트 매핑 */
const TEXT = {
  // ─── Hero ───
  heroLabel: {
    en: "Our Story",
    ko: "우리의 이야기",
  },
  heroTitle1: {
    en: "Korea is deeper",
    ko: "한국은 서울보다",
  },
  heroTitle2: {
    en: "than Seoul.",
    ko: "훨씬 깊습니다.",
  },
  heroDesc: {
    en: "We exist because the most meaningful places in Korea are the ones most travelers never find.",
    ko: "우리가 존재하는 이유는, 한국에서 가장 의미 있는 장소들이 대부분의 여행자가 절대 발견하지 못하는 곳에 있기 때문입니다.",
  },

  // ─── The Problem ───
  problemLabel: {
    en: "The Problem",
    ko: "문제 인식",
  },
  problemTitle1: {
    en: "97% of foreign visitors",
    ko: "외국인 방문객의 97%가",
  },
  problemTitle2: {
    en: "see 3% of Korea.",
    ko: "한국의 3%만 봅니다.",
  },
  problemP1: {
    en: "Seoul. Busan. Maybe Jeju. That's the itinerary for nearly every foreign traveler. And it makes sense — these cities are familiar, well-documented, and easy to navigate.",
    ko: "서울. 부산. 어쩌면 제주. 이것이 거의 모든 외국인 여행자의 여행 일정입니다. 이해할 수 있습니다 — 이 도시들은 익숙하고, 정보가 잘 정리되어 있으며, 여행하기 쉽습니다.",
  },
  problemP2: {
    en: "But Korea's most profound cultural heritage lives elsewhere. In Andong, where 600-year-old houses still breathe. In Yangyang, where dawn breaks over an empty shore. In Jeonju, where hanji paper is still pressed by hand.",
    ko: "하지만 한국의 가장 깊은 문화유산은 다른 곳에 있습니다. 600년 된 고택이 여전히 숨 쉬는 안동. 빈 해변 위로 새벽이 밝아오는 양양. 한지를 아직도 손으로 뜨는 전주.",
  },
  problemP3Before: {
    en: "These places aren't hidden by distance — most are under 3 hours from Seoul. They're hidden by ",
    ko: "이 장소들은 거리 때문에 숨겨진 것이 아닙니다 — 대부분 서울에서 3시간 이내입니다. 이들이 숨겨진 이유는 ",
  },
  problemP3Bold: {
    en: "a lack of trust.",
    ko: "신뢰의 부재입니다.",
  },

  // ─── The Fear ───
  fearQuote: {
    en: "What if I travel 3 hours to the countryside and it's not worth it?",
    ko: "지방까지 3시간이나 갔는데 별로이면 어쩌지?",
  },
  fearDescBefore: {
    en: "This is the real barrier. Not distance, not language — but the fear of disappointment. When you search for these places, you find sparse English reviews and low-quality tourism photos. Nothing that says ",
    ko: "이것이 진짜 장벽입니다. 거리도 아니고, 언어도 아닌 — 실망에 대한 두려움. 이런 장소를 검색하면 영어 리뷰는 거의 없고, 투박한 관광 사진뿐입니다. ",
  },
  fearDescEm: {
    en: "this place is worth your time.",
    ko: "이곳은 당신의 시간을 들일 가치가 있습니다.",
  },
  fearDescAfter: {
    en: "",
    ko: "라고 말해주는 것이 아무것도 없습니다.",
  },

  // ─── Our Answer ───
  answerLabel: {
    en: "Our Answer",
    ko: "우리의 해답",
  },
  answerTitle: {
    en: "Curation, not information.",
    ko: "정보 나열이 아닌, 큐레이션.",
  },
  answerDescBefore: {
    en: "We don't list every place. We select a few and present them the way they deserve — with editorial imagery, poetic storytelling, and a level of craft that says: ",
    ko: "우리는 모든 장소를 나열하지 않습니다. 소수를 선별하고, 그 장소가 마땅히 받아야 할 방식으로 보여줍니다 — 에디토리얼 이미지, 시적 스토리텔링, 그리고 이렇게 말하는 수준의 완성도: ",
  },
  answerDescBold: {
    en: "If we chose this place, it will not disappoint you.",
    ko: "우리가 이 장소를 선택했다면, 당신을 실망시키지 않을 것입니다.",
  },

  // ─── Comparison Table ───
  tableHeaderConventional: {
    en: "Conventional Travel",
    ko: "기존 여행 플랫폼",
  },
  tableHeaderAtelier: {
    en: "Atelier Korea",
    ko: "아틀리에 코리아",
  },

  // ─── Two Pillars ───
  pillarsLabel: {
    en: "How We Build Trust",
    ko: "신뢰를 만드는 방법",
  },
  pillar1Title1: {
    en: "Premium Visuals",
    ko: "프리미엄 비주얼,",
  },
  pillar1Title2: {
    en: "as a promise.",
    ko: "그것이 약속입니다.",
  },
  pillar1Desc: {
    en: "Every page features editorial-grade photography, cinematic full-screen layouts, and magazine-level typography. This isn't decoration — it's a signal. When the presentation is this considered, the place must be too. The visual quality becomes a guarantee of the experience itself.",
    ko: "모든 페이지에 에디토리얼급 사진, 시네마틱 풀스크린 레이아웃, 매거진 수준의 타이포그래피를 적용합니다. 이건 장식이 아닙니다 — 하나의 시그널입니다. 이 정도로 정성을 담아 보여주는 곳이라면, 그 장소도 분명 그럴 것입니다. 비주얼의 퀄리티가 곧 경험 자체의 보증이 됩니다.",
  },
  pillar2Title1: {
    en: "Taste matching",
    ko: "취향 매칭,",
  },
  pillar2Title2: {
    en: "over mass appeal.",
    ko: "대중성보다 중요합니다.",
  },
  pillar2Desc: {
    en: "We don't show you everything — we show you your thing. Four sensibility-driven collections let you find places that resonate with who you are, not just what's popular. The moment you choose a collection, the destination stops being a gamble and starts feeling like your discovery.",
    ko: "우리는 모든 것을 보여주지 않습니다 — 당신의 것을 보여줍니다. 네 가지 감성 기반 컬렉션을 통해, 단순히 인기 있는 곳이 아니라 당신과 공명하는 장소를 찾을 수 있습니다. 컬렉션을 선택하는 순간, 여행지는 도박이 아닌 나만의 발견이 됩니다.",
  },

  // ─── Collections ───
  collectionsLabel: {
    en: "Four Sensibilities",
    ko: "네 가지 감성",
  },
  collectionsTitle1: {
    en: "Choose by feeling,",
    ko: "장소가 아닌,",
  },
  collectionsTitle2: {
    en: "not by location.",
    ko: "감성으로 선택하세요.",
  },

  // ─── Piece System ───
  pieceLabel: {
    en: "Collect Your Journey",
    ko: "여행을 수집하세요",
  },
  pieceTitle1: {
    en: "Every place becomes",
    ko: "모든 장소가",
  },
  pieceTitle2: {
    en: "a piece of you.",
    ko: "당신의 일부가 됩니다.",
  },
  pieceDesc: {
    en: 'At each atelier, you answer a question\n— about silence, texture, the ocean, or the wind.\nYour answer generates a personal poetic card,\na "Piece," that captures your experience in words.\nCollect them all,\nand your journey becomes a story only you can tell.',
    ko: "각 아틀리에에서 질문에 답합니다.\n침묵, 질감, 바다, 혹은 바람에 대해.\n당신의 답변은 경험을 문장으로 담아낸\n개인화된 시적 카드, \"Piece\"를 생성합니다.\n모든 Piece를 모으면,\n당신의 여행은 오직 당신만이\n들려줄 수 있는 이야기가 됩니다.",
  },
  pieceExample: {
    en: "Example",
    ko: "예시",
  },
  pieceQuestion: {
    en: "What does the ocean teach you?",
    ko: "바다가 당신에게 가르쳐주는 것은?",
  },
  pieceChoice: {
    en: "You chose: Patience",
    ko: "당신의 선택: 인내",
  },
  pieceResult1: {
    en: "The tide knows no haste.",
    ko: "파도는 서두르지 않는다.",
  },
  pieceResult2: {
    en: "Neither do I.",
    ko: "나 역시 그렇다.",
  },

  // ─── Who This Is For ───
  whoLabel: {
    en: "Who This Is For",
    ko: "누구를 위한 서비스인가",
  },
  whoTitle1: {
    en: "Not for everyone.",
    ko: "모두를 위한 것이 아닙니다.",
  },
  whoTitle2: {
    en: "That's the point.",
    ko: "그것이 핵심입니다.",
  },
  whoP1: {
    en: "ATELIER KOREA is for the traveler who chooses Aesop over duty-free perfume. Who reads Kinfolk, not guidebooks. Who would rather sit in a 400-year-old courtyard than queue for a photo spot.",
    ko: "ATELIER KOREA는 면세 향수 대신 이솝을 고르는 여행자를 위한 것입니다. 가이드북이 아닌 킨포크를 읽는 사람. 인증샷 줄 서기보다 400년 된 마당에 앉아 있고 싶은 사람.",
  },
  whoP2Before: {
    en: "These travelers don't need more options — they need ",
    ko: "이 여행자들에게 필요한 것은 더 많은 선택지가 아닙니다 — ",
  },
  whoP2Bold: {
    en: "better curation.",
    ko: "더 나은 큐레이션입니다.",
  },
  whoP2After: {
    en: ' A trusted voice that says: "Go here. Trust us. You won\'t regret it."',
    ko: ' "여기로 가세요. 우릴 믿으세요. 후회하지 않을 겁니다."라고 말해주는 신뢰할 수 있는 목소리.',
  },

  // ─── Who Stats ───
  statAge: { en: "Age", ko: "연령대" },
  statAgeVal: { en: "25 – 40", ko: "25 – 40" },
  statStyle: { en: "Style", ko: "여행 스타일" },
  statStyleVal: { en: "Slow Travel", ko: "슬로우 트래블" },
  statValues: { en: "Values", ko: "가치관" },
  statValuesVal: { en: "Depth over speed", ko: "속도보다 깊이" },
  statSensibility: { en: "Sensibility", ko: "감성" },
  statSensibilityVal: { en: "Quiet Luxury", ko: "콰이어트 럭셔리" },

  // ─── CTA ───
  ctaTitle: {
    en: "Begin your curation.",
    ko: "당신의 큐레이션을 시작하세요.",
  },
  ctaDesc: {
    en: "Choose a collection. Discover an atelier. Collect your pieces. Your journey into Korea's hidden heritage starts here.",
    ko: "컬렉션을 선택하세요. 아틀리에를 발견하세요. Piece를 수집하세요. 한국의 숨겨진 유산으로의 여행이 여기서 시작됩니다.",
  },
  ctaBtn1: {
    en: "Explore Collections",
    ko: "컬렉션 둘러보기",
  },
  ctaBtn2: {
    en: "Curate My Journey",
    ko: "나의 여행 큐레이션",
  },

  // ─── Toggle ───
  langToggle: {
    en: "한국어",
    ko: "English",
  },
} as const;

/** 비교 테이블 데이터 */
const COMPARISON_DATA: {
  label: Record<TLang, string>;
  conventional: Record<TLang, string>;
  atelier: Record<TLang, string>;
}[] = [
    {
      label: { en: "Discovery", ko: "탐색 방식" },
      conventional: { en: "Ranked lists & algorithms", ko: "순위 리스트 & 알고리즘" },
      atelier: { en: "Curated collections by sensibility", ko: "감성 기반 컬렉션 큐레이션" },
    },
    {
      label: { en: "Trust", ko: "신뢰 구조" },
      conventional: { en: "Star ratings & stranger reviews", ko: "별점 & 익명 리뷰" },
      atelier: { en: "Editorial imagery & brand authority", ko: "에디토리얼 이미지 & 브랜드 권위" },
    },
    {
      label: { en: "Question", ko: "핵심 질문" },
      conventional: { en: '"What is there?"', ko: '"뭐가 있나?"' },
      atelier: { en: '"Why should I feel this?"', ko: '"왜 이곳을 느껴야 하는가?"' },
    },
    {
      label: { en: "Audience", ko: "대상" },
      conventional: { en: "Everyone, everywhere", ko: "모든 사람, 어디서나" },
      atelier: { en: "Selective — for travelers with taste", ko: "선별적 — 취향 있는 여행자를 위해" },
    },
  ];

/** 컬렉션 테마 데이터 */
const COLLECTION_THEMES: {
  id: string;
  title: Record<TLang, string>;
  description: Record<TLang, string>;
  color: string;
}[] = [
    {
      id: "Sea",
      title: { en: "The Infinite Horizon", ko: "끝없는 수평선" },
      description: {
        en: "Waves, silence, and the edge of thought.",
        ko: "파도, 침묵, 그리고 사유의 끝.",
      },
      color: "bg-atelier-sea",
    },
    {
      id: "Ritual",
      title: { en: "Sacred Silence", ko: "신성한 침묵" },
      description: {
        en: "Timeless practices in a rushing world.",
        ko: "빠르게 흘러가는 세상 속, 시간을 초월한 의례.",
      },
      color: "bg-atelier-ritual",
    },
    {
      id: "Grain",
      title: { en: "Earth's Texture", ko: "흙의 질감" },
      description: {
        en: "Handcraft, warmth, and deep roots.",
        ko: "수공예, 온기, 그리고 깊은 뿌리.",
      },
      color: "bg-atelier-grain",
    },
    {
      id: "Raw",
      title: { en: "Wild Elements", ko: "야생의 원소" },
      description: {
        en: "Unfiltered nature, volcanic and vast.",
        ko: "여과 없는 자연, 화산과 광활함.",
      },
      color: "bg-atelier-raw",
    },
  ];

/** About 페이지 본문 (한/영 토글 지원) */
export function AboutContent() {
  const [lang, setLang] = useState<TLang>("en");

  const t = (key: keyof typeof TEXT) => TEXT[key][lang];

  return (
    <main className="min-h-screen bg-stone-50">
      {/* ─── Language Toggle (Floating) ─── */}
      <button
        onClick={() => setLang((prev) => (prev === "en" ? "ko" : "en"))}
        className={cn(
          "fixed top-20 right-6 z-50 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 shadow-lg",
          "bg-stone-900 text-stone-50 hover:bg-stone-800"
        )}
        aria-label="Toggle language"
      >
        <Globe size={14} />
        {t("langToggle")}
      </button>

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
            {t("heroLabel")}
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif leading-[1.05] mb-6">
            {t("heroTitle1")}
            <br />
            <span className="italic">{t("heroTitle2")}</span>
          </h1>
          <p className="text-lg md:text-xl font-light text-stone-200 max-w-2xl leading-relaxed">
            {t("heroDesc")}
          </p>
        </div>
      </section>

      {/* ─── The Problem ─── */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-4xl mx-auto">
        <p className="text-xs uppercase tracking-[0.3em] text-stone-400 mb-8">
          {t("problemLabel")}
        </p>

        <h2 className="text-3xl md:text-5xl font-serif text-stone-900 leading-tight mb-12">
          {t("problemTitle1")}
          <br />
          <span className="text-stone-400">{t("problemTitle2")}</span>
        </h2>

        <div className="space-y-6 text-lg font-light text-stone-600 leading-relaxed">
          <p>{t("problemP1")}</p>
          <p>{t("problemP2")}</p>
          <p>
            {t("problemP3Before")}
            <strong className="text-stone-800">{t("problemP3Bold")}</strong>
          </p>
        </div>
      </section>

      {/* ─── The Fear ─── */}
      <section className="bg-stone-900 text-white py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <div className="border-l-2 border-stone-600 pl-8 md:pl-12">
            <p className="text-2xl md:text-4xl font-serif italic leading-snug text-stone-200 mb-8">
              &ldquo;{t("fearQuote")}&rdquo;
            </p>
            <p className="text-stone-400 font-light leading-relaxed max-w-2xl">
              {t("fearDescBefore")}
              <em className="text-stone-200">
                &ldquo;{t("fearDescEm")}&rdquo;
              </em>
              {t("fearDescAfter")}
            </p>
          </div>
        </div>
      </section>

      {/* ─── Our Answer ─── */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-5xl mx-auto">
        <p className="text-xs uppercase tracking-[0.3em] text-stone-400 mb-8">
          {t("answerLabel")}
        </p>

        <h2 className="text-3xl md:text-5xl font-serif text-stone-900 leading-tight mb-6">
          {t("answerTitle")}
        </h2>
        <p className="text-lg font-light text-stone-600 leading-relaxed max-w-3xl mb-20">
          {t("answerDescBefore")}
          <strong className="text-stone-800">
            &ldquo;{t("answerDescBold")}&rdquo;
          </strong>
        </p>

        {/* Comparison Grid */}
        <div className="border border-stone-200 rounded-sm overflow-hidden">
          <div className="grid grid-cols-3 bg-stone-100 text-xs uppercase tracking-widest text-stone-500">
            <div className="p-4 md:p-6" />
            <div className="p-4 md:p-6 border-l border-stone-200">
              {t("tableHeaderConventional")}
            </div>
            <div className="p-4 md:p-6 border-l border-stone-200 text-stone-800 font-medium">
              {t("tableHeaderAtelier")}
            </div>
          </div>

          {COMPARISON_DATA.map((row) => (
            <div
              key={row.label.en}
              className="grid grid-cols-3 border-t border-stone-200"
            >
              <div className="p-4 md:p-6 text-sm font-medium text-stone-800">
                {row.label[lang]}
              </div>
              <div className="p-4 md:p-6 border-l border-stone-200 text-sm text-stone-500 font-light">
                {row.conventional[lang]}
              </div>
              <div className="p-4 md:p-6 border-l border-stone-200 text-sm text-stone-800">
                {row.atelier[lang]}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Two Pillars ─── */}
      <section className="bg-white py-24 md:py-32">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <p className="text-xs uppercase tracking-[0.3em] text-stone-400 mb-8">
            {t("pillarsLabel")}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            <div className="space-y-6">
              <div className="w-12 h-[2px] bg-stone-900" />
              <h3 className="text-2xl md:text-3xl font-serif text-stone-900">
                {t("pillar1Title1")}
                <br />
                <span className="text-stone-400 italic">
                  {t("pillar1Title2")}
                </span>
              </h3>
              <p className="text-stone-600 font-light leading-relaxed">
                {t("pillar1Desc")}
              </p>
            </div>

            <div className="space-y-6">
              <div className="w-12 h-[2px] bg-stone-900" />
              <h3 className="text-2xl md:text-3xl font-serif text-stone-900">
                {t("pillar2Title1")}
                <br />
                <span className="text-stone-400 italic">
                  {t("pillar2Title2")}
                </span>
              </h3>
              <p className="text-stone-600 font-light leading-relaxed">
                {t("pillar2Desc")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── The Collections ─── */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-5xl mx-auto">
        <p className="text-xs uppercase tracking-[0.3em] text-stone-400 mb-8">
          {t("collectionsLabel")}
        </p>
        <h2 className="text-3xl md:text-5xl font-serif text-stone-900 leading-tight mb-16">
          {t("collectionsTitle1")}
          <br />
          <span className="text-stone-400">{t("collectionsTitle2")}</span>
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
                  {theme.title[lang]}
                </h3>
                <p className="text-xs uppercase tracking-widest text-stone-400 mb-3">
                  {theme.id}
                </p>
                <p className="text-stone-500 font-light text-sm leading-relaxed">
                  {theme.description[lang]}
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
            {t("pieceLabel")}
          </p>
          <h2 className="text-3xl md:text-5xl font-serif leading-tight mb-8">
            {t("pieceTitle1")}
            <br />
            <span className="italic text-stone-300">{t("pieceTitle2")}</span>
          </h2>
          <p className="text-stone-400 font-light leading-loose max-w-2xl mx-auto mb-12">
            {t("pieceDesc").split("\n").map((line, i) => (
              <span key={i}>
                {line}
                <br />
              </span>
            ))}
          </p>

          <div className="inline-flex flex-col items-center gap-4 bg-white/5 border border-white/10 rounded-sm p-8 md:p-10 max-w-md mx-auto">
            <p className="text-sm text-stone-500 uppercase tracking-widest">
              {t("pieceExample")}
            </p>
            <p className="font-serif text-lg text-stone-300 italic">
              &ldquo;{t("pieceQuestion")}&rdquo;
            </p>
            <div className="w-8 h-[1px] bg-stone-600 my-2" />
            <p className="text-stone-400 text-sm">{t("pieceChoice")}</p>
            <p className="font-serif text-xl text-white leading-snug">
              &ldquo;{t("pieceResult1")}
              <br />
              {t("pieceResult2")}&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* ─── Who This Is For ─── */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-4xl mx-auto">
        <p className="text-xs uppercase tracking-[0.3em] text-stone-400 mb-8">
          {t("whoLabel")}
        </p>
        <h2 className="text-3xl md:text-5xl font-serif text-stone-900 leading-tight mb-12">
          {t("whoTitle1")}
          <br />
          <span className="text-stone-400 italic">{t("whoTitle2")}</span>
        </h2>

        <div className="space-y-8 text-stone-600 font-light leading-relaxed">
          <p className="text-lg">{t("whoP1")}</p>
          <p className="text-lg">
            {t("whoP2Before")}
            <strong className="text-stone-800">{t("whoP2Bold")}</strong>
            {t("whoP2After")}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-stone-200">
            {[
              { label: t("statAge"), value: t("statAgeVal") },
              { label: t("statStyle"), value: t("statStyleVal") },
              { label: t("statValues"), value: t("statValuesVal") },
              { label: t("statSensibility"), value: t("statSensibilityVal") },
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
            {t("ctaTitle")}
          </h2>
          <p className="text-stone-500 font-light mb-10 max-w-lg mx-auto">
            {t("ctaDesc")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-stone-900 text-stone-50 hover:bg-stone-800 px-10 py-6 text-sm tracking-[0.2em] uppercase"
            >
              <Link href="/collections">
                {t("ctaBtn1")} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-stone-300 text-stone-600 hover:text-stone-900 px-10 py-6 text-sm tracking-[0.2em] uppercase"
            >
              <Link href="/route-builder">{t("ctaBtn2")}</Link>
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
