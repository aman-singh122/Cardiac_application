"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Sparkles, Users, Heart } from "lucide-react";
import { Suspense, lazy, useRef } from "react";
import Link from "next/link";

const AI3DScene = lazy(() => import("./AI3DScene"));

const Scene3DFallback = () => (
  <div className="w-full h-full min-h-[350px] lg:min-h-[450px] flex items-center justify-center">
    <div className="relative">
      <motion.div
        className="w-28 h-28 rounded-full bg-gradient-to-br from-primary/40 to-accent/40"
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-4 rounded-full bg-background/80 backdrop-blur-md" />
      <motion.div
        className="absolute inset-6 rounded-full bg-gradient-to-br from-primary/30 to-accent/30"
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
    </div>
  </div>
);

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const rotateX = useTransform(y, [-300, 300], [5, -5]);
  const rotateY = useTransform(x, [-300, 300], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - (rect.left + rect.width / 2));
    mouseY.set(e.clientY - (rect.top + rect.height / 2));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[100svh] flex items-center pt-20 pb-12 overflow-hidden"
    >
    <div className="mx-auto max-w-7xl px-6 relative z-10">
  <div className="grid lg:grid-cols-2 gap-10 items-center">

          {/* LEFT CONTENT */}
          <motion.article
            className="max-w-xl"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border border-primary/20 text-xs font-medium text-primary mb-6">
                <Heart className="w-3 h-3" />
                Pulse of the Community
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              </span>
            </motion.div>

            {/* MAIN HEADING */}
            <motion.h1
              className="text-3xl sm:text-4xl lg:text-[2.75rem] xl:text-5xl font-semibold leading-[1.12] tracking-[-0.02em] mb-5"
              variants={itemVariants}
            >
              <span className="text-foreground">Where communities </span>
              <motion.span
                className="gradient-text inline-block"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                style={{ backgroundSize: "200% 200%" }}
              >
                come alive
              </motion.span>
              <span className="text-foreground"> together</span>
            </motion.h1>

            {/* SUBTITLE */}
            <motion.p
              className="text-[0.95rem] sm:text-base text-muted-foreground leading-[1.7] mb-7 max-w-[420px]"
              variants={itemVariants}
            >
              cardiac is your home for communities—where voice, video, and text
              come together in real-time. Create your space, connect with
              friends, and build meaningful connections that matter.
            </motion.p>

            {/* CTA BUTTONS */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3"
              variants={itemVariants}
            >
              <Link href="/sign-up">
                <Button
                  size="lg"
                  className="cursor-pointer px-6 h-11 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                >
                  Start Your Community
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>

              <Button size="lg" variant="outline" className="px-6 h-11">
                <Play className="mr-2 w-4 h-4 cursor-pointer" />
                Watch Demo
              </Button>
            </motion.div>

            {/* FEATURES LIST */}
            <motion.div className="mt-10 space-y-3" variants={itemVariants}>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span>Zero-latency voice channels</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                <span>Crystal-clear video calls</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
                <span>Unlimited community servers</span>
              </div>
            </motion.div>

            {/* TRUST TEXT */}
            <motion.div
              className="mt-12 pt-7 border-t border-border/40"
              variants={itemVariants}
            >
              <p className="text-[0.7rem] text-muted-foreground/80 mb-2 uppercase tracking-widest">
                Trusted by thriving communities worldwide
              </p>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4 text-primary" />
                  <span className="font-medium">10M+</span>
                  <span className="text-muted-foreground">active users</span>
                </div>
                <div className="h-4 w-px bg-border" />
                <div className="flex items-center gap-1">
                  <Heart className="w-4 h-4 text-red-500" />
                  <span className="font-medium">500K+</span>
                  <span className="text-muted-foreground">communities</span>
                </div>
              </div>
            </motion.div>
          </motion.article>

          {/* RIGHT SIDE VISUAL */}
          <motion.aside
            className="relative lg:h-[520px] flex items-center justify-center"
            style={{ rotateX, rotateY, transformPerspective: 1200 }}
          >
            <Suspense fallback={<Scene3DFallback />}>
              <AI3DScene />
            </Suspense>
          </motion.aside>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
