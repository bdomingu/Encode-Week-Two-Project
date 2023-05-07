# Encode Week2 Ballot Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

# 🏄‍♂️ Quick Start

Prerequisites: [Node (v18 LTS)](https://nodejs.org/en/download/) plus [Yarn (v1.x)](https://classic.yarnpkg.com/en/docs/install/) and [Git](https://git-scm.com/downloads)

🚨 If you are using a version < v18 you will need to remove `openssl-legacy-provider` from the `start` script in `package.json`

> ### The Ballot Address on Sepolia Network is: `0x66eb0E81E85952816f4e629a929ce3D5f2B36fDB`
>
> > ### Vote for your fav coffee chain: Dunkin Starbucks Tims Peet (0 index based)

---

> 1️⃣ clone/fork 🏗
> Encode-Week-Two-Project:

```bash
git clone https://github.com/bdomingu/Encode-Week-Two-Project.git
```

> 2️⃣ install and start your 👷‍ Hardhat chain:

```bash
cd Encode-Week-Two-Project
yarn install
```

> 3️⃣ cp `.env.example` to `.env` and fill the required keys

```bash
cp .env.example .env
```

# Usage

> #### Run the script of choice with `yarn ts-node --files ./scripts/<script name>`

1. To deploy the ballot contract, run
   ```
   yarn ts-node --files ./scripts/01-deploy-ballot.ts <PROPOSAL_NAMES>
   ```
   > > e.g: `yarn ts-node --files ./scripts/01-deploy-ballot.ts Alpha Beta Gamma`
2. To give rights to vote, run
   ```
   yarn ts-node --files ./scripts/giveRightToVote.ts <BALLOT_ADDRESS> <VOTER_ADDRESS>
   ```
   > > e.g: `yarn ts-node --files ./scripts/giveRightToVote.ts 0x66eb0E81E85952816f4e629a929ce3D5f2B36fDB 0x90F79bf6EB2c4f870365E785982E1f101E93b906`
3. To vote, run
   ```
   yarn ts-node --files ./scripts/vote.ts <BALLOT_ADDRESS> <PROPOSAL NUMBER>
   ```
   > > e.g: `yarn ts-node --files ./scripts/vote.ts 0x66eb0E81E85952816f4e629a929ce3D5f2B36fDB 1`
4. To delegate vote, run
   ```
   yarn ts-node --files ./scripts/delegateVote.ts <BALLOT_ADDRESS> <DELEGATE_ADDRESS>
   ```
   > > e.g: `yarn ts-node --files ./scripts/delegateVote.ts 0x66eb0E81E85952816f4e629a929ce3D5f2B36fDB 0x90F79bf6EB2c4f870365E785982E1f101E93b906`
5. To get the winning proposal, run
   ```
   yarn ts-node --files ./scripts/winningProposal.ts <BALLOT_ADDRESS>
   ```
   > > e.g: `yarn ts-node --files ./scripts/winningProposal.ts 0x66eb0E81E85952816f4e629a929ce3D5f2B36fDB`
