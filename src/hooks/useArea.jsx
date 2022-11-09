import { useState } from "react";
import { getAreasApi } from "../api/areas";
import { useAuth } from "./useAuth";

export const useArea = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [areas, setAreas] = useState(null);

  const { auth } = useAuth();

  const getAreas = async () => {
    try {
      setLoading(true);
      const response = await getAreasApi(auth?.token);
      const { data } = response;
      setAreas(data);
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
    getAreas,
  };
};
