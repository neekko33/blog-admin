import TableCard from '../../components/TableCard.tsx'
import {Input, Modal, message as antdMessage, Space, Table, notification, Popconfirm} from 'antd'
import {ColumnsType} from 'antd/es/table'
import {useEffect, useState} from 'react'
import {addCategory, deleteCategory, getCategories, updateCategory} from '../../apis/category.ts'
import type {Category} from '../../index'

export default function Category() {
  const [categories, setCategories] = useState<Category[]>()
  const [open, setOpen] = useState<boolean>(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [text, setText] = useState('')
  const [editId, setEditId] = useState<number | null>(null)

  const columns: ColumnsType<Category> = [
    {
      title: '序号',
      key: 'id',
      render: (_text, _record, index) => (
        <>{index + 1}</>
      )
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '文章数量',
      key: 'postCount',
      render: (_, record) => (
        <>{record.posts?.length ?? 0}</>
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
      title: '操作',
      key: 'setting',
      render: (_, record) => (
        <Space size="middle">
          <a className="text-sky-500 hover:text-sky-600" onClick={() => onEdit(record)}>编辑</a>
          <Popconfirm title="删除分类" description="确认删除该分类么？" onConfirm={() => onDelete(record.id as string)}
                      okText="确认" cancelText="取消">
            <a className="text-red-500 hover:text-red-600">删除</a>
          </Popconfirm>
        </Space>
      )
    }
  ]

  const onEdit = (record: Category) => {
    setText(record.name)
    setEditId(Number(record.id))
    setOpen(true)
  }

  const initialData = async () => {
    const {data: {data}} = await getCategories()
    setCategories(data)
  }

  const handleOk = async () => {
    setConfirmLoading(true)
    try {
      let message: string
      let type: string
      if (!editId) {
        const res = await addCategory(text)
        message = res.message
        type = '新增'
      } else {
        const res = await updateCategory(editId, text)
        message = res.message
        type = '修改'
      }
      if (message === 'success') {
        antdMessage.success(type + '成功！')
        setConfirmLoading(false)
        setOpen(false)
        setText('')
        await initialData()
      } else {
        notification.error({
          message: type + '错误',
          description: message
        })
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleCancel = () => {
    setEditId(null)
    setText('')
    setOpen(false)
  }

  const onDelete = async (recordId: string) => {
    try {
      const {message} = await deleteCategory(Number(recordId))
      if (message === 'success') {
        antdMessage.success('删除成功！')
        await initialData()
      } else {
        notification.error({
          message: '删除错误',
          description: message
        })
      }
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    initialData().then()
  }, [])

  return (
    <TableCard title="分类管理" onRefresh={() => initialData()} onAdd={() => setOpen(true)}>
      <Modal title="编辑名称" open={open} onOk={handleOk} onCancel={handleCancel}
             confirmLoading={confirmLoading} cancelText="取消">
        <Input className="my-5" value={text} onChange={(e) => setText(e.target.value)}/>
      </Modal>
      <Table columns={columns} dataSource={categories} rowKey="id"/>
    </TableCard>
  )
}
