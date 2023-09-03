import axios from "axios";
import { configs } from "../../configs";

// add each services base url here
export const authenticationServiceBaseURL = () => {
  return configs.AUTHENTICATION_SERVICE;
};

export const autherizationServiceBaseURL = () => {
  return configs.AUTHERIZATION_SERVICE;
};

export const chatServiceBaseURL = () => {
  return configs.CHAT_SERVICE;
};
export const messageServiceBaseURL = () => {
  return configs.MESSAGE_SERVICE;
};
export const doctorServiceBaseURL = () => {
  return configs.DOCTOR_SERVICE;
};

//create instance of each services here
export const getAxiosInstance = () => {
  return axios.create({
    baseURL: configs.API_GATWAY_URL,
  });
};

export const getAxiosSocialNetworkInstance = () => {
  return axios.create({
    baseURL: configs.SOCIAL_NETWROK_SERVICE,
  });
};

// export const handleResponse = (response) => {
//   console.log("🚀 ~ file: axios.js:31 ~ handleResponse ~ response:", response)
//   return {
//     data: response && response.data ? response.data : null,
//     status: response && response.status ? response.status : 500,
//     message: response && response.data ? response.data.message : "",
//   };
// };
// //

// export const handleError = (errorObject) => {
//   throw new Error(errorObject);
// };
