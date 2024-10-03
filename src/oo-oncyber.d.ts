declare module '@oo/scripting' {
  export type CollisionEnterEvent = { other: any };
  export type TextComponent = {
    text: string;
    visible: boolean;
  };
  export type Component3D = {
    [x: string]: any;
    onSensorEnter: any;
    visible: boolean;
    collider: any;
    position: any;
    quaternion: any;
    getDimensions: () => any;
  };
  export type AudioComponent = {};

  export const UI: UI;
  export const Param: any;
  export const World: any;
  export const $Param: any;
  export const Player: any;
  export const Events: any;
  export const Camera: any;
  export const Device: any;
  export const Folder: any;
  export const Physics: any;
  export const Display: any;
  export const Emitter: any;
  export const Receiver: any;
  export const Controls: any;
  export const Component: any;
  export const PlayerData: any;
  export const Components: any;
  export const ScriptBehavior: any;
  export const ScriptComponent: any;
  export const PlayerAvatarOpts: any;
}
