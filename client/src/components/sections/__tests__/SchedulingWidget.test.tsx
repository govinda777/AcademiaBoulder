import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { vi } from 'vitest';
import SchedulingWidget from '../SchedulingWidget';
import userEvent from '@testing-library/user-event';

// Mock do hook useSchedulingSection
vi.mock('../../../hooks/useSanity', () => ({
  useSchedulingSection: vi.fn(),
}));

const mockSchedulingData = {
  title: 'Agende sua Aula Experimental',
  description: 'Experimente uma aula grátis',
  buttonText: 'Agendar',
  modalTitle: 'Agendamento Confirmado',
  modalDescription: 'Seu agendamento foi confirmado',
  availableSlots: [
    { day: 'monday', timeSlots: ['09:00', '14:00'] },
    { day: 'tuesday', timeSlots: ['10:00', '15:00'] },
  ],
  notes: 'Horários sujeitos a disponibilidade',
};

const renderSchedulingWidget = (props = {}) => {
  const queryClient = new QueryClient();
  
  return render(
    <QueryClientProvider client={queryClient}>
      <SchedulingWidget {...props} />
    </QueryClientProvider>
  );
};

describe('SchedulingWidget', () => {
  const mockUseSchedulingSection = vi.fn();
  
  beforeEach(() => {
    // Configura o mock para retornar dados simulados
    mockUseSchedulingSection.mockReturnValue({
      data: mockSchedulingData,
      isLoading: false,
      isError: false,
      error: null,
    });
    
    // Aplica o mock ao hook
    vi.mocked(require('../../../hooks/useSanity').useSchedulingSection)
      .mockImplementation(mockUseSchedulingSection);
    
    // Mock do window.scrollTo
    window.scrollTo = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('deve exibir o título e descrição corretamente', () => {
    renderSchedulingWidget();
    
    expect(screen.getByText(mockSchedulingData.title)).toBeInTheDocument();
    expect(screen.getByText(mockSchedulingData.description)).toBeInTheDocument();
  });

  it('deve exibir os botões de tipo de agendamento', () => {
    renderSchedulingWidget();
    
    expect(screen.getByText('Aula Experimental')).toBeInTheDocument();
    expect(screen.getByText('Horário Livre')).toBeInTheDocument();
    expect(screen.getByText('Avaliação Técnica')).toBeInTheDocument();
  });

  it('deve alternar entre as abas de tipo de agendamento', async () => {
    const user = userEvent.setup();
    renderSchedulingWidget();
    
    // Verifica a aba ativa inicial
    expect(screen.getByText('Aula Experimental').closest('button')).toHaveClass('bg-primary');
    
    // Clica na aba de Horário Livre
    await user.click(screen.getByText('Horário Livre'));
    expect(screen.getByText('Horário Livre').closest('button')).toHaveClass('bg-primary');
    expect(screen.getByText('Aula Experimental').closest('button')).not.toHaveClass('bg-primary');
  });

  it('deve exibir o calendário e os horários disponíveis', async () => {
    renderSchedulingWidget();
    
    // Verifica se o calendário está sendo exibido
    expect(screen.getByLabelText('Selecione uma data')).toBeInTheDocument();
  });

  it('deve exibir mensagem de carregamento', () => {
    // Configura o mock para simular carregamento
    mockUseSchedulingSection.mockReturnValueOnce({
      data: null,
      isLoading: true,
      isError: false,
      error: null,
    });
    
    renderSchedulingWidget();
    
    expect(screen.getByText('Carregando...')).toBeInTheDocument();
  });

  it('deve exibir mensagem de erro', () => {
    const errorMessage = 'Erro ao carregar os dados de agendamento';
    
    // Configura o mock para simular erro
    mockUseSchedulingSection.mockReturnValueOnce({
      data: null,
      isLoading: false,
      isError: true,
      error: { message: errorMessage },
    });
    
    renderSchedulingWidget();
    
    expect(screen.getByText(/erro ao carregar os dados/i)).toBeInTheDocument();
  });

  it('deve validar o formulário antes de enviar', async () => {
    const user = userEvent.setup();
    renderSchedulingWidget();
    
    // Tenta enviar sem preencher os campos obrigatórios
    await user.click(screen.getByText(mockSchedulingData.buttonText));
    
    // Verifica se as mensagens de erro são exibidas
    expect(await screen.findByText('Nome é obrigatório')).toBeInTheDocument();
    expect(screen.getByText('E-mail é obrigatório')).toBeInTheDocument();
    expect(screen.getByText('Telefone é obrigatório')).toBeInTheDocument();
  });

  it('deve exibir o modal de confirmação após o envio bem-sucedido', async () => {
    const user = userEvent.setup();
    renderSchedulingWidget();
    
    // Preenche o formulário
    await user.type(screen.getByPlaceholderText('Seu nome'), 'João Silva');
    await user.type(screen.getByPlaceholderText('Seu e-mail'), 'joao@exemplo.com');
    await user.type(screen.getByPlaceholderText('Seu telefone'), '(11) 98765-4321');
    
    // Envia o formulário
    await user.click(screen.getByText(mockSchedulingData.buttonText));
    
    // Verifica se o modal de confirmação é exibido
    expect(await screen.findByText(mockSchedulingData.modalTitle)).toBeInTheDocument();
    expect(screen.getByText(mockSchedulingData.modalDescription)).toBeInTheDocument();
  });
});
