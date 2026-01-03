
import { Mic } from 'lucide-react'
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

export function SheetSearchHeader() {
  return (
    <InputGroup className="rounded-full h-10 shadow-sm mb-4">
      <InputGroupInput 
          type="search" 
          placeholder="Search here" 
          className="pl-4 h-10"
      />
      <InputGroupAddon align="inline-end" >
        <InputGroupButton variant="ghost" size='icon-sm'>
            <Mic className="size-5" />
        </InputGroupButton>
        <Avatar className="size-8">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </InputGroupAddon>
    </InputGroup>
  )
}
