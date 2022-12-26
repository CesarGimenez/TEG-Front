import { useState } from "react";
import {
  createDiseaseApi,
  getDiseasesApi,
  updateDiseaseApi,
} from "../api/disease";
import { useAuth } from "./useAuth";

export const useDisease = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [diseases, setDiseases] = useState(null);
  const [countDiseases, setCountDiseases] = useState(null);

  const { auth } = useAuth();

  const getDiseases = async (limit, skip) => {
    try {
      setLoading(true);
      const response = await getDiseasesApi(auth?.token, limit, skip);
      const { disease, count } = response;
      setDiseases(disease);
      setCountDiseases(count);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const createDisease = async (data) => {
    try {
      setLoading(true);
      await createDiseaseApi(auth?.token, data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const updateDisease = async (id, data) => {
    try {
      setLoading(true);
      await updateDiseaseApi(auth?.token, id, data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  return {
    loading,
    error,
    diseases,
    countDiseases,
    getDiseases,
    createDisease,
    updateDisease,
  };
};
