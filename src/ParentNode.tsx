import { Node } from "reactflow";
import { withWrapper } from "./component/Views/Node/Node";
import { Pipelines } from "./component/Views/Pipelines/Pipelines";


export const ParentNode = (props: Node) => {
  const Wrapper = withWrapper(Pipelines);

  return (
    <Wrapper {...props} />
  )
}