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
  getTeamHeadlineValue,
  getFeatureCards,
  getAboutBenefits,
} from "@/lib/queries";
import { getAllSectionHeadings } from "@/lib/section-headings";

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
  const [projects, news, events, gallery, kpis, faq, teamHeadline, featureCards, aboutBenefits, headings] =
    await Promise.all([
      getProjects(),
      getNews(),
      getEvents(),
      getGalleryImages(),
      getKpis(),
      getFaq(),
      getTeamHeadlineValue(),
      getFeatureCards(),
      getAboutBenefits(),
      getAllSectionHeadings(),
    ]);

  return (
    <>
      <Navbar />
      <main className="overflow-x-hidden">
        <Hero />
        <NewsBanner news={news} />
        <About benefits={aboutBenefits} heading={headings.about} />
        <Features cards={featureCards} heading={headings.features} />
        <Projects projects={projects} heading={headings.projects} />
        <Impact kpis={kpis} heading={headings.impact} />
        <Team headlineValue={teamHeadline ?? undefined} heading={headings.team} />
        <News news={news} heading={headings.news} />
        <Events events={events} heading={headings.events} />
        <Gallery images={gallery} heading={headings.gallery} />
        <FAQ items={faq} heading={headings.faq} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
