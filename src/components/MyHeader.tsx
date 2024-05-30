import {Avatar, Dropdown, MenuProps} from 'antd'
import {UserOutlined, LogoutOutlined} from '@ant-design/icons'

const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <div className="flex items-center justify-between">
        <LogoutOutlined/>
        <span>退出登陆</span>
      </div>
    )
  }
]

export default function MyHeader() {
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
          <span className="font-bold pl-3">Admin</span>
        </div>
      </Dropdown>
    </>
  )
}
