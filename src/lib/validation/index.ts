import { z } from "zod";

export const guestValidation = z.object({
    name: z.string({
        message: "Nama harus diisi",
    }),
    pekerjaan: z.string().optional(),
    alamat: z.string().optional(),
    tujuan: z.string().optional(),
    instansi_id: z
        .string({
            message: "Instansi harus diisi",
        })
        .transform((val) => Number(val)),
    tanggal: z.date({
        message: "Tanggal harus diisi",
    }),
    waktu: z.string({
        message: "Waktu harus diisi",
    }),
});