import {createBrowserRouter, RouteObject, Link} from 'react-router-dom'
import {
  DashboardOutlined,
  UserOutlined,
  FileTextOutlined,
  TagsOutlined
} from '@ant-design/icons'
import MyLayout from '../layouts/Layout.tsx'
import Post from '../pages/Post/Post.tsx'
import Login from '../pages/Login/Login.tsx'
import lazyLoad from './lazyLoad'
import React, {lazy} from 'react'
import {MenuProps} from 'antd'

export declare type MenuRouteObject = {
  icon?: React.ReactNode
  label?: string
  children?: MenuRouteObject[] | null
} & RouteObject

export const routers: MenuRouteObject[] = [
  {
    path: '/',
    element: <MyLayout/>,
    children: [
      {
        path: 'dashboard',
        icon: <DashboardOutlined/>,
        label: '控制台',
        element: lazyLoad(lazy(() => import('../pages/Dashboard/Dashboard.tsx')))
      },
      {
        path: 'post',
        icon: <FileTextOutlined/>,
        label: '文章管理',
        element: <Post/>,
        children: [
          {
            path: 'list',
            label: '文章列表',
            element: lazyLoad(lazy(() => import('../pages/Post/PostList.tsx')))
          },
          {
            path: 'edit',
            label: '文章编辑',
            element: lazyLoad(lazy(() => import('../pages/Post/PostEdit.tsx')))
          }
        ]
      },
      {
        path: 'category',
        icon: <TagsOutlined/>,
        label: '分类管理',
        element: lazyLoad(lazy(() => import('../pages/Category')))
      },
      {
        path: 'user',
        icon: <UserOutlined/>,
        label: '用户管理',
        element: lazyLoad(lazy(() => import('../pages/User/User.tsx')))
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  }
]

export type MenuItem = Required<MenuProps>['items'][number] & {
  children?: MenuItem[] | null
}

const createMenuItems = (
  routers: MenuRouteObject[] | null,
  key: string,
  topMenuOnly?: boolean
): MenuItem[] => {
  return routers
    ? routers.map(router => {
      return {
        key: key + processPath(router.path),
        icon: router.icon,
        label: router.path && !router.children ?
          <Link to={key + processPath(router.path)}>{router.label}</Link> : router.label,
        children:
          !topMenuOnly && router.children
            ? createMenuItems(
              router.children,
              key + processPath(router.path),
              false
            )
            : null
      }
    })
    : []
}

const processPath = (path: string | undefined): string => {
  if (path) {
    if (path.endsWith('/'))
      path = path.substring(0, path.length - 1)
    if (!path.startsWith('/')) path = '/' + path
  }
  return path ? path : ''
}

export const useMenuItems = (topMenuOnly?: boolean): MenuItem[] => {
  return routers[0].children ? createMenuItems(routers[0].children, '', topMenuOnly) : []
}

type BreadcrumbItem = {
  title: string
}

export const getBreadcrumbs = (pathname: string): BreadcrumbItem [] => {
  const breadcrumbs: BreadcrumbItem[] = []
  let tempRouters: MenuRouteObject[] = routers[0].children!
  const pathList = pathname.split('/').filter(Boolean)
  while (pathList.length) {
    const path = pathList.shift()
    const router = tempRouters.find(item => item.path === path)
    if (router) {
      breadcrumbs.push({title: router.label || ''})
      if (pathList.length) tempRouters = router.children!
    }
  }
  return breadcrumbs
}

export const router = createBrowserRouter(routers)
