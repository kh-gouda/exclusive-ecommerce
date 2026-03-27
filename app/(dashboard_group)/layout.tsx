import DashBoardSideNav from "@ui/dashboard/DashBoardSideNav";
import BreadCrumbs from "@ui/shared/BreadCrumbs";
import SectionTitle from "@ui/shared/SectionTitle";
import Image from "next/image";
import { ReactNode } from "react";

export default function DashBoardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="flex gap-25 px-4 bg-identity">
        <div className="w-50 text-center ">
          <Image
            width={512}
            height={512}
            className="max-w-full"
            src={"/images/dashboard.png"}
            alt="dashboard icon"
          />
        </div>
        <div className="flex-1 ps-10 pt-10 text-white">
          <SectionTitle>Exclusive Dashbaord</SectionTitle>
          <BreadCrumbs />
        </div>
      </div>
      <div className="flex gap-25 py-10 px-4">
        <DashBoardSideNav />
        <div className="flex-1 shadow p-10 rounded-sm">{children}</div>
      </div>
    </>
  );
}
