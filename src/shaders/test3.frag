#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14

uniform float time;

vec3 colorA = vec3(0.149, 0.141, 0.912);
vec3 colorB = vec3(1.000, 0.833, 0.224);

float plot(vec2 st, float pct) {
  return smoothstep(pct - 0.01, pct, st.y) -
    smoothstep(pct, pct + 0.01, st.y);
}

vec2 resolution = vec2(800, 600);

void main() {
  vec2 st = gl_FragCoord.xy / resolution.xy;
  vec3 color = vec3(0.0);

  vec3 pct = vec3(st.x);

  float x = st.x;
  float y = st.y;

  // float pct = abs(sin(time));

  // pct.r = smoothstep(0.0,1.0, st.x);
  // pct.g = sin(st.x * PI);
  // pct.b = pow(st.x, 0.5);

  pct.r = mod(x, 0.1) + 0.5;
  pct.g = mod(x, 0.1) + 0.1;
  pct.b = mod(x, 0.1);

  color = mix(colorA, colorB, pct);

  // plot transition lines for each channel
  color = mix(color,vec3(1.0,0.0,0.0),plot(st,pct.r));
  color = mix(color,vec3(0.0,1.0,0.0),plot(st,pct.g));
  color = mix(color,vec3(0.0,0.0,1.0),plot(st,pct.b));

  gl_FragColor = vec4(color, 1.0);
}
