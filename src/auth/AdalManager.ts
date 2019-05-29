import MsalPlugin, { MsalUIBehavior } from "react-native-msal-plugin";
import { RN_AUTHORITY, RN_CLIENT_ID, RN_IOTC_SCOPE } from "react-native-dotenv";
import { AsyncStorage } from "react-native";
import { logError } from "../common/logger";

const scopes = [RN_IOTC_SCOPE];

const login_hint = "user@domain.com";

const forceTokenRefresh = false;

const authClient = new MsalPlugin(RN_AUTHORITY, RN_CLIENT_ID);
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
      logError(error);
    }
  }

  static async logout() {
    try {
      return authClient.tokenCacheDelete();
    } catch (error) {
      logError(error);
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
      logError(error);
    }
  }
}
