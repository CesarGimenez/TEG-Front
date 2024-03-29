import { useState } from "react";
import {
  createCenterApi,
  deleteCenterApi,
  getCentersApi,
  getCentersByDoctorApi,
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

  const getCentersByDoctor = async (id) => {
    try {
      setLoading(true);
      const response = await getCentersByDoctorApi(auth?.token, id);
      setCenters(response);
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
      const center = await createCenterApi(auth?.token, data);
      setLoading(false);
      return center;
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const updateCenter = async (id, data) => {
    try {
      setLoading(true);
      const updated = await updateCenterApi(auth?.token, id, data);
      setLoading(false);
      return updated;
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const deleteCenter = async (id) => {
    try {
      setLoading(true);
      const response = await deleteCenterApi(auth?.token, id);
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
    centers,
    countCenters,
    currentCenter,
    getCenters,
    getCentersByDoctor,
    getOneCenter,
    createCenter,
    updateCenter,
    deleteCenter,
  };
};
