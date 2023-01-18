import { BASE_API } from "../util/constants";

export const getCentersApi = async (token, limit, skip) => {
  try {
    let url = `${BASE_API}/healthcenter/`;
    if (limit) {
      url = `${BASE_API}/healthcenter?limit=${limit}&skip=${skip}`;
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

export const getCentersByDoctorApi = async (token, id) => {
  try {
    const url = `${BASE_API}/healthcenter/doctor/${id}`;
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

export const getOneCenterApi = async (token, id) => {
  try {
    const url = `${BASE_API}/healthcenter/${id}`;
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

export const createCenterApi = async (token, data) => {
  try {
    const url = `${BASE_API}/healthcenter/`;
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

export const updateCenterApi = async (token, id, data) => {
  try {
    const url = `${BASE_API}/healthcenter/${id}`;
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

export const deleteCenterApi = async (token, id) => {
  try {
    const url = `${BASE_API}/healthcenter/${id}`;
    const params = {
      method: "DELETE",
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
