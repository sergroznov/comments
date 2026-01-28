import { reactions } from "../mock";
export const useReactions = (reaction) => {
  switch (reaction) {
    case -1:
      return reactions["-1"];
    case 0:
      return reactions[0];
    case 1:
      return reactions[1];
    default:
      return reactions[1];
  }
};
