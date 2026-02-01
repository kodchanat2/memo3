import React from 'react'
import { Icon } from '@iconify/react'
import { Button } from '@/components/ui/button'
import SideSheet from '@/components/section/SideSheet'
import Chatbar from '@/components/section/Chatbar'

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isSideSheetOpen, setIsSideSheetOpen] = React.useState(false)

  return (
    <div className="relative h-dvh w-full overflow-hidden">
      {children}

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

      <Chatbar />
    </div>
  )
}
