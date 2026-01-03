import { Icon } from '@iconify/react'
import { Button } from '@/components/ui/button'
import BottomSheet from '@/components/section/BottomSheet'
import MapSection from '@/components/section/MapSection'

export default function Home() {
  return (
    <div className="relative h-svh w-full overflow-hidden bg-gray-100">
      {/* Map Background */}
      <MapSection />

      {/* Top UI Container (Hamburger Only) */}
      <div className="absolute top-4 left-0 z-10">
        <Button variant="default" className="h-10 pl-4 pr-3 rounded-r-full shadow-md transition-all hover:pl-6 hover:scale-105">
          <Icon icon="lucide:menu" className="h-6 w-6" />
        </Button>
      </div>

      {/* FABs */}
      <div className="absolute bottom-26 right-4 z-10 flex flex-col gap-2">
        <Button
          size="icon"
          variant="outline"
          className="h-14 w-14 rounded-full shadow-lg"
          aria-label="Directions"
        >
          <Icon icon="lucide:plus" className="h-8 w-8" />
        </Button>
      </div>

      {/* Bottom Sheet Navigation */}
      <BottomSheet />
    </div>
  )
}
