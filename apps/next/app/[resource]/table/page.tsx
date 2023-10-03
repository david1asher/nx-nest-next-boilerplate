'use client';

import Link from 'next/link';

import { useSearchParams } from 'next/navigation';

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
  const searchParams = useSearchParams();
  const pageStr = searchParams.get('page');
  const page = Number(pageStr || 1);

  const data = await getData(props.params.resource, page);

  const pages = Math.ceil(data.count / 10);

  if (data.results) {
    return (
      <div className="container mx-auto mt-8">
        <div className="flex justify-between mb-4">
          <Link
            href={`/${props.params.resource}/table?page=${page - 1}`}
            replace
          >
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md">
              Previous
            </button>
          </Link>
          <Link
            href={`/${props.params.resource}/table?page=${page + 1}`}
            replace
          >
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md">
              Next
            </button>
          </Link>
        </div>
        <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-blue-500 text-white text-left text-xs font-semibold uppercase">
                Name
              </th>
              <th className="px-6 py-3 bg-blue-500 text-white text-left text-xs font-semibold uppercase">
                Rotation Period
              </th>
              <th className="px-6 py-3 bg-blue-500 text-white text-left text-xs font-semibold uppercase">
                Orbital Period
              </th>
              <th className="px-6 py-3 bg-blue-500 text-white text-left text-xs font-semibold uppercase">
                Diameter
              </th>
              <th className="px-6 py-3 bg-blue-500 text-white text-left text-xs font-semibold uppercase">
                Climate
              </th>
              <th className="px-6 py-3 bg-blue-500 text-white text-left text-xs font-semibold uppercase">
                Gravity
              </th>
              <th className="px-6 py-3 bg-blue-500 text-white text-left text-xs font-semibold uppercase">
                Terrain
              </th>
              <th className="px-6 py-3 bg-blue-500 text-white text-left text-xs font-semibold uppercase">
                Surface Water
              </th>
              <th className="px-6 py-3 bg-blue-500 text-white text-left text-xs font-semibold uppercase">
                Population
              </th>
            </tr>
          </thead>
          <tbody>
            {data.results.map((planet: any, index: number) => (
              <tr
                key={planet.name}
                className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
              >
                <td className="px-6 py-4 whitespace-no-wrap text-sm font-medium text-gray-800">
                  {planet.name}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap text-sm text-gray-600">
                  {planet.rotation_period}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap text-sm text-gray-600">
                  {planet.orbital_period}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap text-sm text-gray-600">
                  {planet.diameter}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap text-sm text-gray-600">
                  {planet.climate}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap text-sm text-gray-600">
                  {planet.gravity}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap text-sm text-gray-600">
                  {planet.terrain}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap text-sm text-gray-600">
                  {planet.surface_water}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap text-sm text-gray-600">
                  {planet.population}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  } else {
    return <div className="text-red-500">Failed to fetch data</div>;
  }
}

export default Table;
