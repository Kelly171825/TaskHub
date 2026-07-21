"use client";

import { FormEvent, useState } from "react";
import { Search, Send, Users } from "@/components/icons";
import { Avatar } from "@/components/ui";

type Person = {
  initials: string;
  name: string;
  unread?: string;
  online?: boolean;
};

type Message = {
  initials: string;
  author: string;
  content: string;
  time: string;
  color: string;
};

const channels: Person[] = [
  { initials: "#", name: "Geral", unread: "12" },
  { initials: "#", name: "Design", unread: "5" },
  { initials: "#", name: "Produto" },
];

const directMessages: Person[] = [
  { initials: "MC", name: "Marina Costa", online: true },
  { initials: "RS", name: "Rafael Silva", online: true },
];

const initialMessages: Message[] = [
  {
    initials: "RS",
    author: "Rafael Silva",
    content: "Pessoal, já subi a nova versão do onboarding para revisão. 🚀",
    time: "10:32",
    color: "bg-blue-500",
  },
  {
    initials: "MC",
    author: "Você",
    content: "Ficou excelente! Vou deixar alguns comentários no Figma.",
    time: "10:36",
    color: "bg-orange-400",
  },
  {
    initials: "AL",
    author: "Alice Lima",
    content: "Também vou revisar agora. A transição está bem mais fluida.",
    time: "10:41",
    color: "bg-rose-400",
  },
];

export default function ChatPage() {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const content = text.trim();
    if (!content) return;

    setMessages((current) => [
      ...current,
      {
        initials: "MC",
        author: "Você",
        content,
        time: "agora",
        color: "bg-orange-400",
      },
    ]);
    setText("");
  }

  return (
    <div className="flex h-[calc(100vh-73px)]">
      <aside className="hidden w-72 border-r border-slate-200 bg-white p-4 lg:block">
        <div className="relative">
          <Search size={15} className="absolute left-3 top-3 text-slate-400" />
          <input
            placeholder="Buscar conversas"
            className="w-full rounded-lg bg-slate-100 py-2.5 pl-9 text-xs outline-none"
          />
        </div>

        <p className="mb-2 mt-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">
          Canais
        </p>
        {channels.map((channel, index) => (
          <button
            key={channel.name}
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm ${
              index === 0
                ? "bg-brand-50 font-semibold text-brand-600"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <span className="text-slate-400">{channel.initials}</span>
            {channel.name}
            {channel.unread && (
              <span className="ml-auto rounded-full bg-brand-500 px-1.5 text-[9px] text-white">
                {channel.unread}
              </span>
            )}
          </button>
        ))}

        <p className="mb-2 mt-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">
          Mensagens diretas
        </p>
        {directMessages.map((person) => (
          <button
            key={person.name}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-slate-600 hover:bg-slate-50"
          >
            <Avatar initials={person.initials} color="bg-orange-400" />
            {person.name}
            {person.online && <span className="ml-auto h-2 w-2 rounded-full bg-emerald-400" />}
          </button>
        ))}
      </aside>

      <section className="flex min-w-0 flex-1 flex-col bg-[#fbfbfc]">
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
          <div>
            <h1 className="font-bold"># geral</h1>
            <p className="text-xs text-slate-400">12 membros</p>
          </div>
          <button className="rounded-lg p-2 text-slate-500 hover:bg-slate-100" aria-label="Ver membros">
            <Users size={18} />
          </button>
        </header>

        <div className="flex-1 space-y-6 overflow-auto p-6">
          {messages.map((message, index) => (
            <div key={`${message.author}-${index}`} className="flex gap-3">
              <Avatar initials={message.initials} color={message.color} />
              <div>
                <p className="text-sm">
                  <b>{message.author}</b>
                  <span className="ml-2 text-[10px] text-slate-400">{message.time}</span>
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-600">{message.content}</p>
              </div>
            </div>
          ))}
        </div>

        <form
          onSubmit={handleSubmit}
          className="m-5 flex gap-2 rounded-xl border border-slate-200 bg-white p-2 shadow-sm"
        >
          <input
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Escreva uma mensagem..."
            className="flex-1 px-3 text-sm outline-none"
          />
          <button
            type="submit"
            className="grid h-9 w-9 place-items-center rounded-lg bg-brand-500 text-white"
            aria-label="Enviar mensagem"
          >
            <Send size={16} />
          </button>
        </form>
      </section>
    </div>
  );
}
