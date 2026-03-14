'use client';

import { PieChart, Pie, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface VolumeData {
  tipo: string;
  quantidade: number;
}

export default function VolumeChart({ data }: { data: VolumeData[] }) {
  const COLORS = ['#3b82f6', '#1e293b', '#64748b'];

  const chartData = data.map((item, index) => ({
    name: item.tipo,
    value: item.quantidade,
    fill: COLORS[index % COLORS.length],
  }));

  return (
    <div className="mt-4 h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
            stroke="none"
          />
          <Tooltip
            formatter={(value: any) => [`${value} viagens`, 'Quantidade']}
            contentStyle={{
              borderRadius: '8px',
              border: 'none',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
            }}
          />
          <Legend verticalAlign="bottom" height={36} iconType="circle" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
