import { updateTelemetry } from "../telemetry/telemetryduck";
import { Pedometer } from "expo-sensors";

export const UPDATE = "aziot/slider/UPDATE";

const initialState = {
  data: {
    slider: 0
  }
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE:
      return {
        ...state,
        data: { ...state.data, ...action.data }
      };
    default:
      return state;
  }
}

export function update(value) {
  return { type: UPDATE, data: { slider: value } };
}
