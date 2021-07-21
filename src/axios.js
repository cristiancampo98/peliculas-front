import axios from "axios";

export default axios.create({
  baseURL: "http://peliculas-api.test/api",
});
