import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { RedirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface ServerIdPageProps {
  params: Promise<{
    serverId: string;
  }>;
}

const ServerIdPage = async ({ params }: ServerIdPageProps) => {
  const { serverId } = await params;

  const profile = await currentProfile();

 if (!profile) {
  redirect("/sign-in");
}


  const server = await db.server.findFirst({
    where: {
      id: serverId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
    include: {
      channels: {
        where: {
          name: "general",
        },
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });

  if (!server) {
    return redirect("/");
  }

  const initialChannel = server.channels[0];

  if (!initialChannel) {
    return null;
  }

  return redirect(
    `/servers/${serverId}/channels/${initialChannel.id}`
  );
};

export default ServerIdPage;
