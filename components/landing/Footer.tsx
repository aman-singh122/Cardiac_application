"use client";


import { motion } from "framer-motion";
import { Github, Twitter, Linkedin, Sparkles } from "lucide-react";

const Footer = () => {
  const footerLinks = {
    Product: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "Changelog", href: "#changelog" },
      { label: "Roadmap", href: "#roadmap" },
    ],
    Resources: [
      { label: "Documentation", href: "#docs" },
      { label: "API Reference", href: "#api" },
      { label: "Guides", href: "#guides" },
      { label: "Blog", href: "#blog" },
    ],
    Company: [
      { label: "About", href: "#about" },
      { label: "Careers", href: "#careers" },
      { label: "Contact", href: "#contact" },
    ],
    Legal: [
      { label: "Privacy", href: "#privacy" },
      { label: "Terms", href: "#terms" },
      { label: "Security", href: "#security" },
    ],
  };

  const socialLinks = [
    { icon: Twitter, href: "#twitter", label: "Twitter" },
    { icon: Github, href: "#github", label: "GitHub" },
    { icon: Linkedin, href: "#linkedin", label: "LinkedIn" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.footer
      className="relative border-t border-border/30 bg-gradient-to-b from-card/30 to-background"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <div className="container mx-auto px-6 py-14">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10">
          {/* Brand */}
          <motion.div className="col-span-2" variants={itemVariants}>
            <motion.a 
              href="/" 
              className="inline-flex items-center gap-2.5 mb-4"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-glow-sm">
                <Sparkles className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-[0.95rem] font-semibold text-foreground tracking-tight">Cardiac</span>
            </motion.a>
            <p className="text-[0.8rem] text-muted-foreground leading-relaxed max-w-[280px]">
              Building the future of intelligent applications with cutting-edge AI technology.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-2 mt-6">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="w-9 h-9 rounded-lg bg-secondary/40 hover:bg-secondary/80 flex items-center justify-center text-muted-foreground hover:text-foreground transition-all duration-300"
                  aria-label={social.label}
                  whileHover={{ scale: 1.08, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <motion.div key={category} variants={itemVariants}>
              <h3 className="text-[0.75rem] font-semibold text-foreground mb-4 uppercase tracking-wider">
                {category}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <motion.a
                      href={link.href}
                      className="text-[0.8rem] text-muted-foreground hover:text-foreground transition-colors duration-300 inline-block"
                      data-footer-link={link.label.toLowerCase()}
                      whileHover={{ x: 3 }}
                    >
                      {link.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom */}
        <motion.div 
          className="mt-12 pt-7 border-t border-border/30 flex flex-col sm:flex-row items-center justify-between gap-4"
          variants={itemVariants}
        >
          <p className="text-[0.7rem] text-muted-foreground/80">
            © 2025 Cardiac . All rights reserved.
          </p>
          <motion.p 
            className="text-[0.7rem] text-muted-foreground/50 flex items-center gap-1.5"
            whileHover={{ color: "hsl(var(--muted-foreground))" }}
          >
            Crafted with precision for developers worldwide
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ✨
            </motion.span>
          </motion.p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
