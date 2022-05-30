import { useState } from "react";
import User from "../Types/User";
import apiRequest from "../util/apiRequest";
import localStorageAPI from "../util/localStorageAPI";

export default function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<Boolean>(true);
  let isAdmin = false;
  (async () => {
    const response = await apiRequest.post("user/profile", {}).send({});
    if (response.status === 200) {
      setUser(response.body.user);
      isAdmin = user.role == "admin";
      setLoading(false);
    } else {
      setLoading(false);
      localStorageAPI.resetUser();
      //redirect the user to the login page
    }
  })();
  return { user, isAdmin, loading };
}

