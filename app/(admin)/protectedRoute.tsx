"use client";

import Image from "next/image";
import { redirect } from "next/navigation";
import { useSelector } from "react-redux";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { value, isLoggedIn, isLoading } = useSelector(
    (store: any) => store.authReducer
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center absolute top-0 left-0 right-0 bottom-0 h-screen w-screen bg-inherit z-50">
        <Image
          src={"/assets/GIF/pageLoad.gif"}
          alt="Loading animation"
          width={64}
          height={64}
        />
      </div>
    );
  }

  if (!isLoggedIn || !value.isAdmin) {
    redirect("/");
  }

  return children;
}
