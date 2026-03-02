import SharedButton from "@ui/shared/SharedButton";

export default function PreserveAdForm() {
  return (
    <form action="">
      <div className="mb-6">
        <label htmlFor="logo">
          Logo <span className="text-identity">(optional)</span>
        </label>
        <input
          className="profile-form-input"
          type="text"
          name="logo"
          id="logo"
          placeholder="logo"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="title">Ad Title</label>
        <input
          className="profile-form-input"
          type="text"
          name="title"
          id="title"
          placeholder="Ad Title Here"
          required
        />
      </div>
      <div className="mb-6">
        <label htmlFor="Ad-details">Ad Details</label>
        <textarea
          className="resize-none w-full h-50 profile-form-input"
          name="ad-details"
          id="ad-details"
          placeholder="Write Your Ad Details Here Max 200 Characters"
          maxLength={200}
          required
        ></textarea>
      </div>
      <div className="mb-6">
        <label htmlFor="ad-image">
          Image <span className="text-identity">(optional)</span>
        </label>
        <input
          className="profile-form-input"
          type="text"
          name="ad-image"
          id="ad-image"
          placeholder="Ad Image Here"
        />
      </div>
      <p className="mb-6">Payment Details</p>
      <div className="mb-6">
        <label htmlFor="card-number">Card Number</label>
        <input
          className="profile-form-input"
          type="text"
          name="card-number"
          id="card-number"
          placeholder="card number"
          required
        />
      </div>
      <div className="mb-6">
        <label htmlFor="card-cvv">Card Number</label>
        <input
          className="profile-form-input"
          type="text"
          name="card-cvv"
          id="card-cvv"
          placeholder="card cvv"
          required
        />
      </div>
      <div className="flex gap-8 items-center justify-end">
        <input className="cursor-pointer" type="reset" value="Cancel" />
        <SharedButton task="Confirm Preservation">
          Confirm Preservation
        </SharedButton>
      </div>
    </form>
  );
}
