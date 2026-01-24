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

  // High priority keywords//
  const highKeywords = ["accident", "urgent", "danger", "emergency", "injury", "fire","burning", "burn", 
    "sparks","broken electric","broken","death",
  "electric wire", "broken electric", "electric pole", "transformer",
  "electricity", "power outage","hospital", "emergency", "overcrowded",
  "flood", "overflow", "water overflow", "blocked drainage", "canal overflow", "sewer",
  "accident", "potholes", "road broken", "bridge cracks","sleep karanna baha", "late night noise", "night club",
  "loud music", "sound system","pollution",
  "unauthorized construction", "public land block"];
  


  // Medium priority keywords//
  const mediumKeywords = ["delay",  "problem", "issue", "street light", "flickering",
  "garbage", "waste", "bad smell", "rats","noise", "disturbance", "factory noise",
  "illegal parking", "traffic", "road block","not working"
  ,"access road","canal block", "water logging", "drainage",
  "delay", "interrupted","not maintained", "not functioning","repair"];

  
  // Low priority keywords
  const lowKeywords = ["suggestion", "feedback",
  "not swept",
  "maintenance request",
  "information","request", "query"];

  // Check for high priority
  if (highKeywords.some((word) => text.includes(word))) return "HIGH";

  // Check for medium priority
  if (mediumKeywords.some((word) => text.includes(word))) return "MEDIUM";

  // Check for low priority
  if (lowKeywords.some((word) => text.includes(word))) return "LOW";

  // Default priority
  return "MEDIUM";
};
