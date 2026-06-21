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
  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: 80 }}>
        <Spin size="large" />
      </div>
    );
  }

  const activeLoans = loans.filter((loan) => loan.status !== 'paid');

  const totalDebt = activeLoans.reduce(
    (sum, loan) => sum + loan.remaining,
    0
  );

  const monthlyTotal = activeLoans.reduce(
    (sum, loan) => sum + loan.monthlyPayment,
    0
  );

  const totalPaid = loans.reduce(
    (sum, loan) => sum + loan.totalPaid,
    0
  );

  const overdueCount = loans.filter(
    (loan) => loan.status === 'overdue'
  ).length;

  const portfolioData = activeLoans.reduce((acc, loan) => {
    const label = typeLabels[loan.type] || loan.type;
    const existing = acc.find((item) => item.type === label);

    if (existing) {
      existing.value += loan.remaining;
    } else {
      acc.push({
        type: label,
        value: loan.remaining
      });
    }

    return acc;
  }, [] as { type: string; value: number }[]);

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 16
        }}
      >
        <div>
          <Title level={3} style={{ marginBottom: 4 }}>
            Credit Dashboard
          </Title>
          <Text type="secondary">
            Kredit portfelinizin ümumi baxışı
          </Text>
        </div>

        <Button
          type="primary"
          onClick={() => navigate('/credit/apply')}
        >
          Kredit Müraciəti
        </Button>
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6}>
          <Card hoverable>
            <Statistic
              title="Toplam Borc"
              value={totalDebt}
              prefix={<DollarOutlined style={{ color: token.colorPrimary }} />}
              suffix="₼"
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Card hoverable>
            <Statistic
              title="Aylıq Ödəniş"
              value={monthlyTotal}
              prefix={<CalendarOutlined style={{ color: token.colorWarning }} />}
              suffix="₼"
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Card hoverable>
            <Statistic
              title="Toplam Ödənilib"
              value={totalPaid}
              prefix={<CheckCircleOutlined style={{ color: token.colorSuccess }} />}
              suffix="₼"
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Card hoverable>
            <Statistic
              title="Gecikmiş"
              value={overdueCount}
              prefix={<ExclamationCircleOutlined style={{ color: token.colorError }} />}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title="Ödəniş Trendi" bordered={false}>
            <Line
              data={monthlyPayments}
              xField="month"
              yField="amount"
              smooth
              height={300}
            />
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title="Kredit Portfeli" bordered={false}>
            <Pie
              data={portfolioData}
              angleField="value"
              colorField="type"
              height={300}
              innerRadius={0.6}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card
            title="Aktiv Kreditlər"
            extra={
              <a onClick={() => navigate('/credit/my-loans')}>
                Hamısına bax
              </a>
            }
          >
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              {loans.map((loan) => {
                const paidPct = Math.round(
                  (loan.totalPaid / loan.amount) * 100
                );

                return (
                  <Card
                    key={loan.id}
                    size="small"
                    hoverable
                    style={{
                      borderLeft: `4px solid ${typeColors[loan.type] || token.colorPrimary}`
                    }}
                  >
                    <Row gutter={[16, 8]} align="middle">
                      <Col xs={24} sm={8}>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8
                          }}
                        >
                          <span style={{ fontSize: 24 }}>
                            {typeIcons[loan.type]}
                          </span>

                          <div>
                            <div style={{ fontWeight: 600 }}>
                              {loan.name}
                            </div>

                            <Space size={4}>
                              <Tag color={typeColors[loan.type]}>
                                {typeLabels[loan.type]}
                              </Tag>

                              <Tag color={statusConfig[loan.status]?.color}>
                                {statusConfig[loan.status]?.label}
                              </Tag>
                            </Space>
                          </div>
                        </div>
                      </Col>

                      <Col xs={12} sm={4} style={{ textAlign: 'center' }}>
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          Məbləğ
                        </Text>

                        <div style={{ fontWeight: 600 }}>
                          {loan.amount.toLocaleString()} ₼
                        </div>
                      </Col>

                      <Col xs={12} sm={4} style={{ textAlign: 'center' }}>
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          Qalan
                        </Text>

                        <div
                          style={{
                            fontWeight: 600,
                            color: token.colorError
                          }}
                        >
                          {loan.remaining.toLocaleString()} ₼
                        </div>
                      </Col>

                      <Col xs={24} sm={8}>
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          Ödəniş irəliləməsi
                        </Text>

                        <Progress
                          percent={paidPct}
                          strokeColor={typeColors[loan.type]}
                          size="small"
                        />
                      </Col>
                    </Row>
                  </Card>
                );
              })}
            </Space>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card title="Növbəti Ödənişlər">
            <Timeline
              items={activeLoans
                .sort(
                  (a, b) =>
                    new Date(a.nextPaymentDate).getTime() -
                    new Date(b.nextPaymentDate).getTime()
                )
                .map((loan) => {
                  const isOverdue = loan.status === 'overdue';

                  return {
                    color: isOverdue ? 'red' : 'blue',
                    dot: isOverdue ? (
                      <ExclamationCircleOutlined
                        style={{ color: token.colorError }}
                      />
                    ) : undefined,
                    children: (
                      <div>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                          }}
                        >
                          <Text strong>{loan.name}</Text>

                          <Text
                            style={{
                              color: isOverdue
                                ? token.colorError
                                : token.colorPrimary,
                              fontWeight: 600
                            }}
                          >
                            {loan.monthlyPayment.toLocaleString()} ₼
                          </Text>
                        </div>

                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginTop: 4
                          }}
                        >
                          <Text type="secondary" style={{ fontSize: 12 }}>
                            {new Date(
                              loan.nextPaymentDate
                            ).toLocaleDateString('az-AZ')}
                          </Text>

                          {isOverdue && (
                            <Tag color="error" style={{ fontSize: 11 }}>
                              GECİKMİŞ
                            </Tag>
                          )}
                        </div>
                      </div>
                    )
                  };
                })}
            />
          </Card>

          <Card title="Sürətli əməliyyatlar" style={{ marginTop: 16 }}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Button
                block
                onClick={() => navigate('/credit/apply')}
                icon={<FileTextOutlined />}
              >
                Kredit Müraciəti
              </Button>

              <Button
                block
                onClick={() => navigate('/credit/calculator')}
                icon={<DollarOutlined />}
              >
                Kredit Kalkulyatoru
              </Button>

              <Button
                block
                onClick={() => navigate('/credit/my-loans')}
                icon={<CheckCircleOutlined />}
              >
                Kreditlərim
              </Button>
            </Space>
          </Card>
        </Col>
      </Row>
    </Space>
  );
}
```

Bu kod PDF-dəki 1–4 addımların hamısını bir yerdə yığılmış formasıdır. 
