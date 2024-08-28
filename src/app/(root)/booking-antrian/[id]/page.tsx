"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import logo from "@/../../public/assets/DesignLogoMpp.svg";
import Link from "next/link";
import { DataLayanan } from "@/types/type";
import { useRouter } from "next/navigation";
import parse from "html-react-parser";

export default function BookingAntrian({ params, }: { params: { id: number } }) {
  const [activeTab, setActiveTab] = useState("Persyaratan");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [kode, setKode] = useState<any>(null);
  const [layananList, setLayananList] = useState<DataLayanan>();
  const [error, setError] = useState<string | null>(null);
  const [modalTimer, setModalTimer] = useState<NodeJS.Timeout | null>(null);
  const [modalCountdown, setModalCountdown] = useState<number | null>(null);
  const router = useRouter();

  const openModal = async () => {
    try {
      const response = await bookAntrian();
      setKode(response.data); // Simpan data antrian dari respons API
      setIsModalOpen(true);

      const timer = setTimeout(() => {
        setIsModalOpen(false);
        router.push(`/instansi`); // Arahkan ke instansi setelah timeout
      }, 15000);
      setModalTimer(timer);
      setModalCountdown(15); // Set countdown awal

      const countdownInterval = setInterval(() => {
        setModalCountdown((prevCountdown) => {
          if (prevCountdown === null || prevCountdown === 1) {
            clearInterval(countdownInterval);
            return null; // Hentikan countdown jika mencapai 1 atau null
          }
          return prevCountdown - 1;
        });
      }, 1000);
      
    } catch (error) {
      console.error("Error booking antrian:", error);
      // Handle error jika diperlukan
    }
  };

  async function bookAntrian() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/user/antrian/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        instansi_id: layananList?.instansi_id,
        layanan_id: layananList?.id
      }),
    });
    if (!res.ok) {
      throw new Error(`Failed to book antrian! Status: ${res.status}`);
    }
    const data = await res.json();
    return data;
  }

  const closeModal = () => {
    setIsModalOpen(false);
    clearTimeout(modalTimer!); 
    setModalCountdown(null);
    router.push('/instansi')
  };

  useEffect(() => {
    async function fetchData() {
      try {
        await getData();
      } catch (error) {
        console.error("Error fetching instansi data:", error);
        setError("Failed to fetch instansi data");
      }
    }

    fetchData();

    return () => {
      if (modalTimer) {
        clearTimeout(modalTimer);
      }
    };
  }, []);

  async function getData(): Promise<DataLayanan[]> {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/user/layanan/get/${params.id}`,
      {
        cache: "no-store",
      },
    );
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    setLayananList(data.data);
    console.log(data)
    return data.data;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section className="container mx-auto bg-primary-200 shadow-xl rounded-xl mt-16">
      <div className="flex flex-col p-14">
        <h2 className="text-primary-800 font-semibold text-[28px]">
          {layananList?.name}
        </h2>

        <div className="grid grid-cols-3 w-6/12 p-2 mt-8 items-center justify-between border border-neutral-700 bg-neutral-50 rounded-full">
          <button
            className={`p-2 ${activeTab === "Persyaratan"
              ? "bg-primary-700 text-neutral-50 text-[14px] rounded-full w-full"
              : "text-neutral-900"
              }`}
            onClick={() => setActiveTab("Persyaratan")}>
            Persyaratan
          </button>

          <button
            className={`p-2 ${activeTab === "Dasar Hukum"
              ? "bg-primary-700 text-neutral-50 text-[14px] rounded-full w-full"
              : "text-neutral-900"
              }`}
            onClick={() => setActiveTab("Dasar Hukum")}>
            Dasar Hukum
          </button>

          <button
            className={`p-2 ${activeTab === "Pelayanan"
              ? "bg-primary-700 text-neutral-50 text-[14px] rounded-full w-full"
              : "text-neutral-900"
              }`}
            onClick={() => setActiveTab("Pelayanan")}>
            Pelayanan
          </button>
        </div>

        <div className="mt-4">
          {activeTab === "Persyaratan" && (
            <div>
              <h5 className="text-neutral-900 font-semibold text-[20px]">
                Persyaratan
              </h5>

              <div>{parse(layananList?.syarat || "")}</div>
            </div>
          )}

          {activeTab === "Dasar Hukum" && (
            <div>
              <h5 className="text-neutral-900 font-semibold text-[20px]">
                Dasar Hukum
              </h5>

              <div>{parse(layananList?.dasarhukum || "")}</div>
            </div>
          )}

          {activeTab === "Pelayanan" && (
            <div>
              <h5 className="text-neutral-900 font-semibold text-[20px]">
                Pelayanan
              </h5>

              <div>{parse(layananList?.desc || "")}</div>
            </div>
          )}
        </div>

        <div className="flex flex-row items-center justify-center self-center w-2/12 h-full bg-primary-700 rounded-full mt-14">
          <button
            className="p-3 w-full text-neutral-50 font-semibold text-[14px]"
            onClick={openModal}>
            Booking Antrian
          </button>
        </div>

        <div className="flex flex-row w-full justify-between items-start mt-12">
          <Link href={`/layanan/${layananList?.instansi_id}`}>
            <button className="flex items-center justify-center text-neutral-50 bg-secondary-700 w-1/12 h-full py-3 px-20 rounded-full">
              Kembali
            </button>
          </Link>
        </div>
      </div>

      {isModalOpen && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        >
          <div className="flex flex-col items-center justify-center bg-neutral-50 rounded-lg p-8 w-1/3">
            <button
              onClick={closeModal}
              className="absolute top-5 right-6 p-2 rounded-full bg-red-600 hover:bg-red-500 text-white focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="flex flex-row items-center justify-center gap-x-4">
              <div className="w-2/12">
                <Image
                  src={logo}
                  alt="Logo"
                  className="w-full h-full object-cover"
                  width={200}
                  height={200}
                />
              </div>

              <div className="flex flex-col items-start justify-start leading-none">
                <h2 className="text-secondary-700 font-semibold text-[22px]">
                  Mal Pelayanan Publik
                </h2>

                <h4 className="text-primary-700 font-normal text-[16px]">
                  Kabupaten Lampung Timur
                </h4>
              </div>

            </div>

            <div className="flex flex-col items-center justify-center mt-8">
              <h1 className="text-primary-800 font-semibold text-[20px]">
                {layananList?.instansi_name}
              </h1>

              <h3 className="text-primary-800 font-normal text-[16px] mt-2">
                {layananList?.name}
              </h3>
            </div>

            <h3 className="text-3xl text-neutral-900 font-semibold mt-5">
              {kode.code}
            </h3>

            <p className="mb-8 mt-2 text-neutral-900">Loket</p>

            <button
              onClick={closeModal}
              className="bg-primary-700 hover:bg-primary-600 w-4/12 text-neutral-50 p-2 rounded-full"
            >
              Print
            </button>

            <button
              onClick={closeModal}
              className="mt-4 text-neutral-50 bg-red-600 hover:bg-red-500 w-4/12 p-2 rounded-full"
            >
              Close
            </button>

            {modalCountdown !== null && modalCountdown !== 0 && (
              <p className=" text-gray-600 pt-4">
                Modal akan ditutup otomatis dalam {modalCountdown} detik
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
