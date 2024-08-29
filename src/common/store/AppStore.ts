export default class AppStore<Data extends object> {
  listeners: Record<string, () => void> = {};
  data: Data;
  id = 0;

  constructor(data: Data) {
    this.data = data;
  }

  subscribe(f: any) {
    this.id++;
    this.listeners[this.id] = f;
    return () => delete this.listeners[this.id];
  }

  getSnapshot(): Data {
    return this.data;
  }

  setState(newState: Partial<Data>) {
    this.data = {
      ...this.data,
      ...newState,
    };

    Object.values(this.listeners).forEach(x => x());
  }
}
