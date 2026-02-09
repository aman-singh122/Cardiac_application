import Navbar from "@/components/landing/Navbar";
import AnimatedBackground from "@/components/landing/AnimatedBackground";
import Hero from "@/components/landing/Hero";
import Footer from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <main className="relative bg-[#0b0b0f] text-white overflow-hidden">
      <AnimatedBackground />
      <Navbar />
      <Hero />
      <Footer />
    </main>
  );
}
