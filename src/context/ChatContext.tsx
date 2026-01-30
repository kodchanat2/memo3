import React, { createContext, useContext, useState, type ReactNode } from 'react';
import type { Todo } from './TodoContext';

interface ChatContextType {
  draft: string;
  editing: Todo | null; // id of todo being edited
  setDraft: (draft: string) => void;
  setEditing: (todo?: Todo) => void;
  clearDraft: () => void;
  setChatRef: (ref: HTMLTextAreaElement | null) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [draft, setDraft] = useState('');
  const [editing, setEditingId] = useState<Todo | null>(null);
  const [chatRef, setChatRef] = React.useState<HTMLTextAreaElement | null>(null);

  const clearDraft = () => {
    setDraft('');
    // Reset height if it was expanded
    if (chatRef) {
      chatRef.style.height = "auto"
    }
  };

  const setEditing = (todo?: Todo) => {
    if (todo) {
      setEditingId(todo);
      setDraft(todo.text);
      chatRef?.focus();
    } else {
      setEditingId(null);
      clearDraft();
    }
  };

  return (
    <ChatContext.Provider value={{ draft, setDraft, clearDraft, editing, setEditing, setChatRef }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
