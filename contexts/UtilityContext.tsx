import ToastMessage from "@/components/common/ToastMessage";
import TickIcon from "@/icons/TickIcon";
import { ToastMessageProps } from "@/types/common";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { View } from "react-native";
import Toast, { ToastType } from "react-native-toast-message";

type UtilityContextProps = {
  setToast: ({
    type,
    text1,
    text2,
    icon,
  }: {
    type: ToastType;
    text1: string;
    text2?: string;
    icon?: ReactNode;
  }) => void;
};

const UtilityContext = createContext<UtilityContextProps>({
  setToast: ({
    type = "error",
    text1 = "",
    text2 = "",
    icon = <View></View>,
  }) => {},
});
interface UtilityProviderProps {
  children: ReactNode;
}

export const UtilityProvider: React.FC<UtilityProviderProps> = ({
  children,
}) => {
  const [toast, setToast] = useState<ToastMessageProps>({
    type: "",
    text1: "",
    text2: "",
    icon: undefined,
  });
  useEffect(() => {
    if (toast.type !== "") {
      Toast.show({});
      setTimeout(() => {
        setToast({
          type: "",
          text1: "",
          text2: "",
          icon: undefined,
        });
        Toast.hide();
      }, 4500);
    }
  }, [toast]);

  const context = {
    setToast,
  };
  return (
    <UtilityContext.Provider value={context}>
      <>
        <ToastMessage
          text1={toast.text1}
          text2={toast.text2}
          icon={toast.icon}
          type={"success"}
        />
        {children}
      </>
    </UtilityContext.Provider>
  );
};

export const useUtilityContext = () => {
  return useContext(UtilityContext);
};
