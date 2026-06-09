import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const AnimatedShaderBackground = ({ className = "" }: { className?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let scene: THREE.Scene | null = null;
    let renderer: THREE.WebGLRenderer | null = null;
    let geometry: THREE.PlaneGeometry | null = null;
    let material: THREE.ShaderMaterial | null = null;
    let frameId: number | null = null;
    let resizeHandler: (() => void) | null = null;

    const stopAnimation = () => {
      if (frameId !== null) { cancelAnimationFrame(frameId); frameId = null; }
    };

    const startAnimation = () => {
      if (frameId !== null) return;
      const loop = () => {
        if (!renderer || !scene || !material) return;
        material.uniforms.iTime.value += 0.016;
        renderer.render(scene, camera);
        frameId = requestAnimationFrame(loop);
      };
      frameId = requestAnimationFrame(loop);
    };

    let camera: THREE.OrthographicCamera;

    // Three.js shader is too heavy for narrow viewports
    if (window.innerWidth < 768) return;

    try {
      scene = new THREE.Scene();
      camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      const w = container.offsetWidth || container.parentElement?.offsetWidth || window.innerWidth;
      const h = container.offsetHeight || container.parentElement?.offsetHeight || window.innerHeight;
      renderer.setSize(w, h);
      renderer.setClearColor(0x000000, 0);

      const canvas = renderer.domElement;
      canvas.style.position = 'absolute';
      canvas.style.inset = '0';
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      container.appendChild(canvas);

      material = new THREE.ShaderMaterial({
        uniforms: {
          iTime: { value: 0 },
          iResolution: { value: new THREE.Vector2(w, h) },
        },
        transparent: true,
        vertexShader: `void main() { gl_Position = vec4(position, 1.0); }`,
        fragmentShader: `
          uniform float iTime;
          uniform vec2 iResolution;

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
            gl_FragColor = o * 1.5;
          }
        `,
      });

      geometry = new THREE.PlaneGeometry(2, 2);
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      const io = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) startAnimation();
        else stopAnimation();
      }, { rootMargin: '100px', threshold: 0 });
      io.observe(container);

      resizeHandler = () => {
        if (!renderer || !material) return;
        const w = container.offsetWidth;
        const h = container.offsetHeight;
        if (w && h) {
          renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
          renderer.setSize(w, h);
          material.uniforms.iResolution.value.set(w, h);
        }
      };
      window.addEventListener('resize', resizeHandler);

      return () => {
        io.disconnect();
        stopAnimation();
        if (resizeHandler) window.removeEventListener('resize', resizeHandler);
        const canvas = renderer?.domElement;
        if (canvas && container.contains(canvas)) container.removeChild(canvas);
        geometry?.dispose();
        material?.dispose();
        renderer?.dispose();
      };

    } catch (e) {
      console.warn('AnimatedShaderBackground: WebGL unavailable', e);
    }
  }, []);

  return <div ref={containerRef} className={`absolute inset-0 pointer-events-none z-0 ${className}`} />;
};

export default AnimatedShaderBackground;
