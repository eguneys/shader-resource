import { Group,
         Mesh,
         PlaneGeometry,
         BoxGeometry,
         SphereGeometry,
         ShaderMaterial,
         MeshPhongMaterial,
         MeshToonMaterial,
         MeshBasicMaterial,
         AmbientLight,
         DirectionalLight,
         SpotLight,
         Vector2,
         BackSide
       } from 'three';


import { translate, pos } from './util';

import test1FragShader from './shaders/test1.frag';
import test2FragShader from './shaders/test2.frag';
import test3FragShader from './shaders/test3.frag';
import shapesFragShader from './shaders/shapes.frag';
import toonFragShader from './shaders/toon.frag';

function group(objs) {
  const group = new Group();
  objs.forEach(o => group.add(o));
  return group;
}

function boxgroup(mats, size = 100) {
  const geo = new BoxGeometry(size, size, size);
  return groupmats(geo, mats, size);
}

function mixgroup(mats, size = 100) {
  const geo = new SphereGeometry(size, 32, 32);
  return groupmats(geo, mats, size);  
}

function groupmats(geo, mats, size) {
  const group = new Group(),
        meshes = (mats.map(mat => {
          return new Mesh(geo, mat);
        }));

  let offset = 0;

  meshes.forEach(m => {
    m.position.x = offset;
    offset += size * 2;
    // group.add(m);

    const omesh = outlinemesh(m);
    group.add(omesh);
  });
  
  return group;
}

function basicMaterial(params) {
  return new MeshBasicMaterial(params);
}

function makeMesh(geo, mat) {
  return new Mesh(geo, mat);
}

function outlinemesh(mesh) {
  const outlineMaterial = basicMaterial({ color: 0x000000,
                                          side: BackSide }),
        outlineMesh = makeMesh(mesh.geometry, outlineMaterial),
        group = new Group();

  group.add(mesh);
  group.add(outlineMesh);
  outlineMesh.scale.multiplyScalar(1.05);
  group.position.copy(mesh.position);
  mesh.position.set(0, 0, 0);

  return group;  
}

export function initObjects(state) {
  const uniforms = {
    time: { value: 0.0 },
    mouse: { value: new Vector2() },
    resolution: { value: new Vector2(800, 600) }
  };

  const geos = {
    plane: new PlaneGeometry(500, 500),
    plane2: new PlaneGeometry(800, 600),
    box1: new BoxGeometry(100, 100, 100)
  };

  const mats = {
    wPhong: new MeshPhongMaterial({ color: 0x0000ff }),
    wToon: new MeshToonMaterial({
      color: 0x00ffff,
      shininess: 20,
      reflectivity: 10
    }),
    shader1: new ShaderMaterial({
      uniforms: uniforms,
      fragmentShader: test1FragShader
    }),
    shader3: new ShaderMaterial({
      uniforms: uniforms,
      fragmentShader: test2FragShader
    }),
    shader4: new ShaderMaterial({
      uniforms: uniforms,
      fragmentShader: test3FragShader
    }),
    shapes: new ShaderMaterial({
      uniforms: uniforms,
      fragmentShader: shapesFragShader
    }),
    toon: new ShaderMaterial({
      uniforms: uniforms,
      fragmentShader: toonFragShader,
      flatShading: false
    })
  };

  const allMats = [
    mats.toon,
    mats.wToon,
    mats.wPhong,
    mats.shader1,
    mats.shader3,
    mats.shapes
  ];

  const meshes = {
    plane: new Mesh(geos.plane, mats.wPhong),
    plane2: new Mesh(geos.plane2, mats.shader1),
    plane3: new Mesh(geos.plane2, mats.shader3),
    plane4: new Mesh(geos.plane2, mats.shader4),
    plane5: new Mesh(geos.plane2, mats.shapes),
    planeDark: new Mesh(geos.plane2, mats.wPhong),
    box1: new Mesh(geos.box1, mats.shader3),
    boxgroup: boxgroup(allMats, 80),
    mixgroup: mixgroup(allMats, 50)
  };

  const keyToFillRatio = 0.2,  // 5 / 1
        keyBrightness = 0.5,
        fillBrightness = keyBrightness * keyToFillRatio;

  const lights = {
    ambient: new AmbientLight(0x222222),
    //ambient: new AmbientLight(0x101010, .5),
    dir: new DirectionalLight(0xff8804, 1),
    // key: new SpotLight(0xffffff, 0.5),
    key: new DirectionalLight(0xffffff, keyBrightness),
    fill: new DirectionalLight(0xffffff, fillBrightness),
    back: new DirectionalLight(0xffffff, 0.3)
  };

  translate(lights.key, pos(-200, 200, 600));
  translate(lights.fill, pos(200, 100, 500));
  translate(lights.back, pos(-50, 100, -500));

  translate(meshes.mixgroup, pos(-200, -100, 50));
  translate(meshes.boxgroup, pos(-200, 100, 50));

  translate(meshes.box1, pos(100, 0, 100));


  // lights.fill = null;
  // lights.back = null;
  // lights.key = null;

  const update = () => {
    uniforms.time.value = state.time;
    if (state.mouse) {
      uniforms.mouse.value.copy(state.mouse);
    }

    bRotate(meshes.box1);
    meshes.boxgroup.children.forEach(bRotate);
    meshes.mixgroup.children.forEach(bRotate);

    const s = (Math.abs( Math.sin(state.time * 0.8) * 2) + 1),
          hs = s * 0.5;

    meshes.mixgroup.children[1].scale.set(s, s, s);
    meshes.boxgroup.children[1].scale.set(hs, hs, hs);
  };

  return {
    meshes,
    lights,
    update
  };
}

function bRotate(box) {
  box.rotation.x += 0.005;
  box.rotation.z += 0.005;
}
