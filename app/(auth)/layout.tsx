import React from "react";
import GalaxyBackground from "@/components/auth/GalaxyBackground";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Galaxy video background */}
      <GalaxyBackground />

      {/* Auth container */}
      <div className="relative z-10 w-full max-w-xl px-8 py-8">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
