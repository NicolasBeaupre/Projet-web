import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });
//https://wzxjnovkxacrivulwwpc.supabase.co/rest/v1/Quiz quiz acces donné
export async function listInvoices() {
	const data = await sql`
    SELECT invoices.amount, customers.name
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE invoices.amount = 666;
  `;

	return data;
}

export async function GET() {
  const data = await listInvoices();
  return Response.json(data);
}
