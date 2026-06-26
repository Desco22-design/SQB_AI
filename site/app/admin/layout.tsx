import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./admin.css";
import { Providers } from "./Providers";
import { Sidebar } from "@/components/admin/Sidebar";
import { TopBar } from "@/components/admin/TopBar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getServerLocale } from "@/lib/admin-i18n-server";
import { prisma } from "@/lib/prisma";

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

// Admin pages always render at request time (auth + DB queries)
export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const locale = getServerLocale();

  // Unread incoming Telegram messages — drives the sidebar badge.
  let unreadMessages = 0;
  if (session) {
    try {
      unreadMessages = await prisma.contactMessage.count({
        where: { direction: "in", read: false },
      });
    } catch {
      unreadMessages = 0;
    }
  }

  return (
    <Providers locale={locale}>
      {session ? (
        <div className={`admin-shell ${inter.variable}`}>
          <Sidebar unreadMessages={unreadMessages} />
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
