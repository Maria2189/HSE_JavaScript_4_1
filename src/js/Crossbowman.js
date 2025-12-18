import Archer from './Archer';
import LongBow from './LongBow';

export default class Crossbowman extends Archer {
  constructor() {
    super();
    this.weapon = new LongBow();
  }
}