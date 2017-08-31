# webpack-minimal

## Three.js API

* PerspectiveCamera(fov, aspect, near, far)
  .position.set()

* WebGLRenderer({canvas, alpha, antialias})
  .setSize(w, h);
  .render(scene, camera)

* Scene()

* ShaderMaterial()

## Webpack API

* Hot module Reload
```
if (module.hot) {
  module.hot.accept('./objects', () => {
    state.objects = require('./objects').initObjects();
    state.scene = renderWrap(state);
    state.redrawNow();
  });
}
```


### Dev Work
 - [x] Hot module reload support
