import '@testing-library/jest-dom'

// ResizeObserver polyfill
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

globalThis.ResizeObserver = ResizeObserver as any
