"use client";
import {
  useAddSubscriptionMutation,
  useGetSubscriptionQuery,
  useGetUserQuery,
} from "@/store/features/api/apiSlice";
import { selectUser, updateUserData } from "@/store/features/userSlice";
import { useRouter } from "@/navigation";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslations } from "next-intl";
import { setSubscriptionData } from "@/store/features/subscriptionSlice";
import TermsConditions from "./TermsConditions"; // Import the TermsConditions component

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

  const [showTerms, setShowTerms] = useState(false); // State to toggle the terms dialog

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
    } catch (error) {
      // Handle error
    }
  };

  const {
    data: fetchedSubscription,
    error,
    isLoading,
    refetch,
  } = useGetSubscriptionQuery(user.subscription, { skip: !user?.subscription });

  useEffect(() => {
    if (fetchedSubscription) {
      console.log("fetchedSubscriptionDESS", fetchedSubscription);
      dispatch(setSubscriptionData(fetchedSubscription));
    } else if (error) {
      console.error("error fetching subscription", error);
    }
  }, [fetchedSubscription, error]);

  useEffect(() => {
    if (addSubscriptionResult.status === "fulfilled") {
      console.log("Subscription successful");
      refetchUser().then((result) => {
        if (result.data) {
          dispatch(updateUserData(result.data));
        }
      });
      if (addSubscriptionResult?.data?.pack === "Business")
        router.push("/events/validation");
      else router.replace("/");
    }
  }, [addSubscriptionResult.status, refetchUser, dispatch, router]);

  const t = useTranslations("subscriptions");

  return (
    <div className="flex-grow md:p-8 bg-white rounded-lg shadow-md justify-center items-center overflow-hidden">
      <div className="border-[1.4px] border-gray-400 rounded-lg p-12 md:mx-32 md:my-16">
        <div className="flex md:flex-row flex-col justify-between items-center">
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
          </div>
          <div className="flex flex-col md:grid grid-cols-2 gap-4 mb-4">
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
              <span
                onClick={() => setShowTerms(true)} // Show the terms dialog on click
                className="text-mainBlue cursor-pointer ml-1 underline"
              >
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

      {/* Terms and Conditions Dialog */}
      {showTerms && <TermsConditions setShow={setShowTerms} />}
    </div>
  );
}

export default Subscription;
