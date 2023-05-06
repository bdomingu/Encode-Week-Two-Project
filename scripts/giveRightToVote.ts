import { ethers } from "hardhat";

async function main() {
  const voterAddress = process.argv[3];
  const ballotAddress = process.argv[2];
  const ballotContract = await ethers.getContractAt("Ballot", ballotAddress);
  console.log(`Got contract Ballot at ${ballotContract.address}`);
  console.log(`Giving Voting rights to ${voterAddress}`);
  console.log("------------------------------------------------------------");
  const transactionResponse = await ballotContract.giveRightToVote(
    voterAddress
  );
  await transactionResponse.wait();
  console.log(`The address ${voterAddress} now have right to vote!`);
  const voterWeight = (await ballotContract.voters(voterAddress)).weight;
  console.log(`Your voting weight is ${voterWeight}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });