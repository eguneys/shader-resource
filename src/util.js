export function translate(node, pos) {
  node.position.copy(pos);
  return node;
};

export function pos(x, y, z) {
  return {
    x, y, z
  };
}

export const raf = requestAnimationFrame;
