// Deposits Module — Type Definitions

export interface Deposit {
  id: string;
  name: string;
  amount: number;
  rate: number;
  currency: 'AZN' | 'USD' | 'EUR';
  startDate: string;
  endDate: string;
  status: 'active' | 'matured' | 'closed';
  type: 'term' | 'demand' | 'savings' | 'certificate';
  earned: number;
  paymentMethod: 'monthly' | 'quarterly' | 'endOfTerm' | 'capitalize';
}

export interface OpenDepositRequest {
  type: string;
  amount: number;
  currency: string;
  term: number;
  paymentMethod: string;
}

export interface DepositStats {
  totalDeposits: number;
  activeCount: number;
  averageRate: number;
  totalEarned: number;
}
