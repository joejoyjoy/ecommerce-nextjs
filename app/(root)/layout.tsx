"use client";

import React from "react";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Topbar from "@/components/shared/Topbar";
import "../globals.css";
import { SessionProvider } from "next-auth/react";
import Component from "@/components/Login-btn";
import AuthProvider from "../api/auth/authProvider";
import { ReduxProvider } from "@/redux/providers";

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
    <ReduxProvider>
      <SessionProvider>
        <AuthProvider>
          <html lang="en">
            <body className={`${montserrat.className} bg-gray-3`}>
              <Topbar />
              {children}
              <Component />
            </body>
          </html>
        </AuthProvider>
      </SessionProvider>
    </ReduxProvider>
  );
}
