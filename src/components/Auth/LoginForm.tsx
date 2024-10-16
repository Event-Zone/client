"use client";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "@/navigation";
import {
  useLoginUserMutation,
  useForgotPasswordMutation,
  useUpdateForgotPasswordMutation,
  useGetSubscriptionQuery,
} from "@/store/features/api/apiSlice";
import { resetUserData, setUserData } from "@/store/features/userSlice";
import GoogleLoginButton from "../shared/GoogleLoginButton";
import Spinner from "@/components/shared/Progress";
import MessageDialog from "@/components/shared/Message";
import { useTranslations } from "next-intl";
import {
  resetsubscriptionData,
  setSubscriptionData,
} from "@/store/features/subscriptionSlice";

function LoginForm() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetUserData());
    dispatch(resetsubscriptionData());
  }, []);

  const router = useRouter();
  const [loginUser, loginUserResult] = useLoginUserMutation();
  const [forgotPassword, forgotPasswordResult] = useForgotPasswordMutation();
  const [sendA2F, sendA2FResult] = useUpdateForgotPasswordMutation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [a2fCode, setA2fCode] = useState("");
  const [backupEmail, setBackupEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showA2FForm, setShowA2FForm] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [message, setMessage] = useState<any | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleForgotPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBackupEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await loginUser({
        email: formData.email,
        password: formData.password,
      }).unwrap();
      console.log("User logged in successfully");
    } catch (error) {
      console.error("Error logging in user:", error);
      setMessage({ type: 0, content: "Error logging in user" });
    }
  };

  const handleForgotPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      console.log("Sending password reset link to", backupEmail);
      await forgotPassword(backupEmail).unwrap();
      alert("Password reset link sent to your email");
    } catch (error) {
      console.error("Error sending password reset link:", error);
      setMessage({ type: 0, content: "Error sending password reset link" });
    }
  };
  const t = useTranslations("Login");
  const handleA2fSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("A2F Code:", a2fCode, newPassword);
    try {
      await sendA2F({
        email: backupEmail,
        code: a2fCode,
        password: newPassword,
      }).unwrap();
      console.log("A2F Code submitted:");
    } catch (error) {
      console.error("Error submitting A2F code:", error);
      setMessage({ type: 0, content: "Error submitting A2F code" });
    }
  };

  const {
    data: fetchedSubscriptionData,
    isSuccess,
    error,
    refetch,
  } = useGetSubscriptionQuery(loginUserResult?.data?.user?.subscription, {
    skip: !loginUserResult?.isSuccess,
  });
  useEffect(() => {
    if (isSuccess) {
      dispatch(setSubscriptionData(fetchedSubscriptionData));
      router.replace("/");
    } else if (error) {
      router.replace("/");

      console.error("////Error fetching subscription");
    }
  }, [isSuccess, error]);
  useEffect(() => {
    if (loginUserResult.isSuccess) {
      console.log("User logged in successfully");
      dispatch(setUserData(loginUserResult.data));
    } else if (loginUserResult.isError) {
      console.error("Error logging in user:", loginUserResult.error);
      setMessage({ type: 0, content: "Error logging in user" });
    }
  }, [loginUserResult]);

  useEffect(() => {
    if (forgotPasswordResult.isSuccess) {
      console.log("Password reset link sent successfully");
      setShowA2FForm(true);
    } else if (forgotPasswordResult.isError) {
      console.error(
        "Error sending password reset link:",
        forgotPasswordResult.error
      );
      setMessage({ type: 0, content: "Error sending password reset link" });
    }
  }, [forgotPasswordResult]);

  useEffect(() => {
    if (sendA2FResult.isSuccess) {
      console.log("A2F code submitted successfully");
      setShowA2FForm(false);
      setShowForgotPassword(false);
      setShowPasswordForm(false);
    } else if (sendA2FResult.isError) {
      console.error("Error submitting A2F code:", sendA2FResult.error);
      setMessage({ type: 0, content: "Error submitting A2F code" });
    }
  }, [sendA2FResult]);

  useEffect(() => {
    if (
      a2fCode.length !== 0 &&
      newPassword &&
      confirmNewPassword &&
      newPassword === confirmNewPassword
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [newPassword, confirmNewPassword, a2fCode]);

  return (
    <>
      <form
        onSubmit={
          showForgotPassword ? handleForgotPasswordSubmit : handleSubmit
        }
        className="flex flex-col items-center p-6 md:mx-24"
      >
        <div className="flex flex-col justify-center items-center ">
          <img src="/icons/Union.svg" alt="Logo" className="mb-1" />
          <img src="/images/Logo.svg" alt="Logo" className="mb-6" />
        </div>

        {showA2FForm ? (
          <>
            <label htmlFor="a2fCode">{t("a2fCode")}</label>
            <input
              type="text"
              id="a2fCode"
              value={a2fCode}
              onChange={(e) => setA2fCode(e.target.value)}
              required
              placeholder="xxxxxx"
              className="border border-gray-300 rounded p-4"
            />
            <div>
              <label> {t("newpassword")}</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                style={{
                  border: "1.3px solid gray",
                  borderRadius: "5px",
                  padding: "8px",
                  marginBottom: "10px",
                  width: "100%",
                }}
              />
            </div>
            <div>
              <label> {t("comfirmnewpassword")}</label>
              <input
                type="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                required
                style={{
                  border: "1.3px solid gray",
                  borderRadius: "5px",
                  padding: "8px",
                  marginBottom: "10px",
                  width: "100%",
                }}
              />
            </div>
            <button
              disabled={disabled}
              onClick={handleA2fSubmit}
              type="submit"
              className={`px-4 py-2 rounded-xl mt-3 ${
                !disabled && "bg-mainBlue"
              }`}
            >
              {t("a2fsubmit")}
            </button>
          </>
        ) : !showForgotPassword ? (
          <>
            <div className="w-full mb-4">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="w-full mb-4">
              <input
                type="password"
                name="password"
                placeholder={t("password")}
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <button
              type="submit"
              className="w-full p-2 mb-4 bg-mainBlue text-white rounded"
            >
              {t("submit")}
            </button>
          </>
        ) : (
          <>
            <div className="w-full mb-4">
              <input
                type="email"
                name="email"
                placeholder="email"
                value={backupEmail}
                onChange={handleForgotPasswordChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <button
              type="submit"
              className="w-full p-2 mb-4 bg-mainBlue text-white rounded"
            >
              {t("submitResetLink")}
            </button>
          </>
        )}
        <div className="flex flex-row w-full">
          <button className="flex items-center justify-center w-full p-2 text-titles rounded ">
            <GoogleLoginButton />
          </button>
        </div>
        <div className="flex w-full">
          <p
            className="text-mainBlue poppins-regular cursor-pointer"
            onClick={() => setShowForgotPassword(true)}
          >
            {t("forgotpassword")}
          </p>
        </div>
      </form>
      {loginUserResult.isLoading ||
      forgotPasswordResult.isLoading ||
      sendA2FResult.isLoading ? (
        <Spinner />
      ) : null}
      {message && <MessageDialog message={message} />}
    </>
  );
}

export default LoginForm;
