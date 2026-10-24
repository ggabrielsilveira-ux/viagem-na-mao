# Viagem na Mão

Protótipo estático para planejar várias viagens, organizar um roteiro, descobrir atividades e acompanhar despesas. Feito com HTML, CSS e JavaScript, sem dependências ou instalação.

## O que já dá para fazer

- Definir o nome e as datas da viagem, o orçamento e as cidades visitadas.
- Guardar datas e endereços das hospedagens de cada cidade.
- Registrar transporte, carro alugado, acompanhantes, crianças, idosos e interesses como natureza, cultura, gastronomia, aventura e compras.
- Ver uma página inicial com mensagens de gratidão, 10 paisagens inspiradoras e 10 versículos em rotação a cada 15 segundos, várias viagens e contagem regressiva.
- Explorar cartões, descartar ideias, guardar em “Talvez depois” ou adicionar atividades ao roteiro com botões, setas do teclado (← passar, → curtir, ↓ talvez) ou arrastando o cartão (direita, esquerda e para baixo).
- Organizar compromissos por dia e horário, arrastar paradas entre dias (ou escolher o dia na lista, que também funciona no celular) ou criar compromissos manuais.
- Usar uma sugestão automática local para distribuir atividades guardadas; ela não usa IA, trânsito ou dados de distância.
- Registrar despesas de transporte, hospedagem, alimentação, atrações, compras, seguro e outros.
- Informar moeda e cotação manual, ocultar valores e consultar orçamento, gastos e previsão.
- Consultar uma lista geral de preparação para a viagem e marcar itens revisados.
- Manter as escolhas no armazenamento local do navegador.
- Encontrar 94 sugestões de atrações em 21 destinos de teste: Rio de Janeiro, Paraty, Gramado, Canela, Florianópolis, Curitiba, São Paulo, Foz do Iguaçu, Salvador, Recife, Olinda, Fortaleza, Brasília, Belo Horizonte, Bonito, Manaus, Porto Alegre, João Pessoa, Natal, Búzios e Aquiraz.
- Descobrir algumas ideias de eventos sazonais, sem datas presumidas.
- Abrir buscas da atração no Google Maps e no Tripadvisor para conferir informações atuais.
- Ver, em 74 das 94 atrações, dados de fontes abertas: foto real com autor e licença (Wikimedia Commons), resumo e link da Wikipedia, site oficial (Wikidata) e coordenadas.
- Ver no roteiro o tempo de carro e a pé entre paradas consecutivas que têm coordenadas, calculado pelo OSRM (servidor público da FOSSGIS, dados OpenStreetMap, sem trânsito). Enquanto calcula ou se o serviço falhar, mostra a distância em linha reta.

## Executar

Abra `index.html` em um navegador moderno. Não é necessário iniciar um servidor. O Google Fonts e as imagens ilustrativas usam recursos externos e precisam de conexão com a internet; sem conexão, o conteúdo e os controles continuam disponíveis.

## Catálogo e fontes

O protótipo inclui um catálogo editorial fixo de pontos turísticos conhecidos em destinos brasileiros. A seleção serve para testar o fluxo do app; não é um ranking oficial por número de visitantes. Os nomes foram conferidos em páginas de turismo e atrações, por exemplo:

- [Gramado Inesquecível](https://www.gramadoinesquecivel.tur.br/) e [Parque do Caracol, Canela](https://www.parquecaracol.com.br/)
- [Turismo de Florianópolis](https://turismo.pmf.sc.gov.br/) e [Turismo de Curitiba](https://turismo.curitiba.pr.gov.br/)
- [Visit Rio](https://visitrio.com.br/), [Trem do Corcovado](https://www.tremdocorcovado.rio/) e [Bondinho Pão de Açúcar](https://bondinho.com.br/)
- [Cidade de São Paulo](https://cidadedesaopaulo.com/), [MASP](https://masp.org.br/) e [Mercado Municipal de São Paulo](https://www.mercadomunicipalsp.com.br/)
- [Visit Foz](https://visitfoz.com.br/), [Cataratas do Iguaçu](https://cataratasdoiguacu.com.br/) e [Parque das Aves](https://www.parquedasaves.com.br/)
- [Salvador da Bahia](https://www.salvadordabahia.com/) e [Centro Histórico de Salvador — UNESCO](https://whc.unesco.org/en/list/309/)
- [Prefeitura do Recife](https://www2.recife.pe.gov.br/), [Instituto Ricardo Brennand](https://www.institutoricardobrennand.org.br/) e [Centro Histórico de Olinda — UNESCO](https://whc.unesco.org/en/list/189/)
- [Visit Fortaleza](https://visitfortaleza.com.br/) e [Centro Dragão do Mar](https://www.dragaodomar.org.br/)
- [Secretaria de Turismo do DF](https://www.turismo.df.gov.br/) e [Brasília — UNESCO](https://whc.unesco.org/en/list/445/)
- [Portal Belo Horizonte](https://portalbelohorizonte.com.br/) e [Conjunto da Pampulha — UNESCO](https://whc.unesco.org/en/list/1493/)
- [Turismo de Bonito](https://www.turismo.bonito.ms.gov.br/) e [Rio da Prata](https://www.riodaprata.com.br/)
- [Amazonastur](https://www.amazonastur.am.gov.br/) e [Secretaria de Cultura do Amazonas](https://cultura.am.gov.br/)

Os cartões não exibem notas nem quantidades de avaliações inventadas. Preços são apresentados como **“Consulte valor”**, horários avisam que podem variar, e as imagens sem crédito de foto são ilustrativas. Use os links de busca do Google Maps e Tripadvisor no cartão para verificar avaliações, fotos, horários e preços atualizados. As opções de eventos são sazonais e não indicam que haverá programação nas datas da viagem.

### Fontes abertas (Wikipedia, Wikidata, Wikimedia Commons)

O arquivo `dados/fontes-abertas.js` é gerado por `node ferramentas/gerar-fontes-abertas.mjs` (Node 18+ e internet). O script lê o catálogo do `script.js`, procura a página de cada atração na Wikipedia em português e só aceita o resultado se a coordenada estiver a até 60 km da cidade (ou, sem coordenada, se o texto citar a cidade). Fotos só entram com licença livre identificada (domínio público, CC0, CC BY, CC BY-SA), e o cartão mostra autor e licença com link para a página da foto. O resumo da Wikipedia aparece com crédito e licença CC BY-SA 4.0. Rode o script de novo quando o catálogo mudar; atrações sem correspondência confiável continuam com a imagem ilustrativa.

Essas fontes não têm notas, preços nem horários, então o app continua sem esses dados.

### Tempos de deslocamento (OSRM)

O roteiro consulta `routing.openstreetmap.de` (perfis `routed-car` e `routed-foot`) direto do navegador, uma requisição por vez com intervalo de 1,1 s, e guarda os resultados na chave `viagem-na-mao-rotas-v1` do `localStorage` (separada dos dados das viagens). O servidor é gratuito para **uso não comercial** e sem garantia de disponibilidade ([termos](https://routing.openstreetmap.de/about.html)); antes de cobrar assinatura, troque por uma instância própria do OSRM, por um serviço pago ou pela Routes API via backend. Os tempos não consideram trânsito.

## APIs e integração futura

- [Google Places API](https://developers.google.com/maps/documentation/places/web-service/overview) permite buscar estabelecimentos e pontos de interesse. Requer projeto, chave e faturamento; há restrições de armazenamento e atribuição ([políticas](https://developers.google.com/maps/documentation/places/web-service/policies)). Uma chave usada no navegador precisa ser restringida por domínio e API; não publique uma chave irrestrita.
- O programa [Google Things to do](https://developers.google.com/actions-center/verticals/things-to-do/overview) é voltado a parceiros aprovados que enviam inventário ao Google; não é uma API pública para consultar o catálogo no nosso app.
- O Tripadvisor direciona integrações novas para a [Terra](https://docs.terra.tripadvisor.com/docs/overview.md); a antiga [Content API está depreciada](https://tripadvisor-content-api.readme.io/reference/overview). A chave não deve ser exposta no frontend, e o conteúdo tem regras específicas de cache ([segurança](https://docs.terra.tripadvisor.com/docs/api-security.md), [cache](https://docs.terra.tripadvisor.com/docs/caching-policy.md)).
- A [Viator Partner API](https://docs.viator.com/partner-api/) dá acesso a conteúdo e produtos para parceiros, com condições conforme o modelo da parceria.
- A [Civitatis informa oferecer API e ferramentas para afiliados](https://www.civitatis.com/pt/afiliados/), mas não publica nessa página a especificação técnica nem as condições completas de acesso.

Para o projeto continuar estático, a opção mais simples é manter o catálogo editorial e abrir buscas externas. Para conectar APIs de parceiros e proteger credenciais, o próximo passo recomendado é criar um backend (ou função serverless), confirmar licenças e atribuições e só então atualizar preços, disponibilidade e avaliações. Esses serviços podem cobrar por uso ou exigir aprovação comercial.

### O que falta para trazer dados reais do mundo todo

A integração é possível, mas ainda não está ativa: o protótipo não tem backend, conta da Terra nem credenciais de API. Para usar o Tripadvisor, é preciso criar uma conta na plataforma [Terra](https://www.tripadvisor.com/developers) e habilitar um pacote com os endpoints necessários. A documentação da Terra inclui busca de locais, detalhes, avaliações e fotos; a disponibilidade depende do pacote, das cotas e dos termos comerciais. O Discover é apresentado como autoatendimento e tem cobrança por uso após a franquia inicial descrita na [tabela oficial de preços](https://docs.terra.tripadvisor.com/docs/usage-based-pricing.md); confirme os valores atuais antes de integrar. Os termos também limitam armazenamento e cópia: fora das exceções contratuais, o conteúdo não pode ser armazenado em cache; a chave não pode ser colocada no código do navegador.

Próximos passos para uma integração mundial:

1. Escolher e habilitar acesso às fontes desejadas — Tripadvisor Terra para conteúdo Tripadvisor; Google Places para busca, horários, avaliações e fotos de locais; Viator ou Civitatis para passeios e experiências com disponibilidade comercial.
2. Criar um backend ou função serverless para guardar as chaves em variáveis de ambiente, consultar as fontes com segurança, controlar limites e apresentar erros ao app.
3. Implementar busca por destino e detalhes, atribuição e links exigidos pelos provedores, respeitando licenças de texto e imagem, regras de atualização e armazenamento.
4. Configurar cobrança e limites de uso, testar cobertura por países/idiomas e definir um catálogo alternativo quando um provedor não tiver dados para determinado local.

Sem esses acessos, o app pode abrir buscas externas para consulta, mas não deve copiar páginas do Tripadvisor nem apresentar conteúdo, fotos, avaliações ou preços como se viessem de uma API atualizada. A cobertura e a atualização variam por fornecedor; nenhuma fonte garante todos os lugares, eventos ou horários do mundo.

## Limites desta versão

Esta demonstração não consulta nem copia automaticamente dados de Google ou Tripadvisor. A sugestão de roteiro usa regras simples locais e não é gerada por IA nem otimiza a ordem das paradas. Os tempos de carro e a pé vêm do OSRM público (teste não comercial) e não consideram trânsito. Cotação de moedas é informada manualmente; não há taxa de câmbio ao vivo. O guia pré-viagem é geral e não substitui orientação oficial ou profissional. O link/cupom Nomad está sujeito às condições do parceiro e não tem benefício validado pelo protótipo.

As viagens e despesas ficam neste navegador e não são sincronizadas entre dispositivos. A estimativa combina despesas lançadas com preço conhecido das atividades salvas; não precifica itens marcados “Consulte valor” nem inclui despesas futuras ainda não registradas. Os valores são tratados em reais para consolidação; para outras moedas, o usuário fornece a cotação manual. A data e o relógio da interface usam o fuso `America/Sao_Paulo` e formato de 24 horas nesta versão.

## Arquivos

- `index.html`: estrutura e telas do app.
- `styles.css`: identidade visual e layout responsivo.
- `script.js`: catálogo de demonstração, filtros, roteiro e armazenamento local.
- `dados/fontes-abertas.js`: dados gerados de Wikipedia, Wikidata e Commons (não editar à mão).
- `ferramentas/gerar-fontes-abertas.mjs`: script que gera o arquivo acima.