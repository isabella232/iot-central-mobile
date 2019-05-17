import { logInfo } from "../common/logger";

if (process.env.NODE_ENV === `development`) {
  global._fetch = fetch;
  global.fetch = function(uri, options, ...args) {
    return global._fetch(uri, options, ...args).then(response => {
      logInfo("Fetch", { request: { uri, options, ...args }, response });
      return response;
    });
  };
}
