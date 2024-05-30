import React from 'react'
import {Button, Card, Space} from 'antd'
import {PlusOutlined, ReloadOutlined} from '@ant-design/icons'

export default function TableCard({title, children}: { title: string, children: React.ReactNode }) {
  return (
    <Card>
      <div className="flex justify-between items-center pb-5 ">
        <div className="text-xl">{title}</div>
        <div className="flex">
          <Space size="middle">
            <Button className="flex flex-row items-center"><ReloadOutlined/><span>刷新</span></Button>
            <Button type="primary" className="flex flex-row items-center"><PlusOutlined/><span>新增</span></Button>
          </Space>
        </div>
      </div>
      {children}
    </Card>
  )
}
