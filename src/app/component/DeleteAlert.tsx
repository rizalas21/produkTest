import React from "react";

interface DeleteAlertProps {
  id: string;
  nama_produk: string;
  onClose: () => void;
}

const DeleteAlert: React.FC<DeleteAlertProps> = ({
  id,
  nama_produk,
  onClose,
}) => {
  alert(`Yakin ingin menghapus ${nama_produk}?`); // Untuk debugging sementara
  return (
    <section className="flex w-screen h-screen inset-0 z-1000 absolute bg-black bg-opacity-40">
      <div className="flex flex-col gap-5">
        <div className="h-[32%]">
          <span
            className="text-gray-400 float-right font-size text-2xl font-bold hover:text-black hover:no-underline hover:cursor-pointer focus:text-black focus:no-underline focus:cursor-pointer"
            // onClick={closeModal}
          >
            &times;
          </span>
          <h2>Yakin ingin menghapus {nama_produk}?</h2>
        </div>
        <h3 className="content-center font-thin h-[32%] border-y border-gray-300 ">
          Select Logout to end your session
        </h3>
        <div className="h-[32%] flex justify-end items-end">
          <div className="flex justify-end items-end w-3/5">
            <button
              className="p-2.5 text-base cursor-pointer h-1/2 w-[35%] text-center mx-2.5 rounded text-white bg-gray-600 transition duration-300 ease-in-out hover:bg-gray-700"
              //   onClick={closeModal}
            >
              Cancel
            </button>
            <button
              className="p-2.5 text-base cursor-pointer h-1/2 w-[35%] text-center mx-2.5 rounded text-white bg-blue-600 text-white border-none transition ease hover:bg-blue-700"
              //   onClick={confirmLogout}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeleteAlert;
