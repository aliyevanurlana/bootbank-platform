import { useState } from "react";
import { useNavigate } from "react-router";
import { Card, Typography, Space, Button, Input } from "antd";
import { useAuth } from "../../contexts/AuthContext";
import { Logo } from "../../components/Logo";

const { Title, Text, Link } = Typography;

export function OTPPageAntD() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const { verifyOTP } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (otp.length !== 6) return;
    setLoading(true);
    try {
      await verifyOTP(otp);
      navigate("/welcome");
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
            <Title level={2} style={{ marginBottom: 8 }}>Two-Factor Authentication</Title>
            <Text type="secondary">Enter the 6-digit code sent to your registered mobile number</Text>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', margin: '32px 0' }}>
            <Input.OTP length={6} value={otp} onChange={setOtp} size="large" />
          </div>
          <div><Link>Resend code</Link></div>
          <Button type="primary" onClick={handleSubmit} loading={loading} disabled={otp.length !== 6} block size="large">
            Verify & Continue
          </Button>
        </Space>
      </Card>
    </div>
  );
}
