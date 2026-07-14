import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SchoolHero from "@/components/school/SchoolHero";
import SchoolSchedule from "@/components/school/SchoolSchedule";
import SchoolForm from "@/components/school/SchoolForm";

export const revalidate = 60;

export default function SchoolPage() {
  return (
    <>
      <Navbar />
      <main className="overflow-x-hidden">
        <SchoolHero />
        {/* Schedule + signup sit on the light surface, like the careers page. */}
        <div className="theme-light">
          <SchoolSchedule />
          <SchoolForm id="school-apply" />
        </div>
      </main>
      <Footer />
    </>
  );
}
