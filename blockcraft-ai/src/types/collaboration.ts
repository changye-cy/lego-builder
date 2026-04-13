export interface Presence {
  cursor3D: { x: number; y: number; z: number } | null;
  selectedBrick: string | null;
  handPosition: { x: number; y: number } | null;
  displayName: string;
  avatarColor: string;
}

export interface User {
  id: string;
  displayName: string;
  avatarUrl: string | null;
  avatarColor: string;
}