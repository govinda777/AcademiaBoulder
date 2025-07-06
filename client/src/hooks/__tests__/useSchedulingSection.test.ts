import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useSchedulingSection } from '../useSanity';
import { vi } from 'vitest';

// Mock do cliente Sanity
vi.mock('../../lib/sanity', () => ({
  client: {
    fetch: vi.fn(),
  },
}));

const mockSchedulingData = {
  title: 'Agende sua Aula Experimental',
  description: 'Experimente uma aula grátis',
  buttonText: 'Agendar',
  modalTitle: 'Agendamento Confirmado',
  modalDescription: 'Seu agendamento foi confirmado',
  calendarUrl: 'https://calendly.com/example',
  availableSlots: [
    { day: 'monday', timeSlots: ['09:00', '14:00'] },
    { day: 'tuesday', timeSlots: ['10:00', '15:00'] },
  ],
  notes: 'Horários sujeitos a disponibilidade',
};

describe('useSchedulingSection', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    // Reset mocks
    vi.clearAllMocks();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );

  it('deve retornar dados iniciais corretos', () => {
    const { result } = renderHook(() => useSchedulingSection(), { wrapper });

    expect(result.current).toMatchObject({
      data: undefined,
      isLoading: true,
      isError: false,
      error: null,
    });
  });

  it('deve buscar dados com sucesso', async () => {
    // Configura o mock para retornar dados simulados
    const mockFetch = await import('../../lib/sanity').then(
      (module) => module.client.fetch
    );
    mockFetch.mockResolvedValueOnce(mockSchedulingData);

    const { result } = renderHook(() => useSchedulingSection(), { wrapper });

    // Verifica o estado de carregamento inicial
    expect(result.current.isLoading).toBe(true);

    // Aguarda a conclusão da requisição
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // Verifica os dados retornados
    expect(result.current.data).toEqual(mockSchedulingData);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
  });

  it('deve lidar com erro na requisição', async () => {
    const errorMessage = 'Erro ao buscar dados';
    const mockFetch = await import('../../lib/sanity').then(
      (module) => module.client.fetch
    );
    mockFetch.mockRejectedValueOnce(new Error(errorMessage));

    const { result } = renderHook(() => useSchedulingSection(), { wrapper });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBeDefined();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBeUndefined();
  });

  it('deve retornar null quando não houver dados', async () => {
    const mockFetch = await import('../../lib/sanity').then(
      (module) => module.client.fetch
    );
    mockFetch.mockResolvedValueOnce(null);

    const { result } = renderHook(() => useSchedulingSection(), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toBeNull();
  });
});
