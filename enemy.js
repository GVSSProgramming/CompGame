class enemy {
    name;
    hp;
    constructor() {
        this.reset();
    }
    getName(){
        return this.name;
    }
    getHp(){
        return this.hp;
    }

    reset(){
        this.hp = 10000; //WOW??? 10/10 game design    
            let rng = Math.random();
            if (rng > 0.9){
                this.name = "Dragon"
            } else if (rng > 0.6) {
                this.name = "Giant"
            } else if (rng > 0.4) {
                this.name = "Goblin"
            } else if (rng > 0.2){
                this.name = "Sidd"
            } else {
                this.name = "Dog"
            }   
    }
    damage(dmg) {
        this.hp -= dmg;
        return this.hp <= 0; //returns dead (true) alive (false)
    }
    
}
