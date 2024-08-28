"use client";

import { useEffect, useState } from "react";
import CardInstansi from "@/components/others/cardInstansi/cardInstansi";
import { Search } from "lucide-react";
import { DataInstance } from "@/types/type";
import Link from "next/link";
import { Input } from "@/components/ui/input";

export default function InstansiPage() {
  const [instansiList, setInstansiList] = useState<DataInstance[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchInstansiInput, setSearchInstansiInput] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setSearchTerm(searchInstansiInput);
    }, 300); // Mengatur debounce ke 300ms

    return () => clearTimeout(delayDebounceFn);
  }, [searchInstansiInput]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getData(searchTerm);
        setInstansiList(data);
      } catch (error) {
        console.error("Error fetching instansi data:", error);
        setError("Failed to fetch instansi data");
      }
    }
    fetchData();
  }, [searchTerm]);

  async function getData(search: string): Promise<DataInstance[]> {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/user/instansi/get?limit=100${search ? `&search=${search}` : ""}`,
      {
        cache: "no-store",
      }
    );
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    return data.data;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section className="container mx-auto bg-primary-100 flex flex-col">
      <div className="flex flex-col bg-primary-100 my-14">
        <div className="flex flex-row w-full h-full justify-between">
          <h3 className="text-primary-800 font-semibold text-[40px]">
            Pilih Instansi
          </h3>

          <div className="w-4/12 h-10 flex flex-row relative justify-center self-center items-center border border-neutral-700 rounded-full">
            <Input
              type="text"
              name="search"
              placeholder="Cari..."
              className="w-full h-full rounded-full pl-4"
              value={searchInstansiInput}
              onChange={(e) => setSearchInstansiInput(e.target.value)}
            />

            <Search className="w-4 h-4 absolute right-3 text-neutral-900" />
          </div>
        </div>

        <div className="grid grid-cols-6 place-items-center gap-5 mt-8">
          {instansiList.map((instansi) => (
            <CardInstansi key={instansi.id} instansi={instansi} path="guest" />
          ))}
        </div>

        <div className="flex flex-row w-full justify-between items-start mt-14">
          <Link href={"/"}>
            <button className="flex items-center justify-center text-neutral-50 bg-secondary-700 w-1/12 h-full py-3 px-20 rounded-full">
              Kembali
            </button>
          </Link>
        </div>

      </div>
    </section>
  );
}
