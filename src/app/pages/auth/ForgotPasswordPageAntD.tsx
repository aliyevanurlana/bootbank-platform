import { useState } from "react";
import { Form, Input, Button, Card, Typography, Space, Result } from "antd";
import { MailOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { Logo } from "../../components/Logo";

const { Title, Text, Link } = Typography;

export function ForgotPasswordPageAntD() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleSubmit = async (values: { email: string }) => {
    setLoading(true);
    setEmail(values.email);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSubmitted(true);
    setLoading(false);
  };

  if (submitted) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #e6f7ff 0%, #f0f2f5 50%, #bae7ff 100%)', padding: '24px' }}>
        <Card style={{ width: '100%', maxWidth: 450, boxShadow: '0 6px 16px 0 rgba(0, 0, 0, 0.08)' }}>
          <Result
            status="success"
            title="Check your email"
            subTitle={`We've sent password reset instructions to ${email}`}
            extra={[<Button type="primary" key="back" onClick={() => navigate("/auth/login")}>Back to Sign in</Button>]}
          />
        </Card>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #e6f7ff 0%, #f0f2f5 50%, #bae7ff 100%)', padding: '24px' }}>
      <Card style={{ width: '100%', maxWidth: 450, boxShadow: '0 6px 16px 0 rgba(0, 0, 0, 0.08)' }}>
        <Space direction="vertical" size="large" style={{ width: '100%', textAlign: 'center' }}>
          <div style={{ marginBottom: 8 }}><Logo size={80} /></div>
          <div>
            <Title level={2} style={{ marginBottom: 8 }}>Reset your password</Title>
            <Text type="secondary">Enter your email and we'll send you instructions to reset your password</Text>
          </div>
          <Form form={form} name="forgot-password" onFinish={handleSubmit} layout="vertical" requiredMark={false} style={{ textAlign: 'left' }}>
            <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input your email!' }, { type: 'email', message: 'Please enter a valid email!' }]}>
              <Input prefix={<MailOutlined />} placeholder="name@company.com" size="large" />
            </Form.Item>
            <Form.Item style={{ marginTop: 24 }}>
              <Button type="primary" htmlType="submit" loading={loading} block size="large">Send reset instructions</Button>
            </Form.Item>
            <div style={{ textAlign: 'center', marginTop: 16 }}>
              <Link onClick={() => navigate("/auth/login")}><ArrowLeftOutlined style={{ marginRight: 8 }} />Back to Sign in</Link>
            </div>
          </Form>
        </Space>
      </Card>
    </div>
  );
}
