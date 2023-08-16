"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import AuthProvider from "../api/auth/authProvider";
import { ReduxProvider } from "@/redux/providers";

export default function ClientComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReduxProvider>
      <SessionProvider>
        <AuthProvider>{children}</AuthProvider>
      </SessionProvider>
    </ReduxProvider>
  );
}
