"use client";

import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import CardLayanan from "@/components/others/cardLayanan/cardLayanan";
import { DataInstance } from "@/types/type";
import { DataLayanan } from "@/types/type";
import Link from "next/link";
import { Input } from "@/components/ui/input";

interface DataResponse {
  instansi: DataInstance;
  data: DataLayanan[];
}

export default function Layanan({ params, }: { params: { id: number } }) {
  const [layananList, setLayananList] = useState<DataLayanan[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchLayananInput, setSearchLayananInput] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [instansiName, setInstansiName] = useState<string>("");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setSearchTerm(searchLayananInput);
    }, 300); // Mengatur debounce ke 300ms

    return () => clearTimeout(delayDebounceFn);
  }, [searchLayananInput]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getData(searchTerm);
        console.log(data)
        setLayananList(data.data);
        setInstansiName(data.instansi.name);
      } catch (error) {
        console.error("Error fetching layanan data:", error);
        setError("Failed to fetch layanan data");
      }
    }

    fetchData();
  }, [searchTerm]);

  async function getData(search: string): Promise<DataResponse> {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/user/layanan/dinas/get/${params.id}?${search ? `search=${search}` : ""}`,
      {
        cache: "no-store",
      },
    );
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();

    return data;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section className="container mx-auto bg-primary-100 m-14 flex flex-col">
      <div className="flex flex-col">
        <div className="flex flex-row w-full h-full justify-between">
          <h3 className="text-primary-800 font-semibold text-[30px]">
            Layanan Dinas {instansiName}
          </h3>

          <div className="w-4/12 h-10 flex flex-row relative justify-center self-center items-center border border-neutral-700 rounded-full">
            <Input
              type="text"
              name="search"
              placeholder="Cari..."
              className="w-full h-full rounded-full pl-4"
              value={searchLayananInput}
              onChange={(e) => setSearchLayananInput(e.target.value)}
            />

            <Search className="w-4 h-4 absolute right-3 text-neutral-900" />
          </div>
        </div>

        <div className="grid grid-cols-4 place-items-center gap-5 mt-8">
          {layananList.map((layanan, index) => (
            <CardLayanan key={layanan.id} layanan={layanan} index={index} />
          ))}
        </div>

        <div className="flex flex-row w-full justify-between items-start mt-14">
          <Link href={"/instansi"}>
            <button className="flex items-center justify-center text-neutral-50 bg-secondary-700 w-1/12 h-full py-3 px-20 rounded-full">
              Kembali
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
