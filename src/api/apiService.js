// All API's endpoints uses here
import {
  authenticationServiceBaseURL,
  autherizationServiceBaseURL,
  chatServiceBaseURL,
  messageServiceBaseURL,
  doctorServiceBaseURL,
} from "../utils/axios";

const AyurMindsApi = {
  authentication_service: {
    register: `${authenticationServiceBaseURL()}/`,
    signIn: `${authenticationServiceBaseURL()}/signin`,
    access: `${authenticationServiceBaseURL()}/access`,
    logout: `${authenticationServiceBaseURL()}/signout`,
  },
  authorization_service: {
    info: `${autherizationServiceBaseURL()}/info`,
    //   return await getAuthServiceInstance()
    //     .get(url, {
    //       headers: { Authorization: token },
    //     })
    //     .then((res) => handleResponse(res))
    //     .catch((err) => handleError(err));
    // },
  },

  message_service: {
    allMessages: `${messageServiceBaseURL()}/`,
    sendMessage: `${messageServiceBaseURL()}/`,
    accessChat: `${chatServiceBaseURL()}/`,
    fetchChats: `${chatServiceBaseURL()}/`,
    createGroupChat: `${chatServiceBaseURL()}/group`,
    rename: `${chatServiceBaseURL()}/rename`,
    groupremove: `${chatServiceBaseURL()}/removeFromGroup`,
    addToGroup: `${chatServiceBaseURL()}/groupadd`,
  },
  social_network_service: {
    content: "content",
    response: "response",
  },

  doctor_service: {
    getDiseases: `${doctorServiceBaseURL()}/getDiseases`,
    getDoctors: `${doctorServiceBaseURL()}/getAllDoctors`,
    updateDoctorDetails: `${doctorServiceBaseURL()}/updateDoctorDetails`,
  },
};

export default AyurMindsApi;
