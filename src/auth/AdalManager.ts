import {
  MSAdalLogin,
  MSAdalLogout,
  getValidMSAdalToken,
  MSAdalAuthenticationContext
} from "react-native-ms-adal";
import {
  AUTHORITY,
  CLIENT_ID,
  REDIRECT_URI,
  RES_IOTC
} from "react-native-dotenv";

export default class AdalManager {
  static login() {
    return MSAdalLogin(AUTHORITY, CLIENT_ID, REDIRECT_URI, RES_IOTC);
  }

  static logout() {
    return MSAdalLogout();
  }

  static async getToken() {
    // TODO: run commands in parallel, benchmark, return fastest
    // const existingToken = getValidMSAdalToken(AUTHORITY);
    const context = new MSAdalAuthenticationContext(AUTHORITY);
    return context.acquireTokenSilentAsync(RES_IOTC, CLIENT_ID).then(
      token => {
        return token;
      },
      _ => {
        return null;
      }
    );
    // return getValidMSAdalToken(AUTHORITY);
  }
}
