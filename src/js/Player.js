import Arm from './Arm';
import Knife from './Knife';

export default class Player {
  constructor() {
    this.primaryWeapon = new Arm();
    this.secondaryWeapon = new Knife();
  }
}