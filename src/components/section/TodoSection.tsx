import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { cn } from '@/lib/utils';
import { useTodos, type Todo } from '@/context/TodoContext';
import { Button } from '../ui/button';
import { useChat } from '@/context/ChatContext';

const TodoItem: React.FC<{
  todo: Todo;
  onToggleComplete: (id: string) => void;
  onEdit: (todo: Todo) => void;
  isEditing?: boolean;
}> = ({ todo, onToggleComplete, onEdit, isEditing }) => {
  return (
    <div className={`group flex items-center gap-3 p-3 border-b border-border/40 first:rounded-t-lg last:border-0 last:rounded-b-lg ${isEditing ? 'bg-card text-accent-foreground/50' : 'bg-card/50'}`}>
      <button
        disabled={isEditing}
        onClick={() => onToggleComplete(todo.id)}
        className="text-muted-foreground hover:text-primary transition-colors focus:outline-none disabled:text-muted-foreground/50"
      >
        <Icon
          icon={todo.completed ? 'lucide:check-circle-2' : 'lucide:circle'}
          className={cn("w-6 h-6", todo.completed && "text-primary")}
        />
      </button>
      <span className={cn("flex-1 text-sm font-medium", todo.completed && "line-through text-muted-foreground")}>
        {todo.text}
      </span>
      <Button
        variant="ghost"
        size="icon"
        disabled={isEditing}
        onClick={() => onEdit(todo)}
        className={cn("focus:outline-none transition-colors", todo.flagged ? "text-orange-500" : "text-muted-foreground hover:text-orange-400")}
      >
        <Icon
          icon="lucide:edit"
          className={cn("w-5 h-5", todo.flagged && "fill-current")}
        />
      </Button>
    </div>
  );
};

const TodoSection: React.FC = () => {
  const { todos, toggleComplete, toggleFlag, deleteTodo } = useTodos();
  const { setEditing, editing } = useChat();

  return (
    <div className="w-full bg-background h-full min-h-0 flex flex-col">
      <div className="w-full h-safe bg-foreground/5 shrink-0"></div>
      
      {/* Scrollable List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="flex flex-col rounded-lg border border-border/40 shadow-sm">
          {todos.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground text-sm">
              No tasks yet. Add one below!
            </div>
          ) : (
            todos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggleComplete={toggleComplete}
                onEdit={setEditing}
                isEditing={editing?.id === todo.id}
              />
            ))
          )}
        </div>
      </div>

    </div>
  );
};

export default TodoSection;


