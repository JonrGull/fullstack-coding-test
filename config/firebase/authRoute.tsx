import LoadingSpinner from "components/LoadingSpinner";
import Navbar from "components/Navbar";
import { useAuth } from "context/AuthContext";
import { useRouter } from "next/router";
import { ElementType } from "react";

export function Public(Component: ElementType) {
  return function Public({ ...props }) {
    const auth = useAuth();
    const router = useRouter();

    if (auth?.user) {
      router.push("/");
      return <LoadingSpinner />;
    }
    return <Component auth={auth} {...props} />;
  };
}

export function Private(Component: ElementType) {
  return function Private({ ...props }) {
    const auth = useAuth();
    const router = useRouter();

    if (!auth?.user) {
      router.push("/login");
      return <LoadingSpinner />;
    }
    return (
      <>
        <Navbar />
        <Component auth={auth} {...props} />
      </>
    );
  };
}
