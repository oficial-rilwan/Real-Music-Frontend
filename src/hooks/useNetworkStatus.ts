import { useState, useEffect } from "react";

const useNetworkStatus = () => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    window.addEventListener("online", () => setIsConnected(true));
    window.addEventListener("offline", () => setIsConnected(false));
  }, []);
  return { isConnected };
};

export default useNetworkStatus;
