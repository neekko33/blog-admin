import InfoCard from './InfoCard.tsx'
import {Card} from 'antd'
import CalendarHeatmap from 'react-calendar-heatmap'
import 'react-calendar-heatmap/dist/styles.css'

export default function Dashboard() {
  return (
    <>
      <div className="flex justify-around gap-3">
        <InfoCard title="总访问量" count={'3,721'} description="本周访问量：423 次">
          <h1>Content</h1>
        </InfoCard>
        <InfoCard title="文章总数" count={'41'} description="本周文章：1 篇">
          <h1>Content</h1>
        </InfoCard>
        <InfoCard title="分类总数" count={'3'} description="最多分类：开发">
          <h1>Content</h1>
        </InfoCard>
        <InfoCard title="标签总数" count={'8'} description="常用标签：JavaScript">
          <h1>Content</h1>
        </InfoCard>
      </div>
      <div className="flex mt-4 w-full gap-3">
        <Card className="flex-1" title="文章热力图">
          <CalendarHeatmap startDate={new Date('2023-01-01')}
                           endDate={new Date('2024-01-01')}
                           values={[
                             {date: '2023-05-01', count: 1},
                             {date: '2023-08-22', count: 3},
                             {date: '2023-10-30', count: 4}
                           ]}
                           classForValue={(value) => {
                             if (!value) return 'color-empty'
                             const count = value.count > 4 ? 4 : value.count
                             return `color-scale-${count}`
                           }}
          />
        </Card>
        <Card className="w-2/5" title="近期文章">
        </Card>
      </div>
    </>
  )
}
