export enum CommandType {
  command = 'command',
  arc = 'arc',
  circle = 'circle',
  close = 'close',
  curve = 'curve',
  line = 'line',
  move = 'move',
  rect = 'rect',
}

export enum LineType {
  line = 'line',
  horizontalLine = 'horizontal-line',
  verticalLine = 'vertical-line',
}

export enum CurveType {
  line = 'line',
  quadraticCurve = 'quadratic-curve',
  bezierCurve = 'bezier-curve',
}
