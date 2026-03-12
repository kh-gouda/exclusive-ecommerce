export function NewPasswordTemplate(newPassword: string) {
  return `
    <h2>New Password</h2>

    <p>This is Your New Password</p>
    <p><strong>Password:</strong> ${newPassword}</p>
    <hr />
    <p><strong>Make Sure To Change This Password For Your Security</strong></p>
    
  `;
}
