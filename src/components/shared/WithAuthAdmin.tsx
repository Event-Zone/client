"use client";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/store/store"; // Adjust the import path as necessary
import { useEffect } from "react";
import { selectToken, selectUser } from "@/store/features/userSlice";
import Progress from "./Progress";

const withAuthAdmin = (WrappedComponent: React.ComponentType) => {
  const Wrapper = (props: any) => {
    const router = useRouter();
    const token = useSelector(selectToken);
    const user = useSelector(selectUser);

    useEffect(() => {
      if (!token || !user?.isAdmin) {
        console.log("No token found, redirecting to login page"); // Log or display a
        router.replace("/auth/login"); // Redirect to login page if no token
      }
    }, [token, user]);

    if (!token || !user?.isAdmin) {
      return <Progress />;
    }

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuthAdmin;
