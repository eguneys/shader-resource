export function rotate(node, vec) {
  node.rotation.x = vec.x;
  node.rotation.y = vec.y;
  node.rotation.z = vec.z;
  return node;
};

export function translate(node, pos) {
  node.position.copy(pos);
  return node;
};

export function vec3(x, y, z) {
  return {
    x, y, z
  };
}

export function pos(x, y, z) {
  return vec3(x, y, z);
}

export function degToRad(deg) {
  return deg / 180 * Math.PI;
}

export const raf = requestAnimationFrame;
