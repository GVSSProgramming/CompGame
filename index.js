class enemy {
    name;
    hp;
    constructor(name, hp) {
        this.name = name;
        this.hp = hp;
    }
    damage(dmg) {
        this.hp -= dmg;
        return this.hp <= 0; //returns dead (true) false (alive)
    }
}
//average spell = 10 points
//high spell = 30 points
//very high = 50 points

class HiroyasuKayama {
    points;
    constructor(){
        points = 20;
    }
    attack(enemy) {
        enemy.damage(1000);
        points += 10;
    }

    spell(enemies, spell, cost) {
        const rng = new Math.random();
        let success = false;
        for (i = 0; i < enemies.length; i++) {
            switch (spell) {
                case 1: {
                    if (cost/10>rng){
                        enemy[i].damage(1000);
                        success = true;
                    } 
                } break;
                case 2: {
                    if (enemies.length > 1) return false;
                    if (cost/10>rng){
                        enemy[i].damage(2000);
                        success = true;
                    } 
                } break;
                case 3: {
                    if (cost/50>rng){
                        enemy[i].damage(9999);
                        success = true;
                    } 
                } break;
            }
        }
        points -= cost;
        return success;
    }

}
class shinSuzuma {
    points;
    constructor(){
        points = 40;
    }
    attack(enemies) {
        enemies[0].damage(500);
        enemies[1].damage(500);
        points += 5;
    }

    spell(enemies, spell, cost) {
        const rng = new Math.random();
        let success = false;
        for (i = 0; i < enemies.length; i++) {
            switch (spell) {
                case 1: {
                    if (cost/30>rng){
                        if (enemies.length > 1) return false;
                        enemy[i].damage(3000);
                        success = true;
                    } 
                } break;
                case 2: {
                    if (cost/30>rng){
                        enemy[i].damage(2000);
                        success = true;
                    } 
                } break;
                case 3: {
                    if (cost/50>rng){
                        enemy[i].damage(4999);
                        success = true;
                    } 
                } break;
            }
        }
        points -= cost;
        return success;
    }

}


class game {
    enemies = [];
    player1;
    player2;
    constructor(player1, player2) {
        this.enemies.enemy1 = new enemy("JB", 10000);
        this.enemies.enemy2 = new enemy("EL", 10000);
    }
}
