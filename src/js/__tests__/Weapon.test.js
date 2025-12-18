import Weapon from '../Weapon';
// Импортируем каждый класс из своего файла
import Arm from '../Arm';
import Bow from '../Bow';
import Sword from '../Sword';
import Knife from '../Knife';
import Staff from '../Staff';
import LongBow from '../LongBow';
import Axe from '../Axe';
import StormStaff from '../StormStaff';


// Тесты для базового класса и логики
describe('Weapon class methods', () => {
  test('should create instance correctly', () => {
    const weapon = new Weapon('TestWeapon', 10, 100, 1);
    expect(weapon).toEqual({
      name: 'TestWeapon',
      attack: 10,
      durability: 100,
      initDurability: 100,
      range: 1,
    });
  });

  test('takeDamage should reduce durability', () => {
    const weapon = new Weapon('Test', 10, 100, 1);
    weapon.takeDamage(10);
    expect(weapon.durability).toBe(90);
  });

  test('takeDamage should not reduce durability below 0', () => {
    const weapon = new Weapon('Test', 10, 10, 1);
    weapon.takeDamage(20);
    expect(weapon.durability).toBe(0);
  });

  test('getDamage should return full attack when durability is high', () => {
    const weapon = new Weapon('Test', 10, 100, 1);
    expect(weapon.getDamage()).toBe(10);
  });

  test('getDamage should return half attack when durability is low (<30%)', () => {
    const weapon = new Weapon('Test', 10, 100, 1);
    weapon.takeDamage(80); // durability 20 (20%)
    expect(weapon.getDamage()).toBe(5);
  });

  test('getDamage should return 0 when durability is 0', () => {
    const weapon = new Weapon('Test', 10, 100, 1);
    weapon.takeDamage(100); // durability 0
    expect(weapon.getDamage()).toBe(0);
  });

  test('isBroken should return false if durability > 0', () => {
    const weapon = new Weapon('Test', 10, 100, 1);
    expect(weapon.isBroken()).toBe(false);
  });

  test('isBroken should return true if durability is 0', () => {
    const weapon = new Weapon('Test', 10, 100, 1);
    weapon.takeDamage(100);
    expect(weapon.isBroken()).toBe(true);
  });
});

// Тесты для конкретных оружий (проверка правильности статов)
describe('Specific Weapons creation', () => {
  test('Arm should have correct stats', () => {
    const arm = new Arm();
    expect(arm.attack).toBe(1);
    expect(arm.durability).toBe(Infinity);
    expect(arm.range).toBe(1);
  });

  test('Bow should have correct stats', () => {
    const bow = new Bow();
    expect(bow.name).toBe('Лук');
    expect(bow.attack).toBe(10);
    expect(bow.durability).toBe(200);
    expect(bow.range).toBe(3);
  });

  test('Sword should have correct stats', () => {
    const sword = new Sword();
    expect(sword.name).toBe('Меч');
    expect(sword.attack).toBe(25);
    expect(sword.durability).toBe(500);
    expect(sword.range).toBe(1);
  });

  test('Knife should have correct stats', () => {
    const knife = new Knife();
    expect(knife.name).toBe('Нож');
    expect(knife.attack).toBe(5);
    expect(knife.durability).toBe(300);
    expect(knife.range).toBe(1);
  });

  test('Staff should have correct stats', () => {
    const staff = new Staff();
    expect(staff.name).toBe('Посох');
    expect(staff.attack).toBe(8);
    expect(staff.durability).toBe(300);
    expect(staff.range).toBe(2);
  });
});

describe('Advanced Weapons creation', () => {
  test('LongBow should be instance of Bow and have correct stats', () => {
    const longBow = new LongBow();
    expect(longBow).toBeInstanceOf(Bow);
    expect(longBow.name).toBe('Длинный лук');
    expect(longBow.attack).toBe(15);
    expect(longBow.range).toBe(4);
  });

  test('Axe should be instance of Sword and have correct stats', () => {
    const axe = new Axe();
    expect(axe).toBeInstanceOf(Sword);
    expect(axe.name).toBe('Секира');
    expect(axe.attack).toBe(27);
    expect(axe.durability).toBe(800);
  });

  test('StormStaff should be instance of Staff and have correct stats', () => {
    const stormStaff = new StormStaff();
    expect(stormStaff).toBeInstanceOf(Staff);
    expect(stormStaff.name).toBe('Посох Бури');
    expect(stormStaff.attack).toBe(10);
    expect(stormStaff.range).toBe(3);
  });
});

// Отдельный тест для Руки (Infinity durability)
test('Arm should never break', () => {
  const arm = new Arm();
  arm.takeDamage(1000);
  expect(arm.durability).toBe(Infinity);
  expect(arm.isBroken()).toBe(false);
  expect(arm.getDamage()).toBe(1);
});