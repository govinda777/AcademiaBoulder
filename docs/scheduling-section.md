# Documentação da Seção de Agendamento

Este documento descreve a implementação e uso da seção de agendamento integrada ao Sanity.

## Visão Geral

A seção de agendamento permite que os visitantes do site marquem aulas experimentais, horários livres ou avaliações técnicas diretamente pelo site. Todos os dados de disponibilidade são gerenciados através do Sanity CMS.

## Estrutura de Dados

### Esquema no Sanity

O esquema `schedulingSection` contém os seguintes campos:

- `title`: Título da seção
- `description`: Descrição da seção
- `buttonText`: Texto do botão de confirmação
- `modalTitle`: Título do modal de confirmação
- `modalDescription`: Descrição no modal de confirmação
- `calendarUrl`: URL para integração com sistema de agendamento externo (opcional)
- `availableSlots`: Array de objetos com dias e horários disponíveis
  - `day`: Dia da semana (em inglês, lowercase)
  - `timeSlots`: Array de strings com horários no formato "HH:MM"
- `notes`: Observações adicionais

### Exemplo de Dados

```json
{
  "_type": "schedulingSection",
  "title": "Agende sua Aula Experimental",
  "description": "Experimente uma aula grátis e descubra como a escalada pode transformar seu condicionamento físico e mental.",
  "buttonText": "Confirmar Agendamento",
  "modalTitle": "Agendamento Confirmado!",
  "modalDescription": "Seu horário foi reservado com sucesso. Enviaremos um e-mail de confirmação com todos os detalhes.",
  "availableSlots": [
    {
      "day": "monday",
      "timeSlots": ["09:00", "11:00", "14:00", "16:00", "18:00"]
    },
    {
      "day": "tuesday",
      "timeSlots": ["09:00", "11:00", "14:00", "16:00", "18:00"]
    },
    {
      "day": "wednesday",
      "timeSlots": ["09:00", "11:00", "14:00", "16:00", "18:00"]
    },
    {
      "day": "thursday",
      "timeSlots": ["09:00", "11:00", "14:00", "16:00", "18:00"]
    },
    {
      "day": "friday",
      "timeSlots": ["09:00", "11:00", "14:00", "16:00"]
    },
    {
      "day": "saturday",
      "timeSlots": ["10:00", "12:00", "14:00"]
    }
  ],
  "notes": "Aos domingos não há atendimento. Favor verificar feriados no calendário oficial."
}
```

## Funcionalidades

### Seleção de Data e Hora

- O calendário exibe apenas dias com horários disponíveis
- Os horários são filtrados com base no dia da semana
- Para o dia atual, são exibidos apenas horários futuros

### Validações

- O formulário só pode ser enviado com todos os campos obrigatórios preenchidos
- A seleção de horário é obrigatória
- O horário selecionado deve estar dentro da lista de disponíveis

### Experiência do Usuário

- Feedback visual ao selecionar/desselecionar horários
- Mensagens de erro claras
- Estados de carregamento durante requisições
- Confirmação visual após o agendamento

## Como Atualizar

1. Acesse o Sanity Studio
2. Navegue até "Seção de Agendamento"
3. Atualize os horários disponíveis conforme necessário
4. Ajuste textos e mensagens conforme necessário
5. Publique as alterações

## Dicas

- Mantenha os horários atualizados de acordo com a disponibilidade da equipe
- Adicione observações sobre feriados ou períodos de férias
- Revise regularmente os horários mais procurados para otimizar a oferta

## Personalização

Você pode personalizar o componente editando o arquivo:
`client/src/components/sections/SchedulingWidget.tsx`

As cores e estilos podem ser ajustadas através das classes do Tailwind CSS no tema da aplicação.
