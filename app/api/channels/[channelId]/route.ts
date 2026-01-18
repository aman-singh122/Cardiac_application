import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";
import { MemberRole } from "@prisma/client";

export async function DELETE(
  req: Request,
  context: { params: Promise<{ channelId: string }> }
) {
  try {
    // ✅ Next.js 16: params is async
    const params = await context.params;

    const channelId = params?.channelId;

    if (!channelId) {
      return new NextResponse("Channel ID missing", { status: 400 });
    }

    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const serverId = searchParams.get("serverId");

    if (!serverId) {
      return new NextResponse("Server ID missing", { status: 400 });
    }

    const channel = await db.channel.findUnique({
      where: {
        id: channelId,
      },
    });

    if (!channel) {
      return new NextResponse("Channel not found", { status: 404 });
    }

    if (channel.name === "general") {
      return new NextResponse("Cannot delete general channel", { status: 400 });
    }

    const server = await db.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR],
            },
          },
        },
      },
      data: {
        channels: {
          delete: {
            id: channelId,
          },
        },
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.error("[CHANNEL_DELETE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  context: { params: Promise<{ channelId: string }> }
) {
  try {
    // ✅ Next.js 16: params is async
    const params = await context.params;

    const channelId = params?.channelId;

    if (!channelId) {
      return new NextResponse("Channel ID missing", { status: 400 });
    }

    const profile = await currentProfile();
    const {name,type} = await req.json();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const serverId = searchParams.get("serverId");

    if (!serverId) {
      return new NextResponse("Server ID missing", { status: 400 });
    }



    const channel = await db.channel.findUnique({
      where: {
        id: channelId,
      },
    });

    if (!channel) {
      return new NextResponse("Channel not found", { status: 404 });
    }

    if (channel.name === "general") {
      return new NextResponse("Name cannot be 'general'", { status: 400 });
    }

    const server = await db.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR],
            },
          },
        },
      },
      data: {
       channels:{
        update:{
          where:{
            id:params.channelId,
            NOT:{
              name:"general",
            }
          },
          data:{
            name,type
          }
        },
       }
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.error("[CHANNEL_PATCH]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
