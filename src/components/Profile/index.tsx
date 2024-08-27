"use client";
import React, { useEffect, useState } from "react";
import {
  useGetSubscriptionQuery,
  useGetUserQuery,
  useUpdateUserMutation,
  useUpdateSubscriptionMutation,
  useSearchEventsByUserQuery,
} from "@/store/features/api/apiSlice";
import { useParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  selectUser,
  setUserData,
  updateUserData,
} from "@/store/features/userSlice";
import EventCard from "./EventCard";

const Profile = () => {
  const [showMyEvents, setShowMyEvents] = useState(false);

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

  const { userId } = useParams();
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
  } = useGetSubscriptionQuery(user?.subscription, {
    skip: !user?.subscription,
  });

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
      console.error("Original form data is not available");

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
    if (showMyEvents) {
      refetchEvents();
    }
  }, [showMyEvents]);
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold">Bienvenue</h1>
            <h2 className="text-2xl font-bold text-gray-800">
              {user?.fullname}
            </h2>
          </div>
          <nav className="flex space-x-8 text-blue-600">
            <a
              onClick={() => setShowMyEvents(false)}
              href="#"
              className="font-semibold"
            >
              Mon Compte
            </a>
            <a
              onClick={() => setShowMyEvents(false)}
              href="#"
              className="font-semibold"
            >
              Support
            </a>
            <a
              href="#"
              onClick={() => setShowMyEvents(!showMyEvents)}
              className="font-semibold"
            >
              Mes Evenement
            </a>
            <a href="/auth/login" className="font-semibold">
              Déconnexion
            </a>
          </nav>
        </div>

        {!showMyEvents ? (
          <>
            {" "}
            <div className="mt-8 flex items-center space-x-6">
              <div className="relative">
                <div>
                  <img
                    className="w-32 h-32 rounded-full object-cover"
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
                <button className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-2">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15.232 5.232a3 3 0 011.768 1.768m-1.768-1.768L19 9m0 0l-4.768 4.768a2 2 0 11-2.828-2.828L16 6.999M5 11V7a2 2 0 012-2h4m-1 10h10m2 0a2 2 0 00-2-2h-4a2 2 0 00-2 2v4a2 2 0 002 2h4a2 2 0 002-2v-4z"
                    ></path>
                  </svg>
                </button>
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-bold">Coordonnées</h3>
              </div>
            </div>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nom complet
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
                <label className="block text-sm font-medium text-gray-700">
                  Nom d'utilisateur
                </label>
                <input
                  type="text"
                  disabled
                  value={user?.username}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
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
                    <label className="block text-sm font-medium text-gray-700">
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
                    <label className="block text-sm font-medium text-gray-700">
                      Votre Profession
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
                    <label className="block text-sm font-medium text-gray-700">
                      Entreprise / Organisation
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
                    <label className="block text-sm font-medium text-gray-700">
                      Adresse du travail
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
                    <label className="block text-sm font-medium text-gray-700">
                      Site web
                    </label>
                    <input
                      type="text"
                      onChange={handleInputChange}
                      name="webSite"
                      value={userInputForm.webSite}
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    />
                  </div>
                  <a
                    href={`/editPassword/${authedUser?._id}`}
                    className="text-mainBlue poppins-regular"
                  >
                    Modifier le mot de passe
                  </a>
                </>
              )}
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
                Sauvegarder
              </button>
            </div>
          </>
        ) : (
          <>
            {events?.length > 0 ? (
              events.map((event: any) => <EventCard event={event} />)
            ) : (
              <p>Aucun événement trouvé.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
