const crypto = require('crypto');

class CryptoBlock {
  constructor(position, timeStamp, content, prevHash = '') {
    this.position = position;
    this.timeStamp = timeStamp;
    this.content = content;
    this.prevHash = prevHash;
    this.nonce = 0;
    this.currentHash = this.computeHash();
  }

  computeHash() {
    const dataString = this.position + this.timeStamp + JSON.stringify(this.content) + this.prevHash + this.nonce;
    return crypto.createHash('sha256').update(dataString).digest('hex');
  }

  performMining(difficulty) {
    const requiredPrefix = '0'.repeat(difficulty);
    console.log(`\n🔨 Starting mining with difficulty level: ${difficulty}`);
    const start = Date.now();

    while (!this.currentHash.startsWith(requiredPrefix)) {
      this.nonce++;
      this.currentHash = this.computeHash();
    }

    const end = Date.now();
    console.log(`🎉 Mining complete!`);
    console.log(`🔑 Hash found: ${this.currentHash}`);
    console.log(`🔢 Total nonce increments: ${this.nonce}`);
    console.log(`⏳ Mining duration: ${(end - start) / 1000} seconds`);
  }
}

const difficultyLevel = 4;

const testBlock = new CryptoBlock(1, new Date().toISOString(), "Simulated mining process", "0");
testBlock.performMining(difficultyLevel);
