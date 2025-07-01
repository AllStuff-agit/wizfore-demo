import LocationHeroSection from '@/components/about/location/LocationHeroSection'
import TransportationSection from '@/components/about/location/TransportationSection'

export default function LocationPage() {
  return (
    <div className="bg-gray-50">
      <LocationHeroSection />
      <TransportationSection />
    </div>
  )
}