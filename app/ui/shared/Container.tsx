import { ReactNode } from "react";

export default function Container({ children }: { children: ReactNode }) {
  return <div className="w-292.5 max-w-full mx-auto">{children}</div>;
}
