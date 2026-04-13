import { create } from "zustand";
import { BrickType, BrickColor, BrickData } from "@/types/brick";

export interface BuilderState {
  // 积木状态
  bricks: BrickData[];
  selectedBrickId: string | null;
  currentBrickType: BrickType;
  currentBrickColor: BrickColor;
  
  // 操作方法
  addBrick: (brick: BrickData) => void;
  removeBrick: (id: string) => void;
  updateBrick: (id: string, updates: Partial<BrickData>) => void;
  selectBrick: (id: string | null) => void;
  setCurrentBrickType: (type: BrickType) => void;
  setCurrentBrickColor: (color: BrickColor) => void;
}

export const useBuilderStore = create<BuilderState>((set) => ({
  // 初始状态
  bricks: [],
  selectedBrickId: null,
  currentBrickType: "1x1",
  currentBrickColor: "#E3000B",
  
  // 操作方法
  addBrick: (brick) => set((state) => ({
    bricks: [...state.bricks, brick]
  })),
  
  removeBrick: (id) => set((state) => ({
    bricks: state.bricks.filter(brick => brick.id !== id),
    selectedBrickId: state.selectedBrickId === id ? null : state.selectedBrickId
  })),
  
  updateBrick: (id, updates) => set((state) => ({
    bricks: state.bricks.map(brick => 
      brick.id === id ? { ...brick, ...updates } : brick
    )
  })),
  
  selectBrick: (id) => set({ selectedBrickId: id }),
  
  setCurrentBrickType: (type) => set({ currentBrickType: type }),
  
  setCurrentBrickColor: (color) => set({ currentBrickColor: color }),
}));