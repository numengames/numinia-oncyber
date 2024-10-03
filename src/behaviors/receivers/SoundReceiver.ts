import { Param, Folder, ScriptBehavior, Receiver, AudioComponent } from '@oo/scripting';

export default class SoundReceiver extends ScriptBehavior<AudioComponent> {
  @Folder('Sound Receiver Config')
  @Param({
    min: 0,
    max: 1,
    step: 0.05,
    type: 'number',
    name: 'Volume',
    defaultValue: 0.5,
  })
  private volume = 0.5;
  @Param({ type: 'boolean', defaultValue: false, name: 'loop?' })
  private loop = false;
  @Param({ type: 'boolean', defaultValue: false, name: 'Ambient sound?' })
  private isAmbientSound = false;
  @Param({
    min: 0,
    step: 0.1,
    type: 'number',
    defaultValue: 1,
    name: 'Receiver execution delay (in seconds)',
  })
  private holdTimeDuration = 0;

  @Folder('Signal Receiver')
  @Receiver()
  play(): void {
    try {
      this.host.loop = this.loop;
      this.host.volume = this.volume;
      this.host.ambient = this.isAmbientSound;

      const delay = this.holdTimeDuration * 1000;

      setTimeout(() => {
        this.host.play();
      }, delay);
    } catch (error) {
      console.error('Error trying to play the sound', error);
    }
  }

  @Receiver()
  stop(): void {
    try {
      const delay = this.holdTimeDuration * 1000;

      setTimeout(() => {
        if (this.host.isPlaying) {
          this.host.stop();
        }
      }, delay);
    } catch (error) {
      console.error('Error trying to stop the sound', error);
    }
  }

  @Receiver()
  pause(): void {
    try {
      const delay = this.holdTimeDuration * 1000;

      setTimeout(() => {
        if (this.host.isPlaying) {
          this.host.pause();
        }
      }, delay);
    } catch (error) {
      console.error('Error trying to pause the sound', error);
    }
  }
}
