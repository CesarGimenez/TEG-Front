import { BASE_API } from "../util/constants";

export const getDiseasesApi = async (token, limit, skip) => {
  try {
    let url = `${BASE_API}/disease`;
    if (limit) {
      url = `${BASE_API}/disease?limit=${limit}&skip=${skip}`;
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

export const createDiseaseApi = async (token, data) => {
  try {
    const url = `${BASE_API}/disease/`;
    const params = {
      method: "POST",
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

export const updateDiseaseApi = async (token, id, data) => {
  try {
    const url = `${BASE_API}/disease/${id}`;
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
