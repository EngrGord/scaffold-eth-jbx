# π Scaffold-ETH & π§Juicebox

> everything you need to start your juicebox frontend build! π

[Project Demo](https://scar-fold.surge.sh/)

Look at external_contracts to see how you can read blockchain data into your application as we have in the homepage.

The contracts are barebones of what you might need to create and pay a [Juicebox](https://juicebox.money/#/) project.
You can customize your contracts and then deployπ

# πββοΈ Quick Start

Prerequisites: [Node (v16 LTS)](https://nodejs.org/en/download/) plus [Yarn](https://classic.yarnpkg.com/en/docs/install/) and [Git](https://git-scm.com/downloads)

> clone/fork π scaffold-eth:

```bash
git clone https://github.com/scaffold-eth/scaffold-eth.git
```

> install and start your π·β Hardhat chain:

```bash
cd scaffold-eth
yarn install
yarn chain
```

> in a second terminal window, start your π± frontend:

```bash
cd scaffold-eth
yarn start
```

> in a third terminal window, π° deploy your contract:

```bash
cd scaffold-eth
yarn deploy
```

π Edit your smart contract `YourContract.sol` in `packages/hardhat/contracts`

π Edit your frontend `App.jsx` in `packages/react-app/src`

πΌ Edit your deployment scripts in `packages/hardhat/deploy`

π± Open http://localhost:3000 to see the app

# π Documentation

Documentation, tutorials, challenges, and many more resources, visit: [docs.scaffoldeth.io](https://docs.scaffoldeth.io)
[Juicebox Docs](https://info.juicebox.money/)




# π­ Learning Solidity

π Read the docs: https://docs.soliditylang.org



Join the telegram [support chat π¬](https://t.me/joinchat/KByvmRe5wkR-8F_zz6AjpA) to ask questions and find others building with π scaffold-eth!

---

π Please check out our [Gitcoin grant](https://gitcoin.co/grants/2851/scaffold-eth) too!

### Automated with Gitpod

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#github.com/scaffold-eth/scaffold-eth)
