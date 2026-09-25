import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { INSPIRATION_TABLE_RULE } from '../data/tableRules';

const PHI = (1 + Math.sqrt(5)) / 2;
const CINEMATIC_ROLL_MS = 1550;
const CINEMATIC_HOLD_MS = 1050;
const CINEMATIC_FADE_MS = 360;
const MAX_CINEMATIC_DICE = 6;

function normalize([x, y, z]) {
  const length = Math.hypot(x, y, z) || 1;
  return [x / length, y / length, z / length];
}

function normalizeVertices(vertices) {
  const maxLength = Math.max(...vertices.map(([x, y, z]) => Math.hypot(x, y, z))) || 1;
  return vertices.map(([x, y, z]) => [x / maxLength, y / maxLength, z / maxLength]);
}

function rotateVertex([x, y, z], rx, ry, rz) {
  const cosX = Math.cos(rx); const sinX = Math.sin(rx);
  const cosY = Math.cos(ry); const sinY = Math.sin(ry);
  const cosZ = Math.cos(rz); const sinZ = Math.sin(rz);

  let ny = y * cosX - z * sinX;
  let nz = y * sinX + z * cosX;
  let nx = x;

  const x2 = nx * cosY + nz * sinY;
  const z2 = -nx * sinY + nz * cosY;
  nx = x2;
  nz = z2;

  const x3 = nx * cosZ - ny * sinZ;
  const y3 = nx * sinZ + ny * cosZ;
  return [x3, y3, nz];
}

function cross(a, b) {
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0],
  ];
}

function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

function faceNormal(vertices, indices) {
  if (indices.length < 3) return [0, 0, 1];
  const a = vertices[indices[0]];
  const b = vertices[indices[1]];
  const c = vertices[indices[2]];
  const ab = [b[0] - a[0], b[1] - a[1], b[2] - a[2]];
  const ac = [c[0] - a[0], c[1] - a[1], c[2] - a[2]];
  let normal = normalize(cross(ab, ac));
  const centroid = indices.reduce((acc, index) => [
    acc[0] + vertices[index][0],
    acc[1] + vertices[index][1],
    acc[2] + vertices[index][2],
  ], [0, 0, 0]).map(value => value / indices.length);
  if (dot(normal, centroid) < 0) normal = normal.map(value => -value);
  return normal;
}

function easeOutQuint(t) {
  return 1 - Math.pow(1 - t, 5);
}

function makeIcosahedron() {
  const vertices = normalizeVertices([
    [-1, PHI, 0], [1, PHI, 0], [-1, -PHI, 0], [1, -PHI, 0],
    [0, -1, PHI], [0, 1, PHI], [0, -1, -PHI], [0, 1, -PHI],
    [PHI, 0, -1], [PHI, 0, 1], [-PHI, 0, -1], [-PHI, 0, 1],
  ]);
  const faces = [
    [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
    [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
    [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
    [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1],
  ];
  return { vertices, faces, name: 'd20', kind: 'polyhedron' };
}

function makeTetrahedron() {
  return {
    vertices: normalizeVertices([[1, 1, 1], [1, -1, -1], [-1, 1, -1], [-1, -1, 1]]),
    faces: [[0, 2, 1], [0, 1, 3], [0, 3, 2], [1, 2, 3]],
    name: 'd4',
    kind: 'polyhedron',
  };
}

function makeCube() {
  const vertices = normalizeVertices([
    [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
    [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1],
  ]);
  const faces = [
    [0, 1, 2, 3], [4, 7, 6, 5], [0, 4, 5, 1],
    [1, 5, 6, 2], [2, 6, 7, 3], [3, 7, 4, 0],
  ];
  return { vertices, faces, name: 'd6', kind: 'polyhedron' };
}

function makeOctahedron() {
  return {
    vertices: [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]],
    faces: [
      [0, 2, 4], [2, 1, 4], [1, 3, 4], [3, 0, 4],
      [2, 0, 5], [1, 2, 5], [3, 1, 5], [0, 3, 5],
    ],
    name: 'd8',
    kind: 'polyhedron',
  };
}

function makeD10() {
  const vertices = [[0, 0, 1.18], [0, 0, -1.18]];
  for (let index = 0; index < 5; index += 1) {
    const angle = -Math.PI / 2 + (index * Math.PI * 2) / 5;
    vertices.push([Math.cos(angle), Math.sin(angle), 0]);
  }
  const faces = [];
  for (let index = 0; index < 5; index += 1) {
    const current = 2 + index;
    const next = 2 + ((index + 1) % 5);
    faces.push([0, current, next]);
    faces.push([1, next, current]);
  }
  return { vertices: normalizeVertices(vertices), faces, name: 'd10', kind: 'polyhedron' };
}

function makeDodecahedron() {
  const icosahedron = makeIcosahedron();
  const vertices = icosahedron.faces.map(face => normalize(face.reduce((acc, index) => [
    acc[0] + icosahedron.vertices[index][0],
    acc[1] + icosahedron.vertices[index][1],
    acc[2] + icosahedron.vertices[index][2],
  ], [0, 0, 0]).map(value => value / face.length)));

  const faces = icosahedron.vertices.map((vertex, vertexIndex) => {
    const adjacent = icosahedron.faces
      .map((face, faceIndex) => ({ face, faceIndex }))
      .filter(({ face }) => face.includes(vertexIndex))
      .map(({ faceIndex }) => faceIndex);

    const normal = normalize(vertex);
    const helper = Math.abs(normal[2]) < 0.88 ? [0, 0, 1] : [0, 1, 0];
    const tangentA = normalize(cross(helper, normal));
    const tangentB = normalize(cross(normal, tangentA));

    return adjacent.sort((a, b) => {
      const va = vertices[a];
      const vb = vertices[b];
      const angleA = Math.atan2(dot(va, tangentB), dot(va, tangentA));
      const angleB = Math.atan2(dot(vb, tangentB), dot(vb, tangentA));
      return angleA - angleB;
    });
  });

  return { vertices: normalizeVertices(vertices), faces, name: 'd12', kind: 'polyhedron' };
}

function makeD100() {
  const sectors = 10;
  const rings = 9;
  const vertices = [[0, 0, 1.08]];

  for (let ring = 1; ring <= rings; ring += 1) {
    const theta = (ring * Math.PI) / (rings + 1);
    const radius = Math.sin(theta);
    const z = Math.cos(theta) * 1.08;
    const offset = ring % 2 === 0 ? Math.PI / sectors : 0;
    for (let sector = 0; sector < sectors; sector += 1) {
      const angle = offset + (sector * Math.PI * 2) / sectors;
      vertices.push([radius * Math.cos(angle), radius * Math.sin(angle), z]);
    }
  }

  const bottomIndex = vertices.length;
  vertices.push([0, 0, -1.08]);
  const faces = [];

  for (let sector = 0; sector < sectors; sector += 1) {
    const next = (sector + 1) % sectors;
    faces.push([0, 1 + sector, 1 + next]);
  }

  for (let ring = 0; ring < rings - 1; ring += 1) {
    const currentStart = 1 + ring * sectors;
    const nextStart = currentStart + sectors;
    for (let sector = 0; sector < sectors; sector += 1) {
      const next = (sector + 1) % sectors;
      faces.push([
        currentStart + sector,
        nextStart + sector,
        nextStart + next,
        currentStart + next,
      ]);
    }
  }

  const lastStart = 1 + (rings - 1) * sectors;
  for (let sector = 0; sector < sectors; sector += 1) {
    const next = (sector + 1) % sectors;
    faces.push([bottomIndex, lastStart + next, lastStart + sector]);
  }

  return { vertices: normalizeVertices(vertices), faces, name: 'd100', kind: 'polyhedron' };
}

function makeCoin() {
  const segments = 14;
  const vertices = [];
  for (const z of [0.16, -0.16]) {
    for (let index = 0; index < segments; index += 1) {
      const angle = (index * Math.PI * 2) / segments;
      vertices.push([Math.cos(angle), Math.sin(angle), z]);
    }
  }
  const top = Array.from({ length: segments }, (_, index) => index);
  const bottom = Array.from({ length: segments }, (_, index) => segments + (segments - 1 - index));
  const faces = [top, bottom];
  for (let index = 0; index < segments; index += 1) {
    const next = (index + 1) % segments;
    faces.push([index, next, segments + next, segments + index]);
  }
  return { vertices: normalizeVertices(vertices), faces, name: 'd2', kind: 'coin' };
}

const MESHES = {
  2: makeCoin(),
  4: makeTetrahedron(),
  6: makeCube(),
  8: makeOctahedron(),
  10: makeD10(),
  12: makeDodecahedron(),
  20: makeIcosahedron(),
  100: makeD100(),
};

function meshForSides(sides) {
  return MESHES[sides] || MESHES[20];
}

function extractDice(result) {
  if (!result) return [];
  const dice = [];
  for (const part of result.parts || []) {
    if (part.type === 'dice') {
      (part.rolls || []).forEach((value, index) => dice.push({
        id: `${part.sides}-${dice.length}-${index}`,
        sides: part.sides,
        value,
      }));
    } else if (part.type === 'attribute') {
      (part.rolls || []).forEach((value, index) => dice.push({
        id: `4-attribute-${index}`,
        sides: 4,
        value,
      }));
    }
  }
  return dice;
}

function getDicePositions(count) {
  if (count <= 1) return [[0, 0]];
  if (count === 2) return [[-0.22, 0], [0.22, 0]];
  if (count === 3) return [[-0.23, 0.08], [0.23, 0.08], [0, -0.22]];
  if (count === 4) return [[-0.2, -0.16], [0.2, -0.16], [-0.2, 0.18], [0.2, 0.18]];
  if (count === 5) return [[-0.28, -0.16], [0, -0.16], [0.28, -0.16], [-0.14, 0.2], [0.14, 0.2]];
  return [[-0.28, -0.17], [0, -0.17], [0.28, -0.17], [-0.28, 0.2], [0, 0.2], [0.28, 0.2]];
}

function diePalette(sides) {
  const hueBySides = { 2: 42, 4: 8, 6: 216, 8: 174, 10: 278, 12: 332, 20: 39, 100: 196 };
  return hueBySides[sides] ?? 39;
}

function drawDie(ctx, mesh, options) {
  const {
    cx, cy, size, time, progress, dieIndex, value, sides, reveal, preview,
  } = options;

  const idle = preview ? time * 0.00024 : 0;
  const finalSeed = (dieIndex + 1) * 0.73 + sides * 0.017;
  const eased = easeOutQuint(progress ?? 1);
  const spinWeight = preview ? 0 : eased;
  const turns = 7.2 + (dieIndex % 3) * 1.35;

  let rx = 0.45 + finalSeed * 0.31 + idle * (preview ? 0.8 : 0.08);
  let ry = -0.65 + finalSeed * 0.44 + idle * (preview ? 1 : 0.1);
  let rz = 0.14 + finalSeed * 0.17 + idle * (preview ? 0.34 : 0.04);

  if (!preview && progress !== null) {
    rx += spinWeight * Math.PI * turns * 1.6;
    ry += spinWeight * Math.PI * turns * 2.1;
    rz += spinWeight * Math.PI * turns * 0.92;
  }

  if (sides === 2 && reveal) {
    // A moeda precisa encerrar com a face sorteada realmente voltada para a câmera.
    // Face 0 = valor 1; face 1 = valor 2.
    rx = value === 2 ? Math.PI - 0.52 : 0.52;
    ry = 0.18;
    rz = -0.12;
  }

  const rotated = mesh.vertices.map(vertex => rotateVertex(vertex, rx, ry, rz));
  const cameraDistance = 3.6;
  const projected = rotated.map(([x, y, z]) => {
    const perspective = cameraDistance / (cameraDistance - z);
    return [cx + x * size * perspective, cy + y * size * perspective, z];
  });

  const light = normalize([-0.55, -0.7, 1.35]);
  const hue = diePalette(sides);
  const faces = mesh.faces.map((indices, faceIndex) => {
    const normal = faceNormal(rotated, indices);
    const depth = indices.reduce((sum, index) => sum + rotated[index][2], 0) / indices.length;
    const lightAmount = Math.max(0, dot(normal, light));
    const frontness = normal[2];
    return { indices, faceIndex, normal, depth, lightAmount, frontness };
  }).sort((a, b) => a.depth - b.depth);

  if (reveal) {
    const glow = ctx.createRadialGradient(cx, cy, size * 0.1, cx, cy, size * 1.35);
    glow.addColorStop(0, `hsla(${hue}, 82%, 64%, 0.22)`);
    glow.addColorStop(0.52, `hsla(${hue}, 76%, 52%, 0.08)`);
    glow.addColorStop(1, `hsla(${hue}, 70%, 45%, 0)`);
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(cx, cy, size * 1.4, 0, Math.PI * 2);
    ctx.fill();
  }

  let resultFace = null;
  for (const face of faces) {
    if (!resultFace || (face.frontness * 1.8 + face.depth) > (resultFace.frontness * 1.8 + resultFace.depth)) {
      if (face.frontness > 0.05) resultFace = face;
    }

    const points = face.indices.map(index => projected[index]);
    const alpha = face.frontness > -0.2 ? 0.97 : 0.25;
    const luminance = 22 + face.lightAmount * 38 + (face.depth + 1) * 5;

    ctx.beginPath();
    ctx.moveTo(points[0][0], points[0][1]);
    for (let pointIndex = 1; pointIndex < points.length; pointIndex += 1) {
      ctx.lineTo(points[pointIndex][0], points[pointIndex][1]);
    }
    ctx.closePath();

    ctx.fillStyle = `hsla(${hue}, ${sides === 20 ? 56 : 48}%, ${Math.min(72, luminance)}%, ${alpha})`;
    ctx.fill();
    ctx.strokeStyle = face.frontness > 0 ? `hsla(${hue}, 78%, 82%, 0.74)` : `hsla(${hue}, 35%, 28%, 0.30)`;
    ctx.lineWidth = face.frontness > 0 ? Math.max(1.1, size * 0.012) : Math.max(0.6, size * 0.006);
    ctx.stroke();

    // d2 = moeda: 1 e 2 pertencem fisicamente às duas faces planas.
    // Durante a rotação, a face visível já carrega seu próprio valor.
    if (sides === 2 && face.faceIndex < 2 && face.frontness > 0.08) {
      const x = points.reduce((sum, point) => sum + point[0], 0) / points.length;
      const y = points.reduce((sum, point) => sum + point[1], 0) / points.length;
      const faceWidth = Math.max(...points.map(point => point[0])) - Math.min(...points.map(point => point[0]));
      const faceHeight = Math.max(...points.map(point => point[1])) - Math.min(...points.map(point => point[1]));
      const fontSize = Math.max(16, Math.min(size * 0.5, faceWidth * 0.38, faceHeight * 0.62));
      ctx.save();
      ctx.translate(x, y);
      ctx.shadowColor = 'rgba(255,235,170,0.66)';
      ctx.shadowBlur = Math.max(4, size * 0.05);
      ctx.fillStyle = 'rgba(28,18,7,0.94)';
      ctx.font = `800 ${fontSize}px Georgia, serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(face.faceIndex === 0 ? '1' : '2', 0, 1);
      ctx.restore();
    }
  }

  if (reveal && resultFace && sides !== 2) {
    const points = resultFace.indices.map(index => projected[index]);
    const x = points.reduce((sum, point) => sum + point[0], 0) / points.length;
    const y = points.reduce((sum, point) => sum + point[1], 0) / points.length;
    const faceWidth = Math.max(...points.map(point => point[0])) - Math.min(...points.map(point => point[0]));
    const faceHeight = Math.max(...points.map(point => point[1])) - Math.min(...points.map(point => point[1]));
    const fontSize = Math.max(13, Math.min(size * 0.34, faceWidth * 0.52, faceHeight * 0.7));

    ctx.save();
    ctx.translate(x, y);
    ctx.shadowColor = `hsla(${hue}, 90%, 84%, 0.72)`;
    ctx.shadowBlur = Math.max(6, size * 0.08);
    ctx.fillStyle = sides === 6 ? 'rgba(250,248,238,0.95)' : 'rgba(24,15,8,0.94)';
    ctx.font = `800 ${fontSize}px Georgia, serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(String(value ?? 1), 0, 1);
    ctx.restore();
  }

  if (reveal && Number(value) === Number(sides)) {
    ctx.save();
    ctx.font = `700 ${Math.max(10, size * 0.085)}px Georgia, serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'rgba(255,239,176,0.94)';
    ctx.shadowColor = 'rgba(255,198,74,0.9)';
    ctx.shadowBlur = Math.max(5, size * 0.05);
    ctx.fillText('MÁX', cx, cy + size * 0.72);
    ctx.restore();
  }
}

function drawScene(ctx, width, height, time, dice, state) {
  const { progress, reveal, preview } = state;
  ctx.clearRect(0, 0, width, height);

  const displayedDice = (dice.length > 0 ? dice : [{ sides: 20, value: 20, id: 'idle-d20' }]).slice(0, MAX_CINEMATIC_DICE);
  const positions = getDicePositions(displayedDice.length);
  const minDimension = Math.min(width, height);
  const countScale = displayedDice.length <= 1 ? 1 : displayedDice.length <= 3 ? 0.69 : 0.54;
  const size = minDimension * (preview ? 0.29 : 0.26) * countScale;

  displayedDice.forEach((die, index) => {
    const [px, py] = positions[index] || [0, 0];
    const bounce = preview || progress === null
      ? 0
      : -Math.sin(Math.PI * Math.min(1, progress)) * height * 0.055
        + Math.sin(progress * Math.PI * 8 + index) * (1 - progress) * height * 0.018;
    const spread = preview ? 0 : Math.sin(Math.min(1, progress) * Math.PI) * (index - (displayedDice.length - 1) / 2) * width * 0.012;

    drawDie(ctx, meshForSides(die.sides), {
      cx: width / 2 + px * width + spread,
      cy: height / 2 + py * height + bounce,
      size,
      time,
      progress,
      dieIndex: index,
      value: die.value,
      sides: die.sides,
      reveal,
      preview,
    });
  });
}

function useCanvasAnimation(canvasRef, dice, animationStateRef, preview = false, active = true) {
  const frameRef = useRef(null);

  useEffect(() => {
    if (!active) return undefined;
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

    const frame = (time) => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const cssWidth = Math.max(120, canvas.clientWidth || 120);
      const cssHeight = Math.max(120, canvas.clientHeight || 120);
      const targetWidth = Math.round(cssWidth * dpr);
      const targetHeight = Math.round(cssHeight * dpr);
      if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
        canvas.width = targetWidth;
        canvas.height = targetHeight;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const currentAnimation = animationStateRef.current || { progress: 0, reveal: false };
      const effectiveState = preview
        ? { progress: null, reveal: Boolean(dice.length), preview: true }
        : {
          progress: reducedMotion ? 1 : currentAnimation.progress,
          reveal: reducedMotion ? true : currentAnimation.reveal,
          preview: false,
        };
      drawScene(ctx, cssWidth, cssHeight, time, dice, effectiveState);
      frameRef.current = requestAnimationFrame(frame);
    };

    frameRef.current = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(frameRef.current);
  }, [canvasRef, dice, animationStateRef, preview, active]);
}

export default function DiceStage3D({ result, showDock = true }) {
  const previewCanvasRef = useRef(null);
  const cinematicCanvasRef = useRef(null);
  const lastResultIdRef = useRef(null);
  const startedAtRef = useRef(null);
  const animationFrameRef = useRef(null);
  const closeTimerRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const animationStateRef = useRef({ progress: 0, reveal: false });
  const [revealed, setRevealed] = useState(false);

  const dice = useMemo(() => extractDice(result), [result]);
  const previewDice = dice.length > 0 ? [dice[0]] : [];
  const hiddenDiceCount = Math.max(0, dice.length - MAX_CINEMATIC_DICE);
  const hasMaximum = dice.some(die => Number(die.value) === Number(die.sides));

  const previewAnimationRef = useRef({ progress: null, reveal: true });
  useCanvasAnimation(previewCanvasRef, previewDice, previewAnimationRef, true, true);
  useCanvasAnimation(cinematicCanvasRef, dice, animationStateRef, false, visible);

  useEffect(() => {
    if (!result?.id || result.noCinematic || result.id === lastResultIdRef.current) return undefined;
    lastResultIdRef.current = result.id;
    startedAtRef.current = performance.now();
    setVisible(true);
    setClosing(false);
    animationStateRef.current = { progress: 0, reveal: false };
    setRevealed(false);

    const tick = (time) => {
      const elapsed = time - startedAtRef.current;
      const progress = Math.min(1, elapsed / CINEMATIC_ROLL_MS);
      animationStateRef.current = { progress, reveal: progress >= 1 };
      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(tick);
      } else {
        setRevealed(true);
      }
    };
    animationFrameRef.current = requestAnimationFrame(tick);

    closeTimerRef.current = window.setTimeout(() => {
      setClosing(true);
      window.setTimeout(() => setVisible(false), CINEMATIC_FADE_MS);
    }, CINEMATIC_ROLL_MS + CINEMATIC_HOLD_MS);

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    };
  }, [result?.id]);

  useEffect(() => {
    if (!visible) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previousOverflow; };
  }, [visible]);

  const dismiss = () => {
    setClosing(true);
    window.setTimeout(() => setVisible(false), CINEMATIC_FADE_MS);
  };

  return (
    <>
      {showDock && (
        <aside className="dice-dock" aria-label="Dado ativo">
          <div className="dice-dock-label">DADO ATIVO</div>
          <canvas ref={previewCanvasRef} className="dice-dock-canvas" aria-label="Prévia tridimensional do dado" />
          <div className="dice-dock-meta">
            <strong>{dice[0] ? `d${dice[0].sides}` : result?.noCinematic ? 'AUTO' : 'd20'}</strong>
            <span>{result ? `${result.label} · ${result.total}` : 'Pronto para rolar'}</span>
          </div>
        </aside>
      )}

      {visible && createPortal(
        <div
          className={`dice-cinematic-overlay ${closing ? 'closing' : ''} ${revealed ? 'revealed' : 'rolling'}`}
          role="dialog"
          aria-modal="true"
          aria-label={`Rolagem ${result?.label || ''}`}
          onClick={revealed ? dismiss : undefined}
        >
          <div className="dice-cinematic-vignette" aria-hidden="true" />
          <div className="dice-cinematic-runes" aria-hidden="true">✦ ᚱ ✧ ᚨ ❖ ᛟ ✧ ᛏ ✦</div>
          <canvas ref={cinematicCanvasRef} className="dice-cinematic-canvas" />
          <div className="dice-cinematic-floor" aria-hidden="true" />
          <div className="dice-cinematic-sparks" aria-hidden="true">
            {Array.from({ length: 18 }, (_, index) => <i key={index} style={{ '--spark-index': index }} />)}
          </div>
          <div className="dice-cinematic-info">
            <span>{revealed ? result?.label : 'ROLANDO'}</span>
            {revealed && (
              <>
                <strong>{result?.total}</strong>
                {result?.inspirationUsed && <small>Inspiração +{result.inspirationBonus ?? INSPIRATION_TABLE_RULE.bonus}</small>}
                {hasMaximum && <small>✦ Valor máximo natural</small>}
                {hiddenDiceCount > 0 && <small>+ {hiddenDiceCount} dado(s) fora da cena</small>}
                <em>Clique para continuar</em>
              </>
            )}
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
