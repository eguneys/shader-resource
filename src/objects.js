import { Mesh,
         PlaneGeometry,
         ShaderMaterial,
         MeshPhongMaterial,
         AmbientLight
       } from 'three';


import test1FragShader from './shaders/test1.frag';

export function initObjects() {
  const geos = {
    plane: new PlaneGeometry(500, 500),
    plane2: new PlaneGeometry(400, 400)
  };

  const mats = {
    wPhong: new MeshPhongMaterial({ color: 0xffffff }),
    shader1: new ShaderMaterial({
      fragmentShader: test1FragShader
    })
  };

  const meshes = {
    plane: new Mesh(geos.plane, mats.wPhong),
    plane2: new Mesh(geos.plane2, mats.shader1)
  };

  const lights = {
    ambient: new AmbientLight(0xdc8874, .5)
  };

  return {
    meshes,
    lights
  };
}
