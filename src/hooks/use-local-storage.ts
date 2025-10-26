import { useState, useEffect } from 'react';

/**
 * Custom hook to manage state with localStorage persistence
 * Replaces the useKV hook from spark
 * 
 * @param key - The localStorage key to store the value under
 * @param initialValue - The fallback value when no stored data exists
 * @returns A stateful value and a function to update it
 */
export function useLocalStorage<T>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  // Get stored value from localStorage or use initial value
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error loading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Update localStorage whenever the state changes
  useEffect(() => {
    try {
      const serializedValue = JSON.stringify(storedValue);
      const currentValue = window.localStorage.getItem(key);
      
      // Only update localStorage if the value has actually changed
      if (currentValue !== serializedValue) {
        window.localStorage.setItem(key, serializedValue);
      }
    } catch (error) {
      console.error(`Error saving localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
