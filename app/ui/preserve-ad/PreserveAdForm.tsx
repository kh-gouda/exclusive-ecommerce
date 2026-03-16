"use client";

import { createStripeAdSession } from "@/app/actions/createStripeAdSession";
import { preserveAd } from "@/app/actions/preserveAd";
import { sendAdEmail } from "@/app/actions/sendAdEmail";
import { uploadAdImage } from "@/app/actions/uploadAdImage";
import { deleteImage } from "@/app/lib/cloudinaryDelete";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function PreserveAdForm({
  products,
}: {
  products: { productId: number; productName: string }[];
}) {
  const notifySuccess = () => toast.error("Your Ad Successfully Added");
  const notifyError = (error: string) => toast.error(error);
  const router = useRouter();
  async function handleSubmit(formData: FormData) {
    const adObject = {
      logo: "",
      image: "",
      title: "",
      details: "",
      productId: 0,
      duration: 0,
      totalAmount: 0,
    };

    try {
      const logo = formData.get("logo") as File;
      const adImage = formData.get("ad-image") as File;

      if (logo) {
        const logoId = await uploadAdImage(logo);
        if (logoId.publicId) {
          adObject.logo = logoId.publicId;
        }
      }

      if (adImage) {
        const adImageId = await uploadAdImage(adImage);
        if (adImageId.publicId) {
          adObject.image = adImageId.publicId;
        }
      }

      const title = formData.get("title") as string;
      const details = formData.get("ad-details") as string;
      const productId = Number(formData.get("select-product") as string);
      const duration = Number(formData.get("duration") as string);
      const totalAmount = duration * 10;

      if (title && details && productId && duration && totalAmount) {
        adObject.title = title;
        adObject.details = details;
        adObject.productId = productId;
        adObject.duration = duration;
        adObject.totalAmount = totalAmount;

        const preservedAd = await preserveAd(adObject);

        if (preservedAd.length) {
          const stripeSession = await createStripeAdSession(
            preservedAd[0].adid,
          );

          if (stripeSession && stripeSession.url) {
            window.location.href = stripeSession.url;
          }

          await sendAdEmail(preservedAd[0].adid, duration);
          notifySuccess();
          router.push("/");
        }
      } else {
        throw new Error(
          "Ad {title, details, productId, duration} cant be empty",
        );
      }
    } catch (error: unknown) {
      if (adObject.logo) await deleteImage(adObject.logo);
      if (adObject.image) await deleteImage(adObject.image);
      if (error instanceof Error) notifyError(error.message);
    }
  }
  return (
    <form action={handleSubmit}>
      <div className="mb-6">
        <label htmlFor="logo">
          Logo <span className="text-identity">(optional)</span>
        </label>
        <input
          className="profile-form-input"
          type="file"
          name="logo"
          id="logo"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="ad-image">
          Image <span className="text-identity">(optional)</span>
        </label>
        <input
          className="profile-form-input"
          type="file"
          name="ad-image"
          id="ad-image"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="select-product">Select Product</label>
        <select
          className="profile-form-input"
          name="select-product"
          id="select-product"
        >
          {products.map((product) => (
            <option key={product.productId} value={product.productId}>
              {product.productName}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-6 flex items-center gap-2">
        <label htmlFor="duration">Ad Duration</label>
        <input
          className="bg-gray-bg p-4 rounded-sm mt-2 text-gray-500 text-center font-bold"
          type="number"
          name="duration"
          id="duration"
          min={1}
          defaultValue={1}
          required
        />
        Days
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
        <label htmlFor="ad-details">Ad Details</label>
        <textarea
          className="resize-none w-full h-50 profile-form-input"
          name="ad-details"
          id="ad-details"
          placeholder="Write Your Ad Details Here Max 200 Characters"
          maxLength={200}
          required
        ></textarea>
      </div>

      <p>
        After You Click Confirm Button You Will Be Redirected To Payment Gateway
        And After Payment Success The Process Will Complete{" "}
      </p>

      <div className="flex gap-8 items-center justify-end">
        <input className="cursor-pointer" type="reset" value="Cancel" />
        <button className="shared-btn shared-btn-solid" role="submit">
          Confirm Preservation
        </button>
      </div>
    </form>
  );
}
