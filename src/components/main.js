import React, { Component } from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import pageRoute from './pageRoute'

const { Header, Content, Footer, Sider } = Layout;

class MainApp extends Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['0']} mode="inline">
            {pageRoute.map((val, i) => (
              <Menu.Item key={i} icon={val.icon}>
                <Link to={val.link}>
                  {val.name}
                </Link>
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header />
          <Content style={{ margin: '0 16px' }}>
            <Switch>
              {pageRoute && pageRoute.map((val, i) => (
                <Route
                  exact
                  key={i}
                  path={val.path}
                  component={val.component}
                />
              ))}
            </Switch>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default MainApp