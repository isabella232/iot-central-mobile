export function pitch({ x, y, z }) {
  if (!x || !y || !z || (y == 0 && z == 0)) {
    return 0;
  }
  /*
    return Math.atan2(
    x,
    Math.sqrt(y * y + z * z)
    );*/

  const pitch = Math.atan(x / Math.sqrt(y * y + z * z));
  return pitch;
}

export function roll({ x, y, z }) {
  if (!x || !y || !z || (x == 0 && z == 0)) {
    return 0;
  }

  /*
    return Math.atan2(
      y,
      Math.sqrt(x * x + z * z)
    ); */
  const roll = Math.atan(y / Math.sqrt(x * x + z * z));
  return roll;
}

function yaw({ x, y, z }) {
  if (!x || !y || !z || (x == 0 && z == 0)) {
    return 0;
  }
  const yaw = Math.atan(z / Math.sqrt(x * x + z * z));
  return yaw;
}
