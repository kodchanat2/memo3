import {
  Menu,
  Navigation,
  Target,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import BottomSheet from '@/components/section/BottomSheet'
import MapSection from '@/components/section/MapSection'

export default function Home() {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-gray-100">
      {/* Map Background */}
      <MapSection />

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
      <BottomSheet />
    </div>
  )
}
