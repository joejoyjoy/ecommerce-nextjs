"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import AuthState from "./authState";
import { ReduxProvider } from "@/redux/providers";
import ProductState from "./productState";

export default function ProvidersComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReduxProvider>
      <SessionProvider>
        <AuthState>
          <ProductState>{children}</ProductState>
        </AuthState>
      </SessionProvider>
    </ReduxProvider>
  );
}
