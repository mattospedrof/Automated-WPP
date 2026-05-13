"use client";

import { useEffect, useState } from "react";
import ScrollReveal from "@/app/components/ScrollReveal";
import Image from "next/image";

/* ─── Ícones — fontes: /public/media/ ─── */

/** icon-message.png */
function WhatsAppIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <div className={className}>
      <Image src="/media/icon-message.png" alt="Mensagem" width={24} height={24} className="w-full h-full object-contain" />
    </div>
  );
}

/** send-icon.svg */
function SendIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        fillRule="evenodd" clipRule="evenodd"
        d="M18.455 9.8834L7.063 4.1434C6.76535 3.96928 6.40109 3.95274 6.08888 4.09916C5.77667 4.24558 5.55647 4.53621 5.5 4.8764C5.5039 4.98942 5.53114 5.10041 5.58 5.2024L7.749 10.4424C7.85786 10.7903 7.91711 11.1519 7.925 11.5164C7.91714 11.8809 7.85789 12.2425 7.749 12.5904L5.58 17.8304C5.53114 17.9324 5.5039 18.0434 5.5 18.1564C5.55687 18.4961 5.77703 18.7862 6.0889 18.9323C6.40078 19.0785 6.76456 19.062 7.062 18.8884L18.455 13.1484C19.0903 12.8533 19.4967 12.2164 19.4967 11.5159C19.4967 10.8154 19.0903 10.1785 18.455 9.8834Z"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}

/** icon-file.svg */
function ExcelIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M9 7H8.2C7.0799 7 6.51984 7 6.09202 7.21799C5.71569 7.40973 5.40973 7.71569 5.21799 8.09202C5 8.51984 5 9.0799 5 10.2V17.8C5 18.9201 5 19.4802 5.21799 19.908C5.40973 20.2843 5.71569 20.5903 6.09202 20.782C6.51984 21 7.0799 21 8.2 21H11.8C12.9201 21 13.4802 21 13.908 20.782C14.2843 20.5903 14.5903 20.2843 14.782 19.908C15 19.4802 15 18.9201 15 17.8V17M19 8V13.8C19 14.9201 19 15.4802 18.782 15.908C18.5903 16.2843 18.2843 16.5903 17.908 16.782C17.4802 17 16.9201 17 15.8 17H12.2C11.0799 17 10.5198 17 10.092 16.782C9.71569 16.5903 9.40973 16.2843 9.21799 15.908C9 15.4802 9 14.9201 9 13.8V6.2C9 5.0799 9 4.51984 9.21799 4.09202C9.40973 3.71569 9.71569 3.40973 10.092 3.21799C10.5198 3 11.0799 3 12.2 3H14M19 8L14 3M19 8H15.6C15.0399 8 14.7599 8 14.546 7.89101C14.3578 7.79513 14.2049 7.64215 14.109 7.45399C14 7.24008 14 6.96005 14 6.4V3"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}

/** security-icon.svg */
function SecurityIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 512 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M256.001,0L29.89,130.537c0,47.476,4.506,88.936,12.057,125.463C88.61,481.721,256.001,512,256.001,512s167.389-30.279,214.053-256c7.551-36.527,12.057-77.986,12.057-125.463L256.001,0z M256.118,466.723c-0.035-0.012-0.082-0.028-0.117-0.039v-47.672V256H140.77H91.122c-6.67-29.738-11.109-63.506-12.394-101.93L255.999,51.728h0.002v51.73V256h115.27h49.625C385.636,413.404,287.327,456.774,256.118,466.723z"/>
    </svg>
  );
}

/** clock-icon.svg */
function ClockIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M12 7V12H15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}

/** check-icon.svg */
function CheckIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M16 0c-8.836 0-16 7.163-16 16s7.163 16 16 16c8.837 0 16-7.163 16-16s-7.163-16-16-16zM16 30.032c-7.72 0-14-6.312-14-14.032s6.28-14 14-14 14 6.28 14 14-6.28 14.032-14 14.032zM22.386 10.146l-9.388 9.446-4.228-4.227c-0.39-0.39-1.024-0.39-1.415 0s-0.391 1.023 0 1.414l4.95 4.95c0.39 0.39 1.024 0.39 1.415 0 0.045-0.045 0.084-0.094 0.119-0.145l9.962-10.024c0.39-0.39 0.39-1.024 0-1.415s-1.024-0.39-1.415 0z"/>
    </svg>
  );
}

/** icon-star.svg */
function SparklesIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M11.245 4.174C11.4765 3.50808 11.5922 3.17513 11.7634 3.08285C11.9115 3.00298 12.0898 3.00298 12.238 3.08285C12.4091 3.17513 12.5248 3.50808 12.7563 4.174L14.2866 8.57639C14.3525 8.76592 14.3854 8.86068 14.4448 8.93125C14.4972 8.99359 14.5641 9.04218 14.6396 9.07278C14.725 9.10743 14.8253 9.10947 15.0259 9.11356L19.6857 9.20852C20.3906 9.22288 20.743 9.23007 20.8837 9.36432C21.0054 9.48051 21.0605 9.65014 21.0303 9.81569C20.9955 10.007 20.7146 10.2199 20.1528 10.6459L16.4387 13.4616C16.2788 13.5829 16.1989 13.6435 16.1501 13.7217C16.107 13.7909 16.0815 13.8695 16.0757 13.9507C16.0692 14.0427 16.0982 14.1387 16.1563 14.3308L17.506 18.7919C17.7101 19.4667 17.8122 19.8041 17.728 19.9793C17.6551 20.131 17.5108 20.2358 17.344 20.2583C17.1513 20.2842 16.862 20.0829 16.2833 19.6802L12.4576 17.0181C12.2929 16.9035 12.2106 16.8462 12.1211 16.8239C12.042 16.8043 11.9593 16.8043 11.8803 16.8239C11.7908 16.8462 11.7084 16.9035 11.5437 17.0181L7.71805 19.6802C7.13937 20.0829 6.85003 20.2842 6.65733 20.2583C6.49056 20.2358 6.34626 20.131 6.27337 19.9793C6.18915 19.8041 6.29123 19.4667 6.49538 18.7919L7.84503 14.3308C7.90313 14.1387 7.93218 14.0427 7.92564 13.9507C7.91986 13.8695 7.89432 13.7909 7.85123 13.7217C7.80246 13.6435 7.72251 13.5829 7.56262 13.4616L3.84858 10.6459C3.28678 10.2199 3.00588 10.007 2.97101 9.81569C2.94082 9.65014 2.99594 9.48051 3.11767 9.36432C3.25831 9.23007 3.61074 9.22289 4.31559 9.20852L8.9754 9.11356C9.176 9.10947 9.27631 9.10743 9.36177 9.07278C9.43726 9.04218 9.50414 8.99359 9.55657 8.93125C9.61593 8.86068 9.64887 8.76592 9.71475 8.57639L11.245 4.174Z"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}

/** arrow-icon.svg */
function ArrowRightIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M16.3153 16.6681C15.9247 17.0587 15.9247 17.6918 16.3153 18.0824C16.7058 18.4729 17.339 18.4729 17.7295 18.0824L22.3951 13.4168C23.1761 12.6357 23.1761 11.3694 22.3951 10.5883L17.7266 5.9199C17.3361 5.52938 16.703 5.52938 16.3124 5.91991C15.9219 6.31043 15.9219 6.9436 16.3124 7.33412L19.9785 11.0002L2 11.0002C1.44772 11.0002 1 11.4479 1 12.0002C1 12.5524 1.44772 13.0002 2 13.0002L19.9832 13.0002L16.3153 16.6681Z"/>
    </svg>
  );
}

/** mail-icon.svg */
function MailIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M21 8L17.4392 9.97822C15.454 11.0811 14.4614 11.6326 13.4102 11.8488C12.4798 12.0401 11.5202 12.0401 10.5898 11.8488C9.53864 11.6326 8.54603 11.0811 6.5608 9.97822L3 8M6.2 19H17.8C18.9201 19 19.4802 19 19.908 18.782C20.2843 18.5903 20.5903 18.2843 20.782 17.908C21 17.4802 21 16.9201 21 15.8V8.2C21 7.0799 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V15.8C3 16.9201 3 17.4802 3.21799 17.908C3.40973 18.2843 3.71569 18.5903 4.09202 18.782C4.51984 19 5.07989 19 6.2 19Z"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}

/** engine-icon.svg — engrenagem, disponível para uso futuro */
function EngineIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 512 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M283.693,492.847H229.26c-14.972,0-27.153-12.177-27.153-27.144v-53.9c-19.271-6.774-37.417-17.271-52.977-30.643l-46.764,26.991c-4.106,2.361-8.772,3.605-13.503,3.606c-9.703,0-18.727-5.173-23.55-13.5l-27.237-47.184c-7.457-12.935-3.004-29.55,9.925-37.04l46.741-26.958c-1.903-10.071-2.867-20.341-2.867-30.6c0-10.258,0.963-20.527,2.867-30.6l-46.73-26.95c-12.972-7.516-17.423-24.157-9.933-37.104l27.23-47.121c4.835-8.347,13.859-13.527,23.553-13.527c4.743,0,9.417,1.257,13.517,3.635l46.754,26.946c15.576-13.353,33.724-23.837,52.974-30.604v-53.9c0-14.968,12.181-27.145,27.153-27.145h54.434c14.974,0,27.155,12.177,27.155,27.145v53.899c19.343,6.793,37.492,17.274,52.983,30.6l46.761-26.951c4.095-2.369,8.77-3.625,13.51-3.625c9.693,0,18.708,5.185,23.524,13.531l27.25,47.118c7.477,12.977,3.021,29.615-9.928,37.1l-46.738,26.955c1.89,10.021,2.846,20.291,2.846,30.599c0,10.388-0.953,20.659-2.839,30.603l46.726,26.948c6.236,3.572,10.721,9.399,12.611,16.398c1.898,7.03,0.949,14.362-2.674,20.646l-27.233,47.178c-4.827,8.335-13.847,13.508-23.544,13.509c-4.729,0-9.396-1.244-13.499-3.597l-46.775-27c-15.553,13.379-33.701,23.863-52.98,30.605v53.937C310.849,480.67,298.667,492.847,283.693,492.847z"/>
      <path d="M256.491,337.764c-44.857,0-81.351-36.465-81.351-81.287c0-44.821,36.494-81.286,81.351-81.286c44.842,0,81.323,36.465,81.323,81.286C337.814,301.299,301.333,337.764,256.491,337.764z M256.491,188.606c-37.459,0-67.934,30.446-67.934,67.87s30.475,67.871,67.934,67.871c37.444,0,67.907-30.447,67.907-67.871S293.936,188.606,256.491,188.606z"/>
    </svg>
  );
}

/* ─── Decorative Blur Orb ─── */
function BlurOrb({ className = "" }: { className?: string }) {
  return <div className={`absolute rounded-full blur-[120px] opacity-30 ${className}`} aria-hidden="true" />;
}

/* ─── Animated Counter ─── */
function AnimatedCounter({ target, suffix = "", duration = 2000 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (hasAnimated) return;
    const el = document.getElementById(`counter-${target}`);
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const interval = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(interval);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration, hasAnimated]);

  return (
    <span id={`counter-${target}`} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

/* ─── Bento Card ─── */
function BentoCard({
  children,
  className = "",
  glowColor = "rgba(0,94,255,0.15)",
}: {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}) {
  return (
    <div
      className={`relative rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm p-6 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10 hover:border-white/[0.12] group ${className}`}
      style={{ boxShadow: `0 0 40px ${glowColor}` }}
    >
      {children}
    </div>
  );
}

/* ─── App Window Mockup ─── */
const CONTACTS = [
  { initials: "JS", name: "João Silva", phone: "+55 11 9 9821-3344", status: "sent" },
  { initials: "MA", name: "Maria Alves", phone: "+55 11 9 8734-2211", status: "sent" },
  { initials: "CO", name: "Carlos Oliveira", phone: "+55 11 9 7623-1100", status: "sending" },
  { initials: "AC", name: "Ana Costa", phone: "+55 21 9 9512-8877", status: "pending" },
  { initials: "PL", name: "Pedro Lima", phone: "+55 21 9 8401-6655", status: "pending" },
];

const INITIALS_COLORS: Record<string, string> = {
  JS: "from-violet-500 to-purple-600",
  MA: "from-emerald-500 to-teal-600",
  CO: "from-[#005eff] to-[#6dd5fa]",
  AC: "from-rose-500 to-pink-600",
  PL: "from-amber-500 to-orange-500",
};

function StatusBadge({ status }: { status: string }) {
  if (status === "sent") {
    return (
      <span className="flex items-center gap-1 text-[10px] font-medium text-emerald-400">
        <svg viewBox="0 0 16 16" className="w-3 h-3" fill="currentColor">
          <path d="M2 8l3 3 3-3M5 11V4M9 8l3 3 3-3M12 11V4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </svg>
        Enviado
      </span>
    );
  }
  if (status === "sending") {
    return (
      <span className="flex items-center gap-1 text-[10px] font-medium text-[#6dd5fa]">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#6dd5fa] opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#6dd5fa]" />
        </span>
        Enviando...
      </span>
    );
  }
  return (
    <span className="text-[10px] font-medium text-white/30">Aguardando</span>
  );
}

function AppWindowMockup() {
  const [progress, setProgress] = useState(38);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => (p >= 100 ? 38 : p + 0.4));
    }, 80);
    return () => clearInterval(timer);
  }, []);

  // Derived from progress — no extra state, no second effect
  const activeIdx = Math.round(progress) >= 80 ? 3 : 2;

  const displayContacts = CONTACTS.map((c, i) => ({
    ...c,
    status: i < activeIdx ? "sent" : i === activeIdx ? "sending" : "pending",
  }));

  const sent = activeIdx;

  return (
    /* outer glow wrapper */
    <div className="relative">
      {/* glow behind window */}
      <div
        className="absolute inset-0 rounded-3xl blur-2xl opacity-40 scale-95"
        style={{ background: "linear-gradient(135deg, #005eff 0%, #6dd5fa 100%)" }}
        aria-hidden="true"
      />

      {/* window chrome */}
      <div className="relative rounded-2xl border border-white/[0.10] overflow-hidden"
        style={{ background: "rgba(10, 10, 26, 0.85)", backdropFilter: "blur(20px)" }}>

        {/* ─── Title bar ─── */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.06]"
          style={{ background: "rgba(255,255,255,0.03)" }}>
          {/* traffic lights */}
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <div className="flex-1 flex justify-center">
            <span className="text-xs font-medium text-white/50 tracking-wide">WPP Sender</span>
          </div>
          {/* connection pill */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] text-emerald-400 font-medium">Conectado</span>
          </div>
        </div>

        {/* ─── Body ─── */}
        <div className="flex">

          {/* contacts column */}
          <div className="w-[55%] border-r border-white/[0.06]">
            {/* column header */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.04]">
              <span className="text-[10px] font-semibold text-white/40 uppercase tracking-wider">Contatos</span>
              <span className="text-[10px] text-white/30">{sent}/{CONTACTS.length} enviados</span>
            </div>

            {/* contact rows */}
            <div className="divide-y divide-white/[0.04]">
              {displayContacts.map((c) => (
                <div
                  key={c.initials}
                  className={`flex items-center gap-3 px-4 py-2.5 transition-colors duration-300 ${
                    c.status === "sending" ? "bg-[#005eff]/10" : ""
                  }`}
                >
                  <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${INITIALS_COLORS[c.initials]} flex items-center justify-center flex-shrink-0`}>
                    <span className="text-[9px] font-bold text-white">{c.initials}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-white/80 truncate leading-none mb-0.5">{c.name}</p>
                    <p className="text-[10px] text-white/30 truncate">{c.phone}</p>
                  </div>
                  <StatusBadge status={c.status} />
                </div>
              ))}
            </div>
          </div>

          {/* right panel */}
          <div className="flex-1 flex flex-col">
            {/* message preview */}
            <div className="px-4 py-3 border-b border-white/[0.06] flex-1">
              <p className="text-[10px] text-white/30 font-medium uppercase tracking-wider mb-2">Mensagem</p>
              <div className="rounded-xl border border-white/[0.06] p-3" style={{ background: "rgba(255,255,255,0.03)" }}>
                <p className="text-[11px] text-white/60 leading-relaxed">
                  Olá, <span className="text-[#6dd5fa]">&#123;primeiro_nome&#125;</span>! 👋{"\n\n"}
                  Temos uma oferta especial pra você hoje. Aproveite antes que acabe!
                </p>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-[9px] text-white/20">Intervalo: 7s entre envios</span>
                <span className="text-[9px] text-white/20">📎 Nenhum anexo</span>
              </div>
            </div>

            {/* progress section */}
            <div className="px-4 py-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] text-white/40">Progresso</span>
                <span className="text-[10px] font-semibold text-[#6dd5fa] tabular-nums">
                  {Math.round(progress)}%
                </span>
              </div>

              {/* progress bar */}
              <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden mb-3">
                <div
                  className="h-full rounded-full transition-all duration-100"
                  style={{
                    width: `${progress}%`,
                    background: "linear-gradient(90deg, #005eff, #6dd5fa)",
                  }}
                />
              </div>

              {/* pause/stop buttons */}
              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg border border-white/[0.08] text-[10px] font-medium text-white/50 transition-colors hover:bg-white/[0.04]">
                  <svg viewBox="0 0 16 16" className="w-3 h-3" fill="currentColor">
                    <rect x="3" y="2" width="3.5" height="12" rx="1" />
                    <rect x="9.5" y="2" width="3.5" height="12" rx="1" />
                  </svg>
                  Pausar
                </button>
                <button className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-[#005eff]/20 border border-[#005eff]/30 text-[10px] font-medium text-[#6dd5fa] transition-colors hover:bg-[#005eff]/30">
                  <svg viewBox="0 0 16 16" className="w-3 h-3" fill="currentColor">
                    <rect x="2" y="2" width="12" height="12" rx="2" />
                  </svg>
                  Parar
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Status bar ─── */}
        <div className="flex items-center justify-between px-4 py-2 border-t border-white/[0.04]"
          style={{ background: "rgba(255,255,255,0.02)" }}>
          <span className="text-[9px] text-white/25">selenium + chrome  •  local</span>
          <span className="text-[9px] text-white/25">sessão salva ✓</span>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════ */
/* ════════════  PAGE PRINCIPAL  ═════════════ */
/* ═══════════════════════════════════════════ */
export default function Home() {
  return (
    <>
      {/* ─── Decorative Blur Orbs ─── */}
      <div aria-hidden="true" className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <BlurOrb className="w-[600px] h-[600px] bg-[#005eff] top-[20%] right-[20%]" />
        <BlurOrb className="w-[500px] h-[500px] bg-[#6dd5fa] bottom-[10%] left-[10%] opacity-20" />
        <BlurOrb className="w-[400px] h-[400px] bg-[#005eff] top-[60%] left-[60%] opacity-15" />
      </div>

      {/* ════════════════ HERO ════════════════ */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">

        {/* Dot grid */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            maskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 100%)",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* ── Left: Text ── */}
            <div className="text-center lg:text-left">

              {/* Badge */}
{/*               <ScrollReveal>
                <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/[0.10] text-sm text-white/60 mb-8 backdrop-blur-sm"
                  style={{ background: "rgba(0,94,255,0.08)" }}> */}
                  {/* live dot */}
{/*                   <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#6dd5fa] opacity-60" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#6dd5fa]" />
                  </span>
                  <WhatsAppIcon className="w-4 h-4 text-[#6dd5fa]" />
                  <span className="font-medium">WPP 1 Sender</span>
                </div>
              </ScrollReveal> */}

              {/* H1 */}
              <ScrollReveal>
                <h1 className="text-5xl md:text-6xl lg:text-[4.5rem] font-extrabold leading-[1.08] tracking-tight mb-6">
                  <span className="block text-white/90">Envie mensagens</span>
                  <span className="block bg-gradient-to-r from-[#6dd5fa] via-[#4a8eff] to-[#6dd5fa] bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient">
                    em massa
                  </span>
                  <span className="block text-white/75">pelo WhatsApp</span>
                </h1>
              </ScrollReveal>

              {/* Description */}
              <ScrollReveal>
                <p className="text-lg md:text-xl text-white/45 max-w-xl mx-auto lg:mx-0 leading-relaxed mb-4">
                  Carregue sua planilha, conecte ao WhatsApp Web e envie
                  mensagens personalizadas em massa — tudo rodando no seu computador, sem nenhum dado na nuvem.
                </p>
              </ScrollReveal>

              {/* Quick trust signals */}
              <ScrollReveal>
                <div className="flex items-center gap-4 justify-center lg:justify-start mb-10">
                  {[
                    "100% local",
                    "Excel & CSV",
                    "Retomada automática",
                  ].map((tag) => (
                    <span key={tag} className="flex items-center gap-1.5 text-xs text-white/40">
                      <CheckIcon className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      {tag}
                    </span>
                  ))}
                </div>
              </ScrollReveal>

              {/* CTAs */}
              <ScrollReveal>
                <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                  {/* Primary CTA */}
                  <a
                    href="#features"
                    className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-[1.02]"
                    style={{
                      background: "linear-gradient(135deg, #005eff, #4a8eff)",
                      boxShadow: "0 8px 32px rgba(0,94,255,0.35), 0 0 0 1px rgba(0,94,255,0.2)",
                    }}
                  >
                    {/* shimmer */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                      style={{
                        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
                      }}
                    />
                    <SparklesIcon className="w-5 h-5 relative z-10" />
                    <span className="relative z-10">Ver Funcionalidades</span>
                  </a>

                  {/* Secondary CTA */}
                  <a
                    href="#contato"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-medium text-white/70 border border-white/[0.12] hover:border-white/[0.25] hover:text-white/90 hover:bg-white/[0.04] transition-all duration-300 backdrop-blur-sm"
                  >
                    Solicite um demo
                    <ArrowRightIcon className="w-4 h-4" />
                  </a>
                </div>
              </ScrollReveal>
            </div>

            {/* ── Right: App Window Mockup ── */}
            <div className="relative hidden lg:block">
              <ScrollReveal>
                <AppWindowMockup />
              </ScrollReveal>

              {/* Floating badge: "1.200+ envios" */}
              <div
                className="absolute -bottom-4 -left-6 flex items-center gap-2.5 px-4 py-2.5 rounded-2xl border border-white/[0.10] backdrop-blur-sm animate-float-y"
                style={{ background: "rgba(10,10,26,0.85)", boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}
              >
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#005eff] to-[#6dd5fa] flex items-center justify-center flex-shrink-0">
                  <SendIcon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white leading-none">7.500+</p>
                  <p className="text-[10px] text-white/40 mt-0.5">envios realizados</p>
                </div>
              </div>

              {/* Floating badge: "0 bloqueios" */}
              <div
                className="absolute -top-4 -right-4 flex items-center gap-2 px-3 py-2 rounded-xl border border-emerald-500/20 backdrop-blur-sm animate-float-slow"
                style={{ background: "rgba(10,10,26,0.85)", boxShadow: "0 8px 24px rgba(0,0,0,0.4)" }}
              >
                <span className="text-emerald-400 text-sm">🛡️</span>
                <div>
                  <p className="text-[11px] font-semibold text-emerald-400 leading-none">0 bloqueios</p>
                  <p className="text-[9px] text-white/30 mt-0.5">taxa de sucesso 99.9%</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0e0b1e] to-transparent" aria-hidden="true" />
      </section>

      {/* ════════════════ FEATURES ════════════════ */}
      <section id="features" className="relative py-20 md:py-28">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.08] text-xs font-medium text-white/50 uppercase tracking-wider mb-4 backdrop-blur-sm">
                <SparklesIcon className="w-3.5 h-3.5" />
                Funcionalidades
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
                Tudo que você precisa
                <br />
                <span className="bg-gradient-to-r from-[#6dd5fa] to-[#005eff] bg-clip-text text-transparent">
                  para enviar em massa
                </span>
              </h2>
              <p className="text-white/40 text-lg max-w-2xl mx-auto">
                Diferenciais para automatizar seus envios no WhatsApp com eficiência, segurança e sem dor de cabeça.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger">
            {[
              {
                icon: <ExcelIcon className="w-7 h-7" />,
                title: "Importe sua Planilha",
                desc: "Carregue arquivos Excel ou CSV com Identificador (ID), Cliente e Celular. Atualização automática após cada envio.",
              },
              {
                icon: <WhatsAppIcon className="w-7 h-7 text-[#6dd5fa]" />,
                title: "Conexão via QR Code",
                desc: "Conecte-se ao WhatsApp Web escaneando o QR Code apenas uma vez. Após isso sua sessão fica sempre salva.",
              },
              {
                icon: <SendIcon className="w-7 h-7" />,
                title: "Mensagens Personalizadas",
                desc: "Use {primeiro_nome} no seu prompt para personalizar conforme o nome do cliente. A mensagem também pode ser copiada de sua IA preferida com emojis.",
              },
              {
                icon: <ClockIcon className="w-7 h-7" />,
                title: "Intervalo Configurável",
                desc: "Defina o intervalo entre envios para evitar bloqueios ou aumentar a velocidade de envio. Defina também quantos clientes quer enviar sua mensagem.",
              },
              {
                icon: <SecurityIcon className="w-7 h-7 text-green-400" />,
                title: "Retomada Automática",
                desc: "Se a execução for interrompida ou seu computador desligar, retome tranquilamente de onde parou sem perder progresso.",
              },
              {
                icon: <SecurityIcon className="w-7 h-7 text-[#6dd5fa]" />,
                title: "100% Local e Seguro",
                desc: "Rodando no seu computador com Selenium + Chrome. Sem dados na nuvem e sem exposição em servidores de terceiros.",
              },
            ].map((feature, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <BentoCard glowColor="rgba(0,94,255,0.1)">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-white/70 group-hover:text-[#6dd5fa] transition-colors">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-base font-semibold text-white/90 mb-2">{feature.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed">{feature.desc}</p>
                </BentoCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════ HOW IT WORKS ════════════════ */}
      <section className="relative py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-[#083344]/30 to-transparent" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.08] text-xs font-medium text-white/50 uppercase tracking-wider mb-4 backdrop-blur-sm">
                Como Funciona
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight">
                <span className="text-white/90">4 passos</span>{" "}
                <span className="bg-gradient-to-r from-[#6dd5fa] to-[#005eff] bg-clip-text text-transparent">
                  para começar
                </span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 stagger">
            {[
              { step: "01", title: "Conecte", desc: "Clique em Conectar WhatsApp e escaneie o QR Code com seu celular." },
              { step: "02", title: "Importe", desc: "Selecione sua planilha Excel ou CSV com os contatos." },
              { step: "03", title: "Personalize", desc: "Escreva a mensagem e use {primeiro_nome} para personalizar." },
              { step: "04", title: "Envie", desc: "Clique em ▶ Iniciar Envio e acompanhe em tempo real." },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="text-center group">
                  <div className="relative mb-4 inline-block">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#005eff]/20 to-[#6dd5fa]/20 border border-white/[0.08] flex items-center justify-center mb-2 backdrop-blur-sm">
                      <span className="text-2xl font-extrabold text-[#6dd5fa]">{item.step}</span>
                    </div>
                    <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[#005eff] text-white text-[10px] font-extrabold flex items-center justify-center shadow-lg shadow-blue-500/30">
                      {item.step}
                    </div>
                  </div>
                  <h3 className="text-base font-semibold text-white/80 mb-2">{item.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed max-w-[240px] mx-auto">
                    {item.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════ STATS ════════════════ */}
      <section className="relative py-16 md:py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-[#083344] to-[#0e0b1e]" aria-hidden="true" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-px bg-gradient-to-r from-transparent via-[#005eff]/50 to-transparent" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 stagger">
            {[
              { target: 7500, label: "Envios Realizados", icon: <SendIcon /> },
              { target: 100, label: "Planilhas Processadas", icon: <ExcelIcon /> },
              { target: 100.00, suffix: "%", label: "Taxa de Sucesso", icon: <SecurityIcon /> },
              { target: 0, suffix: "+", label: "Bloqueios", icon: <SecurityIcon /> },
            ].map((stat, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 text-4xl md:text-5xl font-extrabold text-white mb-2">
                    <span className="text-[#6dd5fa]">
                      <AnimatedCounter target={stat.target} suffix={stat.suffix} />
                    </span>
                    <span className="text-white/30 w-5 h-5">{stat.icon}</span>
                  </div>
                  <p className="text-sm text-white/40 font-medium">{stat.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════ CTA FINAL ════════════════ */}
      <section className="relative py-20 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#005eff]/20 via-[#083344] to-[#0e0b1e] rounded-3xl mx-4" aria-hidden="true" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 80%, #005eff 0%, transparent 50%),
                              radial-gradient(circle at 80% 20%, #6dd5fa 0%, transparent 50%)`,
          }}
          aria-hidden="true"
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 z-10 text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-6">
              <span className="text-white">Pronto para automatizar seus</span>{" "}
              <span className="bg-gradient-to-r from-[#6dd5fa] to-[#005eff] bg-clip-text text-transparent">
                envios no WhatsApp?
              </span>
            </h2>
          </ScrollReveal>
          <ScrollReveal>
            <p className="text-lg text-white/40 max-w-2xl mx-auto mb-10 leading-relaxed">
              Fale com a gente e veja como nossa automação pode funcionar
              para o seu negócio. Sem complicações.
            </p>
          </ScrollReveal>
          <ScrollReveal>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="#contato"
                className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-[1.02]"
                style={{
                  background: "linear-gradient(135deg, #005eff, #4a8eff)",
                  boxShadow: "0 8px 32px rgba(0,94,255,0.35), 0 0 0 1px rgba(0,94,255,0.2)",
                }}
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)" }}
                />
                <SparklesIcon className="w-5 h-5 relative z-10" />
                <span className="relative z-10">Solicite um demo</span>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ════════════════ INFO CARDS (alternating) ════════════════ */}
      <section className="relative py-20 md:py-24">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 stagger">
            <ScrollReveal>
              <BentoCard glowColor="rgba(0,94,255,0.1)">
                <div className="grid grid-cols-12 gap-6 items-center">
                  <div className="col-span-5">
                    <div className="aspect-square rounded-2xl bg-gradient-to-br from-[#005eff]/20 to-[#6dd5fa]/20 border border-white/[0.08] flex items-center justify-center">
                      <div className="text-6xl">📋</div>
                    </div>
                  </div>
                  <div className="col-span-7">
                    <h3 className="text-xl font-bold text-white/90 mb-2">Planilhas Inteligentes</h3>
                    <p className="text-sm text-white/40 leading-relaxed">
                      Use Excel ou CSV para gerenciar seus contatos. O sistema detecta a coluna de
                      telefone automaticamente, mesmo que você não saiba qual é o índice.
                    </p>
                  </div>
                </div>
              </BentoCard>
            </ScrollReveal>

            <ScrollReveal>
              <BentoCard glowColor="rgba(109,213,250,0.1)">
                <div className="grid grid-cols-12 gap-6 items-center">
                  <div className="col-span-5 order-last lg:order-first">
                    <div className="aspect-square rounded-2xl bg-gradient-to-br from-[#6dd5fa]/20 to-cyan-400/20 border border-white/[0.08] flex items-center justify-center">
                      <div className="text-6xl">🛡️</div>
                    </div>
                  </div>
                  <div className="col-span-7">
                    <h3 className="text-xl font-bold text-white/90 mb-2">Segurança &amp; Privacidade</h3>
                    <p className="text-sm text-white/40 leading-relaxed">
                      Tudo roda localmente no seu computador. Seus dados nunca saem da sua máquina.
                      Sessão salva automaticamente após o primeiro QR Code.
                    </p>
                  </div>
                </div>
              </BentoCard>
            </ScrollReveal>
          </div>
        </div>
      </section>
      {/* ════════════════ CONTATO ════════════════ */}
      <section id="contato" className="relative py-20 md:py-28">
        {/* subtle top divider */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-px bg-gradient-to-r from-transparent via-[#005eff]/40 to-transparent" aria-hidden="true" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.08] text-xs font-medium text-white/50 uppercase tracking-wider mb-4 backdrop-blur-sm">
                Fale conosco
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
                <span className="text-white/90">Quer ver o</span>{" "}
                <span className="bg-gradient-to-r from-[#6dd5fa] to-[#005eff] bg-clip-text text-transparent">
                  aplicativo em ação no seu negócio?
                </span>
              </h2>
              <p className="text-white/40 text-lg max-w-xl mx-auto leading-relaxed">
                Envie uma mensagem e agendaremos uma demonstração personalizada.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div
              className="rounded-3xl border border-white/[0.08] p-8 md:p-12"
              style={{
                background: "rgba(255,255,255,0.02)",
                backdropFilter: "blur(16px)",
                boxShadow: "0 0 60px rgba(0,94,255,0.08)",
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

                {/* Left: info */}
                <div className="space-y-6">
                  {[
                    {
                      icon: (
                        <MailIcon className="w-5 h-5" />
                      ),
                      label: "E-mail",
                      value: "frannkztech@gmail.com",
                    },
                    {
                      icon: (
                        <ClockIcon className="w-5 h-5" />
                      ),
                      label: "Resposta em até",
                      value: "48 horas úteis",
                    },
                    {
                      icon: (
                        <WhatsAppIcon className="w-5 h-5" />
                      ),
                      label: "Suporte",
                      value: "24/7 com atualizações",
                    },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-[#005eff]/15 border border-[#005eff]/20 flex items-center justify-center text-[#6dd5fa] flex-shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-xs text-white/30 font-medium">{item.label}</p>
                        <p className="text-sm font-semibold text-white/80 mt-0.5">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Right: CTA */}
                <div className="flex flex-col items-center text-center gap-6 md:border-l md:border-white/[0.06] md:pl-10">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, #005eff, #6dd5fa)" }}
                  >
                    <MailIcon className="w-8 h-8 text-white" />
                  </div>

                  <div>
                    <p className="text-white/70 text-sm leading-relaxed max-w-xs">
                      Clique abaixo e nos conte sobre o seu projeto. Responderemos com uma proposta de demo personalizada.
                    </p>
                  </div>

                  <a
                    href="mailto:frannkztech@gmail.com?subject=Solicitar%20demo%20%E2%80%94%20GUI%20WhatsApp%20Sender"
                    className="group relative w-full inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-base font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-[1.02]"
                    style={{
                      background: "linear-gradient(135deg, #005eff, #4a8eff)",
                      boxShadow: "0 8px 32px rgba(0,94,255,0.35), 0 0 0 1px rgba(0,94,255,0.2)",
                    }}
                  >
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                      style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)" }}
                    />
                    <MailIcon className="w-5 h-5 relative z-10" />
                    <span className="relative z-10">Enviar e-mail</span>
                  </a>

                  <p className="text-[11px] text-white/20">
                    Sem compromisso · Demo 100% gratuita
                  </p>
                </div>

              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}