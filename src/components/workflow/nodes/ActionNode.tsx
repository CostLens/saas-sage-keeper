
import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { Settings } from 'lucide-react';

interface ActionNodeProps {
  data: {
    label: string;
  };
}

export const ActionNode = memo(({ data }: ActionNodeProps) => {
  return (
    <div className="px-4 py-2 rounded-md shadow-sm bg-green-50 border-2 border-green-200 text-green-800 dark:bg-green-900/30 dark:border-green-800 dark:text-green-200">
      <Handle type="target" position={Position.Top} className="!bg-green-400" />
      <div className="flex items-center">
        <Settings className="w-4 h-4 mr-2" />
        <div>{data.label}</div>
      </div>
      <Handle type="source" position={Position.Bottom} className="!bg-green-400" />
    </div>
  );
});
