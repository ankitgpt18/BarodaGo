import React, { useState } from 'react';
import { Wifi, Signal, Maximize2, Smartphone, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { FontFamily } from '../../constants/typography';

interface PhoneShellProps {
  children: React.ReactNode;
}

export const PhoneShell: React.FC<PhoneShellProps> = ({ children }) => {
  const { theme, toggleTheme, colors } = useTheme();
  const [deviceMode, setDeviceMode] = useState<'phone' | 'plus' | 'expanded'>('plus');

  const widthClass =
    deviceMode === 'phone'
      ? 'sm:w-[412px]'
      : deviceMode === 'plus'
      ? 'sm:w-[448px]'
      : 'sm:w-[500px]';

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-0 sm:p-3 select-none relative transition-colors duration-300"
      style={{
        backgroundColor: theme === 'dark' ? '#090D0A' : '#EDE7DB',
      }}
    >
      {/* Top Floating Control Bar (Desk toolbar for size + theme toggle) */}
      <div className="hidden sm:flex items-center gap-2 mb-2 px-3 py-1.5 rounded-full bg-[#1A1916]/85 backdrop-blur-md text-white text-xs font-semibold shadow-lg z-50 border border-white/10">
        <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest mr-0.5">
          VIEWPORT:
        </span>
        <button
          onClick={() => setDeviceMode('phone')}
          className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold transition-all ${
            deviceMode === 'phone'
              ? 'bg-white text-neutral-900 shadow-2xs'
              : 'text-neutral-300 hover:text-white'
          }`}
          style={{ cursor: 'pointer', border: 'none', background: deviceMode === 'phone' ? '#FFFFFF' : 'transparent' }}
        >
          <Smartphone size={12} />
          <span>412px</span>
        </button>
        <button
          onClick={() => setDeviceMode('plus')}
          className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold transition-all ${
            deviceMode === 'plus'
              ? 'bg-[#D83120] text-white shadow-2xs'
              : 'text-neutral-300 hover:text-white'
          }`}
          style={{ cursor: 'pointer', border: 'none', background: deviceMode === 'plus' ? '#D83120' : 'transparent' }}
        >
          <span>Spacious (448px)</span>
        </button>
        <button
          onClick={() => setDeviceMode('expanded')}
          className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold transition-all ${
            deviceMode === 'expanded'
              ? 'bg-white text-neutral-900 shadow-2xs'
              : 'text-neutral-300 hover:text-white'
          }`}
          style={{ cursor: 'pointer', border: 'none', background: deviceMode === 'expanded' ? '#FFFFFF' : 'transparent' }}
        >
          <Maximize2 size={12} />
          <span>500px</span>
        </button>

        <div className="w-[1px] h-3.5 bg-neutral-600 mx-1" />

        {/* Quick Theme Switcher */}
        <button
          onClick={toggleTheme}
          className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-white/10 hover:bg-white/20 transition-all text-neutral-200"
          style={{ cursor: 'pointer', border: 'none' }}
          title="Toggle Light / Dark Mode"
        >
          {theme === 'dark' ? (
            <>
              <Sun size={12} className="text-amber-400 fill-amber-400" />
              <span>Light Mode</span>
            </>
          ) : (
            <>
              <Moon size={12} className="text-neutral-300 fill-neutral-300" />
              <span>Dark Mode</span>
            </>
          )}
        </button>
      </div>

      {/* Outer Smartphone Bezel */}
      <div
        className={`w-full ${widthClass} h-screen sm:h-[min(880px,calc(100vh-46px))] bg-[#181714] sm:rounded-[48px] p-0 sm:p-[9px] shadow-[0_25px_60px_-15px_rgba(22,56,40,0.32)] flex flex-col relative transition-all duration-300`}
        style={{
          boxShadow: theme === 'dark'
            ? '0 25px 60px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255,255,255,0.1)'
            : '0 25px 60px -12px rgba(22, 56, 40, 0.28), 0 0 0 1px rgba(0,0,0,0.15)',
        }}
      >
        {/* Inner Phone Screen Display */}
        <div
          className="w-full h-full sm:rounded-[38px] flex flex-col overflow-hidden relative border transition-colors duration-200"
          style={{
            backgroundColor: colors.surface,
            borderColor: colors.borderLight,
          }}
        >
          {/* Authentic Smartphone Status Bar */}
          <div
            className="h-10 shrink-0 px-6 pt-2 pb-1 flex items-center justify-between z-50 transition-colors duration-200"
            style={{
              backgroundColor: colors.surface,
              color: colors.textPrimary,
            }}
          >
            {/* Left: Time */}
            <span
              className="text-xs font-bold tracking-tight"
              style={{ fontFamily: FontFamily.mono, color: colors.textPrimary }}
            >
              9:41
            </span>

            {/* Center: Dynamic Island Pill */}
            <div className="w-24 h-4.5 bg-black rounded-full flex items-center justify-end px-2 shadow-inner">
              <span className="w-2.5 h-2.5 rounded-full bg-[#111] ring-1 ring-neutral-800" />
            </div>

            {/* Right: Icons (Signal, Wifi, Battery) */}
            <div className="flex items-center gap-1.5" style={{ color: colors.textPrimary }}>
              <Signal size={12} strokeWidth={2.4} />
              <Wifi size={13} strokeWidth={2.4} />
              <div className="flex items-center gap-0.5">
                <div
                  className="w-5 h-2.5 rounded-xs border p-0.5 flex items-center"
                  style={{ borderColor: colors.textPrimary }}
                >
                  <div
                    className="w-3.5 h-1.5 rounded-2xs"
                    style={{ backgroundColor: colors.textPrimary }}
                  />
                </div>
                <div
                  className="w-0.5 h-1 rounded-r-xs"
                  style={{ backgroundColor: colors.textPrimary }}
                />
              </div>
            </div>
          </div>

          {/* Phone Screen Canvas (Scrolls smoothly inside phone viewport) */}
          <div className="flex-1 flex flex-col overflow-hidden relative">
            {children}
          </div>

          {/* Bottom Home Indicator Bar */}
          <div
            className="h-4.5 shrink-0 flex items-center justify-center pointer-events-none z-50 transition-colors duration-200"
            style={{ backgroundColor: colors.surface }}
          >
            <div
              className="w-32 h-1 rounded-full transition-colors duration-200"
              style={{
                backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.25)',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
