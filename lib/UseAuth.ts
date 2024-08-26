import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { useSelector } from "react-redux";

const UseAuth = () => {
  // Fetch user data from the API
  const { data, isLoading } = useLoadUserQuery(undefined, { skip: false });

  // Get user data from Redux state (this hook must always be called)
  const user = useSelector((state: any) => state.user.user);

  // Handle loading state and return appropriate authentication status
  if (isLoading) {
    return { isAuthenticated: false, isLoading: true };
  }

  // If user exists, return true, otherwise return false
  return { isAuthenticated: !!user, isLoading: false };
};

export default UseAuth;
