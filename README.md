# webpack-minimal

## Gamedev

* [model resource](https://www.models-resource.com/)

## Shader

* gl_FragCoord is screen coordinates

* Tutorials
  - [tornado](http://www.inear.se/2011/09/set-a-sphere-on-fire-with-three-js/)
  
  - [cube slam 9 slice](http://www.inear.se/2013/07/cube-slam-behind-the-three-scene/)


## Scene Setup

    * Lighting
      - [3 point lighting](https://courses.cs.washington.edu/courses/cse458/05au/reading/lighting_tutorial/)
      - [3 point source three.x](https://github.com/jeromeetienne/threex.basiclighting/blob/master/threex.basiclighting.js)

## Three.js API

* PerspectiveCamera(fov, aspect, near, far)
  .position.set()

* WebGLRenderer({canvas, alpha, antialias})
  .setSize(w, h);
  .render(scene, camera)

* Scene()

* ShaderMaterial()

### Three.js Custom

    * [RoundedBoxGeometry](https://github.com/pailhead/three-rounded-box/blob/master/index.js

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

