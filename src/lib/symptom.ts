export type Symptom = {
  id: string;
  label: string;
  // Polar-ish coordinates in a normalized [-1, 1] box.
  x: number;
  y: number;
  // Whether the node belongs to the "signal" cluster the AI converges on.
  inCluster: boolean;
};

// A deterministic, hand-tuned constellation. Coordinates are in a
// normalized unit box; the SVG renderer maps them into its viewBox.
// The cluster (inCluster: true) forms a loose triangular grouping in
// the mid-right, which the AI "discovers" over the course of the loop.
export const SYMPTOMS: Symptom[] = [
  // --- Signal cluster (related) ---
  { id: "s1", label: "Chest tightness",  x:  0.18, y: -0.28, inCluster: true },
  { id: "s2", label: "Shortness of breath", x:  0.42, y: -0.06, inCluster: true },
  { id: "s3", label: "Fatigue",          x:  0.05, y:  0.10, inCluster: true },
  { id: "s4", label: "Elevated HR",      x:  0.34, y:  0.28, inCluster: true },
  { id: "s5", label: "Dizziness",        x: -0.10, y: -0.14, inCluster: true },
  { id: "s6", label: "Cold sweat",       x:  0.22, y:  0.08, inCluster: true },

  // --- Noise / unrelated nodes ---
  { id: "n1",  label: "Mild headache",     x: -0.62, y: -0.48, inCluster: false },
  { id: "n2",  label: "Dry throat",        x: -0.48, y:  0.10, inCluster: false },
  { id: "n3",  label: "Itchy eyes",        x: -0.72, y:  0.28, inCluster: false },
  { id: "n4",  label: "Muscle soreness",   x: -0.30, y:  0.52, inCluster: false },
  { id: "n5",  label: "Runny nose",        x:  0.06, y: -0.62, inCluster: false },
  { id: "n6",  label: "Bloating",          x:  0.58, y:  0.54, inCluster: false },
  { id: "n7",  label: "Joint stiffness",   x:  0.72, y:  0.14, inCluster: false },
  { id: "n8",  label: "Nasal congestion",  x: -0.20, y: -0.58, inCluster: false },
  { id: "n9",  label: "Skin dryness",      x: -0.66, y: -0.10, inCluster: false },
  { id: "n10", label: "Mild cough",        x:  0.62, y: -0.36, inCluster: false },
  { id: "n11", label: "Ear pressure",      x: -0.44, y: -0.30, inCluster: false },
  { id: "n12", label: "Appetite change",   x:  0.48, y: -0.52, inCluster: false },
  { id: "n13", label: "Tinnitus",          x: -0.08, y:  0.62, inCluster: false },
  { id: "n14", label: "Back tension",      x:  0.66, y: -0.14, inCluster: false },
  { id: "n15", label: "Sleep disruption",  x: -0.52, y:  0.44, inCluster: false },
  { id: "n16", label: "Warm flush",        x:  0.14, y:  0.46, inCluster: false },
];

// Edges the model "considers" during phase 2 — a wide graph of hypotheses.
// Each pair references node ids; weights are for line opacity.
export const HYPOTHESIS_EDGES: Array<[string, string, number]> = [
  // Cluster internal (strong)
  ["s1", "s2", 0.95],
  ["s2", "s4", 0.9],
  ["s1", "s5", 0.8],
  ["s2", "s6", 0.85],
  ["s3", "s5", 0.7],
  ["s4", "s6", 0.75],
  ["s1", "s4", 0.65],
  ["s3", "s6", 0.6],
  ["s2", "s5", 0.55],

  // Noise-to-noise (weak, discarded later)
  ["n1", "n8", 0.35],
  ["n2", "n9", 0.3],
  ["n3", "n11", 0.28],
  ["n4", "n15", 0.32],
  ["n6", "n16", 0.3],
  ["n7", "n14", 0.34],
  ["n10", "n12", 0.3],
  ["n13", "n4", 0.22],
  ["n5", "n8", 0.2],
  ["n11", "n9", 0.22],

  // Cross links (bridge — pruned)
  ["s3", "n15", 0.25],
  ["s5", "n11", 0.2],
  ["s1", "n10", 0.22],
  ["s4", "n16", 0.25],
  ["s6", "n2", 0.18],
  ["n1", "s5", 0.2],
];

// Only these survive after pruning — the edges shown in the "converged" state.
export const CLUSTER_EDGES: Array<[string, string]> = [
  ["s1", "s2"],
  ["s2", "s4"],
  ["s1", "s5"],
  ["s2", "s6"],
  ["s3", "s5"],
  ["s4", "s6"],
  ["s1", "s4"],
  ["s3", "s6"],
];
