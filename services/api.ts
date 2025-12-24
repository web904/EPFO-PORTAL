
import { Contribution, UserProfile, Claim } from '../types';

// Mock data reflecting a realistic EPFO account
const MOCK_PROFILE: UserProfile = {
  uan: '100987654321',
  name: 'RAJESH KUMAR',
  dob: '15/05/1992',
  gender: 'MALE',
  fatherName: 'SURESH PRASAD',
  mobile: '+91 98765 43210',
  email: 'rajesh.k@example.com',
  kycStatus: 'Verified'
};

const MOCK_CONTRIBUTIONS: Contribution[] = [
  { month: 'April 2024', employeeShare: 7250, employerShare: 2250, pensionFund: 5000, total: 14500 },
  { month: 'March 2024', employeeShare: 7250, employerShare: 2250, pensionFund: 5000, total: 14500 },
  { month: 'February 2024', employeeShare: 6600, employerShare: 2000, pensionFund: 4600, total: 13200 },
  { month: 'January 2024', employeeShare: 6600, employerShare: 2000, pensionFund: 4600, total: 13200 },
  { month: 'December 2023', employeeShare: 6600, employerShare: 2000, pensionFund: 4600, total: 13200 },
  { month: 'November 2023', employeeShare: 6250, employerShare: 1900, pensionFund: 4350, total: 12500 },
  { month: 'October 2023', employeeShare: 6250, employerShare: 1900, pensionFund: 4350, total: 12500 },
];

const MOCK_CLAIMS: Claim[] = [
  { id: 'CLM7729103', type: 'Form 31 (Advance)', date: '12 May 2024', amount: 45000, status: 'Settled' },
  { id: 'CLM6502918', type: 'Form 10C (Withdrawal)', date: '15 Jan 2024', amount: 22000, status: 'Settled' },
  { id: 'CLM5510293', type: 'Form 19', date: '10 Nov 2023', amount: 110000, status: 'Rejected' },
];

export const epfoApi = {
  getProfile: async (): Promise<UserProfile> => {
    return new Promise((resolve) => setTimeout(() => resolve(MOCK_PROFILE), 800));
  },
  getPassbook: async (): Promise<Contribution[]> => {
    return new Promise((resolve) => setTimeout(() => resolve(MOCK_CONTRIBUTIONS), 1200));
  },
  getClaims: async (): Promise<Claim[]> => {
    return new Promise((resolve) => setTimeout(() => resolve(MOCK_CLAIMS), 1000));
  },
  syncData: async (): Promise<boolean> => {
    return new Promise((resolve) => setTimeout(() => resolve(true), 2000));
  }
};
