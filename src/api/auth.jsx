import { BASE_API } from "../util/constants";
import { getToken } from "./token";

export const LoginAPI = async (auth) => {
  try {
    const res = await fetch(`${BASE_API}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(auth),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getMeApi = async () => {
  try {
    const url = `${BASE_API}/auth/me`;
    const params = {
      method: "GET",
      headers: {
        jwt: getToken(),
      },
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};
