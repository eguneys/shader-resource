#define PI 3.1415

uniform float time;
uniform vec2 mouse;

float plot(vec2 st, float pct) {
  return smoothstep(pct-0.02, pct, st.y) -
    smoothstep(pct, pct+0.02, st.y);
}

void main() {

  vec2 u_resolution = vec2(800, 600);

  vec2 st = gl_FragCoord.xy/u_resolution;

// smoothstep
// float y = smoothstep(0.1, 0.5, st.x)
//   - smoothstep(0.5, 0.8, st.x);

  // float y = fract(sin(st.x + time)) + floor(sin(st.x + time));

  float x = st.x;
  float y = st.y;

  y = x;

  // cut in half
  // y = mod(st.x, 0.1);
  // y = fract(x);

  // y = ceil(x);
  // y = floor(x);
  // y = sign(x);
  // y = abs(x);
  // y = clamp(x, 0.1, 0.9);
  // y = min(0.5,x);

  //y = 1.0 - pow(abs(x - 0.5), 1.0);
  //y = 1.0 - pow(abs(x - 0.5) * 2.0, 0.5);
  // y = 1.0 - pow(abs(x - 0.5) * 2.0, 1.0);
  y = 1.0 - pow(abs(x - 0.5) * 2.0, mod(time * 0.3, 3.0));

  vec3 color = vec3(y);

  float pct = plot(st,y);
  color = (1.0-pct)*color+pct*vec3(0.0,1.0,0.0);

  gl_FragColor = vec4(color, 1.0);
}
