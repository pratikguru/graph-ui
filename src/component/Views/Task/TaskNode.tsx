import { Node } from "reactflow";
import { withWrapper } from "../Node/Node";
import { Task } from "./Task";

export const TaskNode = (props: Node): JSX.Element => {
  const Wrapper = withWrapper(Task);
  return (
    <Wrapper {...props} />
  );
};