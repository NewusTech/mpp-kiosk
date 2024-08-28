import React from "react";
import Image from "next/image";
import Link from "next/link";
import { DataInstance } from "@/types/type";

interface CardInstansiProps {
  instansi: DataInstance;
  path: string;
}

export default function CardInstansi({ instansi, path }: CardInstansiProps) {
  return (
    <div className={`container mx-auto shadow-xl group hover:bg-primary-700 ease-in-out duration-300 w-full h-full flex flex-col rounded-xl pt-8 pb-5 ${instansi.active_offline === true ? "bg-primary-200" : "bg-primary-400 cursor-not-allowed"
      }`}>
      {instansi.active_offline === true ? (
        <Link href={`/${path}/${instansi.id}`} className="w-full h-full flex flex-col">
          <div className="flex flex-col w-full gap-y-5">
            <div className="flex flex-col justify-center items-center self-center w-full h-full">
              <div className="w-[90px] h-[90px] flex justify-center items-center">
                <Image
                  src={instansi.image}
                  alt={`Logo ${instansi.name}`}
                  className="object-contain"
                  width={110}
                  height={60}
                />
              </div>
            </div>
            <div className="flex justify-center w-full h-3/4">
              <h3 className="text-primary-800 group-hover:text-neutral-50 font-medium text-[14px] text-center">
                {instansi.name}
              </h3>
            </div>
          </div>
        </Link>
      ) : (
        <div className="flex flex-col w-full gap-y-5">
          <div className="flex flex-col justify-center items-center self-center w-full h-full">
            <div className="w-[90px] h-[90px] flex justify-center items-center">
              <Image
                src={instansi.image}
                alt={`Logo ${instansi.name}`}
                className="object-contain"
                width={110}
                height={60}
              />
            </div>
          </div>
          <div className="flex flex-col w-full h-3/4 justify-center text-center items-center">
            <div>
              <h3 className="text-primary-800 font-medium text-[14px] text-center opacity-50">
                {instansi.name}
              </h3>
            </div>
            <div className="mt-2 bg-red-500 text-pretty text text-white text-sm px-4 py-1.5 w-min rounded-lg">
              Tutup
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
