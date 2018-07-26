import React, { Component } from "react";
import Tone from "tone";

import "./App.css";

import { Scene, Play, Mountains } from "./components";

var synth = new Tone.Synth({
  oscillator: {
    type: "pwm",
    modulationFrequency: 0.5
  },
  envelope: {
    attack: 0.005,
    decay: 0.2,
    sustain: 0.2,
    release: 0.5
  },
  portamento: 0.01
});

synth.volume.value = -18;

var distortion = new Tone.Distortion(0.8);

var filter = new Tone.Filter(6400);

var vibrato = new Tone.Vibrato();

var reverb = new Tone.Freeverb(0.3);

var player = new Tone.Player("./electro.mp3").toMaster();

synth.chain(distortion, filter, vibrato, reverb, Tone.Master);

player.volume.value = 2;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { keys: [], play: false, ready: false, effects: false };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);

    Tone.Buffer.on("load", () => {
      //all buffers are loaded.
      this.setState({ ready: true });
    });

    window.addEventListener("click", this._handleDocumentClick, false);
    window.addEventListener("keydown", this._handleKeyDown.bind(this));
    window.addEventListener("keyup", this._handleKeyUp.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
    window.removeEventListener("click", this._handleDocumentClick, false);
    window.removeEventListener("keydown", this._handleKeyDown.bind(this));
    window.addEventListener("keyup", this._handleKeyUp.bind(this));
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  _handlePlay() {
    if (player.state === "stopped") {
      player.start();
    }
  }

  _handleStop() {
    if (player.state === "started") {
      player.stop();
    }
  }

  playNotes(keyCode) {
    switch (keyCode) {
      // Low Keys
      case 90:
        //z
        synth.triggerAttack("A2");
        break;
      case 88:
        //x
        synth.triggerAttack("C3");
        break;
      case 67:
        //c
        synth.triggerAttack("D3");
        break;
      case 86:
        //v
        synth.triggerAttack("F3");
        break;
      case 66:
        //b
        synth.triggerAttack("G3");
        break;
      case 78:
        //n
        synth.triggerAttack("A3");
        break;
      case 77:
        //m
        synth.triggerAttack("C4");
        break;
      case 188:
        //ö
        synth.triggerAttack("D4");
        break;
      case 190:
        //ç
        synth.triggerAttack("F4");
        break;

      //Mid Keys
      case 65:
        //a
        synth.triggerAttack("G3");
        break;
      case 83:
        //s
        synth.triggerAttack("A3");
        break;
      case 68:
        //d
        synth.triggerAttack("C4");
        break;
      case 70:
        //f
        synth.triggerAttack("D4");
        break;
      case 71:
        //g
        synth.triggerAttack("F4");
        break;
      case 72:
        //h
        synth.triggerAttack("G4");
        break;
      case 74:
        //j
        synth.triggerAttack("A4");
        break;
      case 75:
        //k
        synth.triggerAttack("C5");
        break;
      case 76:
        //l
        synth.triggerAttack("D5");
        break;
      case 186:
        //ş
        synth.triggerAttack("F5");
        break;

      //High Keys
      case 81:
        //q
        synth.triggerAttack("F4");
        break;
      case 87:
        //w
        synth.triggerAttack("G4");
        break;
      case 69:
        //e
        synth.triggerAttack("A4");
        break;
      case 82:
        //r
        synth.triggerAttack("C5");
        break;
      case 84:
        //t
        synth.triggerAttack("D5");
        break;
      case 89:
        //y
        synth.triggerAttack("F5");
        break;
      case 85:
        //u
        synth.triggerAttack("G5");
        break;
      case 73:
        //i
        synth.triggerAttack("A5");
        break;
      case 79:
        //o
        synth.triggerAttack("C6");
        break;
      case 80:
        //p
        synth.triggerAttack("D6");
        break;

      default:
        break;
    }
  }

  _handleKeyDown(event) {
    if (event.keyCode >= 65 && event.keyCode <= 90) {
      const pressedKeys = this.state.keys;
      let pressed = false;

      pressedKeys.forEach(pk => {
        if (event.keyCode === pk) {
          pressed = true;
        }
      });
      //console.log(pressed)

      if (!pressed) {
        pressedKeys.push(event.keyCode);
        this.playNotes(event.keyCode);
        this.setState({ keys: pressedKeys });
      }
    }
  }

  _handleKeyUp(event) {
    if (this.state.keys.length === 1) {
      this.setState({ fired: false });

      synth.triggerRelease();
      this.setState({ keys: [] });
    }

    if (this.state.keys.length > 1) {
      let pressedKeys = this.state.keys;

      var index = pressedKeys.indexOf(event.keyCode);

      if (index > -1) {
        pressedKeys.splice(index, 1);
      }

      this.playNotes(pressedKeys[pressedKeys.length - 1]);

      this.setState({ keys: pressedKeys });
    }
  }

  render() {
    //console.log(this.state.play);
    this.state.play ? this._handlePlay() : this._handleStop();

    return (
      <div className={this.state.play ? "App App-color-bg" : "App"}>
        <div className="title">Feel Good</div>
        <div className="subtitle">Solo</div>
        {this.state.play ? (
          <div>
            <div className="sun" />
            <div className="moon" />
            <div className="landscape">
              <Mountains />
            </div>
          </div>
        ) : (
          <div className="how-to">
            <p>
              Press Play button,<br />
              Play a solo with your keyboard.<br />
              <br />
              'c' -> "D3", 'f' -> "D4", 't' -> "D5"<br />
              <br />
              Have Fun.
            </p>
          </div>
        )}

        <div className="buttons">
          <Play
            onClick={() => {
              this.setState({ play: !this.state.play });
            }}
            playing={this.state.play}
            ready={this.state.ready}
          />
        </div>

        <div className="lights-container">
          <div className="lights-perspectived">
            {this.state.keys.map((k, i) => {
              const rand = Math.floor(Math.random() * 50) + 25;
              return (
                <div
                  className="light"
                  key={i}
                  style={{ marginLeft: `${rand}%` }}
                />
              );
            })}
          </div>
        </div>
        <div className="grid-container">
          <Scene />
        </div>
      </div>
    );
  }
}

export default App;
