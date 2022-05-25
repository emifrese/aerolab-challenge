import axios from "axios";

const clienteAxios = axios.create({
  baseURL: "https://coding-challenge-api.aerolab.co",
});

export default clienteAxios;
