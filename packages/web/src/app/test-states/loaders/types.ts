export type LoaderShape = "circle" | "square" | "diamond";

export type LoaderPattern =
  | "sequential"
  | "spiral"
  | "snake"
  | "rows"
  | "columns"
  | "center"
  | "diagonal"
  | "checker"
  | "cross"
  | "breathe"
  | "reverse"
  | "arch";

export type GridSize = 3 | 4 | 5 | 7;

export type LoaderMeta = {
  id: string;
  label: string;
  description: string;
};
