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
  const data = JSON.stringify(param[0]);
  return InstanceDatosMedicosAxios.post(`/${param[1]}`,data, headerConfig)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

