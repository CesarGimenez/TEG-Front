import { useState } from "react";
import {
  createPharmacyApi,
  deletePharmacyApi,
  getOnePharmacyApi,
  getPharmaciesApi,
  getPharmaciesByMedicinesApi,
  updatePharmacyApi,
} from "../api/pharmacy";
import { useAuth } from "./useAuth";

export const usePharmacy = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [pharmacies, setPharmacies] = useState(null);
  const [currentPharmacy, setCurrentPharmacy] = useState(null);
  const [countPharmacies, setCountPharmacies] = useState(null);

  const { auth } = useAuth();

  const getPharmacies = async (limit, skip) => {
    try {
      setLoading(true);
      const response = await getPharmaciesApi(auth?.token, limit, skip);
      const { pharmacies, count } = response;
      setPharmacies(pharmacies);
      setCountPharmacies(count);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const getOnePharmacy = async (id) => {
    try {
      setLoading(true);
      const response = await getOnePharmacyApi(auth?.token, id);
      setCurrentPharmacy(response);
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

  const createPharmacy = async (data) => {
    try {
      setLoading(true);
      await createPharmacyApi(auth?.token, data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const updatePharmacy = async (id, data) => {
    try {
      setLoading(true);
      await updatePharmacyApi(auth?.token, id, data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const deletePharmacy = async (id) => {
    try {
      setLoading(true);
      const response = await deletePharmacyApi(auth?.token, id);
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
    pharmacies,
    countPharmacies,
    currentPharmacy,
    getPharmacies,
    getOnePharmacy,
    getPharmaciesByMedicines,
    createPharmacy,
    updatePharmacy,
    deletePharmacy,
  };
};
