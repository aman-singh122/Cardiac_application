import { ModeToggle } from "@/components/mode-toggle";
import { UserButton } from "@clerk/nextjs";

// import { Button } from "@/components/ui/button";
export default function Home() {
  return (
    <div>
  <UserButton afterSignOutUrl="/sign-in" />
<ModeToggle/>
    </div>
  );
}


