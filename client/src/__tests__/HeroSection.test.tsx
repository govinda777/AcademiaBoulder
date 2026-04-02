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

    // Initially, the image might not be in the DOM if it's waiting for the URL
    // In our new implementation, bgUrl will be null initially if heroData is null
    // and we removed the default background image.
    // So we mock the data to have a background image.
    (useHeroSection as any).mockReturnValue({
      data: {
        title: "Test Title",
        backgroundImage: {
          _type: 'image',
          asset: {
            _ref: 'image-G387_SlS6_BGS-2000x3000-jpg',
            _type: 'reference'
          }
        }
      },
      isLoading: false,
    });

    render(<HeroSection />);

    // The image will be hidden (opacity-0) until onLoad fires.
    // In a test environment, we might need to wait or check for existence.
    const image = screen.getByAltText('Escalador em parede de boulder na Academia Boulder em Sorocaba');
    expect(image).toBeInTheDocument();
  });
});
