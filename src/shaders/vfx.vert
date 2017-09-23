// #include <uv_pars_fragment>
varying vec2 vUv;
varying vec2 vUv2;
varying vec2 dUv;
varying vec2 uuv;

uniform mat3 uvTransform;
uniform mat3 auvTransform;
uniform mat3 duvTransform;

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
  vec4 mv_Position = modelViewMatrix * vec4(transformed, 1.0);

  gl_Position = projectionMatrix * mv_Position;
}
