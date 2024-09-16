"use client";
import React, { useEffect, useState } from "react";
import {
  useGetSubscriptionQuery,
  useGetUserQuery,
  useUpdateUserMutation,
  useUpdateSubscriptionMutation,
  useSearchEventsByUserQuery,
} from "@/store/features/api/apiSlice";
import { useRouter } from "@/navigation";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  selectUser,
  setUserData,
  updateUserData,
} from "@/store/features/userSlice";
import EventCard from "./EventCard";
import ContactSection from "./ContactSection";
import Progress from "../shared/Progress";
import { useTranslations } from "next-intl";

const Profile = ({ params: { userId } }: { params: { userId: string } }) => {
  const [page, setPage] = useState<number>(0);

  const authedUser = useSelector(selectUser);

  const dispatch = useDispatch();
  interface IUserForm {
    email?: string;
    fullname?: string;
    profilePicture?: File | string;
    orgName?: string;
    workAddress?: string;
    webSite?: string;
  }

  interface ISubscriptionForm {
    role?: string;
    phone?: string;
    company?: string;
  }
  const router = useRouter();

  const [user, setUser] = useState<any>();
  const [originalUserForm, setOriginalUserForm] = useState<IUserForm>();
  const [originalSubscriptionForm, setOriginalSubscriptionForm] =
    useState<ISubscriptionForm>();

  const [userInputForm, setUserInputForm] = useState<IUserForm>({
    email: undefined,
    fullname: undefined,
    profilePicture: undefined,
    orgName: undefined,
    workAddress: undefined,
    webSite: undefined,
  });

  const [subscriptionInputForm, setSubscriptionInputForm] =
    useState<ISubscriptionForm>({
      role: undefined,
      phone: undefined,
      company: undefined,
    });

  const {
    data: userData,
    isLoading: userIsLoading,
    error: userError,
    refetch: refetchUserData, // Access the refetch function
  } = useGetUserQuery(userId, { skip: !userId });
  const [updateUser, updateUserResult] = useUpdateUserMutation();
  const [updateSubscription, updateSubscriptionResult] =
    useUpdateSubscriptionMutation();

  useEffect(() => {
    if (userData) {
      setUser(userData);
      setUserInputForm(userData);
      setOriginalUserForm(userData);
      if (authedUser._id === userData._id) {
        dispatch(updateUserData(userData));
        console.log("Authed user is the same as the fetched user");
      }
    } else if (userError) {
      console.error("Failed to fetch user data", userError);
    } else if (userIsLoading) {
      console.log("Loading user data...");
    }
  }, [userData]);

  const {
    data: fetchedSubscription,
    error: subError,
    isLoading: subIsLoading,
  } = useGetSubscriptionQuery(userData?.subscription, {
    skip: !userData?.subscription,
  });
  useEffect(() => {
    if (fetchedSubscription) {
      console.log("FETCH", fetchedSubscription);
    } else if (subIsLoading) console.log("Loading");
    else if (subError) console.error("Error", subError);
  }, [fetchedSubscription]);
  useEffect(() => {
    if (fetchedSubscription) {
      setSubscriptionInputForm({
        role: fetchedSubscription?.role,
        phone: fetchedSubscription?.phone,
        company: fetchedSubscription?.company,
      });
      setOriginalSubscriptionForm({
        role: fetchedSubscription?.role,
        phone: fetchedSubscription?.phone,
        company: fetchedSubscription?.company,
      });
    }
  }, [fetchedSubscription]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name in userInputForm) {
      setUserInputForm((prevForm) => ({ ...prevForm, [name]: value }));
    } else {
      setSubscriptionInputForm((prevForm) => ({ ...prevForm, [name]: value }));
    }
  };
  const [eventsData, setEventsData] = useState([]);
  const {
    data: events,
    isError: eventsError,
    isLoading: eventsLoading,
    refetch: refetchEvents, // Access the refetch function
  } = useSearchEventsByUserQuery(userId as string, { skip: !userId });

  useEffect(() => {
    if (eventsError) {
      console.error("Failed to fetch events data", eventsError);
    } else if (eventsLoading) {
      console.log("Loading events data...");
    } else if (events) {
      setEventsData(events);
    }
  }, [events, eventsError, eventsLoading]);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUserInputForm((prevForm) => ({
        ...prevForm,
        profilePicture: e.target.files![0],
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userFormData = new FormData();
    const subscriptionFormData = new FormData();

    if (originalUserForm) {
      Object.entries(userInputForm).forEach(([key, value]) => {
        if (value !== originalUserForm[key as keyof IUserForm]) {
          console.log(key);
          userFormData.append(key, value as string | Blob);
        }
      });
    }
    subscriptionFormData.append("_id", user?.subscription);
    if (originalSubscriptionForm) {
      Object.entries(subscriptionInputForm).forEach(([key, value]) => {
        if (
          value &&
          value !== originalSubscriptionForm[key as keyof ISubscriptionForm]
        ) {
          console.log(key);
          subscriptionFormData.append(key, value as string | Blob);
        }
      });
    }
    try {
      if (
        userFormData.has("fullname") ||
        userFormData.has("profilePicture") ||
        userFormData.has("webSite") ||
        userFormData.has("workAddress")
      ) {
        await updateUser({ _id: user._id, formData: userFormData });
      }

      if (
        subscriptionFormData.has("role") ||
        subscriptionFormData.has("phone") ||
        subscriptionFormData.has("company")
      ) {
        console.log(subscriptionFormData.get("company"));
        await updateSubscription({
          _id: user.subscription,
          formData: subscriptionFormData,
        });
      }
      userFormData.forEach((value, key) => {
        console.log(`Key: ${key}, Value: ${value}`);
      });
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  const isFormChanged =
    JSON.stringify(userInputForm) !== JSON.stringify(originalUserForm) ||
    JSON.stringify(subscriptionInputForm) !==
      JSON.stringify(originalSubscriptionForm);
  useEffect(() => {
    if (updateSubscriptionResult.status === "fulfilled") {
      // setUser(updateSubscriptionResult.data);
      setOriginalSubscriptionForm(updateSubscriptionResult.data);
      setSubscriptionInputForm(updateSubscriptionResult.data);
    } else if (updateUserResult.status === "rejected") {
      console.error("Error updating subsx:", updateUserResult.error);
    } else if (updateUserResult.status === "pending") {
      console.log("Updating subsc...");
    }
  }, [updateSubscriptionResult]);
  useEffect(() => {
    if (updateUserResult.status === "fulfilled") {
      // setUser(updateUserResult.data);
      setOriginalUserForm(updateUserResult.data);
      setUserInputForm(updateUserResult.data);
      refetchUserData();
    } else if (updateUserResult.status === "rejected") {
      console.error("Error updating user:", updateUserResult.error);
    } else if (updateUserResult.status === "pending") {
      console.log("Updating user...");
    }
  }, [updateUserResult]);
  useEffect(() => {
    console.log(userInputForm, subscriptionInputForm);
  }, [userInputForm]);
  useEffect(() => {
    if (page === 1) {
      refetchEvents();
    }
  }, [page]);
  const t = useTranslations("ProfilePage");
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col  py-10">
      <div className="bg-white p-8 rounded-lg shadow-md w-full ">
        <div className="flex md:flex-row flex-col items-center justify-between">
          <div>
            <h1 className="text-xl poppins-regular text-gray-500">
              {t("Welcome")}
            </h1>
            <h2 className="text-[32px] poppins-semibold text-titles">
              {user?.fullname}
            </h2>
          </div>
          <nav className="flex flex-wrap md:space-x-8  text-blue-600">
            <a
              onClick={() => setPage(0)}
              href="#"
              className={`poppins-semibold mr-2 hover:bg-gray-300 p-2 rounded-xl ${
                page === 0 && "bg-gray-300"
              }`}
            >
              {t("MyAccount")}
            </a>
            <a
              onClick={() => {
                setPage(2);
              }}
              href="#"
              className={`poppins-semibold mr-2 hover:bg-gray-300 p-2 rounded-xl ${
                page === 2 && "bg-gray-300"
              }`}
            >
              {t("Support")}
            </a>
            <a
              href="#"
              onClick={() => setPage(3)}
              className={`poppins-semibold mr-2 hover:bg-gray-300 p-2 rounded-xl ${
                page === 3 && "bg-gray-300"
              }`}
            >
              {t("MyEvents")}{" "}
            </a>
            {user?.isAdmin && (
              <a
                href="#"
                onClick={() => router.push("/admin")}
                className={`poppins-semibold mr-2 hover:bg-gray-300 p-2 rounded-xl`}
              >
                Admin
              </a>
            )}
            <a
              href="#"
              onClick={() => router.push("/auth/login")}
              className={`poppins-semibold mr-2 hover:bg-gray-300 p-2 rounded-xl `}
            >
              {t("Logout")}{" "}
            </a>
          </nav>
        </div>

        {page === 0 ? (
          <>
            {" "}
            <div className="mt-8 flex items-center space-x-6">
              <div className="relative">
                <div>
                  <img
                    className="md:w-32 md:h-32 h-[60px] w-[60px] rounded-full object-cover"
                    src={
                      userInputForm.profilePicture instanceof File
                        ? URL.createObjectURL(userInputForm.profilePicture)
                        : user?.profilePicture
                        ? `${process.env.NEXT_PUBLIC_SERVER_URL}event/image/${user.profilePicture}`
                        : "https://via.placeholder.com/150"
                    }
                    alt="Profile"
                  />
                  <input
                    type="file"
                    className="absolute bottom-0 right-0 opacity-0 w-full h-full"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
              <div className="flex-grow">
                <h3 className="md:text-xl hidden md:block poppins-bold">
                  {t("Cord")}{" "}
                </h3>
              </div>
              {fetchedSubscription && (
                <div
                  onClick={() => router.replace("/changeSubscription")}
                  className="flex justify-center items-center poppins-medium cursor-pointer"
                >
                  {fetchedSubscription.pack}{" "}
                  <div>
                    <img
                      className="min-w-[40px] min-h-[40px]"
                      alt={fetchedSubscription._id}
                      src={
                        fetchedSubscription.pack === "Business"
                          ? "/icons/businessIcon.png"
                          : fetchedSubscription.pack === "Starter"
                          ? "/icons/starterIcon.png"
                          : "/icons/studentIcon.png"
                      }
                    />

                    {userData && userData.eventsIds && (
                      <>
                        {userData.eventsIds.length > 0 &&
                          fetchedSubscription.pack === "Starter" && (
                            <p className="poppins-regular text-gray-600">
                              {t("UpgradeToBusinessPack")}{" "}
                            </p>
                          )}
                        {userData.eventsIds.length > 4 &&
                          fetchedSubscription.pack === "Student" && (
                            <p className="poppins-regular text-gray-600">
                              {t("UpgradeToBusinessPack")}{" "}
                            </p>
                          )}
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm poppins-medium text-gray-700">
                  {t("Fullname")}{" "}
                </label>
                <input
                  name="fullname"
                  onChange={handleInputChange}
                  type="text"
                  value={userInputForm.fullname}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>
              <div>
                <label className="block text-sm poppins-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  disabled
                  value={userInputForm.email}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>
              {fetchedSubscription && (
                <>
                  <div>
                    <label className="block text-sm poppins-medium text-gray-700">
                      Mobile
                    </label>
                    <input
                      type="text"
                      value={subscriptionInputForm.phone}
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                      name="phone"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm poppins-medium text-gray-700">
                      {t("YourProfession")}{" "}
                    </label>
                    <input
                      type="text"
                      onChange={handleInputChange}
                      name="role"
                      value={subscriptionInputForm.role}
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm poppins-medium text-gray-700">
                      {t("Company")}{" "}
                    </label>
                    <input
                      type="text"
                      onChange={handleInputChange}
                      name="company"
                      value={subscriptionInputForm.company}
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm poppins-medium text-gray-700">
                      {t("WorkAddress")}{" "}
                    </label>
                    <input
                      type="text"
                      onChange={handleInputChange}
                      name="workAddress"
                      value={userInputForm.workAddress}
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm poppins-medium text-gray-700">
                      {t("Website")}{" "}
                    </label>
                    <input
                      type="text"
                      onChange={handleInputChange}
                      name="webSite"
                      value={userInputForm.webSite}
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    />
                  </div>
                </>
              )}{" "}
              <a
                onClick={() => router.push(`/editPassword/${authedUser?._id}`)}
                href="#"
                className="text-mainBlue poppins-regular"
              >
                {t("ChangePassword")}{" "}
              </a>
            </div>
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                className={`px-4 py-2 bg-blue-500 text-white rounded-md ${
                  !isFormChanged ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={handleSubmit}
                disabled={!isFormChanged}
              >
                {t("Save")}{" "}
              </button>
            </div>
          </>
        ) : page === 3 ? (
          <div className="flex flex-wrap">
            {eventsData?.length > 0 ? (
              eventsData.map((event: any) => (
                <EventCard refetchEvents={refetchEvents} event={event} />
              ))
            ) : (
              <p> {t("NoEventsFound")} .</p>
            )}
          </div>
        ) : (
          <ContactSection />
        )}
      </div>
      {(eventsLoading || subIsLoading || userIsLoading) && <Progress />}
    </div>
  );
};

export default Profile;
