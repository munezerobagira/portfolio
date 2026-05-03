"use client";

import { useRef, useMemo, useEffect, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* ── GLSL Shaders ─────────────────────────────────────────────────────── */
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision mediump float;

  uniform float uTime;
  uniform vec2  uResolution;
  uniform vec2  uMouse;
  uniform vec2  uMouseVel;

  varying vec2 vUv;

  /* ── Simplex-like noise helpers ─────────────────────────── */
  vec3 mod289(vec3 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314*r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g  = step(x0.yzx, x0.xyz);
    vec3 l  = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
                i.z + vec4(0.0, i1.z, i2.z, 1.0))
              + i.y + vec4(0.0, i1.y, i2.y, 1.0))
              + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3  ns = n_ * D.wyz - D.xzx;
    vec4 j  = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x  = x_ * ns.x + ns.yyyy;
    vec4 y  = y_ * ns.x + ns.yyyy;
    vec4 h  = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    vec2 uv = vUv;

    /* Screen-space coords */
    vec2 pos = uv * 2.0 - 1.0;
    pos.x *= uResolution.x / uResolution.y;

    /* Mouse influence – create wake/vortex */
    vec2 mouseNorm = uMouse * 2.0 - 1.0;
    mouseNorm.x *= uResolution.x / uResolution.y;
    float mouseDist = length(pos - mouseNorm);
    float wake = exp(-mouseDist * 2.5) * length(uMouseVel) * 4.0;

    /* Smoke density: denser at bottom, thin at top */
    float baseHeight = 1.0 - uv.y;
    float heightFalloff = pow(max(baseHeight, 0.0), 1.4);

    /* Multi-octave noise for volumetric feel */
    float t = uTime * 0.12;
    float n1 = snoise(vec3(pos * 1.2 + wake * 0.15, t));
    float n2 = snoise(vec3(pos * 2.4 - wake * 0.25, t * 1.6 + 1.7));
    float n3 = snoise(vec3(pos * 4.8 + wake * 0.35, t * 2.3 + 3.4));

    float smoke = (n1 * 0.55 + n2 * 0.30 + n3 * 0.15) * 0.5 + 0.5;
    smoke *= heightFalloff;
    smoke = clamp(smoke, 0.0, 1.0);

    /* Base void colour */
    vec3 col = vec3(0.02, 0.02, 0.04);

    /* Neon cyan backlight: lower-left region */
    float cyanDist = length(pos - vec2(-1.2, -0.8));
    float cyanGlow = exp(-cyanDist * 0.9) * 0.35;
    col += vec3(0.0, 0.94, 1.0) * cyanGlow * smoke;

    /* Neon magenta backlight: lower-right region */
    float magentaDist = length(pos - vec2(1.2, -0.5));
    float magentaGlow = exp(-magentaDist * 1.1) * 0.25;
    col += vec3(1.0, 0.0, 0.24) * magentaGlow * smoke;

    /* Mouse proximity cyan reactive glow */
    col += vec3(0.0, 0.94, 1.0) * exp(-mouseDist * 1.8) * 0.18 * smoke;

    /* Smoke as dark volume tinted slightly */
    col = mix(vec3(0.02, 0.02, 0.04), col, smoke * 0.9);

    /* Vignette */
    float vig = 1.0 - smoothstep(0.55, 1.5, length(pos * 0.6));
    col *= vig;

    gl_FragColor = vec4(col, 1.0);
  }
`;

/* ── Inner scene (runs inside <Canvas>) ──────────────────────────────── */
function SmokeScene({
  mouseRef,
  mouseVelRef,
}: {
  mouseRef: React.RefObject<THREE.Vector2>;
  mouseVelRef: React.RefObject<THREE.Vector2>;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { size } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uMouseVel: { value: new THREE.Vector2(0, 0) },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    uniforms.uResolution.value.set(size.width, size.height);
  }, [size, uniforms]);

  useFrame(({ clock }) => {
    uniforms.uTime.value = clock.getElapsedTime();
    if (mouseRef.current) {
      uniforms.uMouse.value.copy(mouseRef.current);
    }
    if (mouseVelRef.current) {
      uniforms.uMouseVel.value.copy(mouseVelRef.current);
      /* Dampen velocity each frame */
      mouseVelRef.current.multiplyScalar(0.88);
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthTest={false}
      />
    </mesh>
  );
}

/* ── Public component ─────────────────────────────────────────────────── */
export default function SmokeCanvas() {
  const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2(0.5, 0.5));
  const mouseVelRef = useRef<THREE.Vector2>(new THREE.Vector2(0, 0));
  const prevMouseRef = useRef<THREE.Vector2>(new THREE.Vector2(0.5, 0.5));

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const nx = e.clientX / window.innerWidth;
    const ny = 1 - e.clientY / window.innerHeight;
    mouseVelRef.current.set(
      nx - prevMouseRef.current.x,
      ny - prevMouseRef.current.y
    );
    mouseRef.current.set(nx, ny);
    prevMouseRef.current.set(nx, ny);
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return (
    <div
      className="fixed inset-0 -z-10"
      aria-hidden="true"
      style={{ background: "#05050a" }}
    >
      <Canvas
        dpr={[0.5, 1]}
        camera={{ position: [0, 0, 1], near: 0.1, far: 10 }}
        gl={{
          antialias: false,
          powerPreference: "low-power",
          alpha: false,
        }}
      >
        <SmokeScene mouseRef={mouseRef} mouseVelRef={mouseVelRef} />
      </Canvas>
    </div>
  );
}
