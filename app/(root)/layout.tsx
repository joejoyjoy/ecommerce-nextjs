import React from "react";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Topbar from "@/components/shared/Topbar";
import ClientComponent from "./clientComponent";
import "../globals.css";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hats & Caps | eCommerce website by Joe",
  description: "eCommerce site made with nextJS and Mongoose",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClientComponent>
      <html lang="en">
        <body className={`${montserrat.className} bg-gray-3`}>
          <Topbar />
          {children}
        </body>
      </html>
    </ClientComponent>
  );
}
