import { Layout, Input, Badge, Avatar, Breadcrumb } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined, SearchOutlined, BellOutlined } from '@ant-design/icons';
import { useLocation, Link } from 'react-router';

const { Header } = Layout;

interface AppTopbarAntDProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function AppTopbarAntD({ collapsed, onToggle }: AppTopbarAntDProps) {
  const location = useLocation();

  const getBreadcrumbs = () => {
    const paths = location.pathname.split('/').filter(Boolean);
    return paths.map((path, index) => {
      const href = '/' + paths.slice(0, index + 1).join('/');
      const label = path.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      return { title: index < paths.length - 1 ? <Link to={href}>{label}</Link> : label };
    });
  };

  return (
    <Header
      style={{
        position: 'sticky', top: 0, zIndex: 1, width: '100%',
        display: 'flex', alignItems: 'center', gap: 16, padding: '0 24px',
        background: '#fff', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
      }}
    >
      {collapsed
        ? <MenuUnfoldOutlined onClick={onToggle} style={{ fontSize: 18, cursor: 'pointer' }} />
        : <MenuFoldOutlined onClick={onToggle} style={{ fontSize: 18, cursor: 'pointer' }} />
      }
      <Breadcrumb items={getBreadcrumbs()} />
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 16 }}>
        <Input placeholder="Search..." prefix={<SearchOutlined />} style={{ width: 280 }} />
        <Badge dot><BellOutlined style={{ fontSize: 20, cursor: 'pointer' }} /></Badge>
        <Avatar style={{ backgroundColor: '#1890ff', cursor: 'pointer' }}>U</Avatar>
      </div>
    </Header>
  );
}
