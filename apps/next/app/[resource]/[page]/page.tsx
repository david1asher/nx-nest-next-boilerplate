'use client';
import React from 'react';
import Link from 'next/link';
import { SWAPIResponse } from '@nx-nest-next-boilerplate/types';
import { useRequest } from '../../../hooks/useRequest';
import { useDebounceState } from '../../../hooks/useDebounceState';

interface TableProps {
  params: {
    page?: number;
    resource: string;
  };
}

export const Table: React.FC<TableProps> = (props: TableProps) => {
  const page = Number(props.params.page || 1);

  const [debouncedSearch, setSearch, unDebouncedSearch] =
    useDebounceState<string>('', 300);

  const url = `${process.env.BASE_URL}/api/${
    props.params.resource
  }?page=${page}&search=${encodeURIComponent(debouncedSearch)}`;

  const [data, isLoading, error] = useRequest<SWAPIResponse>(url, 'GET', null, [
    page,
    debouncedSearch,
  ]);

  const columns = data && data.results ? Object.keys(data.results[0]) : [];
  const totalPages = data ? Math.ceil(data.count / 10) : 0;

  return (
    <div className="container mx-auto mt-8 p-4 max-w-full overflow-none">
      <div className="flex justify-between mb-4">
        {page > 1 && (
          <Link href={`/${props.params.resource}/${page - 1}`} replace>
            <button className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md">
              Previous
            </button>
          </Link>
        )}
        <input
          type="text"
          value={unDebouncedSearch}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search By Name"
          className="p-2 border rounded-lg"
        />
        {page < totalPages && (
          <Link href={`/${props.params.resource}/${page + 1}`} replace>
            <button className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md">
              Next
            </button>
          </Link>
        )}
      </div>
      <div className="overflow-auto">
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="text-red-500">{error.message}</div>
        ) : (
          <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
            <thead>
              <tr>
                {columns.map((column: string) => (
                  <th
                    key={column}
                    className="px-6 py-3 bg-gray-800 text-white text-left text-xs font-semibold uppercase"
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data &&
                (data.results || []).map((item: any, index: number) => (
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
        )}
      </div>
    </div>
  );
};

export default Table;
