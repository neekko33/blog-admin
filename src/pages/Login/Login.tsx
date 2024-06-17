import React from 'react'
import {Button, Checkbox, Form, FormProps, Input, notification, message as antdMessage} from 'antd'
import {LockOutlined, UserOutlined} from '@ant-design/icons'
import imgUrl from '../../assets/login_left.png'
import {login as userLogin} from '../../apis/user.ts'
import {useAppDispatch} from '../../hooks/hooks.ts'
import {useNavigate} from 'react-router-dom'
import {login} from '../../store/slices/authSlice.ts'

type LoginProps = {
  email: string,
  password: string,
  remember: boolean,
}

const Login: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [form] = Form.useForm()
  const handlerSubmit: FormProps<LoginProps>['onFinish'] = async (values) => {
    const {headers, data: {message,data}} = await userLogin(values)
    if (message === 'success') {
      dispatch(login({
        jwt: headers.token,
        userId: data.id?.toString() || '',
        username: data.name || ''
      }))
      antdMessage.success('登陆成功')
      navigate('/dashboard')
    } else {
      notification.error({
        message: '登陆失败',
        description: message
      })
    }
    form.resetFields()
  }
  return (
    <>
      <div className="login-containter h-screen flex justify-center items-center">
        <div className="login-box flex">
          <div className="w-0 xl:flex-1 h-full login-left flex justify-center items-center">
            <img src={imgUrl} alt=""/>
          </div>
          <div className="flex-1 h-full flex justify-center items-center">
            <div className="shadow-2xl rounded-3xl bg-white py-10 px-20 w-7/12 h-1/2">
              <h1 className="w-full text-4xl text-center mb-12">BLOG 后台管理系统</h1>
              <Form
                form={form}
                name="normal_login"
                initialValues={{remember: true}}
                onFinish={handlerSubmit}
              >
                <Form.Item
                  name="email"
                  rules={[{required: true, message: '邮箱不能为空'}]}
                >
                  <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="邮箱"/>
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[{required: true, message: '密码不能为空'}]}
                >
                  <Input
                    prefix={<LockOutlined className="site-form-item-icon"/>}
                    type="password"
                    placeholder="密码"
                  />
                </Form.Item>
                <Form.Item>
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>记住我</Checkbox>
                  </Form.Item>
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" block>
                    登 录
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>

  )
}
export default Login
