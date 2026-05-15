import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import EventsSection from '@/components/EventsSection'
import BookingStrip from '@/components/BookingStrip'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <EventsSection />
      <BookingStrip />
      <Footer />
    </main>
  )
}
