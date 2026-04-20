# Log de Alterações - Dashboard de Execução Orçamentária

Este documento resume todas as atualizações aplicadas ao dashboard para padronização de indicadores, sincronização de dados reais e melhorias de UI/UX.

## 1. Indicadores de Topo (Cards)
- **Visual**: Refinados para um estilo ultra-compacto com altura fixa de `65px`.
- **Layout**: Implementado design de blocos divididos (lado esquerdo com cor, lado direito com fundo branco).
- **Alinhamento**: Corrigido o alinhamento da moeda (R$) e valores numéricos utilizando flexbox (`baseline`), garantindo que não fiquem "colados".
- **Cores Padronizadas**:
    - **Rosa** (Realizado)
    - **Azul Marinho** (Empenhado/Autorizado)
    - **Verde Floresta** (Previsto)
    - **Roxo** (Liquidado/Autorizado)

## 2. Gráfico: Disponibilidades por UO
- **Dados Reais**: Atualizado com os valores exatos da imagem de referência (SEP).
- **Formatação**: Eixo Y agora exibe valores em R$ formatados corretamente.
- **Tooltips**: Painel premium mostrando UO, Exercício e os 4 sub-valores de disponibilidade.
- **Rótulos**: Valores exibidos diretamente sobre as barras.

## 3. Gráfico: Sucesso do Planejamento
- **Orientação**: Alterado para o formato **Horizontal** para melhor legibilidade das ações orçamentárias.
- **Rótulos**: Valores percentuais exibidos diretamente ao lado de cada barra.
- **Filtro SEP**: Restrito para mostrar apenas os grupos de despesa da SEP (1, 3 e 4).
- **Dados**: Sincronizados com os valores exatos da imagem (97.14%, 94.38%, 80.34%, etc.).

## 4. Gráfico: Comparativo de Despesas
- **Simplificação**: Foco no valor **Liquidado**.
- **Dados**: Atualizado com os 3 grupos da SEP (1, 3, 4) e valores reais da imagem.
- **Rótulos**: Valores de liquidação exibidos sobre as barras em formato de moeda.

## 5. Gráfico: Plano Orçamentário (PO)
- **Scroll Nativo**: Implementado **Scroll Vertical interno** via ECharts.
- **Limpeza Visual**: Removida a exibição de zeros nas barras.
- **Tooltip**: Formatação em R$ corrigida para valores de todas as ordens de magnitude.

## 6. Tabelas Flip (Verso dos Gráficos)
- **Sincronização**: Todas as tabelas no verso dos gráficos refletem fielmente os dados frontais.
- **Moeda**: Implementada função `fmtBRL` em toda a interface.

## 7. Melhorias Gerais
- **Filtros**: Lógica de "chips" aprimorada (sem placeholders genéricos).
- **Consistência**: Toda a interface segue agora uma paleta de cores e tipografia (`Outfit`) unificada.

---
*Status Atual: Dashboard finalizado, com indicadores padronizados em 65px e gráficos sincronizados com as referências visuais da SEP.*
