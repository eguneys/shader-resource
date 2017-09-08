# webpack-minimal

## Shader

* gl_FragCoord is screen coordinates


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

## Babel ES6

* spread syntax {...state, props } [redux example](http://redux.js.org/docs/recipes/UsingObjectSpreadOperator.html)


## Dev Work
 - [x] Hot module reload support

