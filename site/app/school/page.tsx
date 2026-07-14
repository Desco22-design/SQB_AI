import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SchoolHero from "@/components/school/SchoolHero";
import SchoolSchedule from "@/components/school/SchoolSchedule";
import SchoolForm from "@/components/school/SchoolForm";
import { getSeatCounts } from "@/lib/school-seats";

// Seat counts must be current: a cached page would offer a lesson that filled up
// minutes ago. The API still enforces capacity, but the page should not lie.
export const dynamic = "force-dynamic";

export default async function SchoolPage() {
  const seats = await getSeatCounts();

  return (
    <>
      <Navbar />
      <main className="overflow-x-hidden">
        <SchoolHero />
        {/* Schedule + signup sit on the light surface, like the careers page. */}
        <div className="theme-light">
          <SchoolSchedule seats={seats} />
          <SchoolForm id="school-apply" seats={seats} />
        </div>
      </main>
      <Footer />
    </>
  );
}
