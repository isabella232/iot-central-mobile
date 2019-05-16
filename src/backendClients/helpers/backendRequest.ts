import { BACKEND_API } from "react-native-dotenv";
import { logInfo, logError } from "../../common/logger";

export async function makeRequest(path: string, method = "GET", body?: {}) {
  try {
    const response = await fetch(BACKEND_API + path, {
      method: method,
      headers: {
        "Cache-Control": "no-cache",
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: body && JSON.stringify(body)
    });

    // const json = await response.json();
    //logInfo("Request Result JSON", json);
    if (!response.ok) {
      throw new Error(
        response.statusText || "Error making request to backend!"
      );
    }
    return response;
  } catch (error) {
    // logError("Error making request", error);
    throw error;
  }
}
