"use client";

import { faPen, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import modalDelete from "../component/DeleteAlert";

export default function Produk() {
  const router = useRouter();
  const [produk, setProduk] = useState([]);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({
    id: "",
    nama_produk: "",
  });
  const [showDataStatus, setShowDataStatus] = useState("1");

  useEffect(() => {
    const fetchProduk = async () => {
      try {
        const res = await fetch(`/api/produk?status_id=${showDataStatus}`);
        const data = await res.json();
        setProduk(data);
      } catch (error) {
        return alert(error);
      }
    };

    fetchProduk();
  }, [showDataStatus, showDelete]);

  return (
    <div className="flex justify-center h-screen p-10">
      <div className="h-auto h-auto bg-white">
        <div className="flex w-full justify-between text-white font-thin rounded-[5px] text-center mb-2 bg-slate-100 h-[8vh] items-center px-5">
          <Link
            href={"/produk/add"}
            className="flex bg-blue-600 hover:bg-blue-800 rounded"
          >
            <FontAwesomeIcon
              icon={faPlus}
              className="text-center px-2 py-2 w-[2vw]"
            />
            <p className="text-center px-2 py-1 w-[4vw]">Add</p>
          </Link>
          <div className="w-auto h-1/2">
            <select
              defaultValue={"1"}
              className="rounded bg-green-500 h-full"
              name="show"
              onChange={(e: any) => setShowDataStatus(e.target.value)}
            >
              <option value="">semua</option>
              <option value="1">Bisa Dijual</option>
              <option value="2">Tidak Bisa Dijual</option>
            </select>
          </div>
        </div>
        <section className="w-full px-4 h-auto">
          <table className="w-full h-auto flex flex-col">
            <thead className="w-full">
              <tr className="flex w-full justify-between text-slate-500">
                <th className="flex justify-center w-1/12 px-2 py-2 border">
                  <h3>No</h3>
                </th>
                <th className="flex justify-center w-4/12 px-1 py-2 border">
                  <h3>Nama Produk</h3>
                </th>
                <th className="flex justify-center w-2/12 px-1 py-2 border">
                  <h3>Kategori</h3>
                </th>
                <th className="flex justify-center w-1/12 px-2 py-2 border">
                  <h3>Harga</h3>
                </th>
                <th className="flex justify-center w-2/12 px-1 py-2 border">
                  <h3>Status</h3>
                </th>
                <th className="flex justify-center w-2/12 px-1 py-2 border">
                  <h3>Actions</h3>
                </th>
              </tr>
            </thead>
            <tbody className="w-full">
              {produk.map((item: any, index: any) => (
                <tr
                  className="flex w-full justify-center text-slate-500"
                  key={index}
                >
                  <td className="flex justify-center w-1/12 px-1 py-2 border">
                    {index + 1}
                  </td>
                  <td className="flex justify-start w-4/12 px-1 py-2 border">
                    {item.nama_produk}
                  </td>
                  <td className="flex justify-center w-2/12 px-1 py-2 border">
                    {item.nama_kategori}
                  </td>
                  <td className="flex justify-center w-1/12 px-1 py-2 border">
                    {item.harga}
                  </td>
                  <td className="flex justify-center w-2/12 px-1 py-2 border">
                    {item.nama_status}
                  </td>
                  <td className="w-2/12 px-1 py-2 border">
                    <div className="flex justify-center gap-4">
                      <button
                        className="text-white bg-green-600 w-3/12 rounded-[50%] px-1 py-3 hover:bg-green-800"
                        onClick={() => {
                          router.push(`/produk/edit/${item.id_produk}`);
                        }}
                      >
                        <FontAwesomeIcon icon={faPen} />
                      </button>
                      <button
                        className="text-white bg-red-600 w-3/12 rounded-[50%] px-1 py-3 hover:bg-red-800"
                        onClick={() => {
                          setSelectedProduct({
                            id: item.id_produk,
                            nama_produk: item.nama_produk,
                          });
                          setShowDelete(true);
                        }}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
      {/* modal start */}

      {showDelete
        ? modalDelete(setShowDelete, selectedProduct, produk, setProduk)
        : ""}
      {/* modal end */}
    </div>
  );
}

// 1. menampilkan semua produk, dijual, tidak dijual DONE
// 2. delete asyncronus
// 3. menjelaskan atau mendemonstarsikan tugas dan kodingan
