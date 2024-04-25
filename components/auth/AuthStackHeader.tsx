import { ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";

// import useKeyboard from "../../hooks/useKeyboard";
import LogoIcon from "@/icons/LogoIcon";

interface AuthStackHeaderProps {
  decreaseOnKeyboard?: boolean,
  decreasedHeight?: number
}

const AuthStackHeader: React.FC<AuthStackHeaderProps> = ({
  decreaseOnKeyboard,
  decreasedHeight
}) => {
//   const keyboard = useKeyboard()
  const heroImage = require("@/assets/images/girl-squat.jpg");

  return (
    <ImageBackground
      source={heroImage}
      style={{
        width: "100%",
        // height: keyboard && decreaseOnKeyboard ? decreasedHeight : 160,a
        height: 160,
        justifyContent: "flex-end",
        borderRadius: 10,
        overflow: "hidden",
      }}
    >
      <View
        style={{
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.3)",
          flex: 1,
          justifyContent: "flex-end",
        }}
      >
        <View style={{ gap: 11, marginBottom: 20, justifyContent: 'center', alignItems: 'center' }}>
          <LogoIcon size={50} color="#fff" />
          <Text
            style={{ color: "#fff", fontFamily: "IntegralBold", fontSize: 16 }}
          >
            BeastPhysique
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
};

export default AuthStackHeader;

const styles = StyleSheet.create({});