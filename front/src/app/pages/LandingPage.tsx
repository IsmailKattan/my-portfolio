import { motion } from 'motion/react';
import {
  ArrowDown, Shield, Code, Cloud, Lock,
  ExternalLink, ChevronRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SEO } from '../../components/SEO';
import { AnimatedLogo } from '../components/AnimatedLogo';
// import { StatCard } from '../components/StatCard'; // hidden with stats section
import { FeaturedProjects } from '../components/FeaturedProjects';
import { LatestBlog } from '../components/LatestBlog';
import { CertificatesStrip } from '../components/CertificatesStrip';
import { ContactCTA } from '../components/ContactCTA';
import { TryHackMeActivity } from '../components/TryHackMeActivity';

// ─────────────────────────────────────────────────────────────────────────────
// statDefs hidden with stats section
// const statDefs = [
//   { value: 5,  suffix: '+', labelKey: 'landing.stats.years',    icon: Calendar  },
//   { value: 20, suffix: '+', labelKey: 'landing.stats.projects',  icon: Briefcase },
//   { value: 8,  suffix: '',  labelKey: 'landing.stats.certs',     icon: Award     },
//   { value: 30, suffix: '+', labelKey: 'landing.stats.posts',     icon: BookOpen  },
// ];

const expertiseDefs = [
  { nameKey: 'landing.expertise.pentest', icon: Shield },
  { nameKey: 'landing.expertise.cloud',   icon: Cloud  },
  { nameKey: 'landing.expertise.network', icon: Lock   },
  { nameKey: 'landing.expertise.dev',     icon: Code   },
];

// ─────────────────────────────────────────────────────────────────────────────
// HeroVideo — selects the exact right file for every combination of:
//   theme (dark | light)  ×  device (desktop | HiDPI)  ×  direction (LTR | RTL)
//
//   LTR (EN, TR): glass card on LEFT  → logo-right variant (logo on open side)
//   RTL (AR):     glass card on RIGHT → logo-left  variant (logo on open side)
//
//   object-right/left anchors the logo side so it is never cropped.
// ─────────────────────────────────────────────────────────────────────────────
interface HeroVideoProps { isDark: boolean; isRTL: boolean }

function HeroVideo({ isDark, isRTL }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [src, setSrc] = useState('');

  useEffect(() => {
    const prefix = window.devicePixelRatio > 1.5 ? 'HiDPI' : 'desktop';
    const theme  = isDark ? 'dark' : 'light';
    const side   = isRTL  ? 'left' : 'right';
    setSrc(`/video/${prefix}-${theme}-logo-${side}-located.mp4`);
  }, [isDark, isRTL]);

  useEffect(() => {
    if (src) videoRef.current?.play().catch(() => {});
  }, [src]);

  if (!src) return null;

  return (
    <video
      ref={videoRef}
      key={src}
      src={src}
      autoPlay muted loop playsInline
      className={`absolute inset-0 w-full h-full object-cover ${isRTL ? 'object-left' : 'object-right'}`}
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
export function LandingPage() /* seo-patched */ {
  const { t, i18n } = useTranslation();
  // Arabic is the only RTL language; Turkish + English are LTR.
  // startsWith covers locale variants like 'ar-SA', 'ar-EG', etc.
  const isRTL = i18n.language.startsWith('ar');

  // Mirror the hero gradient direction for RTL
  const overlayFrom = isRTL ? 'right' : 'left';

  // Track <html> class so we can feed the correct video variant
  const [isDark, setIsDark] = useState(
    () => document.documentElement.classList.contains('dark'),
  );
  useEffect(() => {
    const obs = new MutationObserver(() =>
      setIsDark(document.documentElement.classList.contains('dark')),
    );
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);

  // About-section slide direction (mirrors for RTL)
  const aboutLogoX = isRTL ?  28 : -28;
  const aboutTextX = isRTL ? -28 :  28;

  return (
    <div>
      <SEO
        title="Home"
        description="Fresh cybersecurity graduate with a passion for offensive and defensive security. Actively building skills through CTF challenges, labs, and personal projects while working toward a first role in the field."
        canonicalPath="/"
      />

      {/* ═══════════════════════════════════════════════════════════════════════
          HERO  ·  Cinematic full-viewport video + floating frosted-glass card
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[calc(100vh-4rem)] flex items-center overflow-hidden bg-slate-100 dark:bg-[#0a0e27]">

        {/* ── Mobile background gradient (md and below, when video is hidden) ── */}
        <div className="md:hidden absolute inset-0
                        bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200
                        dark:from-[#0a0e27] dark:via-[#151933] dark:to-[#0a0e27]" />

        {/* ── Full-screen video background — desktop only (md+) ── */}
        <div className="hidden md:block absolute inset-0">
          <HeroVideo isDark={isDark} isRTL={isRTL} />
        </div>

        {/* ── Directional vignette — only relevant when the video is visible ──
            Adapts to both theme and language direction.
            Light mode: white-based fade.  Dark mode: navy-based fade.          */}
        <div
          className="hidden md:block absolute inset-0 pointer-events-none"
          style={{
            background: isDark
              ? `linear-gradient(to ${overlayFrom}, rgba(10,14,39,0.94) 0%, rgba(10,14,39,0.78) 38%, rgba(10,14,39,0.30) 68%, transparent 100%)`
              : `linear-gradient(to ${overlayFrom}, rgba(241,245,249,0.97) 0%, rgba(241,245,249,0.82) 38%, rgba(241,245,249,0.22) 68%, transparent 100%)`,
          }}
        />

        {/* ── Scanline overlay — subtle cybersecurity texture ── */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04] dark:opacity-[0.06]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent, transparent 2px, #000 2px, #000 3px)',
          }}
        />

        {/* ── Frosted glass card ──
            Always justify-start — the browser's inherited dir="rtl" (set by
            Navigation) makes flex-start align to the RIGHT in Arabic, and to
            the LEFT in English / Turkish. No JS conditional needed here.     */}
        <div className="relative z-10 w-full flex justify-start py-16 px-5 sm:px-10 lg:px-16 xl:px-24">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="w-full sm:max-w-[500px] lg:max-w-[520px]
                       bg-white/85 dark:bg-[#0a0e27]/80
                       backdrop-blur-2xl
                       border border-gray-200/80 dark:border-[#00d4ff]/12
                       rounded-2xl
                       p-8 lg:p-10
                       shadow-2xl shadow-black/10 dark:shadow-[#00d4ff]/5"
          >
            {/* ·· Badge ·· */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.5 }}
              className="mb-7"
            >
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full
                               bg-[#00d4ff]/10 border border-[#00d4ff]/28
                               text-[#00d4ff] text-xs font-semibold tracking-widest uppercase">
                <Shield className="w-3.5 h-3.5" />
                {t('landing.hero.badge')}
              </span>
            </motion.div>

            {/* ·· Headline ·· */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.40, duration: 0.65 }}
              className="text-4xl sm:text-5xl font-bold
                         text-gray-900 dark:text-white
                         leading-[1.08] mb-5"
            >
              {t('landing.hero.headlinePart1')}{' '}
              <span className="bg-gradient-to-r from-[#00d4ff] to-[#0ea5e9] bg-clip-text text-transparent">
                {t('landing.hero.headlineGradient')}
              </span>
            </motion.h1>

            {/* ·· Subtitle ·· */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.52, duration: 0.6 }}
              className="text-gray-500 dark:text-[#8b92b8] text-base leading-relaxed mb-8"
            >
              {t('landing.hero.subtitle')}
            </motion.p>

            {/* ·· CTAs ·· */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.64, duration: 0.6 }}
              className="flex flex-wrap gap-3 mb-8"
            >
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 px-6 py-3
                           bg-[#00d4ff] text-[#0a0e27]
                           rounded-xl font-semibold text-sm
                           hover:shadow-lg hover:shadow-[#00d4ff]/30 hover:-translate-y-0.5
                           transition-all duration-200"
              >
                {t('landing.hero.ctaPortfolio')}
                <ExternalLink className="w-4 h-4" />
              </Link>
              <Link
                to="/cv"
                className="inline-flex items-center gap-2 px-6 py-3
                           border border-gray-300 dark:border-[#00d4ff]/35
                           text-gray-700 dark:text-[#00d4ff]
                           rounded-xl font-semibold text-sm
                           hover:border-[#00d4ff] hover:text-[#00d4ff] dark:hover:bg-[#00d4ff]/8
                           hover:-translate-y-0.5 transition-all duration-200"
              >
                {t('landing.hero.ctaCV')}
                <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* ·· Divider + expertise pills ·· */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.78, duration: 0.5 }}
              className="border-t border-gray-200/80 dark:border-white/8 pt-5"
            >
              <div className="flex flex-wrap gap-2">
                {expertiseDefs.map(({ nameKey, icon: Icon }) => (
                  <span
                    key={nameKey}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1
                               text-xs text-gray-500 dark:text-[#8b92b8]
                               bg-gray-100/80 dark:bg-white/5
                               border border-gray-200 dark:border-white/10
                               rounded-full"
                  >
                    <Icon className="w-3 h-3 text-[#00d4ff]" />
                    {t(nameKey)}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* ── Scroll indicator (centered at bottom) ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-1.5"
          >
            <span className="text-xs tracking-widest uppercase text-gray-400 dark:text-[#8b92b8]">
              {t('landing.hero.scroll')}
            </span>
            <ArrowDown className="w-4 h-4 text-[#00d4ff]" />
          </motion.div>
        </motion.div>
      </section>

      {/* STATS section hidden — re-enable when ready
      <section className="relative py-16 bg-[#0f1428] dark:bg-[#080b1e] overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00d4ff]/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#00d4ff]/20 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(0,212,255,0.08),transparent)] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {statDefs.map((stat, index) => (
              <StatCard
                key={stat.labelKey}
                value={stat.value}
                suffix={stat.suffix}
                label={t(stat.labelKey)}
                icon={stat.icon}
                delay={index}
              />
            ))}
          </div>
        </div>
      </section>
      */}

      {/* ═══════════════════════════════════════════════════════════════════════
          ABOUT  ·  Animated logo (theme-aware) + editorial text layout
          CSS Grid auto-inverts column order in RTL — no extra overrides needed.
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-28 bg-white dark:bg-[#151933]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Visual: theme-reactive logo animation */}
            <motion.div
              initial={{ opacity: 0, x: aboutLogoX }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {/* Container with dot-grid background */}
              <div
                className="relative aspect-square rounded-2xl overflow-hidden
                           bg-slate-50 dark:bg-[#1a2040]
                           border border-slate-100 dark:border-[#00d4ff]/10
                           flex items-center justify-center"
              >
                <div
                  className="absolute inset-0 pointer-events-none opacity-50 dark:opacity-25"
                  style={{
                    backgroundImage:
                      'radial-gradient(circle, rgba(0,212,255,0.22) 1px, transparent 1px)',
                    backgroundSize: '28px 28px',
                  }}
                />
                {/* Radial glow behind logo */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,212,255,0.10),transparent_65%)] pointer-events-none" />
                <div className="relative z-10 w-3/4">
                  {/* AnimatedLogo picks dark/light video from /public/videos/ automatically */}
                  <AnimatedLogo />
                </div>
              </div>

              {/* Corner bracket accents */}
              <div className="absolute top-0    left-0  w-7 h-7 border-t-2 border-l-2 border-[#00d4ff] rounded-tl-lg -translate-x-2 -translate-y-2" />
              <div className="absolute top-0    right-0 w-7 h-7 border-t-2 border-r-2 border-[#00d4ff] rounded-tr-lg  translate-x-2  -translate-y-2" />
              <div className="absolute bottom-0 left-0  w-7 h-7 border-b-2 border-l-2 border-[#00d4ff] rounded-bl-lg -translate-x-2   translate-y-2" />
              <div className="absolute bottom-0 right-0 w-7 h-7 border-b-2 border-r-2 border-[#00d4ff] rounded-br-lg  translate-x-2    translate-y-2" />
            </motion.div>

            {/* Text content */}
            <motion.div
              initial={{ opacity: 0, x: aboutTextX }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="text-[#00d4ff] text-xs font-semibold tracking-[0.2em] uppercase mb-4 block">
                {t('landing.about.label')}
              </span>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                {t('landing.about.heading1')}<br />
                {t('landing.about.heading2')}
              </h2>
              <p className="text-gray-600 dark:text-[#8b92b8] text-lg leading-relaxed mb-5">
                {t('landing.about.para1')}
              </p>
              <p className="text-gray-600 dark:text-[#8b92b8] text-lg leading-relaxed mb-10">
                {t('landing.about.para2')}
              </p>

              {/* 2 × 2 skill grid */}
              <div className="grid grid-cols-2 gap-3 mb-10">
                {expertiseDefs.map(({ nameKey, icon: Icon }) => (
                  <div
                    key={nameKey}
                    className="flex items-center gap-3 p-3.5 rounded-xl
                               bg-slate-50 dark:bg-white/5
                               border border-slate-200 dark:border-white/8
                               hover:border-[#00d4ff]/40 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#00d4ff]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#00d4ff]/20 transition-colors">
                      <Icon className="w-4 h-4 text-[#00d4ff]" />
                    </div>
                    <span className="text-gray-700 dark:text-[#e4e7f1] text-sm font-medium">
                      {t(nameKey)}
                    </span>
                  </div>
                ))}
              </div>

              <Link
                to="/cv"
                className="inline-flex items-center gap-2 px-6 py-3
                           bg-[#00d4ff] text-[#0a0e27]
                           rounded-xl font-semibold
                           hover:opacity-90 hover:-translate-y-0.5
                           transition-all duration-200"
              >
                {t('landing.about.cta')}
                <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Existing content sections ─────────────────────────────────────────── */}
      <FeaturedProjects />
      <TryHackMeActivity />
      <CertificatesStrip />
      <LatestBlog />
      <ContactCTA />
    </div>
  );
}
