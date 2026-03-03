import { ArrowPathIcon, TruckIcon } from "@heroicons/react/24/outline";

export default function DeliveryFeatures() {
  return (
    <div className="mt-10 py-6 border rounded-sm">
      <div className="flex items-center gap-4 border-b py-6 px-4 font-medium">
        <TruckIcon className="w-10 h-10" />
        <div>
          <h3>Free Delivery</h3>
          <p className="text-xs">
            Enter your postal code for Delivery Availability
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4 py-6 px-4 font-medium">
        <ArrowPathIcon className="w-10 h-10" />
        <div>
          <h3>Return Delivery</h3>
          <p className="text-xs">Free 30 Days Delivery Returns. Details</p>
        </div>
      </div>
    </div>
  );
}
