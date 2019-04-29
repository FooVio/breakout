import Phaser from 'phaser';
import WebFont from 'webfontloader';

class Boot extends Phaser.Scene {
  constructor() {
    super({ key: 'Boot', active: true });
  }

  // eslint-disable-next-line class-methods-use-this
  preload() {
    WebFont.load({
      google: {
        families: ['Audiowide'],
      },
      active: () => {
        this.scene.start('Level');
        this.scene.start('HUD');
      },
    });
  }
}

export default Boot;
