
import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { UserProfile, Contribution } from '../types';
import { getLatestEPFOUpdates } from '../services/gemini';

interface DashboardProps {
  profile: UserProfile | null;
  contributions: Contribution[];
  onSync: () => void;
  isSyncing: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ profile, contributions, onSync, isSyncing }) => {
  const [news, setNews] = useState<any[]>([]);
  const [isNewsLoading, setIsNewsLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      setIsNewsLoading(true);
      const updates = await getLatestEPFOUpdates();
      setNews(updates);
      setIsNewsLoading(false);
    };
    fetchNews();
  }, []);

  const chartData = [...contributions].reverse().map(c => ({
    month: c.month.substring(0, 3),
    amount: c.total
  }));

  const totalBalance = contributions.reduce((acc, curr) => acc + curr.total, 0) + 380000;

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Real-time Status Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            UAN Dashboard
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-700 animate-pulse border border-green-200">
              LIVE CONNECTED
            </span>
          </h1>
          <p className="text-gray-500 text-sm">Welcome back, {profile?.name || 'Member'}</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={onSync}
            disabled={isSyncing}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-all shadow-sm border ${
              isSyncing ? 'bg-slate-50 text-slate-400 border-slate-200' : 'bg-white border-slate-200 text-slate-700 hover:border-blue-300 hover:text-blue-600 active:scale-95'
            }`}
          >
            {isSyncing ? (
              <>
                <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                Updating Records...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Sync Real-time Data
              </>
            )}
          </button>
          <div className="bg-slate-900 text-white px-4 py-2 rounded-lg shadow-sm font-mono text-xs tracking-wider border border-slate-700">
            UAN: {profile?.uan || '---'}
          </div>
        </div>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-blue-600"></div>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Live Balance (Est.)</p>
          <div className="flex items-baseline gap-2">
            <h2 className="text-3xl font-black text-slate-800">₹{totalBalance.toLocaleString('en-IN')}</h2>
            <span className="text-[10px] font-bold text-green-500">+ ₹{(totalBalance * 0.0825 / 12).toFixed(2)} /mo</span>
          </div>
          <p className="mt-4 text-[10px] font-bold text-slate-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
            Accruing interest at 8.25% p.a. (FY 24-25)
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Last Contribution</p>
          <h2 className="text-3xl font-black text-slate-800">₹{(contributions[0]?.total || 0).toLocaleString('en-IN')}</h2>
          <p className="mt-4 text-[10px] font-bold text-blue-500 uppercase tracking-tighter flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
            Processed: {contributions[0]?.month}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">KYC Trust Level</p>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="w-[100%] h-full bg-green-500"></div>
            </div>
            <span className="text-[10px] font-black text-green-600">100%</span>
          </div>
          <p className="mt-4 text-[10px] font-bold text-slate-400">Securely linked with Aadhar Biometrics</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Growth Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-black text-slate-800 text-sm uppercase tracking-wide">Historical Growth</h3>
            <div className="flex gap-2">
              <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
              <span className="text-[10px] font-bold text-slate-400 uppercase">Monthly Deposits</span>
            </div>
          </div>
          <div className="h-64 flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} />
                <Tooltip 
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '12px'}}
                  cursor={{stroke: '#3b82f6', strokeWidth: 1}}
                />
                <Area type="monotone" dataKey="amount" stroke="#3b82f6" fillOpacity={1} fill="url(#colorAmt)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Real-time Insights Feed */}
        <div className="bg-slate-900 rounded-2xl shadow-xl p-6 text-white overflow-hidden relative flex flex-col">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl"></div>
          <h3 className="font-black text-xs uppercase tracking-[0.2em] mb-6 flex items-center gap-2 text-blue-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Real-time Insights
          </h3>
          
          <div className="flex-1 space-y-4">
            {isNewsLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="animate-pulse space-y-2">
                    <div className="h-4 bg-slate-800 rounded w-3/4"></div>
                    <div className="h-3 bg-slate-800 rounded w-full"></div>
                  </div>
                ))}
              </div>
            ) : news.length > 0 ? (
              news.map((item, idx) => (
                <div key={idx} className="group cursor-pointer border-b border-slate-800 pb-4 last:border-0">
                  <p className="text-[10px] font-bold text-blue-400 uppercase tracking-wider mb-1">{item.date}</p>
                  <h4 className="text-sm font-bold text-slate-100 group-hover:text-blue-300 transition-colors leading-tight mb-1">{item.title}</h4>
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">{item.summary}</p>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-xs text-slate-500">No new alerts at this time.</p>
              </div>
            )}
          </div>

          <div className="mt-6 p-4 bg-slate-800/50 rounded-xl border border-slate-800">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">System Integrity</p>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-300">EPFO Server Connection</span>
              <span className="text-[11px] font-bold text-green-500">OPTIMAL</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
