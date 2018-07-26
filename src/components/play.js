import React, { Component } from "react";

import FaPlay from "react-icons/lib/fa/play";

import FaStop from "react-icons/lib/fa/stop";

import FaHourglass from "react-icons/lib/fa/hourglass";

import "./play.css";
export default class Play extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: this.props.playing || false,
      ready: this.props.ready || false
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ playing: nextProps.playing, ready: nextProps.ready });
  }
  render() {
    //console.log(this.props);
    //console.log(this.state);
    return (
      <div className="play-button" onClick={this.props.onClick}>
        {this.state.ready ? (
          this.state.playing ? (
            <FaStop size={24} />
          ) : (
            <FaPlay size={24} />
          )
        ) : (
          <FaHourglass />
        )}
      </div>
    );
  }
}
