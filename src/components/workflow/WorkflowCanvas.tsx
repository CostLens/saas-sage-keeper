
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

// Sample workflow templates
const workflowTemplates = {
  "workflow-1": {
    nodes: [
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
      },
      {
        id: '4',
        type: 'actionNode',
        position: { x: 100, y: 350 },
        data: { label: 'IT Onboarding' }
      },
      {
        id: '5',
        type: 'actionNode',
        position: { x: 400, y: 350 },
        data: { label: 'Sales Onboarding' }
      }
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e2-3', source: '2', target: '3' },
      { id: 'e3-4', source: '3', target: '4' },
      { id: 'e3-5', source: '3', target: '5' }
    ]
  },
  "workflow-2": {
    nodes: [
      {
        id: '1',
        type: 'triggerNode',
        position: { x: 250, y: 50 },
        data: { label: 'License Management' }
      },
      {
        id: '2',
        type: 'conditionNode',
        position: { x: 250, y: 150 },
        data: { label: 'Check Available Licenses' }
      },
      {
        id: '3',
        type: 'actionNode',
        position: { x: 250, y: 250 },
        data: { label: 'Assign License' }
      }
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e2-3', source: '2', target: '3' }
    ]
  },
  "workflow-3": {
    nodes: [
      {
        id: '1',
        type: 'triggerNode',
        position: { x: 250, y: 50 },
        data: { label: 'Employee Offboarding' }
      },
      {
        id: '2',
        type: 'actionNode',
        position: { x: 250, y: 150 },
        data: { label: 'Revoke Access' }
      },
      {
        id: '3',
        type: 'actionNode',
        position: { x: 250, y: 250 },
        data: { label: 'Reassign Licenses' }
      },
      {
        id: '4',
        type: 'actionNode',
        position: { x: 250, y: 350 },
        data: { label: 'Archive User Data' }
      }
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e2-3', source: '2', target: '3' },
      { id: 'e3-4', source: '3', target: '4' }
    ]
  },
  "workflow-4": {
    nodes: [
      {
        id: '1',
        type: 'triggerNode',
        position: { x: 250, y: 50 },
        data: { label: 'Budget Threshold' }
      },
      {
        id: '2',
        type: 'conditionNode',
        position: { x: 250, y: 150 },
        data: { label: 'Check Spending' }
      },
      {
        id: '3',
        type: 'actionNode',
        position: { x: 250, y: 250 },
        data: { label: 'Send Alert' }
      }
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e2-3', source: '2', target: '3' }
    ]
  }
};

// Default nodes and edges for new workflows
const initialNodes = [
  {
    id: '1',
    type: 'triggerNode',
    position: { x: 250, y: 50 },
    data: { label: 'Start Workflow' }
  },
  {
    id: '2',
    type: 'actionNode',
    position: { x: 250, y: 150 },
    data: { label: 'First Action' }
  }
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' }
];

interface WorkflowCanvasProps {
  workflowId: string | null;
}

export function WorkflowCanvas({ workflowId }: WorkflowCanvasProps) {
  // Get workflow data based on ID or use default
  const workflowData = workflowId && workflowTemplates[workflowId as keyof typeof workflowTemplates] 
    ? workflowTemplates[workflowId as keyof typeof workflowTemplates]
    : { nodes: initialNodes, edges: initialEdges };

  const [nodes, setNodes, onNodesChange] = useNodesState(workflowData.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(workflowData.edges);

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
