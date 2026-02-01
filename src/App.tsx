import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Todo from './pages/Todo'
import About from './pages/About'
import AuthGuard from './components/auth/AuthGuard'
import { AppProviders } from './context/AppProviders'
import { useVisualViewport } from './hooks/useVisualViewport'
import React from 'react'
import { AnimatePresence } from 'motion/react'
import Layout from './components/Layout'

function App() {
  const viewport = useVisualViewport()
  const [height, setHeight] = React.useState(0)
  React.useEffect(() => {
    // set height
    document.body.style.height = `${viewport.height}px`
    setHeight(viewport.height)
  }, [viewport])

  return (
    <div className="bg-background text-foreground h-dvh max-h-dvh min-w-screen" style={{ height: `${height}px` }}>
      <AuthGuard>
        <AppProviders>
          <Layout>
            <AnimatePresence>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/todo" element={<Todo />} />
                <Route path="/about" element={<About />} />
              </Routes>
            </AnimatePresence>
          </Layout>
        </AppProviders>
      </AuthGuard>
    </div>
  )
}

export default App
