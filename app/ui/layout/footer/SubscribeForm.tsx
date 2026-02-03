import { PaperAirplaneIcon } from "@heroicons/react/24/outline";

export default function SubscribeForm() {
  return (
    <>
      <h3 className="text-white-text font-medium text-xl my-6">Subscribe</h3>
      <p className="text-white-text text-base my-6">
        Get 10% off your first order
      </p>
      <form action="" className="relative">
        <input
          type="email"
          name="subscribe-email"
          id="subscribe-email"
          className="border border-white-text rounded-sm py-3 pl-4 text-base placeholder:text-gray-500 placeholder:text-base"
          placeholder="Enter your email"
        />
        <PaperAirplaneIcon
          className="w-5 h-5 text-white-text absolute top-1/2 right-0 -translate-1/2 cursor-pointer"
          role="button"
        />
      </form>
    </>
  );
}
