import React, { type ReactNode } from 'react';
import { TodoProvider } from './TodoContext';
import { ChatProvider } from './ChatContext';

export const AppProviders: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <TodoProvider>
      <ChatProvider>
        {children}
      </ChatProvider>
    </TodoProvider>
  );
};
