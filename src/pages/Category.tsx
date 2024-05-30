import TableCard from '../components/TableCard.tsx'
import { Space, Table } from 'antd'
import { CategoryType } from '../index'
import { ColumnsType } from 'antd/es/table'

const columns: ColumnsType<CategoryType> = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '文章数量',
    dataIndex: 'postCount',
    key: 'postCount'
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
    render: () => (
      <Space size='middle'>
        <a className='text-sky-500 hover:text-sky-600'>编辑</a>
        <a className='text-red-500 hover:text-red-600'>删除</a>
      </Space>
    )
  }
]

const data: CategoryType[] = [
  {
    id: '1',
    key: '1',
    name: '前端',
    createAt: '2024-04-22',
    updateAt: '2024-05-28',
    postCount: 10
  }
]

export default function Category() {
  return (
    <TableCard title='分类管理'>
      <Table columns={columns} dataSource={data} />
    </TableCard>
  )
}
