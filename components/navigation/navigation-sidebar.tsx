import { redirect } from "next/navigation";

import { Separator } from "@/components/ui/separator";
import { UserButton } from "@clerk/nextjs";
import { ModeToggle } from "@/components/mode-toggle";
import { ScrollArea } from "@/components/ui/scroll-area";
import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db";
import { NavigationAction } from "./navigation-action";
import { NavigationItem } from "./navigation-item";

export const NavigationSidebar = async () => {
  const profile = await currentProfile();

  if (!profile) {
    redirect("/sign-in");
  }

  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id
        }
      }
    }
  });

return (
  <div
    className="
      flex flex-col items-center
      h-full
      w-[72px]
      py-4
      bg-[#0b0d12]
      border-r border-white/5
      shadow-xl
    "
  >
    {/* Create / Home Button */}
    <div className="mb-4 flex items-center justify-center w-full">
      <NavigationAction />
    </div>

    {/* Subtle Divider */}
    <div className="w-8 h-px bg-white/10 rounded-full mb-4" />

    {/* Servers List */}
    <ScrollArea className="flex-1 w-full">
      <div className="flex flex-col items-center gap-y-3 py-1">
        {servers.map((server) => (
          <NavigationItem
            key={server.id}
            id={server.id}
            name={server.name}
            imageUrl={server.imageUrl}
          />
        ))}
      </div>
    </ScrollArea>

    {/* Bottom Section */}
    <div className="mt-auto pt-4 flex flex-col items-center gap-y-4 w-full">
      <ModeToggle />

      <UserButton
        afterSignOutUrl="/sign-in"
        appearance={{
          elements: {
            avatarBox:
              "h-[44px] w-[44px] rounded-full ring-1 ring-white/10 hover:ring-white/20 transition"
          }
        }}
      />
    </div>
  </div>
);


}