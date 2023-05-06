import { ethers } from "hardhat";

const PROPOSALS = ["Alpha", "Beta", "Gamma"];

async function main() {
  // const voterAddress = process.argv[2];
  // const proposals = process.argv.slice(3);
  // setting a new address to vote on the proposal. This is the 2nd hardhat account
  // const newVoterAddress = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";
  const voterAddress = process.argv[2];
  console.log("Following are the PROPOSALS for the BALLOT");
  console.log(">>>>>>");
  PROPOSALS.forEach((element, index) => {
    console.log(`Proposal ${index + 1}: ${element}`);
  });
  console.log("------------------------------------------------------------");

  console.log("Deploying Ballot contract");
  const ballotFactory = await ethers.getContractFactory("Ballot");
  const ballotContract = await ballotFactory.deploy(
    PROPOSALS.map(ethers.utils.formatBytes32String)
  );
  const deployTx = await ballotContract.deployTransaction.wait();
  console.log(
    `The ballot contract was deployed at: ${ballotContract.address} at block: ${deployTx.blockNumber}`
  );
  const chairperson = await ballotContract.chairperson();
  console.log(`The Chairperson for this contract is: ${chairperson}`);

  console.log("------------------------------------------------------------");

  // giving newVoterAddress right to vote.
  console.log(`Giving Voting rights to ${voterAddress}`);
  const transactionResponse = await ballotContract.giveRightToVote(
    voterAddress
  );
  await transactionResponse.wait();
  console.log(`The address ${voterAddress} now have right to vote!`);
  const voterWeight = (await ballotContract.voters(voterAddress)).weight;
  console.log(`Address ${voterAddress} voting weight is: ${voterWeight}`);
  console.log("------------------------------------------------------------");

  // connecting the signer1 which is the voteAddress (2nd hardhat account) to connect to the
  // Ballot contract

  const [signer1] = await ethers.getSigners();
  const signer1ConnectedAccount = await ballotContract.connect(signer1);
  const voteProposal0 = await signer1ConnectedAccount.vote("0");
  const transactionResponseVote = voteProposal0.wait();
  const proposal0Updated = await ballotContract.proposals("0");
  console.log(
    `Proposal Name: ${ethers.utils.parseBytes32String(proposal0Updated.name)}`
  );
  console.log(`Proposal Vote Count: ${proposal0Updated.voteCount.toString()}`);
  console.log("------------------------------------------------------------");
  const winningProposal = await ballotContract.winningProposal();
  const winnerName = await ballotContract.winnerName();
  // console.log(`The winning proposal number is: ${winningProposal.toString()}`);
  console.log(
    `The winning proposal so far is ${ethers.utils.parseBytes32String(
      winnerName
    )} with vote count ${proposal0Updated.voteCount.toString()}`
  );

  // TO DO
  // 1. get vote count
  // 2. give vote right to 3rd hardhat account (0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)
  // 3. give weight to 4th hardhat account (0x90F79bf6EB2c4f870365E785982E1f101E93b906)
  //    and delegate vote right of 3rd account to the 4th account
  // 4. check the winningProposal
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
