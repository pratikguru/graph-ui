import { IProcessPool } from '../../Models/ProcessPool';
import { Card, Descriptions, DescriptionsProps, Tag } from 'antd';

interface ProcessPoolPropType extends IProcessPool {
  onClick: (id: string) => void;
  props: Partial<IProcessPool>;
}

export const ProcessPools = ({onClick, ...props}: ProcessPoolPropType ): JSX.Element => {
const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'Process Name',
      children: props.name,
  },
  {
    key: '2',
    label: 'Process Type',
    children: <Tag>{ props.type}</Tag>
    },
    {
      key: '3',
      label: 'Parent Pipeline',
      children:<Tag>{props.pipelineId}</Tag>
  },
  {
    key: '4',
    label: 'Id',
    children: props.id
    }
  ]
  return (
    <Card title={ props.name } style={{ width: 300, border: '1px solid blue' }} onClick={() => onClick(props.id)}>
      <Descriptions
        column={1}
        items={items}
      />
    </Card>)
};