import Image from "next/image";
import logo from "@/../../public/assets/DesignLogoMpp.svg";
import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="container mx-auto w-screen h-screen flex items-center justify-center">
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

        <div className="flex mt-5 gap-60 items-center justify-between">
          <div className="mx-4">
            <Link href="/instansi">
              <button className="bg-primary-700 px-20 py-6 rounded-xl text-neutral-50 font-semibold text-[40px] text-center">
                Booking Antrian
              </button>
            </Link>
          </div>
          <div className="mx-4">
            <Link href="/guest">
              <button className="bg-primary-700 px-20 py-6 rounded-xl text-neutral-50 font-semibold text-[40px] text-center">
                Buku Tamu
              </button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
