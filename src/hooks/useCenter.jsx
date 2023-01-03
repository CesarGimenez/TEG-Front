import { useState } from "react";
import {
  createCenterApi,
  getCentersApi,
  getOneCenterApi,
  updateCenterApi,
} from "../api/centers";
import { useAuth } from "./useAuth";

export const useCenter = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [centers, setCenters] = useState(null);
  const [currentCenter, setCurrentCenter] = useState(null);
  const [countCenters, setCountCenters] = useState(null);

  const { auth } = useAuth();

  const getCenters = async (limit, skip) => {
    try {
      setLoading(true);
      const response = await getCentersApi(auth?.token, limit, skip);
      const { healthcenters, count } = response;
      setCenters(healthcenters);
      setCountCenters(count);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const getOneCenter = async (id) => {
    try {
      setLoading(true);
      const response = await getOneCenterApi(auth?.token, id);
      const { data } = response;
      setCurrentCenter(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const createCenter = async (data) => {
    try {
      setLoading(true);
      await createCenterApi(auth?.token, data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const updateCenter = async (id, data) => {
    try {
      setLoading(true);
      await updateCenterApi(auth?.token, id, data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  return {
    loading,
    error,
    centers,
    countCenters,
    currentCenter,
    getCenters,
    getOneCenter,
    createCenter,
    updateCenter,
  };
};
