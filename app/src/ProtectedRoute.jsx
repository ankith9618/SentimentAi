import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Loader from "./Components/Loader.jsx";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  const location = useLocation();

  const [hasTriggeredLogin, setHasTriggeredLogin] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated && !hasTriggeredLogin) {
      setHasTriggeredLogin(true);
      loginWithRedirect({
        appState: { returnTo: location.pathname },
      });
    }
  }, [isLoading, isAuthenticated, hasTriggeredLogin, loginWithRedirect, location]);

  if (isLoading || !isAuthenticated) {
    return <Loader />;
  }

  return children;
};

export default ProtectedRoute;
