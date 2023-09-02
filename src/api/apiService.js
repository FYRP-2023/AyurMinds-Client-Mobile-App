// All API's endpoints uses here
import {
  authenticationServiceBaseURL,
  autherizationServiceBaseURL,
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
  social_network_service: {
    content: 'content',
    response: 'response',
  }
};

export default AyurMindsApi;
