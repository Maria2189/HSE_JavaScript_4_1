import Player from './Player';
import Bow from './Bow';

export default class Archer extends Player {
  constructor() {
    super();
    this.weapon = new Bow();
  }
}