import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import User from "../Types/User";
import apiRequest from "../util/apiRequest";
import localStorageAPI from "../util/localStorageAPI";

export default function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<Boolean>(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();
  const logout = async () => {
    localStorageAPI.resetUser();
    router.push("/signin");
    return true;
  };
  useEffect(() => {
    (async () => {
      const response = await apiRequest.get("user/profile", {}).send({});
      if (response.status === 200) {
        setUser(response.body.user);
        setIsAdmin(response.body.user.role == "admin");
        setLoading(false);
      } else {
        setLoading(false);
        setUser({});
        localStorageAPI.resetUser();
        router.push("/signin");
        //redirect the user to the login page
      }
    })();
  }, []);

  return { user, isAdmin, loading, logout };
}

