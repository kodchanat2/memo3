import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import AuthGuard from './components/auth/AuthGuard'

function App() {
  return (
    <div className="bg-background text-foreground min-h-screen min-w-screen">
      <AuthGuard>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
    </AuthGuard>
    </div>
  )
}

export default App
