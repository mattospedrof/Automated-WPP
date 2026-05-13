import './globals.css';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import { SpeedInsights } from '@vercel/speed-insights/next'

export const metadata = {
  title: 'FA Tech - WPP Sender',
  description: 'Automatize envios em massa no WhatsApp de forma simples, segura e organizada.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="h-full antialiased" suppressHydrationWarning>
      <body className="bg-[#0e0b1e] text-white min-h-screen flex flex-col font-inter">
        {/* ─── Navbar ─── */}
        <Navbar />

        {/* ─── Conteúdo ─── */}
        <main className="flex-1 pt-16">{children}</main>

        {/* ─── Footer ─── */}
        <footer className="bg-[#0a0a1a] border-t border-white/[0.06] pt-12 pb-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center bg-white/[0.06] border border-white/[0.08]">
                    <img
                      src="/media/icon-message.png"
                      alt="FA Tech ícone"
                      width={24}
                      height={24}
                      className="object-contain"
                    />
                  </div>
                  <span className="text-white font-semibold">FA Tech - WPP Sender</span>
                </div>
                <p className="text-sm text-white/50 leading-relaxed">
                  Automatize envios em massa no WhatsApp de forma simples, segura e organizada.
                </p>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-4">
                  Navegação
                </h4>
                <ul className="space-y-2">
                  <li>
                    <Link href="/" className="text-sm text-white/50 hover:text-white transition-colors">
                      Início
                    </Link>
                  </li>
                  <li>
                    <Link href="/#contato" className="text-sm text-white/50 hover:text-white transition-colors">
                      Contato
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-4">
                  Recursos
                </h4>
                <ul className="space-y-2">
                  <li>
                    <Link href="/#features" className="text-sm text-white/50 hover:text-white transition-colors">
                      Funcionalidades
                    </Link>
                  </li>
                  <li>
                    <Link href="/#contato" className="text-sm text-white/50 hover:text-white transition-colors">
                      Solicitar demo
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-white/[0.06] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-white/30">
                © 20{new Date().getFullYear().toString().slice(2)} FA Tech - WPP Sender. Todos os direitos reservados.
              </p>
            </div>
          </div>
        </footer>
        <SpeedInsights/>
      </body>
    </html>
  );
}