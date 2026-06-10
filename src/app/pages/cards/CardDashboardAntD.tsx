import { useState, useEffect } from 'react';
import {
  Card,
  Row,
  Col,
  Statistic,
  Typography,
  Tag,
  Space,
  Progress,
  Table,
  Spin,
  theme, 
} from 'antd';
import {
    CreditCardOutlined,
    CheckCircleOutlined,
    DollarOutlined,
    BarChartOutlined,
    ArrowUpOutlined,
    ArrowDownOutlined,
} from '@ant-design/icons';
import { Line, Bar } from '@ant-design/charts';
import { useNavigate } from 'react-router';
import { cardService } from '@/app/services/cards/cardService';
import type {Card as CardType, Transaction } from '../../services/cards/types';

const {Title, Text} = Typography;
const currencySymbol: Record<string,string> = {AZN:'', USD:'$', EUR:'€'};

const monthlySpending = [
    {month: 'Yan', amount: 2800}, {month: 'Fev', amount: 3200},
    {month: 'Mar', amount: 2500}, {month: 'Apr', amount: 4100},
    {month: 'May', amount: 3800}, {month: 'Iyn', amount: 3420},
];

export function CardsDashboard(){
    const { token } = theme.useToken();
    const navigate = useNavigate();
    const [cards, setCards] = useState<CardType[]>([]);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);


useEffect(() => {
    const load = async () => {
        const [c,t] = await Promise.all([cardService.getCards(), cardService.getTransactions()]);
        setCards(c);
        setTransactions(t);
        setLoading(false);
    };
    load();
}, []);

if (loading) return <div style={{ textAlign: 'center', padding: 80}}><Spin size='large'/></div>

const activeCards = cards.filter((c) => c.status === 'active');
const totalLimit = cards.reduce((sum, c) => sum + c.limit, 0);
const totalUsed = cards.reduce((sum, c) => sum + c.used, 0);

const categorySpending: Record<string, number> = {};
transactions.filter((t) => t.type === 'debit' && t.status === 'completed')
.forEach((t) => {
    categorySpending[t.category] = (categorySpending[t.category] || 0) + t.amount;
});
const categoryData = Object.entries(categorySpending)
.map(([category, amount]) => ({category, amount: Number(amount.toFixed(2))}))
.sort((a, b) => b.amount - a.amount).slice(0, 6);

const statusColor: Record<string, string> = { active: 'green', blocked: 'red', expired: 'default'};
const cardGradients: Record<string, string> = {
    AZN: 'linear-gradient(135deg, #1a1a2e 0%, #116213e 50%, #0f3460 100%)',
    USD: 'linear-gradient(135deg, #0d1b2a 0%, #1b2838 50%, #2a4066 100%)',
    EUR: 'linear-gradient(135deg, #1a0a2e 0%, #2d1b69 50%, #5b2c83 100%)',

};

return (
    <Space direction='vertical' size="large" style={{width: '100%'}}>
        <div>
            <Title level={3} style={{marginBottom: 4}}>Cards Dashboard</Title>
            <Text type="secondary">Kartlarınızın ümumi baxışı</Text>
        </div>
    </Space>
);

}