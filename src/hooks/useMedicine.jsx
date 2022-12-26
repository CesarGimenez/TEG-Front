import { useState } from "react";
import {
  createMedicineApi,
  getMedicinesApi,
  updateMedicineApi,
} from "../api/medicine";
import { useAuth } from "./useAuth";

export const useMedicine = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [medicines, setMedicines] = useState(null);
  const [countMedicines, setCountMedicines] = useState(null);

  const { auth } = useAuth();

  const getMedicines = async (limit, skip) => {
    try {
      setLoading(true);
      const response = await getMedicinesApi(auth?.token, limit, skip);
      const { medicines, count } = response;
      setMedicines(medicines);
      setCountMedicines(count);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const createMedicine = async (data) => {
    try {
      setLoading(true);
      await createMedicineApi(auth?.token, data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const updateMedicine = async (id, data) => {
    try {
      setLoading(true);
      await updateMedicineApi(auth?.token, id, data);
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
    countMedicines,
    getMedicines,
    createMedicine,
    updateMedicine,
  };
};
