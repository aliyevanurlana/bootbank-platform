import { BankOutlined } from '@ant-design/icons';

interface LogoProps {
  className?: string;
  size?: number;
}

export function Logo({ size = 32 }: LogoProps) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.2,
        background: 'linear-gradient(135deg, #1890ff 0%, #096dd9 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <BankOutlined style={{ fontSize: size * 0.5, color: '#fff' }} />
    </div>
  );
}
