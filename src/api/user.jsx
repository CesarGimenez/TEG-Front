import { BASE_API } from "../util/constants";

export const getUsersApi = async (token) => {
  try {
    const url = `${BASE_API}/user/`;
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
