import {
  LeftOutlined,
  RightOutlined
} from '@ant-design/icons'
import {Breadcrumb, Layout, Menu, FloatButton} from 'antd'
import {Outlet, useLocation} from 'react-router-dom'
import {useEffect, useState} from 'react'
import MyHeader from '../components/MyHeader.tsx'
import {getBreadcrumbs, useMenuItems} from '../router/router.tsx'

const {Header, Content, Footer, Sider} = Layout


export default function MyLayout() {
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(false)
  const [breadcrums, setBreadcrums] = useState([{title: '首页'}])
  const menuItems = useMenuItems()
  const currentPath = location.pathname

  useEffect(() => {
    setBreadcrums([
      {title: '首页'},
      ...getBreadcrumbs(location.pathname)
    ])
  }, [location.pathname])

  return (
    <Layout className="w-lvw h-lvh">
      <Header className="bg-white border-b h-14 flex justify-between items-center px-5">
        <MyHeader/>
      </Header>
      <Layout>
        <Sider
          className="border-r px-3"
          theme="light"
          trigger={null}
          width={250}
          collapsible
          collapsed={collapsed}
          onCollapse={value => setCollapsed(value)}
        >
          <FloatButton
            className="absolute cursor-pointer "
            shape="circle"
            style={{top: 15, right: -12.5, height: 25, width: 25}}
            icon={
              collapsed ? (
                <RightOutlined style={{height: 10, width: 10}}/>
              ) : (
                <LeftOutlined
                  className="text-blue"
                  style={{height: 10, width: 10}}
                />
              )
            }
            onClick={() => {
              setCollapsed(!collapsed)
            }}
          />
          <Menu
            style={{borderInlineEnd: 'none'}}
            mode="inline"
            defaultSelectedKeys={[currentPath]}
            items={menuItems}
          />
        </Sider>
        <Layout>
          <Content className="px-5">
            <Breadcrumb style={{margin: '16px 0'}} items={breadcrums}/>
            <Outlet/>
          </Content>
          <Footer style={{textAlign: 'center'}}>
            Ant Design ©{new Date().getFullYear()} Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  )
}
