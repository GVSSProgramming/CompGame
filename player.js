class player {
    points;
    kills;
    moves;
    inventory;
    equipment
    constructor(){
        this.kills = 0;
        this.moves = 0;
        this.inventory = [];
        this.equipment = ["","","","","",""];
    } 
    onKill(enemy){
        this.kills += 1;
        console.log("DEAD");
        switch (enemy.getName()){
            case "Goblin": {
                this.inventory.push('syringe');
            } break;
            case "Giant": {
                this.inventory.push('piggybank');
            } break;
            case "Dragon": {
                this.inventory.push('band');
            } break;
        }
        enemy.reset();
        
    }

    equip(invNum, equipNum) {
        if (0 > equipNum > 6) return [false, "equipment # out of bounds"];
        if(typeof this.inventory[invNum] !== 'undefined') {
            this.equipment[equipNum] = this.inventory[invNum];
            this.inventory.splice(invNum, 1);
            return true;
        }
        else {
            return false;
        }
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
    getInventory(){
        return this.inventory;
    }
    getEquipment(){
        return this.equipment;
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
        if (enemy[0].damage(1000)) this.onKill(enemy[0]);
        this.points += 10;
        this.moves += 1;
        return true;
    }
    castSpell(spell, cost, enemies) {// spell #, amount user is paying, Arr of enemies. returns 
        const rng = Math.random() ** 2;
        let success = false; //bool if spell successfully hit
        let kill = false; //bool if spell killed enemy     
        let error = "SUCCESS";
        if (this.moves >= 3) return [false,"Used up all moves"];
        if (this.points < cost) return [false, "Insufficient points"];

        for (let i = 0; i < enemies.length; i++) {
            switch (spell) {
                case 1: { //Fantasy Seal
                    if (enemies.length != 2) return [false, "This spell deals damage to only 2 enemies" ]
                    if (cost / 10 > rng) {
                        kill = enemies[i].damage(1000);
                        success = true;
                    } else {
                        error = "failed rng roll";
                    }
                } break;
                case 2: { //Fantasy Orb
                    if (enemies.length != 1) return [false, "This spell deals damage to only 1 enemy" ]
                    if (cost / 10 > rng) {
                        kill = enemies[i].damage(2000);
                        success = true;
                    } else {
                        error = "failed rng roll";
                    }
                } break;
                case 3: {//Fantasy Nature
                    if (enemies.length != 1) return [false, "This spell deals damage to only 1 enemy" ]
                    if (cost / 50 > rng) {
                        kill = enemies[i].damage(9999);
                        success = true;
                    } else {
                        error = "failed rng roll";
                    }
                } break;
                default:
                    return [false, "Spell value out of bounds" ]
            }
            if (kill) this.onKill(enemies[i]); //if spell killed the enemy
        }
        this.points -= cost;
        this.moves += 1;
        return [success,error]; // 10/10 error handler (ABOMINATION)
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
        }
        
        this.points += 5;
        this.moves += 1;
        return true;
    }

    castSpell(spell, cost, enemies) {
        const rng =  Math.random() ** 2;
        let success = false;
        let kill = false; //bool if spell killed enemy     
        let error = "SUCCESS";
        if (this.moves >= 3) return [false,"Used up all moves"];
        if (this.points < cost) return [false, "Insufficient points"];
        for (let i = 0; i < enemies.length; i++) {
            switch (spell) {
                case 1: { //Master Spark
                    if (enemies.length != 1) return [false, "This spell deals damage to only 1 enemy" ]
                    if (cost / 30 > rng) {
                        kill = enemies[i].damage(3000);
                        success = true;
                    } else {
                        error = "failed rng roll";
                    }
                } break;
                case 2: {//Blazing Star
                    if (enemies.length != 2) return [false, "This spell deals damage to only 2 enemies" ]
                    if (cost / 30 > rng) {
                        kill = enemies[i].damage(2000);
                        success = true;
                    }else {
                        error = "failed rng roll";
                    }
                } break;
                case 3: {//Final Spark
                    if (enemies.length != 2) return [false, "This spell deals damage to only 2 enemies" ]
                    if (cost / 50 > rng) {
                        kill = enemies[i].damage(4999);
                        success = true;
                    } else {
                        error = "failed rng roll";
                    }
                } break;
                default:
                    return [false, "Spell value out of bounds" ]
            }
            if (kill) this.onKill(enemies[i]); //if spell killed the enemy
        }
        this.points -= cost;
        this.moves += 1;
        return [success, error];
    }

}