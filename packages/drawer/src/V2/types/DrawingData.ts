export interface GroupData {
  name: string;
}

export interface DrawingData {
  name: string;
  zIndex: number;
  stroke?: string;
  fill?: string;
  strokeWidth?: number;
}

export type FlatDrawingData = (DrawingData | GroupData) & { path: string | undefined };
