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
import { SplashScreen, useSegments } from "expo-router";
import { useRouter } from "expo-router";
import useProtectedRoute from "@/hooks/useProtectedRoute";
import { useQuery } from "@tanstack/react-query";

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

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // const [token, setToken] = useState<string>("1");
  // const [isLoadingToken, setIsLoadingToken] = useState<boolean>(true);
  const [authData, setAuthData] = useState<AuthData>({
    token: null,
    isVerified: true,
    email: "",
  });
  const fetchTokenFromStorage = async () => {
    const tokenFromStorage = await SecureStore.getItemAsync("token");
    return tokenFromStorage ? JSON.parse(tokenFromStorage) : "";
  };

  // useQuerry for getting the user's auth token from the SecureStore and handling the isLoading state
  const {
    data: token,
    isLoading: isLoadingToken,
    isError: tokenIsError,
    error: tokenError,
  } = useQuery({
    queryFn: fetchTokenFromStorage,
    queryKey: ["authToken", authData.token],
  });
  const { post, get, put } = useApi(token);

  useProtectedRoute(token, isLoadingToken, authData.isVerified);

  useEffect(() => {
    const initializeAuth = async () => {
      if (isLoadingToken) return;
      if (token) {
        return await verifyAuthData();
      }
      await logout();
    };
    initializeAuth();
  }, [isLoadingToken]);
  const verifyAuthData = async () => {
    const url = "authentication/verify-token/";
    try {
      const data: LoginResponse = await get(url);
      setAuthData({
        token: data.token,
        email: data.email,
        isVerified: data.is_verified,
      });
      return data;
    } catch (e) {
      console.log("error verifying data:", e);
      logout();
    }
  };

  async function login(body: LoginBody): Promise<LoginResponse> {
    const loginURL = "authentication/login/";

    try {
      const data = await post(loginURL, body);
      await SecureStore.setItemAsync("authData", JSON.stringify(data));
      await SecureStore.setItemAsync("token", JSON.stringify(data.token));
      setAuthData({
        token: data.token,
        isVerified: data.is_verified,
        email: data.email,
      });

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
      });
      await SecureStore.setItemAsync("authData", JSON.stringify(data));
      await SecureStore.setItemAsync("token", JSON.stringify(data.token));
      return data;
    } catch (error) {
      throw error;
    }
  }
  async function logout(): Promise<void> {
    await SecureStore.deleteItemAsync("token");
    await SecureStore.deleteItemAsync("authData");
    setAuthData({
      token: null,
      isVerified: true,
      email: "",
    });
  }
  async function confirmAccount(verificationCode: string): Promise<void> {
    const url = "authentication/verify-account/";
    try {
      await post(url, verificationCode);
      setAuthData((oldData) => ({
        ...oldData,
        isVerified: true,
      }));
    } catch (error) {
      throw error;
    }
  }
  async function resendVerificationCode(): Promise<void> {
    const url = "authentication/resend-confirmation/";
    if (!token) {
      return;
    }
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
    token: token,
    isAuth: token ? true : false,
    email: authData.email,
    isVerified: authData.isVerified,
    onLogin: login,
    onRegister: register,
    onLogout: logout,
    onConfirmAccount: confirmAccount,
    onResendVerificationCode: resendVerificationCode,
    changePassword,
  };
  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
