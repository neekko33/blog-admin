import {Form, Input, Button} from 'antd'

type PasswordFormType = {
  oldPassword: string,
  newPassword: string,
  confirmPassword: string,
}

export default function PasswordForm() {


  return (
    <Form
      name="basic"
      wrapperCol={{span: 16}}
      style={{maxWidth: 600}}
      initialValues={{remember: true}}
      autoComplete="off"
      layout="vertical"
    >
      <Form.Item<PasswordFormType>
        label="旧密码"
        name="oldPassword"
        rules={[{required: true, message: '请输入原始密码！'}]}
      >
        <Input.Password/>
      </Form.Item>
      <Form.Item<PasswordFormType>
        label="新密码"
        name="oldPassword"
        rules={[{required: true, message: '请输入新密码！'}]}
      >
        <Input.Password/>
      </Form.Item>
      <Form.Item<PasswordFormType>
        label="重复密码"
        name="oldPassword"
        rules={[{required: true, message: '请重复输入密码！'}]}
      >
        <Input.Password/>
      </Form.Item>

      <Form.Item>
        <Button type="primary">
          修改密码
        </Button>
      </Form.Item>
    </Form>
  )
}
