import React, { Component } from "react";
import { NavigationProps } from "../props/NavigationProps";
import { StyleSheet } from "react-native";
import { Grid, Col, Row } from "react-native-easy-grid";

export interface Props extends NavigationProps {}
export interface State {}

export default class DeviceEventDashboard extends Component<Props, State> {}
