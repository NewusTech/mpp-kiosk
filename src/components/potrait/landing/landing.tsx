import Image from "next/image";
import logo from "@/../../public/assets/DesignLogoMpp.svg";
import Link from "next/link";

export default function PotretLanding() {
  return (
    <main className="container mx-auto bg-primary-100 min-w-full min-h-[2000px] flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-y-14">
        <div className="flex flex-col items-center justify-center gap-y-4">
          <div className="w-3/4 h-3/4">
            <Image
              src={logo}
              alt="Logo MPP"
              className="object-cover w-full h-full"
              width={400}
              height={400}
            />
          </div>

          <div className="grid grid-rows-2 place-items-center leading-none gap-y-2">
            <h3 className="text-secondary-700 font-semibold text-[40px]">
              Mal Pelayanan Publik
            </h3>

            <h5 className="text-primary-700 font-normal text-[26px]">
              Kabupaten Lampung Timur
            </h5>
          </div>
        </div>

        <div className="flex items-center px-24 py-10 justify-center w-full bg-primary-700 rounded-xl">
          <button className="text-neutral-50 font-semibold text-[48px] text-center">
            <Link href="/instansi">Booking Antrian</Link>
          </button>
        </div>
      </div>
    </main>
  );
}
