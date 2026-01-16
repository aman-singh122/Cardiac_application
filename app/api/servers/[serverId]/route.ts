import { NextResponse } from "next/server";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
  // Next.js 16 me params Promise hota hai
  { params }: { params: Promise<{ serverId: string }> }
) {
  try {
    // Current logged-in user profile nikal rahe hain
    const profile = await currentProfile();

    // Request body se name aur imageUrl le rahe hain
    const { name, imageUrl } = await req.json();

    // Agar user logged in nahi hai
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // 🔥 IMPORTANT: params ko await karna zaroori hai
    const { serverId } = await params;

    // Server update kar rahe hain
    const server = await db.server.update({
      where: {
        id: serverId,              // Server ID
        profileId: profile.id,    // Sirf owner hi update kar sakta hai

        // Agar role-based check chahiye future me, to ye use kar sakta hai
        // members: {
        //   some: {
        //     profileId: profile.id,
        //     role: {
        //       in: [MemberRole.ADMIN, MemberRole.MODERATOR]
        //     }
        //   }
        // }
      },
      data: {
        name,        // New name
        imageUrl,   // New image URL
      },

      // Agar related data bhi chahiye ho
      // include: {
      //   members: true,
      //   channels: true
      // }
    });

    // Updated server ko response me bhej rahe hain
    return NextResponse.json(server);

  } catch (error) {
    console.log("[SERVER_ID_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
