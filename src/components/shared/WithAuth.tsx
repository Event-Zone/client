import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/store/store"; // Adjust the import path as necessary
import { useEffect } from "react";
import { selectToken } from "@/store/features/userSlice";

const withAuth = (WrappedComponent: any) => {
  const Wrapper = (props: any) => {
    const router = useRouter();
    const token = useSelector(selectToken);

    useEffect(() => {
      if (!token) {
        console.log("No token found, redirecting to login page"); // Log or display a
        router.replace("/auth/login"); // Redirect to login page if no token
      }
    }, [token]);

    if (!token) {
      return null; // Render nothing or a loading spinner while redirecting
    }

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;
