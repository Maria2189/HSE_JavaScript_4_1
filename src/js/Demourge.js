import Mage from './Mage';
import StormStaff from './StormStaff';

export default class Demourge extends Mage {
  constructor() {
    super();
    this.weapon = new StormStaff();
  }
}