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
import { useTheme } from '@/components/ui/theme-provider'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Link, useLocation } from 'react-router-dom'

interface SideSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const MENUS = [
  { icon: 'lucide:settings', label: 'Settings' },
  { icon: 'lucide:house', label: 'Home', link: '/' },
  { icon: 'lucide:list-todo', label: 'Todo', link: '/todo' },
  { icon: 'lucide:info', label: 'About', link: '/about' },
]

export default function SideSheet({ open, onOpenChange }: SideSheetProps) {
  const { user } = useAuth()
  const { theme, setTheme } = useTheme()

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
            {MENUS.map((menu) => (
              <MenuButton key={menu.link} icon={menu.icon} label={menu.label} link={menu.link} onOpenChange={onOpenChange} />
            ))}

            <div className="flex items-center justify-between px-3 py-2 mt-4">
              <div className="flex items-center gap-3">
                <Icon
                  icon={theme === 'dark' ? "lucide:moon" : "lucide:sun"}
                  className="h-5 w-5"
                />
                <Label htmlFor="dark-mode" className="font-normal cursor-pointer">
                  Dark Mode
                </Label>
              </div>
              <Switch
                id="dark-mode"
                checked={theme === 'dark'}
                onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
              />
            </div>
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

function MenuButton({ icon, label, link, onOpenChange }: { icon: string, label: string, link?: string, onOpenChange: (open: boolean) => void }) {
  const location = useLocation()
  const buttonComp = (
    <Button
      variant="ghost"
      className={`w-full justify-start gap-3 hover:bg-background ${link === location.pathname ? 'bg-background' : ''}`}
      disabled={link === location.pathname || !link}
    >
      <Icon icon={icon} className="h-5 w-5" />
      {label}
    </Button>
  )

  if (link) {
    return <Link to={link} onClick={() => onOpenChange(false)}>{buttonComp}</Link>
  }
  return buttonComp
}