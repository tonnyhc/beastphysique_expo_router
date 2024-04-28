import { useCallback, useState } from "react";

interface useRefreshControlProps {
  refreshFn: () => Promise<any>; // Assuming refreshFn is asynchronous
  isLoading: boolean; // Loading state to determine when to stop refreshing
}

const useRefreshControl = ({
  refreshFn,
  isLoading,
}: useRefreshControlProps) => {
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await refreshFn();
    } finally {
      // Ensure that setRefreshing(false) is called even if there's an error
      setRefreshing(false);
    }
  }, [refreshFn, isLoading]);

  return { refreshing, onRefresh };
};

export default useRefreshControl;