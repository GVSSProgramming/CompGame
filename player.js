class player {
    points;
    kills;
    moves;
    inventory;
    equipment;
    multiplier;
    constructor() {
        this.kills = 0;
        this.moves = 0;
        this.multiplier = 1;
        this.inventory = [];
        this.equipment = ["", "", "", "", "", ""];
    }
    onTurn() {
        this.multiplier = 1
        this.moves = 0;


        if (typeof this.kills % 5 == 0) { //if divisible by 5
            for (let i = 0; i < this.equipment.length; i++) {
                if (this.equipment[i] === "glass") {
                    this.multiplier += 0.25;
                }
            }
            //Im only putting this in here because bill told me to vvvv
            if (typeof this.kills % 10 == 0) { //if divisible by 10 
                for (let i = 0; i < this.equipment.length; i++) {
                    if (this.equipment[i] === "tooth") {
                        this.multiplier += 1;
                    }
                }
            }
        }
        if (this.equipment.includes('syringe')) {
            this.multiplier += 0.1;
        }
    }
    onKill(enemy) {
        this.kills += 1;
        console.log("DEAD");
        switch (enemy.getName()) {
            case "Goblin": {
                this.inventory.push('syringe'); //10% more dmg
            } break;
            case "Giant": {
                this.inventory.push('glass'); //get a damage multiplier if # of kills are divisible by 5. +25% per stack
            } break;
            case "Dragon": {
                this.inventory.push('tooth');//get a damage multiplier if # of kills are divisible by 10. +100% per stack
            } break;
        }
        enemy.reset();

    }

    equip(invNum, equipNum) {
        if (this.moves >= 3) return [false, "used up all moves"];
        if (equipNum > 6 && equipNum < 0 || typeof equipNum == 'undefined') return [false, "equipment # out of bounds"];
        if (typeof this.inventory[invNum] !== 'undefined') {
            if (this.equipment[equipNum] !== "")
                this.inventory.push(this.equipment[equipNum])
            this.equipment[equipNum] = this.inventory[invNum];
            this.inventory.splice(invNum, 1);
            switch (this.equipment[equipNum]) {
                case "syringe": {
                    this.multiplier += 0.1;
                } break;
            }
            if (this.equipment[equipNum] == "syringe") {
                this.multiplier += 0.1;
            }
            this.moves += 1;
            return true;
        }
        else {
            return [false, "inventory slot is undefined"];
        }
    }

    unequip(equipNum) {
        if (equipNum > 6 || equipNum < 0) return [false, "equipment # out of bounds"];
        if (this.equipment[equipNum] !== "") {
            this.inventory.push(this.equipment[equipNum]);
            switch (this.equipment[equipNum]) {
                case "syringe": {
                    this.multiplier -= 0.1;
                } break;
            }
            this.equipment[equipNum] = "";
            return true;
        }
        else {
            return [false, "inventory slot is undefined"];
        }
    }
    getKills() {
        return this.kills;
    }
    getMoves() {
        return this.moves;
    }
    getPoints() {
        return this.points;
    }
    getInventory() {
        return this.inventory;
    }
    getEquipment() {
        return this.equipment;
    }
    getMultiplier() {
        return this.multiplier;
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
        if (this.moves >= 3) return [false, "used up all moves"];
        if (enemy[0].damage(this.multiplier * 1000)) this.onKill(enemy[0]);
        this.points += 10;
        this.moves += 1;
        return true;
    }
    castSpell(spell, cost, enemies) {// spell #, amount user is paying, Arr of enemies. returns 
        const rng = Math.random() ** 2;
        let success = false; //bool if spell successfully hit
        let kill = false; //bool if spll killed enemy     
        let error = "SUCCESS";
        if (this.moves >= 3) return [false, "Used up all moves"];
        if (this.points < cost) return [false, "Insufficient points"];

        for (let i = 0; i < enemies.length; i++) {
            switch (spell) {
                case 1: { //Fantasy Seal
                    if (enemies.length != 2) return [false, "This spell dealse damage to only 2 enemies"]
                    if (cost / 10 > rng) {
                        kill = enemies[i].damage(this.multiplier * 1000);
                        success = true;
                    } else {
                        error = "failed rng roll";
                    }
                } break;
                case 2: { //Fantasy Orb
                    if (enemies.length != 1) return [false, "This spell deals damage to only 1 enemy"]
                    if (cost / 10 > rng) {
                        kill = enemies[i].damage(this.multiplier * 2000);
                        success = true;
                    } else {
                        error = "failed rng roll";
                    }
                } break;
                case 3: {//Fantasy Nature
                    if (enemies.length != 1) return [false, "This spell deals damage to only 1 enemy"]
                    if (cost / 50 > rng) {
                        kill = enemies[i].damage(this.multiplier * 9999);
                        success = true;
                    } else {
                        error = "failed rng roll";
                    }
                } break;
                default:
                    return [false, "Spell value out of bounds"]
            }
            if (kill) this.onKill(enemies[i]); //if spell killed the enemy
        }
        this.points -= cost;
        this.moves += 1;
        return [success, error]; // 10/10 error handler (ABOMINATION)
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
        for (let i = 0; i < enemies.length; i++) {
            if (enemies[i].damage(this.multiplier * 500)) {
                this.onKill(enemies[i]);
            }
        }

        this.points += 5;
        this.moves += 1;
        return true;
    }

    castSpell(spell, cost, enemies) {
        const rng = Math.random() ** 2;
        let success = false;
        let kill = false; //bool if spell killed enemy     
        let error = "SUCCESS";
        if (this.moves >= 3) return [false, "Used up all moves"];
        if (this.points < cost) return [false, "Insufficient points"];
        for (let i = 0; i < enemies.length; i++) {
            switch (spell) {
                case 1: { //Master Spark
                    if (enemies.length != 1) return [false, "This spell deals damage to only 1 enemy"]
                    if (cost / 30 > rng) {
                        kill = enemies[i].damage(this.multiplier * 3000);
                        success = true;
                    } else {
                        error = "failed rng roll";
                    }
                } break;
                case 2: {//Blazing Star
                    if (enemies.length != 2) return [false, "This spell deals damage to only 2 enemies"]
                    if (cost / 30 > rng) {
                        kill = enemies[i].damage(this.multiplier * 2000);
                        success = true;
                    } else {
                        error = "failed rng roll";
                    }
                } break;
                case 3: {//Final Spark
                    if (enemies.length != 2) return [false, "This spell deals damage to only 2 enemies"]
                    if (cost / 50 > rng) {
                        kill = enemies[i].damage(this.multiplier * 4999);
                        success = true;
                    } else {
                        error = "failed rng roll";
                    }
                } break;
                default:
                    return [false, "Spell value out of bounds"]
            }
            if (kill) this.onKill(enemies[i]); //if spell killed the enemy
        }
        this.points -= cost;
        this.moves += 1;
        return [success, error];
    }

}