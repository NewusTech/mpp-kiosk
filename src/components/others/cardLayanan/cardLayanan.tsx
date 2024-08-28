import Link from "next/link";
import React from "react";
import { DataLayanan } from "@/types/type";

interface CardLayananProps {
  layanan: DataLayanan;
  index: number;
}

export default function CardLayanan({ layanan, index }: CardLayananProps) {
  return (
    <div
      className={`container mx-auto ${
        layanan.active_offline ? "bg-primary-200" : "bg-primary-400 cursor-not-allowed"
      } shadow-xl group hover:bg-primary-700 ease-in-out duration-300 w-full h-full flex flex-col rounded-xl py-8`}
    >
      {layanan.active_offline ? (
        <Link href={`/booking-antrian/${layanan.id}`} className="w-full h-full flex flex-col">
          <div className="flex flex-col w-full gap-y-5 justify-center items-center">
            <div className="flex w-full h-3/4 px-2">
              <p className="text-primary-800 group-hover:text-neutral-50 font-medium text-[15px] mr-2">
                {index + 1}.
              </p>
              <h3 className="text-primary-800 group-hover:text-neutral-50 font-medium text-[15px]">
                {layanan.name}
              </h3>
            </div>
          </div>
        </Link>
      ) : (
        <div className="flex flex-col w-full gap-y-5 justify-center items-center">
          <div className="flex w-full h-3/4 px-1">
            <p className="text-primary-800 font-medium text-[15px] mr-2">{index + 1}.</p>
            <h3 className="text-primary-800 font-medium text-[15px]">{layanan.name}</h3>
          </div>
          <div className="bg-red-500 text-pretty text-white text-sm px-4 py-1.5 w-min rounded-lg">
            Tutup
          </div>
        </div>
      )}
    </div>
  );
}