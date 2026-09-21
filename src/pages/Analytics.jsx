import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
} from 'recharts'
import Layout from '../components/Layout'
import DemoBadge from '../components/DemoBadge'
import {
  confidenceDistribution,
  statusDistribution,
  missionDistribution,
  detectionTimeline,
} from '../data/demoData'

const tooltipStyle = {
  background: '#0f1c2c',
  border: '1px solid rgba(51,193,214,0.2)',
  borderRadius: 8,
  fontSize: 12,
  color: '#e2e8f0',
}

export default function Analytics() {
  return (
    <Layout title="Analytics" subtitle="Detection trends across confidence, status, and missions">
      <div className="flex justify-end mb-4">
        <DemoBadge label="DEMO DATA" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <ChartCard title="Detection Distribution">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={[{ name: 'Shipwreck', count: 83 }]}>
              <CartesianGrid strokeDasharray="3 3" stroke="#16283a" vertical={false} />
              <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'rgba(51,193,214,0.06)' }} />
              <Bar dataKey="count" fill="#33c1d6" radius={[6, 6, 0, 0]} maxBarSize={64} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Confidence Distribution">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={confidenceDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="#16283a" vertical={false} />
              <XAxis dataKey="bucket" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'rgba(51,193,214,0.06)' }} />
              <Bar dataKey="count" fill="#5fd8e8" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Detection Status">
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={statusDistribution}
                dataKey="value"
                nameKey="name"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={3}
              >
                {statusDistribution.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} stroke="none" />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
              <Legend
                verticalAlign="bottom"
                iconType="circle"
                iconSize={8}
                formatter={(value) => <span className="text-slate-400 text-xs">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Mission Distribution">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={missionDistribution} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#16283a" horizontal={false} />
              <XAxis type="number" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis type="category" dataKey="mission" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} width={90} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'rgba(51,193,214,0.06)' }} />
              <Bar dataKey="detections" fill="#1ea3b8" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Detection Timeline" className="lg:col-span-2">
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={detectionTimeline}>
              <CartesianGrid strokeDasharray="3 3" stroke="#16283a" vertical={false} />
              <XAxis dataKey="day" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line
                type="monotone"
                dataKey="detections"
                stroke="#5fd8e8"
                strokeWidth={2}
                dot={{ r: 3, fill: '#5fd8e8' }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </Layout>
  )
}

function ChartCard({ title, children, className = '' }) {
  return (
    <div className={`panel p-5 ${className}`}>
      <h3 className="text-xs font-semibold tracking-wide text-slate-400 mb-3">{title}</h3>
      {children}
    </div>
  )
}
