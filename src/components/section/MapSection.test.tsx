import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import MapSection from './MapSection'


describe('MapSection', () => {
    it('renders the map background', () => {
        render(<MapSection />)
        const canvas = screen.getByLabelText('Map')
        expect(canvas).toBeDefined()
    })
})
