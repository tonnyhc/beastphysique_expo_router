import { useRouter, useSegments } from "expo-router";
import { useEffect } from "react";

function useProtectedRoute(
  token: string | null,
  loadingToken: boolean,
  isVerified: boolean
) {
  // This hook checks the token, the loading state of the token and if the account is verified
  // and redirects to the proper routes based on this conditiоns
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";

    if (!token && !inAuthGroup) {
      return router.replace("/(auth)/onboarding");
    }
    if (loadingToken) {
      return;
    }
    if (token && !isVerified) {
      return router.replace("/(auth)/accountVerification");
    }
    if (!token && !inAuthGroup) {
      return router.replace("/(auth)/onboarding");
    }
    return router.replace('/')
    // } else if (token && inAuthGroup) {
    //   return router.replace("/");
    // }
  }, [token, segments, loadingToken, isVerified]);
}

export default useProtectedRoute;
