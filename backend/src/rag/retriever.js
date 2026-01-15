import DepartmentVector from "../models/DepartmentVector.js";
import { embedText } from "./embedder.js";

export const retrieveRelevantDepartments = async (text) => {
  const embedding = await embedText(text);

  return DepartmentVector.aggregate([
    {
      $vectorSearch: {
        index: "embedding",
        path: "embedding",
        queryVector: embedding,
        numCandidates: 50,
        limit: 3,
      },
    },
  ]);
};
