#ifdef GL_ES
precision mediump float;
#endif

uniform float time;
uniform vec2 resolution;

float border(in vec2 edge, in float size) {

  // smoothstep(edge1, edge2, pct)
  // step(edge1, pct)
  // floor(pct)
  
  // vec2 bl = smoothstep(vec2(0.195), vec2(size), st);
  vec2 bl = floor(edge+1.0-size);
  float pct = bl.x*bl.y;

  vec2 tr = step(vec2(size),1.0-edge);
  pct *= tr.x*tr.y;
  return pct;
}

float outline(in vec2 edge, in float size) {
  float width = 0.1;
  vec2 bl = floor(edge + 1.0 - size);
  vec2 bl2 = floor(edge + 1.0 - size + width);

  float pct = bl.x * bl.y + bl2.x*bl2.y;
  return pct;
}

float circle(in vec2 st, in float size) {
  vec2 toCenter = vec2(0.5)-st;
  float pct = length(toCenter);

  //pct *= 2.0;
  // pct = 1.0 - step(0.5, pct);
  pct = 1.0 - smoothstep(size, size + 0.01, pct);
  return pct;
}

void main() {
  vec2 st = gl_FragCoord.xy/resolution;

  float x = st.x;
  float y = st.y;

  vec2 pos = vec2(0.5)-st;

  float r = length(pos)*2.0;
  float a = atan(pos.y, pos.x);

  vec3 color = vec3(1.0, 1.0, 1.0);
  
  float size = 0.2;
  // float pct = border(st, size);
  // float csize = 0.5;
  // csize = abs(sin(time * 0.5) * 0.5);
  // csize = clamp(abs(sin(time * 2.0) * 0.5), 0.1, 0.45);
  // float pct = circle(st, csize);

  // float pct2 = circle(st + vec2(-0.5, 0.5), csize);

  // pct2 = pow(circle(st, 0.4), circle(st, 0.6));

  // color = vec3(pct2);

  // color = vec3(a);

  gl_FragColor = vec4(color, 1.0);
}
