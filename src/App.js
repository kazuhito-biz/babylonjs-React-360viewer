import './App.css';

import React from "react";
import {FreeCamera, Vector3, HemisphericLight, PhotoDome} from "@babylonjs/core";
import SceneComponent from "./SceneComponent";
import {AdvancedDynamicTexture, Button, Control, Grid, SelectionPanel} from "@babylonjs/gui";
// import SceneComponent from 'babylonjs-hook'; // if you install 'babylonjs-hook' NPM.

let box;

// 表示するすべての画像
const imageNames = [
    "home",
    "balcony",
    "kitchen",
];

const onSceneReady = (scene) => {
  // This creates and positions a free camera (non-mesh)
  const camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);

  // This targets the camera to scene origin
  camera.setTarget(Vector3.Zero());

  const canvas = scene.getEngine().getRenderingCanvas();

  // This attaches the camera to the canvas
  camera.attachControl(canvas, true);

  // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
  const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);

  // Default intensity is 1. Let's dim the light a small amount
  light.intensity = 0.7;

  // 360ビュワーを生成
  let viewer = new PhotoDome("360Viewer", "./img/" + imageNames[imageNames.length - 1] + ".jpg", {}, scene);

  // UI表示用ダイナミックテクスチャ
  let advancedDynamicTexture = AdvancedDynamicTexture.CreateFullscreenUI("GUI");

  // UI表示用グリッドの生成と設定
  let grid = new Grid();
  imageNames.forEach(() => {
      grid.addRowDefinition(1);
  });
  grid.addColumnDefinition(1);
  grid.width = 0.06;
  grid.height = 0.06 * imageNames.length;
  grid.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
  grid.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;

  // ボタンに画像を設定
  imageNames.forEach((name, index) => {
    let button = Button.CreateSimpleButton(name, name);
    button.onPointerClickObservable.add((e) => {
        viewer.dispose();
        viewer = new PhotoDome("360Viewer", "./img/" + name + ".jpg", {}, scene);
    });
    grid.addControl(button, index, 0);
  });

  // グリッドを表示
  advancedDynamicTexture.addControl(grid);
};

/**
 * Will run on every frame render.  We are spinning the box on y-axis.
 */
const onRender = (scene) => {
  if (box !== undefined) {
    const deltaTimeInMillis = scene.getEngine().getDeltaTime();

    const rpm = 10;
    box.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
  }
};

export default () => (
    <div>
      <SceneComponent antialias onSceneReady={onSceneReady} onRender={onRender} id="my-canvas" />
    </div>
);