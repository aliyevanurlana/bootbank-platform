// Cards Service — TODO: CardMasters qrupu bu faylı yazacaq
// Aşağıdakı nümunəni istifadə edin

import type { Card, Transaction, CreateVirtualCardRequest, TransactionFilter } from './types';
// import api from '../api';  // Real API üçün uncomment edin

// TODO: Mock data əlavə edin
const mockCards: Card[] = [
  {
    id: '1',
    name: 'Maaş Kartı',
    last4: '4587',
    type: 'physical',
    status: 'active',
    limit: 5000,
    used: 1580,
    expiry: '12/28',
    currency: 'AZN',
    onlinePayment: true,
    contactless: true,
  },
  {
    id: '2',
    name: 'Miles Kartı',
    last4: '9012',
    type: 'virtual',
    status: 'active',
    limit: 3000,
    used: 920,
    expiry: '08/27',
    currency: 'USD',
    onlinePayment: true,
    contactless: false,
  },
  {
    id: '3',
    name: 'Cashback Kartı',
    last4: '7744',
    type: 'physical',
    status: 'blocked',
    limit: 2500,
    used: 750,
    expiry: '04/27',
    currency: 'AZN',
    onlinePayment: true,
    contactless: true,
  },
];
const mockTransactions: Transaction[] = [
  {
    id: '1',
    date: '2026-06-18',
    description: 'Market alış-verişi',
    category: 'Alış-veriş',
    amount: 125.5,
    type: 'debit',
    status: 'completed',
    cardId: '1',
    merchant: 'Bravo',
    reference: 'TXN001',
  },
  {
    id: '2',
    date: '2026-06-17',
    description: 'Maaş köçürməsi',
    category: 'Gəlir',
    amount: 3500,
    type: 'credit',
    status: 'completed',
    cardId: '1',
    merchant: 'ABB ASC',
    reference: 'TXN002',
  },
  {
    id: '3',
    date: '2026-06-17',
    description: 'Restoran ödənişi',
    category: 'Qida',
    amount: 48.9,
    type: 'debit',
    status: 'completed',
    cardId: '2',
    merchant: 'McDonalds',
    reference: 'TXN003',
  },
  {
    id: '4',
    date: '2026-06-16',
    description: 'Netflix abunəliyi',
    category: 'Əyləncə',
    amount: 15.99,
    type: 'debit',
    status: 'completed',
    cardId: '2',
    merchant: 'Netflix',
    reference: 'TXN004',
  },
  {
    id: '5',
    date: '2026-06-15',
    description: 'Yanacaq ödənişi',
    category: 'Nəqliyyat',
    amount: 70,
    type: 'debit',
    status: 'completed',
    cardId: '1',
    merchant: 'SOCAR',
    reference: 'TXN005',
  },
  {
    id: '6',
    date: '2026-06-15',
    description: 'Onlayn alış-veriş',
    category: 'Alış-veriş',
    amount: 220,
    type: 'debit',
    status: 'pending',
    cardId: '3',
    merchant: 'Amazon',
    reference: 'TXN006',
  },
  {
    id: '7',
    date: '2026-06-14',
    description: 'Elektrik enerjisi ödənişi',
    category: 'Kommunal',
    amount: 95,
    type: 'debit',
    status: 'completed',
    cardId: '1',
    merchant: 'Azərişıq',
    reference: 'TXN007',
  },
];

export const cardService = {
  // Bütün kartları al
  getCards: async (): Promise<Card[]> => {
    // TODO: Mock data əlavə edin
    return mockCards;

    // Real API (sonra açacaqsınız):
    // const { data } = await api.get('/cards');
    // return data;
  },

  // Kart detalları
  getCardById: async (id: string): Promise<Card | undefined> => {
    return mockCards.find((c) => c.id === id);
  },

  // Yeni virtual kart yarat
  createCard: async (request: CreateVirtualCardRequest): Promise<Card> => {
    // TODO: Implement
    throw new Error('Not implemented');
  },

  // Kartı blokla
  blockCard: async (id: string): Promise<Card> => {
    // TODO: Implement
    throw new Error('Not implemented');
  },

  // Əməliyyatları al
  getTransactions: async (filter?: TransactionFilter): Promise<Transaction[]> => {
    // TODO: Implement with filtering
    return mockTransactions;
  },
};
