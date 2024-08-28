"use client";

import * as React from "react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon, ClockIcon, } from "@radix-ui/react-icons"
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import Link from "next/link";
import useSWR from "swr";
import { toast } from "sonner";
import { fetcher } from "@/lib/fetch";
import { useState, useEffect } from "react";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string({
    message: "Nama harus diisi",
  }),
  pekerjaan: z.string().optional(),
  alamat: z.string().optional(),
  tujuan: z.string().optional(),
  tanggal_input: z.date({
    message: "Tanggal harus diisi",
  }),
  tanggal: z.string().optional(),
  waktu: z.string({
    message: "Waktu harus diisi",
  }),
  instansi_id: z
    .number({
      message: "Instansi harus diisi",
    }).optional(),
})

export default function FormGuestPage({ params, }: { params: { id: number } }) {
  // const [searchInstansiInput, setSearchInstansiInput] = useState("");
  // const [searchInstansiTerm, setSearchInstansiTerm] = useState("");
  const router = useRouter();

  function formatDateToRegexPattern(isoDateString: any) {
    const dateObject = new Date(isoDateString);
    const year = dateObject.getFullYear();
    const month = ("0" + (dateObject.getMonth() + 1)).slice(-2);
    const day = ("0" + dateObject.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  // useEffect(() => {
  //   const delayDebounceFn = setTimeout(() => {
  //     setSearchInstansiTerm(searchInstansiInput);
  //   }, 300);

  //   return () => clearTimeout(delayDebounceFn);
  // }, [searchInstansiInput]);

  // const { data: instansiget } = useSWR<any>(
  //   `${process.env.NEXT_PUBLIC_URL}/instansi/get?search=${searchInstansiTerm}`,
  //   fetcher,
  // );

  // const resultInstansi = instansiget?.data;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      pekerjaan: '',
      alamat: '',
      tujuan: '',
      tanggal: '',
      waktu: '',
      instansi_id: undefined,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formattedDate = formatDateToRegexPattern(values.tanggal_input);

    values.tanggal = formattedDate;
    values.instansi_id = params.id
    console.log(values)

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/bukutamu/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        },
      );

      const data = await response.json();

      if (response.ok) {
        console.log("berhasil")
        toast("Berhasil");

        setTimeout(() => {
          router.push("/");
        }, 3000);
      } else {
        toast("Gagal menyimpan data");
      }
    } catch (error: any) {
      toast(error.message);
    }
  };

  return (
    <section className="container mx-auto bg-primary-200 flex flex-col mt-16">
      <div className="flex flex-col p-14">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="w-full h-full flex justify-between gap-x-10">
              <div className="w-1/2 space-y-4">
                {/* <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="instansi_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Instansi</FormLabel>
                        <FormControl>
                          <Select defaultValue={field.value || ''} onValueChange={field.onChange}>
                            <SelectTrigger className="w-full rounded-2xl">
                              <SelectValue placeholder="Pilih Instansi" />
                            </SelectTrigger>
                            <SelectContent className="pt-10">
                              <div className="px-2 fixed border-b w-full top-0 flex items-center justify-between z-10">
                                <Search className="text-slate-400" />
                                <Input
                                  placeholder="Search..."
                                  className="w-full border-none focus:border-0"
                                  value={searchInstansiInput}
                                  onChange={(e) =>
                                    setSearchInstansiInput(e.target.value)
                                  }
                                />
                              </div>
                              <SelectGroup>
                                <SelectLabel>Nama Instansi</SelectLabel>
                                {resultInstansi?.map((resultInstansi: any) => (
                                  <SelectItem key={resultInstansi.id} value={resultInstansi.id.toString()}>
                                    {resultInstansi.name}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div> */}
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nama</FormLabel>
                        <FormControl>
                          <Input placeholder="Nama" {...field} className="rounded-full" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="pekerjaan"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pekerjaan</FormLabel>
                        <FormControl>
                          <Input placeholder="Pekerjaan" {...field} className="rounded-full" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="alamat"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Alamat</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Alamat" className="rounded-2xl h-64" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="w-1/2 space-y-4">
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="tanggal_input"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tanggal</FormLabel>
                        <FormControl>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full justify-start text-left font-normal rounded-2xl",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? format(field.value, "PPP") : <span>Pilih Tanggal</span>}
                                <CalendarIcon className="h-4 w-4 ml-auto" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                initialFocus

                              />
                            </PopoverContent>
                          </Popover>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="waktu"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Jam</FormLabel>
                        <FormControl>
                          <Input type="time" className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                </div>
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="tujuan"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tujuan</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Tujuan" className="rounded-2xl h-64" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

            </div>

            <div className="text-center mt-10">
              <Button
                className="bg-primary-700 hover:bg-primary-800 w-[140px] rounded-full text-white" type="submit"
              >
                Submit
              </Button>
            </div>

            <div className="flex flex-row w-full justify-between items-start mt-12">
              <Link href={`/guest`}>
                <button className="flex items-center justify-center text-neutral-50 bg-secondary-700 w-1/12 h-full py-3 px-20 rounded-full">
                  Kembali
                </button>
              </Link>
            </div>
          </form>
        </Form>

      </div>
    </section>
  );
}
