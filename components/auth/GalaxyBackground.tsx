"use client";

import { useEffect, useRef } from "react";

export default function GalaxyBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    videoRef.current?.play().catch(() => {
      // autoplay fail silently (browser policy)
    });
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src="/galaxy.mp4"
        muted
        loop
        playsInline
        preload="auto"
      />
      <div className="absolute inset-0 bg-black/60" />
    </div>
  );
}
