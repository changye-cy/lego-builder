export type GestureType =
  | "PINCH"          // 捏合（拇指+食指靠近）→ 抓取积木
  | "RELEASE"        // 释放（拇指+食指分开）→ 放置积木
  | "MOVE"           // 手掌平移 → 移动积木
  | "ROTATE_CW"      // 顺时针旋转 → 旋转积木
  | "ROTATE_CCW"     // 逆时针旋转 → 旋转积木
  | "FIST"           // 握拳 → 删除积木
  | "OPEN_PALM"      // 张开手掌 → 取消选择 / 缩放视角
  | "POINT"          // 指向 → 选择积木
  | "NONE";          // 无手势

export interface GestureState {
  type: GestureType;
  confidence: number;
  handCenter: { x: number; y: number };
  pinchStrength: number;
  palmRotation: number;
  handedness: "Left" | "Right";
}

export interface HandTrackingResult {
  hands: {
    landmarks: {
      x: number;
      y: number;
      z: number;
    }[];
    handedness: "Left" | "Right";
  }[];
  timestamp: number;
}