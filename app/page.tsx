import { getExpenses } from "@/lib/data";
import KpiCard from "@/components/KpiCard";
import ExpensesDashboard from "@/components/ExpensesDashboard";

export default async function Home() {
  const expenses = await getExpenses();

  console.log(expenses.slice(0, 5));

  const total = expenses.reduce(
    (sum: number, item: any) => sum + item.Coste,
    0
  );

  const categoryTotals = expenses.reduce(
    (acc: Record<string, number>, expense: any) => {

      const category =
        expense.Categoria_II;

      if (!acc[category]) {
        acc[category] = 0;
      }

      acc[category] += expense.Coste;

      return acc;
    },
    {}
  );

  const chartData = Object.entries(
    categoryTotals
  ).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">
        CASA BAMM!
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">

        <KpiCard
          title="Coste acumulado"
          value={total.toLocaleString("es-ES", {
            style: "currency",
            currency: "EUR",
          })}
        />

        <KpiCard
          title="Hipoteca dispuesta"
          value="13.500 €"
        />

        <KpiCard
          title="Ahorros invertidos"
          value="50.321 €"
        />

        <KpiCard
          title="Valor estimado"
          value="475.000 €"
        />

      </div>

      <ExpensesDashboard
        expenses={expenses}
        total={total}
      />

      <details className="mt-6">
        <summary className="cursor-pointer font-semibold">
          Ver movimientos
        </summary>

        <table className="mt-8 border-collapse">
          <thead>
            <tr>
              <th className="border p-2">Fecha</th>
              <th className="border p-2">Concepto</th>
              <th className="border p-2">Coste</th>
            </tr>
          </thead>

          <tbody>
            {expenses.map((expense: any, index: number) => (
              <tr key={index}>
                <td className="border p-2">{expense.Fecha}</td>
                <td className="border p-2">{expense.Concepto}</td>
                <td className="border p-2">
                  {expense.Coste.toLocaleString("es-ES", {
                    style: "currency",
                    currency: "EUR",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </main>
  );
}