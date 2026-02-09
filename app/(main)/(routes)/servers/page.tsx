import { redirect } from "next/navigation";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

const ServersPage = async () => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/sign-in");
  }

  const server = await db.server.findFirst({
    where: {
      members: {
        some: { profileId: profile.id },
      },
    },
  });

  if (server) {
    return redirect(`/servers/${server.id}`);
  }

  // 👇 THIS must exist
  return redirect("/setup");
};

export default ServersPage;
