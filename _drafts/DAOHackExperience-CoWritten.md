---
title: Building a local team for participating on a global hackathon
layout: blogpost
authors: 
    - "Francesco Gentile"
    - "Ariel Villegas"
---

After participating a couple weeks ago in the LFGrow hackathon with an international team I decided that I wanted to bring this kind of events to my local comunnity. Currently there aren't many hackathons where I live (although they are getting more popular), the most important being the [Nasa Space Apps Challenge]() organized by the local [Mars Society]()(which I participated in a couple times and was great). So, beside [posting my experience here](/2022/03/31/My-First-Blockchain-Hackathon.html) I also posted a few stories on Instagram about the hackathon along with a call to action to participate in the next Hackathon, [Dao Hacks](#dao-hacks).

## The team
We are a team of five. I had two friends with whom I'm working on other projects that I had previously promised to get them into hackahons, Ariel (who is co-writing this article) for the business and project management side and Arturo for the graphic design and marketing side. The other two members were developers that I knew from elsewere who expressed interest in my instagram story.

We started with an online meeting a couple days before the event and then most of the team met up on another unrelated event we all happend to be at the day previous to the hackathon's start.

Then, the nex day, hacking started.

## [DAO Hacks](https://dao.ethglobal.com)

### What is a Dao

## The project

### [Project Page](https://showcase.ethglobal.com/daohacks/organic-dao-h5hp7)
[![Project Page](/assets/Images/DAOHacks/ProjectPage.png)](https://showcase.ethglobal.com/daohacks/organic-dao-h5hp7)

Once we managed to figure out what is a DAO. We went through a couple of project proposals for possible DAOs or tooling for them, developing on them and then discarding them when their fundamental flaws became painfully obvious.

Finally, after going out for a walk and having dinner at a pizza place, we >
settled on making a crowdfunding platform to solve a a particular problem:

> A common situation in the web3 is having a team gathering a big amount of funds through funding mechanisms as ICOs and NFT collections for project and then banish or simply not being capable of executing.

Our solution was to implement a milestone-based fund retention. Here's the user flow we worked with:

![Storytelling](/assets/Images/DAOHacks/Protocol%20Organic%20Funds%20Full.jpg)

On our first model the users could only choose to terminate the project or to allow it to continue as planned. But we realized that in that model all of the milestone setting was done at the beginning, which we knew wasn't how actual projects developed. Project don't follow a set array of milestone, they change, evolve and pivot over time. So we changed the voting system to allow the team, now armed with more information and experience than in the beginning, to propose new sets of milestones for the community to choose from.

![User choice](/assets/Images/DAOHacks/Protocol%20Organic%20Funds.jpg)

With that done we started to work on the development.
## Implementation

### [Git Repo](https://github.com/bestem-dev/Organic-Funds)
[![github](/assets/Images/DAOHacks/GithubPage.png)](https://github.com/bestem-dev/Organic-Funds)

On the Solidity backend we started with an ERC1155 contract where the first token was the Project NFT and the second token was a fungible token representing stake in the project.

Then we added a fund function that received a ERC20 token deposit (Let's assume it's a whitelisted stablecoin token) and minted the same amount of project stake tokens. After that we added functions for withdrawing milestones funds, submitting them (along with links to the new metadata), voting and withdrawing user funds in case the project is terminated.

We missed implementing a lot of things. I was exited trying to implement Superfluid streams for ERC1155 fungible tokens, but I didn't get enough time (It'll be a project for other day).

Just like last time, the frontend was nowhere near completed for sumbisison time, so we had to present the mocks along with showing a screen capture of our tests running.


## Prizes

![prizes](/assets/Images/DAOHacks/Prizes.png)

Surprisingly, even though we started coding almost an entire day late, most of the team was working with web3 for the first time and we didn't have any experienced frontend developer we managed to win two small prizes. One from IPFS for using it to host metadata and another from Unlock Protocol for using it for restricting voting in the UI.

## Next steps

Obviously, get a frontend developer for the team (Any interested can send me an e-main). Beside that we're going to continue to sharpen our technical skills to hit the ground running on next hackathons.