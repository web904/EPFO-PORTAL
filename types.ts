
export interface Contribution {
  month: string;
  employeeShare: number;
  employerShare: number;
  pensionFund: number;
  total: number;
}

export interface UserProfile {
  uan: string;
  name: string;
  dob: string;
  gender: string;
  fatherName: string;
  mobile: string;
  email: string;
  kycStatus: 'Verified' | 'Pending' | 'Incomplete';
}

export interface Claim {
  id: string;
  type: string;
  date: string;
  amount: number;
  status: 'Settled' | 'Rejected' | 'Under Process';
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}
