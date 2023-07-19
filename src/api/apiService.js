// All API's endpoints uses here
import {
  baseURL,
  getInstance,
  handleError,
  handleResponse,
} from "../utils/axios";

export const AyurMindsApi = {
  signIn: async (userData) => {
    let url = `${baseURL()}user/signin`;
    return await getInstance()
      .post(url, userData)
      .then(handleResponse)
      .catch(handleError);
  },
};
