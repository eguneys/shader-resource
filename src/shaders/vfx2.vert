// #include <uv_pars_fragment>
varying vec2 vUv;
varying vec2 vUv2;
varying vec2 dUv;
varying vec2 uuv;

uniform float time;

uniform mat3 uvTransform;
uniform mat3 auvTransform;
uniform mat3 duvTransform;

uniform sampler2D dmap;
uniform sampler2D map;

float impulse( float k, float x ){
    float h = k*x;
    return h*exp(1.0-h);
}

void main() {
  // #include uv_vertex
  //vUv = (uvTransform * vec3(uv, 1)).xy;
  vUv = (uvTransform * vec3(uv, 1)).xy;
  vUv2 = (auvTransform * vec3(uv, 1)).xy;
  dUv = (duvTransform * vec3(uv, 1)).xy;
  uuv = uv;

  #include <begin_vertex>
  #include <project_vertex>
  // vec3 transformed = vec3(position);

  vec4 t = texture2D(dmap, dUv);
  vec4 ta = texture2D(map, dUv);

  float dDot =
    dot(t.rgb, vec3(1.0));

  // dDot = smoothstep(0.0, 1.0, dDot);

  // dDot = step(abs(sin(time)), t.b + ta.r);

  dDot = smoothstep(0.5, 0.5 + abs(sin(time * 2.0)), t.b);
;

 dDot = impulse(2.0, dDot);


  transformed.z = dDot * 10.0;
  vec4 mv_Position = modelViewMatrix * vec4(transformed, 1.0);

  gl_Position = projectionMatrix * mv_Position;
}
