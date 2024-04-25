import { ReactNode, createContext, useContext, useState } from "react";
import { useAuth } from "./AuthContext";
import useApi from "@/hooks/service/useApi";

type ForgottenPasswordContextType = {
  email: string;
  setEmail: (value: string) => void;
  sentEmail: () => Promise<any>;
  verificationCode: string;
  setVerificationCode: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  rePass: string;
  setRePass: (value: string) => void;
  verifyCode: () => Promise<any>;
  resetPassword: () => Promise<string>;
};

interface ForgottenPasswordProviderProps {
  children: ReactNode;
}

const ForgottenPasswordContext = createContext<ForgottenPasswordContextType>({
  email: "",
  sentEmail: () => Promise.resolve(),
  setEmail: (value: string) => {},
  verificationCode: "",
  setVerificationCode: (value: string) => {},
  password: "",
  setPassword: (value: string) => {},
  rePass: "",
  setRePass: (value: string) => {},

  verifyCode: () => Promise.resolve(),
  resetPassword: () => Promise.resolve(""),
});

export const ForgottenPasswordProvider: React.FC<
  ForgottenPasswordProviderProps
> = ({ children }) => {
  const [email, setEmail] = useState<string>("");
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rePass, setRePass] = useState<string>("");

  const { token } = useAuth();
  const { post } = useApi(token ? token : "");

  const verifyCode = async (): Promise<any> => {
    try {
      const body = {
        email,
        code: verificationCode,
      };
      await post("authentication/forgotten-password/verify-code/", body);
    } catch (error) {
      throw error;
    }
  };
  const sentEmail = async (): Promise<any> => {
    try {
      const url = "authentication/forgotten-password/";
      await post(url, email.toLowerCase());
    } catch (error) {
      throw error;
    }
  };
  const resetPassword = async (): Promise<string> => {
    try {
      const url = "authentication/forgotten-password/reset/";
      const body = {
        email,
        code: verificationCode,
        password,
        re_pass: rePass,
      };
      const data = await post(url, body);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const context = {
    email,
    setEmail,
    sentEmail,
    verificationCode,
    setVerificationCode,
    password,
    setPassword,
    rePass,
    setRePass,

    verifyCode,
    resetPassword,
  };

  return (
    <ForgottenPasswordContext.Provider value={context}>
      {children}
    </ForgottenPasswordContext.Provider>
  );
};

export const useForgottenPassword = () => {
  return useContext(ForgottenPasswordContext);
};
