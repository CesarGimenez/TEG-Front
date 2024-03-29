import { BASE_API } from "../util/constants";
import { removeToken } from "./token";

export const getUsersApi = async (token, limit, skip) => {
  try {
    let url = `${BASE_API}/user/`;
    if (limit) {
      url = `${BASE_API}/user?limit=${limit}&skip=${skip}`;
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

export const getUserApi = async (token, id) => {
  try {
    const url = `${BASE_API}/user/${id}`;
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

export const getUserByDNIApi = async (token, dni) => {
  try {
    const url = `${BASE_API}/user/dni/${dni}`;
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

export const getUserByQueryApi = async (token, query) => {
  try {
    const { first_name, last_name, dni } = query;
    const url = `${BASE_API}/user/query?first_name=${first_name}&last_name=${last_name}&dni=${dni}`;
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

export const getUserFamilyApi = async (token, id) => {
  try {
    const url = `${BASE_API}/user/family/${id}`;
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

export const getUsersByAreaApi = async (token, data) => {
  try {
    const url = `${BASE_API}/user/area`;
    const params = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    console.log(data);
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const updateUserApi = async (token, id, data) => {
  try {
    const url = `${BASE_API}/user/${id}`;
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

export const updatePasswordApi = async (token, id, data) => {
  try {
    const url = `${BASE_API}/user/changepass/${id}`;
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

export const getUsersDoctorsApi = async (token) => {
  try {
    const url = `${BASE_API}/user/role/62d896e5c3885dab609328d4`;
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

export const createUserApi = async (token, data) => {
  try {
    const url = `${BASE_API}/user`;
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

export const deleteUserApi = async (token, id) => {
  try {
    const url = `${BASE_API}/user/${id}`;
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
