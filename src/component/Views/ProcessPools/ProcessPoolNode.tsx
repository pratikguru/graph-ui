import { Node } from "reactflow";
import { withWrapper } from "../Node/Node";
import { ProcessPools } from "./ProcessPools";

export const ProcessPoolNode = (props: Node): JSX.Element => {
  const Wrapper = withWrapper(ProcessPools);
  return (
    <Wrapper {...props} />
  );
};