"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    setLoading(false);
    if (!response.ok) {
      setError("Senha inválida. Tente novamente.");
      return;
    }

    router.replace(searchParams.get("next") || "/dashboard");
    router.refresh();
  }

  return <main className="grid min-h-screen place-items-center bg-[#f8f8fb] p-5">
    <section className="w-full max-w-md rounded-2xl border border-slate-100 bg-white p-8 shadow-card">
      <div className="mb-8 flex items-center gap-2"><span className="grid h-8 w-8 place-items-center rounded-[10px] bg-brand-500 font-black text-white">T</span><b className="text-xl">TaskHub</b></div>
      <h1 className="text-2xl font-bold">Acessar o TaskHub</h1>
      <p className="mt-2 text-sm text-slate-500">Digite a senha do workspace para abrir seu painel.</p>
      <form onSubmit={handleLogin} className="mt-7 space-y-4">
        <label className="block text-xs font-semibold text-slate-600">Senha do workspace<input value={password} onChange={(event) => setPassword(event.target.value)} type="password" autoComplete="current-password" placeholder="Sua senha" className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-normal outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20" required /></label>
        {error && <p className="rounded-lg bg-rose-50 px-3 py-2 text-xs font-medium text-rose-600">{error}</p>}
        <button disabled={loading} className="w-full rounded-xl bg-brand-500 py-3 text-sm font-semibold text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-70">{loading ? "Verificando..." : "Entrar no painel"}</button>
      </form>
      <p className="mt-6 text-center text-xs text-slate-400">Acesso protegido para a equipe Aurora Studio.</p>
    </section>
  </main>;
}
