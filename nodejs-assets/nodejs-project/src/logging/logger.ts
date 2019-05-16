const rnBridge = require("rn-bridge");

export function logError(...params) {
  rnBridge.channel.post("/log/error", { params });
}

export function logInfo(...params) {
  // console.log("node env:", process.env.NODE_ENV);
  rnBridge.channel.post("/log/info", { params });
}

export function logAppCenter(event, properties: { [name: string]: string }) {
  // console.log("node env:", process.env.NODE_ENV);
  rnBridge.channel.post("/log/appcenter", { event, properties });
}
