/** @format */

const PORT = import.meta.env.VITE_PORT;

export const ROUTES = {
   CREATE_FILE: `http://localhost:${PORT}/createNewFile/`,
   SAVE_FILE: `http://localhost:${PORT}/save_file/`,
   SELECT_FILE: `http://localhost:${PORT}/select_file/`,
   FILES_LIST: `http://localhost:${PORT}/files/`,
   SAVE_IMAGE: `http://localhost:${PORT}/saveImage/`,
   IMAGES_LIST: `http://localhost:${PORT}/imagesList/`,
   DELETE_IMAGE: `http://localhost:${PORT}/deleteImage/`,
};

export const AXIOS_CONFIG = {
   headers: {
      "Content-Type": "application/json",
   },
};

export const AXIOS_FORMDATA_CONFIG = {
   headers: {
      "Content-Type": "multipart/form-data",
   },
};
