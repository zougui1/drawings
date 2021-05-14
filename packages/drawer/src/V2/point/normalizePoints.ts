export const normalizePoints = (coords: (number | { x: number, y: number })[]): { x: number, y: number }[] => {
  const points: { x: number, y: number }[] = [];

  for (let i = 0; i < coords.length; i++) {
    const coord = coords[i];
    const nextCoord = coords[i + 1];

    if (typeof coord === 'number') {
      if (typeof nextCoord !== 'number') {
        throw new Error(`Invalid coordinates. Expect either two numbers or a point. Got only a number.`);
      }

      points.push({ x: coord, y: nextCoord });
      i++;
    } else {
      points.push(coord);
    }
  }

  return points;
}
