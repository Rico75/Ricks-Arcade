import Phaser from "phaser";
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import {LightCycles} from "/src/scenes/LightCycles";

export const config = {
  type: Phaser.AUTO,
  parent: "phaser",
  width: 800,
  height: 600,
  state: this,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true
    }
  },
  scene: [LightCycles]
};

ReactDOM.render(
  <App game={game} />,
  document.getElementById("root") || document.createElement("div")
);
