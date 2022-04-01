---
layout: blogpost
author: "Francesco Gentile"
---

Last week I participated on Eth global's LFGrow hackathon. I had been keeping an eye on Web3 hackathons for a couple months. I had even signed up for a 2-weeks Git coin hackathon in early February, but I never sat down to write a single line of code. I think I wasn't yet comfortable enough with the technology and had also been having a hard time getting started with work in general after moving alone during the vacations. So in march I set myself a goal of earning for the month (That's a good thing about being a freelancer, you're limited only by how much you can work and how well you sell that work).

During this month I finished a [loooong solidity course](https://www.youtube.com/watch?v=M576WGiDBdQ) I had been taking since January, dove a little deeper into frotende technologies with React.js and tried to get more confortable with development tools. I learned how to setup a simple react app with webpack and babel (without create-react-app) and made a few simple token projects with Brownie, the most advance being a custom ERC-721 (NFT) with a frontend which I still have to finish but it taught me how to integrate Brownie (Python) with a React.js project and gave me my fist experience with ethers.js.

This hackathon was a bit different in that it required staking some ETH to participate. So this time, if I didn't submit any project, I would lose money. Perhaps a little commitment device was all I needed.

## The Hackathon

![LFGrow](/assets/Images/LFGrow.png)

Before the hackathon, there were team-formation activities on Thursday and Friday. Here I had te opportunity to speak and get to know other participants. These days I talked with various teams, discussed ideas and shared experience until on Saturday I decided to settle down with the **[MemeDao](https://showcase.ethglobal.com/lfgrow/memedao-jzss6)** team.

![(Part of) The team](/assets/Images/LFGrowTeam.png)

The main requirement for projects was that they had to use the main sponsor's technology (Using other sponsor's tech, like Chainlink, was optional and made you eligible to win secondary prizes). That sponsor was the **[Lens Protocol](https://lens.dev/)**, a project by the team behind [Aave](https://aave.com). In short, Lens is a decentralized social graph protocol that serves as a shared data layer for multiple applications. This means that if you create a new application based on Lens you don't have to start from scratch, instead you are able to leverage the existing users and content from any other platform that also runs on lens, making the whole ecosystem much more dynamic and decentralized.

## The Project: MemeDAO

### [Project Page](https://showcase.ethglobal.com/lfgrow/memedao-jzss6)
[![Project Page](/assets/Images/LFGProjectScreen.png)](https://showcase.ethglobal.com/lfgrow/memedao-jzss6)

We had decided to make a Meme curation tool based on the Lens Protocol. In short, we created a smart contract that holds a Lens Profile NFT and runs on a 24 hr cycle set by [Chainlink keepers](https://keepers.chain.link/). The cycle was the following:
- A private meme request post is published by the Smart Contract.
- Members of the dao post memes in response to the request.
- Members vote on their favorite memes
- A the end of the day the most liked meme is chosen and published to the open public.
- That publication is open for collect (minting an NFT of the publication) in an auction, which is open for a whole cycle.
- When the cycle closes, the winner of the auction is able to collect the post and a new request is posted by the Smart Contract.

Surprisingly, we managed to implement everything... on the back-end. We had some "Human Resources problems". At the beginning we were a team of four where only two of us were coders (Both back-end). So we went recruiting and found a front-end developer, which after two days of trying to set up their dev environment and get them familiar with Lens, was called for a work trip and had to leave the team :(. Then we got a replacement, he did an awesome job, but didn't have much time as he had to work full-time and joined on Wednesday. In that time he managed to build the whole front-end functioning. But it was with mock data, because the back-end took some time to be finished and it was his first experience with ethers.js to connect directly to the blockchain from the browser. Going back to the back-end, the other dev tried really hard to do his best, but time zones made collaboration difficult and we weren't able to get him up to date on the current development so he decided to leave the team.

## The technical details (You can skip this)

### [Github Repo](https://github.com/Eyon42/MemeDAO)
[![Github Repo](/assets/Images/LFGrowGithubPage.png)](https://github.com/Eyon42/MemeDAO)

As I mentioned earlier, we started implementing a Smart Contract that holds the profile and does some basic actions. But most of what we needed to do wasn't already implemented on the Lens Protocol. Luckily, the protocol supports custom modules for the "follow", "reference" and "collect" actions, So we went ahead and wrote all modules that were needed.

### Modules Written:
#### [TwoWayReferenceModule](https://github.com/Eyon42/MemeDAO/blob/main/contracts/core/modules/reference/TwoWayReferenceModule.sol)
The Lens Protocol doesn't have a way to natively get all of the publication that reference a given publication. We implemented this module (and made it easy to incorporate into other modules) for that exact reason. 

#### [ReactionsModule](https://github.com/Eyon42/MemeDAO/blob/main/contracts/core/modules/reference/ReactionsModule.sol)
Based on TwoWayReferenceModule, it adds a function to count comments with a determinated contentURI. This way we can set up a standard for our app where, for example, if the comment has `contentURI="\like"` then that's counted as a like.
As this module only adds view functionallity, we also made it available as a [library](https://github.com/Eyon42/MemeDAO/blob/main/contracts/libraries/Reactions.sol) to extend reading a current TwoWayReferenceModule

#### [AuctionCollectModule](https://github.com/Eyon42/MemeDAO/blob/main/contracts/core/modules/collect/AuctionCollectModule.sol)
Allows people to post bids to an auction (they have to approve the module as spender for the bid amount). Then when the auction is closed, the highest bidder is charged (if someones withdraws their allowance before closing they are no longer eligible) and is then able to collect their nft. Mirrors can't be collected (users can still bid, but the frontend shouldn't give them the option).

#### [TwoTierFollowModule](https://github.com/Eyon42/MemeDAO/blob/main/contracts/core/modules/follow/TwoTierFollowModule.sol)
Allows followers to include a "member" flag in the call to follow. This charges them a fee and adds them to the module's storage as a member of the profile. A whitelist could be implemented.

## The Lessons

I learned **A LOT** this hackathon.

It it the biggest blockchain project I've made so far. I used many new tools and had the opportunity to lead the team from a technical side (Originally I wanted to find someone experienced to follow, but I got tired of waiting and ended up having to take leadership to make things move forward)

I still have a lot to learn and I left a little list of those things in the README.md file of the [repo](https://github.com/Eyon42/MemeDAO#to-learn)

## Prizes

Last Wednesday was the closing ceremony where winners were announced. Twelve finalist were selected, we notice that the common factor in all of them was a well integrated end to end demo, so it's clear why we didn't win and where we should focus for the next hackathon.

But, we did win the "Composable content" category prize, and the "Best Project that uses Chainlink" so I think that's a good signal to keep moving forwards.

![Prizes](/assets/Images/LFGrowWinner.png)

## The Future
On our README.md on the project's [repo](https://github.com/Eyon42/MemeDAO#to-learn) we left a long list of TO-DO's for the development. But besides that are going to continue working on the project to transform it into a tool that makes the experience of publishing in the Lens Protocol much more easier and straight-forwards for DAOs. We are also in communication with the Lens team and other teams building front-ends for the protocol to make sure that our developments integrate well and create synergy with the rest of the ecosystem.

Now the next steps are the DAO Hacks hackathon next week and, if ticket prices allow it, Eth Amsterdam at the end of the month.