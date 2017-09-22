import { Texture,
         TextureLoader,
         RepeatWrapping,
         ClampToEdgeWrapping,
         DefaultLoadingManager
       } from 'three';

function loadTextures(textures) {
  const loader = new TextureLoader();

  const textureMap = {
    'toonGradient': 'grad.jpg',
    'light_light': 'light_light.png',
    'light_greyscale': 'light_greyscale.png'
  };

  let path;

  for (let k in textureMap) {
    path = textureMap[k];
    loader.load('../images/' + path, (texture) => {
      // texture.wrapS = RepeatWrapping;
      // texture.wrapT = RepeatWrapping;
      textures[k] = texture;
    });
  }
}

export function initAssets(state) {
  return new Promise((resolve, reject) => {
    const textures = {};

    loadTextures(textures);

    DefaultLoadingManager.onLoad = () => {
      resolve(textures);
    };

    const t1 = sinStroke('#247ba0');
    textures.t1 = t1;
    const a1 = sinStroke('#000000');
    textures.a1 = a1;

    textures.waveAlpha = waveGrad();
    textures.waveAlpha.wrapS = ClampToEdgeWrapping;

    textures.smoke = smokeGrad();

    state.textures = textures;
  });
};


const smokeGrad = () => makeTexture((ctx, w, h) => {
  ctx.globalCompositeOperation = 'exclusion';

  radialGrad(ctx, w*0.5, h*0.5, w, h);
  radialGrad(ctx, w*0.2, h*0.2, w, h);
  radialGrad(ctx, w*0.3, h*0.6, w, h);
});

const radialGrad = (ctx, x, y, w, h) => {
  const gradient = ctx.createRadialGradient(x, y, h/2, x, y, w*0.02);
  gradient.addColorStop(0, '#000000');
  // gradient.addColorStop(0.5, '#ff0000');
  gradient.addColorStop(1, '#ffffff');
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


function makeTexture(f) {
  const w = 256,
        h = 128,
        canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        texture = new Texture(canvas);

  canvas.width = w;
  canvas.height = h;

  f(ctx, w, h);

  document.body.append(canvas);

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
