import Player from './Player';
import Sword from './Sword';

export default class Warrior extends Player {
  constructor(position, name) {
    super(position, name);
    this.life = 120;
    this.speed = 2;
    this.description = 'Воин';
    this.weapon = new Sword();
  }

  takeDamage(damage) {
    if (this.life < 120 * 0.5 && this.getLuck() > 0.8 && this.magic > 0) {
      const damageToMagic = Math.min(damage, this.magic);
      this.magic -= damageToMagic;
      const remainingDamage = damage - damageToMagic;
      super.takeDamage(remainingDamage);
    } else {
      super.takeDamage(damage);
    }
  }
}