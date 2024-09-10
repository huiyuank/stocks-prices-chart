This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Wireframe

- Nav bar: Settings and account matters
- Side bar: Links to other sub pages
- Main content: D3 charts

## Components

- Inputs
  - Multiselect
  - Date picker
  - Toggle
- Line plot

## Project tasks

1. Fetching of data
2. Rendering multi-line chart
3. Input filter/selection -> MVC
   a. Stocks (up to 3) from US Exchange
   b. Date range
   c. Open/close/low/high display

## Unit testing

- Configure with Jest and React testing library
- Write tests in `__tests__` folder

Run test command in CLI:

```bash
npm run test
# or
yarn test
# or
pnpm test
# or
bun test
```
