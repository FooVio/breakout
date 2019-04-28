import Phaser from 'phaser';

import Boot from './scenes/boot';
import Level from './scenes/level';
import HUD from './scenes/hud';

const config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 800,
  height: 600,
  backgroundColor: 0x222222,
  physics: {
    default: 'arcade',
  },
  scene: [Boot, Level, HUD],
};

const game = new Phaser.Game(config);
// game();
