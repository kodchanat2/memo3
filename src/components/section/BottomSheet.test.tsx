import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import BottomSheet from './BottomSheet'


describe('BottomSheet', () => {
    it('renders filter chips and search input', () => {
        render(<BottomSheet />)
        expect(screen.getByText('Restaurants')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Search here')).toBeInTheDocument()
    })
})
