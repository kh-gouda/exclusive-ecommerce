import DashBoardSideNav from "@ui/dashboard/DashBoardSideNav";
import SectionTitle from "@ui/shared/SectionTitle";
import Image from "next/image";
import { ReactNode } from "react";

export default function DashBoardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="flex gap-25 px-4">
        <div className="w-50 text-center ">
          <Image
            width={512}
            height={512}
            className="max-w-full"
            src={"/images/dashboard.png"}
            alt="dashboard icon"
          />
          <SectionTitle>Dashbaord</SectionTitle>
        </div>
        <div className="flex-1 pl-10 pt-10">Bread Crumbs</div>
      </div>
      <div className="flex gap-25 py-20 px-4">
        <DashBoardSideNav />
        <div className="flex-1 shadow p-10 rounded-sm">{children}</div>
      </div>
    </>
  );
}
