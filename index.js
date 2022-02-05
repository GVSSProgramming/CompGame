class enemy {
    name;
    hp;
    constructor(name, hp) {
        this.name = name;
        this.hp = hp;
    }
    reset(){
        this.hp = 10000; //WOW??? 10/10 game design                                                                                         
    }
    damage(dmg) {
        this.hp -= dmg;
        return this.hp <= 0; //returns dead (true) false (alive)
    }
}

class player {
    points;
    kills;
    moves;
    constructor(){
        this.kills = 0;
        this.moves = 0;
    } 
    onKill(enemy){
        this.kills += 1;
        console.log("DEAD");
        enemy.reset();
    }
    getKills(){
        return this.kills;
    }
    getMoves(){
        return this.moves;
    } 
    getPoints(){
        return this.points;
    }
}

//average spell = 10 points
//high spell = 30 points
//very high = 50 points

class HiroyasuKayama extends player {
    constructor() {
        super();
        this.points = 20;
    }
    attack(enemy) { //Homing
        if (this.moves >= 3) return false;
        if (enemy.damage(1000)) this.onKill(enemy);
        this.points += 10;
        this.moves += 1;
        return true;
    }
    castSpell(enemies, spell, cost) {//Arr of enemies, spell #, amount user is paying. returns 
        const rng = Math.random();
        let success = false; //bool if spell successfully hit
        let kill = false; //bool if spell killed enemy     
        let error = "SUCCESS";
        if (this.moves >= 3) return [false,"Used up all moves"];
        for (let i = 0; i < enemies.length; i++) {
            switch (spell) {
                case 1: { //Fantasy Seal
                    if (cost / 10 > rng) {
                        kill = enemies[i].damage(1000);
                        success = true;
                    } else {
                        error = "failed rng roll";
                    }
                } break;
                case 2: { //Fantasy Orb
                    if (enemies.length > 1) return false;
                    if (cost / 10 > rng) {
                        kill = enemies[i].damage(2000);
                        success = true;
                    } else {
                        error = "failed rng roll";
                    }
                } break;
                case 3: {//Fantasy Nature
                    if (cost / 50 > rng) {
                        kill = enemies[i].damage(9999);
                        success = true;
                    } else {
                        error = "failed rng roll";
                    }
                } break;
                default:
                    error = "spell value out of bounds"
            }
            if (kill) this.onKill(enemies[i]); //if spell killed the enemy
        }
        this.points -= cost;
        this.moves += 1;
        return [success,error];
    }

}
class shinSuzuma extends player {
    constructor() {
        super();
        this.points = 40;
    }
    attack(enemies) { //Illusion Beams
        if (this.moves >= 3) return false;
        if (enemies.length != 2) return false;
        for (let i = 0; i < enemies.length; i++){
            if (enemies[i].damage(500)) {
                this.onKill(enemies[i]);
            }
            //console.log(`ENEMY ${i}: ${enemies[i].hp}`)
        }
        
        this.points += 5;
        this.moves += 1;
        return true;
    }

    castSpell(enemies, spell, cost) {
        const rng = new Math.random();
        let success = false;
        if (this.moves >= 3) return false;
        for (i = 0; i < enemies.length; i++) {
            switch (spell) {
                case 1: { //Master Spark
                    if (cost / 30 > rng) {
                        if (enemies.length > 1) return false;
                        enemy[i].damage(3000);
                        success = true;
                    }
                } break;
                case 2: {//Blazing Star
                    if (cost / 30 > rng) {
                        enemy[i].damage(2000);
                        success = true;
                    }
                } break;
                case 3: {//Final Spark
                    if (cost / 50 > rng) {
                        enemy[i].damage(4999);
                        success = true;
                    }
                } break;
            }
            if (kill) this.onKill(enemies[i]); //if spell killed the enemy
        }
        this.points -= cost;
        this.moves += 1;
        return success;
    }

}


class game {
    enemies = [];
    player;
    onTurnFunc;
    constructor(character, onTurnFunc) {
        if (character == "shin"){
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
    getPlayer(){
        return this.player
    }
    getEnemies(){
        return this.enemies
    }
}



const func = function (gameObj) {
    //for (let i = 0; i < 2; i++){
    console.log(gameObj.getPlayer().getMoves());
    console.log(`Attack: ${gameObj.getPlayer().attack(gameObj.getEnemies()[0])}`);
    console.log(`Attack: ${gameObj.getPlayer().attack(gameObj.getEnemies()[0])}`);
    console.log(`Spell: ${gameObj.getPlayer().castSpell([gameObj.getEnemies()[0]], 1, 10)}`);
   // }
}
const gameObj = new game("", func);
gameObj.start();    

