uniform float time;
uniform vec2 resolution;

uniform sampler2D map;

varying vec2 vUv;
varying vec2 vUv2;

void main() {

  vec4 texelColor = texture2D(map, vUv);

  vec3 color = texelColor.rgb;

  float timesin = abs(sin(time));

  float opacity = step(0.1, texelColor.r);

  opacity = step(timesin, texelColor.r);

  gl_FragColor = vec4(color, opacity);
}
