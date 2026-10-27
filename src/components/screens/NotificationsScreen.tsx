import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Wrench, 
  Navigation, 
  Coins, 
  HeartHandshake, 
  CheckCircle2, 
  Award,
} from 'lucide-react';
import { FontFamily } from '../../constants/typography';
import { useTheme } from '../../context/ThemeContext';

interface NotificationItem {
  id: string;
  type: 'tickets' | 'rewards' | 'funding';
  unread: boolean;
  iconBg: string;
  iconColor: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  timeAgo: string;
  body: string;
  tag1?: string;
  tag2?: string;
  progressBar?: number;
  group: 'Today' | 'Yesterday' | 'Earlier';
}

interface NotificationsScreenProps {
  onBack?: () => void;
  onSelectTicket?: (ticketId: string) => void;
}

export const NotificationsScreen: React.FC<NotificationsScreenProps> = ({
  onBack,
  onSelectTicket,
}) => {
  const { theme, colors } = useTheme();
  const [filter, setFilter] = useState<'all' | 'tickets' | 'rewards' | 'funding'>('all');
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif-1',
      type: 'tickets',
      unread: true,
      iconBg: theme === 'dark' ? '#3B2312' : '#FED7AA',
      iconColor: theme === 'dark' ? '#FB923C' : '#C2410C',
      icon: Wrench,
      title: 'Ticket moved to In progress',
      timeAgo: '12m ago',
      body: 'Large pothole at RC Dutt Road circle assigned to VMC Road Crew #3',
      tag1: '#VMC-7892',
      tag2: 'Priority 1 · Asphalt',
      group: 'Today',
    },
    {
      id: 'notif-2',
      type: 'tickets',
      unread: true,
      iconBg: theme === 'dark' ? '#143021' : '#D1FAE5',
      iconColor: theme === 'dark' ? '#6EE7B7' : '#047857',
      icon: Navigation,
      title: 'Ramesh is 4 minutes away',
      timeAgo: '45m ago',
      body: 'Junior Field Engineer is inspecting Streetlight #L-409 near Gotri School',
      tag1: 'VMC Inspector 08',
      tag2: 'Live route tracking',
      group: 'Today',
    },
    {
      id: 'notif-3',
      type: 'rewards',
      unread: true,
      iconBg: theme === 'dark' ? '#38280D' : '#FDE68A',
      iconColor: theme === 'dark' ? '#FBBF24' : '#B45309',
      icon: Coins,
      title: '+20 coins earned',
      timeAgo: '2h ago',
      body: "Your report 'Broken streetlight near Inox Cinema' was verified by Ward Councillor",
      tag1: '+20 Gaekwad Karma',
      group: 'Today',
    },
    {
      id: 'notif-4',
      type: 'funding',
      unread: false,
      iconBg: theme === 'dark' ? '#0F302A' : '#CCFBF1',
      iconColor: theme === 'dark' ? '#2DD4BF' : '#0F766E',
      icon: HeartHandshake,
      title: 'Funding campaign at 80%',
      timeAgo: 'Yesterday, 4:15 PM',
      body: 'Footpath repair outside Gotri school reached ₹24,000 of ₹30,000 goal with 48 contributors',
      progressBar: 80,
      group: 'Yesterday',
    },
    {
      id: 'notif-5',
      type: 'tickets',
      unread: false,
      iconBg: theme === 'dark' ? '#143021' : '#D1FAE5',
      iconColor: theme === 'dark' ? '#6EE7B7' : '#065F46',
      icon: CheckCircle2,
      title: 'Issue resolved: Drainage',
      timeAgo: 'Yesterday, 11:30 AM',
      body: 'Sanitation team completed desilting at Race Course road',
      tag1: 'Closed · Verified',
      group: 'Yesterday',
    },
    {
      id: 'notif-6',
      type: 'rewards',
      unread: false,
      iconBg: theme === 'dark' ? '#38280D' : '#FED7AA',
      iconColor: theme === 'dark' ? '#FBBF24' : '#B45309',
      icon: Award,
      title: 'Badge unlocked: Pothole Fighter',
      timeAgo: '3 days ago',
      body: 'You reported 5 verified road hazards across Ward 9',
      tag1: 'Level 2 Civic Champion',
      group: 'Earlier',
    },
  ]);

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const filtered = notifications.filter((n) => {
    if (filter === 'all') return true;
    return n.type === filter;
  });

  const unreadCount = notifications.filter((n) => n.unread).length;
  const groups: Array<'Today' | 'Yesterday' | 'Earlier'> = ['Today', 'Yesterday', 'Earlier'];

  return (
    <div
      className="min-h-full pb-24 transition-colors duration-200"
      style={{ backgroundColor: colors.surface }}
    >
      {/* Top Bar */}
      <header
        className="sticky top-0 z-30 px-4 py-3 border-b flex items-center justify-between transition-colors"
        style={{
          backgroundColor: colors.surface,
          borderColor: colors.borderLight,
        }}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full flex items-center justify-center active:scale-95 transition-all"
            style={{
              cursor: 'pointer',
              border: `1px solid ${colors.borderLight}`,
              backgroundColor: colors.sand,
              color: colors.textPrimary,
            }}
          >
            <ArrowLeft size={18} />
          </button>
          <h1
            className="text-lg font-bold transition-colors"
            style={{ fontFamily: FontFamily.display, color: colors.textPrimary }}
          >
            Notifications
          </h1>
        </div>

        <div
          className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-white shadow-xs"
          style={{ backgroundColor: colors.primary, fontSize: '13px' }}
        >
          AG
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-4 space-y-5">
        {/* Inbox header + Mark all as read */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2
              className="text-2xl font-bold transition-colors"
              style={{ fontFamily: FontFamily.display, color: colors.textPrimary }}
            >
              Inbox
            </h2>
            {unreadCount > 0 && (
              <span
                className="px-2 py-0.5 rounded-full text-xs font-bold text-white"
                style={{ fontFamily: FontFamily.mono, backgroundColor: colors.secondaryBright }}
              >
                {unreadCount} new
              </span>
            )}
          </div>
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllAsRead}
              className="text-xs font-bold hover:underline"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: FontFamily.body,
                color: colors.secondaryBright,
              }}
            >
              Mark all as read
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {[
            { id: 'all', label: 'All' },
            { id: 'tickets', label: 'Tickets' },
            { id: 'rewards', label: 'Rewards' },
            { id: 'funding', label: 'Funding' },
          ].map((pill) => {
            const isActive = filter === pill.id;
            return (
              <button
                key={pill.id}
                onClick={() => setFilter(pill.id as any)}
                className="px-4 py-1.5 rounded-full text-xs font-bold transition-all active:scale-95"
                style={{
                  fontFamily: FontFamily.body,
                  cursor: 'pointer',
                  border: 'none',
                  backgroundColor: isActive ? colors.primary : colors.sand,
                  color: isActive ? '#FFFFFF' : colors.textPrimary,
                }}
              >
                {pill.label}
              </button>
            );
          })}
        </div>

        {/* Grouped Notifications */}
        <div className="space-y-6">
          {groups.map((grp) => {
            const items = filtered.filter((n) => n.group === grp);
            if (items.length === 0) return null;

            return (
              <div key={grp} className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3
                    className="text-sm font-extrabold tracking-tight transition-colors"
                    style={{ fontFamily: FontFamily.display, color: colors.textPrimary }}
                  >
                    {grp}
                  </h3>
                  <span
                    className="text-xs font-medium"
                    style={{ fontFamily: FontFamily.mono, color: colors.textSecondary }}
                  >
                    {grp === 'Today' ? 'Vadodara Ward 9' : grp === 'Yesterday' ? 'Archives' : 'Records'}
                  </span>
                </div>

                <div className="space-y-2.5">
                  {items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.id}
                        onClick={() => {
                          if (item.tag1?.includes('VMC') || item.type === 'tickets') {
                            onSelectTicket?.('BG-24817');
                          }
                        }}
                        className="p-4 rounded-2xl shadow-2xs flex items-start gap-3 relative transition-all hover:shadow-xs cursor-pointer"
                        style={{
                          backgroundColor: colors.surfaceCard,
                          border: `1px solid ${item.unread ? (theme === 'dark' ? '#785A17' : '#FCD34D') : colors.borderLight}`,
                        }}
                      >
                        {/* Unread Red Dot */}
                        {item.unread && (
                          <span
                            className="absolute top-4 left-2 w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: colors.secondaryBright }}
                          />
                        )}

                        {/* Icon Block */}
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-2xs"
                          style={{ backgroundColor: item.iconBg, color: item.iconColor }}
                        >
                          <Icon size={20} />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline justify-between gap-2">
                            <h4
                              className="text-sm font-bold truncate transition-colors"
                              style={{ fontFamily: FontFamily.display, color: colors.textPrimary }}
                            >
                              {item.title}
                            </h4>
                            <span
                              className="text-[11px] font-medium shrink-0"
                              style={{ fontFamily: FontFamily.mono, color: colors.textSecondary }}
                            >
                              {item.timeAgo}
                            </span>
                          </div>

                          <p
                            className="text-xs mt-0.5 line-clamp-2 transition-colors"
                            style={{ fontFamily: FontFamily.body, color: colors.textSecondary }}
                          >
                            {item.body}
                          </p>

                          {/* Progress Bar for funding */}
                          {item.progressBar && (
                            <div
                              className="w-full h-1.5 rounded-full overflow-hidden mt-2"
                              style={{ backgroundColor: colors.sand }}
                            >
                              <div
                                className="h-full rounded-full"
                                style={{
                                  width: `${item.progressBar}%`,
                                  backgroundColor: colors.primary,
                                }}
                              />
                            </div>
                          )}

                          {/* Tag chips */}
                          {(item.tag1 || item.tag2) && (
                            <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                              {item.tag1 && (
                                <span
                                  className="px-2 py-0.5 rounded text-[10px] font-bold"
                                  style={{
                                    fontFamily: FontFamily.mono,
                                    backgroundColor: colors.sand,
                                    color: colors.textPrimary,
                                    border: `1px solid ${colors.borderLight}`,
                                  }}
                                >
                                  {item.tag1}
                                </span>
                              )}
                              {item.tag2 && (
                                <span
                                  className="px-2 py-0.5 rounded text-[10px] font-bold"
                                  style={{
                                    fontFamily: FontFamily.body,
                                    backgroundColor: colors.sand,
                                    color: colors.textSecondary,
                                    border: `1px solid ${colors.borderLight}`,
                                  }}
                                >
                                  {item.tag2}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
