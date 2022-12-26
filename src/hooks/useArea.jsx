import { useState } from "react";
import { createAreaApi, getAreasApi, updateAreaApi } from "../api/areas";
import { useAuth } from "./useAuth";

export const useArea = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [areas, setAreas] = useState(null);
  const [countAreas, setCountAreas] = useState(null);

  const { auth } = useAuth();

  const getAreas = async (limit, skip) => {
    try {
      setLoading(true);
      const response = await getAreasApi(auth?.token, limit, skip);
      const { areas, count } = response;
      setAreas(areas);
      setCountAreas(count);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const createArea = async (data) => {
    try {
      setLoading(true);
      await createAreaApi(auth?.token, data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const updateArea = async (id, data) => {
    try {
      setLoading(true);
      await updateAreaApi(auth?.token, id, data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  return {
    loading,
    error,
    areas,
    countAreas,
    getAreas,
    createArea,
    updateArea,
  };
};
