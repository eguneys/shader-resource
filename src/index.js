import { Scene,
         PerspectiveCamera,
         WebGLRenderer } from 'three';

import { translate, pos } from './util';

import { initObjects } from './objects';

function initContext() {
  
  const fov = 60,
        aspect = 1,
        near = 1,
        far = 1000;
  const camera = 
        new PerspectiveCamera(fov, aspect, near, far);

  translate(camera, pos(0, 0, 500));

  const renderer = new WebGLRenderer({});
  renderer.setSize(800, 600);

  return {
    camera,
    renderer
  };
}

function renderWrap(state) {
  const objects = state.objects;

  const scene = new Scene();

  scene.add(objects.lights.ambient);
  scene.add(objects.meshes.plane);
  scene.add(objects.meshes.plane2);

  return scene;
}

let state;

export function app(element, config) {
  state = {
    objects: initObjects(),
    context: initContext()
  };
  
  state.scene = renderWrap(state);

  function redrawAll() {
    const redrawNow = () => {
      const context = state.context;
      context.renderer.render(state.scene, context.camera);
    };

    state.redrawNow = redrawNow;

    redrawNow();
  }
  redrawAll();

  element.appendChild(state.context.renderer.domElement);
}

if (module.hot) {
  module.hot.accept('./objects', () => {
    state.objects = require('./objects').initObjects();
    state.scene = renderWrap(state);
    state.redrawNow();
  });
}
