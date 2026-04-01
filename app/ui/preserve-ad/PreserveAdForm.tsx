"use client";

import { createStripeAdSession } from "@/app/actions/createStripeAdSession";
import { confirmAd, preserveAd } from "@/app/actions/preserveAd";
import { uploadAdImage } from "@/app/actions/uploadAdImage";
import { deleteImage } from "@/app/lib/cloudinaryDelete";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { SubmitEvent, useEffect, useEffectEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function PreserveAdForm({
  products,
}: {
  products: { productId: number; productName: string }[];
}) {
  const t = useTranslations();
  const notifySuccess = () => toast.success("Your Ad Successfully Added");
  const notifyError = (error: string) => toast.error(error);
  const router = useRouter();

  const searchParams = useSearchParams();

  const sendSuccessEmail = useEffectEvent(async () => {
    try {
      await confirmAd(
        Number(searchParams.get("adid")),
        Number(searchParams.get("duration")),
      );

      notifySuccess();
      router.push("/");
    } catch (error: unknown) {
      if (error instanceof Error) notifyError(error.message);
    }
  });

  useEffect(() => {
    if (searchParams.get("success")) {
      sendSuccessEmail();
    }
  }, [searchParams]);

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

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

      if (logo.size) {
        const logoId = await uploadAdImage(logo);
        if (logoId.publicId) {
          adObject.logo = logoId.publicId;
        }
      }

      if (adImage.size) {
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
            duration,
          );

          if (stripeSession && stripeSession.url) {
            window.location.href = stripeSession.url;
          }
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
    <form
      action={""}
      onSubmit={(e: SubmitEvent<HTMLFormElement>) => handleSubmit(e)}
    >
      <div className="mb-6">
        <label htmlFor="logo">
          {t("preserveAd.logo")}{" "}
          <span className="text-identity">{t("preserveAd.optional")}</span>
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
          {t("preserveAd.image")}{" "}
          <span className="text-identity">{t("preserveAd.optional")}</span>
        </label>
        <input
          className="profile-form-input"
          type="file"
          name="ad-image"
          id="ad-image"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="select-product">{t("preserveAd.selectProduct")}</label>
        <select
          className="profile-form-input"
          name="select-product"
          id="select-product"
        >
          {products.map((product) => (
            <option key={product.productId} value={product.productId}>
              {product.productId < 44
                ? t(`products.p${product.productId}name`)
                : product.productName}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-6 flex items-center gap-2 flex-wrap">
        <label htmlFor="duration">{t("preserveAd.duration")}</label>
        <input
          className="bg-gray-bg p-4 rounded-sm mt-2 text-gray-500 text-center font-bold"
          type="number"
          name="duration"
          id="duration"
          min={1}
          defaultValue={1}
          required
        />
        {t("timer.days")}
      </div>
      <div className="mb-6">
        <label htmlFor="title">{t("preserveAd.title")}</label>
        <input
          className="profile-form-input"
          type="text"
          name="title"
          id="title"
          placeholder={t("preserveAd.titlePlaceholder")}
          required
        />
      </div>
      <div className="mb-6">
        <label htmlFor="ad-details">{t("preserveAd.adDetails")}</label>
        <textarea
          className="resize-none w-full h-50 profile-form-input"
          name="ad-details"
          id="ad-details"
          placeholder={t("preserveAd.detailsPlaceholder")}
          maxLength={200}
          required
        ></textarea>
      </div>

      <p>{t("preserveAd.disclaimer")}</p>

      <div className="flex flex-wrap gap-8 items-center justify-end max-[390px]:justify-center mt-10">
        <input
          className="cursor-pointer"
          type="reset"
          value={t("general.cancel")}
        />
        <button className="shared-btn shared-btn-solid" role="submit">
          {t("preserveAd.confirmPreservation")}
        </button>
      </div>
    </form>
  );
}
