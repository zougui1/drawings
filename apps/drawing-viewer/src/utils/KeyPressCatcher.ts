import { Listenable } from '../types';

export class KeyPressCatcher {

  element: Listenable;
  keys: { [key: string]: boolean } = {};
  downHandlers: { keys: string[], listener: (e: KeyboardEvent) => any }[] = [];

  constructor(element: Listenable = window) {
    this.element = element;
    element.addEventListener('keydown', this.handleKeyDown);
    element.addEventListener('keyup', this.handleKeyUp);
  }

  isPressed(key: string): boolean {
    return this.keys[key];
  }

  arePressed(keys: string[]): boolean {
    return keys.every(key => this.isPressed(key));
  }

  dispose(): void {
    this.element.removeEventListener('keydown', this.handleKeyDown);
    this.element.removeEventListener('keyup', this.handleKeyUp);
  }

  private handleKeyDown = (e: KeyboardEvent): void => {
    this.keys[e.key] = true;

    for (const handler of this.downHandlers) {
      if (this.arePressed(handler.keys)) {
        handler.listener(e);
      }
    }
  }

  private handleKeyUp = (e: KeyboardEvent): void => {
    this.keys[e.key] = false;
  }

  onDown(keys: string[], listener: (e: KeyboardEvent) => any): this {
    this.downHandlers.push({ keys, listener });
    return this;
  }
}
