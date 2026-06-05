import { useState } from "react";
import { useNavigate } from "react-router";
import { Form, Input, Button, Card, Typography, Space } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { useAuth } from "../../contexts/AuthContext";
import { Logo } from "../../components/Logo";

const { Title, Text, Link } = Typography;

export function LoginPageAntD() {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleSubmit = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      await login(values.email, values.password);
      navigate("/auth/otp");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'linear-gradient(135deg, #e6f7ff 0%, #f0f2f5 50%, #bae7ff 100%)', padding: '24px',
      }}
    >
      <Card style={{ width: '100%', maxWidth: 450, boxShadow: '0 6px 16px 0 rgba(0, 0, 0, 0.08)' }}>
        <Space direction="vertical" size="large" style={{ width: '100%', textAlign: 'center' }}>
          <div style={{ marginBottom: 8 }}><Logo size={80} /></div>
          <div>
            <Title level={2} style={{ marginBottom: 8 }}>Welcome to BootBank</Title>
            <Text type="secondary">Digital Banking Platform</Text>
          </div>
          <Form form={form} name="login" onFinish={handleSubmit} layout="vertical" requiredMark={false} style={{ textAlign: 'left' }}>
            <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input your email!' }, { type: 'email', message: 'Please enter a valid email!' }]}>
              <Input prefix={<MailOutlined />} placeholder="name@company.com" size="large" />
            </Form.Item>
            <Form.Item
              label={
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                  <span>Password</span>
                  <Link href="/auth/forgot-password" style={{ fontSize: 14 }}>Forgot password?</Link>
                </div>
              }
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Enter your password" size="large" />
            </Form.Item>
            <Form.Item style={{ marginTop: 24 }}>
              <Button type="primary" htmlType="submit" loading={loading} block size="large">Sign in</Button>
            </Form.Item>
          </Form>
        </Space>
      </Card>
    </div>
  );
}
