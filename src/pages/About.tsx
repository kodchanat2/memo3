import { Link } from 'react-router-dom'

function About() {
  return (
    <div>
      <h1>About Page</h1>
      <p>This is the about page.</p>
      <nav>
        <Link to="/">Go to Home</Link>
      </nav>
    </div>
  )
}

export default About
