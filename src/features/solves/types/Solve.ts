export type Solve = {
  id: string;
  time: number;
  timestamp: number;
  penalty: "NONE" | "+2" | "DNF";
};