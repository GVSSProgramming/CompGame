class enemy {
    name;
    hp;
    constructor(name, hp) {
        this.name = name;
        this.hp = hp;
    }
    getName(){
        return this.name;
    }
    getHp(){
        return this.hp
    }
    reset(){
        this.hp = 10000; //WOW??? 10/10 game design                                                                                         
    }
    damage(dmg) {
        this.hp -= dmg;
        return this.hp <= 0; //returns dead (true) false (alive)
    }
    
}
