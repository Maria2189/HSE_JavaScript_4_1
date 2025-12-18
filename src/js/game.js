export default function play(players) {
  let round = 0;
  
  while (players.filter(p => !p.isDead()).length > 1) {
    round++;
    console.log(`--- Раунд ${round} ---`);
    
    for (const player of players) {
      if (player.isDead()) continue;
      player.turn(players);
    }
    
    players.forEach(p => {
      if (!p.isDead()) {
        console.log(`${p.name} (${p.description}): Life ${p.life.toFixed(1)}, Weapon: ${p.weapon.name}`);
      }
    });
  }

  const winner = players.find(p => !p.isDead());
  if (winner) {
    console.log(`Победитель: ${winner.name} (${winner.description})!`);
  } else {
    console.log('Все погибли...');
  }
  
  return winner;
}