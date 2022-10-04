import { useState } from "react";
import { getUsersApi } from "../api/user";
import { useAuth } from "./useAuth";

export const useUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [users, setUsers] = useState(null);

  const { auth } = useAuth();

  const getUsers = async () => {
    try {
      setLoading(true);
      const response = await getUsersApi(auth?.token);
      const { data } = response;
      setUsers(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  return {
    loading,
    error,
    users,
    getUsers,
  };
};
