"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { logInAsync } from "@/redux/features/auth.slice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const dispatch = useDispatch<AppDispatch>();
  const { value } = useSelector((store: any) => store.authReducer);

  console.log(value);

  useEffect(() => {
    if (session) {
      const { name, email, image }: any = session.user;
      dispatch(logInAsync({ name, email, image }));
    }
  }, [session]);

  return <>{children}</>;
}
