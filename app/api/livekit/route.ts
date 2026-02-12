import { NextResponse } from "next/server";
import { AccessToken } from "livekit-server-sdk";

export const runtime = "nodejs";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const room = searchParams.get("room");
    const username = searchParams.get("username");

    if (!room || !username) {
      return NextResponse.json(
        { error: "Missing room or username" },
        { status: 400 }
      );
    }

    const apiKey = process.env.LIVEKIT_API_KEY;
    const apiSecret = process.env.LIVEKIT_API_SECRET;

    if (!apiKey || !apiSecret) {
      return NextResponse.json(
        { error: "LiveKit keys missing" },
        { status: 500 }
      );
    }

    const token = new AccessToken(apiKey, apiSecret, {
      identity: username,
    });

    token.addGrant({
      room,
      roomJoin: true,
      canPublish: true,
      canSubscribe: true,
    });

    const jwt = await token.toJwt();

    // ✅ SAFE LOG
    console.log("JWT GENERATED:", typeof jwt);

    return NextResponse.json({ token: jwt });
  } catch (err) {
    console.error("LIVEKIT ROUTE CRASH:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
