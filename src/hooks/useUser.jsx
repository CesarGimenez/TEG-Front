import { useState } from "react";
import {
  getUsersApi,
  getUsersDoctorsApi,
  getUserApi,
  updateUserApi,
  createUserApi,
  getUserByDNIApi,
  getUserByQueryApi,
  updatePasswordApi,
  getUsersByAreaApi,
  getUserFamilyApi,
  deleteUserApi,
} from "../api/user";
import { useAuth } from "./useAuth";

export const useUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [users, setUsers] = useState(null);
  const [userDetail, setUserDetails] = useState(null);
  const [userByDni, setUserBydni] = useState(null);
  const [usersQuery, setUsersQuery] = useState(null);
  const [family, setFamily] = useState(null);
  const [countUsers, setCountUsers] = useState(null);

  const { auth } = useAuth();

  const getUsers = async (limit, skip) => {
    try {
      setLoading(true);
      const response = await getUsersApi(auth?.token, limit, skip);
      const { users, count } = response;
      setUsers(users);
      setCountUsers(count);
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

  const getUserByDNI = async (dni) => {
    try {
      setLoading(true);
      const response = await getUserByDNIApi(auth?.token, dni);
      setUserBydni(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const getUsersByQuery = async (query) => {
    try {
      setLoading(true);
      const response = await getUserByQueryApi(auth?.token, query);
      setUsersQuery(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const getUserFamily = async (id) => {
    try {
      setLoading(true);
      const response = await getUserFamilyApi(auth?.token, id);
      setFamily(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const getUsersByArea = async (query) => {
    try {
      setLoading(true);
      const response = await getUsersByAreaApi(auth?.token, query);
      setUsers(response);
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
      return response;
    } catch (error) {}
  };

  const updatePassword = async (id, data) => {
    try {
      setLoading(true);
      const response = await updatePasswordApi(auth?.token, id, data);
      setLoading(false);
      return response;
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

  const deleteUser = async (id) => {
    try {
      setLoading(true);
      const response = await deleteUserApi(auth?.token, id);
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
    userByDni,
    countUsers,
    usersQuery,
    family,
    getUsers,
    getUser,
    getUserByDNI,
    getUsersByQuery,
    getUsersDoctors,
    getUserFamily,
    getUsersByArea,
    updateUser,
    createUser,
    updatePassword,
    deleteUser,
  };
};
