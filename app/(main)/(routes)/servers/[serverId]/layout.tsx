import { ServerSidebar } from "@/components/server/server-sidebar";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

const ServerIdLayout = async ({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ serverId: string }>
}) => {

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
          profileId: profile.id
        }
      }
    }
  });

  if (!server) {
    redirect("/");
  }

  return (
  <div className="h-full bg-background text-foreground">
    
    {/* Sidebar */}
    <div className="hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0 border-r border-border bg-background">
      <ServerSidebar serverId={serverId} />
    </div>

    {/* Main Content */}
    <main className="h-full md:pl-60 bg-card">
      {children}
    </main>

  </div>
);

};

export default ServerIdLayout;
