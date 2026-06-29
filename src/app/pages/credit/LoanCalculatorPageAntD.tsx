import { useState, useEffect, useCallback } from 'react';
import { Card, Typography, Space, Row, Col, Slider, InputNumber, Table, Spin, theme } from 'antd';
import { DollarOutlined, CalendarOutlined, PercentageOutlined } from '@ant-design/icons';
import { Line } from '@ant-design/charts';
import { creditService } from '../../services/credit/creditService';
import type { LoanCalculation } from '../../services/credit/types';

const { Title, Text } = Typography;

export function LoanCalculator() {
  const { token } = theme.useToken();
  const [amount, setAmount] = useState(20000);
  const [term, setTerm] = useState(24);
  const [rate, setRate] = useState(14);
  const [result, setResult] = useState<LoanCalculation | null>(null);
  const [loading, setLoading] = useState(false);

  const calculate = useCallback(async () => {
    setLoading(true);
    try {
      const calc = await creditService.calculateLoan(amount, term, rate);
      setResult(calc);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, [amount, term, rate]);

  useEffect(() => {
    const timeout = setTimeout(() => calculate(), 300);
    return () => clearTimeout(timeout);
  }, [calculate]);

  const balanceChartData = result ? result.schedule.map((row) => ({
    month: `Ay ${row.month}`, balance: row.balance
  })) : [];

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <div>
        <Title level={3} style={{ marginBottom: 4 }}>Kredit Kalkulyatoru</Title>
        <Text type="secondary">Kredit parametrlərini daxil edin və aylıq ödəniş məbləğini hesablayın</Text>
      </div>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={10}>
          <Card>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <Space><DollarOutlined style={{ color: token.colorPrimary }} /><Text strong>Kredit Məbləği</Text></Space>
                  <InputNumber min={1000} max={500000} step={1000} value={amount} onChange={(v) => setAmount(v || 1000)} formatter={(value) => `₼ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={(value) => Number(value?.replace(/₼\s?|(,*)/g, '') || 0)} style={{ width: 160 }} />
                </div>
                <Slider min={1000} max={500000} step={1000} value={amount} onChange={setAmount} tooltip={{ formatter: (v) => `₼ ${v?.toLocaleString()}` }} />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Text type="secondary" style={{ fontSize: 12 }}>₼1,000</Text>
                  <Text type="secondary" style={{ fontSize: 12 }}>₼500,000</Text>
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <Space><CalendarOutlined style={{ color: token.colorSuccess }} /><Text strong>Müddət (ay)</Text></Space>
                  <InputNumber min={1} max={360} value={term} onChange={(v) => setTerm(v || 1)} formatter={(value) => `${value} ay`} parser={(value) => Number(value?.replace(' ay', '') || 0)} style={{ width: 120 }} />
                </div>
                <Slider min={1} max={360} value={term} onChange={setTerm} tooltip={{ formatter: (v) => `${v} ay` }} marks={{ 12: '1 il', 60: '5 il', 120: '10 il', 240: '20 il', 360: '30 il' }} />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <Space><PercentageOutlined style={{ color: token.colorWarning }} /><Text strong>İllik Faiz Dərəcəsi</Text></Space>
                  <InputNumber min={0.1} max={50} step={0.5} value={rate} onChange={(v) => setRate(v || 0.1)} formatter={(value) => `${value}%`} parser={(value) => Number(value?.replace('%', '') || 0)} style={{ width: 100 }} />
                </div>
                <Slider min={0.1} max={50} step={0.1} value={rate} onChange={setRate} tooltip={{ formatter: (v) => `${v}%` }} />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Text type="secondary" style={{ fontSize: 12 }}>0.1%</Text>
                  <Text type="secondary" style={{ fontSize: 12 }}>50%</Text>
                </div>
              </div>
            </Space>
          </Card>
        </Col>

        <Col xs={24} lg={14}>
          {loading ? (
            <Card style={{ textAlign: 'center', padding: 60 }}><Spin size="large" /></Card>
          ) : result ? (
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={8}>
                  <Card style={{ background: token.colorPrimaryBg, border: 'none', textAlign: 'center' }}>
                    <Text style={{ color: token.colorPrimary, fontSize: 12, textTransform: 'uppercase', letterSpacing: 1 }}>Aylıq Ödəniş</Text>
                    <div style={{ fontSize: 28, fontWeight: 700, color: token.colorPrimary, marginTop: 4 }}>₼{result.monthlyPayment.toFixed(2)}</div>
                  </Card>
                </Col>
                <Col xs={24} sm={8}>
                  <Card style={{ background: token.colorSuccessBg, border: 'none', textAlign: 'center' }}>
                    <Text style={{ color: token.colorSuccess, fontSize: 12, textTransform: 'uppercase', letterSpacing: 1 }}>Toplam Ödəniş</Text>
                    <div style={{ fontSize: 28, fontWeight: 700, color: token.colorSuccess, marginTop: 4 }}>₼{result.totalPayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                  </Card>
                </Col>
                <Col xs={24} sm={8}>
                  <Card style={{ background: token.colorWarningBg, border: 'none', textAlign: 'center' }}>
                    <Text style={{ color: token.colorWarning, fontSize: 12, textTransform: 'uppercase', letterSpacing: 1 }}>Toplam Faiz</Text>
                    <div style={{ fontSize: 28, fontWeight: 700, color: token.colorWarning, marginTop: 4 }}>₼{result.totalInterest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                  </Card>
                </Col>
              </Row>

              <Card title="Qalıq Balans Qrafiki" bordered={false}>
                <Line data={balanceChartData} xField="month" yField="balance" smooth={true} height={280} style={{ lineWidth: 2, stroke: token.colorPrimary }} axis={{ y: { labelFormatter: (v: number) => `₼${v.toLocaleString()}` }, x: { labelAutoRotate: true } }} />
              </Card>

              <Card>
                <Title level={5} style={{ marginBottom: 16 }}>Ödəniş Bölgüsü</Title>
                <div style={{ display: 'flex', height: 32, borderRadius: 8, overflow: 'hidden', marginBottom: 16 }}>
                  <div style={{ width: `${(amount / result.totalPayment) * 100}%`, background: token.colorPrimary, transition: 'width 0.5s ease' }} />
                  <div style={{ width: `${(result.totalInterest / result.totalPayment) * 100}%`, background: token.colorWarning, transition: 'width 0.5s ease' }} />
                </div>
                <Row gutter={16}>
                  <Col span={12}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 12, height: 12, borderRadius: 3, background: token.colorPrimary }} />
                      <Text>Əsas borc: ₼{amount.toLocaleString()} ({((amount / result.totalPayment) * 100).toFixed(1)}%)</Text>
                    </div>
                  </Col>
                  <Col span={12}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 12, height: 12, borderRadius: 3, background: token.colorWarning }} />
                      <Text>Faiz: ₼{result.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })} ({((result.totalInterest / result.totalPayment) * 100).toFixed(1)}%)</Text>
                    </div>
                  </Col>
                </Row>
              </Card>

              <Card title="Amortizasiya Cədvəli">
                <Table
                  dataSource={result.schedule} rowKey="month" size="small" pagination={{ pageSize: 12, showTotal: (total) => `${total} ay` }} scroll={{ x: 500 }}
                  columns={[
                    { title: 'Ay', dataIndex: 'month', key: 'month', width: 60, fixed: 'left' },
                    { title: 'Ödəniş', dataIndex: 'payment', key: 'payment', render: (v: number) => `₼${v.toFixed(2)}` },
                    { title: 'Əsas borc', dataIndex: 'principal', key: 'principal', render: (v: number) => <Text style={{ color: token.colorPrimary }}>₼{v.toFixed(2)}</Text> },
                    { title: 'Faiz', dataIndex: 'interest', key: 'interest', render: (v: number) => <Text style={{ color: token.colorWarning }}>₼{v.toFixed(2)}</Text> },
                    { title: 'Qalıq borc', dataIndex: 'balance', key: 'balance', render: (v: number) => <Text strong>₼{v.toFixed(2)}</Text> },
                  ]}
                />
              </Card>
            </Space>
          ) : null}
        </Col>
      </Row>
    </Space>
  );
}
