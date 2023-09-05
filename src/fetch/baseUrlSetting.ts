import axios from "axios";

const host = window.location.hostname === "localhost" ? "http://officefinder.site" : "api";

export const apiClient = axios.create({
  baseURL: host,
});
