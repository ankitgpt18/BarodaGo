import React, { useState } from 'react';
import { CivicDataProvider, useCivicData } from './context/CivicDataContext';
import { ThemeProvider } from './context/ThemeContext';
import { PhoneShell } from './components/layout/PhoneShell';
import { TopBar } from './components/layout/TopBar';
import { BottomNav, TabId } from './components/layout/BottomNav';
import { HomeScreen } from './components/screens/HomeScreen';
import { MapScreen } from './components/screens/MapScreen';
import { ScanReportScreen } from './components/screens/ScanReportScreen';
import { ImpactScreen } from './components/screens/ImpactScreen';
import { ProfileScreen } from './components/screens/ProfileScreen';
import { MyReportsScreen } from './components/screens/MyReportsScreen';
import { TicketTrackingScreen } from './components/screens/TicketTrackingScreen';
import { NotificationsScreen } from './components/screens/NotificationsScreen';
import { AreaSwitcherModal } from './components/modals/AreaSwitcherModal';
import { IssueDetailModal } from './components/modals/IssueDetailModal';
import { Issue } from './types';
import { sound } from './utils/sound';
import AppColors from './constants/colors';

const MainAppContent: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<TabId | 'track' | 'notifications' | 'my-reports'>('home');
  const [trackingTargetCode, setTrackingTargetCode] = useState<string>('BG-24817');
  const [isWardPickerOpen, setIsWardPickerOpen] = useState(false);
  const [selectedIssueForModal, setSelectedIssueForModal] = useState<Issue | null>(null);

  const [currentWardName, setCurrentWardName] = useState('Alkapuri, Ward 9');
  const [currentWardSubtext, setCurrentWardSubtext] = useState('Ward 9 · Central Vadodara');

  const { setSelectedWard } = useCivicData();

  const handleTabChange = (tab: TabId) => {
    sound.playClick();
    setCurrentTab(tab);
  };

  const handleNavigateToTrack = (code: string) => {
    sound.playClick();
    setTrackingTargetCode(code);
    setCurrentTab('track');
  };

  const handleSelectIssue = (issue: Issue) => {
    sound.playClick();
    setSelectedIssueForModal(issue);
  };

  const handleWardSelect = (ward: string, precinct: string) => {
    setCurrentWardName(ward);
    setCurrentWardSubtext(precinct);
    const wardClean = ward.split(',')[0].trim();
    setSelectedWard(wardClean);
  };

  const showTopBar = currentTab !== 'track' && currentTab !== 'notifications';
  const showBottomNav = currentTab !== 'track';

  return (
    <PhoneShell>
      {/* 1. Sayaji Civic Top Bar (Mockup #9) */}
      {showTopBar && (
        <TopBar
          currentWard={currentWardName}
          wardSubtext={currentWardSubtext}
          coins={420}
          unreadNotifications={3}
          onOpenWardPicker={() => setIsWardPickerOpen(true)}
          onOpenNotifications={() => {
            sound.playClick();
            setCurrentTab('notifications');
          }}
          onOpenProfile={() => {
            sound.playClick();
            setCurrentTab('profile');
          }}
          onOpenCoinsStore={() => {
            sound.playClick();
            setCurrentTab('impact');
          }}
        />
      )}

      {/* 2. Main Phone Screen Canvas */}
      <main className="flex-1 w-full overflow-y-auto scrollbar-none relative">
        {/* Tab: Home (Mockup #9 Hero Civic Screen) */}
        {currentTab === 'home' && (
          <HomeScreen
            onSelectIssue={handleSelectIssue}
            onNavigateTab={(tab) => {
              if (tab === 'impact') setCurrentTab('impact');
              if (tab === 'track') handleNavigateToTrack('BG-24817');
            }}
            onOpenReport={() => setCurrentTab('scan')}
          />
        )}

        {/* Tab: Map (Interactive Vadodara 19 Wards GIS Radar) */}
        {currentTab === 'map' && (
          <MapScreen
            onSelectIssue={handleSelectIssue}
            onOpenReport={() => setCurrentTab('scan')}
          />
        )}

        {/* Tab: Scan (Issue reporting flow mockups #20-#26 & #23) */}
        {currentTab === 'scan' && (
          <ScanReportScreen
            onNavigateToTrack={handleNavigateToTrack}
            onClose={() => setCurrentTab('home')}
          />
        )}

        {/* Tab: Impact (Sayaji Karma & Rewards Store) */}
        {currentTab === 'impact' && (
          <ImpactScreen onOpenReport={() => setCurrentTab('scan')} />
        )}

        {/* Tab: Profile (User details & Helpline) */}
        {currentTab === 'profile' && (
          <ProfileScreen
            onOpenMyReports={() => setCurrentTab('my-reports')}
            onOpenNotifications={() => setCurrentTab('notifications')}
            onOpenCoinsStore={() => setCurrentTab('impact')}
          />
        )}

        {/* Sub-Screen: My Reports (Mockup #27) */}
        {currentTab === 'my-reports' && (
          <MyReportsScreen
            onSelectTicket={handleNavigateToTrack}
            onOpenReport={() => setCurrentTab('scan')}
          />
        )}

        {/* Sub-Screen: Ticket Tracking (Mockup #28) */}
        {currentTab === 'track' && (
          <TicketTrackingScreen
            trackingCode={trackingTargetCode}
            onBack={() => setCurrentTab('home')}
          />
        )}

        {/* Sub-Screen: Notifications Inbox (Mockup #11) */}
        {currentTab === 'notifications' && (
          <NotificationsScreen
            onBack={() => setCurrentTab('home')}
            onSelectTicket={handleNavigateToTrack}
          />
        )}
      </main>

      {/* 3. Bottom 5-Tab Navigation (Blinkit pattern + Mockup #9) */}
      {showBottomNav && (
        <BottomNav
          activeTab={
            currentTab === 'home' || currentTab === 'map' || currentTab === 'scan' || currentTab === 'impact' || currentTab === 'profile'
              ? currentTab
              : 'home'
          }
          onTabChange={handleTabChange}
        />
      )}

      {/* 4. Area / Ward Switcher Modal (All 19 VMC Wards) */}
      <AreaSwitcherModal
        isOpen={isWardPickerOpen}
        onClose={() => setIsWardPickerOpen(false)}
        currentWard={currentWardName}
        onSelectWard={handleWardSelect}
      />

      {/* 5. Public Issue Detail Modal (Mockup #12 & #13) */}
      <IssueDetailModal
        issue={selectedIssueForModal}
        onClose={() => setSelectedIssueForModal(null)}
        onTrack={(code) => {
          setSelectedIssueForModal(null);
          handleNavigateToTrack(code);
        }}
      />
    </PhoneShell>
  );
};

export function App() {
  return (
    <ThemeProvider>
      <CivicDataProvider>
        <MainAppContent />
      </CivicDataProvider>
    </ThemeProvider>
  );
}

export default App;
