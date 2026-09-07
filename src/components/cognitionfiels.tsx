import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useAnimationFrame, useMotionValue, useSpring, useTransform } 
from "framer-motion";
import { CLUSTER_EDGES, HYPOTHESIS_EDGES, SYMPTOMS, type Symptom } from "../lib/symptom";

/**
 * CognitionField
 * -------------------------------------------------------------
 * A bounded circular reasoning field. Not a dashboard.
 * Symptom nodes emerge from noise, the model draws a wide graph
 * of hypotheses, prunes it into a single cluster, and quietly
 * resolves a verdict at the center. Everything is one SVG.
 */

const VB = 640; // viewBox size (square)
const CENTER = VB / 2;
const RADIUS = 260; // usable radius for nodes

// Map a normalized coordinate ([-1,1]) into SVG viewBox space.
const toX = (nx: number) => CENTER + nx * RADIUS;
const toY = (ny: number) => CENTER + ny * RADIUS;

// Total loop duration (seconds). Each phase is a fraction of this.
const LOOP = 16;
const PHASES = {
  emerge:   [0.00, 0.22], // 0.0 - 3.5s : nodes fade in from noise
  hypothesize: [0.22, 0.48], // 3.5 - 7.7s : hypothesis edges appear
  prune:    [0.48, 0.68], // 7.7 - 10.9s : unrelated fade, cluster brightens
  converge: [0.68, 0.85], // 10.9 - 13.6s : cluster edges thicken, confidence climbs
  verdict:  [0.85, 1.00], // 13.6 - 16s  : central verdict resolves
} as const;

// Small helper: read progress within a phase, clamped 0..1.
function phaseProgress(t: number, range: readonly [number, number]) {
  const [a, b] = range;
  if (t <= a) return 0;
  if (t >= b) return 1;
  return (t - a) / (b - a);
}

// Ease functions (kept local; framer's are fine but this is more predictable here).
const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3);
const easeInOutCubic = (x: number) =>
  x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;

type Phase = keyof typeof PHASES;

export function CognitionField() {
  // Master normalized clock 0..1 that loops.
  const [t, setT] = useState(0);
  const startedAt = useRef<number | null>(null);

  useAnimationFrame((now) => {
    if (startedAt.current == null) startedAt.current = now;
    const elapsed = (now - startedAt.current) / 1000;
    const nt = (elapsed % LOOP) / LOOP;
    setT(nt);
  });

  // Derived phase progress values.
  const pEmerge = phaseProgress(t, PHASES.emerge);
  const pHyp = phaseProgress(t, PHASES.hypothesize);
  const pPrune = phaseProgress(t, PHASES.prune);
  const pConverge = phaseProgress(t, PHASES.converge);
  const pVerdict = phaseProgress(t, PHASES.verdict);

  const currentPhase: Phase = useMemo(() => {
    if (pVerdict > 0) return "verdict";
    if (pConverge > 0) return "converge";
    if (pPrune > 0) return "prune";
    if (pHyp > 0) return "hypothesize";
    return "emerge";
  }, [pEmerge, pHyp, pPrune, pConverge, pVerdict]);

  // Index nodes by id for quick lookup.
  const nodeMap = useMemo(() => {
    const m = new Map<string, Symptom>();
    for (const s of SYMPTOMS) m.set(s.id, s);
    return m;
  }, []);

  // Confidence value drives the readout. It rises through hypothesize/converge.
  const confidenceRaw = useMotionValue(0);
  useEffect(() => {
    const target =
      pHyp * 0.35 +
      pPrune * 0.28 +
      pConverge * 0.27 +
      pVerdict * 0.10;
    confidenceRaw.set(Math.min(1, target));
  }, [pHyp, pPrune, pConverge, pVerdict, confidenceRaw]);
  const confidenceSpring = useSpring(confidenceRaw, {
    stiffness: 40,
    damping: 22,
    mass: 0.8,
  });
  const confidencePct = useTransform(confidenceSpring, (v) => Math.round(v * 92 + 4));

  // Slow rotation for the outer analytical ring (very subtle, purposeful).
  const ringRotation = useMotionValue(0);
  useAnimationFrame((_now, delta) => {
    ringRotation.set(ringRotation.get() + delta * 0.004); // ~degrees/sec
  });

  return ( <>
    <motion.div className="relative w-full aspect-square max-w-[640px]">
      {/* Ambient conic wash behind the field */}
      <div className="absolute inset-6 rounded-full ambient-wash opacity-70" />

      {/* Vignette to soften edges */}
      <div className="absolute inset-0 rounded-full field-vignette pointer-events-none" />

      <svg
        viewBox={`0 0 ${VB} ${VB}`}
        className="relative w-full h-full"
        role="img"
        aria-label="AI reasoning across symptom relationships"
      >
        <defs>
          {/* Node glow — used sparingly */}
          <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#09bcee" stopOpacity="0.9" />
            <stop offset="45%" stopColor="#09bcee" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#0b1220" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="clusterCore" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#6e80ff" stopOpacity="1" />
            <stop offset="60%" stopColor="#09bcee" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#2720ff" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="ghostNode" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#93a3b8" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#1e293b" stopOpacity="0" />
          </radialGradient>

          {/* Edge gradient (cyan → emerald) */}
          <linearGradient id="edgeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#09bcee" stopOpacity="0.9" />
          </linearGradient>

          <linearGradient id="edgeGradSoft" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#64748b" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.6" />
          </linearGradient>

          {/* Ring stroke gradient */}
          <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#64748b" stopOpacity="0.35" />
            <stop offset="50%" stopColor="#e2e8f0" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#64748b" stopOpacity="0.35" />
          </linearGradient>

          {/* Verdict pill gradient */}
          <linearGradient id="verdictGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6e80ff" stopOpacity="1" />
            <stop offset="100%" stopColor="#6e80ff" stopOpacity="1" />
          </linearGradient>

          {/* Soft blur filter for the cluster halo */}
          <filter id="softBlur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="10" />
          </filter>

          {/* Mask so labels don't overflow the field */}
          <clipPath id="fieldClip">
            <circle cx={CENTER} cy={CENTER} r={RADIUS + 40} />
          </clipPath>
        </defs>

        {/* Concentric analytical rings — precise, thin, mostly still */}
        <g opacity={0.55}>
          <circle cx={CENTER} cy={CENTER} r={RADIUS + 30} fill="none" stroke="url(#ringGrad)" strokeWidth="0.75" />
          <circle cx={CENTER} cy={CENTER} r={RADIUS - 40} fill="none" stroke="rgba(148,163,184,0.10)" strokeWidth="0.5" strokeDasharray="1 5" />
          <circle cx={CENTER} cy={CENTER} r={RADIUS - 120} fill="none" stroke="rgba(148,163,184,0.08)" strokeWidth="0.5" strokeDasharray="1 4" />
        </g>

        {/* Rotating tick ring — extremely slow, communicates "listening", not spinning */}
        <motion.g style={{ rotate: ringRotation, originX: CENTER, originY: CENTER }}>
          {Array.from({ length: 72 }).map((_, i) => {
            const angle = (i / 72) * Math.PI * 2;
            const r1 = RADIUS + 12;
            const r2 = i % 6 === 0 ? RADIUS + 22 : RADIUS + 16;
            const x1 = CENTER + Math.cos(angle) * r1;
            const y1 = CENTER + Math.sin(angle) * r1;
            const x2 = CENTER + Math.cos(angle) * r2;
            const y2 = CENTER + Math.sin(angle) * r2;
            return (
              <line
                key={i}
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke="rgba(226,232,240,0.18)"
                strokeWidth={i % 6 === 0 ? 0.9 : 0.5}
              />
            );
          })}
        </motion.g>

        <g clipPath="url(#fieldClip)">
          {/* -------- Edges layer (below nodes) -------- */}
          <g>
            {HYPOTHESIS_EDGES.map(([a, b, w], i) => {
              const na = nodeMap.get(a)!;
              const nb = nodeMap.get(b)!;
              const isCluster = CLUSTER_EDGES.some(
                ([x, y]) => (x === a && y === b) || (x === b && y === a),
              );

              // Draw-in progress during "hypothesize" phase (staggered by index).
              const stagger = (i / HYPOTHESIS_EDGES.length) * 0.6;
              const drawT = Math.max(0, Math.min(1, (pHyp - stagger) / (1 - stagger + 0.001)));
              const drawn = easeOutCubic(drawT);

              // During prune: non-cluster edges fade to ~0; cluster edges stay.
              const pruneOpacity = isCluster
                ? 1
                : 1 - easeInOutCubic(pPrune);

              // During converge: cluster edges thicken and brighten slightly.
              const convergeBoost = isCluster ? easeInOutCubic(pConverge) : 0;

              const baseOpacity = w * 0.85 * drawn * pruneOpacity;
              const finalOpacity = isCluster
                ? Math.min(1, baseOpacity + convergeBoost * 0.35)
                : baseOpacity;

              const strokeW = isCluster ? 0.9 + convergeBoost * 1.4 : 0.6;
              const stroke = isCluster ? "url(#edgeGrad)" : "url(#edgeGradSoft)";

              // Slight curved control point for organic feel.
              const mx = (toX(na.x) + toX(nb.x)) / 2;
              const my = (toY(na.y) + toY(nb.y)) / 2;
              const dx = toX(nb.x) - toX(na.x);
              const dy = toY(nb.y) - toY(na.y);
              const len = Math.hypot(dx, dy) || 1;
              const nxp = -dy / len;
              const nyp = dx / len;
              const curve = Math.min(28, len * 0.08);
              const cx = mx + nxp * curve;
              const cy = my + nyp * curve;

              return (
                <path
                  key={`${a}-${b}-${i}`}
                  d={`M ${toX(na.x)} ${toY(na.y)} Q ${cx} ${cy} ${toX(nb.x)} ${toY(nb.y)}`}
                  fill="none"
                  stroke={stroke}
                  strokeWidth={strokeW}
                  strokeLinecap="round"
                  opacity={finalOpacity}
                  style={{ filter: isCluster && convergeBoost > 0 ? "drop-shadow(0 0 6px rgba(52,211,153,0.35))" : undefined }}
                />
              );
            })}
          </g>

          {/* -------- Central cluster halo (only appears after prune) -------- */}
          <motion.circle
            cx={CENTER + 22 * RADIUS / RADIUS * 0.4}
            cy={CENTER + 4}
            r={130}
            fill="url(#clusterCore)"
            opacity={easeInOutCubic(pPrune) * 0.45 + easeInOutCubic(pConverge) * 0.25}
            filter="url(#softBlur)"
          />

          {/* -------- Nodes layer -------- */}
          <g>
            {SYMPTOMS.map((s, i) => {
              const x = toX(s.x);
              const y = toY(s.y);

              // Emerge stagger by node index.
              const stagger = (i / SYMPTOMS.length) * 0.75;
              const emergeT = Math.max(0, Math.min(1, (pEmerge - stagger) / (1 - stagger + 0.001)));
              const appeared = easeOutCubic(emergeT);

              // Prune fade for non-cluster nodes.
              const pruneFactor = s.inCluster ? 1 : 1 - easeInOutCubic(pPrune) * 0.82;
              const nodeOpacity = appeared * pruneFactor;

              // Converge — cluster nodes get a small glow bump.
              const glow = s.inCluster ? easeInOutCubic(pConverge) : 0;

              const rCore = s.inCluster ? 3.2 + glow * 1.4 : 2.4;
              const rGlow = s.inCluster ? 18 + glow * 6 : 12;

              const fill = s.inCluster ? "url(#nodeGlow)" : "url(#ghostNode)";
              const coreFill = s.inCluster ? "#d1fae5" : "#cbd5e1";

              // Labels: appear during hypothesize; cluster labels stay, others fade during prune.
              const labelBase = Math.max(0, Math.min(1, (pHyp - 0.15) / 0.6));
              const labelOpacity =
                (s.inCluster ? 1 : 1 - easeInOutCubic(pPrune)) *
                labelBase *
                (s.inCluster ? 0.95 : 0.55);

              // Label position: push outward along vector from center, so nothing overlaps center.
              const vx = s.x;
              const vy = s.y;
              const vlen = Math.hypot(vx, vy) || 1;
              const lx = x + (vx / vlen) * 14;
              const ly = y + (vy / vlen) * 14;
              const anchor = vx >= 0 ? "start" : "end";

              return (
                <g key={s.id} opacity={nodeOpacity}>
                  {/* Halo */}
                  <circle cx={x} cy={y} r={rGlow} fill={fill} opacity={0.9} />
                  {/* Core */}
                  <circle cx={x} cy={y} r={rCore} fill={coreFill} />
                  {/* Precise inner dot for cluster nodes only */}
                  {s.inCluster && (
                    <circle cx={x} cy={y} r={0.9} fill="#022c22" opacity={0.6} />
                  )}
                  {/* Label */}
                  <text
                    x={lx}
                    y={ly}
                    fontSize="10.5"
                    fontFamily="var(--font-mono)"
                    fill={s.inCluster ? "#e6fffa" : "#94a3b8"}
                    opacity={labelOpacity}
                    textAnchor={anchor}
                    dominantBaseline="middle"
                    style={{ letterSpacing: "0.02em" }}
                  >
                    {s.label}
                  </text>
                </g>
              );
            })}
          </g>
        </g>

        {/* -------- Central verdict readout -------- */}
        <VerdictReadout
          pConverge={pConverge}
          pVerdict={pVerdict}
          confidencePct={confidencePct}
        />

        {/* -------- Corner metadata (small caps, monospace) -------- */}
        <g fontFamily="var(--font-mono)" fill="#64748b" fontSize="9.5" letterSpacing="0.14em">
          <text x={26} y={30}>CORTEX · REASONING FIELD</text>
          <text x={VB - 26} y={30} textAnchor="end">
            {phaseLabel(currentPhase)}
          </text>
          <text x={26} y={VB - 22}>
            NODES {SYMPTOMS.length.toString().padStart(2, "0")} · EDGES {HYPOTHESIS_EDGES.length}
          </text>
          <text x={VB - 26} y={VB - 22} textAnchor="end">
            MODEL v4.2 · CLINICAL
          </text>
        </g>
      </svg>

      {/* Subtle scanline hint at the top of the field — extremely low intensity */}
      <div className="pointer-events-none absolute inset-0 rounded-full
       [mask-image:radial-gradient(circle,black_60%,transparent_75%)]">
        <div
          className="absolute inset-x-0 h-px opacity-40"
          style={{
            top: `${20 + Math.sin(t * Math.PI * 2) * 30}%`,
            background:
              "linear-gradient(90deg, transparent, #6e80ff, transparent)",
          }}
        />
      </div>
    </motion.div>
    </>
  );
}

function phaseLabel(p: Phase): string {
  switch (p) {
    case "emerge": return "OBSERVING · 01";
    case "hypothesize": return "HYPOTHESIZING · 02";
    case "prune": return "PRUNING · 03";
    case "converge": return "CONVERGING · 04";
    case "verdict": return "ASSESSMENT · 05";
  }
}

/**
 * Central verdict — sits still, everything else moves toward it.
 * Confidence % counts up smoothly; the risk chip fades in last.
 */
function VerdictReadout({
  pConverge,
  pVerdict,
  confidencePct,
}: {
  pConverge: number;
  pVerdict: number;
  confidencePct: ReturnType<typeof useTransform<number, number>>;
}) {
  const [displayPct, setDisplayPct] = useState(0);
  useEffect(() => {
    return confidencePct.on("change", (v) => setDisplayPct(Math.round(v)));
  }, [confidencePct]);

  const chipOpacity = easeInOutCubic(Math.max(0, Math.min(1, (pVerdict - 0.15) / 0.7)));
  const labelOpacity = easeInOutCubic(Math.max(0, Math.min(1, pConverge)));

  return (
    <g>
      {/* Confidence label */}
      <text
        x={CENTER}
        y={CENTER - 44}
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="10"
        letterSpacing="0.2em"
        fill="#64748b"
        opacity={labelOpacity}
      >
        CONFIDENCE
      </text>

      {/* Big % number */}
      <text
        x={CENTER}
        y={CENTER + 6}
        textAnchor="middle"
        fontFamily="var(--font-display)"
        fontSize="64"
        fontWeight={300}
        fill="#e6fffa"
        opacity={labelOpacity}
        style={{ letterSpacing: "-0.03em" }}
      >
        {displayPct}
        <tspan fontSize="22" fill="#64748b" dx="4" dy="-24">%</tspan>
      </text>

      {/* Small assessment chip */}
      <g opacity={chipOpacity} transform={`translate(${CENTER}, ${CENTER + 44})`}>
        {/* Chip background */}
        <rect
          x={-72}
          y={-14}
          width={144}
          height={28}
          rx={14}
          fill="rgba(15, 23, 42, 0.7)"
          stroke="rgba(251,191,36,0.35)"
          strokeWidth={0.75}
        />
        <circle cx={-52} cy={0} r={4} fill="url(#verdictGrad)" />
        <circle cx={-52} cy={0} r={7} fill="6e80ff" opacity={0.25} />
        <text
          x={-40}
          y={1}
          fontFamily="var(--font-mono)"
          fontSize="10.5"
          letterSpacing="0.18em"
          fill="#fde68a"
          dominantBaseline="middle"
        >
          MEDIUM RISK
        </text>
      </g>

      {/* Recommendation line — very small, appears last */}
      <text
        x={CENTER}
        y={CENTER + 82}
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="9"
        letterSpacing="0.16em"
        fill="#475569"
        opacity={chipOpacity}
      >
        CARDIOPULMONARY · REVIEW ADVISED
      </text>
    </g>
  );
}
