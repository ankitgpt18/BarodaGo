import React, { useState } from 'react';
import { 
  X, 
  Search, 
  Navigation, 
  Check, 
  Clock, 
  ArrowRight
} from 'lucide-react';
import { FontFamily } from '../../constants/typography';
import { useTheme } from '../../context/ThemeContext';

interface AreaSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentWard: string;
  onSelectWard: (ward: string, precinct: string) => void;
}

export const AreaSwitcherModal: React.FC<AreaSwitcherModalProps> = ({
  isOpen,
  onClose,
  onSelectWard,
}) => {
  const { theme, colors } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [selected, setSelected] = useState('W-09');

  if (!isOpen) return null;

  const sectors = [
    { code: 'W-01', name: 'Sayajigunj & Station', zone: 'Central Zone', subtext: 'Kala Ghoda, Station Underpass, Dak Bungalow' },
    { code: 'W-02', name: 'Subhanpura & Gorwa', zone: 'West Zone', subtext: 'Gorwa Water Tank, Ellora Park, IPCL Circle' },
    { code: 'W-03', name: 'Chhani & New Sama', zone: 'North Zone', subtext: 'Chhani Octroi Naka, TP 13, GSFC Road' },
    { code: 'W-04', name: 'Gotri & Vasna Road', zone: 'West Zone', subtext: 'Yash Complex, Harinagar Char Rasta, Gotri Lake' },
    { code: 'W-05', name: 'Sama & Harni Road', zone: 'North Zone', subtext: 'Sama Indoor Sports Complex, Abhilasha Char Rasta' },
    { code: 'W-06', name: 'Fatehgunj & MSU Campus', zone: 'North Zone', subtext: 'MSU Pavilion, Rosary School, Nizampura Bridge' },
    { code: 'W-07', name: 'Karelibaug & Bahucharaji', zone: 'East Zone', subtext: 'VIP Road, Ratribazar, Amrapali Complex' },
    { code: 'W-08', name: 'Warasiya & Fatehpura', zone: 'East Zone', subtext: 'Warasiya Ring Road, Kavi Kalapi Garden' },
    { code: 'W-09', name: 'Alkapuri & Race Course', zone: 'Central Zone', subtext: 'RC Dutt Road, Inox Circle, Chakli Circle' },
    { code: 'W-10', name: 'Akota & Old Padra Road', zone: 'West Zone', subtext: 'Akota Bridge, Dandia Bazar Corridor, Malhar Point' },
    { code: 'W-11', name: 'Tandalja & Vasna-Bhayli', zone: 'West Zone', subtext: 'Sun Pharma Road, Nilamber Circle, Bhayli TP' },
    { code: 'W-12', name: 'Manjalpur & Darbar Chowkdi', zone: 'South Zone', subtext: 'Tulsidham, Eva Mall, Shreyas School' },
    { code: 'W-13', name: 'Makarpura & GIDC', zone: 'South Zone', subtext: 'Makarpura Bus Depot, Novino Tarsali, Air Force Station' },
    { code: 'W-14', name: 'Pratapnagar & Danteshwar', zone: 'South Zone', subtext: 'ONGC Colony, Pratapnagar Railway Station' },
    { code: 'W-15', name: 'Waghodia Road & Parivar', zone: 'East Zone', subtext: 'Parivar Char Rasta, Kendranagar, Uma Char Rasta' },
    { code: 'W-16', name: 'Ajwa Road & Sayajipura', zone: 'East Zone', subtext: 'Kamlanagar Pond, Sardar Estate, Ekta Nagar' },
    { code: 'W-17', name: 'Bapod & Panigate', zone: 'East Zone', subtext: 'Bapod Lake, Panigate Darwaza, Ayurvedic College' },
    { code: 'W-18', name: 'Mandvi, Sursagar & Nyay Mandir', zone: 'Central Zone', subtext: 'Sursagar Lake, Nyay Mandir, Champaner Gate' },
    { code: 'W-19', name: 'Wadi & Mogalwada', zone: 'Central Zone', subtext: 'Wadi Tower, Baranpura, Chouhandi Darwaza' },
  ];

  const filtered = sectors.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.subtext.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleApply = () => {
    const chosen = sectors.find((s) => s.code === selected);
    if (chosen) {
      onSelectWard(`${chosen.name}, ${chosen.code.replace('W-0', 'Ward ').replace('W-', 'Ward ')}`, `${chosen.zone} · ${chosen.subtext}`);
    }
    onClose();
  };

  return (
    <div className="absolute inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-xs select-none">
      <div
        className="w-full max-w-lg rounded-t-3xl sm:rounded-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-200 transition-colors"
        style={{
          backgroundColor: colors.surface,
          border: `1px solid ${colors.borderLight}`,
        }}
      >
        {/* Drag handle on mobile */}
        <div
          className="w-12 h-1.5 rounded-full mx-auto mt-3 mb-1 sm:hidden"
          style={{ backgroundColor: colors.sand }}
        />

        {/* Header */}
        <div
          className="px-5 py-3 flex items-start justify-between border-b transition-colors"
          style={{
            borderColor: colors.borderLight,
          }}
        >
          <div>
            <h3
              className="text-lg font-bold transition-colors"
              style={{ fontFamily: FontFamily.display, color: colors.textPrimary }}
            >
              Select Ward & Precinct
            </h3>
            <p className="text-xs font-medium" style={{ color: colors.textSecondary }}>
              Municipal governance boundary mapping
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center active:scale-95 transition-all"
            style={{
              cursor: 'pointer',
              border: `1px solid ${colors.borderLight}`,
              backgroundColor: colors.sand,
              color: colors.textPrimary,
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-5 space-y-4 overflow-y-auto">
          {/* Map Preview Banner */}
          <div
            className="relative rounded-2xl overflow-hidden p-3.5 text-white shadow-xs"
            style={{
              background: 'linear-gradient(135deg, #163828 0%, #2C4D3C 100%)',
            }}
          >
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="flex items-center gap-1.5" style={{ fontFamily: FontFamily.mono }}>
                🗺️ VMC WARD MAP
              </span>
              <span className="px-2 py-0.5 rounded-full bg-white/20 text-[10px]">
                19 Wards Active
              </span>
            </div>
            <p className="text-xs text-emerald-100/90 mt-1">
              Vishwamitri River Basin • Sayaji Baug • Central Zone
            </p>
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2"
              style={{ color: colors.textSecondary }}
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search ward, area, or landmark in Vadodara..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl text-xs font-medium outline-none transition-colors"
              style={{
                fontFamily: FontFamily.body,
                backgroundColor: colors.surfaceCard,
                border: `1px solid ${colors.borderLight}`,
                color: colors.textPrimary,
              }}
            />
          </div>

          {/* Current GPS button */}
          <button
            onClick={() => {
              setSelected('W-09');
            }}
            className="w-full p-3.5 rounded-2xl flex items-center justify-between transition-colors active:scale-98"
            style={{
              cursor: 'pointer',
              backgroundColor: colors.surfaceCard,
              border: `1px solid ${colors.borderLight}`,
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: theme === 'dark' ? '#0F3020' : '#ECFDF5',
                  color: theme === 'dark' ? '#6EE7B7' : '#047857',
                }}
              >
                <Navigation size={18} />
              </div>
              <div className="text-left">
                <h5
                  className="text-sm font-bold leading-snug transition-colors"
                  style={{ color: colors.textPrimary }}
                >
                  Use my current GPS location
                </h5>
                <p className="text-xs" style={{ color: colors.textSecondary }}>
                  Alkapuri, Ward 9 · Central Vadodara
                </p>
              </div>
            </div>
            {selected === 'W-09' && (
              <div
                className="w-6 h-6 rounded-full text-white flex items-center justify-center"
                style={{ backgroundColor: colors.primary }}
              >
                <Check size={14} strokeWidth={3} />
              </div>
            )}
          </button>

          {/* Recent Areas Pills */}
          <div>
            <span
              className="text-[10px] font-extrabold uppercase tracking-widest block mb-2"
              style={{ fontFamily: FontFamily.mono, color: colors.textSecondary }}
            >
              RECENT AREAS
            </span>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {[
                { code: 'W-09', name: 'Alkapuri (Ward 9)' },
                { code: 'W-10', name: 'Akota (Ward 10)' },
                { code: 'W-08', name: 'Fatehgunj (Ward 8)' },
              ].map((area) => (
                <button
                  key={area.code}
                  onClick={() => setSelected(area.code)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all active:scale-95"
                  style={{
                    cursor: 'pointer',
                    border: 'none',
                    backgroundColor: selected === area.code ? colors.primary : colors.sand,
                    color: selected === area.code ? '#FFFFFF' : colors.textPrimary,
                  }}
                >
                  <Clock size={12} />
                  <span>{area.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Municipal Sectors List */}
          <div>
            <span
              className="text-[10px] font-extrabold uppercase tracking-widest block mb-2"
              style={{ fontFamily: FontFamily.mono, color: colors.textSecondary }}
            >
              VADODARA MUNICIPAL SECTORS
            </span>
            <div className="space-y-2">
              {filtered.map((sec) => {
                const isSelected = selected === sec.code;
                return (
                  <button
                    key={sec.code}
                    onClick={() => setSelected(sec.code)}
                    className="w-full p-3 rounded-2xl flex items-center justify-between transition-all text-left active:scale-98"
                    style={{
                      cursor: 'pointer',
                      backgroundColor: colors.surfaceCard,
                      border: isSelected
                        ? `2px solid ${colors.primary}`
                        : `1px solid ${colors.borderLight}`,
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="px-2 py-0.5 rounded text-[11px] font-extrabold"
                        style={{
                          fontFamily: FontFamily.mono,
                          backgroundColor: colors.sand,
                          color: colors.textPrimary,
                        }}
                      >
                        {sec.code}
                      </span>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span
                            className="text-sm font-bold transition-colors"
                            style={{ fontFamily: FontFamily.display, color: colors.textPrimary }}
                          >
                            {sec.name}
                          </span>
                          {sec.code === 'W-09' && (
                            <span
                              className="px-1.5 py-0.2 rounded text-[10px] font-bold"
                              style={{
                                backgroundColor: theme === 'dark' ? '#3B1A17' : '#FFE4E6',
                                color: theme === 'dark' ? '#FDA4AF' : '#BE123C',
                                border: `1px solid ${theme === 'dark' ? '#7A271A' : '#FECDD3'}`,
                              }}
                            >
                              Active
                            </span>
                          )}
                        </div>
                        <p className="text-xs" style={{ color: colors.textSecondary }}>
                          {sec.zone} · {sec.subtext}
                        </p>
                      </div>
                    </div>

                    <div
                      className="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all"
                      style={{
                        borderColor: isSelected ? colors.primary : colors.borderLight,
                        backgroundColor: isSelected ? colors.primary : 'transparent',
                        color: '#FFFFFF',
                      }}
                    >
                      {isSelected && <Check size={12} strokeWidth={3} />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer Apply Button */}
        <div
          className="p-4 border-t transition-colors"
          style={{
            backgroundColor: colors.surface,
            borderColor: colors.borderLight,
          }}
        >
          <button
            onClick={handleApply}
            className="w-full py-3 rounded-full text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-98"
            style={{
              fontFamily: FontFamily.body,
              cursor: 'pointer',
              border: 'none',
              backgroundColor: colors.secondaryBright,
            }}
          >
            <span>Apply Municipal Sector</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
