// app/providers.tsx
"use client";

import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth"; // Import Session type
import React from "react";

type Props = {
  children: React.ReactNode;
  session?: Session | null; // Add session to props type
};

export default function NextAuthSessionProvider({ children, session }: Props) {
  // Pass the session prop to the provider
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
