"use client";

import Image from "next/image";
import React, { useState } from "react";
import logo from "@/../../public/assets/DesignLogoMpp.svg";
import code from "@/../../public/assets/png-transparent-qr-code-information-qr-code-android-qrcode-text-rectangle-monochrome-thumbnail.png";

export default function PotretBookingAntrian() {
  const [activeTab, setActiveTab] = useState("Persyaratan");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className="container mx-auto bg-primary-200 shadow-xl rounded-xl mt-16">
      <div className="flex flex-col p-14">
        <h2 className="text-primary-800 font-semibold text-[28px]">
          Kartu Tanda Kependudukan Elektronik (KTP-E)
        </h2>

        <div className="grid grid-cols-3 w-6/12 p-2 mt-8 items-center justify-between border border-neutral-700 bg-neutral-50 rounded-full">
          <button
            className={`p-2 ${
              activeTab === "Persyaratan"
                ? "bg-primary-700 text-neutral-50 text-[14px] rounded-full w-full"
                : "text-neutral-900"
            }`}
            onClick={() => setActiveTab("Persyaratan")}>
            Persyaratan
          </button>

          <button
            className={`p-2 ${
              activeTab === "Dasar Hukum"
                ? "bg-primary-700 text-neutral-50 text-[14px] rounded-full w-full"
                : "text-neutral-900"
            }`}
            onClick={() => setActiveTab("Dasar Hukum")}>
            Dasar Hukum
          </button>

          <button
            className={`p-2 ${
              activeTab === "Pelayanan"
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

              <ul>
                <li className="text-neutral-900 font-normal text-[16px] list-disc ml-6">
                  Isi persyaratan di sini...
                </li>
              </ul>
            </div>
          )}

          {activeTab === "Dasar Hukum" && (
            <div>
              <h5 className="text-neutral-900 font-semibold text-[20px]">
                Dasar Hukum
              </h5>

              <ul>
                <li className="text-neutral-900 font-normal text-[16px] list-disc ml-6">
                  Isi persyaratan di sini...
                </li>
              </ul>
            </div>
          )}

          {activeTab === "Pelayanan" && (
            <div>
              <h5 className="text-neutral-900 font-semibold text-[20px]">
                Pelayanan
              </h5>

              <ul>
                <li className="text-neutral-900 font-normal text-[16px] list-disc ml-6">
                  Isi persyaratan di sini...
                </li>
              </ul>
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
      </div>

      {isModalOpen && (
        <div
          onClick={closeModal}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex flex-col items-center justify-center bg-neutral-50 rounded-lg p-8 w-1/3">
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
                Dinas Kependudukan dan Pencatatan Sipil
              </h1>

              <h3 className="text-primary-800 font-normal text-[16px] mt-2">
                Kartu Tanda Penduduk Elektronik (KTP-E)
              </h3>
            </div>

            <div className="w-full flex flex-col items-center justify-center mt-2">
              <div className="flex flex-row w-6/12 justify-between items-center">
                <p className="text-neutral-900 font-normal text-[12px]">
                  07/05/2024
                </p>

                <p className="text-neutral-900 font-normal text-[12px]">
                  10:15
                </p>
              </div>

              <div className="w-6/12 mt-2">
                <Image
                  src={code}
                  alt="Code"
                  className="w-full h-full object-cover"
                  width={200}
                  height={200}
                />
              </div>
            </div>

            <h3 className="text-lg text-neutral-900 font-semibold mt-2">
              Nomor Antrian
            </h3>
            <p className="mb-4 text-neutral-900">Loket</p>

            <button className="bg-primary-700 hover:bg-primary-600 w-4/12 text-neutral-50 p-2 rounded-full">
              Print
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
