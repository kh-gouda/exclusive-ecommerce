import SharedButton from "@ui/shared/SharedButton";

export default function ContactForm() {
  return (
    <form className="p-10 shadow flex-1">
      <div className="flex items-center gap-4 *:flex-1">
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Your Name"
          className="bg-gray-bg rounded-sm p-4"
        />
        <input
          type="email"
          name="useremail"
          id="useremail"
          placeholder="Your Email"
          className="bg-gray-bg rounded-sm p-4"
        />
        <input
          type="tel"
          name="userphone"
          id="userphone"
          placeholder="Your Phone"
          className="bg-gray-bg rounded-sm p-4"
        />
      </div>
      <textarea
        name="msg"
        id="msg"
        className="my-8 w-full h-57.75 rounded-sm resize-none bg-gray-bg"
      ></textarea>
      <div className="flex items-center justify-end">
        <SharedButton task="Send Massage">Send Massage</SharedButton>
      </div>
    </form>
  );
}
