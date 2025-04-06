
import { useState, useEffect } from "react";
import { CustomEvent } from "react";

/**
 * A hook that manages the state for a feature flag
 * @param key The localStorage key for the feature flag
 * @param eventName The name of the custom event that this flag will dispatch
 * @returns A tuple containing the current state and a setter function
 */
export function useFeatureFlagState(key: string, eventName?: string): [boolean, (value: boolean) => void] {
  const [enabled, setEnabled] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedValue = localStorage.getItem(key);
      return savedValue === "true"; // Default to false if not "true"
    }
    return false;
  });

  const updateEnabled = (value: boolean) => {
    localStorage.setItem(key, value.toString());
    setEnabled(value);
    
    // Dispatch event if eventName is provided
    if (eventName && typeof window !== 'undefined') {
      const event = new CustomEvent(eventName, {
        detail: { enabled: value }
      });
      window.dispatchEvent(event);
    }
  };

  return [enabled, updateEnabled];
}
