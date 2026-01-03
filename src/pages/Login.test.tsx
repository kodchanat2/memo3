import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Login from './Login';
import * as firebaseAuth from 'firebase/auth';

// Mock firebase/auth
vi.mock('firebase/auth', async (importOriginal) => {
  const actual = await importOriginal<typeof firebaseAuth>();
  return {
    ...actual,
    signInWithPopup: vi.fn(),
    signInAnonymously: vi.fn(),
    getAuth: vi.fn(() => ({})),
    GoogleAuthProvider: vi.fn(),
  };
});

// Mock local firebase lib
vi.mock('@/lib/firebase', () => ({
  auth: {},
  googleProvider: {},
}));

describe('Login Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly', () => {
    render(<Login />);
    
    expect(screen.getByText('Welcome')).toBeInTheDocument();
    expect(screen.getByText('Sign in to access your memo workspace')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in with google/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /continue as guest/i })).toBeInTheDocument();
  });

  it('calls signInWithPopup when Google button is clicked', async () => {
    render(<Login />);
    
    const googleButton = screen.getByRole('button', { name: /sign in with google/i });
    fireEvent.click(googleButton);
    
    expect(firebaseAuth.signInWithPopup).toHaveBeenCalled();
  });

  it('calls signInAnonymously when Guest button is clicked', async () => {
    render(<Login />);
    
    const guestButton = screen.getByRole('button', { name: /continue as guest/i });
    fireEvent.click(guestButton);
    
    expect(firebaseAuth.signInAnonymously).toHaveBeenCalled();
  });
});
