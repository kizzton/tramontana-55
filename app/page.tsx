import { getExpenses } from "@/lib/data";
import KpiCard from "@/components/KpiCard";
import ExpensesDashboard from "@/components/ExpensesDashboard";
import { getMortgageConfig } from "@/lib/hipoteca";

export default async function Home() {
  const expenses = await getExpenses();

  const projectExpenses = expenses.filter(
    (item: any) =>
      item.Tipo === "Gasto"
  );

  console.log(projectExpenses.slice(0, 5));

  const total = projectExpenses.reduce(
    (sum: number, item: any) => sum + item.Coste,
    0
  );

  const categoryTotals = projectExpenses.reduce(
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

  const mortgage =
  await getMortgageConfig();

  const movements =
    await getExpenses();

  const capitalConcedido =
  Number(
    mortgage["Capital concedido"]
  );

  const today = new Date();

    const fechaCambio =
    new Date(
        mortgage["Fecha cambio"] as string
    );

  const tipoActual =
  today < fechaCambio
    ? Number(
        mortgage["Tipo inicial"]
      )
    : Number(
        mortgage[
          "Tipo sin bonificar"
        ]
      );

  const capitalDispuesto =
    movements
      .filter(
        (m: any) =>
          m.Tipo ===
          "Disposicion hipoteca"
      )
      .reduce(
        (
          sum: number,
          m: any
        ) => sum + m.Coste,
        0
      );

  const cuotaEstimada =
    capitalDispuesto *
    (tipoActual / 100) /
    12;

    const capitalAmortizado =
  movements
    .filter(
      (m: any) =>
        m.Tipo === "Amortizacion"
    )
    .reduce(
      (sum: number, m: any) =>
        sum + m.Coste,
      0
    );

    const interesesPagados =
  movements
    .filter(
      (m: any) =>
        m.Tipo === "Cuota hipoteca" &&
        m.Subcategoria === "Intereses"
    )
    .reduce(
      (sum: number, m: any) =>
        sum + m.Coste,
      0
    );

    const costeBonificaciones =
  movements
    .filter(
      (m: any) =>
        m.Tipo ===
        "Producto bonificable"
    )
    .reduce(
      (sum: number, m: any) =>
        sum + m.Coste,
      0
    );

    const comisiones =
  movements
    .filter(
      (m: any) =>
        m.Tipo === "Comision"
    )
    .reduce(
      (sum: number, m: any) =>
        sum + m.Coste,
      0
    );

    const totalPagadoBanco =
  capitalAmortizado +
  interesesPagados +
  costeBonificaciones +
  comisiones;

  const costeFinanciero =
  interesesPagados +
  costeBonificaciones +
  comisiones;

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

      </div>

      <h2 className="text-2xl font-bold mt-6">
        Hipoteca
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">

        <KpiCard
          title="Capital concedido"
          value={
            capitalConcedido.toLocaleString(
              "es-ES",
              {
                style: "currency",
                currency: "EUR",
              }
            )
          }
        />

        <KpiCard
          title="Capital dispuesto"
          value={
            capitalDispuesto.toLocaleString(
              "es-ES",
              {
                style: "currency",
                currency: "EUR",
              }
            )
          }
        />

        <KpiCard
        title="Tipo actual"
        value={`${tipoActual.toFixed(2)} %`}
        />

        <KpiCard
          title="Próxima cuota"
          value={
            cuotaEstimada.toLocaleString(
              "es-ES",
              {
                style: "currency",
                currency: "EUR",
              }
            )
          }
        />

      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">

  <KpiCard
    title="Capital amortizado"
    value={capitalAmortizado.toLocaleString(
      "es-ES",
      {
        style: "currency",
        currency: "EUR",
      }
    )}
  />

  <KpiCard
    title="Intereses pagados"
    value={interesesPagados.toLocaleString(
      "es-ES",
      {
        style: "currency",
        currency: "EUR",
      }
    )}
  />

  <KpiCard
    title="Total pagado banco"
    value={totalPagadoBanco.toLocaleString(
      "es-ES",
      {
        style: "currency",
        currency: "EUR",
      }
    )}
  />

  <KpiCard
    title="Coste financiero"
    value={costeFinanciero.toLocaleString(
      "es-ES",
      {
        style: "currency",
        currency: "EUR",
      }
    )}
  />

</div>

      <ExpensesDashboard
        expenses={projectExpenses}
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
            {projectExpenses.map((expense: any, index: number) => (
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