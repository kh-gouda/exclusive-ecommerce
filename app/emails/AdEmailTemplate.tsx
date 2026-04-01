export function AdEmailTemplate(adId: number, duration: number) {
  return `
    <h2>Reserved Ad</h2>

    <p>Your Ad Reserved At <strong>Exclusive</strong> Has Been <strong>Successfully Added</strong></p>
    <p>Your Ad_Id is <strong>${adId}</strong></p>
    <p>And Will Be Displayed In The Main Ads Area for <strong>${duration} Days</strong> Starting From Now</p>
    <p><strong>Congratulations And We Are Happy To Serve You</strong></p>
    
  `;
}
