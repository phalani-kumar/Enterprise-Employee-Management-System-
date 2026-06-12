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
      <Navigate
        to="/login"
      />
    );
  }

  /* DEACTIVATED ACCOUNT */

  if (
  user?.status === "Deactivated" &&
  location.pathname !== "/account-deactivated"
) {

  return (
    <Navigate
      to="/account-deactivated"
      replace
    />
  );
}

  /* USER RESTRICTIONS */

  if (
    user?.role === "User" &&
    ![
      "/dashboard",
      "/employees",
      "/settings",
      "/account-deactivated"
    ].includes(
      location.pathname
    )
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