'use client';
import React, { useRef, useEffect, useState } from 'react';
import { HandTracker } from '@/lib/gesture/hand-tracker';
import { HandTrackingResult } from '@/types/gesture';

export function CameraFeed() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let handTracker: HandTracker | null = null;

    const initializeCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setIsCameraActive(true);
          
          // 初始化手部追踪
          handTracker = new HandTracker(videoRef.current, handleHandTrackingResults);
          await handTracker.initialize();
          handTracker.start();
        }
      } catch (err) {
        setError('无法访问摄像头，请确保已授予摄像头权限');
        console.error('Error accessing camera:', err);
      }
    };

    const handleHandTrackingResults = (results: HandTrackingResult) => {
      // 在这里处理手部追踪结果
      drawHandLandmarks(results);
    };

    const drawHandLandmarks = (results: HandTrackingResult) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // 清空画布
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 绘制手部骨骼
      results.hands.forEach((hand) => {
        const landmarks = hand.landmarks;
        
        // 绘制骨骼连接
        const connections = [
          [0, 1], [1, 2], [2, 3], [3, 4], // 拇指
          [0, 5], [5, 6], [6, 7], [7, 8], // 食指
          [0, 9], [9, 10], [10, 11], [11, 12], // 中指
          [0, 13], [13, 14], [14, 15], [15, 16], // 无名指
          [0, 17], [17, 18], [18, 19], [19, 20]  // 小指
        ];

        connections.forEach(([start, end]) => {
          const startLandmark = landmarks[start];
          const endLandmark = landmarks[end];
          
          ctx.beginPath();
          ctx.moveTo(startLandmark.x * canvas.width, startLandmark.y * canvas.height);
          ctx.lineTo(endLandmark.x * canvas.width, endLandmark.y * canvas.height);
          ctx.strokeStyle = hand.handedness === 'Right' ? '#6366F1' : '#8B5CF6';
          ctx.lineWidth = 2;
          ctx.stroke();
        });

        // 绘制关键点
        landmarks.forEach((landmark) => {
          ctx.beginPath();
          ctx.arc(landmark.x * canvas.width, landmark.y * canvas.height, 4, 0, 2 * Math.PI);
          ctx.fillStyle = '#10B981';
          ctx.fill();
        });
      });
    };

    initializeCamera();

    return () => {
      if (handTracker) {
        handTracker.stop();
      }
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="relative">
      <video
        ref={videoRef}
        className="w-32 h-24 object-cover rounded-md"
        autoPlay
        playsInline
        muted
      />
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-32 h-24 rounded-md"
        width={128}
        height={96}
      />
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-background-tertiary bg-opacity-80 rounded-md text-sm text-text-secondary">
          {error}
        </div>
      )}
      {!isCameraActive && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-background-tertiary rounded-md text-sm text-text-secondary">
          初始化摄像头...
        </div>
      )}
    </div>
  );
}