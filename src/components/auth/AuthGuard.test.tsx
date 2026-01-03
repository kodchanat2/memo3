import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import AuthGuard from './AuthGuard';
import * as useAuthHook from '@/hooks/useAuth';

// Mock useAuth hook
vi.mock('@/hooks/useAuth', () => ({
  useAuth: vi.fn(),
}));

// Mock Login component
vi.mock('@/pages/Login', () => ({
  default: () => <div data-testid="login-component">Login Component</div>,
}));

describe('AuthGuard', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders loading spinner when loading is true', () => {
        vi.spyOn(useAuthHook, 'useAuth').mockReturnValue({
            user: null,
            loading: true,
        });

        render(
            <AuthGuard>
                <div>Protected Content</div>
            </AuthGuard>
        );

        // Check for loading icon (using class name from implementation)
        // Since it's an Iconify icon, it might not have accessible text by default
        // But the implementation shows it has a specific icon prop
        // We can check if the loading container is present or the icon itself
        // A better approach for this test is to modify the component to have a test id or accessible role,
        // but since we are testing existing code without modification if possible, we can look for the container structure or icon class.
        // However, let's rely on the fact that nothing else should render.
        // Or we can check if the children are NOT rendered.
        
        expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
        expect(screen.queryByTestId('login-component')).not.toBeInTheDocument();
        // Ideally checking for the spinner would be good. 
        // We can check by container class if needed, or update component to be more testable.
        // For now, let's check if the specific icon class is present in the DOM roughly if possible, 
        // or just rely on absence of other content + presence of *something*.
        const spinner = document.querySelector('.flex.h-screen'); // Simple check for the container class
        expect(spinner).toBeInTheDocument();
    });

    it('renders Login component when user is not authenticated', () => {
        vi.spyOn(useAuthHook, 'useAuth').mockReturnValue({
            user: null,
            loading: false,
        });

        render(
            <AuthGuard>
                <div>Protected Content</div>
            </AuthGuard>
        );

        expect(screen.getByTestId('login-component')).toBeInTheDocument();
        expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
    });

    it('renders children when user is authenticated', () => {
        vi.spyOn(useAuthHook, 'useAuth').mockReturnValue({
            user: {} as any, // Mock user object
            loading: false,
        });

        render(
            <AuthGuard>
                <div>Protected Content</div>
            </AuthGuard>
        );

        expect(screen.getByText('Protected Content')).toBeInTheDocument();
        expect(screen.queryByTestId('login-component')).not.toBeInTheDocument();
    });
});
