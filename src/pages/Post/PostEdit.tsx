import {useState} from 'react'
import MDEditor from '@uiw/react-md-editor'
import {Button, Card, Form, Input, Select, Space} from 'antd'
import {SelectType} from '../../index'
import {UploadOutlined} from '@ant-design/icons'

export default function PostEdit() {
  const [value, setValue] = useState('**Hello World!**')
  return (
    <>
      <Card className='mb-3'>
        <Form
          className='flex w-full items-center justify-around'
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          autoComplete='off'
        >
          <Form.Item<SelectType>
            label='标题'
            name='title'
            className='flex-1 mb-0'
          >
            <Input />
          </Form.Item>
          <Form.Item<SelectType>
            label='分类'
            name='category'
            className='flex-1 mb-0'
          >
            <Select />
          </Form.Item>
          <Form.Item<SelectType>
            label='标签'
            name='category'
            className='flex-1 mb-0'
          >
            <Select mode='multiple' allowClear />
          </Form.Item>
          <div className='w-1/6 mb-0 flex justify-end'>
            <Space size='middle'>
              <Button>重置</Button>
              <Button type='primary'>保存</Button>
            </Space>
          </div>
        </Form>
      </Card>
      <Card>
        <div className="flex justify-between items-center pb-5 ">
          <div className="flex">
            <Space size="middle">
              <Button className="flex flex-row items-center"><UploadOutlined/><span>文件读取</span></Button>
              <div>2023.03.24-测试文件.md</div>
            </Space>
          </div>
        </div>
        <MDEditor height={'600px'} value={value} onChange={(value) => setValue(value || '')} />
      </Card>
    </>
  )
}
