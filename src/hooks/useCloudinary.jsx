import { useState } from "react";
import { uploadImageApi, uploadImageUserAPI } from "../api/cloudinary";

export const useCloudinary = () => {
  const [loadingImage, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [image, setImage] = useState(null);

  const uploadImageToCloudinary = async (file) => {
    try {
      setLoading(true);
      const response = await uploadImageApi(file);
      setLoading(false);
      return response;
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const uploadImageUser = async (body, id) => {
    try {
      setLoading(true);
      const response = await uploadImageUserAPI(body, id);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    loadingImage,
    error,
    image,
    uploadImageToCloudinary,
    uploadImageUser,
  };
};
