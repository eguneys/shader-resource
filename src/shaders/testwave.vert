// #include <uv_pars_fragment>
varying vec2 vUv;
varying vec2 vUv2;

uniform mat3 uvTransform;

void main() {
  // #include uv_vertex
  //vUv = (uvTransform * vec3(uv, 1)).xy;
  vUv = (uvTransform * vec3(uv, 1)).xy;
  vUv2 = uv;

  #include <begin_vertex>
  #include <project_vertex>
  // vec3 transformed = vec3(position);
  vec4 mv_Position = modelViewMatrix * vec4(transformed, 1.0);

  gl_Position = projectionMatrix * mv_Position;
}
