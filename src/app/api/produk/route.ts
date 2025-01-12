import { NextRequest, NextResponse } from "next/server";
import db from "../pg";

export async function GET(req: NextRequest) {
  try {
    const { rows } = await db.query(
      `SELECT p.id_produk, p.nama_produk, k.nama_kategori, p.harga, s.nama_status FROM produk p LEFT JOIN kategori k ON p.kategori_id = k.id_kategori LEFT JOIN status s ON p.status_id = s.id_status WHERE s.id_status = '1'`
    );
    return NextResponse.json(rows);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const input = await req.json();
    const random = Math.random() * 100000000;
    const id = Math.ceil(random);
    const { rows } = await db.query(
      `INSERT INTO produk (id_produk, nama_produk, harga, kategori_id, status_id)
      VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [id, input.nama_produk, input.harga, input.kategori_id, input.status_id]
    );
    return NextResponse.json(rows);
  } catch (error) {
    console.log(error);
    return error;
  }
}
