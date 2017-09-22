# webpack-minimal

## Research

    - current
      * alpha mask vfx [similar](https://realtimevfx.com/t/how-do-you-think-this-fx-is-created/892)
        - ocean [wind maker analysis](https://medium.com/@gordonnl/fire-and-haze-b4561743b17)
      * [book of shaders](https://thebookofshaders.com/13/)
      * [perlin noise](http://webstaff.itn.liu.se/~stegu/jgt2012/article.pdf)

  ### Game tricks

    * uv distortion

    * decals
    * soft particles
    * particles billboarding
    * texture alpha vfx
    * trails [proun](http://joostdevblog.blogspot.com.tr/search/label/graphics/)

  ### Audio vis

* node based vis editor like [nin simplified](https://github.com/ninjadev/nin/tree/master/nin). [example](https://github.com/ninjadev/re/blob/master/src/jules.js)
      - seek frames

  ### Threejs

    * setuvtransform rotate matrix around object origin
      - (set centerX 0.5);

    * texture wrapS affects how
      - https://github.com/mrdoob/three.js/src/renderers/webgl/WebGLTextures.js#L352

    * UV mapping with shader material
       - three.texture params (offset, repeat)

    * edge detection stroke on game art tricks

    * (depthwrite, depthtest) properties on material
      - [so](https://stackoverflow.com/questions/37647853/three-js-depthwrite-vs-depthtest-for-transparent-canvas-texture-map-on-three-p)

    * PointsMaterial
      - points material is used with points object.
      - points object sets drawmode to glPoints, and a point is rendered on each vertex.
      - [example](https://github.com/mrdoob/three.js/blob/master/examples/webgl_points_billboards.html)
      - [doc](https://threejs.org/docs/#api/materials/PointsMaterial)
    *

### Three.js Custom

    * [UV mapping](https://solutiondesign.com/blog/-/blogs/webgl-and-three-js-texture-mappi-1)

    * How to set object pivot for rotation
    * Move texture along a plane
      - texture.offset.x += 0.01;
    * [custom shader tutorial](http://blog.cjgammon.com/threejs-custom-shader-material)
    * [aviator modify geo](https://tympanus.net/codrops/2016/04/26/the-aviator-animating-basic-3d-scene-threejs/)
    * [Matrix Tutorial](http://www.opengl-tutorial.org/beginners-tutorials/tutorial-3-matrices/)
    * [Canvas api](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D)
    * [Texture from canvas](https://gist.github.com/MAKIO135/eab7b74e85ed2be48eeb)
    * [RoundedBoxGeometry](https://github.com/pailhead/three-rounded-box/blob/master/index.js
    * [deprecated api](https://threejs.org/docs/#api/deprecated/DeprecatedList)


## Art

    * [Principles](http://learn.leighcotnoir.com/artspeak/principles/)

    * Color theory [learn] (http://learn.leighcotnoir.com/artspeak/elements-color/hue-value-saturation/)
      - hue is actual color
      - saturation is amount of color, shades from white to full color, 


## Shader


    * Custom VFX Shader

* node based shaders
      - [ ]
      - [live node based shader gen tool in nodejs](https://github.com/ninjadev/nin)
      - [threejs discussion](https://github.com/mrdoob/three.js/issues/7522)
      - [shader graph](https://github.com/unconed/shadergraph)
      - [shader frog](https://shaderfrog.com/app/editor)
      - [shader frog] (http://acegikmo.com/shaderforge/tutorials/)

    * Audio vis demos
      - [pouet platform](http://www.pouet.net/)
      - [train ascii 8bit source](https://github.com/sigvef/skog/)
      - [what are you syncing about (by nin)](https://stianj.com/what-are-you-syncing-about/)
        
      - [splice songs]https://splice.com/henryfong/henry-fong-j-trick-scream-original-mix
    [base](https://www.airtightinteractive.com/work/)

## Three.js API

    * PerspectiveCamera(fov, aspect, near, far)
      .position.set()

    * WebGLRenderer({canvas, alpha, antialias})
      .setSize(w, h);
      .render(scene, camera)
    
    * Scene()

    * ShaderMaterial()

    * matrix.setUvTransform(offset.x, offset.y, repeat.x, repeat.y, rotation, center.x, center.y);


## GLSL API

    * dFdX [shader derivative functions](http://www.aclockworkberry.com/shader-derivative-functions/)
    * clamp(x, min, max)
    * step(edge, x)
    * mix(x, y, a)

## HTML5 API

    * Canvas
      canvas.getContext('2d');
    * Canvas context
      context.globalCompositeOperation 'destination-in'
      context.fill
      context.createLinearGradient(x1, y1, x2, y2);
      context.createRadialGradient(x0, y0, r0, x1, y1, r1);

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




# Resources

## Conf talks GDC

    * [diablo vfx](https://archive.org/details/GDC2013Love)
      - blendadd shading (22:07)
      - create dynamic alpha shapes
        - texture multiply (25:00) (tex1 * tex2 * 2)
        - multiple texture uv move, particles random rotate
      

## Gamedev

    * [game art tricks](https://simonschreibt.de/gat/cell-shading/)
    * [model resource](https://www.models-resource.com/)
    * [flip code gamedev](http://www.flipcode.com/archives/)

## game tech
    * [perlin noise paper](http://webstaff.itn.liu.se/~stegu/jgt2012/article.pdf)
    * [soft shadows](http://codeflow.org/entries/2013/feb/15/soft-shadow-mapping/)
    * [decals](http://blog.wolfire.com/2009/06/how-to-project-decals/)
      [decal threejs](https://github.com/spite/THREE.DecalGeometry)

    * [Soft particles](http://blog.wolfire.com/2010/04/Soft-Particles)
    * [wolfire blog](http://blog.wolfire.com/tag/game-tech/6`)

## Making Of / Game Analysis
    * [map box wind particles](https://blog.mapbox.com/how-i-built-a-wind-map-with-webgl-b63022b5537f)
      - [code](https://github.com/mapbox/webgl-wind)
    * [ghost recon](https://m.makemepulse.com/a-world-with-no-heroes-79cfafbc7c7)
    * [proun, awesomenauts game maker blog](http://joostdevblog.blogspot.com.tr/search/label/graphics)
       - [proun articles](http://joostdevblog.blogspot.com.tr/search?q=proun)
    * [wind maker](http://polycount.com/discussion/104415/zelda-wind-waker-tech-and-texture-analysis-picture-heavy)

## Tutorials
    * [nehe tuts in three3j](http://www.johannes-raida.de/tutorials/three.js/tutorial08/tutorial08.htm)

    * [2017 links](http://kesen.realtimerendering.com/)

    * [ku graphics course](http://home.ku.edu.tr/~yyemez/Comp410/index.htm)
    * [ocw graphics](https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-837-computer-graphics-fall-2012/lecture-notes/)
    * [advanced graphics also cel shading](https://home6.cs.rpi.edu/~cutler/classes/advancedgraphics/S12/final_project_reports.html)
    * [rmit edu tuts](http://goanna.cs.rmit.edu.au/~gl/teaching/web3d/)
    * [advances realtime rendering](http://advances.realtimerendering.com/)
    * [various links @ realtimerendering.com](realtimerendering.com)
    * [npr siggraph](http://stylized.realtimerendering.com/#materials)
    * [opengl techniques] (http://www.opengl-tutorial.org/)
    * [node based shading](https://github.com/zz85/crayon.js)
    * [tornado](http://www.inear.se/2011/09/set-a-sphere-on-fire-with-three-js/)
    * [cube slam 9 slice](http://www.inear.se/2013/07/cube-slam-behind-the-three-scene/)

### Cell Shading
    * tricks
      - [thick lines for cell shading](http://www.chrisevans3d.com/tutorials/cel_lines/)

    * [game art tricks](https://simonschreibt.de/gat/cell-shading/)
    *[](http://sunandblackcat.com/tipFullView.php?l=eng&topicid=15)
    * [gamedev](https://www.gamedev.net/articles/programming/graphics/cel-shading-r1438/)
    * [npr quake](http://research.cs.wisc.edu/graphics/Gallery/NPRQuake/whatIsIt.html)
    * cell shaded games
      - [proun](https://www.youtube.com/watch?v=0SrGM2x2Ycs)
      - [the legend of zelda the wind maker]()
      - [jet set radio]()
      - [viewtiful joe]()
      - [marvel vs capcom]()
      - [bastion]()
    

### Particles

    * See google.experiments
    * [threejs particle-shader code](https://github.com/pwambach/threejs-particle-shader/blob/master/src/particles.js)
    * General
      - [example source](https://github.com/kevinroast/webglshaders)
      - [misc effects](http://www.kevs3d.co.uk/dev/shaders/)


## Scene Setup

    * Lighting
      - [3 point lighting](https://courses.cs.washington.edu/courses/cse458/05au/reading/lighting_tutorial/)
      - [3 point source three.x](https://github.com/jeromeetienne/threex.basiclighting/blob/master/threex.basiclighting.js)

### Demoscene VFX

    * [realtime VFX](https://realtimevfx.com/t/beginning-vfx-artist-advice-for-beginners-from-a-beginner/3081/2)
    * [learn demoscene] https://github.com/psenough/teach_yourself_demoscene_in_14_days
    * [pouet](pouet.net/prod.php?which=61584)
    

### Misc gamedev

    * [shader editor](http://shdr.bkcore.com/)
    * [paste image host](https://pasteboard.co/)
    * [image editor](https://viliusle.github.io/miniPaint/)
    * [normal map tool](http://www.crazybump.com/)
    * [color pallette](https://klart.co/colors)
    * [game art tricks](https://simonschreibt.de/gat/cell-shading/)
    * [game of odds](https://www.prudential.com/cdn/tools/game-of-odds/)
    * [all cs academic](http://matt.might.net/articles/)

### Game Studio
    * [engine software, monopoly proun](http://engine-software.com/?page_id=7)

### Health

  * [fitness](http://matt.might.net/articles/hacking-strength/)
