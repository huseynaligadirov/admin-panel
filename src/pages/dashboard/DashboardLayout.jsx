import { Layout, Menu } from "antd";
import { Link, Outlet, useLocation } from "react-router-dom";

const { Header, Content, Sider } = Layout;

const DashboardLayout = () => {
  const location = useLocation();

  const items = [
    {
      key: "/users",
      label: <Link to="/users">User List</Link>,
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider>
        <Menu
        style={{padding: 12}}
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={items}
        />
      </Sider>
      <Layout>
        <Header style={{ color: "white" , padding: "0"}}>Dashboard</Header>
        <Content style={{ padding: 20 }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
