import { ReactNode } from "react";
import { ToastType } from "react-native-toast-message";

export interface IconProps {
  size: number;
  color: string;
  fill?: string;
  scale?: number;
}

export interface ToastMessageProps {
  type: ToastType;
  text1: string;
  text2?: string;
  icon?: ReactNode;
}
