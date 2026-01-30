import React from 'react'
import { Icon } from '@iconify/react'
import { Button } from '@/components/ui/button'
import SideSheet from '@/components/section/SideSheet'
import Chatbar from '@/components/section/Chatbar'
import TodoSection from '@/components/section/TodoSection'
import { useTodos } from '@/context/TodoContext'
import { useChat } from '@/context/ChatContext'

export default function Todo() {
  const [isSideSheetOpen, setIsSideSheetOpen] = React.useState(false)
  const { addTodo, editTodo } = useTodos()
  const { editing, setEditing } = useChat()

  const handleAddTodo = (msg: string) => {
    if (editing) {
      editTodo(editing.id, msg);
      setEditing();
    } else {
      addTodo(msg);
    }
  };

  return (
    <div className="relative h-dvh w-full overflow-hidden bg-gray-100">
      {/* Map Background */}
      <TodoSection />

      {/* Side Sheet */}
      <SideSheet open={isSideSheetOpen} onOpenChange={setIsSideSheetOpen} />

      {/* Top UI Container (Hamburger Only) */}
      <div className="absolute top-4 left-0 z-10">
        <Button
          variant="secondary"
          className="h-10 pl-4 pr-3 rounded-r-full shadow-md transition-all hover:pl-6 hover:scale-105"
          onClick={() => setIsSideSheetOpen(true)}
        >
          <Icon icon="lucide:menu" className="h-6 w-6" />
        </Button>
      </div>

      <Chatbar onSend={handleAddTodo} />
    </div>
  )
}
