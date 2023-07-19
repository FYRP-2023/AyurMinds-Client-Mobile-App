// All API's endpoints uses here
import {
  authServiceBaseURL,
  getAuthServiceInstance,
  handleError,
  handleResponse,
} from "../utils/axios";

export const AyurMindsApi = {
  signIn: async (userData) => {
    let url = `${authServiceBaseURL()}user/signin`;
    return await getAuthServiceInstance()
      .post(url, userData)
      .then(handleResponse)
      .catch(handleError);
  },
};
