import React from 'react';
import { Edge, Handle, NodeToolbar, Position, useEdges, useNodeId } from 'reactflow';

export const SlaveNode = React.memo(
  (
    { isConnectable, data }:
    { isConnectable: boolean, data: { color: string, label: string } }
  ) => {
    const edges = useEdges();
    const nodeId = useNodeId();
    
    const [visible, setVisible] = React.useState<boolean>(false);
    
    const handleToolBarVisibility = (): void => {
      setVisible(!visible);
    };

    const currentEdgeCount = edges.filter((value: Edge) => value.target === nodeId);
  
  return (
    <>
      <Handle
        type="target"
        position={Position.Bottom}
        id="a"
        style={{ top: -5, background: '#555' }}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Left}
        id="a"
        style={{ left: -5, top: 25, background: '#555' }}
        isConnectable={isConnectable}
      />
      <NodeToolbar
        position={'right'}
        isVisible={visible}
      >
        <div style={{
          height: '50px',
          width: 'auto',
          minWidth: '20px',
          padding: '5px', 
          display: 'flex',
          background: '#CCCCCC',
          borderRadius: '2px',
          gap: '5px'
        }}>
          
        </div>  
      </NodeToolbar>
      <div
        onClick={handleToolBarVisibility}
        style={{
          color: 'black',
          border: `1px solid ${currentEdgeCount.length ===0 ? 'red' : 'black'}`,
          backgroundColor: currentEdgeCount.length === 0 ? 'red' : 'yellow',
          width: '150px', height: '50px', 
          borderRadius: '5px', display: 'flex',
          justifyContent: 'center', alignItems: 'center', fontSize: '12px'
        }}>
        {data && data.label}
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        style={{ bottom: -6, top: 'auto', background: '#555' }}
        isConnectable={isConnectable}
      />
    </>
  );
});