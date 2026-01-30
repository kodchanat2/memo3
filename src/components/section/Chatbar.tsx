import * as React from "react"
import { Icon } from "@iconify/react"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { cn } from "@/lib/utils"
import { Button } from "../ui/button"

import { useChat } from '@/context/ChatContext'
import { useTodos } from "@/context/TodoContext"

interface ChatbarProps {
  onSend?: (message: string) => void
  onAttachmentClick?: () => void
  onVoiceClick?: () => void
  placeholder?: string
  className?: string
}

export default function Chatbar({
  onSend,
  onAttachmentClick,
  onVoiceClick,
  placeholder = "Message",
  className,
}: ChatbarProps) {
  const { draft, setDraft, clearDraft, setChatRef } = useChat()
  const handleSend = () => {
    if (draft.trim()) {
      onSend?.(draft)
      clearDraft()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className={cn("w-screen bg-background backdrop-blur-xl border-t border-border/40 p-3 pt-2 min-h-safe sticky bottom-0 z-10", className)}>
      <EditBar />
      <div className="max-w-full mx-auto flex items-start gap-3">
        {/* Clip Button (Left) */}
        {onAttachmentClick && (
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-background/10 backdrop-blur-xl"
            onClick={onAttachmentClick}
          >
            <Icon icon="lucide:paperclip" className="size-5" />
          </Button>
        )}

        {/* Input (Center) */}
        <InputGroup className="flex-1 h-fit bg-muted/30 border-none rounded-3xl ring-1 ring-border/10 focus-within:ring-primary/20 transition-all duration-300 ease-in-out px-1">
          <InputGroupTextarea
            ref={setChatRef}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            rows={1}
            className="text-[16px] py-2 pl-4 h-auto min-h-3 max-h-32 placeholder:text-muted-foreground/50 selection:bg-primary/20 scrollbar-none"
          />

          <InputGroupAddon align="inline-end" className="p-0 pr-1 self-start">
            {
              draft.trim() ? (
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-full size-10 p-2"
                  onClick={() => clearDraft()}
                >
                  <Icon icon="lucide:x" className="size-5" />
                </Button>
              ) : null}
          </InputGroupAddon>
        </InputGroup>

        {/* Action Button (Right) */}
        <div className="">
          {draft.trim() ? (
            <Button
              variant="default"
              size="icon"
              className="rounded-full"
              onClick={handleSend}
            >
              <Icon icon="lucide:send-horizontal" className="size-5" />
            </Button>
          ) : onVoiceClick && (
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-background/10 backdrop-blur-xl"
              onClick={onVoiceClick}
            >
              <Icon icon="lucide:mic" className="size-5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

function EditBar() {
  const { editing, setEditing } = useChat()
  const { deleteTodo } = useTodos()
  if (!editing) return null
  return (
    <div className="bg-accent/50 h-10 w-full absolute bottom-full inset-x-0 flex items-center justify-between px-3 border-l-4 border-l-accent-foreground/30">
      <div className="text-sm text-accent-foreground/80 italic flex items-center gap-2">
        <Icon icon="lucide:edit" className="size-4" />
        {editing.text}
      </div>
      <div className="flex-1 w-full" />
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full -mr-1"
        onClick={() => {
          deleteTodo(editing.id)
          setEditing()
        }}
      >
        <Icon icon="lucide:trash-2" className="size-5" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full -mr-3"
        onClick={() => setEditing()}
      >
        <Icon icon="lucide:x" className="size-5" />
      </Button>
    </div>
  )
}