// Deposits Service — TODO: DepositGuardians qrupu bu faylı yazacaq

import type { Deposit, OpenDepositRequest, DepositStats } from './types';
// import api from '../api';

const mockDeposits: Deposit[] = [];

export const depositService = {
  getDeposits: async (): Promise<Deposit[]> => {
    return mockDeposits;
  },

  getStats: async (): Promise<DepositStats> => {
    // TODO: Implement
    return { totalDeposits: 0, activeCount: 0, averageRate: 0, totalEarned: 0 };
  },

  openDeposit: async (request: OpenDepositRequest): Promise<Deposit> => {
    // TODO: Implement
    throw new Error('Not implemented');
  },

  terminateDeposit: async (id: string): Promise<Deposit> => {
    // TODO: Implement
    throw new Error('Not implemented');
  },
};
