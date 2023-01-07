import { useState } from "react";
import { getDiagnosysByPatientApi } from "../api/diagnosys";
import { useAuth } from "./useAuth";

export const useDiagnosis = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [diagnosis, setDiagnosis] = useState(null);

  const { auth } = useAuth();

  const getDiagnosisByPatient = async (id) => {
    try {
      setLoading(true);
      const response = await getDiagnosysByPatientApi(auth?.token, id);
      setDiagnosis(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  //   const createDiagnosis = async (data) => {
  //     try {
  //       setLoading(true);
  //       await createCenterApi(auth?.token, data);
  //       setLoading(false);
  //     } catch (error) {
  //       setLoading(false);
  //       setError(error);
  //     }
  //   };

  return {
    loading,
    error,
    diagnosis,
    getDiagnosisByPatient,
  };
};
