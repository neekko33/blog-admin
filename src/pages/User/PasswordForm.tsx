import { Form, Input, Button, FormProps } from 'antd'

type PasswordFormType = {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}

const onFinish: FormProps<PasswordFormType>['onFinish'] = values => {
  console.log('success', values)
}

export default function PasswordForm() {
  return (
    <Form
      name='password'
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      autoComplete='off'
      layout='vertical'
      onFinish={onFinish}
    >
      <Form.Item<PasswordFormType>
        label='旧密码'
        name='oldPassword'
        rules={[{ required: true, message: '请输入原始密码！' }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item<PasswordFormType>
        label='新密码'
        name='newPassword'
        rules={[{ required: true, message: '请输入新密码！' }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item<PasswordFormType>
        label='重复密码'
        name='confirmPassword'
        rules={[{ required: true, message: '请重复输入密码！' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type='primary' htmlType='submit'>
          修改密码
        </Button>
      </Form.Item>
    </Form>
  )
}
