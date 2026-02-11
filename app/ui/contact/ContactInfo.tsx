import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";

export default function ContactInfo() {
  return (
    <div className="p-10 shadow">
      <div className="w-65.5">
        <h3 className="flex items-center gap-4">
          <div className="w-10 h-10 bg-identity rounded-full flex items-center justify-center">
            <PhoneIcon className="w-6 h-6 text-white-color" />
          </div>
          <span className="font-medium">Call To Us</span>
        </h3>
        <p className="mt-6 mb-4">We are available 24/7, 7 days a week.</p>
        <p>Phone: +8801611112222</p>
      </div>
      <hr className="my-8" />
      <div className="w-65.5">
        <h3 className="flex items-center gap-4">
          <div className="w-10 h-10 bg-identity rounded-full flex items-center justify-center">
            <EnvelopeIcon className="w-6 h-6 text-white-color" />
          </div>
          <span className="font-medium">Write To Us</span>
        </h3>
        <p className="mt-6">
          Fill out our form and we will contact you within 24 hours.
        </p>
        <p className="my-4">Emails: customer@exclusive.com</p>
        <p>Emails: support@exclusive.com</p>
      </div>
    </div>
  );
}
