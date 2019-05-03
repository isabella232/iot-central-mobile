import React from "react";
import { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import LoginSwitch from "./components/navigation/LoginSwitch";
// import nodejs from "nodejs-mobile-react-native";
import { getStore, getPersistor } from "./store/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
// const _ = require("./helpers/fetchhelper");

export default class App extends Component {
  render() {
    const store = getStore();
    const persistor = getPersistor();
    return (
      <Provider store={store}>
        <PersistGate loading={<View />} persistor={persistor}>
          <LoginSwitch />
        </PersistGate>
      </Provider>
    );
  }

  componentWillMount() {
    // nodejs.start("dist/app.js");
  }
}
