"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { authState, noAuthFound } from "@/redux/features/auth.slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (session) {
      const { name, email, image }: any = session.user;
      dispatch(authState({ name, email, image }));
    }
    if (session === null) {
      dispatch(noAuthFound());
    }
  }, [session]);

  return <>{children}</>;
}
