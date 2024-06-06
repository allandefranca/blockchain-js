# Blockchain Implementation in JavaScript

## Overview
This project implements a basic blockchain using JavaScript. The blockchain consists of two primary components: the `Blockchain` class and the `Block` class. The `Blockchain` class manages the chain of blocks, while each block is represented by the `Block` class.

## Features
- **Blockchain Initialization**: The blockchain is initialized with a genesis block.
- **Adding Blocks**: New blocks can be added to the blockchain with arbitrary data.
- **Hash Management**: Each block contains a hash, and blocks are linked via their hashes.
- **Mining**: Blocks are mined by generating a hash that meets a specified difficulty.
- **Blockchain Validation**: The integrity of the blockchain can be checked to ensure all blocks are valid and properly linked.

## Code Details

### Block Class
The `Block` class is responsible for creating and managing individual blocks within the blockchain. It includes methods to initialize a block, mine it to meet a specified difficulty, and generate its hash.

```javascript
const sha256 = require('crypto-js/sha256');

module.exports = class Block {
    constructor(index = 0, previousHash = null, data = 'Genesis Block', difficulty = "") {
        this.index = index;
        this.data = data;
        this.timestamp = new Date();
        this.previousHash = previousHash;
        this.nonce = 0;

        this.mine(difficulty);
    }

    mine(prefix) {
        do {
            this.nonce++;
            this.hash = this.generateHash();
        } while(!this.hash.startsWith(prefix));
    }

    generateHash() {
        return sha256(this.index + this.previousHash + JSON.stringify(this.data) + this.timestamp + this.nonce).toString();
    }
}
```

### Blockchain Class
The `Blockchain` class manages the chain of blocks. It initializes the blockchain with a genesis block, adds new blocks, retrieves the last block's hash, and validates the integrity of the blockchain by ensuring each block is correctly hashed and linked.

```javascript
const Block = require('./Block')

module.exports = class Blockchain {
    constructor() {
        this.blocks = [ new Block() ];
        this.nextIndex = 1;
    }

    getLastHash() {
        return this.blocks[this.blocks.length -1].hash;
    }

    addBlock(data) {
        const lastHash = this.getLastHash();
        const block = new Block(this.nextIndex, lastHash, data, "000000");
        this.blocks.push(block);
        this.nextIndex++;
    }
        
    isValid() {
        for(let i = this.blocks.length - 1; i > 0; i--) {
            const currentBlock = this.blocks[i];
            const previousBlock = this.blocks[i-1];

            if(currentBlock.hash !== currentBlock.generateHash()
                || currentBlock.previousHash !== previousBlock.hash
                || currentBlock.index !== previousBlock.index + 1) {
                return false;
            }
        }
        return true;
    }
}
```

#### Methods
- The `constructor` method initializes a block or the blockchain.
- The `mine` method in the `Block` class mines the block by finding a hash that starts with a specified prefix.
- The `generateHash` method in the `Block` class generates the hash for the block based on its properties.
- The `getLastHash` method in the `Blockchain` class returns the hash of the last block in the chain.
- The `addBlock` method in the `Blockchain` class adds a new block with given data to the blockchain.
- The `isValid` method in the `Blockchain` class validates the integrity of the blockchain by ensuring each block is correctly hashed and linked.

## Usage

```javascript
const Blockchain = require('./Blockchain');

const blockchain = new Blockchain();
blockchain.addBlock({ from: 'a', to: 'b', amount: 1 });
blockchain.addBlock({ from: 'a', to: 'c', amount: 2 });

console.log(JSON.stringify(blockchain));
console.log(blockchain.isValid());
```

## Example
1. Initialize the blockchain by creating a new instance of the `Blockchain` class.
2. Add blocks to the blockchain by using the `addBlock(data)` method with your desired data.
3. Validate the blockchain by using the `isValid()` method to ensure all blocks are correctly hashed and linked.

## Conclusion
This implementation provides a basic structure for a blockchain. It includes block creation, mining, and validation. It is suitable for educational purposes and can be extended with more features like proof-of-work, transactions, and more complex data structures.
