import {
  DashboardOutlined,
  UserOutlined,
  FileTextOutlined,
  TagsOutlined,
} from '@ant-design/icons'
import {Breadcrumb, Layout, Menu, Avatar} from 'antd'
import type {MenuProps} from 'antd'
import {Link, Outlet, useLocation} from 'react-router-dom'
import {routes} from '../router/router.tsx'
import {useEffect, useState} from 'react'

const {Header, Content, Footer, Sider} = Layout

type MenuItem = Required<MenuProps>['items'][number]
interface IBreadCrumb {
  title: string
}

const iconMapping: Record<string, JSX.Element> = {
  '/dashboard': <DashboardOutlined/>,
  '/post': <FileTextOutlined/>,
  '/category': <TagsOutlined/>,
  '/tag': <TagsOutlined/>,
  '/user': <UserOutlined/>
}

export default function MyLayout() {
  const location = useLocation()
  const [breadCrumbItems, setBreadCrumbItems] = useState<IBreadCrumb[]>([])
  const [collapsed, setCollapsed] = useState(false);

  const currentPath = location.pathname
  const menuItems:MenuItem[] = routes[0].children.map(route => {
    const path = route.path
    const iconComponent = iconMapping[path] || null
    return {
      key: path,
      icon: iconComponent,
      label: <Link to={path}>{route.name}</Link>,
    }
  })

  useEffect(() => {
    const route = routes[0].children.find(item => item.path === location.pathname)
    if (route) {
      setBreadCrumbItems([
        {title: '主页'},
        {title: route.name}
      ])
    }
  }, [location])

  return (
    <Layout className="w-lvw h-lvh">
      <Header className="bg-white border-b h-16 flex justify-between items-center">
        <div></div>
        <div className="cursor-pointer hover:bg-gray-100 rounded-md h-5/6 flex items-center justify-center px-3">
          <Avatar icon={<UserOutlined />} />
          <span className="font-bold pl-3">Admin AdminAdmin</span>
        </div>
      </Header>
      <Layout>
        <Sider
          theme="light"
          width={250}
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={[currentPath]}
            items={menuItems}
          />
        </Sider>
        <Layout>
          <Content style={{margin: '0 16px 0'}}>
            <Breadcrumb style={{ margin: '16px 0' }} items={breadCrumbItems}/>
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
