import {Form, Input, Button, FormProps, notification, message as antdMessage} from 'antd'
import {loggedOut, selectUserId} from '../../store/slices/authSlice.ts'
import {updatePassword} from '../../apis/user.ts'
import store from '../../store/store.ts'
import {useAppDispatch} from '../../hooks/hooks.ts'
import {useNavigate} from 'react-router-dom'

type PasswordFormType = {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}

export default function PasswordForm() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const onFinish: FormProps<PasswordFormType>['onFinish'] = async (values) => {
    const {oldPassword, newPassword} = values
    try {
      const {message} = await updatePassword(selectUserId(store.getState()), {oldPassword, newPassword})
      if (message === 'success') {
        antdMessage.success('修改成功')
        dispatch(loggedOut())
        antdMessage.success('退出登陆')
        navigate('/login')
      } else {
        antdMessage.error(message)
      }
    } catch (e) {
      notification.error({
        message: '修改密码失败',
        description: (e as object).toString()
      })
    }
  }

  return (
    <Form
      name="password"
      wrapperCol={{span: 16}}
      style={{maxWidth: 600}}
      initialValues={{remember: true}}
      autoComplete="off"
      layout="vertical"
      onFinish={onFinish}
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
        name="newPassword"
        rules={[{required: true, message: '请输入新密码！'}]}
      >
        <Input.Password/>
      </Form.Item>
      <Form.Item<PasswordFormType>
        label="重复密码"
        name="confirmPassword"
        rules={[{required: true, message: '请重复输入密码！'}]}
      >
        <Input.Password/>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          修改密码
        </Button>
      </Form.Item>
    </Form>
  )
}
