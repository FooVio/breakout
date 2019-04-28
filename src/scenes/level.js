import Phaser from 'phaser';

import playerImg from '../../assets/player.png';
import brickImg from '../../assets/brick.png';
import ballImg from '../../assets/ball.png';

import colorSchemes from '../colorSchemes';

class Level extends Phaser.Scene {
  constructor() {
    super({ key: 'Level', active: true });
    this.colors = Phaser.Math.RND.pick(colorSchemes);
  }

  preload() {
    this.load.image('player', playerImg);
    this.load.image('brick', brickImg);
    this.load.image('ball', ballImg);
  }

  create() {
    this.player = this.physics.add.sprite(400, 550, 'player')
      .setCollideWorldBounds(true)
      .setImmovable(true)
      .setTint(this.colors.player);

    this.ball = this.physics.add.sprite(400, 250, 'ball')
      .setCollideWorldBounds(true)
      .setBounce(1)
      .setVelocityY(300)
      .setTint(this.colors.ball);

    this.addBricks();

    this.physics.add.collider(this.player, this.ball, Level.hitBall);
  }

  update() {
    this.input.on('pointermove', (pointer) => {
      this.player.x = pointer.x;
    });
  }

  addBricks() {
    const w = 12;
    const h = 6;

    this.bricks = this.physics.add.staticGroup({
      key: 'brick',
      frameQuantity: w * h,
      gridAlign: {
        width: w, height: h, cellWidth: 52, cellHeight: 27, x: 113, y: 100,
      },
    });

    this.bricks.children.each((brick, i) => {
      const heightIndex = Math.floor(i / w);
      const tint = this.colors.bricks - (heightIndex * 20);
      brick.setTint(tint);
    });

    this.physics.add.collider(this.ball, this.bricks, Level.hitBrick);
  }

  static hitBall(player, ball) {
    const diff = ball.x - player.x;
    ball.setVelocityX(10 * diff);
  }

  static hitBrick(ball, brick) {
    brick.disableBody(true, true);
  }
}

export default Level;
