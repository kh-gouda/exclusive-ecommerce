import Container from "@ui/shared/Container";
import Section from "@ui/shared/Section";
import SectionTitle from "@ui/shared/SectionTitle";
import Link from "next/link";

export default function ProfileNotAuthorized() {
  return (
    <Container>
      <Section>
        <SectionTitle>
          You Have To Login To Visit Your Account Profile
        </SectionTitle>
        <p>
          You Can{" "}
          <Link href="/login" className="text-identity">
            Login Here
          </Link>
        </p>
      </Section>
    </Container>
  );
}
