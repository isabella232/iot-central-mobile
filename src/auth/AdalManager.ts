import MsalPlugin, { MsalUIBehavior } from "react-native-msal-plugin";
import { AUTHORITY, CLIENT_ID, IOTC_SCOPE } from "react-native-dotenv";

const scopes = [IOTC_SCOPE];

const login_hint = "user@domain.com";

const forceTokenRefresh = false;

const authClient = new MsalPlugin(AUTHORITY, CLIENT_ID);
let tokenResult = {} as any;
const extraQueryParameters = {};
export default class AdalManager {
  static async login() {
    // acquire token
    try {
      tokenResult = await authClient.acquireTokenAsync(
        scopes,
        extraQueryParameters,
        login_hint,
        MsalUIBehavior.SELECT_ACCOUNT
      );
      console.log("Store the token", tokenResult);
      return tokenResult;
    } catch (error) {
      console.log(error);
    }
  }

  static async logout() {
    try {
      return authClient.tokenCacheDelete();
    } catch (error) {
      console.log(error);
    }
  }

  static async getToken() {
    try {
      const silentTokenresult = await authClient.acquireTokenSilentAsync(
        scopes,
        tokenResult.userInfo.userIdentifier,
        forceTokenRefresh
      );
      console.log("Store the new token", silentTokenresult);
      return silentTokenresult;
    } catch (error) {
      console.log(error);
    }
  }
}
