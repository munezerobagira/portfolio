import { useEffect, useState } from "react";

import User from "../Types/User";
import apiRequest from "../util/apiRequest";
import localStorageAPI from "../util/localStorageAPI";

export default function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<Boolean>(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const logout = async () => {
    const response = await apiRequest.get("user/profile", {}).send({});
    if (response.status === 200) {
      setUser(null);
      localStorageAPI.resetUser();
      return true;
    }
    return false;
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
        //redirect the user to the login page
      }
    })();
  }, []);

  return { user, isAdmin, loading, logout };
}

