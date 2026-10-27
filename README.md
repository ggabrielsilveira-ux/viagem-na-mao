# Viagem na Mão

Protótipo estático para planejar várias viagens, organizar um roteiro, descobrir atividades e acompanhar despesas. Feito com HTML, CSS e JavaScript, sem dependências ou instalação.

## O que já dá para fazer

O app é pensado primeiro para o celular: cada tela tem barra superior com botão voltar (o voltar do celular também funciona) e, dentro da viagem, uma barra de abas embaixo (Resumo, Roteiro, Descobrir, Custos e Guia).

- **Início:** cabeçalho com o logo e o perfil, saudação com o seu nome (opcional, em Ajustes), cartão de reflexão em destaque que pode ser dispensado pelo resto do dia, viagem em foco (a em andamento ou a próxima) com "Continuar viagem", acesso rápido a Agenda, Gastos, Descobrir e Memórias, inspiração do dia com 18 destinos fotografados (créditos do Wikimedia Commons), lista de todas as viagens, versículo e navegação de baixo (Início, Viagens, nova viagem, Inspiração, Perfil).
- **Cadastro em etapas:** escolher cidades numa lista com busca (103 cidades no Brasil e no exterior, ou uma cidade digitada), datas num calendário de faixa (ida e volta no mesmo calendário), noites por cidade, quem vai e como, interesses e orçamento (com moeda e cotação manual).
- **Resumo:** capa com foto real do destino, roteiro das cidades com as hospedagens de cada uma, ideias guardadas, orçamento e perfil da viagem.
- **Descobrir:** tela exclusiva de cartões no estilo "swipe" (direita = curti, esquerda = não curti, baixo = talvez), por toque, mouse, botões ou setas do teclado, com detalhes do lugar numa janela que sobe de baixo. A aba mostra Curtidas, Talvez depois e Não curtidos em listas recolhidas; dá para mudar de ideia sobre um lugar passado. A pessoa escolhe até que distância quer ver lugares (5, 10, 25 km ou tudo), a partir do centro da cidade ou da hospedagem; a escolha fica salva na viagem.
- **Hospedagens:** várias por cidade, cada uma com as suas noites (entrada e saída), nome e endereço. O endereço é localizado no mapa pelo [Nominatim](https://nominatim.org/) (OpenStreetMap) quando você toca em "Localizar no mapa"; o app avisa noites sem hospedagem e não deixa duas hospedagens na mesma noite.
- **Roteiro:** um dia por vez (faixa de dias no topo), saindo e voltando da hospedagem do dia, paradas por horário, tempo de carro e a pé entre os pontos (OSRM), mover parada de dia ou horário, arrastar paradas para mudar a ordem (segurar e arrastar no celular; os horários ficam e as paradas trocam de lugar) e compromissos com nome, categoria, horário sugerido e endereço localizado no mapa, que entram nos deslocamentos. "Sugerir roteiro" distribui os lugares curtidos pelos dias de cada cidade, começando pelo mais perto da hospedagem (regras simples e distância em linha reta, sem IA).
- **Custos:** tudo na moeda da viagem (a do orçamento, por exemplo euro), com opção de ver em reais pela cotação informada; resumo de gasto, orçamento, previsão e saldo; gastos por categoria; despesas agrupadas por dia; nova despesa já na moeda da viagem, aceitando vírgula ("18,50"); opção de ocultar valores.
- **Ler recibo pela foto:** na nova despesa, o texto da foto é lido no próprio aparelho pelo [Tesseract.js](https://github.com/naptha/tesseract.js) (Apache 2.0, carregado na primeira vez pelo jsDelivr, cerca de 5 MB) e regras simples sugerem valor, moeda, data, descrição e categoria para a pessoa conferir antes de salvar. A foto não sai do aparelho; não é IA.
- **Guia:** para cada país da viagem, clima nas datas (Open-Meteo), documentos, visto, autorização eletrônica, seguro, vacinas, moeda, tomadas, idioma, emergência, trânsito e gorjeta, com fontes oficiais e data da pesquisa; seção **Na Hora do Aperto** por cidade (água potável, banheiros, pontos de recarga de celular, farmácias e hospitais mais próximos do centro, da hospedagem ou de onde a pessoa está, com distância em linha reta e botão para abrir a rota no mapa); checklist personalizado (passaporte, visto, seguro, adaptador, PID se alugar carro, autorização para menores etc.) que dá para marcar, baixar e compartilhar.
- **Lugares:** catálogo editorial (94 atrações), cerca de 1.700 atrações de Wikidata/Wikipedia/Commons num raio de até 50 km de cada cidade e lugares do OpenStreetMap (restaurantes, cafés, bares, mercados, praias, mirantes, parques, museus e shoppings), com fotos reais creditadas quando existem.
- **Meu Baú de Memórias:** sexta aba da viagem ("Memórias") (e um cartão no Resumo). Guardar momento com fotos e/ou texto, data do acontecimento editável (inclusive dias anteriores), lugar e título opcionais, linha do tempo por dia, editar e excluir com confirmação, aviso ao sair sem salvar. Também dá para guardar um momento a partir de uma parada do roteiro. Privado: fica só neste aparelho e nada é publicado.
- **Álbum e carrossel:** na retrospectiva, gera no próprio aparelho um álbum com layouts variados (capa em tela cheia, foto sangrada com texto, polaroide, dupla de polaroides, colagem e cartão de citação, com selo do dia). Sai como PDF A5 ou como carrossel de imagens 4:5 para redes sociais. Prévia antes de baixar ou compartilhar, com opção de esconder datas, lugares e textos. Sem bibliotecas nem serviços externos; gastos não entram.
- **Vídeo da viagem (experimental):** na retrospectiva, grava no próprio aparelho um vídeo vertical de 15, 20 ou 30 segundos (abertura com capa e título, fotos com zoom lento e legenda, cartões de citação e encerramento com a marca). Trilha opcional entre cinco músicas livres de Kevin MacLeod (CC BY 3.0, crédito no fim do vídeo) ou sem música, para escolher uma faixa licenciada no Instagram ou TikTok. Sai em MP4 (Safari e Chrome atuais) ou WebM.
- **Compartilhar uma memória:** no detalhe da memória, gera uma imagem (Post 4:5 ou Stories 9:16) com a foto escolhida, o texto e a data, com prévia antes de enviar e opção de esconder texto, data e lugar (o lugar vem escondido). Leva o crédito discreto "Feito com Viagem na Mão". Envia pelo menu de compartilhar do celular ou baixa a imagem; só aquela memória sai do app.
- **Contagem regressiva:** meses, dias, horas e minutos até a saída (horário opcional), e durante a viagem "Dia X de Y" com há quanto tempo se está viajando.
- **Convites leves:** durante a viagem, no máximo um convite por dia para guardar uma memória, só dentro do app (na tela inicial e no Resumo): depois do primeiro passeio do dia ou a partir das 18h. Some com "Agora não" ou quando você já guardou algo no dia. Dá para desligar em Ajustes. Sem sequência de dias nem cobrança.
- **Fim de viagem e retrospectiva:** depois da data de volta, o Resumo mostra uma celebração discreta ("Rever minha viagem" ou "Guardar minha primeira lembrança", com "Agora não"). A retrospectiva mostra as memórias por dia, com capa e título; no modo de edição dá para escolher o que aparece, a capa e a ordem dentro de cada dia. Fica só neste aparelho.
- **Mensagens contextuais:** frases curtas no dia de viagem, no orçamento apertado e no Baú, vindas de `dados/mensagens.js`. Cada contexto tem pelo menos três frases e o app evita repetir as últimas usadas.
- **Ajustes (engrenagem na tela inicial):** como instalar o app na tela inicial do celular, backup de tudo (viagens, roteiros, custos, memórias e fotos) num arquivo `.json` e restauração do backup (juntar ou substituir).
- **Contas (teste fechado):** em Ajustes, login com código enviado por e-mail (Supabase, só para convidados). Com a conta, viagens, memórias e fotos sincronizam na nuvem e o primeiro login oferece juntar as viagens do aparelho com as da conta. Sem conta, tudo continua só no aparelho. Já existe uma tabela de assinatura (só leitura no app) para a cobrança futura.
- Os dados ficam neste aparelho: textos no armazenamento local do navegador e fotos do Baú no IndexedDB (sem conta nem sincronização).

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

### Atrações de 250 cidades

`dados/atracoes-cidades.js` é gerado por `node ferramentas/gerar-atracoes-cidades.mjs` (leva vários minutos; resultados por cidade ficam em `ferramentas/.cache/`, fora do Git, para retomar se parar). Para cada cidade da lista no início do script, consulta no Wikidata lugares de tipos turísticos (museu, praia, parque, igreja, mirante, mercado etc.) num raio de 50 km, ordenados pelo número de Wikipedias em que aparecem, e guarda até 25 com artigo na Wikipedia em português. Em cidades com dados demais (Paris, Londres, Tóquio...) a consulta de 50 km estoura o tempo do Wikidata e o script usa raio menor (8 a 10 km). Descarta obras de acervo (P195) e lugares que deixaram de existir (P576).

Limites conhecidos: a quantidade varia muito por cidade (há cidades com 1 a 5 atrações e Caldas Novas ficou sem nenhuma); a categoria vem do tipo no Wikidata e pode não ser a ideal; a descrição é o resumo da Wikipedia, com crédito CC BY-SA 4.0 no cartão; restaurantes e lojas quase não aparecem.

### Lugares do OpenStreetMap

`dados/osm-lugares.js` é gerado por `node ferramentas/gerar-osm.mjs` (depois de `gerar-atracoes-cidades.mjs`, que define as cidades). Para cada cidade, uma consulta ao Overpass público busca: restaurantes, cafés, bares, sorveterias e mercados com horário cadastrado (até 8 km do centro), atrações, museus, galerias e shoppings (até 15 km), praias (até 25 km) e mirantes, cachoeiras, picos e parques com Wikidata (até 50 km). Por cidade guarda os mais completos de cada grupo (12 de comida, 10 de natureza, 8 de cultura, 4 de diversão e 3 de compras), sem repetir o que já veio do Wikidata. O cartão mostra o tipo, a cozinha e o horário informado no OSM, com o crédito "© colaboradores do OpenStreetMap" (licença ODbL). O OSM não tem descrições, notas nem preços. A consulta leva cerca de 1 minuto por cidade; o resultado de cada cidade fica em `ferramentas/.cache/osm/`. Quando o Overpass está fora do ar, `node ferramentas/extrair-pbf.mjs` monta o mesmo cache a partir dos extratos do [Geofabrik](https://download.geofabrik.de/) (use `PBF_DIR` para baixar fora do OneDrive) e depois `SO_CACHE=1 node ferramentas/gerar-osm.mjs` gera o arquivo.

### Na Hora do Aperto

`dados/aperto/<cidade>.js` (um arquivo por cidade, carregado só quando a pessoa abre o Guia) é gerado por `CAMADA=aperto node ferramentas/extrair-pbf.mjs` seguido de `node ferramentas/gerar-aperto.mjs`. Num raio de 10 km do centro entram: água potável (`amenity=drinking_water` e fontes ou torneiras com `drinking_water=yes`), banheiros sem acesso privado (`amenity=toilets`), pontos de recarga de celular (`amenity=device_charging_station`, ainda raros no mapa), farmácias e hospitais. Só aparecem horário, gratuidade, acessibilidade e pronto-socorro quando o OSM informa. O app sempre avisa que os dados são colaborativos e podem estar incompletos, com o crédito © OpenStreetMap (ODbL).

### Guia do destino e clima

`dados/guia-paises.js` reúne, por país, documentos aceitos, validade do passaporte, visto, autorização eletrônica, seguro, vacinas, comprovantes, moeda, tomadas, idioma, emergência, mão de direção e gorjeta para brasileiros, pesquisados em fontes oficiais (com links e data). Regras mudam: o app sempre pede para confirmar com o consulado e fontes oficiais. O clima vem da [Open-Meteo](https://open-meteo.com/) (sem chave, CC BY 4.0, gratuita para uso não comercial): previsão quando a viagem está a até 14 dias; senão, as mesmas datas do ano anterior. As dicas do que levar são regras simples a partir das temperaturas e da chuva, não IA. Uma etapa futura pode gerar textos personalizados com IA por meio de um backend (a chave da API nunca fica no navegador).

### Marca

A pasta `marca/` traz o kit do manual de identidade visual (versão 1.0, proposta inicial de 24/10/2026): símbolo, ícone do app, logo horizontal sobre fundo claro e verde, versão monocromática e os PNGs do ícone usados na instalação (`manifest.webmanifest`). A paleta do app segue o manual: verde-floresta `#15563F`, verde-menta `#56D7AE`, coral `#FF8068` e creme `#FFFDF5`; o coral é usado só em preenchimentos, não em texto pequeno, por contraste. Nome, tipografia e acabamento ainda dependem de validação antes do uso comercial.

### Ícones e imagens

Os ícones são do [Lucide](https://lucide.dev/) (licença ISC), copiados para `icones.js` para funcionar sem internet. As imagens ilustrativas ficam em `imagens/` (fotos do [Unsplash](https://unsplash.com/license), que permite uso e hospedagem). Fotos de lugares vêm do Wikimedia Commons, com autor e licença exibidos.

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

As viagens, despesas e memórias ficam neste navegador e não são sincronizadas entre dispositivos; trocar de aparelho ou limpar os dados do navegador apaga tudo, por isso existe o backup em Ajustes. No iPhone, o Safari pode apagar dados de sites pouco usados depois de cerca de 7 dias; instalar na tela inicial evita isso. O vídeo é gravado em tempo real e depende do navegador gravar canvas (Safari 14.1+ e Chrome atuais); não há notificação fora do app. A estimativa combina despesas lançadas com preço conhecido das atividades salvas; não precifica itens marcados “Consulte valor” nem inclui despesas futuras ainda não registradas. Os valores são tratados em reais para consolidação; para outras moedas, o usuário fornece a cotação manual. A data e o relógio da interface usam o fuso `America/Sao_Paulo` e formato de 24 horas nesta versão.

## Arquivos

- `index.html`: telas do app (início, viagem com abas, descobrir, cadastro em etapas e janelas de baixo).
- `styles.css`: identidade visual e layout responsivo.
- `script.js`: catálogo de demonstração, filtros, roteiro e armazenamento local.
- `dados/fontes-abertas.js`: dados gerados de Wikipedia, Wikidata e Commons (não editar à mão).
- `ferramentas/gerar-fontes-abertas.mjs`: script que gera o arquivo acima.
- `dados/cidades.js` e `dados/cidades/<cidade>.js`: índice das cidades (sempre carregado) e um pacote por cidade com os lugares da Wikipedia/Wikidata e do OSM, baixado só quando a cidade entra numa viagem. Gerados por `node ferramentas/dividir-cidades.mjs` a partir de `atracoes-cidades.js` e `osm-lugares.js`; depois de gerar de novo, subir `CITY_PACK_VERSION` no `script.js`.
- `ferramentas/cartoes-postais.json`, `ferramentas/gerar-capas.mjs` e `dados/capas-cidades.json`: a capa de cada cidade é a foto do seu cartão-postal (o ponto turístico mais conhecido, escolhido à mão), pela imagem oficial do Wikidata ou por uma foto de destaque/qualidade do Commons que retrata o lugar; vai dentro do pacote da cidade. Foto em pé aparece inteira sobre fundo desfocado. Depois de gerar, rode `dividir-cidades.mjs` e suba `CITY_PACK_VERSION`.
- `ferramentas/supabase-metricas.sql` e `painel.html`: estatística de uso do teste (no máximo uma vez por dia por aparelho, só contagens: viagens, cidades, memórias, gastos, app instalado; nunca conteúdo) e o painel dos testadores em /painel.html, que só responde para e-mails da tabela `administradores`.
- `ferramentas/supabase-perfis.sql` e `ferramentas/supabase-opinioes.sql`: cadastro do testador (nome, WhatsApp, aniversário dia/mês, aceite de novidades) e as opiniões do botão "Enviar opinião" (fila no aparelho quando está sem internet); ambos aparecem no painel.
- `sw.js`: service worker que guarda o app, o índice, os pacotes e os pontos úteis das cidades da viagem e as fotos já vistas (até 400) para usar sem internet. Clima, rotas, endereços e conta sempre pela rede.
- `dados/atracoes-cidades.js`: atrações de 250 cidades (gerado, não editar à mão; o app não carrega este arquivo, ele alimenta `dividir-cidades.mjs`).
- `ferramentas/gerar-atracoes-cidades.mjs`: script que gera o arquivo acima e define a lista de cidades.
- `dados/osm-lugares.js` e `ferramentas/gerar-osm.mjs`: lugares do OpenStreetMap (gerado, não editar à mão).
- `ferramentas/extrair-pbf.mjs`: monta o cache do OSM a partir dos extratos do Geofabrik, sem Overpass.
- `dados/aperto/` e `ferramentas/gerar-aperto.mjs`: pontos úteis da seção Na Hora do Aperto (gerado, não editar à mão).
- `dados/guia-paises.js`: regras de entrada e informações práticas por país.
- `dados/mensagens.js`: biblioteca de mensagens por contexto (pode ser editada à mão).
- `site/`: site de divulgação (viagemnamao.com) com lista de espera, política de privacidade e termos. Publicado pela Vercel com a pasta `site` como raiz; a função `site/api/lista-espera.js` grava os e-mails no Supabase usando as variáveis `SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY`, configuradas só no painel da Vercel. A tabela é criada com `ferramentas/supabase-lista-espera.sql`.
- `manifest.webmanifest` e `marca/`: instalação na tela inicial e arquivos da marca.
- `musicas/` e `ferramentas/baixar-musicas.mjs`: trechos de 36 s das músicas livres do vídeo (Kevin MacLeod, incompetech.com, CC BY 3.0, baixadas do Wikimedia Commons).
- `icones.js`: ícones Lucide usados no app.
- `imagens/`: imagens ilustrativas hospedadas no projeto.