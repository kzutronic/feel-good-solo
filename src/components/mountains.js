import React, { Component } from "react";

import M1 from "./mountain1.svg";

import M2 from "./mountain2.svg";

import "./mountains.css";

class Mountains extends Component {
  render() {
    return (
      <div className="mountains-wrapper">
        <div className="mountain">
          <img src={M1} />
        </div>
        <div className="mountain">
          <img src={M2} />
        </div>
      </div>
    );
  }
}

export default Mountains;
