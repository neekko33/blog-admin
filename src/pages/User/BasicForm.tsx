import {Form, Input, Button, Avatar, FormProps, message as antdMessage, notification} from 'antd'
import {UploadOutlined, UserOutlined} from '@ant-design/icons'
import {getUser, updateUser} from '../../apis/user.ts'
import {selectUserId} from '../../store/slices/authSlice.ts'
import store from '../../store/store.ts'
import {useForm} from 'antd/es/form/Form'
import {useEffect} from 'react'

type BasicFormType = {
  avatar: string
  name: string
  email: string
  intro: string
}

export default function BasicForm() {
  const [form] = useForm<BasicFormType>()
  const userId = selectUserId(store.getState())
  const initialData = async () => {
    try {
      const {message, data} = await getUser(userId)
      if (message === 'success') {
        form.setFieldsValue({
          name: data.name,
          email: data.email,
          intro: data.intro
        })
      } else {
        antdMessage.error(message)
      }
    } catch (e) {
      notification.error({
        message: '错误',
        description: (e as object).toString()
      })
    }

  }
  const onFinish: FormProps<BasicFormType>['onFinish'] = async (values) => {
    try {
      const {message} = await updateUser(userId, values)
      if (message === 'success') {
        antdMessage.success('修改成功')
      } else {
        antdMessage.error(message)
      }
    } catch (e) {
      notification.error({
        message: '修改失败',
        description: (e as object).toString()
      })
    }
  }

  useEffect(() => {
    initialData().then()
  }, [])

  return (
    <Form
      name="basic"
      wrapperCol={{span: 16}}
      style={{maxWidth: 600}}
      initialValues={{remember: true}}
      autoComplete="off"
      layout="vertical"
      onFinish={onFinish}
      form={form}
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
          <Button className="mt-5" icon={<UploadOutlined/>}>
            上传图片
          </Button>
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
        name="intro"
        rules={[{required: false}]}
      >
        <Input.TextArea/>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          更新信息
        </Button>
      </Form.Item>
    </Form>
  )
}
