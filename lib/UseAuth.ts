import { useSelector } from "react-redux";

const UseAuth = () => {
  const { user } = useSelector((state: any) => state.user);
  if (user) {
    return true;
  }
  return false;
};
export default UseAuth;
