import { STAFF_TYPE } from "@/app/lib/typeDefinitions";
import EmployeeCard from "@ui/about/EmployeeCard";

export default function EmployeesSlide({ staff }: { staff: STAFF_TYPE[] }) {
  return (
    <div className="mb-10 flex items-center justify-center gap-7.5">
      {staff.map((emp) => (
        <EmployeeCard key={emp.id} employee={emp} />
      ))}
    </div>
  );
}
