# Viagem na Mão

App de planejamento de viagens para o público brasileiro. Interface e documentação sempre em português do Brasil.

## Objetivo do produto
- Cadastrar viagens e cidades, descobrir atrações em cartões (direita = curto, esquerda = não curto, baixo = talvez), montar roteiro e controlar custos.
- Roteiro ajustado por IA usando distâncias reais (não deixar o LLM calcular distância).
- Controle financeiro com divisão de gastos entre amigos.
- Viagem compartilhada com votação do grupo (o swipe vira "o grupo curte ou não").
- Monetização: assinatura (meta inicial R$ 9,99/mês e R$ 69,90/ano). Custos de API ainda a medir, preço não está fechado.

## Estado atual
- Protótipo estático: HTML, CSS e JavaScript nativos, sem framework, sem backend. Abrir `index.html` no navegador.
- Dados no `localStorage` (chave `viagem-na-mao-v1`), sem conta nem sincronização.
- Catálogo fixo de 94 atrações em 21 destinos brasileiros, sem APIs, sem avaliações nem preços.
- Arquivos: `index.html`, `styles.css`, `script.js`, `README.md`.

## Regras de trabalho
- Antes de mudar, ler os arquivos e preservar os dados já salvos no `localStorage` (usar migração, nunca apagar a chave).
- Alterações pequenas e pontuais. Manter estático enquanto fizer sentido.
- Nunca apresentar dado de demonstração como real. Nunca inventar nota, preço ou horário.
- Chaves de API nunca no JavaScript do navegador: só em função serverless/backend.
- Respeitar termos de cada API (cache, atribuição, uso comercial). Confirmar antes de propor integração.
- Validar no navegador, incluindo layout móvel.

## Decisões de dados (a confirmar custos)
- Base de lugares: Google Places (guardar só `place_id`; buscar detalhes sob demanda) ou fontes gratuitas para o MVP.
- OpenTripMap: plano gratuito é só para uso não comercial; uso comercial exige plano pago.
- Distâncias e tempos: Routes API, com agrupamento por proximidade antes de chamar o LLM.
