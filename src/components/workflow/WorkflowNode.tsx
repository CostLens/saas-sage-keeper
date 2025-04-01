
import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

interface WorkflowNodeProps {
  data: {
    label: string;
  };
}

export const WorkflowNode = memo(({ data }: WorkflowNodeProps) => {
  return (
    <div className="px-4 py-2 border-2 border-gray-200 rounded-md bg-white shadow-sm">
      <Handle type="target" position={Position.Top} />
      <div>{data.label}</div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
});
