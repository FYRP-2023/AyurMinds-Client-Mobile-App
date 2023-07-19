import axios from "axios";

// add each services base url here
export const authServiceBaseURL = () => {
  const authService =
    process.env.AUTH_SERVICE_LOCAL && process.env.AUTH_SERVICE_LOCAL;
  return authService;
};

//create instance of each services here
export const getAuthServiceInstance = () => {
  // const token = tokenStore.getState().token;
  return axios.create({
    headers: { Authorization: `Bearer ${token}` },
    baseURL: authServiceBaseURL(),
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
