import * as ConnectionManager from "./connection/connectionManager";
import { logInfo } from "./logging/logger";
const rnBridge = require("rn-bridge");

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/api/device/connect", async (req, res) => {
  const { appKey, deviceId, scopeId } = req.body;
  try {
    const device = await ConnectionManager.connect(appKey, deviceId, scopeId);
    res.json({ device });
  } catch (e) {
    if (e.status && e.message) {
      res.status(e.status).send(e.message);
    } else {
      res.status(500).send("Error Connecting Device.");
    }
  }
});

app.post("/api/device/disconnect", async (req, res) => {
  try {
    await ConnectionManager.disconnect();
    res.send("OK");
  } catch (e) {
    if (e.status && e.message) {
      res.status(e.status).send(e.message);
    } else {
      res.status(500).send("Error Disconnecting Device.");
    }
  }
});

app.post("/api/device/setting/update/complete", async (req, res) => {
  try {
    await ConnectionManager.updateSettingComplete(
      req.body.setting,
      req.body.desiredChange
    );
    res.send("OK");
  } catch (e) {
    if (e.status && e.message) {
      res.status(e.status).send(e.message);
    } else {
      res.status(501).send("Error Reporting Setting Update.");
    }
  }
});

app.post("/api/device/property/reported", async (req, res) => {
  try {
    await ConnectionManager.updateProperties(req.body);
    res.send("OK");
  } catch (e) {
    if (e.status && e.message) {
      res.status(e.status).send(e.message);
    } else {
      res.status(502).send("Error Reporting Property.");
    }
  }
});

app.post("/api/telemetry", async (req, res) => {
  try {
    await ConnectionManager.sendTelemetry(req.body);
    res.send("OK");
  } catch (e) {
    if (e.status && e.message) {
      res.status(e.status).send(e.message);
    } else {
      res.status(503).send("Error Sending Telemetry.");
    }
  }
});

app.get("/", (req, res) => res.send("OK!"));

app.listen(port, () => logInfo(`Node process listening on port ${port}!`));

rnBridge.channel.post("/initialized", {});
