"use client";

// import { useEffect, useState } from "react";

// const [mounted, setMounted] = useState(false);
// const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
import type { Variants } from "framer-motion";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";


import {
  ArrowRight,
  MessageSquare,
  Mic,
  Video,
  Users,
  Zap,
  Shield,
  Globe,
  Sparkles,
  Github,
  Twitter,
  Play,
  Check,
  Radio,
  Headphones,
  MonitorPlay,
  ChevronRight,
  Star,
  TrendingUp,
  Lock,
  Layers,
} from "lucide-react";

// Custom Cursor Component
function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 rounded-full border-2 border-[#7C5CF0] pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-[#B45F2E] pointer-events-none z-[9999]"
        animate={{
          x: mousePosition.x - 3,
          y: mousePosition.y - 3,
        }}
        transition={{
          type: "spring",
          stiffness: 1000,
          damping: 35,
        }}
      />
    </>
  );
}




// Floating Particles Background
function FloatingParticles() {
  const [mounted, setMounted] = useState(false);
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    setMounted(true);
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-[#7C5CF0]"
          initial={{
            x: Math.random() * dimensions.width,
            y: Math.random() * dimensions.height,
            opacity: Math.random() * 0.5,
          }}
          animate={{
            y: [null, Math.random() * dimensions.height],
            x: [null, Math.random() * dimensions.width],
            opacity: [null, Math.random() * 0.5],
          }}
          transition={{
            duration: Math.random() * 20 + 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}
    </div>
  );
}


const fadeIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

export default function LandingPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <div className="min-h-screen bg-[#000000] text-white antialiased overflow-hidden cursor-none">
      <CustomCursor />

      {/* Premium Background with Mesh Gradient */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#1a0a2e_0%,_#000000_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_#0f0520_0%,_transparent_50%)]" />

        {/* Animated Gradient Orbs */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#6B47DC]/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute bottom-1/4 right-1/4 w-[700px] h-[700px] bg-[#B45F2E]/15 rounded-full blur-[130px]"
        />

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:64px_64px]" />

        <FloatingParticles />
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.08] bg-black/60 backdrop-blur-xl"
      >
        <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
          <div className="flex items-center justify-between h-24">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 group cursor-none"
            >
              <div className="relative">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="absolute inset-0 bg-gradient-to-br from-[#7C5CF0] to-[#B45F2E] rounded-2xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity"
                />
                <div className="relative bg-gradient-to-br from-[#7C5CF0] via-[#9B5FCE] to-[#B45F2E] p-3 rounded-2xl shadow-2xl">
                  <MessageSquare
                    className="size-6 text-white"
                    strokeWidth={2.5}
                  />
                </div>
              </div>
              <span className="text-2xl font-semibold tracking-tight bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                Cardiac
              </span>
            </Link>

            <div className="hidden lg:flex items-center gap-12">
              {[
                { name: "Features", icon: Layers },
                { name: "Pricing", icon: TrendingUp },
                { name: "Developers", icon: Github },
                { name: "Community", icon: Users },
              ].map((item) => (
                <button
                  key={item.name}
                  className="group flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors cursor-none"
                >
                  <item.icon className="size-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {item.name}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <Link href="/sign-in">
                <button className="text-sm font-medium text-zinc-300 hover:text-white transition-colors px-5 py-3 cursor-none">
                  Sign In
                </button>
              </Link>
              <Link href="/sign-up">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-7 py-3.5 rounded-2xl bg-gradient-to-r from-[#7C5CF0] to-[#B45F2E] text-sm font-semibold overflow-hidden shadow-2xl shadow-[#7C5CF0]/30 cursor-none"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#B45F2E] to-[#7C5CF0] opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="relative z-10 flex items-center gap-2">
                    Get Started
                    <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section with 3D */}
      <section ref={heroRef} className="relative pt-40 pb-24 px-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Content */}
            <motion.div style={{ opacity }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl mb-8"
              >
                <div className="relative">
                  <div className="size-2.5 rounded-full bg-[#7C5CF0] animate-pulse" />
                  <div className="absolute inset-0 size-2.5 rounded-full bg-[#7C5CF0] animate-ping" />
                </div>
                <span className="text-sm font-medium text-zinc-300 tracking-wide">
                  2.4M+ creators online now
                </span>
                <Star className="size-4 text-[#B45F2E] fill-[#B45F2E]" />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-8"
              >
                Where voices
                <br />
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-[#7C5CF0] via-[#9B5FCE] to-[#B45F2E] bg-clip-text text-transparent">
                    unite
                  </span>
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1.2, delay: 0.8 }}
                    className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#7C5CF0] to-[#B45F2E] rounded-full origin-left"
                  />
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="text-xl text-zinc-400 max-w-xl mb-12 leading-relaxed"
              >
                Ultra‑low latency voice · Pristine 4K video · Instant messaging.
                <br />
                <span className="text-zinc-500">
                  Encrypted, global, and engineered for depth.
                </span>
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="flex flex-wrap items-center gap-5 mb-16"
              >
                <Link href="/sign-up">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative px-12 py-6 rounded-2xl bg-gradient-to-r from-[#7C5CF0] to-[#B45F2E] text-lg font-semibold shadow-2xl shadow-[#7C5CF0]/40 cursor-none overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#B45F2E] to-[#7C5CF0] opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="relative z-10 flex items-center gap-3">
                      <Zap className="size-5" fill="currentColor" />
                      Start for free
                      <ChevronRight className="size-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </motion.button>
                </Link>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group px-10 py-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl text-lg font-medium hover:bg-white/10 hover:border-white/20 transition-all flex items-center gap-3 cursor-none"
                >
                  <div className="size-12 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                    <Play className="size-5 ml-0.5" fill="currentColor" />
                  </div>
                  Watch demo
                </motion.button>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="grid grid-cols-3 gap-8"
              >
                {[
                  { value: "2.4M+", label: "Active users", icon: Users },
                  { value: "<28ms", label: "Voice latency", icon: Zap },
                  { value: "99.98%", label: "Uptime SLA", icon: Shield },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 + i * 0.1 }}
                    className="relative group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#7C5CF0]/20 to-[#B45F2E]/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative p-5 rounded-2xl border border-white/5 bg-black/40 backdrop-blur-xl">
                      <stat.icon className="size-5 text-[#B45F2E] mb-3" />
                      <div className="text-3xl font-bold tracking-tight mb-1">
                        {stat.value}
                      </div>
                      <div className="text-xs text-zinc-500 uppercase tracking-wider">
                        {stat.label}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right: 3D Scene */}
            <motion.div
              initial={{ opacity: 0, x: 100, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.4 }}
              style={{ y: smoothY, scale }}
              className="relative lg:block hidden"
            >
              <div className="absolute -inset-8 bg-gradient-to-r from-[#7C5CF0]/30 to-[#B45F2E]/30 rounded-[3rem] blur-3xl" />

              <div className="relative rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] shadow-2xl overflow-hidden">
                {/* 3D Spline Embed (You'll replace this with actual Spline scene) */}
<div className="aspect-square w-full rounded-[2rem] bg-black relative overflow-hidden">
                  {/* Placeholder for Spline 3D - Replace with actual Spline iframe or React component */}
                  <Image
                    src="/animat.png"
                    alt="Networking UI"
                    fill
                    className="object-cover"
                    priority
                  />

                  {/* Fallback gradient animation if Spline isn't loaded */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#7C5CF0]/20 via-transparent to-[#B45F2E]/20 pointer-events-none" />
                </div>

                {/* Floating UI Elements */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute top-8 right-8 px-4 py-3 rounded-xl bg-black/80 backdrop-blur-xl border border-white/10 shadow-xl"
                >
                  <div className="flex items-center gap-2 text-sm">
                    <div className="size-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="font-medium">Live</span>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                  className="absolute bottom-8 left-8 px-5 py-3 rounded-xl bg-black/80 backdrop-blur-xl border border-white/10 shadow-xl"
                >
                  <div className="flex items-center gap-3 text-sm">
                    <Mic className="size-4 text-[#7C5CF0]" />
                    <span className="font-medium">Crystal Clear Audio</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-40 px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#7C5CF0]/5 to-transparent" />

        <div className="max-w-[1400px] mx-auto relative">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="text-center mb-24"
          >
            <motion.div
              variants={fadeIn}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl mb-6"
            >
              <Sparkles className="size-4 text-[#B45F2E]" />
              <span className="text-sm font-medium">Everything you need</span>
            </motion.div>

            <motion.h2
              variants={fadeIn}
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8"
            >
              All-in-one communication
            </motion.h2>

            <motion.p
              variants={fadeIn}
              className="text-xl text-zinc-400 max-w-3xl mx-auto"
            >
              Professional-grade features that scale with your community
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              {
                icon: MessageSquare,
                title: "Instant Messaging",
                desc: "Threads, rich media, reactions. Lightning fast.",
                gradient: "from-[#7C5CF0] to-[#9B5FCE]",
                features: ["Rich embeds", "Thread support", "File sharing"],
              },
              {
                icon: Mic,
                title: "Voice Channels",
                desc: "Studio-quality audio with noise cancellation.",
                gradient: "from-[#B45F2E] to-[#D97642]",
                features: ["<28ms latency", "Noise suppression", "Echo cancel"],
              },
              {
                icon: Video,
                title: "4K Video Calls",
                desc: "Up to 100 participants in crystal clarity.",
                gradient: "from-[#7C5CF0] to-[#B45F2E]",
                features: ["4K streaming", "Screen share", "Recording"],
              },
              {
                icon: Users,
                title: "Communities",
                desc: "Unlimited servers with advanced moderation.",
                gradient: "from-[#B45F2E] to-[#7C5CF0]",
                features: ["Role system", "Auto-mod", "Analytics"],
              },
              {
                icon: Lock,
                title: "End-to-End Encrypted",
                desc: "Bank-grade security. SOC2 & GDPR compliant.",
                gradient: "from-[#7C5CF0] to-[#9B5FCE]",
                features: ["E2E encryption", "SOC2 certified", "GDPR ready"],
              },
              {
                icon: Globe,
                title: "Global Edge Network",
                desc: "40+ regions for optimal performance.",
                gradient: "from-[#B45F2E] to-[#D97642]",
                features: ["40+ regions", "Auto routing", "99.98% uptime"],
              },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                variants={fadeIn}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group relative cursor-none"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity blur-xl`}
                />

                <div className="relative h-full rounded-3xl border border-white/10 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] backdrop-blur-xl p-8 hover:border-white/20 transition-all">
                  <div
                    className={`size-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-2xl group-hover:scale-110 transition-transform`}
                  >
                    <feature.icon
                      className="size-7 text-white"
                      strokeWidth={2}
                    />
                  </div>

                  <h3 className="text-2xl font-bold mb-3 tracking-tight">
                    {feature.title}
                  </h3>

                  <p className="text-zinc-400 mb-6 leading-relaxed">
                    {feature.desc}
                  </p>

                  <ul className="space-y-2">
                    {feature.features.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-sm text-zinc-500"
                      >
                        <Check className="size-4 text-[#B45F2E]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-40 px-8 bg-gradient-to-b from-transparent via-black to-transparent">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-24"
          >
            <motion.h2
              variants={fadeIn}
              className="text-5xl md:text-6xl font-bold tracking-tight mb-6"
            >
              Built for every scenario
            </motion.h2>
            <motion.p
              variants={fadeIn}
              className="text-xl text-zinc-400 max-w-2xl mx-auto"
            >
              From competitive gaming to professional collaboration
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Headphones,
                title: "Gaming",
                desc: "Tournament-ready voice. Zero lag, maximum clarity.",
                img: "https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=1260",
                color: "from-[#7C5CF0] to-[#9B5FCE]",
              },
              {
                icon: MonitorPlay,
                title: "Engineering",
                desc: "Pair programming with HD screen share.",
                img: "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=1260",
                color: "from-[#B45F2E] to-[#D97642]",
              },
              {
                icon: Radio,
                title: "Content Creation",
                desc: "Live streaming with audience interaction.",
                img: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=1260",
                color: "from-[#7C5CF0] to-[#B45F2E]",
              },
            ].map((useCase, i) => (
              <motion.div
                key={useCase.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.8 }}
                whileHover={{ y: -12 }}
                className="group relative cursor-none"
              >
                <div
                  className={`absolute -inset-4 bg-gradient-to-br ${useCase.color} rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-30 transition-opacity`}
                />

                <div className="relative rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] overflow-hidden shadow-2xl">
                  <div className="h-72 overflow-hidden relative">
                    <Image
                      src={useCase.img}
                      alt={useCase.title}
                      width={600}
                      height={400}
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                    <div
                      className={`absolute top-6 right-6 size-14 rounded-2xl bg-gradient-to-br ${useCase.color} flex items-center justify-center shadow-2xl`}
                    >
                      <useCase.icon
                        className="size-6 text-white"
                        strokeWidth={2}
                      />
                    </div>
                  </div>

                  <div className="p-8">
                    <h3 className="text-3xl font-bold mb-3">{useCase.title}</h3>
                    <p className="text-zinc-400 leading-relaxed">
                      {useCase.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-40 px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative rounded-[3rem] border border-white/10 bg-gradient-to-br from-[#1a1a1a] via-[#0d0d0d] to-[#000000] backdrop-blur-2xl p-20 text-center overflow-hidden shadow-2xl"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#7C5CF0_0%,_transparent_70%)] opacity-20" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_#B45F2E_0%,_transparent_70%)] opacity-15" />

            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="inline-block mb-8"
              >
                <div className="size-20 rounded-3xl bg-gradient-to-br from-[#7C5CF0] to-[#B45F2E] flex items-center justify-center shadow-2xl">
                  <Sparkles
                    className="size-10 text-white"
                    fill="currentColor"
                  />
                </div>
              </motion.div>

              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 leading-tight">
                Ready to elevate
                <br />
                your community?
              </h2>

              <p className="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                Join millions of creators building deeper connections.
                <br />
                <span className="text-zinc-500">
                  Free forever. No credit card required.
                </span>
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
                <Link href="/sign-up">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="group px-14 py-7 rounded-2xl bg-gradient-to-r from-[#7C5CF0] to-[#B45F2E] text-xl font-bold shadow-2xl shadow-[#7C5CF0]/40 cursor-none relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#B45F2E] to-[#7C5CF0] opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="relative z-10 flex items-center gap-3">
                      Start building now
                      <ArrowRight className="size-6 group-hover:translate-x-2 transition-transform" />
                    </span>
                  </motion.button>
                </Link>
              </div>

              <div className="flex flex-wrap justify-center gap-10 text-sm">
                {[
                  { icon: Check, text: "No credit card" },
                  { icon: Shield, text: "Enterprise security" },
                  { icon: Zap, text: "Instant setup" },
                ].map((item) => (
                  <div
                    key={item.text}
                    className="flex items-center gap-3 text-zinc-400"
                  >
                    <div className="size-8 rounded-lg bg-white/5 flex items-center justify-center">
                      <item.icon className="size-4 text-[#B45F2E]" />
                    </div>
                    <span className="font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-black/60 backdrop-blur-xl py-20 px-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-5 gap-12 mb-16">
            <div className="md:col-span-2">
              <Link href="/" className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-br from-[#7C5CF0] to-[#B45F2E] p-3 rounded-2xl shadow-xl">
                  <MessageSquare className="size-6" strokeWidth={2.5} />
                </div>
                <span className="text-2xl font-bold">Cardiac</span>
              </Link>
              <p className="text-zinc-400 mb-8 leading-relaxed max-w-sm">
                The professional standard for real‑time communication. Built for
                creators, teams, and communities.
              </p>
              <div className="flex gap-4">
                {[
                  { Icon: Github, link: "#" },
                  { Icon: Twitter, link: "#" },
                ].map(({ Icon }, i) => (
                  <motion.a
                    key={i}
                    href="#"
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="size-12 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/20 hover:bg-white/10 transition-all cursor-none"
                  >
                    <Icon className="size-5" />
                  </motion.a>
                ))}
              </div>
            </div>

            {[
              {
                title: "Product",
                links: ["Features", "Pricing", "API Docs", "Download"],
              },
              {
                title: "Resources",
                links: ["Documentation", "Community", "Support", "Status"],
              },
              {
                title: "Company",
                links: ["About Us", "Blog", "Careers", "Press Kit"],
              },
            ].map((col) => (
              <div key={col.title}>
                <h3 className="font-bold text-sm uppercase tracking-wider text-white mb-6">
                  {col.title}
                </h3>
                <ul className="space-y-4">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-zinc-400 hover:text-white transition-colors cursor-none inline-flex items-center gap-2 group"
                      >
                        {link}
                        <ChevronRight className="size-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-zinc-500">
            <p>© 2024 Cardiac Technologies Inc. All rights reserved.</p>
            <div className="flex gap-8">
              {["Privacy Policy", "Terms of Service", "Security"].map(
                (item) => (
                  <a
                    key={item}
                    href="#"
                    className="hover:text-white transition-colors cursor-none"
                  >
                    {item}
                  </a>
                ),
              )}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
