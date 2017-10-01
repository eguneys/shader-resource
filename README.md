# webpack-minimal

## Learn

* Write Custom VFX Shader
* Apply 8x8 black-white checkers texture
* scale and apply filter
* animate by applying offset to UVTransform
* see blending modes additive/normal


## Research

* [demoscene code setup] (https://github.com/fernandojsg/thisway.js)
* [sampling theory, convolution, fourier transforms]()

### Recent Visit

* [pailhead examples (eg. pbr)](http://dusanbosnjak.com/test/webGL/new/StojadinCeo/scripts/)
* [glsl lighting tutorial](https://github.com/stackgl/glsl-lighting-walkthrough)
* [perlin noise blog read](http://flafla2.github.io/2014/08/09/perlinnoise.html)
* [try threejs.editor with scripting](three.js/editor)
* [try threejs sandbox found by pbr example](https://github.com/wlalele/turbo-robot)
* [unity books](file:///C:/Users/eg/Downloads/Unity%20Shaders%20and%20Effects%20Cookbook.pdf)
  - [book 2](http://pdf.th7.cn/down/files/1312/Unity%20Shaders%20and%20Effects%20Cookbook.pdf)
* [forier transform](http://lodev.org/cgtutor/fourier.html)
* [gdc 1999 keynote](https://www.youtube.com/watch?v=LC2Pf5F2acI)
* [making noise ken perlin gdc 1999](http://lousodrome.net/blog/light/)
* [some light blog](http://lousodrome.net/blog/light/)
* [render stats](http://spite.github.io/rstats/)

* [oldschool](http://lodev.org/cgtutor/)
* [ue cel shade game](https://www.playwoodbound.com/single-post/2017/04/21/Visual-refactoring)

### Rough Idea

* Vector fields gpu particle for tornado
  - go realtimevfx.com for effect breakdown
* organize code
  - shader code
  - scene setup transition frame seek
  - workflow architecture
* alpha mask vfx [similar](https://realtimevfx.com/t/how-do-you-think-this-fx-is-created/892)
  - ocean [wind maker analysis](https://medium.com/@gordonnl/fire-and-haze-b4561743b17)
* [book of shaders](https://thebookofshaders.com/13/)
* [perlin noise](http://webstaff.itn.liu.se/~stegu/jgt2012/article.pdf)

### Game tricks

* alpha erosion
* uv distortion

* decals
* soft particles
* particles billboarding
* texture alpha vfx
* trails [proun](http://joostdevblog.blogspot.com.tr/search/label/graphics/)

### Audio vis

* node based vis editor like [nin simplified](https://github.com/ninjadev/nin/tree/master/nin).
  - [example](https://github.com/ninjadev/re/blob/master/src/jules.js)
  - seek frames

### glstack

* [webglstudio](webglstudio.org)
* [litescene.js guides](https://github.com/jagenjo/litescene.js/tree/master/guides)


### Webgl

* [learnwebgl.net](http://learnwebgl.brown37.net)

### Threejs

* vertex displacement by noise (eg. waterfall splash)

* textures [constants](https://threejs.org/docs/#api/constants/Textures)

  * setuvtransform rotate matrix around object origin
    - (set centerX 0.5);

  * texture wrapS affects how
    - https://github.com/mrdoob/three.js/src/renderers/webgl/WebGLTextures.js#L352

  * texture filtering
    - magFilter, minFilter
    - anistropy

* blending
  * AlphaBlending blends with alpha channel
  * NormalBlending no blending
  * AdditiveBlending blends with rgb channels

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

### Three.js Custom

* [UV mapping](https://solutiondesign.com/blog/-/blogs/webgl-and-three-js-texture-mappi-1)

* How to set object pivot for rotation
* Move texture along a plane `texture.offset.x += 0.01;`
* [cube slam camera movements example](https://github.com/vladikoff/cubeslam-mirror/blob/master/lib/renderer-3d/camera-controller.js)
* [render stats](http://spite.github.io/rstats/)
* [custom shader tutorial](http://blog.cjgammon.com/threejs-custom-shader-material)
* [aviator modify geo](https://tympanus.net/codrops/2016/04/26/the-aviator-animating-basic-3d-scene-threejs/)
* [Matrix Tutorial](http://www.opengl-tutorial.org/beginners-tutorials/tutorial-3-matrices/)
* [Canvas api](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D)
* [Texture from canvas](https://gist.github.com/MAKIO135/eab7b74e85ed2be48eeb)
* [RoundedBoxGeometry](https://github.com/pailhead/three-rounded-box/blob/master/index.js
* [deprecated api](https://threejs.org/docs/#api/deprecated/DeprecatedList)

* [picogl minimalist webgl api](https://github.com/tsherif/picogl.js)

## Art

* [art tutorial](http://androidarts.com/art_tut.htm)

* [Principles](http://learn.leighcotnoir.com/artspeak/principles/)

* Color theory [learn] (http://learn.leighcotnoir.com/artspeak/elements-color/hue-value-saturation/)
  - hue is actual color
  - saturation is amount of color, shades from white to full color, 


## Graphics Shading Pipeline
* [human 80.lv](https://80.lv/articles/secrets-of-human-shaders-in-ue4/)

## Shader

* [all-in-one raymarching tutorial](http://blog.ruofeidu.com/tutorial-of-ray-casting-ray-tracing-and-ray-marching/)
* [procedural generation](https://medium.com/@nicoptere/generating-things-with-code-ddbca45ceddc)
* [lightning](http://wiki.polycount.com/wiki/Lighting)
* [shader.xyz](http://www.shaders.xyz/)
* [pixar graphics](http://graphics.pixar.com/library/WaveletNoise/)

* node based shaders
- [ ]
- [node based shading](https://github.com/zz85/crayon.js)
- [live node based shader gen tool in nodejs](https://github.com/ninjadev/nin)
- [threejs discussion](https://github.com/mrdoob/three.js/issues/7522)
- [shader graph](https://github.com/unconed/shadergraph)
- [shader frog](https://shaderfrog.com/app/editor)
- [shader frog] (http://acegikmo.com/shaderforge/tutorials/)

* Audio vis demoscene
- [amiga scene remakes](www.wab.com)  
- [pouet platform](http://www.pouet.net/)
- [train ascii 8bit source](https://github.com/sigvef/skog/)
- [what are you syncing about (by nin)](https://stianj.com/what-are-you-syncing-about/)
- [splice songs] https://splice.com/henryfong/henry-fong-j-trick-scream-original-mix
- [base](https://www.airtightinteractive.com/work/)
- [stravaganza js remake](https://github.com/fernandojsg/thisway.js)
- [codegolf demoscene quake 1k](http://www.p01.org/)
- [140bytes 1k techniques](https://github.com/jed/140bytes/wiki/Byte-saving-techniques)

## Three.js API

* PerspectiveCamera(fov, aspect, near, far)
  `.position.set()`
* WebGLRenderer({canvas, alpha, antialias})
  `.setSize(w, h);`
  `.render(scene, camera)`
* Scene()
* ShaderMaterial()


* geometry.applyMatrix(transformationMatrix)
* ArrowHelper(Ray.direction, Ray.origin, length, color);

* [raycasting returns uv coordinates](https://github.com/mrdoob/three.js/pull/7023)

* matrix.setUvTransform(offset.x, offset.y, repeat.x, repeat.y, rotation, center.x, center.y);
* matrix4.makeRotationX(x), matrix4.makeTranslation(x, y, z)





## GLSL API

* [webgl cheatsheet](https://www.khronos.org/files/webgl/webgl-reference-card-1_0.pdf)
* [webgl spec](https://www.khronos.org/registry/webgl/specs/latest/1.0)
* [spec 4.40](https://www.khronos.org/registry/OpenGL/specs/gl/GLSLangSpec.4.40.pdf)

* fwidth [return the sum of absolute value of derivatiesin x and y](http://blog.ruofeidu.com/simplest-fatest-glsl-edge-detection-using-fwidth/)
  - how it works [https://computergraphics.stackexchange.com/questions/61/what-is-fwidth-and-how-does-it-work]
* dFdX [shader derivative functions](http://www.aclockworkberry.com/shader-derivative-functions/)
* clamp(x, min, max)
* step(edge, x)
* smoothstep(edge0, edge1, x)
* mix(x, y, a)

## HTML5 API

* Canvas
  `canvas.getContext('2d');`
* Canvas context
  `context.globalCompositeOperation 'destination-in'`
  `context.fill`
  `context.createLinearGradient(x1, y1, x2, y2);`
  `context.createRadialGradient(x0, y0, r0, x1, y1, r1);`
```
    context.beginPath();
    context.arc(x, y, r, sa, ea);
    context.fill();
    
```
  

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

## Git

* [quick clone]`git clone --depth 1 <repo>`

# Resources

## Conf talks GDC

* [diablo vfx 2k13](https://archive.org/details/GDC2013Love)
  - blendadd shading (22:07)
  - create dynamic alpha shapes
  - texture multiply (25:00) (tex1 * tex2 * 2)
  - multiple texture uv move, particles random rotate

* [no man's sky: building worlds with noise generation 2k17](https://www.youtube.com/watch?v=SePDzis8HqY)
* [inside: lights, shadows, noise, banding 2k16](https://www.youtube.com/watch?v=RdN06E6Xn9E)
  - fire gradient applied to alpha

## Gamedev

* [alkemi-games smoke](https://www.alkemi-games.com)
* [game art tricks](https://simonschreibt.de/gat/cell-shading/)
* [model resource](https://www.models-resource.com/)
* [flip code gamedev](http://www.flipcode.com/archives/)

## game tech
* [perlin noise blog read](http://flafla2.github.io/2014/08/09/perlinnoise.html)
* [perlin noise paper](http://webstaff.itn.liu.se/~stegu/jgt2012/article.pdf)
* [soft shadows](http://codeflow.org/entries/2013/feb/15/soft-shadow-mapping/)
p* [decals](http://blog.wolfire.com/2009/06/how-to-project-decals/)
  - [decal threejs](https://github.com/spite/THREE.DecalGeometry)

* [Soft particles](http://blog.wolfire.com/2010/04/Soft-Particles)
* [wolfire blog](http://blog.wolfire.com/tag/game-tech/6`)

## Making Of / Game Analysis
* [map box wind particles](https://blog.mapbox.com/how-i-built-a-wind-map-with-webgl-b63022b5537f)
  - [code](https://github.com/mapbox/webgl-wind)
* [ghost recon](https://m.makemepulse.com/a-world-with-no-heroes-79cfafbc7c7)
* [proun, awesomenauts game maker blog](http://joostdevblog.blogspot.com.tr/search/label/graphics)
  - [proun articles](http://joostdevblog.blogspot.com.tr/search?q=proun)
* [wind maker](http://polycount.com/discussion/104415/zelda-wind-waker-tech-and-texture-analysis-picture-heavy)

## People
* [evan wallace shader tricks](http://madebyevan.com/)
* [markmark](http://www.markmark.net/)
* [pixel maven](http://www.pixelmaven.com/jason/)

## Slides
* [color banding / dithering](http://loopit.dk/banding_in_games.pdf)
  
## Papers
* [perlin page](http://mrl.nyu.edu/~perlin/)
* [noise usecases](http://graphicon.ru/html/2008/proceedings/English/S8/Paper_3.pdf)
  - adding detail to geometry
  - dynamic volumetric effects
  - 

## Lectures
* [rpi courses](https://www.cs.rpi.edu/~cutler/classes/advancedgraphics/S17/calendar.php)
* [mit courses](http://stellar.mit.edu/S/course/6/fa08/6.837/materials.html)
* [princeton graphics]
  * [npr](http://www.cs.princeton.edu/courses/archive/spring15/cos426/lectures/18-npr.pdf)
  * [game design](http://www.cs.princeton.edu/courses/archive/spring15/cos426/lectures/23-games-nealen.pdf)
* [linear algebra & math course](https://mathcs.clarku.edu/~djoyce/ma130/)

## Tutorials

* [oldschool graphics raycasting etc](http://lodev.org/cgtutor/)


* [2017 links](http://kesen.realtimerendering.com/)

* [ku graphics course](http://home.ku.edu.tr/~yyemez/Comp410/index.htm)
* [ocw graphics](https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-837-computer-graphics-fall-2012/lecture-notes/)
* [advanced graphics also cel shading](https://home6.cs.rpi.edu/~cutler/classes/advancedgraphics/S12/final_project_reports.html)
* [rmit edu tuts](http://goanna.cs.rmit.edu.au/~gl/teaching/web3d/)
* [advances realtime rendering](http://advances.realtimerendering.com/)
* [various links @ realtimerendering.com](realtimerendering.com)
* [npr siggraph](http://stylized.realtimerendering.com/#materials)
* [opengl techniques] (http://www.opengl-tutorial.org/)
* [tornado](http://www.inear.se/2011/09/set-a-sphere-on-fire-with-three-js/)
* [cube slam 9 slice](http://www.inear.se/2013/07/cube-slam-behind-the-three-scene/)

### Cell Shading

* tricks
  - [thick lines for cell shading](http://www.chrisevans3d.com/tutorials/cel_lines/)

* [game art tricks](https://simonschreibt.de/gat/cell-shading/)
* [](http://sunandblackcat.com/tipFullView.php?l=eng&topicid=15)
* [gamedev](https://www.gamedev.net/articles/programming/graphics/cel-shading-r1438/)
* [npr quake](http://research.cs.wisc.edu/graphics/Gallery/NPRQuake/whatIsIt.html)
* cell shaded games
  - [proun](https://www.youtube.com/watch?v=0SrGM2x2Ycs)
  - [rime](https://www.greybox.com/rime/en/)
  - [the legend of zelda the wind maker]()
  - [jet set radio]()
  - [viewtiful joe]()
  - [marvel vs capcom]()
  - [bastion]()

### PBR Shading
* [three.js repo with research links](https://github.com/tiansijie/WebGLpbr)

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

### VFX

* [uef 80lvl link](https://80.lv/articles/vfx-for-games-in-ue4/)
* [unity stylized fx](http://www.jeanmoreno.com/unity/cartoonfx/)
* [tharle fx](http://www.tharlevfx.com/)

### Demoscene VFX

* [realtime VFX](https://realtimevfx.com/t/beginning-vfx-artist-advice-for-beginners-from-a-beginner/3081/2)
* [learn demoscene] https://github.com/psenough/teach_yourself_demoscene_in_14_days
* [pouet](pouet.net/prod.php?which=61584)
    

### Misc gamedev

* [fun coop game rapt](http://raptjs.com/)

* [webglstudio ](webglstudio.org)
* [texgen texture generator](http://fernandojsg.com/project/ktexgen/)
* [lots of free png](https://pngtree.com/)
* [xnormal map baking](http://xnormal3.blogspot.com.tr/)
* [hexels grid based painting tool](https://www.marmoset.co/hexels/)
* [shader editor](http://shdr.bkcore.com/)
* [paste image host](https://pasteboard.co/)
* [image editor](https://viliusle.github.io/miniPaint/)
* [normal map tool](http://www.crazybump.com/)
* [color pallette](https://klart.co/colors)
* [game art tricks](https://simonschreibt.de/gat/cell-shading/)
* [game of odds](https://www.prudential.com/cdn/tools/game-of-odds/)
* [all cs academic](http://matt.might.net/articles/)
* [generate music javascript](http://scribbletune.com/)

### Game Studio
* [dota 2 workshop](https://support.steampowered.com/kb/9334-YDXV-8590/dota-2-workshop-character-art-guide)
* [loopit publications, inside](http://loopit.dk/publications/)
* [engine software, monopoly proun](http://engine-software.com/?page_id=7)

### Rendering Techniques

* [volumetric lines](http://developer.download.nvidia.com/SDK/9.5/Samples/DEMOS/OpenGL/src/cg_VolumeLine/docs/VolumeLine.pdf)

### Games & Inspiration

* [pew pew](http://www.jfgeyelin.com/)
* [color spaces reddit](https://www.reddit.com/r/ImaginaryColorscapes/)
* [js1k resources](http://js13kgames.github.io/resources/)
* [glitchbusters](http://store.steampowered.com/app/661360/Glitchbuster/)

### Startup

* [yc advice](https://blog.ycombinator.com/ycs-essential-startup-advice/)

### Health

* [fitness](http://matt.might.net/articles/hacking-strength/)

### Buy Notebook

* [tips](http://alteredqualia.com/texts/notebooks/)

