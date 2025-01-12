"use client";

import {
  faCircleInfo,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Produk() {
  const router = useRouter();
  const [produk, setProduk] = useState([]);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({
    id: "",
    nama_produk: "",
  });

  async function confirmDelete({ id }: { id: any }) {
    const res = await fetch(`/api/produk/${id}`, {
      method: "DELETE",
    });
    setShowDelete(false);
    return res;
  }

  const modalDelete = () => {
    return (
      <section className="flex w-screen h-screen inset-0 z-1000 fixed bg-black bg-opacity-40 justify-center py-20 ">
        <div className="flex flex-col gap-5 bg-white h-3/5 w-1/2 p-5">
          <div className="h-[32%]">
            <span
              className="text-gray-400 float-right font-size text-2xl font-bold hover:text-black hover:no-underline hover:cursor-pointer focus:text-black focus:no-underline focus:cursor-pointer"
              onClick={() => setShowDelete(false)}
            >
              &times;
            </span>
            <p className="text-xl">Hapus Data</p>
          </div>
          <h3 className="content-center font-thin h-[32%] border-y border-gray-300 ">
            Yakin ingin menghapus '{selectedProduct.nama_produk}' ?
          </h3>
          <div className="h-[32%] flex justify-end items-end">
            <div className="flex justify-end items-end w-3/5">
              <button
                className="p-2.5 text-base cursor-pointer h-1/2 w-[35%] text-center mx-2.5 rounded text-white bg-gray-600 transition duration-300 ease-in-out hover:bg-gray-700"
                onClick={() => setShowDelete(false)}
              >
                Cancel
              </button>
              <button
                className="p-2.5 text-base cursor-pointer h-1/2 w-[35%] text-center mx-2.5 rounded text-white bg-blue-600 text-white border-none transition ease hover:bg-blue-700"
                onClick={() => confirmDelete({ id: selectedProduct.id })}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  };

  useEffect(() => {
    const fetchProduk = async () => {
      try {
        const res = await fetch("/api/produk");
        const data = await res.json();
        setProduk(data);
      } catch (error) {
        console.log("error when fetch users", error);
        return null;
      }
    };

    fetchProduk();
  }, []);

  return (
    <div className="flex justify-center h-screen p-10">
      <div className="h-auto h-auto bg-white">
        <div className="flex w-full justify-start text-white font-thin rounded-[5px] text-center mb-2 bg-slate-100 h-[8vh] items-center pl-2">
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
        </div>
        <section className="w-full px-4 h-auto">
          <table className="w-full h-auto flex flex-col">
            <thead className="w-full">
              <tr className="flex w-full justify-between text-slate-500">
                <th className="flex justify-between w-1/12 px-2 py-2 border">
                  <h3>Id</h3>
                </th>
                <th className="flex justify-between w-3/12 px-1 py-2 border">
                  <h3>Nama Produk</h3>
                </th>
                <th className="flex justify-between w-2/12 px-1 py-2 border">
                  <h3>Kategori</h3>
                </th>
                <th className="flex justify-between w-2/12 px-2 py-2 border">
                  <h3>Harga</h3>
                </th>
                <th className="flex w-2/12 px-1 py-2 border">
                  <h3>Status</h3>
                </th>
                <th className="flex w-2/12 px-1 py-2 border">
                  <h3>Actions</h3>
                </th>
              </tr>
            </thead>
            <tbody className="w-full">
              {produk.map((item: any, index: any) => (
                <tr
                  className="flex w-full justify-between text-slate-500"
                  key={index}
                >
                  <td className="w-1/12 px-1 py-2 border">{index + 1}</td>
                  <td className="w-3/12 px-1 py-2 border">
                    {item.nama_produk}
                  </td>
                  <td className="w-2/12 px-1 py-2 border">
                    {item.nama_kategori}
                  </td>
                  <td className="w-2/12 px-1 py-2 border">{item.harga}</td>
                  <td className="w-2/12 px-1 py-2 border">
                    {item.nama_status}
                  </td>
                  <td className="w-2/12 px-1 py-2 border">
                    <div className="flex gap-4">
                      <button
                        className="text-white bg-green-600 w-3/12 rounded-[50%] px-1 py-3 hover:bg-green-800"
                        onClick={() => {
                          router.push(`/produk/edit/${item.id_produk}`);
                        }}
                      >
                        <FontAwesomeIcon icon={faCircleInfo} />
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

      {showDelete ? modalDelete() : ""}
      {/* modal end */}
    </div>
  );
}
