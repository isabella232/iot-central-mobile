import MsalPlugin, { MsalUIBehavior } from "react-native-msal-plugin";
import { AUTHORITY, CLIENT_ID, IOTC_SCOPE } from "react-native-dotenv";
import { AsyncStorage } from "react-native";

const scopes = [IOTC_SCOPE];

const login_hint = "user@domain.com";

const forceTokenRefresh = false;

const authClient = new MsalPlugin(AUTHORITY, CLIENT_ID);
let tokenResult = null as any;
const extraQueryParameters = {};
export default class AdalManager {
  static async login() {
    // acquire token
    try {
      tokenResult = await authClient.acquireTokenAsync(
        scopes,
        extraQueryParameters,
        undefined,
        MsalUIBehavior.SELECT_ACCOUNT
      );
      await AsyncStorage.setItem("userId", tokenResult.userInfo.userIdentifier);

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
      const userId =
        (tokenResult && tokenResult.userInfo.userIdentifier) ||
        (await AsyncStorage.getItem("userId"));
      if (!userId) {
        return null;
      }
      tokenResult = await authClient.acquireTokenSilentAsync(
        scopes,
        userId,
        forceTokenRefresh
      );
      await AsyncStorage.setItem("userId", tokenResult.userInfo.userIdentifier);
      return tokenResult;
    } catch (error) {
      console.log(error);
    }
  }
}
