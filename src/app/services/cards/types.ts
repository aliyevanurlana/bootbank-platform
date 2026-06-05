// Cards Module — Type Definitions
// Bu faylı dəyişdirməyin — öz komponentlərinizdə istifadə edin

export interface Card {
  id: string;
  name: string;
  last4: string;
  type: 'physical' | 'virtual';
  status: 'active' | 'blocked' | 'expired';
  limit: number;
  used: number;
  expiry: string;
  currency: 'AZN' | 'USD' | 'EUR';
  onlinePayment: boolean;
  contactless: boolean;
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
  type: 'credit' | 'debit';
  status: 'completed' | 'pending' | 'failed';
  cardId: string;
  merchant: string;
  reference: string;
}

export interface CreateVirtualCardRequest {
  name: string;
  currency: string;
  limit: number;
}

export interface TransactionFilter {
  dateFrom?: string;
  dateTo?: string;
  category?: string;
  status?: string;
  search?: string;
}
