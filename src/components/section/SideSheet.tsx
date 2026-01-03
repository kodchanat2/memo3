import { Icon } from '@iconify/react'
import { useAuth } from '@/hooks/useAuth'
import { auth } from '@/lib/firebase'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetFooter,
} from '@/components/ui/sheet'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

interface SideSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function SideSheet({ open, onOpenChange }: SideSheetProps) {
  const { user } = useAuth()

  const handleLogout = () => {
    auth.signOut()
    onOpenChange(false)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-[300px] max-w-svw flex flex-col bg-secondary">
        <SheetHeader className="p-4 text-left border-b">
          {/* User Info Section */}
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12 border-2 border-primary/10">
              <AvatarImage src={user?.photoURL || undefined} alt={user?.displayName || 'User'} />
              <AvatarFallback className="bg-primary/10 text-primary">
                <Icon icon="lucide:user" className="h-6 w-6" />
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col overflow-hidden">
              <span className="font-semibold truncate">
                {user?.displayName || 'Anonymous User'}
              </span>
              <span className="text-xs text-muted-foreground truncate">
                {user?.email || 'No email provided'}
              </span>
            </div>
          </div>
        </SheetHeader>

        {/* Scrollable Menu Section */}
        <div className="flex-1 overflow-y-auto py-2">
          <div className="px-2 space-y-1">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 hover:bg-background"
            >
              <Icon icon="lucide:settings" className="h-5 w-5" />
              Settings
            </Button>
            {/* Future menu items can go here */}
          </div>
        </div>

        {/* Sign Out Section at the Bottom */}
        <SheetFooter className="mt-auto border-t">
          <Button
            variant="outline"
            className="w-full gap-3 border-destructive bg-transparent text-destructive hover:text-foreground hover:bg-destructive/70"
            onClick={handleLogout}
          >
            <Icon icon="lucide:log-out" className="h-5 w-5" />
            Sign out
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
