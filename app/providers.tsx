"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import AuthState from "./authState";
import { ReduxProvider } from "@/redux/providers";

export default function ProvidersComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReduxProvider>
      <SessionProvider>
        <AuthState>{children}</AuthState>
      </SessionProvider>
    </ReduxProvider>
  );
}
