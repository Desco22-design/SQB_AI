import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NewsBanner from "@/components/NewsBanner";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";

const Features = dynamic(() => import("@/components/sections/Features"));
const Projects = dynamic(() => import("@/components/sections/Projects"));
const Team = dynamic(() => import("@/components/sections/Team"));
const Impact = dynamic(() => import("@/components/sections/Impact"));
const News = dynamic(() => import("@/components/sections/News"));
const Events = dynamic(() => import("@/components/sections/Events"));
const Gallery = dynamic(() => import("@/components/sections/Gallery"));
const FAQ = dynamic(() => import("@/components/sections/FAQ"));
const Contact = dynamic(() => import("@/components/sections/Contact"));

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
