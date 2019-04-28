// tiles left
// setSpeed & level++
// game over on hit bottom
import Phaser from 'phaser';

class HUD extends Phaser.Scene {
  constructor() {
    super({ key: 'HUD', active: true });
  }

  create() {
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

    this.levelEvents = this.scene.get('Level').events;
    this.levelEvents.on('BRICKS_LEFT', this.updateBricksLeft.bind(this));
    this.levelEvents.on('UPDATE_LEVEL', this.updateLevel.bind(this));
  }

  updateBricksLeft(bricksLeft) {
    this.bricksLeftText.setText(`bricks ${bricksLeft}`);
  }

  updateLevel(level) {
    this.levelText.setText(`level ${level}`);
  }
}

export default HUD;
