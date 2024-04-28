import BackButton from "@/components/common/BackButton";
import StackHeader from "@/components/common/StackHeader";
import { Stack, router } from "expo-router";

const CreateWorkoutPlanLayout:React.FC = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{
        header: () => <StackHeader headerLeft={<BackButton onPress={() => router.back()}/>} headerTitle="Create workout plan"/>
      }}/>
    </Stack>
  );
};

export default CreateWorkoutPlanLayout;
