"use client";

import { faDatabase, faUndo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddProduk() {
  const [data, setData] = useState({
    nama_produk: "",
    harga: "",
    kategori_id: "",
    status_id: "",
  });
  const router = useRouter();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleSubmit = async () => {
    try {
      if (
        !data.nama_produk ||
        !data.harga ||
        !data.kategori_id ||
        !data.status_id
      ) {
        alert("mohon lengkapi data yang diperlukan!");
        return null;
      }
      const res = await fetch("/api/produk", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      router.push("/");
      return res;
    } catch (error) {
      return null;
    }
  };

  return (
    <section className="w-screen h-screen flex justify-center pt-10">
      <div className="h-4/5 w-4/5 flex flex-col shadow-2xl bg-white justify-between">
        <div className="flex w-full justify-center text-white font-thin rounded-[5px] text-center mb-2 bg-slate-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] h-[8vh] items-center pl-2">
          <p className="text-black font-medium text-xl">Tambahkan Produk</p>
        </div>
        <form className="flex flex-col p-10 gap-5" onSubmit={handleSubmit}>
          <div className="flex justify-between w-full h-[6vh] rounded">
            <label>Nama Produk</label>
            <input
              placeholder="Produk"
              type="nama_produk"
              className="w-4/5 border p-1.5 drop-shadow"
              name="nama_produk"
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex justify-between w-full h-[6vh] rounded">
            <label>Harga</label>
            <input
              placeholder="Harga"
              type="number"
              className="w-4/5 border p-1.5 drop-shadow"
              name="harga"
              min={1}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex justify-between w-full h-[6vh] rounded">
            <label>Kategori</label>
            <select
              className="w-4/5 border p-1.5 drop-shadow"
              name="kategori_id"
              onChange={handleChange}
              required
              defaultValue={"DEFAULT"}
            >
              <option disabled value={"DEFAULT"}>
                pilih kategori
              </option>
              <option value="1">L QUEENLY</option>
              <option value="2">L MTH AKSESORIS (IM)</option>
              <option value="3">L MTH TABUNG (LK)</option>
              <option value="4">SP MTH SPAREPART (LK)</option>
              <option value="5">CI MTH TINTA LAIN (IM)</option>
              <option value="6">S MTH STEMPEL (IM)</option>
            </select>
          </div>
          <div className="flex justify-between w-full h-[6vh] rounded">
            <label>Status</label>
            <select
              className="w-4/5 border p-1.5 drop-shadow"
              name="status_id"
              onChange={handleChange}
              required
              defaultValue={"DEFAULT"}
            >
              <option disabled value={"DEFAULT"}>
                pilih status
              </option>
              <option value="1">Bisa Dijual</option>
              <option value="2">Tidak Bisa Dijual</option>
            </select>
          </div>
        </form>
        <div className="flex w-full justify-start text-white font-thin rounded-[5px] text-center mb-2 bg-slate-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] h-[8vh] items-center gap-5 px-5 py-2">
          <button
            className="rounded flex w-auto h-full justify-between items-center h-4/5 bg-green-500 hover:bg-green-700"
            type="submit"
            onClick={handleSubmit}
          >
            <FontAwesomeIcon
              className="text-center px-2 py-2 w-1/5 text-white"
              icon={faDatabase}
            />
            <p className="text-center px-2 py-2 w-4/5 text-white font-medium">
              Tambah
            </p>
          </button>
          <button className="rounded flex w-auto h-full justify-between items-center h-4/5 bg-yellow-500 hover:bg-yellow-700">
            <FontAwesomeIcon
              className="text-center px-2.5 py-2 w-1/5 text-white"
              icon={faUndo}
            />
            <p
              className="text-center px-2.5 py-2 w-4/5 text-white font-medium"
              onClick={() => router.back()}
            >
              Batal
            </p>
          </button>
        </div>
      </div>
    </section>
  );
}
