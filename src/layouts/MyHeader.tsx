import {Avatar, Dropdown, MenuProps, message} from 'antd'
import {UserOutlined, LogoutOutlined} from '@ant-design/icons'
import {useAppDispatch} from '../hooks/hooks.ts'
import {loggedOut} from '../store/slices/authSlice.ts'
import {useNavigate} from 'react-router-dom'
import {selectUsername} from '../store/slices/authSlice.ts'
import store from '../store/store.ts'

export default function MyHeader() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const username = selectUsername(store.getState())
  const logout = () => {
    dispatch(loggedOut())
    message.success('退出登陆')
    navigate('/login')
  }
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <div className="flex items-center justify-between" onClick={logout}>
          <LogoutOutlined/>
          <span>退出登陆</span>
        </div>
      )
    }
  ]
  return (
    <>
      <div className="flex items-center justify-between">
        <img src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" height="32" width="32"
             alt="logo"/>
        <h1 className="font-bold text-xl ml-2">Ant Design</h1>
      </div>
      <Dropdown menu={{items}}>
        <div className="cursor-pointer hover:bg-gray-100 rounded-md h-5/6 flex items-center justify-center px-3">
          <Avatar icon={<UserOutlined/>}/>
          <span className="font-bold pl-3">{username}</span>
        </div>
      </Dropdown>
    </>
  )
}
