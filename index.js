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

            var EnName_1 = document.getElementById('EnName_1')
            var name = webGameObj.getEnemies()[0].getName();
            EnName_1.innerHTML = name
            
            var EnHealth_1 = document.getElementById('EnHealth_1')
            var health = webGameObj.getEnemies()[0].getHp();
            EnHealth_1.innerHTML = health

            var EnName_2 = document.getElementById('EnName_2')
            var name = webGameObj.getEnemies()[1].getName();
            EnName_2.innerHTML = name

            var EnHealth_2 = document.getElementById('EnHealth_2')
            var health = webGameObj.getEnemies()[1].getHp();
            EnHealth_2.innerHTML = health

            var turn = document.getElementById('turn_id')
            turn.innerHTML = i
            
            var kill_id = document.getElementById('kill_id')
            kill_id.innerHTML = (gameObj.getPlayer().getKills())
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