import dynamicImport from "next/dynamic";
import Navbar from "@/components/Navbar";

// Avoid build-time prerender — homepage queries DB at request time
export const dynamic = "force-dynamic";
import Footer from "@/components/Footer";
import NewsBanner from "@/components/NewsBanner";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import {
  getProjects,
  getNews,
  getEvents,
  getGalleryImages,
  getKpis,
  getFaq,
} from "@/lib/queries";

const Features = dynamicImport(() => import("@/components/sections/Features"));
const Projects = dynamicImport(() => import("@/components/sections/Projects"));
const Team = dynamicImport(() => import("@/components/sections/Team"));
const Impact = dynamicImport(() => import("@/components/sections/Impact"));
const News = dynamicImport(() => import("@/components/sections/News"));
const Events = dynamicImport(() => import("@/components/sections/Events"));
const Gallery = dynamicImport(() => import("@/components/sections/Gallery"));
const FAQ = dynamicImport(() => import("@/components/sections/FAQ"));
const Contact = dynamicImport(() => import("@/components/sections/Contact"));

export default async function Page() {
  const [projects, news, events, gallery, kpis, faq] = await Promise.all([
    getProjects(),
    getNews(),
    getEvents(),
    getGalleryImages(),
    getKpis(),
    getFaq(),
  ]);

  return (
    <>
      <Navbar />
      <main className="overflow-x-hidden">
        <Hero />
        <NewsBanner news={news} />
        <About />
        <Features />
        <Projects projects={projects} />
        <Impact kpis={kpis} />
        <Team />
        <News news={news} />
        <Events events={events} />
        <Gallery images={gallery} />
        <FAQ items={faq} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
