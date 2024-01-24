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

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


## Working with youtube clone
Create a `.env.local` file from given template with name dotenv and keep your youtube v3 api key there to start working with real youtube data with consuming api. This .env file will be read in this project as mentioned in NextJS docs. So refer to "how to read `.env.local` in NextJS", basically it is automatically loaded and can be read with `process.env.[VARIABLE_NAME]`

## Get youtube v3 data api key
To `fetch` youtube data, obtain your `API Key` from `Google Cloud Platform`, and then look into 
[yotube v3 data api documentation](https://developers.google.com/youtube/v3/docs) to understand the data.

## Dependencies for Youtube Player Iframe API 
Tutorial at the link [how to use youtube iframe in react](https://www.freecodecamp.org/news/use-the-youtube-iframe-api-in-react/) and the code sandbox link is [sandbox link of the tutorial to see and review the code](https://codesandbox.io/p/sandbox/react-youtube-demo-f6l29?file=%2Fsrc%2FApp.js)