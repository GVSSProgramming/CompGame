class game {
    enemies = [];
    player;
    onTurnFunc;
    turn;
    constructor(character, onTurnFunc) {
        if (character == "shin") {
            this.player = new shinSuzuma();
        } else {
            this.player = new HiroyasuKayama();
        }
        this.onTurnFunc = onTurnFunc;
    }
    start() {
        this.enemies[0] = new enemy();
        this.enemies[1] = new enemy();
        for (this.turn = 0; this.turn < 100; this.turn++) {
            this.player.onTurn();
            this.onTurnFunc(this);
        }
    }
    getPlayer() {
        return this.player;
    }
    getEnemies() {
        return this.enemies;
    }
    getTurn() {
        return this.turn;
    }
}
const func = function (gameObj) {
 //YOUR CODE GOES HERE
}

const gameObj = new game("shin", func); //Replace "shin" with "hiroyasu" for hiroyasu mode
gameObj.start();
