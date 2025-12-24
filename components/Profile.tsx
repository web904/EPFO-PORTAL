
import React from 'react';
import { UserProfile } from '../types';

interface ProfileProps {
  profile: UserProfile | null;
}

const Profile: React.FC<ProfileProps> = ({ profile }) => {
  if (!profile) return null;

  return (
    <div className="space-y-6 animate-fadeIn">
      <h1 className="text-2xl font-bold text-gray-800">Member Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 relative">
            <div className="absolute top-0 right-0 m-6">
              <span className="bg-green-100 text-green-700 text-[10px] font-black px-2.5 py-1 rounded-full border border-green-200 uppercase">
                Profile Verified
              </span>
            </div>
            <h3 className="font-bold text-gray-800 mb-8 flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              </div>
              Basic Details
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-12">
              {[
                { label: 'Full Name', value: profile.name },
                { label: 'UAN Number', value: profile.uan },
                { label: 'Date of Birth', value: profile.dob },
                { label: 'Gender', value: profile.gender },
                { label: 'Father\'s Name', value: profile.fatherName },
                { label: 'Mobile Number', value: profile.mobile },
                { label: 'Email ID', value: profile.email },
                { label: 'KYC Status', value: profile.kycStatus },
              ].map((item, idx) => (
                <div key={idx} className="group">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 group-hover:text-blue-500 transition-colors">{item.label}</p>
                  <p className="text-slate-800 font-bold">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 flex gap-4">
              <button className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition shadow-md shadow-blue-200">
                Edit Profile
              </button>
              <button className="px-6 py-2.5 bg-slate-50 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-100 transition border border-slate-200">
                Change Password
              </button>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </div>
              KYC Document History
            </h3>
            
            <div className="space-y-3">
              {[
                { type: 'Aadhar Card', number: 'XXXX-XXXX-8821', status: 'Verified', date: 'Oct 2022' },
                { type: 'PAN Card', number: 'ABCDE1234F', status: 'Verified', date: 'Jan 2023' },
                { type: 'Bank Passbook', number: 'XXXXX5678', status: 'Verified', date: 'Mar 2023' },
              ].map((kyc, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 border border-slate-100 rounded-xl bg-slate-50/50 hover:bg-white hover:border-blue-100 hover:shadow-sm transition cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-xl border border-slate-200 flex items-center justify-center font-black text-slate-300 group-hover:text-blue-200 transition">{kyc.type[0]}</div>
                    <div>
                      <p className="font-bold text-slate-800 text-sm">{kyc.type}</p>
                      <p className="text-xs text-slate-400 font-medium">Linked: {kyc.number}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-black text-green-600 uppercase mb-1 block">Approved</span>
                    <p className="text-[10px] text-slate-400 font-bold">{kyc.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="font-bold text-gray-800 mb-4">UAN Card</h3>
            <div className="aspect-[1.58/1] bg-slate-900 rounded-2xl p-5 text-white shadow-xl flex flex-col justify-between relative overflow-hidden group cursor-pointer">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform"></div>
               <div className="z-10">
                 <p className="text-[8px] opacity-40 uppercase tracking-[0.3em] font-black">Member ID Card</p>
                 <p className="text-xs font-bold mt-1 tracking-tight">EPFO India Official</p>
               </div>
               <div className="flex justify-between items-end z-10">
                 <div>
                   <p className="text-[10px] opacity-60 uppercase font-bold mb-1">UAN</p>
                   <p className="text-lg font-mono tracking-widest text-blue-400">{profile.uan}</p>
                   <p className="text-sm font-bold mt-2 uppercase tracking-wide">{profile.name}</p>
                 </div>
                 <div className="w-14 h-14 bg-white rounded-lg p-1.5 shadow-lg">
                   <div className="w-full h-full bg-slate-800 rounded-sm"></div>
                 </div>
               </div>
            </div>
            <button className="w-full mt-4 py-3 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition uppercase tracking-widest">
              Download Official Card
            </button>
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg shadow-blue-100">
            <h3 className="font-bold text-lg mb-2">E-Nomination</h3>
            <p className="text-xs text-white/80 leading-relaxed mb-6 font-medium">Ensure your family members get immediate social security benefits in case of unforeseen events. Add your nominees today.</p>
            <button className="w-full py-3 bg-white text-blue-700 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition">
              File Nomination
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
