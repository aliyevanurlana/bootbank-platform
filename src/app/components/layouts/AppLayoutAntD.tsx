import { useState } from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router';
import { AppSidebarAntD } from './AppSidebarAntD';
import { AppTopbarAntD } from './AppTopbarAntD';

const { Content } = Layout;

export function AppLayoutAntD() {
  const [collapsed, setCollapsed] = useState(false);
  const siderWidth = collapsed ? 80 : 250;

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <AppSidebarAntD collapsed={collapsed} onCollapse={setCollapsed} />
      <Layout style={{ marginLeft: siderWidth, transition: 'margin-left 0.2s' }}>
        <AppTopbarAntD collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            background: '#f0f2f5',
            borderRadius: 8,
            minHeight: 'calc(100vh - 64px - 48px)',
            overflow: 'auto',
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
