// Helper functions for form data manipulation

// Helper to safely get nested values from objects
export const getNestedValue = (obj: any, path: string) => {
  return path.split(".").reduce((current, key) => current?.[key], obj);
};

// Helper to safely set nested values in objects
export const setNestedValue = (obj: any, path: string, value: any) => {
  const result = { ...obj };
  const keys = path.split(".");
  let current = result;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!current[key] || typeof current[key] !== "object") {
      current[key] = {};
    } else {
      current[key] = { ...current[key] };
    }
    current = current[key];
  }

  current[keys[keys.length - 1]] = value;
  return result;
};

// Format date for display
export const formatDate = (date: string | undefined) => {
  if (!date) return "Not set";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Get status color for badges
export const getStatusColor = (status: string) => {
  switch (status) {
    case "published":
      return "text-green-300 border-green-500";
    case "draft":
      return "text-yellow-300 border-yellow-500";
    case "archived":
      return "text-gray-300 border-gray-500";
    default:
      return "text-gray-300 border-gray-500";
  }
};
