import { fetchSinToken, fetchConToken, fetchFiles } from "./fetch";

export const getProducts = async (endpoint) => {
  const resp = await fetchSinToken(endpoint);
  const body = await resp.json();

  return body;
};

export const postProducts = async (endpoint, values) => {
  const resp = await fetchConToken(endpoint, values, "POST");
  const body = await resp.json();

  return body;
};

export const postImgProduct = async (endpoint, values) => {
  const resp = await fetchFiles(endpoint, values, "POST");
  const body = await resp.json();

  return body;
};
