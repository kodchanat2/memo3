
import { Icon } from '@iconify/react'
import {
  InputGroup,
  InputGroupInput,
  InputGroupButton,
  InputGroupAddon,
} from '@/components/ui/input-group'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'
import type { SheetRef } from 'react-modal-sheet'

export function SheetSearchHeader({ sheetRef }: { sheetRef: SheetRef | null }) {
  const handleFocus = () => {
    sheetRef?.snapTo(2)
  }
  return (
    <InputGroup className="rounded-full h-10 shadow-sm">
      <InputGroupInput 
        type="search" 
        placeholder="Search here" 
        className="pl-4 h-10"
        onFocus={handleFocus}
      />
      <InputGroupAddon align="inline-end" >
        <InputGroupButton variant="ghost" size='icon-sm'>
            <Icon icon="lucide:mic" className="size-5" />
        </InputGroupButton>
        <Avatar className="size-8">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </InputGroupAddon>
    </InputGroup>
  )
}
