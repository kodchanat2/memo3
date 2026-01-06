import React from 'react'
import { Icon } from '@iconify/react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { ButtonGroup } from '../ui/button-group'
import Tabs from '../ui/tabs'

interface NoteDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function NoteDrawer({ open, onOpenChange }: NoteDrawerProps) {
  const [text, setText] = React.useState('')
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)

  // Autofocus when drawer opens
  React.useEffect(() => {
    if (open) {
      setTimeout(() => {
        // textareaRef.current?.focus()
      }, 1000)
    }
  }, [open])

  return (
    <Drawer open={open} onOpenChange={onOpenChange} dismissible={true}>
      <DrawerContent className="h-full max-h-80! rounded-none border-none" handle={false}>
        <DrawerHeader className='pb-0'>
          <DrawerTitle className='mx-auto w-full max-w-sm'>
            <Tabs items={[
              { id: 'note', title: 'Note', icon: 'grommet-icons:note', },
              { id: 'todo', title: 'Todo', icon: 'lucide:list-check', },
            ]} />
          </DrawerTitle>
        </DrawerHeader>
        <DrawerFooter className="flex flex-col h-full overflow-hidden p-0">
          {/* Main Textarea Area */}
          <div className="flex-1 overflow-y-auto pt-4 px-4">
            <Textarea
              ref={textareaRef}
              placeholder="Start typing..."
              className="w-full leading-relaxed min-h-full field-sizing-content border-0 resize-none"
              value={text}
              autoFocus
              onChange={(e) => setText(e.target.value)}
            />
          </div>

          {/* Bottom Menu - Above Keyboard */}
          <div className=" bg-background/80 backdrop-blur-md px-4 py-3 pb-safe">
            <div className="flex items-center gap-4 text-muted-foreground">
              <button 
                className="flex items-center gap-1 hover:text-foreground transition-colors"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  setText(prev => prev + '@')
                  textareaRef.current?.focus()
                }}
              >
                <Icon icon="lucide:at-sign" className="h-5 w-5" />
                <span className="text-sm font-medium">Mention</span>
              </button>
              <button 
                className="flex items-center gap-1 hover:text-foreground transition-colors"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  setText(prev => prev + '#')
                  textareaRef.current?.focus()
                }}
              >
                <Icon icon="lucide:hash" className="h-5 w-5" />
                <span className="text-sm font-medium">Tag</span>
              </button>
              <div className="flex-1" />
              <ButtonGroup >
                <DrawerClose asChild>
                  <Button variant="outline" size="icon">
                    <Icon icon="lucide:x" className="h-5 w-5" />
                  </Button>
                </DrawerClose>
                <Button 
                  size="icon" 
                  variant="outline" 
                  onClick={() => onOpenChange(false)}
                >
                  <Icon icon="lucide:check" className="h-5 w-5 text-primary" />
                </Button>
              </ButtonGroup>
            </div>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
