import { useState } from "react";
import {
  getMedicalRecordByPatientApi,
  getMedicalRecordsApi,
  updateMedicalRecordApi,
} from "../api/medicalrecord";
import { useAuth } from "./useAuth";

export const useMedicalRecord = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [medicalRecords, setMedicalRecords] = useState(null);
  const [countMedicalRecords, setCountMedicalRecords] = useState(null);
  const [medicalRecordDetail, setMedicalRecordDetail] = useState(null);

  const { auth } = useAuth();

  const getMedicalRecords = async (limit, skip) => {
    try {
      setLoading(true);
      const response = await getMedicalRecordsApi(auth?.token, limit, skip);
      const { count, medicalrecords } = response;
      setMedicalRecords(medicalrecords);
      setCountMedicalRecords(count);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const getMedicalRecordByPatient = async (id) => {
    try {
      setLoading(true);
      const response = await getMedicalRecordByPatientApi(auth?.token, id);
      setMedicalRecordDetail(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const updateMedicalRecord = async (id, data) => {
    try {
      setLoading(true);
      const response = await updateMedicalRecordApi(auth?.token, id, data);
      return response;
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  return {
    loading,
    error,
    medicalRecordDetail,
    countMedicalRecords,
    medicalRecords,
    getMedicalRecordByPatient,
    getMedicalRecords,
    updateMedicalRecord,
  };
};
