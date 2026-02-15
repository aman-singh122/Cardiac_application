import { NextResponse } from "next/server";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

export async function DELETE(
  req: Request,
  context: { params: Promise<{ messageId: string }> }
) {
  try {
    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // 🔥 IMPORTANT — await params
    const { messageId } = await context.params;

    if (!messageId) {
      return new NextResponse("Message ID missing", { status: 400 });
    }

    const message = await db.message.findUnique({
      where: { id: messageId },
    });

    if (!message) {
      return new NextResponse("Message not found", { status: 404 });
    }

    await db.message.delete({
      where: { id: messageId },
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("[MESSAGE_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
