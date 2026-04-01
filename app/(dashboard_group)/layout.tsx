import DashBoardBreadCrumbDetector from "@ui/dashboard/DashBoardBreadCrumbDetector";
import DashBoardSideNav from "@ui/dashboard/DashBoardSideNav";
import SectionTitle from "@ui/shared/SectionTitle";
import Image from "next/image";
import { ReactNode } from "react";

export default function DashBoardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="flex flex-wrap gap-25 max-[751px]:gap-7.5 px-4 bg-identity">
        <div className="w-50 text-center ">
          <Image
            width={512}
            height={512}
            className="max-w-full"
            src={"/images/dashboard.png"}
            alt="dashboard icon"
          />
        </div>
        <div className="flex-1 ps-10 pt-10 max-[751px]:ps-2 text-white">
          <SectionTitle>Exclusive Dashbaord</SectionTitle>
          <DashBoardBreadCrumbDetector />
        </div>
      </div>
      <div className="flex gap-25 py-10 px-4 max-[900px]:px-2 relative">
        <DashBoardSideNav />
        <div className="flex-1 max-w-full shadow p-10 max-[1300px]:px-2 rounded-sm">
          {children}
        </div>
      </div>
    </>
  );
}
