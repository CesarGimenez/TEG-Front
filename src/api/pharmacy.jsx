import { BASE_API } from "../util/constants";

export const getPharmaciesApi = async (token) => {
  try {
    const url = `${BASE_API}/pharmacy/`;
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

export const getPharmaciesByMedicinesApi = async (token, data) => {
  try {
    const url = `${BASE_API}/pharmacy/medicines`;
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
