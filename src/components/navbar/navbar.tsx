import Image from "next/image";
import React from "react";
import logo from "@/../../public/assets/DesignLogoMpp.svg";

export default function Navbar() {
  return (
    <section className="container mx-auto flex justify-center">
      <div className="flex flex-row items-center justify-center">
        <div className="flex flex-col justify-center items-center">
          <div className="w-2/4 flex justify-center items-center">
            <Image
              src={logo}
              alt="Logo MPP"
              className="object-cover w-full h-full"
              width={100}
              height={100}
            />
          </div>
        </div>

        <div className="grid grid-rows-2 place-start -ml-10">
          <h2 className="text-secondary-700 font-semibold text-[28px]">
            Mal Pelayanan Publik
          </h2>

          <h4 className="text-primary-700 font-normal text-[20px]">
            Kabupaten Lampung Timur
          </h4>
        </div>
      </div>
    </section>
  );
}
