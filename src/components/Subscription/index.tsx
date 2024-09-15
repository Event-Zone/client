"use client";
import {
  useAddSubscriptionMutation,
  useGetUserQuery,
} from "@/store/features/api/apiSlice";
import { selectUser, updateUserData } from "@/store/features/userSlice";
import { useRouter } from "@/navigation";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslations } from "next-intl";

function Subscription({ pack }: { pack: string }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [addSubscription, addSubscriptionResult] = useAddSubscriptionMutation();
  const { refetch: refetchUser } = useGetUserQuery(user?._id);

  const [formData, setFormData] = useState({
    _id: user?._id,
    phone: "",
    company: "",
    role: "",
    paymentMethod: "",
    termsAccepted: false,
    pack: pack,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (e.target instanceof HTMLInputElement && type === "checkbox") {
      setFormData({
        ...formData,
        [name]: e.target.checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log(formData);
      await addSubscription(formData).unwrap();
      // Handle successful subscription
    } catch (error) {
      // Handle error
    }
  };

  useEffect(() => {
    if (addSubscriptionResult.status === "fulfilled") {
      console.log("Subscription successful");
      refetchUser().then((result) => {
        if (result.data) {
          dispatch(updateUserData(result.data));
        }
      });
      router.push("/events/validation");
      // Reset form data and display success message
    } else if (addSubscriptionResult.status === "rejected") {
      console.log("Subscription failed");
      // Display error message
    } else if (addSubscriptionResult.status === "pending") {
      console.log("Subscription is loading");
      // Show loading spinner or progress bar
    }
  }, [addSubscriptionResult.status, refetchUser, dispatch, router]);
  const t = useTranslations("subscriptions");
  return (
    <div className="flex-grow p-8 bg-white rounded-lg shadow-md justify-center items-center">
      <div className="border-[1.4px] border-gray-400 rounded-lg p-12 mx-32 my-16">
        <div className="flex justify-between items-center">
          <h3 className="poppins-regular text-[18px]">Inscription</h3>
          <p className="flex flex-row justify-between bg-mainBlue px-4 py-2 rounded-[24px] text-white poppins-medium">
            <img
              alt="badg"
              src="/icons/badg.png"
              className="w-[25px] h-[25px] mr-8"
            />
            {pack} Pack
          </p>
        </div>
        <hr className="m-4" />
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <input
                type="text"
                name="fullname"
                disabled
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Nom complet"
                value={user?.fullname}
              />
            </div>
            <div>
              <input
                type="text"
                name="username"
                disabled
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Nom d'utilisateur"
                value={user?.username}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <input
                type="email"
                name="email"
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="E-mail"
                value={user?.email}
                disabled
              />
            </div>
            <div>
              <input
                type="tel"
                name="phone"
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Telephone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <input
                type="text"
                name="company"
                className="w-full px-3 py-2 border rounded-lg"
                placeholder={pack === "Student" ? "Université" : "Entreprise"}
                value={formData.company}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <input
                type="text"
                name="role"
                className="w-full px-3 py-2 border rounded-lg"
                placeholder={
                  pack === "Student" ? "Club Universitaire" : "Profession"
                }
                value={formData.role}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          {pack === "Business" && (
            <div className="mb-4">
              <select
                name="paymentMethod"
                className="w-full px-3 py-2 border rounded-lg text-gray-500"
                value={formData.paymentMethod}
                onChange={handleChange}
                required
              >
                <option value="CIB">CIB</option>
                <option value="Baridi Mob">Baridi Mob</option>
                <option value="CCP">CCP</option>
                <option value="cheque boncaire">Cheque boncaire</option>
              </select>
            </div>
          )}
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="terms"
              name="termsAccepted"
              className="mr-2"
              checked={formData.termsAccepted}
              onChange={handleChange}
              required
            />
            <label htmlFor="terms" className="text-gray-500 poppins-regular">
              {t("accept")}
              <span className="text-mainBlue cursor-pointer ml-1">
                {t("acceptTerms")}
              </span>
            </label>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="text-white py-2 rounded-md bg-mainBlue w-full poppins-medium"
            >
              {t("Inscription")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Subscription;
