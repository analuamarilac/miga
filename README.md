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

- **Hero** — navbar flutuante em pílula sobre a foto, que vira uma barra fixa quando o hero sai da tela. Card de entrada enxuto: anexar uma foto (prévia local, sem upload) e seguir para o teste.
- **Match da Pele** — teste em cinco perguntas no formato de revista, com alternativas a/b/c/d, progresso em estrelinhas e **quatro resultados distintos** conforme as respostas. Cada resultado tem selo, nome próprio, rotina recomendada e um botão que joga os produtos na sacola de uma vez.
- **Carrinho** — "Adicionar ao carrinho" alimenta um contexto React; o contador do cabeçalho anima e o botão confirma a ação. Vale para os quatro produtos em destaque e para os dois lançamentos.
- **Rotina manhã / noite** — alterna os três passos com uma pílula que desliza entre as opções (`layoutId`).
- **Resultados** — os percentuais contam de zero quando a seção entra na viewport.
- **Newsletter** — validação de e-mail no cliente, com estado de erro e de sucesso (sem back-end).
- **Aviso de frete** — dispensável, e a escolha persiste na sessão.
- **Navegação** — cabeçalho fixo que encolhe ao rolar e menu lateral no mobile.
- **Entrada de seções** — revelação progressiva conforme a rolagem.

Tudo respeita `prefers-reduced-motion`: com a preferência ativa, os elementos aparecem estáticos em vez de animados.

## Imagens

**Embalagens** — renders fotográficos em `public/produtos/`, servidos por `next/image`. Os PNGs originais foram recortados no alfa, reduzidos para 1200 px no lado maior e convertidos para WebP: 8,2 MB → 491 KB. O registro com caminhos, dimensões intrínsecas e textos alternativos vive em [`src/data/product-images.ts`](src/data/product-images.ts).

Os frascos são verticais (proporção ~0,6) e as embalagens dos lançamentos são horizontais (~1,4), então a grade principal e a faixa de novidades usam enquadramentos diferentes.

**Fotografia de campanha** — em `public/fotos/` e `public/hero/`, também otimizadas para WebP (11,7 MB → 908 KB). O slot de cada seção vive em [`src/data/media.ts`](src/data/media.ts); trocar uma foto é trocar um `src`, nenhum componente muda:

```ts
"quiz-retrato": {
  src: "/fotos/adesivos-no-rosto.webp",
  alt: "Pessoa de cabelo curto com adesivos para acne aplicados no rosto",
  tint: ["#f6dcc8", "#e7b48f"],
},
```

Dois slots (`artigo-niacinamida` e `artigo-barreira`) ainda usam o **placeholder desenhado**: um gradiente duotone com formas orgânicas, gerado de forma determinística a partir do id. Quem tiver foto é só apontar o `src`.

**Adesivos** — os elementos que flutuam sobre o hero e o teste foram recortados do próprio render do "Sem Climão", separando os componentes conexos do canal alfa: seis formas (estrela, flor, lua, nuvem, gota, círculo) em `public/adesivos/`, 84 KB no total. São literalmente o produto, reaproveitado como decoração — e os mesmos adesivos aparecem no rosto da foto do teste.

**Qualidade** — o `next/image` recomprime na entrega, e o padrão dele é `quality: 75`. Sobre um arquivo já comprimido, isso empilhava duas perdas. A foto do hero agora é gravada a q95 e servida com `quality={90}` (declarado em `next.config.ts` › `images.qualities`).

**Decoração** — os blobs, a assinatura líquida, os ícones e os selos de pagamento continuam sendo SVG autorais.

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
