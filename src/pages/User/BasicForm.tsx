import {Form, Input, Button, Avatar} from 'antd'
import {UploadOutlined, UserOutlined} from '@ant-design/icons'

export default function BasicForm() {
  type BasicFormType = {
    avatar: string,
    name: string,
    email: string,
    info: string
  }

  return (
    <Form
      name="basic"
      wrapperCol={{span: 16}}
      style={{maxWidth: 600}}
      initialValues={{remember: true}}
      autoComplete="off"
      layout="vertical"
    >
      <Form.Item<BasicFormType>
        label="头像"
        name="avatar"
        rules={[{required: false, message: 'Please input your username!'}]}
      >
        <div className="flex flex-col justify-center items-center">
            <Avatar
              size={{xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100}}
              icon={<UserOutlined/>}
            />
            <Button className="mt-5" icon={<UploadOutlined/>}>上传图片</Button>
        </div>
      </Form.Item>

      <Form.Item<BasicFormType>
        label="用户名"
        name="name"
        rules={[{required: true, message: 'Please input your username!'}]}
      >
        <Input/>
      </Form.Item>

      <Form.Item<BasicFormType>
        label="邮箱"
        name="email"
        rules={[{required: true, message: 'Please input your password!'}]}
      >
        <Input/>
      </Form.Item>

      <Form.Item<BasicFormType>
        label="个人简介"
        name="info"
        rules={[{required: false, message: 'Please input your password!'}]}
      >
        <Input.TextArea/>
      </Form.Item>

      <Form.Item>
        <Button type="primary">
          更新信息
        </Button>
      </Form.Item>
    </Form>
  )
}
