import React from 'react'
import { Icon } from '@iconify/react'
import { Button } from '@/components/ui/button'
import BottomSheet from '@/components/section/BottomSheet'
import MapSection from '@/components/section/MapSection'
import SideSheet from '@/components/section/SideSheet'
import NoteDrawer from '@/components/section/NoteDrawer'

export default function Home() {
  const [isSideSheetOpen, setIsSideSheetOpen] = React.useState(false)
  const [isNoteDrawerOpen, setIsNoteDrawerOpen] = React.useState(false)

  return (
    <div className="relative h-dvh w-full overflow-hidden bg-gray-100">
      {/* Map Background */}
      <MapSection />

      {/* Side Sheet */}
      <SideSheet open={isSideSheetOpen} onOpenChange={setIsSideSheetOpen} />

      {/* Note Drawer */}
      <NoteDrawer open={isNoteDrawerOpen} onOpenChange={setIsNoteDrawerOpen} />

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

      {/* FABs */}
      <div className="absolute bottom-26 right-4 z-10 flex flex-col gap-2">
        <Button
          size="icon"
          variant="outline"
          className="h-14 w-14 rounded-full shadow-lg"
          aria-label="New Note"
          onClick={() => setIsNoteDrawerOpen(true)}
        >
          <Icon icon="lucide:plus" className="h-8 w-8" />
        </Button>
      </div>

      {/* Bottom Sheet Navigation */}
      <BottomSheet />
    </div>
  )
}
