import React from "react";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import ProvidersComponent from "../providers";
import "../globals.css";
import Topbar from "@/components/admin/Topbar";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin Hats & Caps Panel | eCommerce website by Joe",
  description: "eCommerce Admin Panel made with nextJS and Mongoose",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProvidersComponent>
      <html lang="en">
        <body className={`${montserrat.className} bg-gray-3`}>
          <Topbar />
          {children}
        </body>
      </html>
    </ProvidersComponent>
  );
}
