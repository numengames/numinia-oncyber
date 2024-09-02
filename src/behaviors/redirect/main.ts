import * as React from 'react';
import { UI } from '@oo/scripting';

import ImplementationGuideOverlay from './ImplementationGuideOverlay.tsx';

export default class Game {
  private renderer;

  constructor() {
    this.renderer = UI.createRenderer();
  }

  async onPreload() {
    // invoked once as soon as the game starts loading
    // Use this load resources not already on the scene
    console.log('Game: preload');
  }

  onReady = async () => {
    // invoked once when the game has finished loading
    // Use this for one time initialization logic
    console.log('Game: ready');
  };

  onStart = async () => {
    // invoked each time user starts or replays the game (everytime World.start() is called, we call it by default in Display script)
    // Use this for each play/replay game logic
    console.log('Game: start');

    this.renderer.render(React.createElement(ImplementationGuideOverlay));
  };

  onUpdate = () => {
    // this will be invoked on each frame (assuming the game is not paused)
    // Use this to update the game state, 3D position ...
  };

  onPause = async () => {
    // invoked when the game has been paused from the frontend (pause button, login ...)
    console.log('Game: pause');
  };

  onResume = async () => {
    // invoked when the game resumes after pause from the frontend (eg login finished)
    console.log('Game: resume');
  };

  onEnd = async () => {
    // invoked each time user ends the game (everytime World.stop() is called.)
    // Use this for each end game logic
    console.log('Game: end');
  };

  onDispose = async () => {
    // invoked when it's time to dispose resources (e.g. refreshing the page/switching pages)
    console.log('Game: dispose');
  };
}
