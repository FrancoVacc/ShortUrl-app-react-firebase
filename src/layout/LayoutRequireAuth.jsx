import { useUserContext } from "../context/UserProvider";
import { Navigate, Outlet } from "react-router-dom";

const RequireAuth = () => {
  const { user } = useUserContext();

  if (!user) return <Navigate to="/login" />;

  return (
    <div className="bg-[url('./img/fondo.png')]  py-5">
      <Outlet />
    </div>
  );
};

export default RequireAuth;
