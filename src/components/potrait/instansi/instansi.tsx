import CardInstansi from "@/components/others/cardInstansi/cardInstansi";
import { Search } from "lucide-react";

export default function PotretInstansi() {
  return (
    <section className="container mx-auto px-20 min-w-full min-h-[2000px] bg-primary-100 flex flex-col">
      <div className="flex flex-col bg-primary-100 my-14">
        <div className="flex flex-row w-full h-full justify-between">
          <h3 className="text-primary-800 font-semibold text-[40px]">
            Pilih Instansi
          </h3>

          <div className="w-4/12 h-10 flex flex-row relative justify-center self-center items-center border border-neutral-700 rounded-full">
            <input
              type="text"
              name="search"
              placeholder="Cari..."
              className="w-full h-full rounded-full pl-4"
            />

            <Search className="w-4 h-4 absolute right-3" />
          </div>
        </div>

        <div className="grid grid-cols-3 place-items-center gap-5 mt-8">
          <CardInstansi />
          <CardInstansi />
          <CardInstansi />
          <CardInstansi />
          <CardInstansi />
          <CardInstansi />
          <CardInstansi />
          <CardInstansi />
          <CardInstansi />
          <CardInstansi />
          <CardInstansi />
          <CardInstansi />
        </div>

        <div className="flex flex-row w-full justify-between items-start mt-14">
          <button className="flex items-center justify-center text-neutral-50 bg-secondary-700 w-1/12 h-full py-3 px-20 rounded-full">
            Kembali
          </button>

          <button className="flex items-center justify-center text-neutral-50 bg-primary-700 w-1/12 h-full py-3 px-20 rounded-full">
            Lanjut
          </button>
        </div>
      </div>
    </section>
  );
}
