import { Scene,
         PerspectiveCamera,
         WebGLRenderer } from 'three';

import { raf, translate, pos } from './util';

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

function renderWrap(objects) {
  const scene = new Scene();

  scene.add(objects.lights.ambient);
  scene.add(objects.meshes.plane);
  scene.add(objects.meshes.plane2);
  scene.add(objects.meshes.plane3);

  return scene;
}

let state;

export function app(element, config) {
  state = {
    context: initContext()
  };

  const objects = initObjects(state),
        scene  = renderWrap(objects);

  function redrawAll() {
    const redrawNow = () => {
      const context = state.context;
      context.renderer.render(state.scene, context.camera);
    };

    state.objects = objects;
    state.scene = scene;
    state.redrawNow = redrawNow;

    redrawNow();
  }
  redrawAll();

  anim(state => update(state), state);

  bindEvents(element, state);

  element.appendChild(state.context.renderer.domElement);
}

function bindEvents(element, state) {
  element.addEventListener('mousemove', (event) => {
    state.mouse = {
      x: event.clientX,
      y: event.clientY
    };
    state.redrawNow();
  });
}

function anim(mutation, state) {
  function step() {
    mutation(state);
    state.redrawNow();
    raf(step);
  }
  raf(step);
}

const startTime = Date.now();
function update(state) {
  const elapsedMillis = Date.now() - startTime,
        elapsedSeconds = elapsedMillis / 1000;

  state.time = elapsedSeconds;
  state.objects.update();
}

if (module.hot) {
  module.hot.accept('./objects', () => {
    state.objects = require('./objects').initObjects(state);
    state.scene = renderWrap(state.objects);
    state.redrawNow();
  });
}
