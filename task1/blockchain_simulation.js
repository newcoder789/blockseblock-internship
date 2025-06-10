const crypto = require('crypto');

class ChainBlock {
  constructor(position, timeStamp, content, prevHash = '') {
    this.position = position;
    this.timeStamp = timeStamp;
    this.content = content;
    this.prevHash = prevHash;
    this.nonce = 0;
    this.currentHash = this.generateHash();
  }

  generateHash() {
    const combinedData = this.position + this.timeStamp + JSON.stringify(this.content) + this.prevHash + this.nonce;
    return crypto.createHash('sha256').update(combinedData).digest('hex');
  }
}

// Initialize blocks
const initialBlock = new ChainBlock(0, new Date().toISOString(), "Initial Block", "0");
const secondBlock = new ChainBlock(1, new Date().toISOString(), "Second Block Data", initialBlock.currentHash);
const thirdBlock = new ChainBlock(2, new Date().toISOString(), "Third Block Data", secondBlock.currentHash);

// Assemble blockchain
const chain = [initialBlock, secondBlock, thirdBlock];

// Function to display the blockchain details
function displayChain(chain) {
  chain.forEach((block, idx) => {
    console.log(`\n=== Block ${idx} Details ===`);
    console.log(`Position: ${block.position}`);
    console.log(`Timestamp: ${block.timeStamp}`);
    console.log(`Content: ${block.content}`);
    console.log(`Previous Hash: ${block.prevHash}`);
    console.log(`Current Hash: ${block.currentHash}`);
  });
}

console.log("🔗 Blockchain State Before Modification:");
displayChain(chain);

// ⚠️ Modifying Second Block's Data
console.log("\n⚠️ Modifying data of Block 1...");
secondBlock.content = "Altered Second Block Data";
secondBlock.currentHash = secondBlock.generateHash();

console.log("\n🔗 Blockchain State After Modification:");
displayChain(chain);

// ✔️ Blockchain Integrity Check
function checkChainIntegrity(chain) {
  for (let i = 1; i < chain.length; i++) {
    if (chain[i].prevHash !== chain[i - 1].currentHash) {
      console.log(`\n❌ Block ${i} integrity compromised! Previous hash mismatch.`);
      return false;
    }
  }
  console.log("\n✔️ Blockchain integrity verified.");
  return true;
}

checkChainIntegrity(chain);
