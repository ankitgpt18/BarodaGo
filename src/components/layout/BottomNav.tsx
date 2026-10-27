import React from 'react';
import { Home, Map, Camera, Award, User } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { FontFamily } from '../../constants/typography';

export type TabId = 'home' | 'map' | 'scan' | 'impact' | 'profile';

interface BottomNavProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
}) => {
  const { theme, colors } = useTheme();

  const tabs: Array<{
    id: TabId;
    label: string;
    icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string; style?: React.CSSProperties }>;
  }> = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'map', label: 'Map', icon: Map },
    { id: 'scan', label: 'Scan', icon: Camera },
    { id: 'impact', label: 'Impact', icon: Award },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav
      className="sticky bottom-0 left-0 right-0 z-40 select-none pb-safe w-full transition-colors duration-200"
      style={{
        backgroundColor: colors.surface,
        borderTop: `1px solid ${colors.borderLight}`,
        boxShadow: `0 -4px 16px ${colors.shadow}`,
      }}
    >
      <div className="w-full px-4 h-16 flex items-center justify-around relative">
        {tabs.map((tab) => {
          const isScan = tab.id === 'scan';
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;

          if (isScan) {
            return (
              <div key={tab.id} className="relative -top-5 flex flex-col items-center">
                <button
                  onClick={() => onTabChange(tab.id)}
                  className="w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg transition-transform active:scale-95"
                  style={{
                    backgroundColor: colors.secondaryBright,
                    boxShadow: '0 8px 20px rgba(216, 49, 32, 0.45)',
                    border: `3px solid ${colors.surface}`,
                    cursor: 'pointer',
                  }}
                  aria-label="Scan and Report"
                >
                  <Camera size={26} strokeWidth={2.4} />
                </button>
                <span
                  className="text-[11px] font-bold mt-0.5"
                  style={{
                    fontFamily: FontFamily.body,
                    color: isActive ? colors.secondaryBright : colors.textSecondary,
                  }}
                >
                  Scan
                </span>
              </div>
            );
          }

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="flex-1 flex flex-col items-center justify-center py-1 transition-all active:scale-95"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
              aria-label={tab.label}
            >
              <div className="relative">
                <Icon
                  size={22}
                  strokeWidth={isActive ? 2.5 : 2}
                  className="transition-colors"
                  style={{
                    color: isActive ? colors.secondaryBright : colors.textSecondary,
                  }}
                />
                {isActive && (
                  <span
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                    style={{ backgroundColor: colors.secondaryBright }}
                  />
                )}
              </div>
              <span
                className="text-[11px] mt-1 transition-colors"
                style={{
                  fontFamily: FontFamily.body,
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? colors.textPrimary : colors.textSecondary,
                }}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
