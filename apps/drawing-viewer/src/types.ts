export type Listenable = {
  addEventListener(event: string, listener: (...args: any[]) => any): any;
  removeEventListener(event: string, listener: (...args: any[]) => any): any;
}

export type Transform = {
  scale: number,
  x: number,
  y: number,
}

export type AnyAction = { type: string, payload: any };
