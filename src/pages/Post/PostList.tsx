import type {ColumnsType} from 'antd/es/table'
import {notification, Space, Table, Tag, message as AntdMessage, Popconfirm} from 'antd'
import TableCard from '../../components/TableCard.tsx'
import {Post} from '../../index'
import {getPosts, deletePost, publishPost} from '../../apis/post.ts'
import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'

export default function PostList() {
  const [data, setData] = useState<Post[]>()
  const navigate = useNavigate()

  const handlePublish = async (id: string, isPublished: boolean) => {
    try {
      const {message} = await publishPost(id, isPublished)
      if (message === 'success') {
        AntdMessage.success('已修改发布状态！')
        await initialData()
      }
    } catch (e) {
      notification.error({
        message: '修改发布状态失败！',
        description: (e as object).toString()
      })
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const {message} = await deletePost(id)
      if (message === 'success') {
        AntdMessage.success('删除成功！')
        await initialData()
      }
    } catch (e) {
      notification.error({
        message: '删除失败！',
        description: (e as object).toString()
      })
    }
  }

  const initialData = async () => {
    const {data: {data}, message} = await getPosts()
    if (message === 'success') {
      setData(data)
    }
  }
  useEffect(() => {
    initialData().then()
  }, [])

  const columns: ColumnsType<Post> = [
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
    // {
    //   title: '作者',
    //   key: 'author',
    //   dataIndex: 'author',
    //   render: (_, record) => (
    //     <>{record.author?.name}</>
    //   )
    // },
    {
      title: '分类',
      dataIndex: 'category',
      key: 'category',
      render: (_, record) => (
        <>{record.category?.name}</>
      )
    },
    {
      title: '标签',
      dataIndex: 'tags',
      key: 'tags',
      render: (_, record) => (
        <>
          {record.tags.map(tag => (
            <Tag key={tag.name}>{tag.name}</Tag>
          ))}
        </>
      )
    },
    {
      title: '创建时间',
      dataIndex: 'createAt',
      key: 'createAt'
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
      render: (_, record) => (
        <Space size="middle">
          {
            record.published ? <a className="text-gray-400 hover:text-gray-600" onClick={() => handlePublish(record.id as string, false)}>隐藏</a> :
              <a className="text-green-400 hover:text-green-600" onClick={() => handlePublish(record.id as string, true)}>发布</a>
          }
          <a className="text-sky-500 hover:text-sky-600" onClick={() => navigate(`/post/edit?id=${record.id}`)}>编辑</a>
          <Popconfirm title="删除文章" description="确认删除该文章么？"
                      onConfirm={() => handleDelete(record.id as string)}
                      okText="确认" cancelText="取消">
            <a className="text-red-500 hover:text-red-600">删除</a>
          </Popconfirm>
        </Space>
      )
    }
  ]

  return (
    <>
      <TableCard title="文章管理" onRefresh={() => initialData()} onAdd={() => navigate('/post/edit')}>
        <Table columns={columns} dataSource={data} rowKey="id"/>
      </TableCard>
    </>
  )
}
