uniform float time;
uniform vec2 mouse;

void main() {

  vec2 u_resolution = vec2(800, 600);

  // mouse
  vec2 st = mouse/u_resolution;
  gl_FragColor = vec4(st.x, st.y, 0.0, 1.0);

  // coord
  // vec2 st = gl_FragCoord.xy/u_resolution;
  // gl_FragColor = vec4(st.x, st.y, 0.0, 1.0);

  
  // time
  // gl_FragColor = vec4(abs(sin(time)), 0.0, 0.0, 1.0);

  // black
  // gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
}
