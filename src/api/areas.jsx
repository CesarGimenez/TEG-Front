import { BASE_API } from "../util/constants";

export const getAreasApi = async (token) => {
  try {
    const url = `${BASE_API}/area/`;
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
