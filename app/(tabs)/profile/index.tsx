import { View, Text, RefreshControl, Modal, Alert, Image, ScrollView } from "react-native";
import React, { ReactNode } from "react";

import { useQuery } from "@tanstack/react-query";
import { useTheme } from "@/contexts/ThemeContext";
import useProfileServices from "@/hooks/service/useProfileServices";
import { emptyUserProfile } from "@/utils/mapData";
import useRefreshControl from "@/hooks/useRefreshControl";
import Screen from "@/components/common/Screen";
import ProfileScreenHeader from "@/components/profile/ProfileScreenHeader";


const ProfileScreen: React.FC = () => {
  const { colors } = useTheme();
  const { fetchProfile } = useProfileServices();
  const { data: profileData, isLoading: isLoadingProfileData, refetch: refetchProfileData } = useQuery({
    queryFn: () => fetchProfile(),
    queryKey: ["user-profile"],
    initialData: emptyUserProfile,
  });
  const { onRefresh, refreshing } = useRefreshControl({
    refreshFn: () => {
      return refetchProfileData()
    },
    isLoading: false,
  });
  
  return (
    <Screen>
      <ScrollView refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={refreshing}/> }>
        <ProfileScreenHeader profile_data={profileData}/>
      </ScrollView>
    </Screen>
  );
};

export default ProfileScreen;