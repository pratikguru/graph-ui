import styled from 'styled-components';
import { IPipeline } from '../../Models/Pipelines';
import { Descriptions, DescriptionsProps } from 'antd';
import { Card, Tag } from 'antd';


const Container = styled.div`
  width: 200px;
  height: 100px;
  display: flex;
  background-color: white;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  border: 1px solid #CCC;
  color: black;
  font-family: Montserrat;
  flex-direction: column;
  justify-content: flex-start;
  font-size: 14px;
`;

const Header = styled.div`
  font-weight: 500;
  color: #373737;
  padding: 5px;
  display: flex;
  font-size: 10px;
  align-self: flex-start;
  justify-self: flex-start;
  background: #e2cfff;
  border-radius: 9px 9px 0px 0px;
  width: -webkit-fill-available;
`;

interface PipelinesPropType extends IPipeline {
  onClick: (id: string) => void;
  props: Partial<IPipeline>
}
export const Pipelines = ({ onClick, ...props }: PipelinesPropType): JSX.Element => {
  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'P Name',
      children: props.name,
    },
    {
      key: '2',
      label: 'P Desc',
      children: props.description
    },
    {
      key: '3',
      label: 'Type',
      children: <Tag>{props.type}</Tag>
    }
  ]
  return (
    <Card title={ props.name } style={{ width: 300, border: '1px solid red' }} onClick={() => onClick(props.id)}>
      <Descriptions
        column={1}
        items={items}
      />
      
    </Card>)
};