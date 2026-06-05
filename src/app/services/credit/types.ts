// Credit Module — Type Definitions

export interface Loan {
  id: string;
  name: string;
  type: 'consumer' | 'mortgage' | 'auto' | 'business';
  amount: number;
  rate: number;
  monthlyPayment: number;
  currency: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'paid' | 'overdue';
  remaining: number;
  totalPaid: number;
  paymentsLeft: number;
  nextPaymentDate: string;
}

export interface LoanApplicationRequest {
  loanType: string;
  firstName: string;
  lastName: string;
  fin: string;
  phone: string;
  email: string;
  income: number;
  employment: string;
  amount: number;
  term: number;
  purpose: string;
}

export interface LoanCalculation {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  schedule: AmortizationRow[];
}

export interface AmortizationRow {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}
