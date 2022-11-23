export const Point = (x, y) => ({x, y, z: 1});

const multiple = (a, b) => {
  const n = 3;
  const c = Array(n).fill().map(() => Array(n).fill(0));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      for (let k = 0; k < n; k++)
        c[i][j] += a[i][k] * b[k][j];
    }
  }
  return c;
}

export const multipleMatrices = (...matrices) => {
  return matrices.reduce(multiple);
};

const columnMatrixFromVector = (vector) => {
  const { x, y, z = 1 } = vector;
  return [
    [x],
    [y],
    [z]
  ]
};

const vectorFromColumnMatrix = (matrix) => {
  const x = matrix[0][0];
  const y = matrix[1][0];
  const z = matrix[2][0];
  return { x, y, z };
};

export const transform = (matrix, vector) => {
  vector = multipleMatrices(matrix, columnMatrixFromVector(vector));
  return vectorFromColumnMatrix(vector);
};

export const TranslateMatrix = (vector) => {
  const { x, y } = vector;
  return [
    [1, 0, 0],
    [0, 1, 0],
    [x, y, 1]
  ];
};

export const RotateMatrix = (angle) => {
  const sin = Math.sin(angle);
  const cos = Math.cos(angle);
  return [
    [cos, sin, 0],
    [-sin, cos, 0],
    [0, 0, 1]
  ];
};

export const ScaleMatrix = (vector) => {
  const { x, y } = vector;
  return [
    [x, 0, 0],
    [0, y, 0],
    [0, 0, 1]
  ];
};

export const RotateAroundMatrix = (angle, point) => {
  const { x, y } = point;
  return multipleMatrices(
    TranslateMatrix({x, y}),
    RotateMatrix(angle),
    TranslateMatrix({ x: -x, y: -y})
  );
};

export const length = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);

export const sum = (vec1, vec2) => {
  // vec1.z = 1;
  // vec2.z = 1;
  // const matrix = TranslateMatrix(vec2);
  // return transform(matrix, vec1);
  return {
    x: vec1.x + vec2.x,
    y: vec1.y + vec2.y,
  };
};

export const diff = (vec1, vec2) => {
  // const matrix = TranslateMatrix({ x: -vec2.x, y: -vec2.y });
  // return transform(matrix, vec1);
  return {
    x: vec1.x - vec2.x,
    y: vec1.y - vec2.y,
  };
};

export const normalize = (vec) => {
  let l = Math.hypot(vec.x, vec.y);
  const matrix = ScaleMatrix({ x: 1 / l, y: 1 / l });
  const vector = transform(matrix, vec);
  vec.x = vector.x;
  vec.y = vector.y;
};

export const scale = (vec, value) => {
  const matrix = ScaleMatrix({ x: value, y: value });
  const vector = transform(matrix, vec);
  vec.x = vector.x;
  vec.y = vector.y;
};

export const scaled = (vec, value) => {
  const matrix = ScaleMatrix({ x: value, y: value });
  return transform(matrix, vec);
};

export const rotate = (vec, angle) => {
  angle = -angle;
  const matrix = RotateMatrix(angle);
  const result = transform(matrix, vec);
  vec.x = result.x;
  vec.y = result.y;
};

export const rotated = (vec, angle) => {
  angle = -angle;
  const matrix = RotateMatrix(angle);
  return transform(matrix, vec);
};

export const rotatedAround = (vec, center, angle) => {
  angle = -angle;
  const matrix = RotateAroundMatrix(angle, center);
  return transform(matrix, vec);
};
