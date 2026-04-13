export type BrickType = "1x1" | "1x2" | "1x3" | "1x4" | "2x2" | "2x4" | "plate-1x2" | "plate-2x4";

export interface BrickData {
  id: string;
  type: BrickType;
  color: BrickColor;
  position: [number, number, number];
  rotation: [number, number, number];
  isPlaced: boolean;
  placedBy?: string;
}

export type BrickColor =
  | "#E3000B"  // 红
  | "#0057A8"  // 蓝
  | "#00852B"  // 绿
  | "#FFD700"  // 黄
  | "#FF6600"  // 橙
  | "#FFFFFF"  // 白
  | "#1B2A34"  // 黑
  | "#A5499B"  // 紫
  | "#00BCD4"  // 青
  | "#795548"; // 棕

export interface BrickTemplate {
  type: BrickType;
  width: number;
  depth: number;
  height: "brick" | "plate";
  studCount: number;
}

export const BRICK_TEMPLATES: Record<BrickType, BrickTemplate> = {
  "1x1": { type: "1x1", width: 1, depth: 1, height: "brick", studCount: 1 },
  "1x2": { type: "1x2", width: 1, depth: 2, height: "brick", studCount: 2 },
  "1x3": { type: "1x3", width: 1, depth: 3, height: "brick", studCount: 3 },
  "1x4": { type: "1x4", width: 1, depth: 4, height: "brick", studCount: 4 },
  "2x2": { type: "2x2", width: 2, depth: 2, height: "brick", studCount: 4 },
  "2x4": { type: "2x4", width: 2, depth: 4, height: "brick", studCount: 8 },
  "plate-1x2": { type: "plate-1x2", width: 1, depth: 2, height: "plate", studCount: 2 },
  "plate-2x4": { type: "plate-2x4", width: 2, depth: 4, height: "plate", studCount: 8 },
};