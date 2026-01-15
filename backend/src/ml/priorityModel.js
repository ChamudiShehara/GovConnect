// backend/src/ml/priorityModel.js

/**
 * Simple complaint priority predictor
 * Returns one of: "HIGH", "MEDIUM", "LOW"
 *
 * This is a placeholder for a real ML model.
 * Currently, it uses keyword matching from the complaint description.
 */

export const predictPriority = async (description) => {
  if (!description || description.trim() === "") return "MEDIUM";

  const text = description.toLowerCase();

  // High priority keywords
  const highKeywords = ["accident", "urgent", "danger", "emergency", "injury", "fire"];
  // Medium priority keywords
  const mediumKeywords = ["delay", "broken", "problem", "issue", "repair"];
  // Low priority keywords
  const lowKeywords = ["suggestion", "feedback", "request", "query"];

  // Check for high priority
  if (highKeywords.some((word) => text.includes(word))) return "HIGH";

  // Check for medium priority
  if (mediumKeywords.some((word) => text.includes(word))) return "MEDIUM";

  // Check for low priority
  if (lowKeywords.some((word) => text.includes(word))) return "LOW";

  // Default priority
  return "MEDIUM";
};
