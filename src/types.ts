import { SyntheticEvent } from "react";

export type TodoTask = {
  id: string;
  task: string;
  completed: boolean;
};

export type TaskProps = TodoTask & {
  onMark: (e: SyntheticEvent) => void;
  onDelete: (e: SyntheticEvent) => void;
};
