import SharedButton from "@ui/shared/SharedButton";

export default function EditProfileForm() {
  const user = {
    fName: "Md",
    lName: "Rimel",
    email: "rimel1111@gmail.com",
    address: "Kingston, 5236, United State",
  };
  return (
    <form action="">
      <div className="flex items-center justify-between mb-6">
        <div className=" w-[45%]">
          <label htmlFor="fname">First Name</label>
          <input
            className="profile-form-input"
            type="text"
            name="fname"
            id="fname"
            placeholder={user.fName}
          />
        </div>
        <div className=" w-[45%]">
          <label htmlFor="lname">Last Name</label>
          <input
            className="profile-form-input"
            type="text"
            name="lname"
            id="lname"
            placeholder={user.lName}
          />
        </div>
      </div>
      <div className="flex items-center justify-between mb-6">
        <div className=" w-[45%]">
          <label htmlFor="email">Email</label>
          <input
            className="profile-form-input"
            type="email"
            name="email"
            id="email"
            placeholder={user.email}
          />
        </div>
        <div className=" w-[45%]">
          <label htmlFor="address">Address</label>
          <input
            className="profile-form-input"
            type="text"
            name="address"
            id="address"
            placeholder={user.address}
          />
        </div>
      </div>
      <div className="mb-6">
        <label htmlFor="current-password">Password Change</label>
        <input
          type="password"
          name="current-password"
          id="current-password"
          placeholder="Current Passwod"
          className="profile-form-input"
        />
        <input
          type="password"
          name="new-password"
          id="new-password"
          placeholder="New Passwod"
          className="profile-form-input"
        />
        <input
          type="password"
          name="confirm-new-password"
          id="confirm-new-password"
          placeholder="Confirm New Passwod"
          className="profile-form-input"
        />
      </div>
      <div className="flex gap-8 items-center justify-end">
        <input className="cursor-pointer" type="reset" value="Cancel" />
        <SharedButton task="save changes">Save Changes</SharedButton>
      </div>
    </form>
  );
}
