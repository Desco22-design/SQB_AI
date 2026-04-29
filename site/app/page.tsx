import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NewsBanner from "@/components/NewsBanner";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Features from "@/components/sections/Features";
import Projects from "@/components/sections/Projects";
import Team from "@/components/sections/Team";
import Impact from "@/components/sections/Impact";
import News from "@/components/sections/News";
import Events from "@/components/sections/Events";
import Gallery from "@/components/sections/Gallery";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";

export default function Page() {
  return (
    <>
      <Navbar />
      <main className="overflow-x-hidden">
        <Hero />
        <NewsBanner />
        <About />
        <Features />
        <Projects />
        <Impact />
        <Team />
        <News />
        <Events />
        <Gallery />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
