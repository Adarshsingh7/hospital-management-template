"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Lock, User, ShieldAlert } from "lucide-react";
import { VKLogo } from "@/components/vk-logo";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        router.push("/admin/dashboard");
      } else {
        setError(data.error || "Invalid username or password.");
      }
    } catch (err) {
      console.error(err);
      setError("An unexpected network error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col justify-center bg-[var(--color-surface-container-low)] px-6 py-12 lg:px-8">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(254,226,226,0.25),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(219,234,254,0.3),transparent_40%)]" />

      <div className="relative sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <VKLogo className="h-14 w-auto" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold tracking-tight text-[var(--color-primary)]">
          Admin Portal Login
        </h2>
        <p className="mt-2 text-center text-sm text-[var(--color-on-surface-variant)]">
          Access the V.K. Medical Center appointment management dashboard.
        </p>
      </div>

      <div className="relative mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="surface-card p-8 shadow-[var(--shadow-strong)] border border-[var(--color-outline-variant)]">
          {error && (
            <div className="mb-6 flex gap-3 rounded-xl bg-rose-50 border border-rose-100 p-4 text-sm text-rose-800">
              <ShieldAlert className="h-5 w-5 shrink-0 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="form-label" htmlFor="username">
                Username
              </label>
              <div className="relative mt-2">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <User className="h-5 w-5 text-[var(--color-outline)]" />
                </div>
                <input
                  id="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="form-field pl-10"
                />
              </div>
            </div>

            <div>
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <div className="relative mt-2">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Lock className="h-5 w-5 text-[var(--color-outline)]" />
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="form-field pl-10"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="btn-danger w-full justify-center py-3 text-base flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  "Login to Dashboard"
                )}
              </button>
            </div>
          </form>

          {/* <div className="mt-8 rounded-xl bg-[var(--color-surface-container)] p-4 text-xs text-[var(--color-on-surface-variant)] leading-5">
            <span className="font-semibold text-[var(--color-primary)]">Tip:</span> If the local database is fresh, the first attempt will auto-create a default administrator account with username <code className="bg-white/60 px-1 py-0.5 rounded border border-black/5 font-mono">admin</code> and password <code className="bg-white/60 px-1 py-0.5 rounded border border-black/5 font-mono">admin123</code>.
          </div> */}
        </div>
      </div>
    </div>
  );
}
