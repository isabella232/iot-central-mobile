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
      console.log(tokenResult.userInfo.userIdentifier);
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
      // TODO: fix all of this--add auth to state management
      const silentTokenresult = await authClient.acquireTokenSilentAsync(
        scopes,
        tokenResult &&
          tokenResult.userInfo &&
          tokenResult.userInfo.userIdentifier
          ? tokenResult.userInfo.userIdentifier
          : "98ab46b9-d712-4f6f-a4ea-d8bafad65a44.72f988bf-86f1-41af-91ab-2d7cd011db47",
        forceTokenRefresh
      );
      console.log("Store the new token", silentTokenresult);
      tokenResult = silentTokenresult;
      return silentTokenresult;
    } catch (error) {
      console.log(error);
    }
  }
}
