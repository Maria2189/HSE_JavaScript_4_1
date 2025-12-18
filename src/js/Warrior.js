import Player from './Player';
import Sword from './Sword';

export default class Warrior extends Player {
  constructor() {
    super();
    this.weapon = new Sword();
  }
}