"use client";

import { redirect } from "next/navigation";
import { useSelector } from "react-redux";
import IsLoadingComponent from "@/components/ui/IsLoadingComponent";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { value, isLoggedIn, isLoading } = useSelector(
    (store: any) => store.authReducer
  );

  if (isLoading) {
    return <IsLoadingComponent />
  }

  if (!isLoggedIn || !value.isAdmin) {
    redirect("/");
  }

  return children;
}
