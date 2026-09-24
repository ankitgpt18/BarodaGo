import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-neutral-800/80 bg-[#080B11] text-xs text-neutral-400 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Brand & mission */}
          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center space-x-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-600 text-white font-black text-xs">
                BDQ
              </div>
              <span className="font-bold text-sm text-white">BarodaGO</span>
              <span className="rounded bg-neutral-800 px-1.5 py-0.5 font-mono text-[10px] text-amber-400">
                CITIZEN OS
              </span>
            </div>

            <p className="text-xs text-neutral-400 max-w-md leading-relaxed">
              An open civic accountability platform for Vadodara, Gujarat. Connecting citizens directly with VMC ward engineers, desilting teams, and road repair crews without bureaucratic delay.
            </p>

            <div className="flex items-center space-x-2 text-[11px] text-neutral-400 font-mono">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              <span>Compliant with Open311 civic data standards • No tracking</span>
            </div>
          </div>

          {/* Ward Coverage */}
          <div className="md:col-span-3 space-y-2">
            <div className="font-semibold text-neutral-200 uppercase tracking-wider text-[11px]">
              Municipal Zones Covered
            </div>
            <ul className="space-y-1 text-xs text-neutral-400">
              <li>West Zone: Alkapuri, Akota, Gotri</li>
              <li>Central Zone: Sayajigunj, Raopura, Mandvi</li>
              <li>North Zone: Karelibaug, Sama, Harni</li>
              <li>South Zone: Manjalpur, Tarsali, Makarpura</li>
              <li>East Zone: Waghodia, Bapod, Ajwa Rd</li>
            </ul>
          </div>

          {/* Engineering & Resume Info */}
          <div className="md:col-span-3 space-y-2">
            <div className="font-semibold text-neutral-200 uppercase tracking-wider text-[11px]">
              Engineered by Ankit
            </div>
            <p className="text-xs text-neutral-400">
              Designed as a high-end civic tech SaaS demonstration for product engineering portfolios.
            </p>
            <div className="pt-2 flex flex-col space-y-1.5 font-mono text-xs">
              <a
                href="https://github.com/ankitgpt18/BarodaGo"
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-1.5 text-amber-400 hover:text-amber-300 transition-colors"
              >
                <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                <span>github.com/ankitgpt18/BarodaGo</span>
              </a>
              <div className="text-[11px] text-neutral-400">
                Stack: React 19 • TypeScript • Tailwind • Leaflet GIS
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-neutral-400">
          <div>
            &copy; 2026 BarodaGO • Built for Vadodara Citizens (આપણું વડોદરા)
          </div>
          <div className="flex items-center space-x-1">
            <span>Crafted with pride for Baroda</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
