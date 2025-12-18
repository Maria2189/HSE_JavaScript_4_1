//console.log('Версия игры: 3.0 (Проверка)');

import './css/style.css'; // Импорт стилей (чтобы не терять их)

import play from './js/game';

// Импортируем классы персонажей
import Warrior from './js/Warrior';
import Archer from './js/Archer';
import Mage from './js/Mage';
import Dwarf from './js/Dwart'; // Важно: импортируем из Dwart.js
import Crossbowman from './js/Crossbowman';
import Demiurge from './js/Demourge'; // Важно: импортируем из Demourge.js

// 1. Создаем команду персонажей
const characters = [
  new Warrior(0, 'Алёша Попович'),
  new Archer(2, 'Леголас'),
  new Mage(4, 'Гендальф'),
  new Dwarf(6, 'Гимли'),
  new Crossbowman(8, 'Ван Хельсинг'),
  new Demiurge(10, 'Саруман'),
];

// 2. Запускаем игру
// Результат будет выводиться в консоль браузера
play(characters);