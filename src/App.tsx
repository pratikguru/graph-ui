/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import './App.css'
import ELK from 'elkjs/lib/elk.bundled.js';
import styled from 'styled-components';
import ReactFlow, { Background, Connection, Controls, Edge, EdgeChange, Handle, MiniMap, Node, NodeChange, NodeToolbar, OnConnect, OnEdgesChange, Position, addEdge, applyEdgeChanges, applyNodeChanges, useReactFlow } from 'reactflow';
import 'reactflow/dist/style.css';
import { ParentNode } from './ParentNode';
import { SlaveNode } from './SlaveNode';
import { IPipeline } from './component/Models/Pipelines';
import ContextMenu from './component/Views/ContextMenu/ContextMenu';
import { ProcessPoolNode } from './component/Views/ProcessPools/ProcessPoolNode';
import { IProcessPool } from './component/Models/ProcessPool';
import { TaskNode } from './component/Views/Task/TaskNode';
import { ITask } from './component/Models/Tasks';


const nodeTypes = {
  parentNode: ParentNode,
  processPoolNode: ProcessPoolNode,
  slaveNode: SlaveNode,
  taskNode: TaskNode
};

const initialNodes = [
  {
    id: '1',
    type: 'parentNode',
    data: { id: '1', name: 'Master Pipeline', type: 'A', description: 'Master Pipeline for data registration.' } as Partial<IPipeline>,
    position: { x: 0, y: 0 },
  },
  {
    id: '2',
    type: 'processPoolNode',
    data: {id: '4456', name: 'Pool 1', type: 'A', pipelineId: '1' } as Partial<IProcessPool>,
    position: {x: 400, y: 0}
  }
];

const initialEdges = [
  { id: 'b-c', source: '1', target: '2', type:'smoothstep' }
];

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  background: white;
`;
const elk = new ELK();



function App() {
  const reactFlowWrapper = React.useRef(null);
  const [nodes, setNodes] = React.useState<Node[]>(initialNodes);
  const [edges, setEdges] = React.useState<Edge[]>(initialEdges);
  
  const [menu, setMenu] = React.useState<any>(null);
  const { screenToFlowPosition, getNode } = useReactFlow();
  const ref = React.useRef(null);
  
  const connectingNodeId = React.useRef(null);

  const onNodesChange = (changes: NodeChange[]) => {
    setNodes((nodes: Node[]) => applyNodeChanges(changes, nodes));
  }

  const onEdgesChange = React.useCallback(
    (changes: EdgeChange[]) => setEdges((eds: Edge[]) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const useLayoutedElements = () => {
  const { getNodes, setNodes, getEdges, fitView } = useReactFlow();
  const defaultOptions = {
    'elk.algorithm': 'layered',
    'elk.layered.spacing.nodeNodeBetweenLayers': 150,
    'elk.spacing.nodeNode': 200,
  };

  const getLayoutedElements = React.useCallback((options) => {
    const layoutOptions = { ...defaultOptions, ...options };
    const graph = {
      id: '1',
      layoutOptions: layoutOptions,
      children: getNodes(),
      edges: getEdges(),
    };

    elk.layout(graph).then(({ children }) => {
      // By mutating the children in-place we saves ourselves from creating a
      // needless copy of the nodes array.
      children.forEach((node) => {
        node.position = { x: node.x, y: node.y };
      });

      setNodes(children);
      window.requestAnimationFrame(() => {
        fitView();
      });
    });
  }, []);

  return { getLayoutedElements };
};

  const onConnect = React.useCallback(
  
    (connection: Connection | Edge) => {
      connectingNodeId.current = null;
      console.log(connection);
      const parentNode = getNode(connection.source || '');
      if (!parentNode) return;
      setEdges((eds: Edge[]) => addEdge({...connection, animated: true, type: 'smoothstep'} , eds));
      const newTargetNode = generateSiblingNode(parentNode, Math.floor(Math.random() * 100).toString());
      setNodes((nds) =>
      nds.map((node) => {
        if (node.id === connection.target) {
          node.data = newTargetNode
        }
        return node;
      })
    );
    },
    [setEdges, getNode]
  );

  const generateSiblingNode = (parentNode: Node, id: string): Partial<IPipeline> | Partial<ITask> | Partial<IProcessPool> => {
    if (parentNode.type === 'parentNode') {
      return {
        id: id, 
        pipelineId: parentNode.id,
        type: 'B',
        description: 'Auto Process Pool Created',
        name: 'Pool ' + Math.floor(Math.random() * 100).toString()
      }
    } else if (parentNode.type === 'processPoolNode') {
      return {
        id: id, 
        name: 'Task ' + Math.floor(Math.random() * 100).toString(), 
        description: 'Auto Task Created.',
        processPoolId: parentNode.data.id,
        taskType: 'X',
        pipelineId: parentNode.data.pipelineId
      }
    } else {
      return {}
    }
  };  

  const onNodeContextMenu = React.useCallback(
    (event: React.MouseEvent, node: Node) => {
      // Prevent native context menu from showing
      event.preventDefault();
      if (!ref.current || !event ) return;
      // Calculate position of the context menu. We want to make sure it
      // doesn't get positioned off-screen.
      const pane = ref.current.getBoundingClientRect();
      
      setMenu({
        node: node, 
        id: node.id,
        top: event.clientY < pane.height - 200 && event.clientY,
        left: event.clientX < pane.width - 200 && event.clientX,
        right: event.clientX >= pane.width - 200 && pane.width - event.clientX,
        bottom:
          event.clientY >= pane.height - 200 && pane.height - event.clientY,
      });
    },
    [setMenu],
  );

  const onPaneClick = React.useCallback(() => setMenu(null), [setMenu]);
  
  const onConnectStart = React.useCallback((_, { nodeId }) => {
    connectingNodeId.current = nodeId;
   }, []);
  
  const onConnectEnd = (event: Event) => {
      
      if (!connectingNodeId.current || !event) return;
    
      const targetIsPane = event.target.classList.contains('react-flow__pane');

      const parentNode = getNode(connectingNodeId.current);
      
      if (targetIsPane && parentNode) {
        const id = Math.floor(Math.random() * 100).toString();
        const newNode = {
          id,
          position: screenToFlowPosition({
            x: event.clientX,
            y: event.clientY,
          }),
          data: generateSiblingNode(parentNode, id),
          origin: [0.5, 0.0],
          type: parentNode.type === 'parentNode' ? 'processPoolNode': 'taskNode'
        };
        
        setNodes((nds: Node[]) => ([...nds, newNode]));
        
        setEdges((edges: Edge[]) => ([...edges, {
          id, 
          source: connectingNodeId.current, target: id, 
          type: 'smoothstep',
          animate: true, 
        }] as Edge[]))
      }
    }

  const { getLayoutedElements } = useLayoutedElements();
  
  document.addEventListener('keydown', e => {
  if (e.ctrlKey && e.key === 's') {
    // Prevent the Save dialog to open
    e.preventDefault();
    // Place your code here
   
    getLayoutedElements({ 'elk.algorithm': 'layered', 'elk.direction': 'RIGHT' })
  }
});

  return (
    <>
      <Container className='wrapper' ref={reactFlowWrapper}>
        <ReactFlow
          ref={ref}
          nodes={nodes}
          edges={edges}
          fitView
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          onConnectStart={onConnectStart}
          onConnectEnd={onConnectEnd}
          onNodeContextMenu={onNodeContextMenu}
        >
          <Background color="#ccc" />
          {menu && <ContextMenu onClick={onPaneClick} {...menu} />}
          <Controls />
          <button
            style={{zIndex: '200', position: 'relative', }}
            onClick={() => { getLayoutedElements({ 'elk.algorithm': 'layered', 'elk.direction': 'RIGHT' }) }}>Re Layout</button>
          <MiniMap
            zoomable
            pannable
          />
          </ReactFlow>
      </Container>
    </>
  )
}

export default App
