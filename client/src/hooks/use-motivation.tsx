import { useState, useEffect } from "react";
import { useProductivityData } from "./use-productivity-data";

interface MotivationState {
  showPopup: boolean;
  lastShown: number;
  interval: number; // in minutes
}

export function useMotivation() {
  const { data } = useProductivityData();
  const [motivationState, setMotivationState] = useState<MotivationState>({
    showPopup: false,
    lastShown: 0,
    interval: 30, // Show every 30 minutes
  });

  useEffect(() => {
    const checkMotivation = () => {
      const now = Date.now();
      const timeSinceLastShown = now - motivationState.lastShown;
      const intervalMs = motivationState.interval * 60 * 1000;

      // Show motivation popup if enough time has passed
      if (timeSinceLastShown >= intervalMs) {
        setMotivationState(prev => ({
          ...prev,
          showPopup: true,
          lastShown: now,
        }));
      }
    };

    // Initial delay of 30 seconds for demo, then check every minute
    const initialTimeout = setTimeout(checkMotivation, 30 * 1000);
    const intervalId = setInterval(checkMotivation, 60 * 1000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(intervalId);
    };
  }, [motivationState.interval]);

  const closeMotivation = () => {
    setMotivationState(prev => ({
      ...prev,
      showPopup: false,
    }));
  };

  const setMotivationInterval = (minutes: number) => {
    setMotivationState(prev => ({
      ...prev,
      interval: minutes,
    }));
  };

  return {
    showMotivation: motivationState.showPopup,
    closeMotivation,
    setMotivationInterval,
    userData: data,
  };
}