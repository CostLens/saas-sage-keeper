
import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { GitBranch } from 'lucide-react';

interface ConditionNodeProps {
  data: {
    label: string;
  };
}

export const ConditionNode = memo(({ data }: ConditionNodeProps) => {
  return (
    <div className="px-4 py-2 rounded-md shadow-sm bg-amber-50 border-2 border-amber-200 text-amber-800 dark:bg-amber-900/30 dark:border-amber-800 dark:text-amber-200">
      <Handle type="target" position={Position.Top} className="!bg-amber-400" />
      <div className="flex items-center">
        <GitBranch className="w-4 h-4 mr-2" />
        <div>{data.label}</div>
      </div>
      <Handle type="source" position={Position.Bottom} className="!bg-amber-400" />
      <Handle type="source" position={Position.Right} id="true" className="!bg-amber-400" />
      <Handle type="source" position={Position.Left} id="false" className="!bg-amber-400" />
    </div>
  );
});
