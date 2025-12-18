import Player from './Player';
import Staff from './Staff';

export default class Mage extends Player {
  constructor() {
    super();
    this.weapon = new Staff();
  }
}