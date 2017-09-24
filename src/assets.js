import { Texture,
         TextureLoader,
         RepeatWrapping,
         ClampToEdgeWrapping,
         NearestFilter,
         NearestMipMapNearestFilter,
         LinearFilter,
         DefaultLoadingManager
       } from 'three';

import { degToRad } from './util';

function loadTextures(textures) {
  const loader = new TextureLoader();

  const textureMap = {
    'toonGradient': 'grad.jpg',
    'light_light': 'light_light.png',
    'light_greyscale': 'light_greyscale.png',
    'noise': '/noise/T_Random_06.png',
    'noise_smoke': '/noise/T_Random_47.png',
    'noise_voronoi': '/noise/T_Random_19.png',
    'noise_fire': '/noise/T_Random_50.png',
    'noise_flame': '/noise/T_Random_53.png',
    'noise_boldv': '/noise/T_Random_66.png',
    'noise_uwater': '/noise/T_Random_48.png',
    'noise_dwarp': '/noise/T_Random_46.png',
    'noise_bbrick': '/noise/T_Random_04.png',
    'noise_perlin': '/noise/perlin_noise.png'
  };

  let path;

  for (let k in textureMap) {
    path = textureMap[k];
    loader.load('../images/' + path, (texture) => {
      texture.wrapS =
        texture.wrapT = RepeatWrapping;
      texture.minFilter =
        texture.magFilter = NearestFilter;
      textures[k] = texture;
    });
  }
}

const colors = {
  white: '#ffffff',
  black: '#000000'
};

export function initAssets(state) {
  return new Promise((resolve, reject) => {
    const textures = {};

    loadTextures(textures);

    DefaultLoadingManager.onLoad = () => {
      textures.toonGradient.wrapS =
        textures.toonGradient.wrapT = ClampToEdgeWrapping;

      resolve(textures);
    };

    textures.waveAlpha = waveGrad();
    textures.waveAlpha.wrapS = ClampToEdgeWrapping;

    textures.t1 = sinStroke('#247ba0');
    textures.a1 = sinStroke('#000000');
    textures.smoke = smokeGrad();
    textures.checkers = checkers();
    textures.circular = circleGrad();
    textures.fire = fireTex();


    textures.white = colorT(colors.white);
    textures.black = colorT(colors.black);

    state.textures = textures;
  });
};

const smokeGrad = () => makeTexture((ctx, w, h) => {
  ctx.globalCompositeOperation = 'exclusion';

  radialGrad(ctx, w*0.5, h*0.5, w, h);
  radialGrad(ctx, w*0.2, h*0.2, w, h);
  radialGrad(ctx, w*0.3, h*0.6, w, h);
});

const circleGrad = () => {
  const t = makeTexture((ctx, w, h) => {
    radialGrad(ctx, w*0.5, h*0.5, w, h);
  }, 128, 128);

  t.wrapS = t.wrapT = RepeatWrapping;

  return t;
};

const radialGrad = (ctx, x, y, w, h) => {
  const gradient = ctx.createRadialGradient(x, y, w*0.001, x, y, w*0.5);
  gradient.addColorStop(0, '#ffffff');
  // gradient.addColorStop(0.5, '#ff0000');
  gradient.addColorStop(1, '#000000');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, w, h);
};

const waveGrad = () => makeTexture((ctx, w, h) => {
  // ctx.globalCompositeOperation = 'source-out';

  const gradient = ctx.createLinearGradient(0, h/2, w*0.7, h*0.5);
  const g2 = ctx.createLinearGradient(0, h/2, w*0.2, h*0.5);
  g2.addColorStop(1, '#000000');
  g2.addColorStop(0, '#ffffff');
  gradient.addColorStop(1, '#000000');
  gradient.addColorStop(0, '#ffffff');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = g2;
  ctx.fillRect(0, 0, w, h*0.2);
});

const sinStroke = (c) =>
      makeTexture((ctx, w, h) => {
        //ctx.fillStyle = '#247ba0';
        ctx.fillStyle = c;
        ctx.fillRect(0, 0, w, h);

        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 4.0;
        ctx.beginPath();
        ctx.moveTo(0, h/2);
        sinwave((x, y) => ctx.lineTo(x, y));
        // ctx.strokeStyle = '#ffffff';
        // ctx.strokeStyle = 'rgb(0, 0, 0)';
        // ctx.lineWidth = 8.0;
        ctx.shadowColor = '#00ffff';
        ctx.shadowBlur = 20.0;
        ctx.beginPath();
        ctx.moveTo(0, h*0.5);
        sinwave((x, y) => ctx.lineTo(x, y));
        ctx.lineTo(w, h*0.5);
        // ctx.lineTo(w, h/2);
        ctx.stroke();
      });

const fireTex = () => {
  const t = makeTexture((ctx, w, h) => {
    const hw = w * 0.5,
          hh = h * 0.5;
    ctx.fillStyle = '#0000ff';
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#ff0000';
    ctx.beginPath();
    ctx.arc(hw, h * 1.2, h*0.4, degToRad(180), degToRad(0));
    ctx.fill();
    ctx.fillStyle = '#00ff00';
    ctx.beginPath();
    ctx.arc(hw, h * 1.2, h*0.3, degToRad(180), degToRad(0));
    ctx.fill();
  }, 64, 64);


  t.wrapS = t.wrapT = RepeatWrapping;
  t.minFilter = t.magFilter = LinearFilter;

  return t;
};

const checkers = () => {
  const t = makeTexture((ctx, w, h) => {
    const hw = w * 0.5,
          hh = h * 0.5;
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(0, 0, hw, hh);
    ctx.fillRect(hw, hh, w, h);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(hw, 0, w, hh);
    ctx.fillRect(0, hh, hw, h);
  }, 8, 8);


  t.wrapS = t.wrapT = RepeatWrapping;
  t.minFilter = t.magFilter = NearestFilter;

  return t;
};

const colorT = (c) => {
  const t =  makeTexture((ctx, w, h) => {
    ctx.fillStyle = c;
    ctx.fillRect(0, 0, w, h);
  }, 8, 8, false);

  t.wrapS = t.wrapT = RepeatWrapping;
  t.minFilter = t.magFilter = NearestFilter;

  return t;
};


function makeTexture(f, w = 256, h = 128, debug = true) {
  const canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        texture = new Texture(canvas);

  canvas.width = w;
  canvas.height = h;

  f(ctx, w, h);

  if (debug) {
    document.getElementById('elTextures').append(canvas);
  }

  texture.wrapS = RepeatWrapping;
  texture.needsUpdate = true;

  return texture;
}

function sinwave(f) {
  const w = 256,
        h = 128;
  let x, y, p;
  for (let i = 0; i<256; i++) {
    x = i * (w / w);
    p = x * (2 * Math.PI / w);
    y = Math.sin(p) * h*0.3 + h*0.5;

    f(x, y);
  }
}
