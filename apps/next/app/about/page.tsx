async function getData() {
  const res = await fetch(`${process.env.BASE_URL}/api/greeting`);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export default async function About() {
  const data = await getData();
  return <div>{data.message}</div>;
}
