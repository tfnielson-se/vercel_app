import { sql } from "@vercel/postgres";

export default async function User({
}): Promise<JSX.Element> {
  const { rows } = await sql`SELECT * from USER`;

  return (
    <div>
      {rows.map((row) => (
        <div key={row.id}>
          {row.id} - {row.quantity}
        </div>
      ))}
    </div>
  );
}