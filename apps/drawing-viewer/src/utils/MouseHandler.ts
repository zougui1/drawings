import _ from 'lodash';

import { Listenable } from '../types';

export class MouseHandler {

  element: Listenable;
  moveWhenDownHandlers: ((event: MouseEvent, downEvent: MouseEvent) => any)[] = [];
  downHandlers: ((event: MouseEvent) => any)[] = [];
  downEvent: MouseEvent | null = null;

  constructor(element: Listenable = window) {
    this.element = element;
    element.addEventListener('mousedown', this.handleMouseDown);
    element.addEventListener('mouseup', this.handleMouseUp);
    element.addEventListener('mousemove', _.throttle(this.handleMouseMove, 10));
  }

  private handleMouseDown = (e: MouseEvent): void => {
    this.downEvent = e;

    for (const handler of this.downHandlers) {
      handler(e);
    }
  }

  private handleMouseUp = (e: MouseEvent): void => {
    this.downEvent = null;
  }

  private handleMouseMove = (e: MouseEvent): void => {
    if (this.downEvent) {
      for (const handler of this.moveWhenDownHandlers) {
        handler(e, this.downEvent);
      }
    }
  }

  onDown = (listener: (e: MouseEvent) => any): this => {
    this.downHandlers.push(listener);
    return this;
  }

  onMoveWhenDown = (listener: (e: MouseEvent, downEvent: MouseEvent) => any): this => {
    this.moveWhenDownHandlers.push(listener);
    return this;
  }

  dispose(): void {
    this.element.removeEventListener('mousedown', this.handleMouseDown);
    this.element.removeEventListener('mouseup', this.handleMouseUp);
    this.element.removeEventListener('mousemove', this.handleMouseMove);
  }
}
