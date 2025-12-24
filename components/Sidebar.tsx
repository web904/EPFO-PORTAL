
import React from 'react';

type Page = 'dashboard' | 'passbook' | 'profile' | 'claims';

interface SidebarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, setCurrentPage, isOpen }) => {
  // Fix: Use React.ReactNode instead of JSX.Element to avoid "Cannot find namespace 'JSX'" error
  const menuItems: { id: Page; label: string; icon: React.ReactNode }[] = [
    { 
      id: 'dashboard', 
      label: 'Home', 
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg> 
    },
    { 
      id: 'passbook', 
      label: 'View Passbook', 
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> 
    },
    { 
      id: 'claims', 
      label: 'Claim History', 
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg> 
    },
    { 
      id: 'profile', 
      label: 'Profile / KYC', 
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg> 
    },
  ];

  return (
    <div className={`bg-slate-900 text-white transition-all duration-300 ${isOpen ? 'w-64' : 'w-0 md:w-20'} flex flex-col overflow-hidden`}>
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center font-bold flex-shrink-0">P</div>
        {isOpen && <span className="font-bold text-xl tracking-tight">EPFO Connect</span>}
      </div>
      
      <nav className="flex-1 mt-6">
        <div className="px-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition ${currentPage === item.id ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}
            >
              <div className="flex-shrink-0">{item.icon}</div>
              {isOpen && <span className="font-medium">{item.label}</span>}
            </button>
          ))}
        </div>
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className={`bg-slate-800 rounded-xl p-3 flex items-center gap-3 ${!isOpen && 'justify-center'}`}>
          <div className="w-8 h-8 rounded-full bg-blue-400 flex-shrink-0"></div>
          {isOpen && (
            <div className="overflow-hidden">
              <p className="text-sm font-bold truncate">Rajesh Kumar</p>
              <p className="text-xs text-slate-500 truncate">Emp ID: 45092</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
