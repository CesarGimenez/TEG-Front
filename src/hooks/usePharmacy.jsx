import { useState } from "react";
import { getPharmaciesApi, getPharmaciesByMedicinesApi } from "../api/pharmacy";
import { useAuth } from "./useAuth";

export const usePharmacy = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [pharmacies, setPharmacies] = useState(null);

  const { auth } = useAuth();

  const getPharmacies = async () => {
    try {
      setLoading(true);
      const response = await getPharmaciesApi(auth?.token);
      const { data } = response;
      setPharmacies(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const getPharmaciesByMedicines = async (datas) => {
    try {
      setLoading(true);
      const { data } = await getPharmaciesByMedicinesApi(auth?.token, datas);
      setPharmacies(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  return {
    loading,
    error,
    pharmacies,
    getPharmacies,
    getPharmaciesByMedicines,
  };
};
