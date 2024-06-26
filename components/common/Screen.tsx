import { useTheme } from "@/contexts/ThemeContext";
import { useHeaderHeight } from "@react-navigation/elements";
import { ReactNode } from "react";
import {
  View,
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
  ViewStyle,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
// import { useTheme } from "../../contexts/ThemeContext";

interface ScreenProps {
  children: ReactNode;
  closeKeyboardOnClick?: boolean;
  styles?: ViewStyle;
}

const Screen: React.FC<ScreenProps> = ({
  children,
  closeKeyboardOnClick,
  styles,
}) => {
  const { colors } = useTheme();
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.bg, paddingTop: 12 }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={useHeaderHeight()}
        style={{ flex: 1 }}
      >
        {closeKeyboardOnClick ? (
          <TouchableWithoutFeedback
            style={{ flexGrow: 1 }}
            onPress={() => Keyboard.dismiss()}
            accessible={false}
          >
            <View
              style={{
                paddingLeft: 16,
                paddingRight: 16,
                paddingTop: 12,
                flex: 1,
                ...styles,
              }}
            >
              {children}
            </View>
          </TouchableWithoutFeedback>
        ) : (
          <View
            style={{
              paddingLeft: 16,
              paddingRight: 16,
              paddingTop: 12,
              flex: 1,
              ...styles,
            }}
          >
            {children}
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default Screen;
