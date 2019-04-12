import * as ConnectionManager from "./connection/connectionManager";
const rnBridge = require("rn-bridge");

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/api/device/connect", async (req, res) => {
  console.log("Connect ENDPOINT");
  console.log(req.body);

  const { appKey, deviceId, scopeId } = req.body;
  console.log("Connect Endpoint");
  const device = await ConnectionManager.connect(appKey, deviceId, scopeId);
  console.log("DEVICE CONNECTED");
  console.log({ device });

  res.json({ device });
});

app.post("/api/device/setting/update/complete", async (req, res) => {
  console.log(`Setting Updated: ${JSON.stringify(req.body)}. Sending...`);

  await ConnectionManager.updateSettingComplete(
    req.body.setting,
    req.body.desiredChange
  );
  console.log("Setting Updates.");

  res.send("OK");
});

app.post("/api/device/property/reported", async (req, res) => {
  console.log(`Property Reported: ${req.body}. Sending...`);

  await ConnectionManager.updateProperties(req.body);
  console.log("Property Sent.");

  res.send("OK");
});

app.post("/api/telemetry", async (req, res) => {
  console.log(`Sending... ${req.body}`);
  await ConnectionManager.sendTelemetry(req.body);
  res.send("OK");
});

app.get("/", (req, res) => res.send("OK!"));

app.listen(port, () => console.log(`Node process listening on port ${port}!`));

rnBridge.channel.post("/initialized", {});
