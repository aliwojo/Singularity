export default {
  type: Phaser.AUTO,
  width: 800,
  height: 600,

  render: {
    pixelArt: true,
  },

  physics: {
    default: 'matter',
    matter: {
      gravity: { y: 0, x: 0 },
      debug: true,
    },
  },
};
