"use client";
import { Label } from "recharts";
import { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#2563eb",
  "#16a34a",
  "#ea580c",
  "#9333ea",
  "#0891b2",
  "#dc2626",
];

type Expense = {
  Categoria_I: string;
  Categoria_II: string;
  Subcategoria: string;
  Coste: number;
};

type Props = {
  expenses: Expense[];
  total: number;
};

export default function ExpensesDashboard({
  expenses,
  total,
}: Props) {
  const categoryTotals = expenses.reduce(
    (acc: Record<string, number>, expense) => {
      const category = expense.Categoria_II;

      if (!acc[category]) {
        acc[category] = 0;
      }

      acc[category] += expense.Coste;

      return acc;
    },
    {}
  );

  const chartData = Object.entries(categoryTotals).map(
    ([name, value]) => ({
      name,
      value,
    })
  );

  const [selectedCategory, setSelectedCategory] =
  useState<string | null>(null);

  const categoryExpenses =
  selectedCategory === null
    ? []
    : expenses.filter(
        (e) =>
          e.Categoria_II === selectedCategory
      );

  const selectedTotal = categoryExpenses.reduce(
  (sum, expense) => sum + expense.Coste,
  0
);

const selectedPercentage =
  total > 0
    ? ((selectedTotal / total) * 100).toFixed(1)
    : "0";

  const subcategoryTotals = categoryExpenses.reduce(
    (acc: Record<string, number>, expense) => {

      const key = expense.Subcategoria;

      if (!acc[key]) {
        acc[key] = 0;
      }

      acc[key] += expense.Coste;

      return acc;

    },
    {}
  );

  const rightPanelData =
  selectedCategory === null
    ? categoryTotals
    : subcategoryTotals;

  const centerLabel =
  selectedCategory === null
    ? {
        amount: total,
        title: "Coste total",
        percentage: "100",
      }
    : {
        amount: selectedTotal,
        title: selectedCategory,
        percentage: selectedPercentage,
      };

  return (
    <div className="mt-10">

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <div className="rounded-xl border p-6">

          <h2 className="text-xl font-bold mb-4">
            Distribución de gastos
          </h2>

          <div className="h-96">

            <ResponsiveContainer>

              <PieChart>

                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={100}
                  outerRadius={140}
                  label={false}
                  onClick={(data: any) => {
                    if (data?.name) {
                        setSelectedCategory(data.name);
                    }
                    }}
                >

                  {chartData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={
                        COLORS[
                          index % COLORS.length
                        ]
                      }
                    />
                  ))}

                  <Label
                    content={({ viewBox }: any) => {

                        const { cx, cy } = viewBox;

                        return (
                        <g>

                            <text
                            x={cx}
                            y={cy - 15}
                            textAnchor="middle"
                            className="fill-black text-lg font-bold"
                            >
                            {centerLabel.amount.toLocaleString(
                                "es-ES",
                                {
                                style: "currency",
                                currency: "EUR",
                                maximumFractionDigits: 0,
                                }
                            )}
                            </text>

                            <text
                            x={cx}
                            y={cy + 15}
                            textAnchor="middle"
                            className="fill-gray-500 text-sm"
                            >
                            {centerLabel.title}
                            </text>

                            <text
                            x={cx}
                            y={cy + 35}
                            textAnchor="middle"
                            className="fill-gray-400 text-xs"
                            >
                            {centerLabel.percentage}%
                            </text>

                        </g>
                        );
                    }}
                    />

                </Pie>

                <Tooltip
                  formatter={(value: number) =>
                    value.toLocaleString("es-ES", {
                      style: "currency",
                      currency: "EUR",
                    })
                  }
                />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

        <div className="rounded-xl border p-6">

          <div className="flex justify-between items-center">

  <h2 className="text-xl font-bold">
    {selectedCategory ?? "Categorías"}
  </h2>

  {selectedCategory && (
    <button
      onClick={() =>
        setSelectedCategory(null)
      }
      className="
        text-sm
        text-blue-600
        hover:underline
      "
    >
      ← Volver
    </button>
  )}

</div>

          <div className="mt-6 space-y-3">

            {Object.entries(rightPanelData)
              .sort(
                (a, b) => b[1] - a[1]
              )
              .map(([name, value]) => (

                <div
                  key={name}
                  className="flex justify-between"
                >
                  <span>{name}</span>

                  <span>
                    {value.toLocaleString(
                      "es-ES",
                      {
                        style: "currency",
                        currency: "EUR",
                      }
                    )}
                  </span>
                </div>

              ))}

          </div>

        </div>

      </div>

    </div>
  );
}