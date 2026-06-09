import { useState, useEffect } from 'react';
import { Card, Row, Col, Statistic, Typography, Tag, Space, Progress, Timeline, Spin, Button, theme } from 'antd';
import { FileTextOutlined, DollarOutlined, CheckCircleOutlined, ClockCircleOutlined, ExclamationCircleOutlined, CalendarOutlined } from '@ant-design/icons';
import { Line, Pie } from '@ant-design/charts';
import { useNavigate } from 'react-router';

import { creditService } from '../../services/credit/creditService';
import type { Loan } from '../../services/credit/types';

const { Title, Text } = Typography;

const typeLabels: Record<string, string> = {
  consumer: 'İstehlak Krediti',
  mortgage: 'İpoteka Krediti',
  auto: 'Avtomobil Krediti',
  business: 'Biznes Krediti',
};

const typeColors: Record<string, string> = {
  consumer: '#1890ff',
  mortgage: '#52c41a',
  auto: '#faad14',
  business: '#722ed1',
};

const typeIcons: Record<string, string> = {
  consumer: '💳',
  mortgage: '🏠',
  auto: '🚗',
  business: '💼',
};

const statusConfig: Record<string, { color: string; label: string }> = {
  active: { color: 'green', label: 'Aktiv' },
  overdue: { color: 'red', label: 'Gecikmiş' },
  paid: { color: 'blue', label: 'Ödənilib' },
};

const monthlyPayments = [
  { month: 'Yanvar', amount: 3660 },
  { month: 'Fevral', amount: 3660 },
  { month: 'Mart', amount: 3660 },
  { month: 'Aprel', amount: 3660 },
  { month: 'May', amount: 2494 },
  { month: 'İyn', amount: 2494 },
];

export function CreditDashboard() {
  const { token } = theme.useToken();
  const [loans, setLoans] = useState<Loan[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const load=async () => {
        const data = await creditService.getLoans();
        setLoans(data);
        setLoading(false);
    }
    load();                                     

  }
   
  if (loading) return <div style={{ textAlign: 'center', padding: '80x' }}><Spin size="large" /></div>;

  const totakDebt = loans.filter((1) => _.status !== 'paid').reduce((sum, loan) => sum + loan.amount, 0);
