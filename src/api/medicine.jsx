import { BASE_API } from "../util/constants";

export const getMedicinesApi = async (token, limit, skip) => {
  try {
    let url = `${BASE_API}/medicine`;
    if (limit) {
      url = `${BASE_API}/medicine?limit=${limit}&skip=${skip}`;
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

export const createMedicineApi = async (token, data) => {
  try {
    const url = `${BASE_API}/medicine/`;
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

export const updateMedicineApi = async (token, id, data) => {
  try {
    const url = `${BASE_API}/medicine/${id}`;
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
