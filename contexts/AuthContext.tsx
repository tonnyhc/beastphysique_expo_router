import { ReactNode, useContext, useEffect, useState } from "react";
import { createContext } from "react";

import * as SecureStore from "expo-secure-store";
import {
  AuthData,
  LoginBody,
  LoginResponse,
  RegisterBody,
} from "@/types/authTypes";
import useApi from "@/hooks/service/useApi";
import { useSegments } from "expo-router";
import { useRouter } from "expo-router";

type AuthProviderProps = {
  children: ReactNode;
};

interface AuthProps {
  token: string | null;
  email: string | null;
  isVerified: boolean;
  isAuth: boolean | null;
  onRegister: (body: RegisterBody) => Promise<any>;
  onLogin: (body: LoginBody) => Promise<any>;
  onLogout: () => Promise<void>;
  onConfirmAccount: (verificationCode: string) => Promise<void>;
  onResendVerificationCode?: () => Promise<void>;
  // TODO: Can move this to the profile context later on
  setupProfile: boolean;
  // skipSetupProfile: () => void;
  // verifyProfile: () => void;
  changePassword: (password: string, new_password: string) => Promise<void>;
}

export const AuthContext = createContext<AuthProps>({});

function useProtectedRoute(token: string | null, isVerified: boolean) {
  const segments = useSegments();
  const router = useRouter();
  useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";
    if (token && !isVerified) {
      return router.replace("/(auth)/accountVerification");
    }
    if (!token && !inAuthGroup) {
      router.replace("/(auth)/onboarding");
    } else if (token && inAuthGroup) {
      router.replace("/");
    }
  }, [token, segments]);
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authData, setAuthData] = useState<AuthData>({
    token: null,
    isVerified: false,
    email: "",
    // TODO: Can move this to the profile context later on
    setupProfile: false,
  });
  const { post, get, put } = useApi(authData.token || "");
  useProtectedRoute(authData.token, authData.isVerified);

  const loadAuthData = async (): Promise<void> => {
    try {
      const dataFromStorage = await SecureStore.getItemAsync("authData");
      if (dataFromStorage) {
        const data = JSON.parse(dataFromStorage);
        setAuthData({
          token: data.token,
          isVerified: data.is_verified,
          email: data.email,
          setupProfile: data.setup_profile,
        });
      }
    } catch (error) {
      console.error("Failed to load auth data:", error);
    }
  };

  const verifyAuthData = async () => {
    const url = "authentication/verify-token/";
    try {
      const data: LoginResponse = await get(url);
      setAuthData({
        token: data.token,
        setupProfile: false,
        email: data.email,
        isVerified: data.is_verified ? data.is_verified : true,
      });
      return data;
    } catch (e) {
      logout();
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      await loadAuthData();
      if (authData.token) {
        await verifyAuthData();
      }
    };
    initializeAuth();
  }, []);

  async function login(body: LoginBody): Promise<LoginResponse> {
    const loginURL = "authentication/login/";

    try {
      const data = await post(loginURL, body);
      setAuthData({
        token: data.token,
        isVerified: data.is_verified,
        email: data.email,
        setupProfile: false,
      });
      await SecureStore.setItemAsync("authData", JSON.stringify(data));
      return data;
    } catch (error) {
      throw error;
    }
  }
  async function register(body: RegisterBody): Promise<LoginResponse> {
    const registerURL = "authentication/register/";
    try {
      const data = await post(registerURL, body);
      setAuthData({
        token: data.token,
        isVerified: false,
        email: data.email,
        setupProfile: true,
      });
      await SecureStore.setItemAsync("authData", JSON.stringify(data));
      return data;
    } catch (error) {
      throw error;
    }
  }
  async function logout(): Promise<void> {
    await SecureStore.deleteItemAsync("authData");

    setAuthData({
      token: null,
      isVerified: false,
      email: "",
      setupProfile: false,
    });
  }
  async function confirmAccount(verificationCode: string): Promise<void> {
    const url = "authentication/verify-account/";
    try {
      await post(url, verificationCode);
      setAuthData((oldData) => ({
        ...oldData,
        isVerified: true,
        setupProfile: true,
      }));
    } catch (error) {
      throw error;
    }
  }
  async function resendVerificationCode(): Promise<void> {
    const url = "authentication/resend-confirmation/";
    try {
      await get(url);
    } catch (error) {
      throw error;
    }
  }

  async function changePassword(password: string, new_password: string) {
    const data = await put("authentication/change-password/", {
      password,
      new_password,
    });
    return data;
  }

  const context = {
    token: authData.token,
    isAuth: authData.token ? true : false,
    email: authData.email,
    isVerified: authData.isVerified,
    onLogin: login,
    onRegister: register,
    onLogout: logout,
    onConfirmAccount: confirmAccount,
    onResendVerificationCode: resendVerificationCode,
    // TODO: Can move this to the profile context later on
    setupProfile: authData.setupProfile,
    // skipSetupProfile,
    // verifyProfile,
    changePassword,
  };
  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
