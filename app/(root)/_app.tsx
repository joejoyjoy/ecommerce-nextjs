import { checkUser } from "@/lib/actions/user.actions";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function UserProvider({ children }: any) {
  const { data: session } = useSession();
  
  useEffect(() => {
    if (session) {
      const { name, email, image }: any = session.user;
      checkUser({ name, email, image });
    }
  }, [session]);

  return <>{children}</>;
}
