# BlockCraft AI — 手势搭积木实时协作平台

> **项目类型**：完整 MVP（可上线产品）
> **目标用户**：创意工作者、儿童教育、团队协作场景
> **核心体验**：通过摄像头手势识别，在 3D 空间中搭建乐高风格积木，支持多人实时协作

---

## 一、项目概述

### 1.1 产品定位

BlockCraft AI 是一个基于浏览器的 3D 积木搭建平台，用户无需手柄或触控设备，仅通过摄像头捕捉的手势即可在 3D 空间中选取、移动、旋转、放置乐高风格积木，并支持多人实时协作搭建。

### 1.2 核心特性

- **手势驱动**：通过 MediaPipe 实时识别手部 21 个关键点，支持捏合抓取、移动、旋转、放置、删除等操作
- **3D 物理积木**：乐高风格积木，具备真实物理堆叠效果（重力、碰撞、摩擦）
- **实时协作**：多人可同时在一个 3D 场景中搭建积木，实时同步操作
- **作品系统**：保存、加载、分享积木作品
- **高级视觉**：深色主题 + 毛玻璃 UI + 微交互动效，对标 Linear/Vercel 级别设计

### 1.3 技术约束

- **前端计算优先**：手势识别、3D 渲染、物理模拟全部在浏览器端完成，服务器零计算负担
- **后端极薄**：仅负责用户认证、数据持久化、实时协作信令转发
- **部署成本低**：Serverless 架构，空闲时零成本

---

## 二、技术栈（锁定版本）

### 2.1 前端核心

| 包名 | 版本 | 用途 |
|------|------|------|
| `next` | `15.x` | React 全栈框架（App Router） |
| `react` | `19.x` | UI 库 |
| `three` | `^0.172.0` | 3D 渲染引擎 |
| `@react-three/fiber` | `9.x` | Three.js React 渲染器 |
| `@react-three/drei` | `10.x` | R3F 工具集（OrbitControls、Environment 等） |
| `@react-three/rapier` | `2.x` | Rapier 物理引擎（WASM，高性能） |
| `@react-three/postprocessing` | `3.x` | 后处理特效（Bloom、DOF） |
| `@mediapipe/tasks-vision` | `latest` | 手势识别（浏览器端 WASM 推理） |
| `tailwindcss` | `4.x` | 原子化 CSS |
| `gsap` | `^3.12` | 高级动画引擎 |
| `framer-motion` | `^12.x` | React 组件过渡动画 |
| `zustand` | `^5.x` | 轻量状态管理 |
| `@liveblocks/client` | `latest` | 实时协作客户端 |
| `@liveblocks/react` | `latest` | 实时协作 React 绑定 |
| `@liveblocks/node` | `latest` | 实时协作服务端 |
| `lucide-react` | `latest` | 图标库 |
| `next-themes` | `latest` | 主题切换 |

### 2.2 后端

| 技术 | 用途 |
|------|------|
| Next.js API Routes (Serverless) | REST API |
| Next.js Middleware | 用户认证 |
| Liveblocks Cloud / Self-hosted | 实时协作信令 |
| Supabase (PostgreSQL) | 用户数据 + 作品存储 |
| Supabase Storage | 作品截图/缩略图存储 |

### 2.3 开发工具

| 工具 | 用途 |
|------|------|
| TypeScript 5.x | 类型安全 |
| ESLint + Prettier | 代码规范 |
| `@types/three` | Three.js 类型定义 |

---

## 三、系统架构

```
┌─────────────────────────────────────────────────────────────┐
│                        浏览器（客户端）                        │
│                                                              │
│  ┌────────────┐   ┌──────────────┐   ┌──────────────────┐  │
│  │ 摄像头输入  │──▶│ MediaPipe    │──▶│ 手势逻辑引擎      │  │
│  │ getUserMedia│   │ Hands        │   │ (GestureEngine)  │  │
│  └────────────┘   │ Gesture      │   └────────┬─────────┘  │
│                   │ Recognizer   │            │             │
│                   │ (WASM)       │            ▼             │
│  ┌────────────┐   └──────────────┘   ┌──────────────────┐  │
│  │ UI 层      │                      │ Three.js 3D 场景  │  │
│  │ shadcn/ui  │◀────── 状态同步 ────▶│ + Rapier 物理    │  │
│  │ Tailwind 4 │   (Zustand Store)   │ + 乐高积木模型    │  │
│  │ GSAP 动效  │                      │ + 后处理特效      │  │
│  └─────┬──────┘                      └──────────────────┘  │
│        │                                                    │
└────────┼────────────────────────────────────────────────────┘
         │ REST API + WebSocket
         ▼
┌─────────────────────────────────────────────────────────────┐
│                    服务端（Serverless）                        │
│                                                              │
│  ┌──────────────┐   ┌──────────────┐   ┌────────────────┐  │
│  │ Next.js API  │──▶│ Supabase     │   │ Liveblocks     │  │
│  │ Routes       │   │ PostgreSQL   │   │ 实时协作信令    │  │
│  │ (Vercel)     │   │ + Storage    │   │ (Cloud)        │  │
│  └──────────────┘   └──────────────┘   └────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## 四、目录结构

```
blockcraft-ai/
├── public/
│   ├── fonts/                    # 自定义字体
│   ├── models/                   # 乐高积木 3D 模型 (GLTF/GLB)
│   │   ├── brick-1x1.glb
│   │   ├── brick-1x2.glb
│   │   ├── brick-1x3.glb
│   │   ├── brick-1x4.glb
│   │   ├── brick-2x2.glb
│   │   ├── brick-2x4.glb
│   │   ├── plate-1x2.glb
│   │   └── plate-2x4.glb
│   └── textures/                 # 积木纹理贴图
│       ├── lego-base-color.png
│       ├── lego-studs-normal.png
│       └── lego-studs-roughness.png
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── layout.tsx            # 根布局（字体、主题、全局 Provider）
│   │   ├── page.tsx              # 首页/Landing Page
│   │   ├── globals.css           # 全局样式（Tailwind + 自定义）
│   │   ├── (auth)/
│   │   │   ├── login/page.tsx
│   │   │   └── signup/page.tsx
│   │   ├── (dashboard)/
│   │   │   ├── layout.tsx        # 仪表盘布局（侧边栏）
│   │   │   ├── page.tsx          # 我的作品列表
│   │   │   └── [projectId]/
│   │   │       └── page.tsx      # 单个作品详情/编辑入口
│   │   ├── builder/
│   │   │   └── [roomId]/
│   │   │       ├── page.tsx      # 积木搭建主页面
│   │   │       └── Room.tsx      # Liveblocks Room Provider
│   │   └── api/
│   │       ├── auth/
│   │       │   └── [...nextauth]/route.ts
│   │       ├── projects/
│   │       │   ├── route.ts      # GET(列表) / POST(创建)
│   │       │   └── [id]/
│   │       │       └── route.ts  # GET / PUT / DELETE
│   │       └── liveblocks/
│   │           └── auth.ts       # Liveblocks 认证回调
│   ├── components/
│   │   ├── ui/                   # shadcn/ui 基础组件
│   │   │   ├── button.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── tooltip.tsx
│   │   │   ├── toast.tsx
│   │   │   ├── avatar.tsx
│   │   │   ├── skeleton.tsx
│   │   │   └── badge.tsx
│   │   ├── layout/               # 布局组件
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── Footer.tsx
│   │   ├── landing/              # 首页组件
│   │   │   ├── HeroSection.tsx
│   │   │   ├── FeatureSection.tsx
│   │   │   └── DemoPreview.tsx
│   │   ├── builder/              # 搭建页面组件
│   │   │   ├── BuilderCanvas.tsx      # 3D 画布容器
│   │   │   ├── CameraFeed.tsx        # 摄像头预览窗口
│   │   │   ├── HandOverlay.tsx       # 手部骨骼叠加显示
│   │   │   ├── BrickPalette.tsx      # 积木选择面板
│   │   │   ├── ColorPicker.tsx       # 颜色选择器
│   │   │   ├── Toolbar.tsx           # 工具栏（撤销/重做/保存）
│   │   │   ├── CollaboratorCursors.tsx # 协作者光标
│   │   │   ├── ChatPanel.tsx         # 协作聊天面板
│   │   │   └── Minimap.tsx           # 小地图/俯视图
│   │   └── three/               # Three.js 3D 组件
│   │       ├── Scene.tsx             # 主场景
│   │       ├── LegoBrick.tsx         # 单个乐高积木组件
│   │       ├── BrickGrid.tsx         # 底板网格
│   │       ├── PhysicsWorld.tsx      # 物理世界容器
│   │       ├── Lighting.tsx          # 灯光系统
│   │       ├── Environment.tsx       # 环境贴图/HDR
│   │       ├── PostEffects.tsx       # 后处理特效
│   │       └── CameraController.tsx  # 相机控制
│   ├── lib/
│   │   ├── gesture/              # 手势识别模块
│   │   │   ├── hand-tracker.ts       # MediaPipe 初始化与追踪
│   │   │   ├── gesture-engine.ts     # 手势判定逻辑引擎
│   │   │   ├── gesture-types.ts      # 手势类型定义
│   │   │   └── gesture-utils.ts      # 手势工具函数（距离计算等）
│   │   ├── three/                # Three.js 工具
│   │   │   ├── brick-loader.ts       # 积木模型加载器
│   │   │   ├── brick-geometry.ts     # 程序化积木几何体生成
│   │   │   ├── snap-system.ts        # 积木吸附系统（乐高凸起对齐）
│   │   │   └── scene-utils.ts        # 场景工具函数
│   │   ├── store/                # 状态管理
│   │   │   ├── builder-store.ts      # 搭建状态（当前积木、颜色、模式）
│   │   │   ├── project-store.ts      # 项目数据状态
│   │   │   └── ui-store.ts           # UI 状态（面板开关等）
│   │   ├── liveblocks/           # 实时协作
│   │   │   ├── client.ts             # Liveblocks 客户端配置
│   │   │   ├── presence.ts           # 用户在线状态定义
│   │   │   └── storage.ts            # 协作存储结构定义
│   │   └── supabase/             # 数据库
│   │       ├── client.ts             # Supabase 客户端
│   │       ├── types.ts              # 数据库类型定义
│   │       └── queries.ts            # 数据库查询函数
│   ├── hooks/                    # 自定义 Hooks
│   │   ├── useHandTracking.ts        # 手势追踪 Hook
│   │   ├── useGestureControls.ts     # 手势控制映射 Hook
│   │   ├── useBrickInteraction.ts    # 积木交互 Hook
│   │   ├── useCollaboration.ts       # 协作状态 Hook
│   │   ├── useProject.ts             # 项目 CRUD Hook
│   │   └── useMediaStream.ts         # 摄像头流管理 Hook
│   ├── styles/                   # 样式
│   │   ├── theme.ts                 # 设计令牌（颜色、间距、字体）
│   │   └── animations.ts            # 动画关键帧定义
│   └── types/                    # 全局类型
│       ├── brick.ts                  # 积木类型定义
│       ├── gesture.ts                # 手势类型定义
│       ├── project.ts                # 项目类型定义
│       └── collaboration.ts          # 协作类型定义
├── .env.local                     # 环境变量
├── next.config.ts                 # Next.js 配置
├── tailwind.config.ts             # Tailwind 配置
├── tsconfig.json                  # TypeScript 配置
├── liveblocks.config.ts           # Liveblocks 配置
├── package.json
└── README.md
```

---

## 五、数据模型

### 5.1 Supabase 数据库表

```sql
-- 用户表（使用 Supabase Auth，此表为扩展 profile）
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  display_name TEXT NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 项目表
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL REFERENCES profiles(id),
  name TEXT NOT NULL,
  description TEXT,
  thumbnail_url TEXT,
  brick_data JSONB NOT NULL DEFAULT '[]',  -- 积木序列化数据
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 协作房间表
CREATE TABLE rooms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id),
  created_by UUID REFERENCES profiles(id),
  max_collaborators INT DEFAULT 4,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 5.2 Liveblocks Storage 结构

```typescript
// liveblocks.config.ts 中定义
interface LiveblocksStorage {
  // 场景中所有积木的实时状态
  bricks: LiveObject<{
    [brickId: string]: LiveObject<{
      type: BrickType;           // "1x1" | "1x2" | "2x2" | "2x4" 等
      color: string;             // "#E3000B" 等十六进制颜色
      position: LiveObject<{ x: number; y: number; z: number }>;
      rotation: LiveObject<{ x: number; y: number; z: number }>;
      placedBy: string;          // 用户 ID
      placedAt: number;          // 时间戳
    }>;
  }>;
}

// 用户在线状态（Presence）
interface Presence {
  cursor3D: { x: number; y: number; z: number } | null;
  selectedBrick: string | null;  // 当前选中的积木 ID
  handPosition: { x: number; y: number } | null;  // 手势在屏幕上的位置
  displayName: string;
  avatarColor: string;
}
```

### 5.3 积木类型定义

```typescript
// types/brick.ts
export type BrickType = "1x1" | "1x2" | "1x3" | "1x4" | "2x2" | "2x4" | "plate-1x2" | "plate-2x4";

export interface BrickData {
  id: string;
  type: BrickType;
  color: BrickColor;
  position: [number, number, number];  // x, y, z 世界坐标
  rotation: [number, number, number];  // 欧拉角（度）
  isPlaced: boolean;                   // 是否已放置（物理激活）
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
  width: number;   // 凸起列数
  depth: number;   // 凸起行数
  height: number;  // 层高（普通砖=1, 薄板=0.33）
  studCount: number;
}
```

---

## 六、核心模块详细设计

### 6.1 手势识别引擎

#### 6.1.1 MediaPipe 初始化

```typescript
// lib/gesture/hand-tracker.ts
// 核心逻辑伪代码（AI 实现时需完整编写）：

import { HandLandmarker, FilesetResolver, GestureRecognizer } from "@mediapipe/tasks-vision";

export class HandTracker {
  private handLandmarker: HandLandmarker;
  private gestureRecognizer: GestureRecognizer;
  private videoElement: HTMLVideoElement;
  private onResults: (results: HandTrackingResult) => void;
  private isRunning: boolean = false;

  constructor(videoElement: HTMLVideoElement, onResults: (results: HandTrackingResult) => void) {
    this.videoElement = videoElement;
    this.onResults = onResults;
  }

  async initialize(): Promise<void> {
    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
    );

    this.handLandmarker = await HandLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath: "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/latest/hand_landmarker.task",
        delegate: "GPU"  // 优先使用 GPU 加速
      },
      runningMode: "VIDEO",
      numHands: 2,       // 支持双手
      minHandDetectionConfidence: 0.5,
      minHandPresenceConfidence: 0.5,
      minTrackingConfidence: 0.5
    });
  }

  start(): void {
    this.isRunning = true;
    this.detect();
  }

  private async detect(): Promise<void> {
    if (!this.isRunning) return;
    const results = await this.handLandmarker.detectForVideo(this.videoElement, performance.now());
    this.onResults(this.transformResults(results));
    requestAnimationFrame(() => this.detect());
  }
}
```

#### 6.1.2 手势判定逻辑

```typescript
// lib/gesture/gesture-engine.ts

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
  handCenter: { x: number; y: number };  // 归一化坐标 [0,1]
  pinchStrength: number;                   // 捏合力度 [0,1]
  palmRotation: number;                    // 手掌旋转角度
  handedness: "Left" | "Right";
}

// 手势判定核心算法（伪代码）：
export function classifyGesture(landmarks: NormalizedLandmark[]): GestureState {
  const thumbTip = landmarks[4];
  const indexTip = landmarks[8];
  const middleTip = landmarks[12];
  const ringTip = landmarks[16];
  const pinkyTip = landmarks[20];
  const wrist = landmarks[0];

  // 1. 计算捏合距离
  const pinchDistance = distance(thumbTip, indexTip);
  const pinchStrength = 1 - Math.min(pinchDistance / PINCH_THRESHOLD, 1);

  // 2. 判定手指伸展状态
  const fingers = {
    index: isFingerExtended(landmarks, "index"),
    middle: isFingerExtended(landmarks, "middle"),
    ring: isFingerExtended(landmarks, "ring"),
    pinky: isFingerExtended(landmarks, "pinky"),
  };

  // 3. 手势分类决策树
  if (pinchStrength > 0.8) return { type: "PINCH", ... };
  if (pinchStrength < 0.2 && !fingers.middle && !fingers.ring && !fingers.pinky) {
    return { type: "POINT", ... };
  }
  if (!fingers.index && !fingers.middle && !fingers.ring && !fingers.pinky) {
    return { type: "FIST", ... };
  }
  if (fingers.index && fingers.middle && fingers.ring && fingers.pinky) {
    return { type: "OPEN_PALM", ... };
  }
  // ... 更多判定逻辑
}
```

#### 6.1.3 手势到操作的映射

```typescript
// hooks/useGestureControls.ts

// 手势状态机：管理手势之间的平滑过渡
interface GestureStateMachine {
  currentState: "IDLE" | "SELECTING" | "GRABBING" | "MOVING" | "ROTATING" | "DELETING";
  transition(gesture: GestureType): void;
}

// 状态转换规则：
// IDLE + POINT → SELECTING（选中积木）
// SELECTING + PINCH → GRABBING（抓取积木）
// GRABBING + MOVE → MOVING（移动积木）
// GRABBING + ROTATE → ROTATING（旋转积木）
// GRABBING + RELEASE → IDLE（放置积木，激活物理）
// ANY + FIST → DELETING → IDLE（删除选中积木）
```

### 6.2 3D 积木系统

#### 6.2.1 程序化乐高积木生成

```typescript
// lib/three/brick-geometry.ts
// 核心思路：不依赖外部 3D 模型文件，通过代码程序化生成乐高积木几何体

import * as THREE from "three";

const STUD_RADIUS = 0.24;      // 凸起半径
const STUD_HEIGHT = 0.18;      // 凸起高度
const UNIT_SIZE = 0.8;         // 一个凸起单位的尺寸
const BRICK_HEIGHT = 0.96;     // 普通砖高度
const PLATE_HEIGHT = 0.32;     // 薄板高度

/**
 * 生成乐高积木几何体
 * @param width  凸起列数 (1-4)
 * @param depth  凸起行数 (1-4)
 * @param height 砖高度类型 ("brick" | "plate")
 */
export function createLegoBrickGeometry(
  width: number,
  depth: number,
  height: "brick" | "plate" = "brick"
): THREE.BufferGeometry {
  const h = height === "brick" ? BRICK_HEIGHT : PLATE_HEIGHT;
  const totalWidth = width * UNIT_SIZE;
  const totalDepth = depth * UNIT_SIZE;

  // 1. 主体：带圆角的方盒
  const bodyGeometry = new THREE.BoxGeometry(totalWidth, h, totalDepth);
  // 使用 EdgesGeometry 添加边缘倒角效果（或使用 RoundedBoxGeometry）

  // 2. 凸起（Studs）：每个凸起位置生成圆柱体
  const studGeometry = new THREE.CylinderGeometry(STUD_RADIUS, STUD_RADIUS, STUD_HEIGHT, 16);
  const studPositions: THREE.Vector3[] = [];
  for (let col = 0; col < width; col++) {
    for (let row = 0; row < depth; row++) {
      const x = (col - (width - 1) / 2) * UNIT_SIZE;
      const z = (row - (depth - 1) / 2) * UNIT_SIZE;
      studPositions.push(new THREE.Vector3(x, h / 2 + STUD_HEIGHT / 2, z));
    }
  }

  // 3. 合并几何体（使用 mergeBufferGeometries 或 InstancedMesh）
  // 推荐使用 InstancedMesh 以获得更好的渲染性能

  // 4. 底部凹槽（可选，增加真实感）

  return mergedGeometry;
}
```

#### 6.2.2 积木吸附系统

```typescript
// lib/three/snap-system.ts
// 核心思路：积木放置时自动吸附到网格对齐位置

const SNAP_GRID = UNIT_SIZE;  // 吸附网格大小

/**
 * 计算积木的最佳吸附位置
 * @param position  积木当前世界坐标
 * @param brickType 积木类型（决定宽度和深度）
 * @param existingBricks  场景中已放置的积木列表
 * @returns 吸附后的精确位置
 */
export function calculateSnapPosition(
  position: THREE.Vector3,
  brickType: BrickType,
  existingBricks: BrickData[]
): THREE.Vector3 {
  const template = BRICK_TEMPLATES[brickType];

  // 1. 垂直吸附：检测下方是否有积木或底板
  //    - 射线检测从当前位置向下
  //    - 如果命中积木顶部，吸附到其上方
  //    - 如果没有命中，吸附到底板 (y=0)

  // 2. 水平吸附：对齐到网格
  //    - 将 x, z 坐标对齐到 UNIT_SIZE 的整数倍

  // 3. 凸起对齐：确保凸起能嵌入下方积木的凸起间隙

  return snappedPosition;
}
```

#### 6.2.3 React Three Fiber 积木组件

```tsx
// components/three/LegoBrick.tsx

import { useRef, useMemo } from "react";
import { RigidBody, CuboidCollider } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { createLegoBrickGeometry } from "@/lib/three/brick-geometry";

interface LegoBrickProps {
  id: string;
  type: BrickType;
  color: BrickColor;
  position: [number, number, number];
  rotation: [number, number, number];
  isPlaced: boolean;
  isGhost?: boolean;       // 预览/幽灵模式（半透明）
  isGrabbed?: boolean;     // 是否被当前用户抓取
  isSelected?: boolean;    // 是否被选中
  onGrab?: () => void;
  onPlace?: () => void;
}

export function LegoBrick({
  id, type, color, position, rotation,
  isPlaced, isGhost, isGrabbed, isSelected,
  onGrab, onPlace
}: LegoBrickProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  // 根据积木类型生成几何体（使用 useMemo 缓存）
  const geometry = useMemo(() => {
    const template = BRICK_TEMPLATES[type];
    return createLegoBrickGeometry(template.width, template.depth, template.height);
  }, [type]);

  // 材质：乐高塑料质感
  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: color,
      roughness: 0.3,        // 塑料光泽
      metalness: 0.0,
      transparent: isGhost || isGrabbed,
      opacity: isGhost ? 0.5 : isGrabbed ? 0.7 : 1.0,
      envMapIntensity: 0.8,
    });
  }, [color, isGhost, isGrabbed]);

  return (
    <RigidBody
      type={isPlaced ? "dynamic" : "kinematicPosition"}
      position={position}
      rotation={rotation}
      enabledRotations={isPlaced}  // 放置后允许物理旋转
      linearDamping={0.8}
      angularDamping={0.8}
      colliders={false}
    >
      <CuboidCollider args={[...]} />
      <mesh
        ref={meshRef}
        geometry={geometry}
        material={material}
        castShadow
        receiveShadow
      />
      {/* 选中时的高亮边框 */}
      {isSelected && (
        <mesh scale={[1.02, 1.02, 1.02]}>
          <boxGeometry args={[...]} />
          <meshBasicMaterial color="#00ff88" wireframe transparent opacity={0.5} />
        </mesh>
      )}
    </RigidBody>
  );
}
```

### 6.3 实时协作系统

#### 6.3.1 Liveblocks 配置

```typescript
// lib/liveblocks/client.ts
import { createClient } from "@liveblocks/client";

export const liveblocksClient = createClient({
  authEndpoint: "/api/liveblocks/auth",
  throttle: 16,  // ~60fps 同步频率
});
```

```typescript
// lib/liveblocks/storage.ts
import { LiveList, LiveObject, LiveMap } from "@liveblocks/client";

// 初始化协作房间存储
export const initialStorage = (): LsonObject => ({
  bricks: new LiveMap<string, LiveObject<{
    type: BrickType;
    color: string;
    position: LiveObject<{ x: number; y: number; z: number }>;
    rotation: LiveObject<{ x: number; y: number; z: number }>;
    placedBy: string;
    placedAt: number;
  }>>(),
  metadata: new LiveObject({
    name: "Untitled Project",
    createdAt: Date.now(),
  }),
});
```

#### 6.3.2 协作 Hook

```typescript
// hooks/useCollaboration.ts
import { useRoom, useOthers, useSelf, useMutation } from "@liveblocks/react";

export function useCollaboration() {
  const room = useRoom();
  const others = useOthers();
  const self = useSelf();

  // 添加积木（广播给所有协作者）
  const addBrick = useMutation(({ storage }, brickData: BrickData) => {
    const bricks = storage.root.get("bricks");
    bricks.set(brickData.id, new LiveObject({
      type: brickData.type,
      color: brickData.color,
      position: new LiveObject({
        x: brickData.position[0],
        y: brickData.position[1],
        z: brickData.position[2],
      }),
      rotation: new LiveObject({
        x: brickData.rotation[0],
        y: brickData.rotation[1],
        z: brickData.rotation[2],
      }),
      placedBy: self.id,
      placedAt: Date.now(),
    }));
  }, []);

  // 更新积木位置（实时同步）
  const updateBrickPosition = useMutation(({ storage }, brickId: string, position: [number, number, number]) => {
    const bricks = storage.root.get("bricks");
    const brick = bricks.get(brickId);
    if (brick) {
      brick.get("position").set({ x: position[0], y: position[1], z: position[2] });
    }
  }, []);

  // 更新在线状态（3D 光标位置）
  room.updatePresence({
    cursor3D: currentCursor3D,
    selectedBrick: currentBrickId,
  });

  return { others, self, addBrick, updateBrickPosition, ... };
}
```

### 6.4 UI 设计系统

#### 6.4.1 设计令牌

```typescript
// styles/theme.ts
export const theme = {
  colors: {
    // 深色主题（主）
    background: {
      primary: "#09090B",      // 近乎纯黑
      secondary: "#18181B",    // 深灰
      tertiary: "#27272A",     // 中灰
      elevated: "#3F3F46",     // 浮层背景
    },
    accent: {
      primary: "#6366F1",      // 靛蓝（主强调色）
      secondary: "#8B5CF6",    // 紫色（次强调色）
      success: "#10B981",      // 翠绿
      warning: "#F59E0B",      // 琥珀
      danger: "#EF4444",       // 红色
    },
    text: {
      primary: "#FAFAFA",
      secondary: "#A1A1AA",
      muted: "#71717A",
    },
    border: {
      subtle: "rgba(255,255,255,0.06)",
      default: "rgba(255,255,255,0.1)",
      strong: "rgba(255,255,255,0.2)",
    },
    glass: {
      background: "rgba(24,24,27,0.7)",
      border: "rgba(255,255,255,0.08)",
      blur: "20px",
    },
  },
  spacing: {
    xs: "4px", sm: "8px", md: "16px", lg: "24px", xl: "32px", "2xl": "48px",
  },
  borderRadius: {
    sm: "6px", md: "10px", lg: "16px", xl: "24px", full: "9999px",
  },
  typography: {
    fontFamily: {
      sans: "'Inter', system-ui, -apple-system, sans-serif",
      mono: "'JetBrains Mono', monospace",
    },
    fontSize: {
      xs: "0.75rem", sm: "0.875rem", base: "1rem",
      lg: "1.125rem", xl: "1.25rem", "2xl": "1.5rem",
      "3xl": "1.875rem", "4xl": "2.25rem",
    },
  },
  animation: {
    duration: {
      fast: "150ms",
      normal: "300ms",
      slow: "500ms",
    },
    easing: {
      default: "cubic-bezier(0.4, 0, 0.2, 1)",
      bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
    },
  },
};
```

#### 6.4.2 毛玻璃组件样式

```css
/* globals.css 中的毛玻璃基础类 */
.glass-panel {
  background: rgba(24, 24, 27, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.3),
    0 2px 4px -2px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

.glass-button {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.glass-button:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}
```

#### 6.4.3 搭建页面 UI 布局

```
┌──────────────────────────────────────────────────────────────┐
│  Header: [Logo] [BlockCraft AI]          [用户头像] [设置]    │
├──────┬───────────────────────────────────────────┬───────────┤
│      │                                           │           │
│ 积木 │                                           │ 协作者    │
│ 选择 │                                           │ 列表      │
│ 面板 │         3D 积木搭建画布                     │           │
│      │         (Three.js Canvas)                  │ ──────── │
│ ──── │                                           │           │
│ 颜色 │                                           │ 聊天      │
│ 选择 │                                           │ 面板      │
│      │                                           │           │
│ ──── │                                           │           │
│ 工具 │                                           │           │
│ 栏   │  ┌─────────────────┐                      │           │
│      │  │ 摄像头预览窗口   │                      │           │
│      │  │ (手势识别可视化)  │                      │           │
│      │  └─────────────────┘                      │           │
├──────┴───────────────────────────────────────────┴───────────┤
│  Footer: [手势指南] [撤销] [重做] [保存] [分享] [全屏]        │
└──────────────────────────────────────────────────────────────┘
```

---

## 七、页面路由与功能清单

### 7.1 路由表

| 路由 | 页面 | 核心功能 |
|------|------|----------|
| `/` | 首页 | 产品介绍、动效展示、CTA 按钮 |
| `/login` | 登录 | 邮箱/密码 + OAuth（GitHub/Google） |
| `/signup` | 注册 | 邮箱/密码注册 |
| `/dashboard` | 仪表盘 | 我的作品列表、创建新项目、搜索 |
| `/dashboard/[projectId]` | 作品详情 | 作品预览、编辑、删除、分享 |
| `/builder/[roomId]` | 搭建页面 | **核心页面**：3D 画布 + 手势控制 + 协作 |

### 7.2 首页设计要求

- **Hero Section**：全屏 3D 动画背景（缓慢旋转的乐高积木组合），标题使用大号 Inter 字体，渐变色文字
- **Feature Section**：3-4 个功能卡片，毛玻璃效果，hover 时微动画
- **Demo Preview**：嵌入一个可交互的 3D 积木小 demo（鼠标控制）
- **CTA**：醒目的"开始搭建"按钮，带发光效果

### 7.3 搭建页面（核心）功能清单

```
必须实现（P0）：
├── [x] 3D 场景：底板 + 灯光 + 环境贴图
├── [x] 积木渲染：至少 6 种乐高积木类型
├── [x] 积木颜色：10 种经典乐高颜色
├── [x] 手势识别：捏合抓取、移动、释放放置
├── [x] 积木吸附：自动对齐到网格
├── [x] 物理模拟：重力 + 碰撞
├── [x] 摄像头预览：小窗口显示手势识别结果
├── [x] 实时协作：多人同时搭建，光标同步
├── [x] 作品保存：序列化积木数据到数据库
└── [x] 作品加载：从数据库恢复积木场景

应该实现（P1）：
├── [ ] 手势旋转积木
├── [ ] 撤销/重做
├── [ ] 删除积木（握拳手势）
├── [ ] 协作聊天
├── [ ] 作品截图/缩略图生成
├── [ ] 视角切换（自由/俯视/正面）
└── [ ] 手势教程/引导

可以延后（P2）：
├── [ ] 键盘鼠标作为备选输入
├── [ ] 积木分组/复制
├── [ ] 作品分享链接
├── [ ] 积木数量统计
└── [ ] 移动端适配
```

---

## 八、API 接口设计

### 8.1 REST API

```typescript
// === 认证 ===
POST   /api/auth/signup          // 注册
POST   /api/auth/login           // 登录
POST   /api/auth/logout          // 登出
GET    /api/auth/session         // 获取当前会话

// === 项目 ===
GET    /api/projects             // 获取我的项目列表
POST   /api/projects             // 创建新项目
GET    /api/projects/:id         // 获取项目详情
PUT    /api/projects/:id         // 更新项目（名称、描述、积木数据）
DELETE /api/projects/:id         // 删除项目
POST   /api/projects/:id/thumbnail  // 上传项目缩略图

// === 协作房间 ===
POST   /api/rooms                // 创建协作房间
GET    /api/rooms/:id            // 获取房间信息
POST   /api/rooms/:id/join       // 加入房间

// === Liveblocks ===
POST   /api/liveblocks/auth      // Liveblocks 认证（返回 token）
```

### 8.2 请求/响应示例

```typescript
// POST /api/projects
// Request:
{
  "name": "我的小房子",
  "description": "一个乐高小房子"
}
// Response:
{
  "id": "uuid-xxx",
  "name": "我的小房子",
  "description": "一个乐高小房子",
  "thumbnailUrl": null,
  "brickData": [],
  "isPublic": false,
  "createdAt": "2025-01-01T00:00:00Z",
  "updatedAt": "2025-01-01T00:00:00Z"
}

// PUT /api/projects/:id
// Request:
{
  "name": "我的小房子 v2",
  "brickData": [
    {
      "id": "brick-001",
      "type": "2x4",
      "color": "#E3000B",
      "position": [0, 0.48, 0],
      "rotation": [0, 0, 0],
      "isPlaced": true
    }
  ]
}
```

---

## 九、性能优化策略

### 9.1 前端性能

| 策略 | 实现方式 |
|------|----------|
| 积木几何体复用 | 使用 `InstancedMesh` 或 `useMemo` 缓存几何体，同类型积木共享一份几何体 |
| 按需渲染 | 仅当场景变化时重新渲染（R3F 自带） |
| LOD（细节层次） | 远处积木降低几何体精度 |
| 视锥体剔除 | Three.js 自动剔除视口外物体 |
| 手势识别节流 | MediaPipe 检测频率限制在 30fps |
| WASM 加速 | MediaPipe 使用 GPU delegate + WASM |
| 代码分割 | Next.js 自动路由级别代码分割 |
| 图片优化 | `next/image` 自动 WebP + 懒加载 |

### 9.2 后端性能

| 策略 | 实现方式 |
|------|----------|
| Serverless | Vercel Functions 按请求计费，空闲零成本 |
| Edge Runtime | API 路由使用 Edge Runtime（冷启动 < 50ms） |
| 连接池 | Supabase 内置连接池管理 |
| 实时信令 | Liveblocks Cloud 托管，无需自建 WebSocket 服务器 |
| 数据压缩 | 积木数据使用 JSONB 存储，减少数据库体积 |

---

## 十、开发阶段规划

### Phase 1：基础框架（第 1-2 天）

```
□ 初始化 Next.js 15 项目（TypeScript + Tailwind 4）
□ 安装所有依赖包
□ 配置 shadcn/ui
□ 实现设计令牌和全局样式
□ 搭建路由结构（首页、登录、仪表盘、搭建页）
□ 实现首页 UI（Hero + Features + CTA）
□ 实现登录/注册页面 UI
```

### Phase 2：3D 积木系统（第 3-5 天）

```
□ 实现程序化乐高积木几何体生成（6 种类型）
□ 实现 LegoBrick React 组件
□ 搭建 3D 场景（灯光、环境、底板网格）
□ 集成 @react-three/rapier 物理引擎
□ 实现积木吸附系统
□ 实现积木选择面板 UI
□ 实现颜色选择器
□ 添加后处理特效（Bloom、阴影）
□ 实现鼠标/键盘作为临时输入方式（调试用）
```

### Phase 3：手势识别（第 6-8 天）

```
□ 集成 MediaPipe Hand Landmarker
□ 实现摄像头预览组件
□ 实现手部骨骼叠加显示
□ 实现手势分类引擎（捏合、释放、移动、旋转、握拳）
□ 实现手势状态机
□ 实现手势到 3D 操作的映射
□ 手势灵敏度调优和防抖
□ 实现手势教程/引导 UI
```

### Phase 4：后端与数据持久化（第 9-10 天）

```
□ 配置 Supabase 项目
□ 实现数据库表和类型定义
□ 实现用户认证（Supabase Auth）
□ 实现 API 路由（项目 CRUD）
□ 实现作品保存/加载功能
□ 实现作品缩略图生成（Three.js 截图 → 上传 Supabase Storage）
□ 实现仪表盘页面（作品列表、创建、删除）
```

### Phase 5：实时协作（第 11-13 天）

```
□ 配置 Liveblocks
□ 实现协作房间创建和加入
□ 实现积木操作的实时同步（添加、移动、旋转、删除）
□ 实现协作者 3D 光标显示
□ 实现在线用户列表
□ 实现协作聊天面板
□ 协作冲突处理和优化
```

### Phase 6：打磨与优化（第 14-15 天）

```
□ 全局动效打磨（页面过渡、微交互）
□ 响应式适配（主要针对桌面端，平板端基本可用）
□ 性能优化（InstancedMesh、LOD、节流）
□ 错误处理和边界情况
□ 加载状态和骨架屏
□ 最终测试和 Bug 修复
```

---

## 十一、环境变量

```bash
# .env.local

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Liveblocks
NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY=your-liveblocks-public-key
LIVEBLOCKS_SECRET_KEY=your-liveblocks-secret-key

# NextAuth（如果使用）
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret

# OAuth Providers（可选）
GITHUB_ID=your-github-client-id
GITHUB_SECRET=your-github-client-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

---

## 十二、初始化命令

```bash
# 1. 创建 Next.js 项目
npx create-next-app@latest blockcraft-ai --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"

# 2. 进入项目目录
cd blockcraft-ai

# 3. 安装核心依赖
npm install three @react-three/fiber@9 @react-three/drei@10 @react-three/rapier@2 @react-three/postprocessing@3

# 4. 安装手势识别
npm install @mediapipe/tasks-vision

# 5. 安装实时协作
npm install @liveblocks/client @liveblocks/react @liveblocks/node

# 6. 安装 UI 和工具
npm install zustand gsap framer-motion lucide-react next-themes

# 7. 安装 Supabase
npm install @supabase/supabase-js @supabase/ssr

# 8. 安装 shadcn/ui
npx shadcn@latest init

# 9. 安装 shadcn 组件
npx shadcn@latest add button dialog dropdown-menu tooltip toast avatar skeleton badge

# 10. 安装类型定义
npm install -D @types/three
```

---

## 十三、关键实现注意事项

### 13.1 MediaPipe 注意事项

- 使用 `GPU` delegate 优先，回退到 `WASM`
- 手势识别在 Web Worker 中运行，避免阻塞主线程
- 摄像头分辨率限制在 `640x480`，平衡精度和性能
- 手势判定需要加入**时间平滑**（连续 N 帧确认同一手势才触发操作），避免误触

### 13.2 Three.js / R3F 注意事项

- 使用 `@react-three/fiber` 的 `Canvas` 组件包裹 3D 场景
- 物理世界使用 `<Physics>` 组件，设置 `gravity={[0, -20, 0]}`（比真实重力稍大，手感更好）
- 积木被抓取时设为 `kinematicPosition` 类型（不受物理影响），放置后切换为 `dynamic`
- 使用 `InstancedMesh` 优化同类型同颜色积木的渲染性能
- 环境贴图使用 `@react-three/drei` 的 `<Environment preset="city" />`

### 13.3 实时协作注意事项

- 积木位置更新使用 `throttle`（16ms ≈ 60fps），避免过度广播
- 使用 Liveblocks 的 `Undo/Redo` 功能内置支持
- 断线重连后自动同步最新状态
- 每个房间限制最多 4 名协作者（性能考虑）

### 13.4 UI/UX 注意事项

- 所有面板默认可折叠，最大化 3D 画布空间
- 手势操作时在 3D 场景中显示视觉反馈（抓取时积木半透明、放置时有粒子效果）
- 摄像头预览窗口可拖拽、可缩放、可最小化
- 首次进入搭建页面时显示手势教程弹窗
- 所有交互元素有 hover/focus/active 状态反馈

---

## 十四、验收标准

### 功能验收

- [ ] 用户可以注册、登录、登出
- [ ] 用户可以创建新项目并进入搭建页面
- [ ] 3D 场景正确渲染底板和灯光
- [ ] 可以从面板选择 6 种以上积木类型
- [ ] 可以选择 10 种积木颜色
- [ ] 摄像头正确启动并显示预览
- [ ] 手势识别可以正确检测捏合、释放、移动手势
- [ ] 可以通过手势抓取、移动、放置积木
- [ ] 积木放置后自动吸附到网格
- [ ] 积木放置后受物理引擎影响（重力、碰撞）
- [ ] 可以保存作品并从仪表盘加载
- [ ] 多人可以同时进入同一房间协作搭建
- [ ] 协作时可以看到其他用户的光标和操作

### 视觉验收

- [ ] 深色主题一致，无样式断裂
- [ ] 毛玻璃面板效果正确
- [ ] 页面加载有过渡动画
- [ ] 按钮和交互元素有 hover/active 反馈
- [ ] 3D 场景有阴影和后处理特效
- [ ] 积木有塑料质感材质
- [ ] 手势操作有实时视觉反馈
- [ ] 整体视觉达到 Linear/Vercel 级别的高级感

### 性能验收

- [ ] 首页加载时间 < 3s（LCP）
- [ ] 搭建页面 3D 场景 FPS > 30（场景中有 50 个积木时）
- [ ] 手势识别延迟 < 100ms
- [ ] 协作同步延迟 < 50ms
- [ ] 服务端 CPU 使用率 < 5%（Serverless 空闲时为 0%）
