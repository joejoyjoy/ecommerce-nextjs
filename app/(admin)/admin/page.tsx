"use client";

import { redirect } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";

export default function Admin() {
  const { value, isLoggedIn, isLoading } = useSelector(
    (store: any) => store.authReducer
  );

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!value.isAdmin) {
    redirect("/");
  }

  return (
    <main className="responsive">
      <span className="responsive_wrapper flex flex-col px-4 mb-6">Hello</span>
    </main>
  );
}
