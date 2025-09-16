// utils/localStorageUtils.js

const STORAGE_KEY = "formOptions";

/**
 * Get options from localStorage for a given field key
 */
export const getOptionsFromStorage = (key, fallback = []) => {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    return Array.isArray(stored[key]) ? stored[key] : fallback;
  } catch (e) {
    console.error("Failed to load options:", e);
    return fallback;
  }
};

/**
 * Save options into localStorage for a given field key
 */
export const saveOptionsToStorage = (key, options) => {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    stored[key] = options;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
  } catch (e) {
    console.error("Failed to save options:", e);
  }
};

/**
 * Clear all saved options (optional helper)
 */
export const clearAllOptions = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error("Failed to clear options:", e);
  }
};
