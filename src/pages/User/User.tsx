import {Card,Tabs} from 'antd'
import BasicForm from './BasicForm.tsx'
import PasswordForm from './PasswordForm.tsx'

const tabItems = [
  {
    key: 'basic',
    label: '基本设置',
    children: <BasicForm />,
  },
  {
    key: 'password',
    label: '修改密码',
    children: <PasswordForm />
  }
]

export default function User() {
  return (
    <Card>
      <Tabs
        tabPosition="left"
        defaultActiveKey="basic"
        items={tabItems}
      />
    </Card>
  )
}
