import clsx from "clsx";
import { ReactNode } from "react";

export default function Section({
  children,
  withBorder,
}: {
  children: ReactNode;
  withBorder?: boolean;
}) {
  return (
    <section
      className={clsx("py-12.5", { "border-b border-gray-300": withBorder })}
    >
      {children}
    </section>
  );
}
