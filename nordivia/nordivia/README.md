# Nordivia Biopharmaceuticals — Site (PT-BR / EN-CA)

Projeto completo em Next.js (App Router) + Tailwind + next-intl + Prisma (SQLite) + autenticação por sessão (JWT em cookie httpOnly).

## Requisitos
- Node.js 18+
- npm

## Setup
1) Crie `.env` a partir de `.env.example`
2) Instale deps:
```bash
npm install
```
3) Gere e migre banco:
```bash
npm run prisma:generate
npm run prisma:migrate
```
4) Seed dos produtos e usuário demo:
```bash
npm run seed
```
5) Rode:
```bash
npm run dev
```

Abra: http://localhost:3000

## Usuário demo
- Email: demo@nordivia.com
- Senha: Demo@12345

O fluxo de pagamento está estruturado para a  (Pix / boleto* / cartão).

### Variáveis de ambiente
No `.env`:
- `NEXT_PUBLIC_SITE_URL` (ex.: `https://seu-dominio.com`)

### Como funciona
1) No checkout do site, o pedido é criado no banco.
2) Em `/[locale]/payment`, o usuário escolhe Pix/Boleto/Cartão (com parcelas 1..10).

5) Como redundância, o retorno `GET /payment/return` tenta confirmar via `payment_check`.

\*Observação: a disponibilidade de boleto depende das opções habilitadas na sua conta PicPay. Se estiver habilitado, aparecerá no checkout.

## Observações importantes
- Imagens e bulas em `public/` são placeholders. Substitua pelos seus arquivos reais mantendo os nomes.
