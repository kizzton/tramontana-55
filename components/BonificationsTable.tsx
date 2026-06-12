type Bonification = {
  Producto: string;
  Bonificacion: number;
  CosteAnual: number;
  Activo: string;
};

type Props = {
  data: Bonification[];
  mortgageAmount: number;
};

export default function BonificationsTable({
  data,
  mortgageAmount,
}: Props) {

  return (

    <div className="rounded-xl border p-6 mt-8">

      <h2 className="text-xl font-bold mb-4">
        Bonificaciones
      </h2>

      <table className="w-full">

        <thead>

          <tr className="border-b">

            <th className="text-left p-2">
              Producto
            </th>

            <th className="text-right p-2">
              %
            </th>

            <th className="text-right p-2">
              Coste
            </th>

            <th className="text-right p-2">
              Ahorro
            </th>

            <th className="text-right p-2">
              Neto
            </th>

          </tr>

        </thead>

        <tbody>

          {data.map(
            (item, index) => {

              const ahorro =
                mortgageAmount *
                (item.Bonificacion / 100);

              const neto =
                ahorro -
                item.CosteAnual;

              return (

                <tr
                  key={index}
                  className="border-b"
                >

                  <td className="p-2">
                    {item.Producto}
                  </td>

                  <td className="text-right p-2">
                    {Number(item.Bonificacion).toFixed(2)}%
                  </td>

                  <td className="text-right p-2">
                    {item.CosteAnual.toLocaleString(
                      "es-ES",
                      {
                        style: "currency",
                        currency: "EUR",
                      }
                    )}
                  </td>

                  <td className="text-right p-2">
                    {ahorro.toLocaleString(
                      "es-ES",
                      {
                        style: "currency",
                        currency: "EUR",
                      }
                    )}
                  </td>

                  <td
                    className={`text-right p-2 ${
                      neto >= 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {neto.toLocaleString(
                      "es-ES",
                      {
                        style: "currency",
                        currency: "EUR",
                      }
                    )}
                  </td>

                </tr>

              );

            }
          )}

        </tbody>

      </table>

    </div>

  );
}