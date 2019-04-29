import Phaser from 'phaser';

class HUD extends Phaser.Scene {
  constructor() {
    super({ key: 'HUD', active: false });
  }

  create() {
    this.input.setDefaultCursor('none');

    this.bricksLeftText = this.add.text(100, 50, '', {
      fontSize: '32px',
      fontFamily: 'Audiowide',
      color: '#FFFFFF',
    }).setOrigin(0, 0.5);

    this.levelText = this.add.text(700, 50, '', {
      fontSize: '32px',
      fontFamily: 'Audiowide',
      color: '#FFFFFF',
    }).setOrigin(1, 0.5);

    this.livesText = this.add.text(400, 50, '', {
      fontSize: '28px',
      fontFamily: 'Audiowide',
      color: '#FFFFFF',
    }).setOrigin(0.5, 0.5);

    this.levelEvents = this.scene.get('Level').events;
    this.levelEvents.on('BRICKS_LEFT', this.updateBricksLeft.bind(this));
    this.levelEvents.on('UPDATE_LEVEL', this.updateLevel.bind(this));
    this.levelEvents.on('UPDATE_LIVES', this.updateLives.bind(this));
    this.levelEvents.on('GAME_OVER', this.onGameOver.bind(this));
  }

  updateBricksLeft(bricksLeft) {
    this.bricksLeftText.setText(`bricks ${bricksLeft}`);
  }

  updateLevel(level) {
    this.levelText.setText(`level ${level}`);
  }

  updateLives(lives) {
    this.livesText.setText('<3'.repeat(lives));
  }

  onGameOver() {
    this.gameOverText = this.add.text(400, 350, 'GAME OVER', {
      fontSize: '50px',
      fontFamily: 'Audiowide',
      color: '#FFFFFF',
    }).setOrigin(0.5, 0.5);

    this.input.setDefaultCursor('auto');

    this.input.once('pointerdown', () => {
      this.gameOverText.destroy();
      this.scene.get('Level').scene.restart();
    });
  }
}

export default HUD;
