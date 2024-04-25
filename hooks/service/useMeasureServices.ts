import { useAuth } from "@/contexts/AuthContext";
import useApi from "./useApi";

const useMeasuresServices = () => {
  const { token } = useAuth();
  const { get, put } = useApi(token as string);

  const url = "health/measures/";
  const fetchWeightData = async (): Promise<{
    last_weigh_in: string;
    weight: number;
    logs: {
      weight: number;
      date: string;
    }[];
  }> => {
    const data = await get(url + "weight/");
    return data;
  };

  const updateMeasures = async (body: {
    height?: number;
    weight?: number;
  }): Promise<null> => {
    console.log("asd");
    const data = await put(url + "edit/", body);
    return data;
  };

  return { fetchWeightData, updateMeasures };
};

export default useMeasuresServices;