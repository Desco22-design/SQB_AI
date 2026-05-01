import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import "./admin.css";
import { Providers } from "./Providers";
import { Sidebar } from "@/components/admin/Sidebar";
import { TopBar } from "@/components/admin/TopBar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getServerLocale } from "@/lib/admin-i18n-server";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SQB AI — Admin",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const locale = getServerLocale();

  return (
    <Providers locale={locale}>
      {session ? (
        <div className={`admin-shell ${inter.variable}`}>
          <Sidebar />
          <div className="ml-[260px] min-h-screen flex flex-col">
            <TopBar />
            <main
              className="flex-1"
              style={{ padding: "24px 32px 48px" }}
            >
              {children}
            </main>
          </div>
        </div>
      ) : (
        <div className={`admin-shell ${inter.variable}`}>{children}</div>
      )}
    </Providers>
  );
}
