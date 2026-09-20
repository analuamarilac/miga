# Miga — landing page

Estudo de caso de front-end: uma landing page de e-commerce de skincare, construída a partir de um mockup de design, com layout responsivo e interações reais.

> **Marca fictícia.** "Miga", os produtos, preços, avaliações e estatísticas foram criados para este exercício e não representam nenhuma empresa real.

## Stack

| Camada | Escolha |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack) |
| Linguagem | TypeScript |
| Estilos | Tailwind CSS v4 (tokens via `@theme`) |
| Animação | [`motion`](https://motion.dev) |
| Fontes | Playfair Display · DM Sans · IBM Plex Mono · Caveat (`next/font`) |
| Deploy | Vercel |

## Rodando localmente

```bash
npm install
npm run dev     # http://localhost:3000
```

Outros comandos: `npm run build`, `npm run start`, `npm run lint`.

## Estrutura

```
src/
├── app/
│   ├── globals.css        # tokens de design, base, utilitários de seção
│   ├── layout.tsx         # fontes, metadados, provider do carrinho
│   └── page.tsx           # composição das seções
├── components/
│   ├── art/               # ilustrações SVG (blobs, logo, ícones)
│   ├── layout/            # aviso, cabeçalho, rodapé
│   ├── sections/          # uma seção da página por arquivo
│   └── ui/                # botão, estrelas, reveal, foto, mídia, newsletter
├── data/                  # todo o conteúdo editável (produtos, quiz, artigos…)
│   ├── product-images.ts  # registro dos renders de embalagem
│   └── media.ts           # slots de fotografia (placeholder até ter foto)
└── lib/cart.tsx           # estado do carrinho (contexto React)
```

Conteúdo e apresentação são separados: os textos, produtos e perguntas do quiz vivem em `src/data/`, então dá para ajustar a página inteira sem tocar em componente.

## Interações

- **Hero** — navbar flutuante em pílula sobre a foto, que vira uma barra fixa quando o hero sai da tela. Card de entrada com anexo de foto (prévia local, sem upload), atalhos de intenção e chamada para o quiz.
- **Match da Pele** — quiz de 5 perguntas com barra de progresso, navegação para trás e uma rotina recomendada calculada a partir das respostas.
- **Carrinho** — "Adicionar ao carrinho" alimenta um contexto React; o contador do cabeçalho anima e o botão confirma a ação. Vale para os quatro produtos em destaque e para os dois lançamentos.
- **Rotina manhã / noite** — alterna os três passos com uma pílula que desliza entre as opções (`layoutId`).
- **Resultados** — os percentuais contam de zero quando a seção entra na viewport.
- **Newsletter** — validação de e-mail no cliente, com estado de erro e de sucesso (sem back-end).
- **Aviso de frete** — dispensável, e a escolha persiste na sessão.
- **Navegação** — cabeçalho fixo que encolhe ao rolar e menu lateral no mobile.
- **Entrada de seções** — revelação progressiva conforme a rolagem.

Tudo respeita `prefers-reduced-motion`: com a preferência ativa, os elementos aparecem estáticos em vez de animados.

## Imagens

**Embalagens** — renders fotográficos em `public/produtos/`, servidos por `next/image`. Os PNGs originais foram recortados no alfa, reduzidos para 1200 px no lado maior e convertidos para WebP: 8,2 MB → 491 KB, sem perda visível. O registro com caminhos, dimensões intrínsecas e textos alternativos vive em [`src/data/product-images.ts`](src/data/product-images.ts); os originais ficam em `design/originais/`, fora do versionamento.

Os frascos são verticais (proporção ~0,6) e as embalagens dos lançamentos são horizontais (~1,4), então a grade principal e a faixa de novidades usam enquadramentos diferentes.

**Hero** — a foto de fundo está em `public/hero/` (1,9 MB → 123 KB em WebP). Os adesivos que flutuam sobre ela foram recortados do próprio render do "Sem Climão" por componentes conexos do canal alfa: seis formas (estrela, flor, lua, nuvem, gota, círculo) em `public/adesivos/`, 84 KB no total. São literalmente o produto, reaproveitado como decoração.

**Decoração** — os blobs, a assinatura líquida, os ícones e os selos de pagamento continuam sendo SVG autorais.

**Fotos de pessoas** — retratos e o feed do Instagram ainda usam **placeholders desenhados**: um gradiente duotone com formas orgânicas, gerado de forma determinística a partir do id do slot. Para usar fotografia real, edite apenas [`src/data/media.ts`](src/data/media.ts):

```ts
"quiz-retrato": {
  src: "/fotos/retrato.jpg",   // ou uma URL remota
  alt: "Retrato em close de uma pessoa com sardas",
  tint: ["#f6dcc8", "#e7b48f"],
},
```

Nenhum componente muda. Para URLs remotas, registre o domínio em `next.config.ts` › `images.remotePatterns`.

## Acessibilidade

- HTML semântico, com landmarks e hierarquia de títulos consistente.
- Link "pular para o conteúdo" e foco visível em todos os elementos interativos.
- Quiz com `role="radiogroup"`, barra de progresso com `aria-valuenow` e anúncio via `aria-live`.
- Alternador de rotina com `role="tablist"`, menu mobile fechável com `Esc`.
- Anexo de foto por `<input type="file">` real, com rótulo associado e botão de remover.
- Placeholders de imagem expõem a descrição da foto para leitores de tela.

## Design

A paleta e a tipografia foram extraídas do mockup de referência e centralizadas como tokens em `globals.css`:

| Token | Uso |
| --- | --- |
| `--color-espresso` `#381b1a` | texto e botões primários |
| `--color-cream` `#fbf7f0` | fundo da página |
| `--color-blush` `#fcd8e4` | aviso de frete, Clube Miga |
| `--color-sky` `#dceafa` | hero e seção de rotina (com listras) |
| `--color-lilac` `#efe2f6` | Match da Pele |
| `--color-butter` `#fce9a4` | CTA final, pílula "manhã" |
| `--color-bubblegum` `#f5a2cb` | CTA da navbar, destaque do título do hero |

Serifada de alto contraste para os títulos, sans para nomes de produto e monoespaçada para rótulos e textos de apoio — o mesmo trio do mockup.

## Deploy

Importe o repositório na Vercel. O preset do Next.js é detectado automaticamente e não há variáveis de ambiente para configurar.
