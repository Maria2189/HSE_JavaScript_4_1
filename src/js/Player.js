import Arm from './Arm';
import Knife from './Knife';

export default class Player {
  constructor(position, name) {
    this.life = 100;
    this.magic = 20;
    this.speed = 1;
    this.attack = 10;
    this.agility = 5;
    this.luck = 10;
    this.description = 'Игрок';
    this.weapon = new Arm();
    this.position = position;
    this.name = name;
  }

  getLuck() {
    const randomNumber = Math.random() * 100;
    return (randomNumber + this.luck) / 100;
  }

  getDamage(distance) {
    if (distance > this.weapon.range) {
      return 0;
    }
    const weaponDamage = this.weapon.getDamage();
    return (this.attack + weaponDamage) * this.getLuck() / distance;
  }

  takeDamage(damage) {
    this.life -= damage;
    if (this.life < 0) {
      this.life = 0;
    }
  }

  isDead() {
    return this.life === 0;
  }

  moveLeft(distance) {
    const realDistance = Math.min(distance, this.speed);
    this.position -= realDistance;
  }

  moveRight(distance) {
    const realDistance = Math.min(distance, this.speed);
    this.position += realDistance;
  }

  move(distance) {
    if (distance < 0) {
      this.moveLeft(Math.abs(distance));
    } else {
      this.moveRight(distance);
    }
  }

  isAttackBlocked() {
    return this.getLuck() > (100 - this.luck) / 100;
  }

  dodged() {
    return this.getLuck() > (100 - this.agility - this.speed * 3) / 100;
  }

  takeAttack(damage) {
    if (this.isAttackBlocked()) {
      this.weapon.takeDamage(damage);
    } else if (this.dodged()) {
      // Уклонение
    } else {
      this.takeDamage(damage);
    }
  }

  checkWeapon() {
    if (this.weapon.isBroken()) {
      if (this.weapon instanceof Knife || this.weapon instanceof Arm) {
        this.weapon = new Arm();
      } else {
        this.weapon = new Knife();
      }
    }
  }

  tryAttack(enemy) {
    const distance = Math.abs(this.position - enemy.position);
    if (distance > this.weapon.range) {
      return;
    }
    
    const weaponWear = 10 * this.getLuck();
    this.weapon.takeDamage(weaponWear);
    
    let damage = this.getDamage(distance);
    
    if (this.position === enemy.position) {
      enemy.moveRight(1);
      damage *= 2;
    }
    
    enemy.takeAttack(damage);
    this.checkWeapon();
  }

  chooseEnemy(players) {
    const enemies = players.filter(p => p !== this && !p.isDead());
    if (enemies.length === 0) return null;
    
    return enemies.reduce((min, current) => {
      if (current.life < min.life) return current;
      return min;
    });
  }

  moveToEnemy(enemy) {
    if (!enemy) return;
    const distance = enemy.position - this.position;
    this.move(distance);
  }

  turn(players) {
    const enemy = this.chooseEnemy(players);
    if (enemy) {
      this.moveToEnemy(enemy);
      this.tryAttack(enemy);
    }
  }
}