import Container from "@ui/shared/Container";
import SectionTitle from "@ui/shared/SectionTitle";
import SharedButton from "@ui/shared/SharedButton";

export default function NotFound() {
  return (
    <Container>
      <main className="py-35 flex flex-col items-center justify-center">
        <SectionTitle size="110px" weight={500}>
          404 Not Found
        </SectionTitle>
        <p className="pt-10 pb-20">
          Your visited page not found. You may go home page.
        </p>
        <SharedButton task="Back to home page">Back to home page</SharedButton>
      </main>
    </Container>
  );
}
