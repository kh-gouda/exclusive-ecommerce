export function VerificationEmailTemplate(verificationCode: string) {
  return `
    <h2>Reset Password Verification Code</h2>

    <p>Copy This Code To Verify Your Email</p>
    <p><strong>Code:</strong> ${verificationCode}</p>
    
  `;
}
