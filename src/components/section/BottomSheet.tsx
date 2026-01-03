import { useState } from 'react'
import { Icon } from '@iconify/react'
import { Sheet, type SheetRef } from 'react-modal-sheet'
import { Button } from '@/components/ui/button'
import { SheetSearchHeader } from './SheetSearchHeader'

export default function MapInterface() {
  const [isOpen, setOpen] = useState(true)
  const [sheetRef, setSheetRef] = useState<SheetRef | null>(null);

  return (
    <Sheet
      isOpen={isOpen}
      onClose={() => setOpen(false)}
      snapPoints={[80, 1]}
      initialSnap={1}
      disableDismiss
      ref={(ref) => (!sheetRef && ref) ? setSheetRef(ref) : undefined}
      style={{ zIndex: 10 }}
    >
      <Sheet.Container className="bg-background!">
        <Sheet.Header className="flex flex-col justify-center items-center p-3 gap-3">
          <div className="w-12 h-1 bg-gray-300 rounded-full" />
          {/* Search Bar in Sheet */}
          <SheetSearchHeader sheetRef={sheetRef}/>
          
        </Sheet.Header>
        <Sheet.Content className="px-4 pb-4 overflow-y-auto">
          {/* Filter Chips in Sheet */}
          <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar">
            {['Restaurants', 'Gas', 'Coffee', 'Hotels', 'Groceries', 'Parks'].map((label) => (
              <Button
                key={label}
                variant="outline"
                size="sm"
                className="rounded-full whitespace-nowrap"
              >
                {label}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-5 gap-1 pt-1 border-t">
            <NavDirection icon="lucide:compass" label="Explore" active />
            <NavDirection icon="lucide:map-pin" label="Go" />
            <NavDirection icon="lucide:bookmark" label="Saved" />
            <NavDirection icon="lucide:plus-circle" label="Contribute" />
            <NavDirection icon="lucide:bell" label="Updates" />
          </div>
          
            {/* Content placeholder for expanded state */}
          <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Explore area</h3>
              <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="flex gap-4 p-3 rounded-lg border bg-card/50">
                            <div className="h-20 w-20 bg-muted rounded-md flex-shrink-0" />
                            <div className="space-y-2">
                                <div className="h-4 w-32 bg-foreground/10 rounded" />
                                <div className="h-3 w-24 bg-foreground/10 rounded" />
                            </div>
                        </div>
                    ))}
              </div>
          </div>

        </Sheet.Content>
      </Sheet.Container>
      {/* <Sheet.Backdrop /> */}
    </Sheet>
  )
}

function NavDirection({ icon, label, active }: { icon: string, label: string, active?: boolean }) {
  return (
    <button className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${active ? 'text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}>
      <Icon icon={icon} className={`h-6 w-6 ${active ? 'fill-current' : ''}`} />
      <span className="text-xs font-medium">{label}</span>
    </button>
  )
}
