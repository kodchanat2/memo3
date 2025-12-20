import MapInterface from '@/components/MapInterface'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="max-w-screen">
      {/* <h1>Home Page</h1>
      <p>Welcome to the home page!</p>
      <nav>
        <Link to="/about">Go to About</Link>
      </nav> */}
      <MapInterface />
    </div>
  )
}

export default Home
