import React from "react";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import ProvidersComponent from "../providers";
import "../globals.css";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hats & Caps Admin Panel | eCommerce website by Joe",
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
          {children}
        </body>
      </html>
    </ProvidersComponent>
  );
}
