import { useState } from 'react'
import {
  Menu,
  Compass,
  MapPin,
  Bookmark,
  PlusCircle,
  Bell,
  Navigation,
  Target,
  Mic,
} from 'lucide-react'
import { Sheet } from 'react-modal-sheet'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'

export default function MapInterface() {
  const [isOpen, setOpen] = useState(true)

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gray-100">
      {/* Map Background */}
      <img
        src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=600&h=1000"
        alt="Map Background"
        className="absolute inset-0 h-full w-full object-cover z-0"
      />

      {/* Top UI Container (Hamburger Only) */}
      <div className="absolute top-4 left-4 z-10">
        <Button variant="secondary" size="icon" className="h-10 w-10 rounded-full shadow-md bg-white text-gray-700">
          <Menu className="h-6 w-6" />
        </Button>
      </div>

      {/* FABs */}
      <div className="absolute bottom-48 right-4 z-10 flex flex-col gap-3">
        <Button
          size="icon"
          className="h-12 w-12 rounded-full shadow-lg bg-white hover:bg-gray-50 text-gray-700 border border-gray-100"
          aria-label="Recenter"
        >
          <Target className="h-6 w-6" />
        </Button>
        <Button
          size="icon"
          className="h-12 w-12 rounded-full shadow-lg bg-blue-600 hover:bg-blue-700 text-white"
          aria-label="Directions"
        >
          <Navigation className="h-6 w-6 fill-current" />
        </Button>
      </div>

      {/* Bottom Sheet Navigation */}
      <Sheet
        isOpen={isOpen}
        onClose={() => setOpen(false)}
        snapPoints={[600, 220]}
        initialSnap={1}
      >
        <Sheet.Container className="bg-background rounded-t-xl shadow-[0_-2px_10px_rgba(0,0,0,0.1)]">
          <Sheet.Header className="h-6 flex justify-center items-center">
             <div className="w-10 h-1 bg-gray-300 rounded-full" />
          </Sheet.Header>
          <Sheet.Content className="px-4 pb-4 overflow-y-auto">
            
            {/* Search Bar in Sheet */}
            <Card className="flex items-center gap-3 p-2 mb-4 rounded-full shadow-sm bg-secondary/50 border-0">
               <div className="flex-1 text-sm text-foreground/80 font-medium pl-2">
                 Try "Restaurants"
               </div>
               <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="shrink-0 text-muted-foreground h-8 w-8">
                     <Mic className="h-4 w-4" />
                  </Button>
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
               </div>
            </Card>

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
              <NavDirection icon={Compass} label="Explore" active />
              <NavDirection icon={MapPin} label="Go" />
              <NavDirection icon={Bookmark} label="Saved" />
              <NavDirection icon={PlusCircle} label="Contribute" />
              <NavDirection icon={Bell} label="Updates" />
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
        <Sheet.Backdrop />
      </Sheet>
    </div>
  )
}

function NavDirection({ icon: Icon, label, active }: { icon: any, label: string, active?: boolean }) {
  return (
    <button className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${active ? 'text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}>
      <Icon className={`h-6 w-6 ${active ? 'fill-current' : ''}`} />
      <span className="text-xs font-medium">{label}</span>
    </button>
  )
}
