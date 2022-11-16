import * as Phaser from 'phaser';
import { Question, Answer } from '../game/Question';

export default class PlayScene extends Phaser.Scene {

  constructor() {
    super();
    this.pixelscale = 14
    this.scalesprite = 0.8035714
    this.framerate = 8
    this.currentQuestion = new Question(
      "Is this the best game ever?",
      new Set([
          new Answer("Yes", false),
          new Answer("No", true)
        ]
      )
    )
  }

  preload() {
    this.load.image('background', './assets/Lift - tiny.png');

    this.load.spritesheet('Mr.Bafo', 'assets/Mr.Bafo.png', {
      frameWidth: 448,
      frameHeight: 448,
    });
    this.load.spritesheet('Mrs.Oak', 'assets/Mrs.Oak.png', {
      frameWidth: 448,
      frameHeight: 448
    });
  }


  create() {
    const background = this.add.image(
        0,
        0,
        'background'
      )
      .setOrigin(0, 0)
      .setScale(this.scalesprite);
    
    const mrBafoFrames = [...Array(this.framerate * 5).fill(0)].concat([2])
    this.anims.create({
      key: 'mrBafoIdle',
      frames: this.anims.generateFrameNames('Mr.Bafo', { frames: mrBafoFrames }),
      frameRate: this.framerate,
      repeat:-1,
    });

    const mrsOakFrames = [...Array(this.framerate * 4).fill(0)].concat([1])
    this.anims.create({
      key: 'mrsOakidle',
      frames: this.anims.generateFrameNumbers('Mrs.Oak', {frames: mrsOakFrames}),
      frameRate: this.framerate,
      repeat:-1,
    });

    const mrBafo = 
      this.add.sprite(
        game.config.width - (30 * this.pixelscale * this.scalesprite),
        game.config.height - (36 * this.pixelscale * this.scalesprite),
      )
      .setScale(this.scalesprite)
      .setOrigin(0, 0);
    mrBafo.play('mrBafoIdle');

    const mrsOak = 
      this.add.sprite(
        game.config.width - (47 * this.pixelscale * this.scalesprite),
        game.config.height - (36 * this.pixelscale * this.scalesprite),
      )
      .setScale(this.scalesprite)
      .setOrigin(0, 0);
    mrsOak.play('mrsOakidle');
      
    // Question
    this.question = this.add.text(
      2 * this.pixelscale, 
      0, 
      this.currentQuestion.text, 
      { font: '42px Arial', fill: '#000000' }
    )
    .setOrigin(0, 0);
    // Choices
    let offset = 4 * this.pixelscale;
    this.currentQuestion.choices.forEach( choice =>{
      let choiceText = this.add.text(
        2 * this.pixelscale, 
        offset, 
        choice.text, 
        { font: '42px Arial', fill: '#000000' }
      )
      offset *= 2;
      choiceText.setInteractive();
      choiceText.on('clicked', function(){
        if(choice.isCorrect){
          this.gameOverText.setText("Yayy, you won");
        }else{
          this.gameOverText.setText("I'm very sorry if you think that");
        }
      }, this);

      this.input.on('gameobjectup', function (pointer, gameObject){
          gameObject.emit('clicked', gameObject);
      }, this);
    })


    // Game over text
    this.gameOverText = this.add.text(
        2 * this.pixelscale, 
        game.config.height / 2, 
        '', 
        { font: '42px Arial', fill: '#000000' }
      )
      .setOrigin(0, 0);
  }

  choiceTextHandler(choice){
    if(choice.isCorrect){
      //this.gameOverText.setText("Yayy, you won");
      console.log("Yayy, you won");
    }else{
      //this.gameOverText.setText("I'm very sorry if you think that");
      console.log("I'm very sorry if you think that");
    }
  }

}