import KpiCard from "@/components/KpiCard";
import { getExpenses } from "@/lib/data";
import { getMortgageConfig } from "@/lib/hipoteca";

export default async function HipotecaPage() {

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

  const disponible =
    capitalConcedido -
    capitalDispuesto;

  const cuotaEstimada =
    capitalDispuesto *
    (tipoActual / 100) /
    12;

  return (

    <main className="p-8">

      <h1 className="text-3xl font-bold">
        Hipoteca
      </h1>

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
          title="Disponible"
          value={
            disponible.toLocaleString(
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

    </main>
  );
}