import Warrior from '../Warrior';
import Archer from '../Archer';
import Mage from '../Mage';
import Bow from '../Bow';
import Sword from '../Sword';
import Arm from '../Arm';
import Knife from '../Knife';

describe('Classes characteristics', () => {
    test('Warrior should have correct initial stats', () => {
        const char = new Warrior(1, 'Test');
        expect(char.life).toBe(120);
        expect(char.weapon).toBeInstanceOf(Sword);
    });

    test('Archer should have correct initial stats', () => {
        const char = new Archer(1, 'Test');
        expect(char.life).toBe(80);
        expect(char.weapon).toBeInstanceOf(Bow);
    });
});

describe('Battle mechanics - Damage', () => {
    test('Warrior should take damage correctly (standard)', () => {
        const char = new Warrior(1, 'Test');
        char.takeDamage(10);
        expect(char.life).toBe(110);
    });

    test('Warrior should use magic shield if luck is high and life low', () => {
        const char = new Warrior(1, 'Test');
        char.life = 50; 
        
        // Мокаем random, чтобы getLuck() вернул почти 1 (максимальная удача)
        jest.spyOn(Math, 'random').mockReturnValue(0.99); 
        
        char.takeDamage(10);
        // Урон идет в ману (было 20, урон 10 -> станет 10)
        expect(char.magic).toBe(10);
        expect(char.life).toBe(50);
        
        jest.spyOn(Math, 'random').mockRestore();
    });

    test('Mage should reduce damage by mana (High Mana)', () => {
        const char = new Mage(1, 'Test');
        // Magic 100 > 50
        char.takeDamage(10);
        
        // Урон / 2 = 5. Life 70 - 5 = 65. Magic 100 - 12 = 88.
        expect(char.life).toBe(65);
        expect(char.magic).toBe(88);
    });

    test('Mage should take full damage if Mana is low', () => {
        const char = new Mage(1, 'Test');
        char.magic = 10; // Мало маны
        char.takeDamage(10);
        expect(char.life).toBe(60); // Полный урон (70 - 10)
    });
    
    test('Player should die when life reaches 0', () => {
        const char = new Warrior(1, 'Test');
        char.takeDamage(200);
        expect(char.life).toBe(0);
        expect(char.isDead()).toBe(true);
    });
});

describe('Battle mechanics - Attack & Defense', () => {
    test('Player should calculate dodge correctly', () => {
        const char = new Archer(1, 'Test'); // Agility 10
        // Формула уклонения: getLuck() > (100 - agility - speed*3) / 100
        // (100 - 10 - 1*3) / 100 = 0.87
        
        jest.spyOn(Math, 'random').mockReturnValue(0.95); // Удачный бросок
        expect(char.dodged()).toBe(true);

        jest.spyOn(Math, 'random').mockReturnValue(0.1); // Неудачный бросок
        expect(char.dodged()).toBe(false);
        
        jest.spyOn(Math, 'random').mockRestore();
    });

    test('Player should block attack if lucky', () => {
        const char = new Warrior(1, 'Test');
        // Формула блока: getLuck() > (100 - luck) / 100
        
        jest.spyOn(Math, 'random').mockReturnValue(0.99); // Удача
        expect(char.isAttackBlocked()).toBe(true);
        
        jest.spyOn(Math, 'random').mockRestore();
    });

    test('takeAttack: Blocked attack damages weapon', () => {
        const char = new Warrior(1, 'Test');
        jest.spyOn(char, 'isAttackBlocked').mockReturnValue(true); // Форсируем блок
        
        const initialDurability = char.weapon.durability;
        char.takeAttack(10);
        
        expect(char.life).toBe(120); // Здоровье не пострадало
        expect(char.weapon.durability).toBeLessThan(initialDurability); // Оружие пострадало
    });

    test('takeAttack: Dodged attack deals no damage', () => {
        const char = new Archer(1, 'Test');
        jest.spyOn(char, 'isAttackBlocked').mockReturnValue(false);
        jest.spyOn(char, 'dodged').mockReturnValue(true); // Форсируем уклонение
        
        const initialLife = char.life;
        char.takeAttack(10);
        
        expect(char.life).toBe(initialLife);
    });
    
    test('tryAttack: should not attack if enemy is out of range', () => {
        const attacker = new Warrior(0, 'Attacker'); // Range 1
        const enemy = new Warrior(10, 'Enemy');
        
        // Spy на метод врага, чтобы проверить, вызвался ли он
        const takeAttackSpy = jest.spyOn(enemy, 'takeAttack');
        
        attacker.tryAttack(enemy);
        expect(takeAttackSpy).not.toHaveBeenCalled(); // Не достал
    });
    
    test('tryAttack: same position doubles damage and moves enemy', () => {
        const attacker = new Warrior(2, 'Attacker');
        const enemy = new Warrior(2, 'Enemy');
        
        jest.spyOn(Math, 'random').mockReturnValue(0.5); // Средняя удача
        
        attacker.tryAttack(enemy);
        
        expect(enemy.position).toBe(3); // Враг отлетел вправо
        expect(enemy.life).toBeLessThan(120); // Получил урон
        jest.spyOn(Math, 'random').mockRestore();
    });

    test('Archer getDamage returns 0 if out of range', () => {
        const archer = new Archer(0, 'Legolas'); // Range 3
        const damage = archer.getDamage(10); // Дистанция 10
        expect(damage).toBe(0);
    });
});

describe('Movement', () => {
    test('Player should move correctly', () => {
        const char = new Warrior(0, 'Test'); // speed 2
        char.moveRight(5);
        expect(char.position).toBe(2); // макс. скорость
        char.moveLeft(1);
        expect(char.position).toBe(1);
    });
    
    test('move() handles negative distance as left', () => {
        const char = new Warrior(5, 'Test');
        char.move(-1); // Должен вызвать moveLeft(1)
        expect(char.position).toBe(4); // 5 - 1
    });
});

describe('Weapon management', () => {
    test('checkWeapon switches to Knife then Arm', () => {
        const char = new Warrior(0, 'Test'); // Sword
        
        // Ломаем меч
        char.weapon.durability = 0;
        char.checkWeapon();
        expect(char.weapon).toBeInstanceOf(Knife);
        
        // Ломаем нож
        char.weapon.durability = 0;
        char.checkWeapon();
        expect(char.weapon).toBeInstanceOf(Arm);
    });
});

describe('AI Logic (Turn)', () => {
    test('chooseEnemy picks lowest health enemy', () => {
        const hero = new Warrior(0, 'Hero');
        const enemy1 = new Warrior(5, 'Weak');
        const enemy2 = new Warrior(5, 'Strong');
        
        enemy1.life = 10;
        enemy2.life = 100;
        
        const chosen = hero.chooseEnemy([hero, enemy1, enemy2]);
        expect(chosen).toBe(enemy1);
    });
    
    test('moveToEnemy moves closer', () => {
        const hero = new Warrior(0, 'Hero'); // speed 2
        const enemy = new Warrior(10, 'Enemy');
        
        hero.moveToEnemy(enemy);
        expect(hero.position).toBe(2);
    });
    
    test('turn() executes full cycle', () => {
        const hero = new Warrior(0, 'Hero');
        const enemy = new Warrior(1, 'Enemy');
        
        // Следим за методами
        const moveSpy = jest.spyOn(hero, 'moveToEnemy');
        const attackSpy = jest.spyOn(hero, 'tryAttack');
        
        hero.turn([hero, enemy]);
        
        expect(moveSpy).toHaveBeenCalledWith(enemy);
        expect(attackSpy).toHaveBeenCalledWith(enemy);
    });
});