// import {
//   Navigate,
// } from "react-router-dom";

// import {
//   useAuth,
// } from "../../context/AuthContext";

// function ProtectedRoute({
//   children,
// }) {

//   const { user } =
//     useAuth();

//   if (!user) {

//     return (
//       <Navigate to="/" />
//     );
//   }

//   return children;
// }

// export default ProtectedRoute;

import {
  Navigate,
  useLocation,
} from "react-router-dom";

import {
  useAuth,
} from "../../context/AuthContext";

function ProtectedRoute({
  children,
}) {

  const {
    user,
  } = useAuth();

  const location =
    useLocation();

  /* NOT LOGGED IN */

  if (!user) {

    return (
      <Navigate to="/login" />
    );
  }

  /* USER RESTRICTIONS */

  if (
  user?.role === "User" &&
  ![
    "/dashboard",
    "/employees",
    "/settings"
  ].includes(location.pathname)
) {

  return (
    <Navigate
      to="/dashboard"
    />
  );
}

  return children;
}

export default ProtectedRoute;