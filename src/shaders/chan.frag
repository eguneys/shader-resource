uniform float time;
uniform vec2 resolution;

uniform sampler2D map;
uniform sampler2D amap;
uniform sampler2D a2map;

varying vec2 vUv;
varying vec2 vUv2;

void main() {
  float timesin = abs(sin(time));

  vec2 a2Uv = vec2(timesin * 0.5, vUv.y);

  vec2 aUv = vec2(timesin * 0.5, vUv.y);

  aUv.x = vUv.x;

  // aUv *= 1.0;

  vec4 texelColor = texture2D(map, aUv);

  vec4 alphaColor = texture2D(amap, aUv);

  vec4 alpha2Color = texture2D(a2map, a2Uv);
  // alpha2Color = vec4(1.0);

  vec3 color = texelColor.rgb;

  // float opacity = step(0.1, texelColor.r);
  // opacity = step(timesin + 0.1, texelColor.r);

  vec4 diffuseColor = texelColor;// * alphaColor;

  diffuseColor.a = (alphaColor.r + texelColor.r) * alpha2Color.r;

  // diffuseColor = texelColor;

  gl_FragColor = diffuseColor;
}
