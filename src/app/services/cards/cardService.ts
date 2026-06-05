// Cards Service — TODO: CardMasters qrupu bu faylı yazacaq
// Aşağıdakı nümunəni istifadə edin

import type { Card, Transaction, CreateVirtualCardRequest, TransactionFilter } from './types';
// import api from '../api';  // Real API üçün uncomment edin

// TODO: Mock data əlavə edin
const mockCards: Card[] = [];
const mockTransactions: Transaction[] = [];

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
