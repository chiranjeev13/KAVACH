
# ETH-COPS

Smart Token Analyzer and Vulnerability Detector

## Features

- Using ether.js & WEB3JS to interact with each ERC-20 contract and investigate each details about the contract.
- Check whether the input address is a valid ERC20 Token or not
- Frontend development using NextJS.
- Works with Ethereum and Polygon Mainnet


## How it Works ?

- User enters the address of the token.
- We utilize smart contract APIs and integration libraries like Ethers.js and Web3.js to retrieve the necessary details of the token.
- Based on the retrieved information, we analyze the contract and generate a risk factor.
- The risk factor is calculated through three layers of verification checks:
- The first check determines if the contract is verified or not.
- The second check calculates a number by comparing the token creator's balance with their balance of that token.
- The final check is based on the number of token holders.
- The results of the three verification checks are combined to provide a final risk factor number as the output of the analysis.
- We make use of of smart contract API providers from INFURA and ALCHEMY to fetch the token details on chain

## Screenshots

![WhatsApp Image 2023-03-25 at 13 56 17](https://user-images.githubusercontent.com/90638995/227706610-2dc40bca-92e6-49c6-9c4a-3b555a21c464.jpg)
![WhatsApp Image 2023-03-25 at 13 59 58](https://user-images.githubusercontent.com/90638995/227706625-61322dca-a756-46e9-a466-0d41fd796d7e.jpg)

![WhatsApp Image 2023-03-25 at 14 06 08](https://user-images.githubusercontent.com/90638995/227706701-532456a9-e7a4-491a-8718-b5115076f25f.jpg)


## Tech Stack

**Client:** NEXT.js

**Server:** Ethers.js, Web3.js, Node.js, Infura API Provider, Alchemy API Provider


## Future Developments

- Support on more blockchains like the Binance Smart Chain and Monero

- Smart contract audit reports

## To run this App

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

