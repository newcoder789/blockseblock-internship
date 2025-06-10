// Utility to generate a random integer between min and max (inclusive)
function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  // ---------- Validator Setup ----------
const networkValidators = {
proofOfWorkNode: { id: "Node_PoW", computePower: randomBetween(1, 100) },
proofOfStakeNode: { id: "Node_PoS", tokenHoldings: randomBetween(1, 100) },
representatives: [
    { id: "Rep_X", voteCount: 0 },
    { id: "Rep_Y", voteCount: 0 },
    { id: "Rep_Z", voteCount: 0 }
],
voters: ["User1", "User2", "User3"]
};

// ---------- Proof of Work Simulation ----------
function proofOfWorkConsensus() {
console.log("\n⚙️ Proof of Work Process:");
console.log(`Node's computational capacity: ${networkValidators.proofOfWorkNode.computePower}`);
console.log(`✔️ Validator Chosen: ${networkValidators.proofOfWorkNode.id}`);
console.log("Explanation: The node with the highest computing strength is selected to mine the next block.");
}

// ---------- Proof of Stake Simulation ----------
function proofOfStakeConsensus() {
console.log("\n🏦 Proof of Stake Process:");
console.log(`Node's staked tokens: ${networkValidators.proofOfStakeNode.tokenHoldings}`);
console.log(`✔️ Validator Chosen: ${networkValidators.proofOfStakeNode.id}`);
console.log("Explanation: The node with the most staked tokens is selected to forge the next block.");
}

// ---------- Delegated Proof of Stake Simulation ----------
function delegatedPoSConsensus() {
console.log("\n🗳️ Delegated Proof of Stake Process:");

// Each user votes randomly for a representative
networkValidators.voters.forEach((user) => {
    const selected = randomBetween(0, 2);
    networkValidators.representatives[selected].voteCount++;
    console.log(`${user} cast a vote for ${networkValidators.representatives[selected].id}`);
});

// Determine the delegate with the highest number of votes
const electedRep = [...networkValidators.representatives].sort((a, b) => b.voteCount - a.voteCount)[0];

console.log(`✔️ Validator Chosen: ${electedRep.id}`);
console.log("Explanation: The representative with the most votes is selected to validate the upcoming block.");
}

// ---------- Execute All Simulations ----------
proofOfWorkConsensus();
proofOfStakeConsensus();
delegatedPoSConsensus();
  