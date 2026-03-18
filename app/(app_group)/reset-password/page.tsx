import ResetPasswordForm from "@ui/resetPassword/ResetPasswordForm";
import Container from "@ui/shared/Container";
import SectionTitle from "@ui/shared/SectionTitle";

export default function ResetPasswordPage() {
  return (
    <Container>
      <SectionTitle>Reset Password</SectionTitle>
      <section className="py-20 flex items-center justify-center">
        <ResetPasswordForm />
      </section>
    </Container>
  );
}
