# Viagem na Mão

App de planejamento de viagens para o público brasileiro. Interface e documentação sempre em português do Brasil.

## Objetivo do produto
- Cadastrar viagens e cidades, descobrir atrações em cartões (direita = curto, esquerda = não curto, baixo = talvez), montar roteiro e controlar custos.
- Roteiro ajustado por IA usando distâncias reais (não deixar o LLM calcular distância).
- Controle financeiro com divisão de gastos entre amigos.
- Viagem compartilhada com votação do grupo (o swipe vira "o grupo curte ou não").
- Monetização: assinatura (meta inicial R$ 9,99/mês e R$ 69,90/ano). Custos de API ainda a medir, preço não está fechado.

## Estado atual
- App estático (HTML, CSS e JavaScript nativos, sem framework) em https://app.viagemnamao.com; site de divulgação em https://viagemnamao.com (pasta `site/`, lista de espera via função da Vercel). Ambos publicados pela Vercel a cada push na `main`.
- Dados no `localStorage` (chave `viagem-na-mao-v1`) e fotos no IndexedDB; contas opcionais com Supabase (`conta.js`, login por código no e-mail, teste fechado) sincronizam o estado e as fotos. Esquema em `ferramentas/supabase-contas.sql`. Cadastro aberto para testadores; estatística de uso só com contagens (`ferramentas/supabase-metricas.sql`) e painel em `/painel.html` restrito aos administradores.
- Catálogo por cidade sob demanda: o app carrega só o índice `dados/cidades.js` e baixa `dados/cidades/<cidade>.js` das cidades das viagens. O service worker `sw.js` guarda o app e esses dados para abrir sem internet (clima, rotas, endereços e conta sempre pela rede). Depois de regenerar o catálogo, rodar `node ferramentas/dividir-cidades.mjs` e subir `CITY_PACK_VERSION` no `script.js`.
- Catálogo: atrações de 313 cidades (todas as capitais, litorais e serras do Sul e Sudeste, principais destinos do Brasil e do mundo) (Wikidata/Wikipedia/Commons e OpenStreetMap), sem avaliações nem preços. Ver README para a lista de arquivos.

## Regras de trabalho
- Antes de mudar, ler os arquivos e preservar os dados já salvos no `localStorage` (usar migração, nunca apagar a chave).
- Alterações pequenas e pontuais. Manter estático enquanto fizer sentido.
- Nunca apresentar dado de demonstração como real. Nunca inventar nota, preço ou horário.
- Chaves secretas nunca no JavaScript do navegador: só em função serverless/backend (Vercel). Exceção aprovada: a Publishable key do Supabase (`sb_publishable_...`), que é pública por natureza; a proteção dos dados vem das regras RLS de cada tabela, obrigatórias em toda tabela nova.
- Respeitar termos de cada API (cache, atribuição, uso comercial). Confirmar antes de propor integração.
- Validar no navegador, incluindo layout móvel.

## Decisões de dados (a confirmar custos)
- Base de lugares: Google Places (guardar só `place_id`; buscar detalhes sob demanda) ou fontes gratuitas para o MVP.
- OpenTripMap: plano gratuito é só para uso não comercial; uso comercial exige plano pago.
- Distâncias e tempos: Routes API, com agrupamento por proximidade antes de chamar o LLM.
