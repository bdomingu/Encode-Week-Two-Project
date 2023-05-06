import { ethers } from "hardhat";
import { Ballot__factory } from "../typechain-types";

async function main() {
  const ballotAddress = process.argv[2];
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.SEPOLIA_RPC_URL
  );
  //   const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY_SCROLL!);
  const signer = wallet.connect(provider);
  console.log(`The Signer address is: ${signer.address}`);

  const ballotFactory = new Ballot__factory(signer);
  const ballotContract = ballotFactory.attach(ballotAddress);
  console.log(`Got contract Ballot at: ${ballotContract.address}`);
  console.log(`Voting from address: ${signer.address}`);
  const proposal1 = await ballotContract.proposals("3");
  console.log(
    `Proposal Name: ${ethers.utils.parseBytes32String(proposal1.name)}`
  );
  console.log(`Proposal Vote Count: ${proposal1.voteCount.toString()}`);

  //   const signer1ConnectedAccount = await ballotContract.connect(signer1);
  const voteProposal = await ballotContract.vote("3");
  const transactionResponseVote = voteProposal.wait();
  const proposal0Updated = await ballotContract.proposals("3");
  console.log(
    `Proposal Name: ${ethers.utils.parseBytes32String(proposal0Updated.name)}`
  );
  console.log(`Proposal Vote Count: ${proposal0Updated.voteCount.toString()}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
// ["0x416c706861000000000000000000000000000000000000000000000000000000", "0x4265746100000000000000000000000000000000000000000000000000000000", "0x47616d6d61000000000000000000000000000000000000000000000000000000"]
