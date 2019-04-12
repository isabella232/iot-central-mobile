import React, { Component } from "react";
import moment from "moment";
import Tile from "./tile";

export interface Props {
  onPress: () => any;
  title: string;
  event: any;
}

export interface State {}
export default class EventTile extends Component<Props, State> {
  render() {
    return (
      <Tile
        {...this.props}
        subTitle={
          this.props.event && this.props.event.date
            ? moment(this.props.event.date).fromNow()
            : "Not sent yet"
        }
        subIcon={null}
        large={true}
      >
        {this.props.children}
      </Tile>
    );
  }
}
