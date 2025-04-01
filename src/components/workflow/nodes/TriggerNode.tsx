
import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { Bell } from 'lucide-react';

interface TriggerNodeProps {
  data: {
    label: string;
  };
}

export const TriggerNode = memo(({ data }: TriggerNodeProps) => {
  return (
    <div className="px-4 py-2 rounded-md shadow-sm bg-blue-50 border-2 border-blue-200 text-blue-800 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-200">
      <div className="flex items-center">
        <Bell className="w-4 h-4 mr-2" />
        <div>{data.label}</div>
      </div>
      <Handle type="source" position={Position.Bottom} className="!bg-blue-400" />
    </div>
  );
});
