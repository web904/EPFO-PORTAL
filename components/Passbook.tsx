
import React from 'react';
import { Contribution, UserProfile } from '../types';

interface PassbookProps {
  contributions: Contribution[];
  profile: UserProfile | null;
}

const Passbook: React.FC<PassbookProps> = ({ contributions, profile }) => {
  const currentTotal = contributions.reduce((acc, c) => acc + c.total, 0);

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Member Passbook</h1>
          <p className="text-gray-500 text-sm">Official Transaction Log for UAN {profile?.uan}</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-800 transition flex items-center gap-2 shadow-lg">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            Download Passbook
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-slate-100">
        <div className="p-6 bg-slate-50/50 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
               <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
             </div>
             <div>
               <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Member ID</p>
               <p className="font-bold text-slate-800">GNGGN00450920000010182</p>
             </div>
          </div>
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-200">
            <label className="text-xs font-bold text-slate-500 uppercase">FY:</label>
            <select className="bg-transparent text-sm font-bold text-slate-800 outline-none cursor-pointer">
              <option>2024-2025</option>
              <option>2023-2024</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-slate-400 text-[10px] font-bold uppercase tracking-widest border-b border-slate-100">
                <th className="px-6 py-4">Transaction Period</th>
                <th className="px-6 py-4 text-right">EE Share</th>
                <th className="px-6 py-4 text-right">ER Share</th>
                <th className="px-6 py-4 text-right">EPS (Pension)</th>
                <th className="px-6 py-4 text-right">Monthly Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {contributions.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition">
                  <td className="px-6 py-4">
                    <p className="font-bold text-slate-800 text-sm">{row.month}</p>
                    <p className="text-[10px] text-slate-400 uppercase font-medium">Monthly Regular</p>
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium text-slate-600">₹{row.employeeShare.toLocaleString('en-IN')}</td>
                  <td className="px-6 py-4 text-right text-sm font-medium text-slate-600">₹{row.employerShare.toLocaleString('en-IN')}</td>
                  <td className="px-6 py-4 text-right text-sm font-bold text-blue-600">₹{row.pensionFund.toLocaleString('en-IN')}</td>
                  <td className="px-6 py-4 text-right">
                    <span className="font-bold text-slate-800 bg-slate-100 px-2 py-1 rounded text-sm">
                      ₹{row.total.toLocaleString('en-IN')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-8 bg-slate-900 text-white flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex gap-8">
            <div>
              <p className="text-[10px] opacity-60 uppercase font-bold tracking-widest mb-1">Employee Share</p>
              <p className="text-xl font-bold">₹{contributions.reduce((a,b)=>a+b.employeeShare, 0).toLocaleString('en-IN')}</p>
            </div>
            <div>
              <p className="text-[10px] opacity-60 uppercase font-bold tracking-widest mb-1">Employer Share</p>
              <p className="text-xl font-bold">₹{contributions.reduce((a,b)=>a+b.employerShare, 0).toLocaleString('en-IN')}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] opacity-60 uppercase font-bold tracking-widest mb-1">Total FY Balance</p>
            <h4 className="text-4xl font-black text-blue-400 tracking-tight">₹{currentTotal.toLocaleString('en-IN')}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Passbook;
