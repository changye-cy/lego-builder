export interface Project {
  id: string;
  ownerId: string;
  name: string;
  description: string;
  thumbnailUrl: string | null;
  brickData: BrickData[];
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Room {
  id: string;
  projectId: string;
  createdBy: string;
  maxCollaborators: number;
  createdAt: string;
}

// 从 brick.ts 导入 BrickData 类型
export type BrickData = {
  id: string;
  type: string;
  color: string;
  position: [number, number, number];
  rotation: [number, number, number];
  isPlaced: boolean;
  placedBy?: string;
};