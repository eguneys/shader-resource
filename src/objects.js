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
         UniformsLib,
         NormalBlending,
         AlphaBlending,
         AdditiveBlending,
         Color,
         Vector2,
         Vector3,
         Matrix3,
         BackSide
       } from 'three';


import { rotate, translate, pos, vec3, degToRad } from './util';

import test1FragShader from './shaders/test1.frag';
import test2FragShader from './shaders/test2.frag';
import test3FragShader from './shaders/test3.frag';
import testWaveFragShader from './shaders/testwave.frag';
import testWaveVertShader from './shaders/testwave.vert';
import shapesFragShader from './shaders/shapes.frag';
import toonFragShader from './shaders/toon.frag';
import thresholdVertShader from './shaders/threshold.vert';
import thresholdFragShader from './shaders/threshold.frag';

import chanVertShader from './shaders/chan.vert';
import chanFragShader from './shaders/chan.frag';
import vfxVertShader from './shaders/vfx.vert';
import vfxFragShader from './shaders/vfx.frag';

function wings(geo, mat) {
  const r1 = degToRad(-30);

  return group([
    makeMesh(geo, mat),
    translate(
      rotate(makeMesh(geo, mat),
             vec3(0, 0, r1)),
      vec3(-10, -30, 1)
    ),
    translate(
      rotate(makeMesh(geo, mat),
             vec3(0, 0, r1 * 0.5)),
      vec3(-10, -30 * 0.5, 2)
    )
  ]);
}

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

function sPlane(w) {
  return new PlaneGeometry(w, w);
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

  const wingUniforms = {
    // ...UniformsLib.common,
    ...uniforms,
    diffuse: { value: new Color(0xeeeeee) },
    opacity: { value: 1.0 },
    uvTransform: { value: new Matrix3() },
    map: { type: 't', value: state.textures.t1 },
    amap: { type: 't', value: state.textures.a1 },
    a2map: { type: 't', value: state.textures.waveAlpha }
  };

  const divs = 6;
  const geos = {
    plane: new PlaneGeometry(500, 500),
    plane2: new PlaneGeometry(800, 600),
    plane3: new PlaneGeometry(100, 100, divs, divs),
    splane: sPlane(100),
    box1: new BoxGeometry(100, 100, 100)
  };

  const d1 = divs + 1,
        skew = 40;
  let dx, dy;
  for (let i = 0; i< d1; i++) {
    dy = (d1 - i) * (skew / d1);
    geos.plane3.vertices[i + 7 * 0].y -= dy;
    geos.plane3.vertices[i + 7 * 1].y -= dy * 0.6;
    geos.plane3.vertices[i + 7 * 2].y -= dy * 0.3;
    // geos.plane3.vertices[i + 7 * 3].y -= dy;
    geos.plane3.vertices[i + 7 * 4].y += dy * 0.3;
    geos.plane3.vertices[i + 7 * 5].y += dy * 0.6;
    geos.plane3.vertices[i + 7 * 6].y += dy;
    // geos.plane3.vertices[d1 + i].y += dy;

    if (i === 0 || i === divs) continue;

    const map = [0, 12, 14, 13, 12, 8, 0];
    for (let j = 0; j < d1; j++) {
      dx = (d1 - i) * 20 / d1;
      dx = map[i];
      // dx = 0;
      geos.plane3.vertices[i + 7 * j].x += dx;
    }
  }



  // geos.plane3.vertices[0].y -= 30;
  // geos.plane3.vertices[2].y += 50;

  const vfxUniforms = {
    ...uniforms,
    diffuse: { value: new Color(0xeeeeee) },
    opacity: { value: 1.0 },
    uvTransform: { value: new Matrix3() },
    auvTransform: { value: new Matrix3() },
    duvTransform: { value: new Matrix3() },
    map: { type: 't', value: state.textures.fire },
    amap: { type: 't', value: state.textures.white },
    a2map: { type: 't', value: state.textures.white },
    dmap: { type: 't', value: state.textures.noise_flame }
  };

  const mats = {
    wPhong: new MeshPhongMaterial({ color: 0x0000ff }),
    wToon: new MeshToonMaterial({
      // color: 0x00ffff,
      // shininess: 0,
      // reflectivity: 0,
      gradientMap: state.textures.toonGradient
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
    wingShader: basicMaterial({
      map: state.textures.t1,
      alphaMap: state.textures.a1,
      transparent: true,
      depthTest: false,
      blending: AdditiveBlending
    }),
    wingCShader: new ShaderMaterial({
      uniforms: wingUniforms,
      vertexShader: testWaveVertShader,
      fragmentShader: testWaveFragShader,
      transparent: true,
      depthWrite: false
    }),
    thresholdShader: new ShaderMaterial({
      uniforms: {
        ...uniforms,
        uvTransform: { value: new Matrix3() },
        map: { value: state.textures.smoke }
      },
      vertexShader: thresholdVertShader,
      fragmentShader: thresholdFragShader,
      transparent: true
    }),
    chanShader: new ShaderMaterial({
      uniforms: {
        ...uniforms,
        uvTransform: { value: new Matrix3() },
        map: { value: state.textures.light_light },
        amap: { value: state.textures.light_greyscale },
        a2map: { value: state.textures.smoke }
      },
      vertexShader: chanVertShader,
      fragmentShader: chanFragShader,
      transparent: true,
      blending: AdditiveBlending
    }),
    vfxShader: new ShaderMaterial({
      uniforms: vfxUniforms,
      vertexShader: vfxVertShader,
      fragmentShader: vfxFragShader,
      transparent: true
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
    mixgroup: mixgroup(allMats, 50),
    wings: wings(geos.plane3, mats.wingCShader),
    smoke: makeMesh(geos.splane, mats.thresholdShader),
    chan: makeMesh(geos.splane, mats.chanShader),
    vfx: makeMesh(geos.splane, mats.vfxShader)
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

  translate(meshes.wings, pos(50, 100, 200));

  translate(meshes.smoke, pos(100, -50, 200));

  translate(meshes.chan, pos(-80, 50, 200));

  translate(meshes.vfx, pos(0, -50, 200));



  rotate(meshes.wings, vec3(0, degToRad(-30), 0));

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

    state.textures.t1.offset.x += 0.01;

    wingOffset.x -= 0.01;

    // state.textures.noise.offset.x += 0.01;
    state.textures.noise_smoke.offset.y -= 0.01;
    state.textures.noise_fire.offset.y -= 0.01;
    state.textures.noise_flame.offset.y -= 0.01;
    // state.textures.noise_voronoi.offset.x += 0.01;
    // vfxOffset.y += 0.08;


    // vfxOffset.x = Math.sin(state.time) * 20;
    // vfxOffset.y = Math.sin(state.time * 2) * 2;

    updateWing();
    updateChan();
    updateVfx();
  };


  state.textures.noise_smoke.repeat.x =
  state.textures.noise_smoke.repeat.y = 0.5;
  const updateVfx = () => {
    const texture = mats.vfxShader.uniforms.map.value,
          aTexture = mats.vfxShader.uniforms.amap.value,
          dTexture = mats.vfxShader.uniforms.dmap.value;

    const uvT = mats.vfxShader.uniforms.uvTransform,
          auvT = mats.vfxShader.uniforms.auvTransform,
          duvT = mats.vfxShader.uniforms.duvTransform;

    updateTextureUniforms(texture, uvT);
    updateTextureUniforms(aTexture, auvT);
    updateTextureUniforms(dTexture, duvT);
  };

  const wingMatrix = new Matrix3(),
        wingOffset = new Vector2(),
        wingRepeat = new Vector2(1, 1);
  const updateWing = () => {
    const wingCShader = mats.wingCShader,

          offset = wingOffset,
          repeat = wingRepeat;

    wingMatrix.setUvTransform(offset.x, offset.y,
                              repeat.x, repeat.y,
                              0,
                              0,
                              0);
    wingUniforms.uvTransform.value.copy(wingMatrix);
  };


  const lMatrix = new Matrix3(),
        lOffset = new Vector2(),
        lRepeat = new Vector2(1, 1);
  let lRotation = 0;
  const updateChan = () => {
    const uvT = mats.chanShader.uniforms.uvTransform;

    // lRotation += degToRad(12);

    updateTT(lOffset, lRepeat, lRotation, lMatrix, uvT);
  };

  function updateTextureUniforms(texture, uvTransform){
    updateTT(texture.offset, texture.repeat,
             texture.rotation, texture.matrix,
             uvTransform);
  };

  const updateTT = (offset, repeat,
                    rotate, matrix,
                    uvTransform) => {
    matrix.setUvTransform(offset.x, offset.y,
                          repeat.x, repeat.y,
                          rotate,
                          0.5,
                          0.5);
    uvTransform.value.copy(matrix);
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
