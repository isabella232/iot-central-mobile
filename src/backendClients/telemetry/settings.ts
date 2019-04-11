import { BACKEND_API } from "react-native-dotenv";

export function updateSettingsComplete(body) {
  return fetch(BACKEND_API + "api/device/setting/update/complete", {
    method: "POST",
    headers: {
      "Cache-Control": "no-cache",
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  })
    .then(res => {
      return res;
    })
    .catch(err => {
      console.log("Error in sending props");
      console.log(err);
    });
}
