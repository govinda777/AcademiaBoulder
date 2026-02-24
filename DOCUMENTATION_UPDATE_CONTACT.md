# Como Atualizar as Informações de Contato

Este documento descreve como atualizar o endereço, telefone, e-mail e horário de funcionamento da Academia Boulder.

A partir de agora, todas essas informações são gerenciadas em um único lugar: **Configurações Gerais** (Site Settings) no painel do Sanity (CMS). As alterações feitas lá refletirão automaticamente tanto no rodapé (Footer) quanto na seção de contato.

## Passo a Passo

1.  **Acesse o Sanity Studio**.
    *   Geralmente acessível através da URL `/studio` ou onde o CMS estiver hospedado.

2.  **Navegue até "Configurações Gerais"**.
    *   No menu lateral esquerdo, clique em "⚙️ Configurações Gerais".

3.  **Atualize as Informações de Contato**.
    *   Role até a seção "Informações de Contato".
    *   **Endereço**: Digite o novo endereço completo.
    *   **Telefone**: Digite o novo número de telefone.
        *   Recomendado incluir o código do país e DDD, ex: `+55 15 99186-9689`.
        *   Este número será usado automaticamente para o link do WhatsApp (o sistema remove caracteres não numéricos e adiciona o código 55 se necessário).
    *   **Email**: Digite o novo e-mail de contato.
    *   **Horário de Funcionamento**: Digite os horários.
        *   Você pode usar múltiplas linhas para separar os dias.
        *   Exemplo:
            ```
            Seg-Sex: 06h às 11h
            Sáb: 09h às 13h
            ```

4.  **Publique as Alterações**.
    *   Clique no botão "Publish" (Publicar) no canto inferior direito (ou superior direito, dependendo da versão) para salvar.

## Notas Importantes

*   **Fonte Única de Dados**: A seção de contato do site (`ContactSection`) agora ignora os dados inseridos especificamente no documento "Seção Contato" para estes campos (endereço, telefone, email, horário) e usa exclusivamente os dados de "Configurações Gerais". Isso garante que a informação esteja sempre sincronizada em todo o site.
*   **WhatsApp**: O botão de "Enviar Mensagem" e o ícone do WhatsApp usam o número de telefone definido em "Configurações Gerais".
*   **Mapas**: O mapa exibido na seção de contato é gerenciado separadamente (através do código embed) e não é atualizado automaticamente ao mudar o texto do endereço. Caso o endereço mude drasticamente, um desenvolvedor precisará atualizar o embed do mapa.
