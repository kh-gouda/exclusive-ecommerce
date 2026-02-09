import { ReactNode } from "react";

export default function FormTitle({ children }: { children: ReactNode }) {
  return <h2 className="text-identity font-medium text-xl mb-4">{children}</h2>;
}
