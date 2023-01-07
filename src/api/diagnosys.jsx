import { BASE_API } from "../util/constants";

export const getDiagnosysByPatientApi = async (token, id) => {
  try {
    let url = `${BASE_API}/diagnosis/patient/${id}`;
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
