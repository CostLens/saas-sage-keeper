
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, Settings, GitBranch } from 'lucide-react';

export function WorkflowNodePanel() {
  const onDragStart = (event: React.DragEvent, nodeType: string, label: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.setData('node-label', label);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <Card className="w-64">
      <CardHeader className="py-3">
        <CardTitle className="text-sm">Workflow Nodes</CardTitle>
      </CardHeader>
      <CardContent className="py-2 space-y-2">
        <div 
          className="flex items-center p-2 border rounded-md cursor-grab bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/30 dark:hover:bg-blue-900/50"
          draggable
          onDragStart={(e) => onDragStart(e, 'triggerNode', 'New Trigger')}
        >
          <Bell className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400" />
          <span className="text-sm font-medium">Trigger</span>
        </div>
        
        <div 
          className="flex items-center p-2 border rounded-md cursor-grab bg-green-50 hover:bg-green-100 dark:bg-green-900/30 dark:hover:bg-green-900/50"
          draggable
          onDragStart={(e) => onDragStart(e, 'actionNode', 'New Action')}
        >
          <Settings className="h-4 w-4 mr-2 text-green-600 dark:text-green-400" />
          <span className="text-sm font-medium">Action</span>
        </div>
        
        <div 
          className="flex items-center p-2 border rounded-md cursor-grab bg-amber-50 hover:bg-amber-100 dark:bg-amber-900/30 dark:hover:bg-amber-900/50"
          draggable
          onDragStart={(e) => onDragStart(e, 'conditionNode', 'New Condition')}
        >
          <GitBranch className="h-4 w-4 mr-2 text-amber-600 dark:text-amber-400" />
          <span className="text-sm font-medium">Condition</span>
        </div>
      </CardContent>
    </Card>
  );
}
