"use client";

import { useEffect, useState } from "react";
import {
  LiveKitRoom,
  GridLayout,
  ParticipantTile,
  ControlBar,
  RoomAudioRenderer,
  useTracks,
} from "@livekit/components-react";
import "@livekit/components-styles";

import { Track } from "livekit-client";
import { useUser } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

interface MediaRoomProps {
  chatId: string;
  video: boolean;
  audio: boolean;
}

/* -------------------- */
/* 🔹 CUSTOM ROOM UI 🔹 */
/* -------------------- */
function CustomRoom() {
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.Microphone, withPlaceholder: false },
    ],
    { onlySubscribed: false }
  );

  return (
    <div className="flex flex-col h-full bg-[#1e1f22]">
      <div className="flex-1 p-4">
        <GridLayout tracks={tracks} className="h-full">
          <ParticipantTile />
        </GridLayout>
      </div>

      <RoomAudioRenderer />

      <div className="border-t border-zinc-800 bg-[#1e1f22]">
        <ControlBar
          variation="minimal"
          controls={{
            microphone: true,
            camera: true,
            screenShare: true,
            leave: true,
          }}
        />
      </div>
    </div>
  );
}

/* -------------------- */
/* 🔹 MEDIA ROOM 🔹 */
/* -------------------- */
export const MediaRoom = ({ chatId, video, audio }: MediaRoomProps) => {
  const { user } = useUser();

  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.firstName || !user?.lastName) return;

    let cancelled = false;

    const name = `${user.firstName} ${user.lastName}`;

    const fetchToken = async () => {
      try {
        setError(null);

        const resp = await fetch(
          `/api/livekit?room=${chatId}&username=${encodeURIComponent(name)}`
        );

        if (!resp.ok) {
          throw new Error(`Token API failed (${resp.status})`);
        }

        const data = await resp.json();

        if (!data.token || typeof data.token !== "string") {
          throw new Error("Invalid LiveKit token received");
        }

        if (!cancelled) {
          setToken(data.token);
        }
      } catch (err: any) {
        console.error("LiveKit token error:", err);
        if (!cancelled) {
          setError(err.message || "Failed to connect to voice channel");
        }
      }
    };

    fetchToken();

    return () => {
      cancelled = true;
    };
  }, [chatId, user?.firstName, user?.lastName]);

  /* ❌ ERROR */
  if (error) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center text-red-500">
        <p className="text-sm font-medium">Unable to join channel</p>
        <p className="mt-1 text-xs opacity-80">{error}</p>
      </div>
    );
  }

  /* 🔄 LOADING */
  if (!token) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center">
        <Loader2 className="h-7 w-7 animate-spin text-zinc-400 my-4" />
        <p className="text-xs text-zinc-400">Connecting to channel…</p>
      </div>
    );
  }

  return (
    <LiveKitRoom
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      token={token}
      connect
      video={video}
      audio={audio}
      data-lk-theme="default"
      className="h-full"
    >
      <CustomRoom />
    </LiveKitRoom>
  );
};
