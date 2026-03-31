"use client";

import { updateUserAddress } from "@/app/actions/fetchAndUpdateUser";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { ChangeEvent, SubmitEvent, useState } from "react";
import { toast } from "react-toastify";

export default function EditAddressForm() {
  const t = useTranslations();

  const { data: session } = useSession();
  const [user, setUser] = useState(session?.user);
  const notifyUpdate = () => toast.success("Your Address Updated Successfully");
  const notifyError = (error: string) => toast.error(error);

  const handleChangeStreet = (e: ChangeEvent<HTMLInputElement>) => {
    if (user) {
      setUser({
        ...user,
        address: {
          ...user.address,
          street: e.target.value || session?.user.address?.street || "",
        },
      });
    }
  };

  const handleChangeBuilding = (e: ChangeEvent<HTMLInputElement>) => {
    if (user) {
      setUser({
        ...user,
        address: {
          ...user.address,
          building: e.target.value || session?.user.address?.building || "",
        },
      });
    }
  };

  const handleChangeCity = (e: ChangeEvent<HTMLInputElement>) => {
    if (user) {
      setUser({
        ...user,
        address: {
          ...user.address,
          city: e.target.value || session?.user.address?.city || "",
        },
      });
    }
  };

  const handleChangeCountry = (e: ChangeEvent<HTMLInputElement>) => {
    if (user) {
      setUser({
        ...user,
        address: {
          ...user.address,
          country: e.target.value || session?.user.address?.country || "",
        },
      });
    }
  };

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      if (user) {
        await updateUserAddress(Number(user.id), {
          city: user.address?.city || "",
          street: user.address?.street || "",
          country: user.address?.country || "",
          building: user.address?.building || "",
        });

        notifyUpdate();
      }
    } catch (error) {
      if (error instanceof Error) notifyError(error.message);
    }
  }

  return (
    <form
      action=""
      onSubmit={(e: SubmitEvent<HTMLFormElement>) => handleSubmit(e)}
    >
      <div className="flex flex-wrap items-center justify-between mb-6">
        <div className=" w-[45%] max-[901px]:w-full max-[901px]:mb-6">
          <label htmlFor="street">{t("placeHolders.street")}</label>
          <input
            className="profile-form-input"
            type="text"
            name="street"
            id="street"
            placeholder={user?.address?.street}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChangeStreet(e)
            }
            autoComplete="off"
          />
        </div>
        <div className=" w-[45%] max-[901px]:w-full max-[901px]:mb-6">
          <label htmlFor="building">{t("placeHolders.building")}</label>
          <input
            className="profile-form-input"
            type="text"
            name="building"
            id="building"
            placeholder={user?.address?.building}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChangeBuilding(e)
            }
            autoComplete="off"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between mb-6">
        <div className=" w-[45%] max-[901px]:w-full max-[901px]:mb-6">
          <label htmlFor="city">{t("placeHolders.city")}</label>
          <input
            className="profile-form-input"
            type="text"
            name="city"
            id="city"
            placeholder={user?.address?.city}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeCity(e)}
            autoComplete="off"
          />
        </div>
        <div className=" w-[45%] max-[901px]:w-full max-[901px]:mb-6">
          <label htmlFor="country">{t("placeHolders.country")}</label>
          <input
            className="profile-form-input"
            type="text"
            name="country"
            id="country"
            placeholder={user?.address?.country}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChangeCountry(e)
            }
            autoComplete="off"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-8 items-center justify-end max-[350px]:justify-center">
        <input
          className="cursor-pointer"
          type="reset"
          value={t("placeHolders.cancel")}
        />
        <button className="shared-btn shared-btn-solid">
          {t("placeHolders.saveChanges")}
        </button>
      </div>
    </form>
  );
}
