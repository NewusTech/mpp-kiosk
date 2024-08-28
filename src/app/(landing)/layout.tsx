import Navbar from "@/components/navbar/navbar";
import React from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col bg-primary-100 h-screen w-screen">
      {children}
    </div>
  );
}
