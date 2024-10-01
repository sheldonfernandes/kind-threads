import React from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../../store/Auth.store";
import { EndpointConst } from "../../constants/endpoints.constant";

export const withAuth = (Component:any) => {
  return function WithAuth(props:any) {
    const { isAuthenticated } = useAuthStore();

    const router = useRouter();

    if (!isAuthenticated) {
      router.push(EndpointConst.LOGIN_PAGE);
      return null;
    }

    return <Component {...props} />;
  };
};

export default withAuth;
