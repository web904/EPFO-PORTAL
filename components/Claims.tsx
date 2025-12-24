
import React from 'react';
import { Claim } from '../types';

interface ClaimsProps {
  claims: Claim[];
}

const Claims: React.FC<ClaimsProps> = ({ claims }) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Online Claims & Status</h1>
          <p className="text-gray-500 text-sm">Real-time status of your withdrawal and transfer requests</p>
        </div>
        <button className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition text-sm">
          File New Claim
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-2">In Process</p>
          <p className="text-4xl font-black text-slate-800">0</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-2">Settled Claims</p>
          <p className="text-4xl font-black text-green-600">{claims.filter(c => c.status === 'Settled').length}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-2">Total Received</p>
          <p className="text-4xl font-black text-blue-600">₹{claims.reduce((a,c) => c.status === 'Settled' ? a + c.amount : a, 0).toLocaleString('en-IN')}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50">
          <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wide">Historical Claim Log</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white text-slate-400 text-[10px] font-black uppercase tracking-widest border-b border-slate-100">
                <th className="px-6 py-5">Request Reference</th>
                <th className="px-6 py-5">Service Type</th>
                <th className="px-6 py-5">Submission</th>
                <th className="px-6 py-5 text-right">Value</th>
                <th className="px-6 py-5">Final Outcome</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {claims.map((claim) => (
                <tr key={claim.id} className="hover:bg-slate-50/50 transition">
                  <td className="px-6 py-5">
                    <span className="font-mono text-blue-600 font-bold text-xs">{claim.id}</span>
                  </td>
                  <td className="px-6 py-5">
                    <p className="font-bold text-slate-800 text-sm">{claim.type}</p>
                    <p className="text-[10px] text-slate-400 font-medium">EPFO Section 10B</p>
                  </td>
                  <td className="px-6 py-5">
                    <p className="text-sm font-bold text-slate-700">{claim.date}</p>
                  </td>
                  <td className="px-6 py-5 text-right font-black text-slate-800 text-sm">
                    ₹{claim.amount.toLocaleString('en-IN')}
                  </td>
                  <td className="px-6 py-5">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                      claim.status === 'Settled' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${claim.status === 'Settled' ? 'bg-green-600' : 'bg-red-600'}`}></span>
                      {claim.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Claims;
