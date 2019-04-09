import { BACKEND_API } from "react-native-dotenv";

export function updateProperties(properties) {
  console.log(properties);
  return fetch(BACKEND_API + "api/device/property/reported", {
    method: "POST",
    headers: {
      "Cache-Control": "no-cache",
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(properties)
  })
    .then(res => {
      console.log(res);
      return res;
    })
    .catch(err => {
      console.log("Error in sending props");
      console.log(err);
    });
}
