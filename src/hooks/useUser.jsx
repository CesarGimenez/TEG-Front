import { useState } from "react";
import {
  getUsersApi,
  getUsersDoctorsApi,
  getUserApi,
  updateUserApi,
  createUserApi,
} from "../api/user";
import { useAuth } from "./useAuth";

export const useUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [users, setUsers] = useState(null);
  const [userDetail, setUserDetails] = useState(null);

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

  const getUser = async (id) => {
    try {
      setLoading(true);
      const response = await getUserApi(auth?.token, id);
      const { userDetail } = response;
      setUserDetails(userDetail);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const updateUser = async (id, data) => {
    try {
      setLoading(true);
      const response = await updateUserApi(auth?.token, id, data);
      setLoading(false);
    } catch (error) {}
  };

  const getUsersDoctors = async () => {
    try {
      setLoading(true);
      const response = await getUsersDoctorsApi(auth?.token);
      const { data } = response;
      setUsers(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const createUser = async (data) => {
    try {
      setLoading(true);
      const response = await createUserApi(auth?.token, data);
      setLoading(false);
      return response;
    } catch (error) {
      setError(error);
      throw error;
    }
  };

  return {
    loading,
    error,
    users,
    userDetail,
    getUsers,
    getUser,
    getUsersDoctors,
    updateUser,
    createUser,
  };
};
