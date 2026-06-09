import { getExpenses } from "@/lib/data";

export default async function Home() {
  const expenses = await getExpenses();

  const total = expenses.reduce(
    (sum: number, item: any) => sum + item.Coste,
    0
  );

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">
        Casa San Román
      </h1>

      <div className="mt-6 text-xl">
        Coste acumulado:
        {" "}
        {total.toLocaleString("es-ES", {
          style: "currency",
          currency: "EUR",
        })}
      </div>
    </main>
  );
}