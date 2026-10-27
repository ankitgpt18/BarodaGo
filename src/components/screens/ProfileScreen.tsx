import React, { useState } from 'react';
import { 
  MapPin, 
  Coins, 
  ClipboardList, 
  Bell, 
  Globe, 
  ShieldCheck, 
  PhoneCall, 
  ChevronRight, 
  Sun,
  Moon
} from 'lucide-react';
import { FontFamily } from '../../constants/typography';
import { useTheme } from '../../context/ThemeContext';

interface ProfileScreenProps {
  onOpenMyReports?: () => void;
  onOpenNotifications?: () => void;
  onOpenCoinsStore?: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  onOpenMyReports,
  onOpenNotifications,
  onOpenCoinsStore,
}) => {
  const { theme, toggleTheme, colors } = useTheme();
  const [language, setLanguage] = useState<'en' | 'gu' | 'hi'>('en');

  return (
    <div
      className="pb-28 px-4 sm:px-6 max-w-2xl mx-auto space-y-5 pt-3 min-h-full transition-colors duration-200"
      style={{ backgroundColor: colors.surface }}
    >
      {/* 1. Profile Header Card */}
      <div
        className="rounded-3xl p-5 shadow-2xs flex items-center justify-between transition-colors"
        style={{
          backgroundColor: colors.surfaceCard,
          border: `1px solid ${colors.borderLight}`,
        }}
      >
        <div className="flex items-center gap-4">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center font-black text-xl text-white shadow-sm shrink-0"
            style={{
              backgroundColor: colors.primary,
              fontFamily: FontFamily.display,
            }}
          >
            AG
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h2
                className="text-lg sm:text-xl font-bold transition-colors"
                style={{ fontFamily: FontFamily.display, color: colors.textPrimary }}
              >
                Ankit Gupta
              </h2>
              <ShieldCheck size={16} className="text-emerald-500 shrink-0" />
            </div>
            <p
              className="text-xs flex items-center gap-1 mt-0.5 transition-colors"
              style={{ color: colors.textSecondary }}
            >
              <MapPin size={12} style={{ color: colors.textSecondary }} />
              <span>Resident of Alkapuri, Ward 9</span>
            </p>
            <span
              className="inline-block mt-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold"
              style={{
                fontFamily: FontFamily.mono,
                backgroundColor: theme === 'dark' ? '#2A2412' : '#FEF9EF',
                color: theme === 'dark' ? '#FBBF24' : '#B06000',
                border: `1px solid ${theme === 'dark' ? '#785A17' : '#FCD34D'}`,
              }}
            >
              Gaekwad Civic Citizen #4812
            </span>
          </div>
        </div>

        <button
          onClick={onOpenCoinsStore}
          className="flex flex-col items-center justify-center p-2.5 rounded-2xl transition-all active:scale-95 shrink-0"
          style={{
            cursor: 'pointer',
            backgroundColor: theme === 'dark' ? '#2A2412' : '#FEF9EF',
            border: `1px solid ${theme === 'dark' ? '#785A17' : '#EFEAE0'}`,
          }}
        >
          <div className="flex items-center gap-1 font-bold text-amber-500">
            <Coins size={16} className="fill-amber-500" />
            <span className="text-base font-black" style={{ fontFamily: FontFamily.mono }}>
              420
            </span>
          </div>
          <span className="text-[10px] font-semibold" style={{ color: colors.textSecondary }}>
            Coins
          </span>
        </button>
      </div>

      {/* 2. Quick Action Grid */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={onOpenMyReports}
          className="p-4 rounded-2xl text-left hover:shadow-xs transition-all flex flex-col justify-between active:scale-98"
          style={{
            cursor: 'pointer',
            backgroundColor: colors.surfaceCard,
            border: `1px solid ${colors.borderLight}`,
          }}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center mb-2"
            style={{
              backgroundColor: theme === 'dark' ? '#0F3020' : '#ECFDF5',
              color: theme === 'dark' ? '#6EE7B7' : '#047857',
            }}
          >
            <ClipboardList size={20} />
          </div>
          <div>
            <h4
              className="text-sm font-bold transition-colors"
              style={{ fontFamily: FontFamily.display, color: colors.textPrimary }}
            >
              My Reports
            </h4>
            <p className="text-xs transition-colors" style={{ color: colors.textSecondary }}>
              2 active, 11 resolved
            </p>
          </div>
        </button>

        <button
          onClick={onOpenNotifications}
          className="p-4 rounded-2xl text-left hover:shadow-xs transition-all flex flex-col justify-between active:scale-98"
          style={{
            cursor: 'pointer',
            backgroundColor: colors.surfaceCard,
            border: `1px solid ${colors.borderLight}`,
          }}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center mb-2"
            style={{
              backgroundColor: theme === 'dark' ? '#351B17' : '#FFF1F2',
              color: theme === 'dark' ? '#FDA4AF' : '#BE123C',
            }}
          >
            <Bell size={20} />
          </div>
          <div>
            <h4
              className="text-sm font-bold transition-colors"
              style={{ fontFamily: FontFamily.display, color: colors.textPrimary }}
            >
              Notifications
            </h4>
            <p className="text-xs transition-colors" style={{ color: colors.textSecondary }}>
              3 unread updates
            </p>
          </div>
        </button>
      </div>

      {/* 3. Settings List */}
      <div
        className="rounded-3xl overflow-hidden shadow-2xs transition-colors divide-y"
        style={{
          backgroundColor: colors.surfaceCard,
          border: `1px solid ${colors.borderLight}`,
          borderColor: colors.borderLight,
        }}
      >
        {/* Theme Appearance Mode Toggle */}
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ backgroundColor: colors.sand, color: colors.textPrimary }}
            >
              {theme === 'dark' ? <Moon size={16} /> : <Sun size={16} />}
            </div>
            <div>
              <h5 className="text-sm font-bold" style={{ color: colors.textPrimary }}>
                Appearance Theme
              </h5>
              <p className="text-xs" style={{ color: colors.textSecondary }}>
                {theme === 'dark' ? 'Obsidian Dark mode active' : 'Sayaji Light mode active'}
              </p>
            </div>
          </div>
          <button
            onClick={toggleTheme}
            className="px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 shadow-2xs"
            style={{
              backgroundColor: theme === 'dark' ? '#2A2312' : '#FEEFC3',
              color: theme === 'dark' ? '#FBBF24' : '#B06000',
              border: `1px solid ${theme === 'dark' ? '#6B5115' : '#FCD34D'}`,
              cursor: 'pointer',
            }}
          >
            {theme === 'dark' ? <Sun size={14} className="text-amber-400" /> : <Moon size={14} />}
            <span>{theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}</span>
          </button>
        </div>

        {/* Language Selection */}
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Globe size={18} style={{ color: colors.textSecondary }} />
            <div>
              <h5 className="text-sm font-bold" style={{ color: colors.textPrimary }}>
                App Language
              </h5>
              <p className="text-xs" style={{ color: colors.textSecondary }}>
                Gujarati, English, Hindi
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {[
              { id: 'en', label: 'English' },
              { id: 'gu', label: 'ગુજરાતી' },
              { id: 'hi', label: 'हिंदी' },
            ].map((lang) => (
              <button
                key={lang.id}
                onClick={() => setLanguage(lang.id as any)}
                className="px-2.5 py-1 rounded-lg text-xs font-bold transition-all active:scale-95"
                style={{
                  cursor: 'pointer',
                  border: 'none',
                  backgroundColor: language === lang.id ? colors.primary : colors.sand,
                  color: language === lang.id ? '#FFFFFF' : colors.textPrimary,
                }}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>

        {/* VMC Citizen Charter */}
        <a
          href="https://vmc.gov.in"
          target="_blank"
          rel="noopener noreferrer"
          className="p-4 flex items-center justify-between transition-colors hover:opacity-90"
          style={{ textDecoration: 'none' }}
        >
          <div className="flex items-center gap-3">
            <ShieldCheck size={18} style={{ color: colors.textSecondary }} />
            <div>
              <h5 className="text-sm font-bold" style={{ color: colors.textPrimary }}>
                VMC Citizen Charter
              </h5>
              <p className="text-xs" style={{ color: colors.textSecondary }}>
                Guaranteed SLAs & grievance rights
              </p>
            </div>
          </div>
          <ChevronRight size={16} style={{ color: colors.textSecondary }} />
        </a>

        {/* Emergency VMC Toll-Free */}
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <PhoneCall size={18} style={{ color: colors.secondaryBright }} />
            <div>
              <h5 className="text-sm font-bold" style={{ color: colors.textPrimary }}>
                VMC 24/7 Helpline
              </h5>
              <p
                className="text-xs font-bold"
                style={{ fontFamily: FontFamily.mono, color: colors.textSecondary }}
              >
                1800 233 0265 (Toll Free)
              </p>
            </div>
          </div>
          <a
            href="tel:18002330265"
            className="px-3.5 py-1.5 rounded-full text-xs font-bold text-white shadow-xs active:scale-95 transition-transform"
            style={{ backgroundColor: colors.secondaryBright, textDecoration: 'none' }}
          >
            Call
          </a>
        </div>
      </div>

      {/* Version badge */}
      <div className="text-center pt-2">
        <p
          className="text-xs font-semibold"
          style={{ fontFamily: FontFamily.mono, color: colors.textSecondary }}
        >
          BarodaGo v2.4 • Sayaji Civic Framework
        </p>
        <p className="text-[11px] mt-0.5" style={{ color: colors.textSecondary }}>
          Dedicated to the people of Vadodara & VMC
        </p>
      </div>
    </div>
  );
};
