import Container from "@ui/shared/Container";
import SectionTitle from "@ui/shared/SectionTitle";
import Link from "next/link";

export default function NotFound() {
  return (
    <Container>
      <div className="py-35 flex flex-col items-center justify-center">
        <SectionTitle size="110px" weight={500}>
          404 Not Found
        </SectionTitle>
        <p className="pt-10 pb-20">
          Your visited page not found. You may go home page.
        </p>
        <Link href="/" className="shared-btn shared-btn-solid">
          Back to home page
        </Link>
      </div>
    </Container>
  );
}
