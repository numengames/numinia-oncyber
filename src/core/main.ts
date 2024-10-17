import { World, Player } from '@oo/scripting';

import { store } from '../common/state/appState';

export default class Game {
  async onPreload() {
    // invoked once as soon as the game starts loading
    // Use this load resources not already on the scene
    console.log('Game: preload');
  }

  private async sendPlayerSessionRequest(endpoint: string, bodyData: Record<string, any>) {
    try {
      // const response = await fetch(`https://core-api.numinia.xyz/api/player-session/${endpoint}`, {
      const response = await fetch(
        `https://nnbz8th8-8000.uks1.devtunnels.ms/api/player-session/${endpoint}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(bodyData),
        },
      );
      const data = await response.json();
      console.log('Success:', data);
      return data.sessionId;
    } catch (error) {
      console.error('Error:', error);
    }
  }

  private async checkAndCreatePlayer({ platform, playerId, playerName }: Record<string, string>) {
    try {
      const response = await fetch(
        `https://nnbz8th8-8000.uks1.devtunnels.ms/api/player/${platform}/${playerId}`,
      );

      const data = await response.json();

      if (data.message === 'Player not found' && data.player === null) {
        const createResponse = await fetch(
          'https://nnbz8th8-8000.uks1.devtunnels.ms/api/player/external',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ platform, playerId, playerName }),
          },
        );

        if (!createResponse.ok) {
          throw new Error('Failed to create player');
        }

        return createResponse.json();
      }

      return data;
    } catch (error) {
      console.error('Error checking or creating player:', error);
    }
  }

  onReady = async () => {
    // invoked once when the game has finished loading
    // Use this for one time initialization logic
    console.log('Game: ready');
  };

  onStart = async () => {
    // invoked each time user starts or replays the game (everytime World.start() is called, we call it by default in Display script)
    // Use this for each play/replay game logic
    World.name = 'Numinian tools - Insert Password';
    console.log('Game: start');

    const { name, userId } = Player.data;

    let playerId;

    if (playerId) {
      const result = await this.checkAndCreatePlayer({
        playerId: userId,
        playerName: name,
        platform: 'oncyber',
      });
      playerId = result?.playerId;
    }

    const bodyData = {
      spaceName: name,
      userAgent: navigator.userAgent,
      platform: 'oncyber',
      ...(playerId && { playerId }),
    };

    const sessionId = await this.sendPlayerSessionRequest('start', bodyData);

    store.setState({ userId: playerId, name, sessionId });
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

    const { sessionId } = store.getSnapshot();
    await this.sendPlayerSessionRequest('end', { sessionId });
  };
}
