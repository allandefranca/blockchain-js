const sha256 = require('crypto-js/sha256');

module.exports = class Block {

    constructor(index = 0,previousHash = null, data = 'Genesis Block', difficulty = ""){
        this.index = index;
        this.data = data;
        this.timestamp = new Date();
        this.previousHash = previousHash;
        this.nonce = 0;

        this.mine(difficulty);

    }

    mine(prefix){//0
        do {
            this.nonce++;
            this.hash = this.generateHash();
        }
        while(!this.hash.startsWith(prefix));
    }

    generateHash(){
        return sha256(this.index + this.previousHash + JSON.stringify(this.data) + this.timestamp + this.nonce).toString();
    }

}