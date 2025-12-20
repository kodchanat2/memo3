import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import BottomSheet from './BottomSheet'


describe('BottomSheet', () => {
    it('renders filter chips', () => {
        render(<BottomSheet />)
        expect(screen.getByText('Restaurants')).toBeDefined()
    })
})
