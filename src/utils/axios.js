import axios from "axios";

export const baseURL = () => {
  const apiUrl =
    process.env.AYUR_MIND_MOBILE_SERVICE_LOCAL &&
    process.env.AYUR_MIND_MOBILE_SERVICE_LOCAL;

  return apiUrl;
};
//
export const getInstance = () => {
  // const token = tokenStore.getState().token;
  return axios.create({
    headers: { Authorization: `Bearer ${token}` },
    baseURL: baseURL(),
  });
};
//
export const handleResponse = (response) => {
  return {
    data: response && response.data ? response.data.data : null,
    errors: response && response.data ? response.data.errors : {},
    status: response && response.status ? response.status : 500,
    message: response && response.data ? response.data.message : "",
  };
};
//
export const handleError = (errorObject) => {
  return errorObject;
};
