import { Mesh,
         PlaneGeometry,
         ShaderMaterial,
         MeshPhongMaterial,
         AmbientLight,
         Vector2
       } from 'three';


import test1FragShader from './shaders/test1.frag';
import test2FragShader from './shaders/test2.frag';

export function initObjects(state) {
  const uniforms = {
    time: { value: 0.0 },
    mouse: { value: new Vector2() }
  };

  const geos = {
    plane: new PlaneGeometry(500, 500),
    plane2: new PlaneGeometry(800, 600)
  };

  const mats = {
    wPhong: new MeshPhongMaterial({ color: 0xffffff }),
    shader1: new ShaderMaterial({
      uniforms: uniforms,
      fragmentShader: test1FragShader
    }),
    shader3: new ShaderMaterial({
      uniforms: uniforms,
      fragmentShader: test2FragShader
    })
  };

  const meshes = {
    plane: new Mesh(geos.plane, mats.wPhong),
    plane2: new Mesh(geos.plane2, mats.shader1),
    plane3: new Mesh(geos.plane2, mats.shader3)
  };

  const lights = {
    ambient: new AmbientLight(0xdc8874, .5)
  };

  const update = () => {
    uniforms.time.value = state.time;
    if (state.mouse) {
      uniforms.mouse.value.copy(state.mouse);
    }
  };

  return {
    meshes,
    lights,
    update
  };
}
