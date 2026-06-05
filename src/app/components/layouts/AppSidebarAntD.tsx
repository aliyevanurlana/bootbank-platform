import { Layout, Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router';
import {
  HomeOutlined,
  CreditCardOutlined,
  WalletOutlined,
  FileTextOutlined,
  DashboardOutlined,
  LogoutOutlined,
  CalculatorOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { useAuth } from '../../contexts/AuthContext';
import { Logo } from '../Logo';

const { Sider } = Layout;

interface AppSidebarAntDProps {
  collapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
}

export function AppSidebarAntD({ collapsed, onCollapse }: AppSidebarAntDProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const menuItems: MenuProps['items'] = [
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: 'Home',
      onClick: () => navigate('/welcome'),
    },
    { type: 'divider' },
    {
      key: 'cards',
      icon: <CreditCardOutlined />,
      label: 'Cards Platform',
      children: [
        { key: '/cards', icon: <DashboardOutlined />, label: 'Dashboard', onClick: () => navigate('/cards') },
        { key: '/cards/my-cards', icon: <CreditCardOutlined />, label: 'My Cards', onClick: () => navigate('/cards/my-cards') },
        { key: '/cards/transactions', icon: <FileTextOutlined />, label: 'Transactions', onClick: () => navigate('/cards/transactions') },
      ],
    },
    {
      key: 'deposits',
      icon: <WalletOutlined />,
      label: 'Deposits Platform',
      children: [
        { key: '/deposits', icon: <DashboardOutlined />, label: 'Dashboard', onClick: () => navigate('/deposits') },
        { key: '/deposits/my-deposits', icon: <WalletOutlined />, label: 'My Deposits', onClick: () => navigate('/deposits/my-deposits') },
        { key: '/deposits/open', icon: <FileTextOutlined />, label: 'Open Deposit', onClick: () => navigate('/deposits/open') },
      ],
    },
    {
      key: 'credit',
      icon: <FileTextOutlined />,
      label: 'Credit Platform',
      children: [
        { key: '/credit', icon: <DashboardOutlined />, label: 'Dashboard', onClick: () => navigate('/credit') },
        { key: '/credit/apply', icon: <FileTextOutlined />, label: 'Loan Application', onClick: () => navigate('/credit/apply') },
        { key: '/credit/my-loans', icon: <WalletOutlined />, label: 'My Loans', onClick: () => navigate('/credit/my-loans') },
        { key: '/credit/calculator', icon: <CalculatorOutlined />, label: 'Calculator', onClick: () => navigate('/credit/calculator') },
      ],
    },
  ];

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      theme="dark"
      width={250}
      style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0 }}
    >
      <div
        style={{
          height: 64, display: 'flex', alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'flex-start',
          padding: collapsed ? '0' : '0 24px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          cursor: 'pointer',
        }}
        onClick={() => navigate('/welcome')}
      >
        <Logo size={collapsed ? 32 : 40} />
        {!collapsed && (
          <div style={{ marginLeft: 12 }}>
            <div style={{ color: '#ffffff', fontSize: 16, fontWeight: 600, lineHeight: 1.2 }}>BootBank</div>
            <div style={{ color: 'rgba(255, 255, 255, 0.65)', fontSize: 12, lineHeight: 1.2 }}>Digital Banking Platform</div>
          </div>
        )}
      </div>

      <Menu
        theme="dark" mode="inline"
        selectedKeys={[location.pathname]}
        defaultOpenKeys={['cards', 'deposits', 'credit']}
        items={menuItems}
        style={{ borderRight: 0 }}
      />

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 16, borderTop: '1px solid rgba(255, 255, 255, 0.1)', background: '#001529' }}>
        {!collapsed && (
          <div style={{ marginBottom: 12 }}>
            <div style={{ color: '#ffffff', fontSize: 14, fontWeight: 500, marginBottom: 4 }}>{user?.name}</div>
            <div style={{ color: 'rgba(255, 255, 255, 0.65)', fontSize: 12 }}>{user?.role}</div>
          </div>
        )}
        <div onClick={logout} style={{ display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'flex-start', color: 'rgba(255, 255, 255, 0.85)', cursor: 'pointer', padding: '8px 0' }}>
          <LogoutOutlined style={{ fontSize: 16 }} />
          {!collapsed && <span style={{ marginLeft: 12 }}>Logout</span>}
        </div>
      </div>
    </Sider>
  );
}
