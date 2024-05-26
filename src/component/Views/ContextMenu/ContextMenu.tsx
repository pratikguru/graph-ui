import { useCallback } from 'react';

import { useReactFlow } from 'reactflow';
import styled from 'styled-components';

const Container = styled.div`
  background: white;
  box-shadow: 10px 19px 20px rgba(0, 0, 0, 10%);
  position: absolute;
  z-index: 10;
  border: 1px solid black;
  border-radius: 5px;
  padding: 2px;
  display: flex;
  flex-direction: column;

  .context-menu button {
    border: none;
    display: block;
    margin: 10px;
    text-align: left;
    width: 100%;
  }

  .context-menu button:hover {
    background: white;
  }
`

export default function ContextMenu({
  node,
  id, 
  top, 
  left,
  right, 
  bottom,
  ...props
}: any) {
  const { getNode, setNodes, addNodes, setEdges } = useReactFlow();


  const duplicateNode = useCallback(() => {
    const node = getNode(id);
     if (!node) return;
    const position = {
      x: node?.position.x + 50,
      y: node?.position.y + 50
    };

    addNodes({
      ...node,
      selected: false,
      dragging: false,
      id: `${Math.random()}`,
      data: {

      },
      position,
    });
  }, [id, getNode, addNodes]);

  const addProcess = useCallback(() => {
    const node = getNode(id);
     if (!node) return;
    const position = {
      x: node?.position.x + 250,
      y: node?.position.y + 0
    };

    addNodes({
      ...node, 
      selected: false, 
      dragging: false, 
      id: `${Math.random()}`,
      position, 
      type: 'processPoolNode',
      data: {
       
      }
    })

  }, [id, getNode, addNodes]);

  const addTask = useCallback(() => {
    const node = getNode(id);
    if (!node) return;
    const position = {
      x: node?.position.x + 250,
      y: node?.position.y + 0
    };

    addNodes({
      ...node, 
      selected: false, 
      dragging: false, 
      id: `${Math.random()}`,
      position, 
      type: 'taskNode',
      data: {
        
      }
    })
  }, [id, getNode, addNodes]);

  const deleteNode = useCallback(() => {
    setNodes((nodes) => nodes.filter((node) => node.id !== id));
    setEdges((edges) => edges.filter((edge) => edge.id !== id));
  }, [id, setNodes, setEdges]);

  console.log(props)
  return (
    <Container
      style={{ top, left, right, bottom }}
      className="context-menu"
      {...props}
    >
      <p style={{ margin: '0.5em' }}>
        <small>{ node?.data?.name }</small>
      </p>
      <button onClick={duplicateNode}>Duplicate</button>
      <button onClick={deleteNode}>Delete</button>
      <button onClick={addProcess}>Add Process Pool</button>
      <button onClick={addTask}>Add Task</button>
    </Container>
  )

}