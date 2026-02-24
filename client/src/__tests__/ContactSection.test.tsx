import { render, screen } from '@testing-library/react';
import ContactSection from '@/components/sections/ContactSection';
import { useSiteSettings } from '@/hooks/useSanity';
import { vi, describe, it, expect } from 'vitest';

// Mock the hook
vi.mock('@/hooks/useSanity', () => ({
  useSiteSettings: vi.fn(),
}));

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

describe('ContactSection', () => {
  it('renders fallback contact info when data is missing', () => {
    // Mock return value for no data
    (useSiteSettings as any).mockReturnValue({
      data: null,
      isLoading: false,
    });

    render(<ContactSection />);

    // Check for fallback hardcoded values
    expect(screen.getByText('Avenida Getúlio Vargas, 475 - Jardim São Paulo, Sorocaba - SP')).toBeInTheDocument();
    expect(screen.getByText('+55 15 99186-9689')).toBeInTheDocument();
    expect(screen.getByText('academiaboulder@gmail.com')).toBeInTheDocument();
    expect(screen.getByText('Seg-Sex: 06h às 11h')).toBeInTheDocument();
  });

  it('renders dynamic contact info when data is present', () => {
    const mockData = {
      contactInfo: {
        address: 'Nova Rua, 123',
        phone: '+55 11 99999-9999',
        email: 'novo@email.com',
        hours: 'Seg-Dom: 24h',
      },
    };

    (useSiteSettings as any).mockReturnValue({
      data: mockData,
      isLoading: false,
    });

    render(<ContactSection />);

    expect(screen.getByText('Nova Rua, 123')).toBeInTheDocument();
    expect(screen.getByText('+55 11 99999-9999')).toBeInTheDocument();
    expect(screen.getByText('novo@email.com')).toBeInTheDocument();
    expect(screen.getByText('Seg-Dom: 24h')).toBeInTheDocument();
  });
});
