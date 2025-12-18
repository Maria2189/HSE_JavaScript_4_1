import Archer from './Archer';
import Warrior from './Warrior';
import Mage from './Mage';
import Dwart from './Dwart';
import Crossbowman from './Crossbowman';
import Demourge from './Demourge';

export default function play() {
  const characters = [
    new Archer(),
    new Warrior(),
    new Mage(),
    new Dwart(),
    new Crossbowman(),
    new Demourge(),
  ];
  console.log(characters);
}