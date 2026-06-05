import { Card, Typography, Row, Col, Space, Button } from 'antd';
import { CreditCardOutlined, WalletOutlined, FileTextOutlined, CheckCircleOutlined, SafetyOutlined, BarChartOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';
import { Logo } from '../components/Logo';

const { Title, Paragraph, Text } = Typography;

export function WelcomePageAntD() {
  const navigate = useNavigate();

  return (
    <div>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <Logo size={120} />
          <Title level={1} style={{ marginTop: 24, marginBottom: 8 }}>Welcome to BootBank</Title>
          <Paragraph style={{ fontSize: 18, color: 'rgba(0, 0, 0, 0.65)' }}>Digital Banking Platform</Paragraph>
        </div>

        <Row gutter={[24, 24]}>
          <Col xs={24} md={8}>
            <Card hoverable style={{ borderColor: '#1890ff', background: 'linear-gradient(135deg, #e6f7ff 0%, #ffffff 100%)' }}>
              <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                <div style={{ width: 48, height: 48, borderRadius: 8, background: '#1890ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <CreditCardOutlined style={{ fontSize: 24, color: '#fff' }} />
                </div>
                <Title level={4}>Cards Platform</Title>
                <Text type="secondary">Manage credit and debit cards, track spending, control limits</Text>
                <Space direction="vertical" size="small">
                  {['Card Management', 'Transaction History', 'Spending Analytics'].map((f) => (
                    <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8 }}><CheckCircleOutlined style={{ color: '#52c41a' }} /><Text>{f}</Text></div>
                  ))}
                </Space>
                <Button type="primary" block onClick={() => navigate('/cards')}>View Cards Dashboard</Button>
              </Space>
            </Card>
          </Col>

          <Col xs={24} md={8}>
            <Card hoverable style={{ borderColor: '#52c41a', background: 'linear-gradient(135deg, #f6ffed 0%, #ffffff 100%)' }}>
              <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                <div style={{ width: 48, height: 48, borderRadius: 8, background: '#52c41a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <WalletOutlined style={{ fontSize: 24, color: '#fff' }} />
                </div>
                <Title level={4}>Deposits Platform</Title>
                <Text type="secondary">Open and manage deposits, calculate interest, track growth</Text>
                <Space direction="vertical" size="small">
                  {['Fixed Deposits', 'Interest Calculator', 'Growth Tracking'].map((f) => (
                    <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8 }}><CheckCircleOutlined style={{ color: '#52c41a' }} /><Text>{f}</Text></div>
                  ))}
                </Space>
                <Button type="primary" block style={{ background: '#52c41a', borderColor: '#52c41a' }} onClick={() => navigate('/deposits')}>View Deposits Dashboard</Button>
              </Space>
            </Card>
          </Col>

          <Col xs={24} md={8}>
            <Card hoverable style={{ borderColor: '#fa8c16', background: 'linear-gradient(135deg, #fff7e6 0%, #ffffff 100%)' }}>
              <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                <div style={{ width: 48, height: 48, borderRadius: 8, background: '#fa8c16', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FileTextOutlined style={{ fontSize: 24, color: '#fff' }} />
                </div>
                <Title level={4}>Credit Platform</Title>
                <Text type="secondary">Apply for loans, track repayments, calculate EMI</Text>
                <Space direction="vertical" size="small">
                  {['Loan Application', 'EMI Calculator', 'Repayment Schedule'].map((f) => (
                    <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8 }}><CheckCircleOutlined style={{ color: '#52c41a' }} /><Text>{f}</Text></div>
                  ))}
                </Space>
                <Button type="primary" block style={{ background: '#fa8c16', borderColor: '#fa8c16' }} onClick={() => navigate('/credit')}>View Credit Dashboard</Button>
              </Space>
            </Card>
          </Col>
        </Row>

        <Card style={{ background: 'linear-gradient(90deg, #e6f7ff 0%, #f0f2f5 50%, #bae7ff 100%)', border: '1px solid #1890ff' }}>
          <div style={{ textAlign: 'center' }}>
            <SafetyOutlined style={{ fontSize: 48, color: '#1890ff' }} />
            <Title level={3} style={{ marginTop: 16 }}>Secure & Modern Banking</Title>
            <Paragraph style={{ color: 'rgba(0, 0, 0, 0.65)' }}>Experience seamless banking with advanced security and real-time analytics</Paragraph>
          </div>
          <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
            {[
              { icon: <SafetyOutlined style={{ fontSize: 32, color: '#1890ff' }} />, title: 'Bank-Level Security', desc: '2FA & Encryption' },
              { icon: <BarChartOutlined style={{ fontSize: 32, color: '#52c41a' }} />, title: 'Real-Time Insights', desc: 'Analytics Dashboard' },
              { icon: <CreditCardOutlined style={{ fontSize: 32, color: '#fa8c16' }} />, title: 'Multi-Module', desc: 'Cards, Deposits, Credit' },
            ].map((item) => (
              <Col xs={24} md={8} key={item.title}>
                <Card><Space direction="vertical" align="center" style={{ width: '100%' }}>{item.icon}<Title level={5}>{item.title}</Title><Text type="secondary">{item.desc}</Text></Space></Card>
              </Col>
            ))}
          </Row>
        </Card>
      </Space>
    </div>
  );
}
