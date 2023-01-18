import { useState } from "react";
import { createDocApi, getDocsByPatientApi } from "../api/attachment";

import { useAuth } from "./useAuth";

export const useAttachment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [docs, setDocs] = useState(null);

  const { auth } = useAuth();

  const getDocsByPatient = async (id) => {
    try {
      setLoading(true);
      const response = await getDocsByPatientApi(auth?.token, id);
      setDocs(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const createDoc = async (data) => {
    try {
      setLoading(true);
      const doc = await createDocApi(auth?.token, data);
      setLoading(false);
      return doc;
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  return {
    loading,
    error,
    docs,
    getDocsByPatient,
    createDoc,
  };
};
