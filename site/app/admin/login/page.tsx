"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { AlertCircle } from "lucide-react";
import { useT } from "@/components/admin/AdminI18n";
import { LanguageSwitcher } from "@/components/admin/LanguageSwitcher";

export default function AdminLoginPage() {
  const t = useT();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin";
  const { status } = useSession();

  // If already signed in, send the user straight to the dashboard
  useEffect(() => {
    if (status === "authenticated") {
      router.replace(callbackUrl);
    }
  }, [status, callbackUrl, router]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl,
    });
    setLoading(false);
    if (res?.error) {
      setError(t.login.error);
      return;
    }
    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex justify-end p-5">
        <LanguageSwitcher />
      </div>
      <div className="flex-1 flex items-center justify-center px-6 pb-10">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <Image
                src="/brand/sqb-ai-logo.png"
                alt="SQB AI"
                width={161}
                height={36}
                priority
                style={{ height: 44, width: "auto" }}
              />
            </div>
            <p
              style={{ color: "var(--text-muted)", fontSize: 14 }}
            >
              {t.login.sub}
            </p>
          </div>

          <form onSubmit={onSubmit} className="ad-card" style={{ padding: 28 }}>
            <div className="mb-4">
              <label className="ad-label">{t.login.email}</label>
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="ad-input"
                placeholder={t.login.placeholder}
                autoComplete="username"
              />
            </div>

            <div className="mb-5">
              <label className="ad-label">{t.login.password}</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="ad-input"
                autoComplete="current-password"
              />
            </div>

            {error && (
              <div
                className="mb-4 text-sm rounded-lg p-3 flex items-center gap-2"
                style={{
                  color: "var(--danger)",
                  background: "var(--danger-soft)",
                }}
              >
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="ad-btn ad-btn-primary w-full justify-center"
            >
              {loading ? t.login.submitting : t.login.submit}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
