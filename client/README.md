# Trivid

> [Ranaco]("https://github.com/Ranaco")

<br/>

## What it does

Trivid is a video streaming platform for web3. It allows user to create streams and maintain
them just like any native web2 streaming service provider. On top of that user can also capture
a moment and convert it to NFT. All this comes with the security of FVM blockchain
and Tableland's database / Spheron's storage.

## How I build it

The tech stack used for Trivid is as follows

1. Frontend
   - Next js
   - Material UI
   - Web3
1. Backend
   - Tableland
   - Spheron storage
1. Blockchain
   - FVM
   - Ethers
   - Solidity

## Features

- Live streaming service on top of FVM blockchain
- User friendly and fresh UI for seamless use.
- Create NFT of your favorite moments (Future work)
- Share/Trade NFT on the marketplace (Future work)

## Challenges I ran into

Creating a streaming service with such variety of technologies led to a lot of challenges

1. Integrating Tableland and FVM together

   - Tableland and FVM both were totally new for me, at least tableland was 'cuz I used
     a web3 database for the first time. Integrating them together to work flawlessly was not
     an easy task. Thanks to the well maintained documentation, it turned out to be great.

1. Integrating livepeer with the Tableland database
   - Syncing the state of the stream with Tableland's database was pretty complex.
     Had to go through a lots of research on Livepeer and React's core itself to store
     data efficiently. Tableland's delay issues on FVM was quite messy.

## Accomplishments I am proud of

1. Seamless integration of Livepeer streaming with Tableland and FVM. This is the greatest
   feat for this project. **Streaming with the state maintained on site and database**
2. The main issue was to make Livepeer interact with Tableland and FVM. Data could've
   been stored on the contract but this might have lead to increase in gas fees, using Tableland
   greatly helped with it.

## What I learnt

I learnt how FVM ecosystem in general works and how web3 database would be the core part
of blockchain revolution. This might lead to tremendous decrease in gas fees, which will
help the network in return.
<br/>
Integrating livepeer with Tableland and FVM helped me to understand the core technology
for blockchain and to work with it.

## What's next for Trivid

There are still a lot of work to do on Trivid.

1. Integrating the NFT contract with UI
1. Minting NFT throught Tableland's NFT service
1. Storing stream recording on Spheron's storage for better experience.
1. Integrate other features such as subscribing, ad etc. with the service.
