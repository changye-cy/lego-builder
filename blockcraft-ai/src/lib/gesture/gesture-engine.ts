import { GestureState, GestureType } from "@/types/gesture";

const PINCH_THRESHOLD = 0.15;

interface NormalizedLandmark {
  x: number;
  y: number;
  z: number;
}

export function classifyGesture(landmarks: NormalizedLandmark[]): GestureState {
  if (landmarks.length < 21) {
    return {
      type: "NONE",
      confidence: 0,
      handCenter: { x: 0, y: 0 },
      pinchStrength: 0,
      palmRotation: 0,
      handedness: "Right"
    };
  }

  const thumbTip = landmarks[4];
  const indexTip = landmarks[8];
  const middleTip = landmarks[12];
  const ringTip = landmarks[16];
  const pinkyTip = landmarks[20];
  const wrist = landmarks[0];

  const pinchDistance = distance(thumbTip, indexTip);
  const pinchStrength = 1 - Math.min(pinchDistance / PINCH_THRESHOLD, 1);

  const fingers = {
    index: isFingerExtended(landmarks, "index"),
    middle: isFingerExtended(landmarks, "middle"),
    ring: isFingerExtended(landmarks, "ring"),
    pinky: isFingerExtended(landmarks, "pinky"),
  };

  const handCenter = {
    x: (thumbTip.x + indexTip.x + middleTip.x + ringTip.x + pinkyTip.x) / 5,
    y: (thumbTip.y + indexTip.y + middleTip.y + ringTip.y + pinkyTip.y) / 5
  };

  let gestureType: GestureType = "NONE";
  let confidence = 0;

  if (pinchStrength > 0.8) {
    gestureType = "PINCH";
    confidence = pinchStrength;
  } else if (pinchStrength < 0.2 && !fingers.middle && !fingers.ring && !fingers.pinky) {
    gestureType = "POINT";
    confidence = 0.9;
  } else if (!fingers.index && !fingers.middle && !fingers.ring && !fingers.pinky) {
    gestureType = "FIST";
    confidence = 0.9;
  } else if (fingers.index && fingers.middle && fingers.ring && fingers.pinky) {
    gestureType = "OPEN_PALM";
    confidence = 0.9;
  }

  return {
    type: gestureType,
    confidence,
    handCenter,
    pinchStrength,
    palmRotation: 0,
    handedness: "Right"
  };
}

function distance(a: NormalizedLandmark, b: NormalizedLandmark): number {
  return Math.sqrt(
    Math.pow(a.x - b.x, 2) +
    Math.pow(a.y - b.y, 2) +
    Math.pow(a.z - b.z, 2)
  );
}

function isFingerExtended(landmarks: NormalizedLandmark[], finger: "index" | "middle" | "ring" | "pinky"): boolean {
  const tips = {
    index: 8,
    middle: 12,
    ring: 16,
    pinky: 20
  };
  const mcp = {
    index: 5,
    middle: 9,
    ring: 13,
    pinky: 17
  };
  const pip = {
    index: 6,
    middle: 10,
    ring: 14,
    pinky: 18
  };
  const dip = {
    index: 7,
    middle: 11,
    ring: 15,
    pinky: 19
  };

  const tip = landmarks[tips[finger]];
  const mcpJoint = landmarks[mcp[finger]];
  const pipJoint = landmarks[pip[finger]];
  const dipJoint = landmarks[dip[finger]];

  return tip.y < dipJoint.y && dipJoint.y < pipJoint.y && pipJoint.y < mcpJoint.y;
}