import Player from './Player';
import Staff from './Staff';

export default class Mage extends Player {
  constructor(position, name) {
    super(position, name);
    this.life = 70;
    this.magic = 100;
    this.attack = 5;
    this.agility = 8;
    this.description = 'Маг';
    this.weapon = new Staff();
  }

  takeDamage(damage) {
    if (this.magic > 50) {
      super.takeDamage(damage / 2);
      this.magic -= 12;
      if (this.magic < 0) this.magic = 0;
    } else {
      super.takeDamage(damage);
    }
  }
}