import { render, screen } from '@testing-library/react';
import HeroSection from '@/components/sections/HeroSection';
import { useHeroSection } from '@/hooks/useSanity';
import { vi, describe, it, expect } from 'vitest';

// Mock the hook
vi.mock('@/hooks/useSanity', () => ({
  useHeroSection: vi.fn(),
}));

describe('HeroSection', () => {
  it('renders with correct alt text', () => {
    // Mock the implementation to return loading state or no data so fallback is used
    (useHeroSection as any).mockReturnValue({
      data: null,
      isLoading: false,
    });

    render(<HeroSection />);

    const image = screen.getByAltText('Escalador em parede de boulder na Academia Boulder em Sorocaba');
    expect(image).toBeInTheDocument();
  });
});
