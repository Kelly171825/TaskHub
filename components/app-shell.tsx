"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, NewTaskButton, TaskModal } from "@/components/ui";
import { Bell, CalendarDays, ChevronDown, KanbanSquare, LayoutDashboard, MessageSquareText, Search, Settings, Users } from "@/components/icons";

const navigation = [
  { href: "/dashboard", label: "Visão geral", icon: LayoutDashboard },
  { href: "/board", label: "Projetos", icon: KanbanSquare },
  { href: "/calendar", label: "Calendário", icon: CalendarDays },
  { href: "/chat", label: "Mensagens", icon: MessageSquareText },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();

  return <div className="min-h-screen bg-[#f8f8fb]">
    <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 flex-col border-r border-slate-200/70 bg-white p-4 md:flex">
      <Link href="/dashboard" className="mb-9 flex items-center gap-2 px-2"><span className="grid h-8 w-8 place-items-center rounded-[10px] bg-brand-500 font-black text-white">T</span><span className="text-lg font-extrabold tracking-tight">TaskHub</span></Link>
      <button className="mb-7 flex items-center gap-3 rounded-xl bg-slate-50 px-3 py-2.5 text-left text-sm"><span className="grid h-6 w-6 place-items-center rounded-md bg-gradient-to-br from-violet-400 to-fuchsia-500 text-xs font-bold text-white">A</span><span className="flex-1 font-medium">Aurora Studio</span><ChevronDown size={15} /></button>
      <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[.12em] text-slate-400">Workspace</p>
      <nav className="space-y-1">{navigation.map(({ href, label, icon: Icon }) => <Link key={href} href={href} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${path === href ? "bg-brand-500 text-white shadow-md shadow-brand-500/15" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"}`}><Icon size={18} />{label}{label === "Mensagens" && <span className="ml-auto rounded-full bg-rose-500 px-1.5 text-[9px] text-white">3</span>}</Link>)}</nav>
      <p className="mb-2 mt-8 px-3 text-[10px] font-bold uppercase tracking-[.12em] text-slate-400">Equipe</p>
      <Link href="/team" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-500 hover:bg-slate-50"><Users size={18} />Membros</Link>
      <div className="mt-auto border-t border-slate-100 pt-4">
        <Link href="/settings" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-500 hover:bg-slate-50"><Settings size={18} />Configurações</Link>
        <Link href="/settings" className="mt-3 flex items-center gap-3 rounded-xl px-3 py-2 transition hover:bg-slate-50"><Avatar initials="MC" color="bg-orange-400" /><div className="min-w-0"><p className="truncate text-sm font-semibold">Marina Costa</p><p className="text-xs text-slate-400">Administradora</p></div><ChevronDown size={14} className="ml-auto" /></Link>
      </div>
    </aside>
    <main className="md:ml-64"><header className="sticky top-0 z-10 flex h-[73px] items-center justify-between border-b border-slate-200/70 bg-white/80 px-5 backdrop-blur md:px-9"><div className="relative hidden w-72 sm:block"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input placeholder="Buscar tarefas, projetos..." className="w-full rounded-xl bg-slate-100 py-2.5 pl-10 pr-3 text-sm outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-brand-400/30" /></div><div className="md:hidden font-bold">TaskHub</div><div className="flex items-center gap-3"><button className="relative rounded-xl p-2 text-slate-500 hover:bg-slate-100"><Bell size={19} /><span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white" /></button><NewTaskButton /></div></header>{children}</main>
    <TaskModal />
  </div>;
}
