import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import MapInterface from './MapInterface'


describe('MapInterface', () => {
    it('renders the map background', () => {
        render(<MapInterface />)
        const bgImage = screen.getByAltText('Map Background')
        expect(bgImage).toBeDefined()
    })

    it('renders filter chips', () => {
        render(<MapInterface />)
        expect(screen.getByText('Restaurants')).toBeDefined()
    })
})
