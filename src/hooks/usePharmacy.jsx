import { useState } from "react";
import { getPharmaciesApi } from "../api/pharmacy";
import "./useAuth";
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
      setLoading(false);
      const { data } = response;
      setPharmacies(data);
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
  };
};
