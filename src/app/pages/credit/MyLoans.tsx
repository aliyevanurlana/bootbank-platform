import { useState, useEffect } from 'react';
import {
  Card,
  Table,
  Typography,
  Tag,
  Space,
  Button,
  Progress,
  Modal,
  InputNumber,
  Spin,
  message,
  Drawer,
  Descriptions,
  Col,
  Row,
  theme,
} from 'antd';
import { DollarOutlined, EyeOutlined } from '@ant-design/icons';

import { creditService } from '../../services/credit/creditService';
import type { Loan, LoanCalculation } from '../../services/credit/types';
import type { ColumnsType } from 'antd/es/table';

const { Title, Text } = Typography;

const typeLabels: Record<string, string> = {
  consumer: 'İstehlak',
  mortgage: 'İpoteka',
  auto: 'Avto',
  business: 'Biznes',
};

const typeColors: Record<string, string> = {
  consumer: '#1890ff',
  mortgage: '#52c41a',
  auto: '#fa8c16',
  business: '#722ed1',
};

const statusConfig: Record<
  string,
  { color: string; label: string }
> = {
  active: {
    color: 'green',
    label: 'Aktiv',
  },
  paid: {
    color: 'blue',
    label: 'Ödənilib',
  },
  overdue: {
    color: 'red',
    label: 'Gecikmiş',
  },
};

export function MyLoans() {
  const { token } = theme.useToken();

  const [loans, setLoans] = useState<Loan[]>([]);
  const [loading, setLoading] = useState(true);

  const [paymentModal, setPaymentModal] =
    useState<Loan | null>(null);
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [paying, setPaying] = useState(false);

  const [drawerLoan, setDrawerLoan] =
    useState<Loan | null>(null);
  const [schedule, setSchedule] =
    useState<LoanCalculation | null>(null);
  const [scheduleLoading, setScheduleLoading] =
    useState(false);

  const loadLoans = async () => {
    setLoading(true);

    const data = await creditService.getLoans();

    setLoans(data);

    setLoading(false);
  };

  useEffect(() => {
    loadLoans();
  }, []);

  const handlePayment = async () => {
  if (!paymentModal || paymentAmount <= 0) return;

  setPaying(true);

  try {
    await creditService.makePayment(paymentModal.id, paymentAmount);

    message.success(
      `₼${paymentAmount.toFixed(2)} ödəniş uğurla edildi!`
    );

    setPaymentModal(null);
    setPaymentAmount(0);

    await loadLoans();
  } catch {
    message.error('Ödəniş zamanı xəta baş verdi');
  } finally {
    setPaying(false);
  }
};

const handleOpenSchedule = async (loan: Loan) => {
  setDrawerLoan(loan);
  setScheduleLoading(true);

  try {
    setSchedule(null);
  } catch {
    message.error('Cədvəl yüklənərkən xəta');
  } finally {
    setScheduleLoading(false);
  }
};

const columns: ColumnsType<Loan> = [
  {
    title: 'Kredit',
    dataIndex: 'name',
    key: 'name',
    render: (name: string, record) => (
      <div>
        <div style={{ fontWeight: 600 }}>{name}</div>

        <Space size={4} style={{ marginTop: 4 }}>
          <Tag color={typeColors[record.type]}>
            {typeLabels[record.type]}
          </Tag>

          <Tag color={statusConfig[record.status].color}>
            {statusConfig[record.status].label}
          </Tag>
        </Space>
      </div>
    ),
  },

  {
    title: 'Məbləğ',
    dataIndex: 'amount',
    key: 'amount',
    render: (value: number) => (
      <Text strong>
        ₼{value.toLocaleString()}
      </Text>
    ),
  },

  {
    title: 'Qalan',
    dataIndex: 'remaining',
    key: 'remaining',
    render: (value: number) => (
      <Text
        style={{
          color: token.colorError,
          fontWeight: 600,
        }}
      >
        ₼{value.toLocaleString()}
      </Text>
    ),
  },

  {
    title: 'Aylıq',
    dataIndex: 'monthlyPayment',
    key: 'monthlyPayment',
    render: (value: number) => (
      <Text
        style={{
          color: token.colorPrimary,
          fontWeight: 600,
        }}
      >
        ₼{value.toFixed(2)}
      </Text>
    ),
  },

  {
    title: 'Faiz',
    dataIndex: 'rate',
    key: 'rate',
    render: (value: number) => (
      <Text
        style={{
          color: token.colorWarning,
        }}
      >
        {value}%
      </Text>
    ),
  },

  {
    title: 'İrəliləmə',
    key: 'progress',
    render: (_: unknown, record) => {
      const percent = Math.round(
        (record.totalPaid / record.amount) * 100
      );

      return (
        <Progress
          percent={percent}
          size="small"
          strokeColor={typeColors[record.type]}
        />
      );
    },
  },

  {
    title: 'Əməliyyatlar',
    key: 'actions',
    render: (_: unknown, record) => (
      <Space>
        <Button
          size="small"
          icon={<EyeOutlined />}
          onClick={() => handleOpenSchedule(record)}
        >
          Cədvəl
        </Button>

        {record.status !== 'paid' && (
          <Button
            type="primary"
            size="small"
            icon={<DollarOutlined />}
            onClick={() => {
              setPaymentModal(record);
              setPaymentAmount(record.monthlyPayment);
            }}
          >
            Ödə
          </Button>
        )}
      </Space>
    ),
  },
];

return (
  <Space direction="vertical" size="large" style={{ width: '100%' }}>
    <div>
      <Title level={3} style={{ marginBottom: 4 }}>
        Kreditlərim
      </Title>

      <Text type="secondary">
        Bütün kreditlərinizi idarə edin və ödəniş edin
      </Text>
    </div>

    <Row gutter={[16, 16]}>
      <Col xs={24} sm={8}>
        <Card size="small" style={{ textAlign: 'center' }}>
          <Text type="secondary">Toplam Borc</Text>

          <div
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: token.colorError,
            }}
          >
            ₼
            {loans
              .filter((l) => l.status !== 'paid')
              .reduce((s, l) => s + l.remaining, 0)
              .toLocaleString()}
          </div>
        </Card>
      </Col>

      <Col xs={24} sm={8}>
        <Card size="small" style={{ textAlign: 'center' }}>
          <Text type="secondary">Aylıq Ödəniş</Text>

          <div
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: token.colorPrimary,
            }}
          >
            ₼
            {loans
              .filter((l) => l.status !== 'paid')
              .reduce((s, l) => s + l.monthlyPayment, 0)
              .toFixed(2)}
          </div>
        </Card>
      </Col>

      <Col xs={24} sm={8}>
        <Card size="small" style={{ textAlign: 'center' }}>
          <Text type="secondary">Toplam Ödənilib</Text>

          <div
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: token.colorSuccess,
            }}
          >
            ₼{loans.reduce((s, l) => s + l.totalPaid, 0).toLocaleString()}
          </div>
        </Card>
      </Col>
    </Row>

    <Card styles={{ body: { padding: 0 } }}>
      <Table
        dataSource={loans}
        columns={columns}
        rowKey="id"
        loading={loading}
      />
    </Card>
  </Space>
);
}
