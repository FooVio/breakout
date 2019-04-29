import Phaser from 'phaser';

import playerImg from '../../assets/player.png';
import brickImg from '../../assets/brick.png';
import ballImg from '../../assets/ball.png';

import colorSchemes from '../colorSchemes';

const SCREEN_HEIGHT = 600;

class Level extends Phaser.Scene {
  constructor() {
    super({ key: 'Level', active: true });
  }

  preload() {
    this.load.image('player', playerImg);
    this.load.image('brick', brickImg);
    this.load.image('ball', ballImg);
  }

  create() {
    this.colors = Phaser.Math.RND.pick(colorSchemes);

    this.bricksLeft = null;
    this.level = -1;
    this.lives = 3;

    // Disable Floor
    this.physics.world.setBoundsCollision(true, true, true, false);

    this.player = this.physics.add.sprite(400, 550, 'player')
      .setCollideWorldBounds(true)
      .setImmovable(true)
      .setTint(this.colors.player);

    this.ball = this.physics.add.sprite(0, 0, 'ball')
      .setCollideWorldBounds(true)
      .setBounce(1)
      .setTint(this.colors.ball);

    this.events.emit('UPDATE_LIVES', this.lives);
    this.addBricks();
    this.nextLevel();

    this.physics.add.collider(this.player, this.ball, Level.hitBall);
  }

  update() {
    this.input.on('pointermove', (pointer) => {
      this.player.x = pointer.x;
    });

    if (this.ball.y > SCREEN_HEIGHT) {
      this.removeLife();
    }
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

    this.physics.add.collider(this.ball, this.bricks, this.hitBrick.bind(this));

    this.bricksLeft = this.bricks.children.entries.length;
    this.events.emit('BRICKS_LEFT', this.bricksLeft);
  }

  resetBall() {
    const speed = 300 + (this.level * 100);
    this.ball.setPosition(this.player.x, this.player.y - 25)
      .setVelocityY(speed);
  }

  nextLevel() {
    this.level += 1;
    this.resetBall();
    this.events.emit('UPDATE_LEVEL', this.level);
  }

  removeLife() {
    this.lives -= 1;
    this.resetBall();
    this.events.emit('UPDATE_LIVES', this.lives);

    if (this.lives === 0) {
      this.scene.pause();
      this.events.emit('GAME_OVER', this.lives);
    }
  }

  hitBrick(ball, brick) {
    brick.disableBody(true, true);
    this.bricksLeft -= 1;
    this.events.emit('BRICKS_LEFT', this.bricksLeft);

    if (this.bricksLeft === 0) {
      this.addBricks();
      this.nextLevel();
    }
  }

  static hitBall(player, ball) {
    const diff = ball.x - player.x;
    ball.setVelocityX(10 * diff);
  }
}

export default Level;
