import Hero from './components/Hero'
import AboutUs from './components/AboutUs'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <AboutUs />
    </div>
  )
}