import Container from "@ui/shared/Container";
import Link from "next/link";

export default function DashBoarddLink() {
  return (
    <div className="bg-gray-100">
      <Container>
        <div className="py-2 flex items-center justify-end">
          <Link href="/dashboard" className="shared-btn shared-btn-transparent">
            Admin Dashbaord
          </Link>
        </div>
      </Container>
    </div>
  );
}
