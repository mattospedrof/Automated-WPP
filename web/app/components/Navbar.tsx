"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-90 navbar-glass border-b border-white/[0.1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg overflow-hidden flex items-center justify-center bg-white/[0.06] border border-white/[0.08]">
            <img
              src="media/icon-message.png"
              alt="FA Tech ícone"
              width={28}
              height={28}
              className="object-contain"
            />
          </div>
          <span className="text-xl font-bold tracking-tight">
            FA Tech <span className="text-[#6dd5fa]">- WPP Sender</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors duration-200 ${
              !pathname || pathname === "/" ? "text-white" : "text-white/60 hover:text-white"
            }`}
          >
            Início
          </Link>
          <Link
            href="/#contato"
            className="px-5 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-[#005eff] to-[#6dd5fa] text-white hover:opacity-90 transition-opacity shadow-lg shadow-blue-500/20"
          >
            Começar Agora
          </Link>
        </div>
      </div>
    </nav>
  );
}