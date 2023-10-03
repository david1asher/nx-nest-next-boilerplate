import Link from 'next/link';
import React from 'react';

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

export const Table: React.FC<TableProps> = async (props: TableProps) => {
  const page = Number(props.params.page || 1);
  const data = await getData(props.params.resource, page);

  if (!data.results || data.results.length === 0) {
    return <div className="text-red-500">Failed to fetch data</div>;
  }

  const columns = Object.keys(data.results[0]);
  const totalPages = Math.ceil(data.count / 10); // Assuming 10 items per page

  return (
    <div className="container mx-auto mt-8 p-4 max-w-full overflow-none">
      <div className="flex justify-between mb-4">
        {page > 1 && (
          <Link href={`/${props.params.resource}/${page - 1}`} replace>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md">
              Previous
            </button>
          </Link>
        )}
        {page < totalPages && (
          <Link href={`/${props.params.resource}/${page + 1}`} replace>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md">
              Next
            </button>
          </Link>
        )}
      </div>
      <div className="overflow-auto">
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
            {data.results.map((item: any, index: number) => (
              <tr
                key={item.name}
                className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
              >
                {columns.map((column: string) => (
                  <td
                    key={column}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 max-w-xs overflow-auto"
                  >
                    {item[column]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
