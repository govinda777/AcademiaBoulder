import { render, screen } from '@testing-library/react';
import HeroSection from '@/components/sections/HeroSection';
import { useHeroSection } from '@/hooks/useSanity';
import { vi, describe, it, expect } from 'vitest';

// Mock the hook
vi.mock('@/hooks/useSanity', () => ({
  useHeroSection: vi.fn(),
}));

describe('HeroSection', () => {
  it('renders with dynamic title from Sanity', () => {
    // Mock the implementation to return data
    (useHeroSection as any).mockReturnValue({
      data: {
        title: "DESCUBRA SEUS limites. CADA AGARRA.",
        label: "ESCALADA · CROSS · TRAINING",
        backgroundVideo: {
          asset: {
            url: "https://example.com/video.mp4"
          }
        }
      },
      isLoading: false,
    });

    render(<HeroSection />);

    // Check if the title is rendered
    expect(screen.getByText(/DESCUBRA/i)).toBeInTheDocument();
    expect(screen.getByText(/limites./i)).toBeInTheDocument();
  });
});
