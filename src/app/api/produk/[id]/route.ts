import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";
import db from "../../pg";

export async function GET(
  req: NextApiRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  try {
    console.log(id);
    const { rows } = await db.query(
      "SELECT * FROM produk WHERE id_produk = $1",
      [id]
    );
    return NextResponse.json(rows[0]);
  } catch (error) {
    console.log(error);
  }
}

export async function DELETE(
  req: NextApiRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  try {
    const res = await db.query(
      "DELETE FROM produk WHERE id_produk = $1 RETURNING *",
      [id]
    );
    return NextResponse.json(res);
  } catch (error) {
    console.log(error);
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const input = await req.json();
  try {
    const res = await db.query(
      "UPDATE produk SET nama_produk = $1, harga = $2, kategori_id = $3, status_id = $4 WHERE id_produk = $5",
      [input.nama_produk, input.harga, input.kategori_id, input.status_id, id]
    );
    return NextResponse.json(res);
  } catch (error) {
    console.log(error);
  }
}
