uniform float time;
uniform vec2 resolution;

uniform sampler2D map;
uniform sampler2D amap;
uniform sampler2D a2map;
uniform sampler2D dmap;

varying vec2 vUv;
varying vec2 vUv2;
varying vec2 dUv;
varying vec2 uuv;

void main() {

  float dDot = dot(texture2D(dmap, dUv).xyz, vec3(1.0));

  vec2 uvdistortion = vUv +
    smoothstep(0.3, 1.0, dDot * 1.2)
    + smoothstep(0.3, 1.3, dDot);

  // don't distort x
  uvdistortion.x = vUv.x
    + smoothstep(0.1, 1.0, dDot);

  vec4 texelColor = texture2D(map, uvdistortion);
  vec4 alphaColor = texture2D(amap, vUv2);
  vec4 alpha2Color = texture2D(a2map, uuv);
  
  float texDot = dot(texelColor.xyz, vec3(1.0));
  float alphaDot = dot(alphaColor.xyz, vec3(1.0));
  float alpha2Dot = dot(alpha2Color.xyz, vec3(1.0));

  vec4 diffuseColor = texelColor;

  diffuseColor.a = (alphaDot);

  diffuseColor = texelColor * alphaColor;

  diffuseColor.a = smoothstep(1.0, 2.0, alphaDot);

  diffuseColor.a *= alpha2Dot;

  gl_FragColor = diffuseColor;
}
