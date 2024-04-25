import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import useApi from "./useApi";

interface useProfileSetupProp {
  url: string;
  onSuccessFn?: () => void;
}

const useProfileSetup = ({ url, onSuccessFn }: useProfileSetupProp) => {
  const { token } = useAuth();
  const { put } = useApi(token as string);

  const requestFn = async (body: any) => {
    return await put(url, body);
  };
  const mutation = useMutation({
    mutationFn: (body: any) => requestFn(body),
    onSuccess: onSuccessFn,
  });

  return mutation;
};

export default useProfileSetup;