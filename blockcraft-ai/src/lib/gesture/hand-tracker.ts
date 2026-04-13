import { HandLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";
import { HandTrackingResult } from "@/types/gesture";

export class HandTracker {
  private handLandmarker: HandLandmarker | null = null;
  private videoElement: HTMLVideoElement;
  private onResults: (results: HandTrackingResult) => void;
  private isRunning: boolean = false;

  constructor(videoElement: HTMLVideoElement, onResults: (results: HandTrackingResult) => void) {
    this.videoElement = videoElement;
    this.onResults = onResults;
  }

  async initialize(): Promise<void> {
    try {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
      );

      this.handLandmarker = await HandLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/latest/hand_landmarker.task",
          delegate: "GPU"
        },
        runningMode: "VIDEO",
        numHands: 2,
        minHandDetectionConfidence: 0.5,
        minHandPresenceConfidence: 0.5,
        minTrackingConfidence: 0.5
      });
    } catch (error) {
      console.error("Failed to initialize hand tracker:", error);
    }
  }

  start(): void {
    if (!this.handLandmarker) {
      console.error("Hand tracker not initialized");
      return;
    }

    this.isRunning = true;
    this.detect();
  }

  stop(): void {
    this.isRunning = false;
  }

  private async detect(): Promise<void> {
    if (!this.isRunning || !this.handLandmarker) return;

    try {
      const results = await this.handLandmarker.detectForVideo(this.videoElement, performance.now());
      const transformedResults: HandTrackingResult = {
        hands: results.landmarks.map((landmark, index) => ({
          landmarks: landmark.map(landmark => ({
            x: landmark.x,
            y: landmark.y,
            z: landmark.z
          })),
          handedness: index === 0 ? "Right" : "Left"
        })),
        timestamp: Date.now()
      };
      this.onResults(transformedResults);
    } catch (error) {
      console.error("Error detecting hands:", error);
    }

    requestAnimationFrame(() => this.detect());
  }
}