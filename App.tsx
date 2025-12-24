
import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Passbook from './components/Passbook';
import Profile from './components/Profile';
import Claims from './components/Claims';
import AIAssistant from './components/AIAssistant';
import { epfoApi } from './services/api';
import { UserProfile, Contribution, Claim } from './types';

type Page = 'dashboard' | 'passbook' | 'profile' | 'claims';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // Account data state
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [claims, setClaims] = useState<Claim[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      loadAllData();
    }
  }, [isLoggedIn]);

  const loadAllData = async () => {
    setIsLoading(true);
    try {
      const [p, c, cl] = await Promise.all([
        epfoApi.getProfile(),
        epfoApi.getPassbook(),
        epfoApi.getClaims()
      ]);
      setProfile(p);
      setContributions(c);
      setClaims(cl);
    } catch (err) {
      console.error("Failed to load EPFO data", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSync = async () => {
    setIsLoading(true);
    await epfoApi.syncData();
    await loadAllData();
  };

  if (!isLoggedIn) {
    return <Login onLoginSuccess={() => setIsLoggedIn(true)} />;
  }

  const renderContent = () => {
    if (isLoading && !profile) {
      return (
        <div className="flex flex-col items-center justify-center h-64 text-slate-500">
          <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full mb-4"></div>
          <p className="font-medium">Connecting to EPFO Secure Servers...</p>
        </div>
      );
    }

    switch (currentPage) {
      case 'dashboard': return <Dashboard profile={profile} contributions={contributions} onSync={handleSync} isSyncing={isLoading} />;
      case 'passbook': return <Passbook contributions={contributions} profile={profile} />;
      case 'profile': return <Profile profile={profile} />;
      case 'claims': return <Claims claims={claims} />;
      default: return <Dashboard profile={profile} contributions={contributions} onSync={handleSync} isSyncing={isLoading} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      <Sidebar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header onLogout={() => setIsLoggedIn(false)} onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>

      <AIAssistant />
    </div>
  );
};

export default App;
