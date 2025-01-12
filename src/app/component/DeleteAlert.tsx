const modalDelete = (
  setShowDelete: any,
  selectedProduct: any,
  produk: any,
  setProduk: any
) => {
  async function confirmDelete({ id }: { id: any }) {
    const res = await fetch(`/api/produk/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setProduk(produk.filter((data: any) => data.id !== id));
      setShowDelete(false);
    } else {
      console.error("Failed to delete the product");
      alert("Gagal menghapus produk. Silakan coba lagi.");
    }
  }
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

export default modalDelete;
