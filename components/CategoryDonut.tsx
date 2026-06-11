"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#3b82f6",
  "#60a5fa",
  "#93c5fd",
  "#2563eb",
  "#1d4ed8",
  "#1e40af",
];

type Props = {
  data: {
    name: string;
    value: number;
  }[];
};

export default function CategoryDonut({
  data,
}: Props) {
  return (
    <div className="rounded-xl border p-6 mt-8">
      <h2 className="text-xl font-bold mb-4">
        Distribución de gastos
      </h2>

      <div className="h-96">

        <ResponsiveContainer>
          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={80}
              outerRadius={130}
              label
            >

              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={
                    COLORS[
                      index % COLORS.length
                    ]
                  }
                />
              ))}

            </Pie>

            <Tooltip />

          </PieChart>
        </ResponsiveContainer>

      </div>
    </div>
  );
}