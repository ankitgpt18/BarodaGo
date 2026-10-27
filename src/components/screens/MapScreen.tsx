import React from 'react';
import { InteractiveMap } from '../InteractiveMap';
import { useCivicData } from '../../context/CivicDataContext';
import { useTheme } from '../../context/ThemeContext';
import { Issue } from '../../types';
import { MapPin } from 'lucide-react';
import { FontFamily } from '../../constants/typography';

interface MapScreenProps {
  onSelectIssue?: (issue: Issue) => void;
  onOpenReport?: () => void;
}

export const MapScreen: React.FC<MapScreenProps> = ({
  onSelectIssue,
}) => {
  const { theme, colors } = useTheme();
  const { filteredIssues, selectedWard, setSelectedWard, wards, selectedCategory, setSelectedCategory } = useCivicData();

  return (
    <div
      className="min-h-full flex flex-col pb-24 transition-colors duration-200"
      style={{ backgroundColor: colors.surface }}
    >
      {/* Top Map Control Bar */}
      <div
        className="px-4 py-3 border-b flex items-center justify-between z-10 transition-colors"
        style={{
          backgroundColor: colors.surface,
          borderColor: colors.borderLight,
        }}
      >
        <div className="flex items-center gap-2">
          <MapPin size={18} style={{ color: colors.secondaryBright }} />
          <div>
            <h2
              className="text-base font-bold leading-tight transition-colors"
              style={{ fontFamily: FontFamily.display, color: colors.textPrimary }}
            >
              Vadodara Civic Radar
            </h2>
            <p
              className="text-[11px] font-medium transition-colors"
              style={{ color: colors.textSecondary }}
            >
              Live GIS incident mapping • {filteredIssues.length} active pins
            </p>
          </div>
        </div>

        {/* Ward Selector Pill */}
        <select
          value={selectedWard}
          onChange={(e) => setSelectedWard(e.target.value)}
          className="px-2.5 py-1 rounded-full text-xs font-bold border-none outline-none cursor-pointer transition-colors"
          style={{
            fontFamily: FontFamily.body,
            backgroundColor: colors.sand,
            color: colors.textPrimary,
          }}
        >
          <option value="all" style={{ backgroundColor: colors.surfaceCard, color: colors.textPrimary }}>All Wards</option>
          {wards.map((w) => (
            <option key={w.wardNumber} value={w.name} style={{ backgroundColor: colors.surfaceCard, color: colors.textPrimary }}>
              {w.name}
            </option>
          ))}
        </select>
      </div>

      {/* Filter Category Chips */}
      <div
        className="px-4 py-2 backdrop-blur-xs border-b flex items-center gap-2 overflow-x-auto scrollbar-none z-10 transition-colors"
        style={{
          backgroundColor: colors.surfaceCard,
          borderColor: colors.borderLight,
        }}
      >
        <button
          onClick={() => setSelectedCategory('all')}
          className="px-3 py-1 rounded-full text-xs font-bold transition-all shrink-0 active:scale-95"
          style={{
            cursor: 'pointer',
            border: 'none',
            backgroundColor: selectedCategory === 'all' ? colors.primary : colors.sand,
            color: selectedCategory === 'all' ? '#FFFFFF' : colors.textPrimary,
          }}
        >
          All
        </button>
        {['pothole', 'garbage', 'streetlight', 'water_leak', 'drainage'].map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat as any)}
              className="px-3 py-1 rounded-full text-xs font-bold uppercase transition-all shrink-0 active:scale-95"
              style={{
                cursor: 'pointer',
                border: 'none',
                backgroundColor: isSelected ? colors.primary : colors.sand,
                color: isSelected ? '#FFFFFF' : colors.textPrimary,
              }}
            >
              {cat.replace('_', ' ')}
            </button>
          );
        })}
      </div>

      {/* Map Container */}
      <div className="flex-1 w-full relative min-h-[480px]">
        <InteractiveMap
          onSelectIssue={(issue) => {
            onSelectIssue?.(issue);
          }}
        />
      </div>
    </div>
  );
};
