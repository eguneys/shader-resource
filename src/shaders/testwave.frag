uniform float time;
uniform vec2 mouse;

uniform vec3 diffuse;
uniform float opacity;

// #include <map_pars_fragment>
uniform sampler2D map;
uniform sampler2D amap;
uniform sampler2D a2map;

varying vec2 vUv;
varying vec2 vUv2;

void main() {

  vec2 ovUv = vUv;

  ovUv = vec2(vUv.x, vUv.y);

  vec2 ovUv2 = vec2(vUv2.x, vUv2.y);

  // ovUv = vec2(0.0, 0.0);

  vec2 u_resolution = vec2(800, 600);

  vec4 diffuseColor = vec4(diffuse, opacity);

  vec4 alphaColor = texture2D(amap, ovUv);

  vec4 alpha2Color = texture2D(a2map, ovUv2);

  // #include <map_fragment>
  vec4 texelColor = texture2D(map, ovUv);
  // texelColor = mapTexelToLinear(texelColor);
  diffuseColor = texelColor;
  diffuseColor.a = alphaColor.r + alphaColor.g + alphaColor.b;
  diffuseColor.a *= alpha2Color.g;
  // diffuseColor = alpha2Color;

  // vec2 offset = vec2(time * 0.5, 0.0);


  gl_FragColor = diffuseColor;
}
