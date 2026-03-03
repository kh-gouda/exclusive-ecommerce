import { STAFF_TYPE } from "@/app/lib/typeDefinitions";
import EmployeeImage from "@ui/about/EmployeeImage";
import { inter } from "@ui/shared/fonts";
import Link from "next/link";
import { FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function EmployeeCard({ employee }: { employee: STAFF_TYPE }) {
  return (
    <div>
      <div className="w-92.5 h-107.5 bg-gray-bg flex items-end justify-center">
        <EmployeeImage image={employee.image} />
      </div>
      <h3 className={`${inter.className} font-medium text-[32px] mt-8`}>
        {employee.name}
      </h3>
      <p className="mt-2 mb-4">{employee.jobTitle}</p>
      <div className="flex gap-4">
        <Link href={employee.twitterLink}>
          <FaTwitter className="h-6 w-6 hover:text-blue-700" />
        </Link>
        <Link href={employee.instagramLink}>
          <FaInstagram className="h-6 w-6 hover:text-pink-700" />
        </Link>
        <Link href={employee.linkedinLink}>
          <FaLinkedin className="h-6 w-6 hover:text-blue-900" />
        </Link>
      </div>
    </div>
  );
}
