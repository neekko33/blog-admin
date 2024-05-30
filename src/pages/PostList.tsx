import type { ColumnsType } from 'antd/es/table'
import { Button, Card, Form, Input, Select, Space, Table, Tag } from 'antd'
import TableCard from '../components/TableCard.tsx'
import { PostType, SelectType } from '../index'

const columns: ColumnsType<PostType> = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title'
  },
  {
    title: '作者',
    dataIndex: 'author',
    key: 'author'
  },
  {
    title: '分类',
    dataIndex: 'category',
    key: 'category'
  },
  {
    title: '标签',
    dataIndex: 'tags',
    key: 'tags',
    render: (tags: string[]) => (
      <>
        {tags.map(tag => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </>
    )
  },
  {
    title: '创建时间',
    dataIndex: 'creatAt',
    key: 'creatAt'
  },
  {
    title: '修改时间',
    dataIndex: 'updateAt',
    key: 'updateAt'
  },
  {
    title: '状态',
    dataIndex: 'published',
    key: 'published',
    render: (published: boolean) => (
      <Tag color={published ? 'green' : 'default'}>
        {published ? '已发布' : '未发布'}
      </Tag>
    )
  },
  {
    title: '操作',
    key: 'setting',
    render: () => (
      <Space size='middle'>
        <a className='text-sky-500 hover:text-sky-600'>编辑</a>
        <a className='text-red-500 hover:text-red-600'>删除</a>
      </Space>
    )
  }
]

const data: PostType[] = [
  {
    id: '1',
    key: '1',
    title: '测试',
    content: 'test',
    author: 'Neekko33',
    category: '前端',
    published: false,
    tags: ['Javascript', '前端'],
    creatAt: '2023-03-11',
    updateAt: '2023-03-11'
  }
]

export default function PostList() {
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
              <Button type='primary'>筛选</Button>
            </Space>
          </div>
        </Form>
      </Card>
      <TableCard title='文章管理'>
        <Table columns={columns} dataSource={data} />
      </TableCard>
    </>
  )
}
