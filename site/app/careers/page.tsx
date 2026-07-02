import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Contact from "@/components/sections/Contact";
import Projects from "@/components/sections/Projects";
import { VacancyGrid } from "@/components/careers/VacancyGrid";
import { CareersHero } from "@/components/careers/CareersHero";
import { getVacancies, getProjects } from "@/lib/queries";
import { getAllSectionHeadings } from "@/lib/section-headings";

export const revalidate = 60;

export default async function CareersPage() {
  const [vacancies, projects, headings] = await Promise.all([
    getVacancies(),
    getProjects(),
    getAllSectionHeadings(),
  ]);

  return (
    <>
      <Navbar />
      <main className="overflow-x-hidden">
        <CareersHero />
        <div className="theme-light">
          <VacancyGrid vacancies={vacancies} />
          <Projects projects={projects} heading={headings.projects} tableOnly />
          <Contact defaultMode="intern" lockMode formOnly id="careers-apply" />
        </div>
      </main>
      <Footer />
    </>
  );
}
