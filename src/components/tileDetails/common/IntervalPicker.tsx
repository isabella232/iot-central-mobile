import React, { Component } from "react";
import { Picker, View, StyleSheet } from "react-native";
import * as Colors from "../../styling/colors";

interface Props {
  sendInterval: number;
  updateSendFrequency: (value) => any;
}
interface State {
  multiplier: number;
}
export default class IntervalPicker extends Component<Props, State> {
  constructor(props) {
    super(props);
    const multiplier = this._getMultiplier(props.sendInterval);
    this.state = {
      multiplier
    };
  }
  render() {
    return (
      <View>
        <Picker
          itemStyle={style.pickerItemStyle}
          style={style.picker}
          selectedValue={this._displayedInterval()}
          onValueChange={(itemValue, itemIndex) =>
            this.props.updateSendFrequency(itemValue * this.state.multiplier)
          }
        >
          {range(60, 1).map(i => {
            return <Picker.Item key={i} label={`${i}`} value={i} />;
          })}
        </Picker>
        <Picker
          itemStyle={style.pickerItemStyle}
          style={style.picker}
          selectedValue={this.state.multiplier}
          onValueChange={(itemValue, itemIndex) =>
            this._updateMultiplier(itemValue)
          }
        >
          <Picker.Item key="sec" label="sec" value={1000} />
          <Picker.Item key="min" label="min" value={60 * 1000} />
        </Picker>
      </View>
    );
  }

  // This should go into redux state somehow
  _getMultiplier = sendInterval => {
    return sendInterval > 60 * 1000 ? 60 * 1000 : 1000;
  };

  _updateMultiplier = multiplier => {
    const displayedInterval = this._displayedInterval();
    this.setState({ multiplier });
    this.props.updateSendFrequency(displayedInterval * multiplier);
  };

  _displayedInterval = () => {
    return this.props.sendInterval / this.state.multiplier;
  };
}

function range(size, startAt = 0) {
  return [...Array(size).keys()].map(i => i + startAt);
}

const style = StyleSheet.create({
  picker: {
    height: 160,
    width: 50,
    marginLeft: 40,
    marginRight: 3
  },
  pickerItemStyle: {
    height: 160
  }
});
