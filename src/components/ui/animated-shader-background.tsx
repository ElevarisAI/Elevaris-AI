import { useEffect, useRef } from 'react';

// Raw WebGL2 port of the previous three.js implementation — identical fragment
// shader, uniforms, and blending, without shipping the three.js bundle.
// WebGL2 is required: the shader relies on tanh(), which only exists in GLSL ES 3.00.

const vsSource = `#version 300 es
in vec4 aVertexPosition;
void main() { gl_Position = aVertexPosition; }
`;

const fsSource = `#version 300 es
precision highp float;
uniform float iTime;
uniform vec2 iResolution;
out vec4 fragColor;

#define NUM_OCTAVES 2

float rand(vec2 n) {
  return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 ip = floor(p);
  vec2 u = fract(p);
  u = u*u*(3.0-2.0*u);
  float res = mix(
    mix(rand(ip), rand(ip + vec2(1.0, 0.0)), u.x),
    mix(rand(ip + vec2(0.0, 1.0)), rand(ip + vec2(1.0, 1.0)), u.x), u.y);
  return res * res;
}

float fbm(vec2 x) {
  float v = 0.0;
  float a = 0.3;
  vec2 shift = vec2(100);
  mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
  for (int i = 0; i < NUM_OCTAVES; ++i) {
    v += a * noise(x);
    x = rot * x * 2.0 + shift;
    a *= 0.4;
  }
  return v;
}

void main() {
  vec2 shake = vec2(sin(iTime * 1.2) * 0.005, cos(iTime * 2.1) * 0.005);
  vec2 p = ((gl_FragCoord.xy + shake * iResolution.xy) - iResolution.xy * 0.5) / iResolution.y * mat2(6.0, -4.0, 4.0, 6.0);
  vec2 v;
  vec4 o = vec4(0.0);

  float f = 2.0 + fbm(p + vec2(iTime * 5.0, 0.0)) * 0.5;

  for (float i = 0.0; i < 16.0; i++) {
    v = p + cos(i * i + (iTime + p.x * 0.08) * 0.025 + i * vec2(13.0, 11.0)) * 3.5 + vec2(sin(iTime * 3.0 + i) * 0.003, cos(iTime * 3.5 - i) * 0.003);
    float tailNoise = fbm(v + vec2(iTime * 0.5, i)) * 0.3 * (1.0 - (i / 16.0));
    vec4 auroraColors = vec4(
      0.05 + 0.08 * sin(i * 0.2 + iTime * 0.4),
      0.55 + 0.15 * cos(i * 0.3 + iTime * 0.5),
      0.62 + 0.12 * sin(i * 0.4 + iTime * 0.3),
      1.0
    );
    vec4 currentContribution = auroraColors * exp(sin(i * i + iTime * 0.8)) / length(max(v, vec2(v.x * f * 0.015, v.y * 1.5)));
    float thinnessFactor = smoothstep(0.0, 1.0, i / 16.0) * 0.6;
    o += currentContribution * (1.0 + tailNoise * 0.8) * thinnessFactor;
  }

  o = tanh(pow(o / 100.0, vec4(1.6)));
  fragColor = o * 1.5;
}
`;

const AnimatedShaderBackground = ({ className = "" }: { className?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Shader is too heavy for narrow viewports
    if (window.innerWidth < 768) return;

    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.inset = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';

    const gl = canvas.getContext('webgl2', { alpha: true, antialias: false, premultipliedAlpha: true });
    if (!gl) {
      console.warn('AnimatedShaderBackground: WebGL2 unavailable');
      return;
    }

    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.warn('AnimatedShaderBackground shader error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = compile(gl.VERTEX_SHADER, vsSource);
    const fs = compile(gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return;

    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.warn('AnimatedShaderBackground link error:', gl.getProgramInfoLog(program));
      return;
    }

    // Match three.js NormalBlending for a transparent material over a transparent clear
    gl.enable(gl.BLEND);
    gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const positionLoc = gl.getAttribLocation(program, 'aVertexPosition');
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionLoc);

    const timeLoc = gl.getUniformLocation(program, 'iTime');
    const resolutionLoc = gl.getUniformLocation(program, 'iResolution');
    gl.useProgram(program);

    // iResolution stays in CSS pixels while the buffer is DPR-scaled — matches
    // the previous three.js behavior exactly.
    const setSize = () => {
      const w = container.offsetWidth || container.parentElement?.offsetWidth || window.innerWidth;
      const h = container.offsetHeight || container.parentElement?.offsetHeight || window.innerHeight;
      if (!w || !h) return;
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(resolutionLoc, w, h);
    };

    container.appendChild(canvas);
    setSize();

    let time = 0;
    let frameId: number | null = null;

    const stopAnimation = () => {
      if (frameId !== null) { cancelAnimationFrame(frameId); frameId = null; }
    };

    const startAnimation = () => {
      if (frameId !== null) return;
      const loop = () => {
        time += 0.016;
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.uniform1f(timeLoc, time);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        frameId = requestAnimationFrame(loop);
      };
      frameId = requestAnimationFrame(loop);
    };

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) startAnimation();
      else stopAnimation();
    }, { rootMargin: '100px', threshold: 0 });
    io.observe(container);

    window.addEventListener('resize', setSize);

    return () => {
      io.disconnect();
      stopAnimation();
      window.removeEventListener('resize', setSize);
      if (container.contains(canvas)) container.removeChild(canvas);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(positionBuffer);
    };
  }, []);

  return <div ref={containerRef} className={`absolute inset-0 pointer-events-none z-0 ${className}`} />;
};

export default AnimatedShaderBackground;
