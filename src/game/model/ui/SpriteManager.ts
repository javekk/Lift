
export class SpriteManager {

    constructor(
        public scene: Phaser.Scene,
    ) { }

    public loadSprites() {

        this.scene.load.image('background', './assets/Lift - tiny.png');

        this.scene.load.spritesheet('Mr.Bafo', 'assets/Mr.Bafo.png', {
            frameWidth: 448,
            frameHeight: 448,
        });
        this.scene.load.spritesheet('Mrs.Oak', 'assets/Mrs.Oak.png', {
            frameWidth: 448,
            frameHeight: 448
        });

        this.scene.load.image('smallFrame', 'assets/smallFrame.png');
        this.scene.load.image('bigFrame', 'assets/bigFrame.png');
    }
}
