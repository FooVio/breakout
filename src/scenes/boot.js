import Phaser from 'phaser';

class Boot extends Phaser.Scene {
  constructor() {
    super({ key: 'Boot', active: true });
  }

  // eslint-disable-next-line class-methods-use-this
  init() {
    const styleElement = document.createElement('style'); // eslint-disable-line no-undef
    styleElement.innerHTML = '@import url(\'https://fonts.googleapis.com/css?family=Audiowide\');';
    document.head.appendChild(styleElement); // eslint-disable-line no-undef
  }

  preload() {
    this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
  }
}

export default Boot;
