"use client";
import {
  fetchUserByEmail,
  fetchUserById,
  updateUserProfile,
  updateUserProfileAndPassword,
} from "@/app/actions/fetchAndUpdateUser";
import bcrypt from "bcryptjs";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { ChangeEvent, SubmitEvent, useState } from "react";
import { toast } from "react-toastify";

export default function EditProfileForm() {
  const t = useTranslations();

  const notifySuccess = () => toast.success("Your Profie Updated Successfully");
  const notifyError = (error: string) => toast.error(error);

  const { data: session, update } = useSession();
  const [user, setUser] = useState(session?.user);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangeFName = (e: ChangeEvent<HTMLInputElement>) => {
    if (user) {
      setUser({
        ...user,
        firstname: e.target.value || session?.user.firstname || "",
      });
    }
  };

  const handleChangeLName = (e: ChangeEvent<HTMLInputElement>) => {
    if (user) {
      setUser({
        ...user,
        lastname: e.target.value || session?.user.lastname || "",
      });
    }
  };

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    if (user) {
      setUser({ ...user, email: e.target.value || session?.user.email });
    }
  };

  const handleChangeCurrentPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentPassword(e.target.value);
  };

  const handleChangeNewPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const handleChangeConfirmPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      if (user) {
        if (user.email) {
          const fetchedUserByEmail = await fetchUserByEmail(user.email);
          const existing = fetchedUserByEmail.filter(
            (fetchedUser) => fetchedUser.userid !== Number(user.id),
          );
          if (existing && existing.length) {
            throw new Error("Email already exist with different user");
          }
        }

        const userById = await fetchUserById(Number(user.id));
        const newHashedPassword = await bcrypt.hash(newPassword, 10);
        const userToUpdate = {
          userId: Number(user.id),
          firstName: user.firstname,
          lastName: user.lastname,
          email: user.email || "",
          password: newHashedPassword,
        };

        if (currentPassword || newPassword || confirmPassword) {
          const validCurrentPassword = await bcrypt.compare(
            currentPassword,
            userById[0].password,
          );
          const validNewPassword = await bcrypt.compare(
            confirmPassword,
            newHashedPassword,
          );

          if (!validCurrentPassword || !validNewPassword) {
            throw new Error(
              "Incorrect Current Password Or New Password Not Identical To Confirm Password",
            );
          }
        }

        if (newPassword) {
          await updateUserProfileAndPassword(userToUpdate);
        } else {
          await updateUserProfile(userToUpdate);
        }

        await update();
        notifySuccess();
        location.reload();
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        notifyError(
          err.message || "An error occurred while updating the profile",
        );
      }
    }
  }

  return (
    <form
      action=""
      onSubmit={(e: SubmitEvent<HTMLFormElement>) => handleSubmit(e)}
    >
      <div className="flex flex-wrap items-center justify-between mb-6">
        <div className=" w-[45%] max-[901px]:w-full max-[901px]:mb-6">
          <label htmlFor="fname">{t("placeHolders.fname")}</label>
          <input
            className="profile-form-input"
            type="text"
            name="fname"
            id="fname"
            placeholder={user?.firstname}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChangeFName(e)
            }
            autoComplete="off"
          />
        </div>
        <div className=" w-[45%] max-[901px]:w-full max-[901px]:mb-6">
          <label htmlFor="lname">{t("placeHolders.lname")}</label>
          <input
            className="profile-form-input"
            type="text"
            name="lname"
            id="lname"
            placeholder={user?.lastname}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChangeLName(e)
            }
            autoComplete="off"
          />
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between mb-6">
        <div className=" w-[45%] max-[901px]:w-full max-[901px]:mb-6">
          <label htmlFor="email">{t("placeHolders.email")}</label>
          <input
            className="profile-form-input"
            type="email"
            name="email"
            id="email"
            placeholder={user?.email || ""}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChangeEmail(e)
            }
            autoComplete="off"
          />
        </div>
        <div className=" w-[45%] max-[901px]:w-full max-[901px]:mb-6">
          <label htmlFor="address">
            {t("placeHolders.address")}{" "}
            <span className="text-identity">
              {t("placeHolders.readOnlyAddress")}
            </span>
          </label>
          <input
            className="profile-form-input"
            type="text"
            name="address"
            id="address"
            placeholder={`${user?.address?.street}, ${user?.address?.building}, ${user?.address?.city}, ${user?.address?.country}`}
            readOnly
            autoComplete="off"
          />
        </div>
      </div>
      <div className="mb-6">
        <label htmlFor="current-password">
          {t("placeHolders.passwordChange")}
        </label>
        <input
          type="password"
          name="current-password"
          id="current-password"
          placeholder={t("placeHolders.currentPassword")}
          className="profile-form-input"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleChangeCurrentPassword(e)
          }
          autoComplete="off"
        />
        <input
          type="password"
          name="new-password"
          id="new-password"
          placeholder={t("placeHolders.newPassword")}
          className="profile-form-input"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleChangeNewPassword(e)
          }
          autoComplete="off"
        />
        <input
          type="password"
          name="confirm-new-password"
          id="confirm-new-password"
          placeholder={t("placeHolders.confirmPassword")}
          className="profile-form-input"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleChangeConfirmPassword(e)
          }
          autoComplete="off"
        />
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
