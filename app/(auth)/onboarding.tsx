import * as React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Video, ResizeMode } from "expo-av";
import Screen from "@/components/common/Screen";

import Button from "@/components/common/Button";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/contexts/ThemeContext";
import { Link } from "expo-router";

const Onboarding: React.FC = () => {
  const { t } = useTranslation();
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  const videoUrl = require("@/assets/videos/onboarding-video.mp4");
  const { colors } = useTheme();

  React.useEffect(() => {
    if (video) {
      video.current.playAsync();
    }
  }, [video]);

  const styles = StyleSheet.create({
    wrapper: {
      flex: 1,
      justifyContent: "space-between",
    },
    videoWrapper: {
      flex: 1,
      width: "100%",
      borderRadius: 10,
      overflow: "hidden",
      marginBottom: 60,
    },
    textOnVideo: {
      position: "absolute",
      color: colors.white,
      fontFamily: "RobotoMedium",
      fontSize: 20,
      bottom: 50,
      right: 0,
      left: 0,
      textAlign: "center",
      textTransform: "capitalize",
      paddingHorizontal: 30,
    },
  });

  return (
    <Screen>
      <View style={styles.wrapper}>
        {/* video */}
        <View style={styles.videoWrapper}>
          <Video
            ref={video}
            style={{ flex: 1 }}
            source={videoUrl}
            isMuted={true}
            useNativeControls={false}
            resizeMode={ResizeMode.COVER}
            isLooping
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
          />
          <Text style={styles.textOnVideo}>
            {t("screens.onboarding.welcomeMessage")}
          </Text>
        </View>
        {/* buttons */}
        <View style={{ gap: 20 }}>
          <Link href='/register' asChild>
          <Button
            onPress={() => {}}
            text={t("screens.onboarding.getStartedBtn")}
            />
            </Link>
          <Link href="/login" asChild>
            <Button
              type="outlined"
              onPress={() => {}}
              text={t("screens.onboarding.signInBtn")}
            />
          </Link>
        </View>
      </View>
    </Screen>
  );
};

export default Onboarding;
