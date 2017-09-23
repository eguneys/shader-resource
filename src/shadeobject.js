import { PlaneGeometry,
         StandardMaterial,
         Mesh } from 'three';

export function ShadeObject() {

  const geo = new PlaneGeometry();

  const mat = new StandardMaterial();
  
  const mesh = new Mesh(geo, mat);
  
  return mesh;
};
