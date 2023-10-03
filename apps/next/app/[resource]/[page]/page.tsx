import Link from 'next/link';

async function getData(resource: string, page = 1) {
  const res = await fetch(
    `${process.env.BASE_URL}/api/${resource}?page=${page}`
  );
  if (!res.ok) {
    console.log(res);
    return 'Failed to fetch data';
  }
  return res.json();
}

export interface TableProps {
  params: {
    page?: number;
    resource: string;
  };
}

export async function Table(props: TableProps) {
  const page = Number(props.params.page || 1);
  const data = await getData(props.params.resource, page);

  if (!data.results || data.results.length === 0) {
    return <div className="text-red-500">Failed to fetch data</div>;
  }

  // Infer column headers from the keys of the first data object
  const columns = Object.keys(data.results[0]);

  return (
    <div className="container mx-auto mt-8">
      <div className="flex justify-between mb-4">
        <Link href={`/${props.params.resource}/${page - 1}`} replace>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md">
            Previous
          </button>
        </Link>
        <Link href={`/${props.params.resource}/${page + 1}`} replace>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md">
            Next
          </button>
        </Link>
      </div>
      <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <thead>
          <tr>
            {columns.map((column: string) => (
              <th
                key={column}
                className="px-6 py-3 bg-blue-500 text-white text-left text-xs font-semibold uppercase"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.results.map((planet: any, index: number) => (
            <tr
              key={planet.name}
              className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
            >
              {columns.map((column: string) => (
                <td
                  key={column}
                  className="px-6 py-4 whitespace-no-wrap text-sm text-gray-600"
                >
                  {planet[column]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
