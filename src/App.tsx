import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Todo from './pages/Todo'
import About from './pages/About'
import AuthGuard from './components/auth/AuthGuard'
import { AppProviders } from './context/AppProviders'

function App() {
  return (
    <div className="bg-background text-foreground min-h-screen min-w-screen">
      <AuthGuard>
        <AppProviders>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/todo" element={<Todo />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </AppProviders>
    </AuthGuard>
    </div>
  )
}

export default App
