import { ITask } from '../../Models/Tasks';
import { Card, Descriptions, DescriptionsProps, Tag } from "antd";

interface TaskPropType extends ITask {
  onClick: (id: string) => void;
  props: Partial<ITask>;
}
export const Task = ({ onClick, ...props }: TaskPropType): JSX.Element => {
  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'Task Name',
      children: props.name,
    },
    {
      key: '2',
      label: 'Task ID',
      children: props.id
    },
    {
      key: '3',
      label: 'Parent Pipeline',
      children:<Tag>{props.pipelineId}</Tag>
    },
    {
      key: '4',
      label: 'Process Pool',
      children:<Tag>{props.processPoolId}</Tag>
    },
    {
      key: '5',
      label: 'Task Type',
      children: <Tag>{props.taskType}</Tag>,
    }
  ]
  
  return (
    <Card
      key={props.id}  
      title={props.name} style={{ width: 300, border: '1px solid green' }} onClick={() => onClick(props.id)}>
      <Descriptions
        column={1}
        items={items}
      />
    </Card>)
};