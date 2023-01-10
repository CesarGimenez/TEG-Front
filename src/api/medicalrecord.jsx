import { BASE_API } from "../util/constants";

export const getMedicalRecordsApi = async (token, limit, skip) => {
  try {
    let url = `${BASE_API}/medicalrecord`;
    if (limit) {
      url = `${BASE_API}/medicalrecord?limit=${limit}&skip=${skip}`;
    }
    const params = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const updateMedicalRecordApi = async (token, id, data) => {
  try {
    const url = `${BASE_API}/medicalrecord/${id}`;
    const params = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const getMedicalRecordByPatientApi = async (token, id) => {
  try {
    const url = `${BASE_API}/medicalrecord/patient/${id}`;
    const params = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};
