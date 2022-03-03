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
        this.enemies[0] = new enemy();
        this.enemies[1] = new enemy();
        for (let i = 0; i < 100; i++) {
            console.log(`turn ${i}`);
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
}
const func = function (gameObj) {
    //for (let i = 0; i < 2; i++){
        console.log(gameObj.getPlayer().getMoves());
        console.log(`Attack: ${gameObj.getPlayer().attack(gameObj.getEnemies())}`);
        console.log(`Attack: ${gameObj.getPlayer().attack(gameObj.getEnemies())}`);
        console.log(`Spell: ${gameObj.getPlayer().castSpell(3, 25, gameObj.getEnemies())}`);
        console.log(`Attack: ${gameObj.getPlayer().attack(gameObj.getEnemies())}`);
       // }

}
const gameObj = new game("shin", func);
gameObj.start();

