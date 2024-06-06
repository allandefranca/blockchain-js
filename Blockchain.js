const Block = require('./Block')

module.exports = class Blockchain {

    constructor(){
        this.blocks = [ new Block() ];
        this.nextIndex = 1;
    }

    getLastHash(){
        return this.blocks[this.blocks.length -1].hash;
    }

    addBlock(data){
        const lastHash = this.getLastHash();
        const block = new Block(this.nextIndex, lastHash, data, "000000");
        this.blocks.push(block);

        this.nextIndex++;
    }
        
    isValid() {
        for(let i= this.blocks.length - 1; i > 0; i--) {
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