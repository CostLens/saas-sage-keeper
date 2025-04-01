
import React, { useState, useCallback } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  Panel
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Card, CardContent } from '@/components/ui/card';
import { WorkflowNodePanel } from './WorkflowNodePanel';
import { WorkflowNode } from './WorkflowNode';
import { TriggerNode } from './nodes/TriggerNode';
import { ActionNode } from './nodes/ActionNode';
import { ConditionNode } from './nodes/ConditionNode';

// Define custom node types
const nodeTypes = {
  workflowNode: WorkflowNode,
  triggerNode: TriggerNode,
  actionNode: ActionNode,
  conditionNode: ConditionNode
};

const initialNodes = [
  {
    id: '1',
    type: 'triggerNode',
    position: { x: 250, y: 50 },
    data: { label: 'User Onboarding' }
  },
  {
    id: '2',
    type: 'actionNode',
    position: { x: 250, y: 150 },
    data: { label: 'Assign Licenses' }
  },
  {
    id: '3',
    type: 'conditionNode',
    position: { x: 250, y: 250 },
    data: { label: 'Check Department' }
  }
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3', source: '2', target: '3' }
];

export function WorkflowCanvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const reactFlowBounds = document.querySelector('.react-flow')?.getBoundingClientRect();
      if (!reactFlowBounds) return;

      const type = event.dataTransfer.getData('application/reactflow');
      const label = event.dataTransfer.getData('node-label');
      
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = {
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      };

      const newNode = {
        id: `${nodes.length + 1}`,
        type,
        position,
        data: { label: label || `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [nodes, setNodes]
  );

  return (
    <Card className="flex flex-col h-[calc(100vh-220px)] min-h-[500px]">
      <CardContent className="flex-1 p-0">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          onDragOver={onDragOver}
          onDrop={onDrop}
          fitView
        >
          <Controls />
          <MiniMap />
          <Background color="#aaa" gap={16} />
          <Panel position="top-left">
            <WorkflowNodePanel />
          </Panel>
        </ReactFlow>
      </CardContent>
    </Card>
  );
}
