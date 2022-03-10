import axios from "axios";
const InstanceDatosMedicosAxios = axios.create({ baseURL: "https://localhost:5001/api/Venta" });
const headerConfig = {
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
    authorization: "Bearer" + window.localStorage.getItem("access_token"),
  },
};

export const getVentas = (param) => {
  const data = JSON.stringify(param);
  return InstanceDatosMedicosAxios.get(`/${param}`, headerConfig)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const postVenta = (param) => {
  const data = JSON.stringify(param);
  return InstanceDatosMedicosAxios.post(`/${param}`,data, headerConfig)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

