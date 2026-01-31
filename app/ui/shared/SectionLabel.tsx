import { ReactNode } from "react";

export default function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div
      className="section-label section-label-before"
      aria-description="section label"
    >
      {children}
    </div>
  );
}
