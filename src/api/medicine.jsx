import { BASE_API } from "../util/constants";

export const getMedicinesApi = async (token) => {
  try {
    const url = `${BASE_API}/medicine/`;
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
