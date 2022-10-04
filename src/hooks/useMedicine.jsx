import { useState } from "react";
import { getMedicinesApi } from "../api/medicine";
import { useAuth } from "./useAuth";

export const useMedicine = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [medicines, setMedicines] = useState(null);

  const { auth } = useAuth();

  const getMedicines = async () => {
    try {
      setLoading(true);
      const response = await getMedicinesApi(auth?.token);
      const { data } = response;
      setMedicines(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  return {
    loading,
    error,
    medicines,
    getMedicines,
  };
};
