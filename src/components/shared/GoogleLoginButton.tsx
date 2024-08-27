import React, { useEffect, useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { useGoogleLoginMutation as useGoogleAuthMutation } from "@/store/features/api/apiSlice";
import { useDispatch } from "react-redux";
import { setUserData } from "@/store/features/userSlice";

const GoogleLoginButton: React.FC = () => {
  const [showFormCode, setShowFormCode] = useState(false);
  const router = useRouter();
  const [a2fCode, setA2fCode] = useState("");

  const dispatch = useDispatch();
  const [googleAuth, googleAuthResult] = useGoogleAuthMutation();

  const handleSuccess = async (response: any) => {
    console.log("token:", response);

    try {
      await googleAuth({ token: response.credential }).unwrap();
      router.replace("/");
    } catch (error) {
      console.error("Error authenticating with Google:", error);
    }
  };

  useEffect(() => {
    if (googleAuthResult.isSuccess) {
      dispatch(setUserData(googleAuthResult.data));
      router.replace("/welcome");
    } else if (googleAuthResult.error) {
      console.error("Error fetching user from Google:", googleAuthResult.error);
    } else if (googleAuthResult.isLoading) {
      console.log("Google login is loading...");
    }
  }, [googleAuthResult, dispatch]);

  const handleFailure = () => {
    console.error("Google login failure");
  };
  const handleA2fSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Process the A2F code here
    console.log("A2F Code submitted:");
    // You can add further logic to handle the A2F code submission
  };
  return (
    <>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
        <GoogleLogin onSuccess={handleSuccess} onError={handleFailure} />
      </GoogleOAuthProvider>
      {showFormCode && (
        <form onSubmit={handleA2fSubmit}>
          <label htmlFor="a2fCode">Enter A2F Code:</label>
          <input
            type="text"
            id="a2fCode"
            value={a2fCode}
            onChange={(e) => setA2fCode(e.target.value)}
            required
          />
          <button type="submit">Submit</button>
        </form>
      )}{" "}
    </>
  );
};

export default GoogleLoginButton;
