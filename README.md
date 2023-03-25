This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Procedure-

1)User enters the address of the token.


2)We utilize smart contract APIs and integration libraries like Ethers.js and Web3.js to retrieve the necessary details of the token.

3)Based on the retrieved information, we analyze the contract and generate a risk factor.

4)The risk factor is calculated through three layers of verification checks:

5)The first check determines if the contract is verified or not.

6)The second check calculates a number by comparing the token creator's balance with their balance of that token.

7)The final check is based on the number of token holders.

8)The results of the three verification checks are combined in to an algorithm to provide a final risk factor number as the output of the analysis.

Website Preview

![WhatsApp Image 2023-03-25 at 1 56 18 PM](https://user-images.githubusercontent.com/94173505/227706669-82d109cf-0ee5-49bb-999f-4581492aeca8.jpeg)
![WhatsApp Image 2023-03-25 at 1 59 59 PM](https://user-images.githubusercontent.com/94173505/227706684-8bb3e305-8642-49ce-892d-b79c679a9b63.jpeg)

![WhatsApp Image 2023-03-25 at 1 59 59 PM(1)](https://user-images.githubusercontent.com/94173505/227706729-89567fd7-5e8d-46ad-a791-6dd33ad16507.jpeg)
![WhatsApp Image 2023-03-25 at 1 59 59 PM(2)](https://user-images.githubusercontent.com/94173505/227706735-8193f74f-62e8-424e-b0c5-8bc0f0dfe944.jpeg)
![WhatsApp Image 2023-03-25 at 2 06 09 PM](https://user-images.githubusercontent.com/94173505/227706830-8eceede0-7b1f-4747-8b62-ffdf41c5d5f4.jpeg)
