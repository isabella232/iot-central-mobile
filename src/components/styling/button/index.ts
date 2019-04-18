import { StyleSheet } from "react-native";
import * as Colors from "../colors";

export default StyleSheet.create({
  button: {
    backgroundColor: Colors.BUTTON,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    margin: 8,
    marginBottom: 15,
    marginTop: 6,
    shadowColor: Colors.SHADOW_COLOR,
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 3,
    elevation: 5
  },
  buttonText: { color: Colors.BUTTON_TEXT, fontSize: 20 },
  container: {
    paddingTop: 10,
    paddingBottom: 10,
    flex: 1,
    alignItems: "stretch",
    justifyContent: "flex-start"
  }
});
