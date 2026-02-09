"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

const Navbar = () => {
  const navLinks = [
    { label: "Features", href: "#features", id: "nav-features" },
    { label: "Pricing", href: "#pricing", id: "nav-pricing" },
    { label: "Docs", href: "#docs", id: "nav-docs" },
    { label: "Blog", href: "#blog", id: "nav-blog" },
  ];

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-4 mt-3">
        <nav
          className="container mx-auto glass rounded-2xl px-5 h-[3.5rem] flex items-center justify-between border border-border/30"
          role="navigation"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link href="/landing">
            <motion.div
              className="flex items-center gap-2.5 group cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              data-testid="nav-logo"
            >
              <motion.div
                className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-glow-sm overflow-hidden"
                whileHover={{ rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                <Sparkles className="w-4 h-4 text-primary-foreground" />
              </motion.div>
              <span className="text-[0.95rem] font-semibold text-foreground tracking-tight">
                CardiaC
              </span>
            </motion.div>
          </Link>

          {/* Navigation Links */}
          <ul className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link, index) => (
              <motion.li
                key={link.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.05 * index + 0.2,
                  duration: 0.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <motion.a
                  href={link.href}
                  id={link.id}
                  className="relative px-3.5 py-2 text-[0.8rem] text-muted-foreground hover:text-foreground transition-colors duration-300 rounded-lg"
                  whileHover={{
                    backgroundColor: "hsl(var(--secondary) / 0.5)",
                  }}
                >
                  {link.label}
                </motion.a>
              </motion.li>
            ))}
          </ul>

          {/* CTA Buttons */}
          <div className="flex items-center gap-2">
            <Link href="/sign-in">
              <Button
                variant="ghost"
                size="sm"
                className="cursor-pointer text-[0.8rem] text-muted-foreground hover:text-foreground hover:bg-secondary/50 h-9 px-3.5 transition-all duration-300"
                data-testid="nav-signin"
              >
                Sign In
              </Button>
            </Link>

            <Link href="/sign-up">
              <Button
                size="sm"
                className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 text-[0.8rem] font-medium shadow-glow-sm hover:shadow-glow-md transition-all duration-300"
                data-testid="nav-getstarted"
              >
                Get Started
              </Button>
            </Link>
          </div>
        </nav>
      </div>
    </motion.header>
  );
};

export default Navbar;
