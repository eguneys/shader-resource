import './index.css';

import { Scene,
         PerspectiveCamera,
         WebGLRenderer } from 'three';

import { translate, pos } from './util';

import { initObjects } from './objects';

function renderWrap() {

  const scene = new Scene();

  
  const fov = 60,
        aspect = 1,
        near = 1,
        far = 1000;
  const camera = 
        new PerspectiveCamera(fov, aspect, near, far);

  const renderer = new WebGLRenderer({});
  renderer.setSize(800, 600);

  const objects = initObjects();

  translate(camera, pos(0, 0, 500));

  scene.add(objects.lights.ambient);
  scene.add(objects.meshes.plane);
  scene.add(objects.meshes.plane2);

  const renderFn = () => {
    renderer.render(scene, camera);
  };

  return {
    scene,
    camera,
    renderer,
    renderFn
  };
}

export function app(element, config) {
  const context = renderWrap(element);

  function redrawAll() {
    const redrawNow = () => {
      context.renderFn();
    };

    redrawNow();
  }
  redrawAll();

  element.appendChild(context.renderer.domElement);
}

app(document.getElementById('elCanvas'), {});
