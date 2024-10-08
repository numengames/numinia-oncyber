import * as React from 'react';
import { UI } from '@oo/scripting';

import App from '../../components/App.tsx';

interface EventData {
  eventType: string;
  objectId: string;
  message: string;
}

class Store<Data extends Record<string, any>> {
  renderer = UI.createRenderer();

  private data: Data;
  private idCounter = 0;
  private listeners: Record<string, () => void> = {};

  constructor(data: Data) {
    this.data = data;
  }

  subscribe(listener: () => void): () => void {
    const id = `listener_${this.idCounter++}`;
    this.listeners[id] = listener;
    return () => {
      delete this.listeners[id];
    };
  }

  getSnapshot(): Data {
    return this.data;
  }

  setState(newState: Partial<Data>) {
    const hasChanged = Object.keys(newState).some(
      key => this.data[key as keyof Data] !== newState[key as keyof Data],
    );

    if (hasChanged) {
      this.data = {
        ...this.data,
        ...newState,
      };
      Object.values(this.listeners).forEach(listener => listener());
    }
  }
}

export const store = new Store({
  name: '',
  userId: '',
  eventQueue: [] as EventData[],
});

export const addEventToQueue = (eventData: EventData) => {
  const currentQueue = store.getSnapshot().eventQueue;
  store.setState({ eventQueue: [...currentQueue, eventData] });
};

export const getEventQueue = () => store.getSnapshot().eventQueue;
export const clearEventQueue = () => store.setState({ eventQueue: [] });

store.subscribe(() => {
  store.renderer.render(React.createElement(App));
});
