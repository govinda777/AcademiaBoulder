// Configurações globais para os testes
import { vi, afterEach, afterAll } from 'vitest';
import '@testing-library/jest-dom';
import { QueryClient } from '@tanstack/react-query';

// Mock de funções globais
Object.defineProperty(window, 'scrollTo', { value: vi.fn(), writable: true });

// Mock de módulos que podem causar erros nos testes
vi.mock('react-calendar', () => ({
  __esModule: true,
  default: vi.fn().mockImplementation(({ onChange, value, minDate, maxDate }: any) => {
    const React = require('react');
    return React.createElement('div', null, [
      React.createElement('input', {
        key: 'date-input',
        type: 'date',
        'aria-label': 'Selecione uma data',
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
          if (onChange && e.target.valueAsDate) {
            onChange(e.target.valueAsDate);
          }
        },
        min: minDate?.toISOString().split('T')[0],
        max: maxDate?.toISOString().split('T')[0],
      }),
      React.createElement('div', { key: 'calendar-mock' }, 'Calendário Simulado'),
    ]);
  }),
}));

// Configuração do React Query para testes
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      // Desativa o cache em testes
      cacheTime: 0,
    },
  },
});

// Mock do React Query
vi.mock('@tanstack/react-query', async () => {
  const actual = await vi.importActual('@tanstack/react-query');
  return {
    ...actual,
    useQueryClient: () => queryClient,
  };
});

// Mock do módulo de datas para testes consistentes
const mockDate = new Date('2025-06-29T12:00:00-03:00');
vi.useFakeTimers({
  now: mockDate,
  shouldAdvanceTime: true,
  toFake: ['Date'],
});

// Limpar mocks após cada teste
afterEach(() => {
  vi.clearAllMocks();
  queryClient.clear();
});

// Limpar timers após os testes
afterAll(() => {
  vi.useRealTimers();
});
