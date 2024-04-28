import {
  FlatList,
  RefreshControl,
  View,
  Text,
  Image,
  ActivityIndicator,
} from "react-native";
import useWorkoutServices from "@/hooks/service/useWorkoutPlanServices";
import Screen from "@/components/common/Screen";
import useRefreshControl from "@/hooks/useRefreshControl";
import { useQuery } from "@tanstack/react-query";
import WorkoutPlanCard from "@/components/workout-plans/WorkoutPlanCard";
import { useTheme } from "@/contexts/ThemeContext";

const Workouts: React.FC = () => {
  const { colors } = useTheme();
  // TODO: Add data type
  const { getWorkoutPlansByUser } = useWorkoutServices();
  const { data, refetch, isLoading } = useQuery({
    queryFn: getWorkoutPlansByUser,
    queryKey: ["workout-plans"],
  });
  // TODO: Add a skeleton

  const { refreshing, onRefresh } = useRefreshControl({
    refreshFn: refetch,
    isLoading: isLoading,
  });

  return (
    <Screen>
      {/* Workout card */}
      <View style={{ flex: 1 }}>
        <FlatList
          ListHeaderComponent={() => (isLoading ? <ActivityIndicator /> : null)}
          data={data}
          contentContainerStyle={{ flexGrow: 1 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({ item, index }) => (
            <WorkoutPlanCard key={index} plan={item} />
          )}
        />
      </View>
    </Screen>
  );
};

export default Workouts;
