export const Point = (x, y) => ({x, y});

export const sum = (vec1, vec2) => {
  return {
    x: vec1.x + vec2.x,
    y: vec1.y + vec2.y
  };
};

export const diff = (vec1, vec2) => {
  return {
    x: vec1.x - vec2.x,
    y: vec1.y - vec2.y
  };
};

export const normalize = (vec) => {
  let l = Math.hypot(vec.x, vec.y);
  vec.x /= l;
  vec.y /= l;
};

export const scale = (vec, value) => {
  vec.x *= value;
  vec.y *= value;
};

export const rotate = (vec, angle) => {
  const x = vec.x * Math.cos(angle) - vec.y * Math.sin(angle);
  const y = vec.x * Math.sin(angle) + vec.y * Math.cos(angle);
  vec.x = x;
  vec.y = y;
};
