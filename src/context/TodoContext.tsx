import React from 'react';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  flagged: boolean;
}

interface TodoContextType {
  todos: Todo[];
  addTodo: (text: string) => void;
  editTodo: (id: string, text: string) => void;
  toggleComplete: (id: string) => void;
  toggleFlag: (id: string) => void;
  deleteTodo: (id: string) => void;
}

const TodoContext = React.createContext<TodoContextType | undefined>(undefined);

const STORAGE_KEY = 'memo3_todos';

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [todos, setTodos] = React.useState<Todo[]>(() => {
    try {
      const storedTodos = localStorage.getItem(STORAGE_KEY);
      return storedTodos ? JSON.parse(storedTodos) : [];
    } catch (error) {
      console.error('Failed to load todos from localStorage', error);
      return [];
    }
  });

  React.useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch (error) {
      console.error('Failed to save todos to localStorage', error);
    }
  }, [todos]);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
      flagged: false,
    };
    setTodos(prev => [...prev, newTodo]);
  };

  const editTodo = (id: string, text: string) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, text } : todo
    ));
  };

  const toggleComplete = (id: string) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const toggleFlag = (id: string) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, flagged: !todo.flagged } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, editTodo, toggleComplete, toggleFlag, deleteTodo }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodos = () => {
  const context = React.useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodos must be used within a TodoProvider');
  }
  return context;
};
