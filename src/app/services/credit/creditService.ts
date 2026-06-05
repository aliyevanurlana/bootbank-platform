// Credit Service — TODO: LoanArchitects qrupu bu faylı yazacaq

import type { Loan, LoanApplicationRequest, LoanCalculation } from './types';
// import api from '../api';

const mockLoans: Loan[] = [];

export const creditService = {
  getLoans: async (): Promise<Loan[]> => {
    return mockLoans;
  },

  applyForLoan: async (request: LoanApplicationRequest): Promise<{ applicationId: string }> => {
    // TODO: Implement
    throw new Error('Not implemented');
  },

  calculateLoan: async (amount: number, term: number, rate: number): Promise<LoanCalculation> => {
    // TODO: Implement
    throw new Error('Not implemented');
  },

  makePayment: async (loanId: string, amount: number): Promise<Loan> => {
    // TODO: Implement
    throw new Error('Not implemented');
  },
};
