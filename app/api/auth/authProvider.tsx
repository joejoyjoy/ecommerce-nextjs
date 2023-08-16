"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { authState, noAuthFound } from "@/redux/features/auth.slice";
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
  const [isLoading, setIsLoading] = useState(true);

  if (!isLoading) {
    console.log(value);
  }

  useEffect(() => {
    if (session) {
      const { name, email, image }: any = session.user;
      dispatch(authState({ name, email, image }));
      setIsLoading(false);
    } else {
      dispatch(noAuthFound());
    }
  }, [session]);

  return <>{children}</>;
}
