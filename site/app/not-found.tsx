import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-bg-0 px-6 text-center">
      <div className="max-w-md">
        <div className="font-display text-6xl font-bold text-white">404</div>
        <p className="mt-4 text-sm text-white/60">
          Sahifa topilmadi · Страница не найдена · Page not found
        </p>
        <Link href="/" className="btn-primary mx-auto mt-8 inline-flex">
          Bosh sahifa / Home
        </Link>
      </div>
    </main>
  );
}
