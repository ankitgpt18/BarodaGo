import React from 'react';
import { MapPin, ChevronDown, Bell, Coins, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { FontFamily } from '../../constants/typography';

interface TopBarProps {
  currentWard?: string;
  wardSubtext?: string;
  coins?: number;
  unreadNotifications?: number;
  onOpenWardPicker?: () => void;
  onOpenNotifications?: () => void;
  onOpenProfile?: () => void;
  onOpenCoinsStore?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  currentWard = 'Alkapuri, Ward 9',
  wardSubtext = 'Ward 9 · Central Vadodara',
  coins = 420,
  unreadNotifications = 3,
  onOpenWardPicker,
  onOpenNotifications,
  onOpenProfile,
  onOpenCoinsStore,
}) => {
  const { theme, toggleTheme, colors } = useTheme();

  return (
    <header
      className="sticky top-0 z-40 px-3.5 py-2.5 border-b flex items-center justify-between transition-colors duration-200"
      style={{
        backgroundColor: colors.surface,
        borderColor: colors.borderLight,
        backdropFilter: 'blur(12px)',
      }}
    >
      {/* Location / Ward Selector */}
      <button
        onClick={onOpenWardPicker}
        className="flex items-center gap-2 text-left group transition-all flex-1 min-w-0 mr-1.5"
        style={{
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
        }}
        aria-label="Select Ward"
      >
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-2xs transition-colors"
          style={{
            backgroundColor: colors.sand,
            color: colors.primary,
          }}
        >
          <MapPin size={15} strokeWidth={2.4} />
        </div>
        <div className="flex flex-col min-w-0 flex-1">
          <div className="flex items-center gap-1 min-w-0">
            <span
              className="text-xs sm:text-sm font-bold tracking-tight truncate max-w-[115px] sm:max-w-[170px]"
              style={{
                fontFamily: FontFamily.display,
                color: colors.textPrimary,
              }}
            >
              {currentWard}
            </span>
            <ChevronDown
              size={13}
              strokeWidth={2.4}
              style={{ color: colors.primary }}
              className="group-hover:translate-y-0.5 transition-transform shrink-0 opacity-80"
            />
          </div>
          <span
            className="text-[10px] sm:text-[11px] font-medium truncate max-w-[115px] sm:max-w-[170px]"
            style={{
              fontFamily: FontFamily.body,
              color: colors.textSecondary,
            }}
          >
            {wardSubtext}
          </span>
        </div>
      </button>

      {/* Right Action Icons: Theme Toggle, Coins, Bell, User Avatar */}
      <div className="flex items-center gap-1.5 shrink-0">
        {/* Theme Toggle Button (Light / Dark) */}
        <button
          onClick={toggleTheme}
          className="w-8 h-8 rounded-full flex items-center justify-center transition-all active:scale-90 hover:opacity-85 shadow-2xs"
          style={{
            backgroundColor: colors.sand,
            color: colors.textPrimary,
            border: `1px solid ${colors.borderLight}`,
            cursor: 'pointer',
          }}
          title={theme === 'dark' ? 'Switch to Light Sayaji Theme' : 'Switch to Dark Obsidian Theme'}
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? (
            <Sun size={15} className="text-amber-400 fill-amber-400 transition-transform duration-300 rotate-0 hover:rotate-45" />
          ) : (
            <Moon size={15} className="text-neutral-700 fill-neutral-700 transition-transform duration-300" />
          )}
        </button>

        {/* Coins Badge Chip */}
        <button
          onClick={onOpenCoinsStore}
          className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold transition-transform active:scale-95 shadow-2xs"
          style={{
            backgroundColor: theme === 'dark' ? '#2A2312' : '#FEEFC3',
            color: theme === 'dark' ? '#FBBF24' : '#B06000',
            border: `1px solid ${theme === 'dark' ? '#6B5115' : '#FCD34D'}`,
            fontFamily: FontFamily.mono,
            cursor: 'pointer',
          }}
          title="Civic Coins"
        >
          <Coins size={13} className="text-amber-500 fill-amber-500" />
          <span>{coins}</span>
        </button>

        {/* Notifications Icon with Badge */}
        <button
          onClick={onOpenNotifications}
          className="relative w-8 h-8 rounded-full flex items-center justify-center transition-all hover:opacity-85 active:scale-95"
          style={{
            backgroundColor: colors.sand,
            color: colors.textPrimary,
            border: `1px solid ${colors.borderLight}`,
            cursor: 'pointer',
          }}
          aria-label="Notifications"
        >
          <Bell size={16} strokeWidth={2.2} />
          {unreadNotifications > 0 && (
            <span
              className="absolute top-1 right-1 w-2 h-2 rounded-full ring-2 ring-white"
              style={{ backgroundColor: colors.secondary }}
            />
          )}
        </button>

        {/* Profile Avatar */}
        <button
          onClick={onOpenProfile}
          className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white shadow-xs transition-transform active:scale-95"
          style={{
            backgroundColor: colors.primaryContainer,
            border: `2px solid ${colors.border}`,
            fontFamily: FontFamily.display,
            fontSize: '12px',
            cursor: 'pointer',
          }}
          aria-label="User Profile"
        >
          AG
        </button>
      </div>
    </header>
  );
};
