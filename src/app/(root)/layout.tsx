import Navbar from "@/components/navbar/navbar";
import React from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col bg-primary-100 min-h-screen w-screen pt-9">
      <Navbar />
      {children}
    </div>
  );
}
