import { BASE_API } from "../util/constants";

export const uploadImageApi = async (data) => {
  try {
    const formData = new FormData();
    formData.append("file", data);
    const url = `${BASE_API}/cloudinary/upload`;
    const params = {
      method: "POST",
      body: formData,
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const uploadImageUserAPI = async (body, id) => {
  try {
    const url = `${BASE_API}/user/uploadImage/${id}`;
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};
