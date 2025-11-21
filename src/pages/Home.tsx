import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome to the home page!</p>
      <nav>
        <Link to="/about">Go to About</Link>
      </nav>
    </div>
  )
}

export default Home
