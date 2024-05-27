import {createBrowserRouter} from 'react-router-dom'
import MyLayout from '../layouts/layout'
import Dashboard from '../pages/dashboard'
import Category from '../pages/category'
import Post from '../pages/post'
import User from '../pages/user'
import Tag from '../pages/tag'

export const routes = [
  {
    path: '/',
    element: <MyLayout/>,
    children: [
      {
        path: '/dashboard',
        name: '控制台',
        element: <Dashboard/>
      },
      {
        path: '/post',
        name: '文章管理',
        element: <Post />
      },
      {
        path: '/category',
        name: '分类管理',
        element: <Category />
      },
      {
        path: '/tag',
        name: '标签管理',
        element: <Tag />
      },
      {
        path: '/user',
        name: '用户管理',
        element: <User />
      }
    ]
  }
]

export const router = createBrowserRouter(routes)
