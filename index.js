class game {
    enemies = [];
    player;
    onTurnFunc;
    constructor(character, onTurnFunc) {
        if (character == "shin") {
            this.player = new shinSuzuma();
        } else {
            this.player = new HiroyasuKayama();
        }
        this.onTurnFunc = onTurnFunc;
    }
    start() {
        this.enemies[0] = new enemy("JB", 10000);
        this.enemies[1] = new enemy("EL", 10000);
        for (let i = 0; i < 100; i++) {
            console.log(`turn ${i}`);
            this.player.moves = 0;
            this.onTurnFunc(this);
        }
    }
    getPlayer() {
        return this.player
    }
    getEnemies() {
        return this.enemies
    }
}
const func = function (gameObj) {

    //console.log(`Spell: ${gameObj.getPlayer().castSpell([gameObj.getEnemies()[0]], 2, 10)}`);
}
const gameObj = new game("", func);
gameObj.start();

