import {Card} from 'antd'
import React from 'react'

export default function InfoCard({title, count, description, children}: {
  title: string,
  count: string,
  description: string,
  children: React.ReactNode
}) {
  return (
    <Card className="flex-1">
      <div className="text-gray-500">{title}</div>
      <div className="border-b h-28 py-2">
        <div className="text-4xl">{count}</div>
        {children}
      </div>
      <div className="pt-3">{description}</div>
    </Card>
  )
}
