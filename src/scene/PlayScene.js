import * as Phaser from 'phaser';
import {
  Question,
  Answer
} from '../game/Question';

export default class PlayScene extends Phaser.Scene {

  constructor() {
    super();
    this.pixelscale = 14
    this.scalesprite = 0.8035714
    this.framerate = 8
    this.currentQuestion = new Question(
      "Is this the best game \never?",
      new Set([
        new Answer("Yes", false),
        new Answer("No", true),
        new Answer("Maybe", false),
        new Answer("Game?", false)
      ])
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

    this.load.image('smallFrame', 'assets/smallFrame.png');    
    this.load.image('bigFrame', 'assets/bigFrame.png');
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
      frames: this.anims.generateFrameNames('Mr.Bafo', {
        frames: mrBafoFrames
      }),
      frameRate: this.framerate,
      repeat: -1,
    });

    const mrsOakFrames = [...Array(this.framerate * 4).fill(0)].concat([1])
    this.anims.create({
      key: 'mrsOakidle',
      frames: this.anims.generateFrameNumbers('Mrs.Oak', {
        frames: mrsOakFrames
      }),
      frameRate: this.framerate,
      repeat: -1,
    });

    // TODO cut the sprites better 
    const mrBafo =
      this.add.sprite(
        this.pixelscale * this.scalesprite,
        game.config.height - (this.asPixel(36) * this.scalesprite),
      )
      .setScale(this.scalesprite)
      .setOrigin(0, 0);
    mrBafo.play('mrBafoIdle');

    const mrsOak =
      this.add.sprite(
        this.asPixel(17) * this.scalesprite,
        game.config.height - (this.asPixel(36) * this.scalesprite),
      )
      .setScale(this.scalesprite)
      .setOrigin(0, 0);
    mrsOak.play('mrsOakidle');


    // Question
    const questionCoordinates = {
      width: (game.config.width / 2) + this.asPixel(2),
      height: this.asPixel(1)
    }
    this.questionBox = this.add.image(
      questionCoordinates.width,
      questionCoordinates.height,
      'bigFrame'
    )
    .setScale(this.scalesprite)
    .setOrigin(0, 0);
    this.questionText = this.add.text(
        questionCoordinates.width + this.asPixel(2),
        questionCoordinates.height + this.asPixel(2),
        this.currentQuestion.text, {
          font: '42px Arial',
          fill: '#292c33'
        }
      )
      .setOrigin(0, 0);
    // Choices
    let verticalOffset = this.asPixel(12);
    let isEven = true;
    
    this.currentQuestion.choices.forEach(choice => {

      let choiceCoordinates;
      if(isEven){
        choiceCoordinates = {
          width: (game.config.width / 2) + this.asPixel(2),
          height: verticalOffset + this.asPixel(1)
        }
        isEven = !isEven;
      }
      else{
        choiceCoordinates = {
          width: (game.config.width / 2) + this.asPixel(20),
          height: verticalOffset + this.asPixel(1)
        }
        verticalOffset += this.asPixel(8);
        isEven = !isEven;
      }
      let choiceBox = this.add.image(
        choiceCoordinates.width,
        choiceCoordinates.height,
        'smallFrame'
      )
      .setScale(this.scalesprite)
      .setOrigin(0, 0);
      let choiceText = this.add.text(
        choiceCoordinates.width + this.asPixel(2),
        choiceCoordinates.height + this.asPixel(2),
        choice.text, {
          font: '42px Arial',
          fill: '#292c33'
        }
      )
      choiceBox.setInteractive();
      choiceBox.on('clicked', this.handleChoiceClick(choice), this);

      this.input.on('gameobjectup', function (pointer, gameObject) {
        gameObject.emit('clicked', gameObject);
      }, this);
    })


    // Game over text
    this.gameOverText = this.add.text(
        this.asPixel(2),
        game.config.height / 2,
        '', {
          font: '42px Arial',
          fill: '#000000'
        }
      )
      .setOrigin(0, 0);
  }

  handleChoiceClick(choice) {
    return function () {
      if (choice.isCorrect) {
        this.gameOverText.setText("Yayy, you won");
      } else {
        this.gameOverText.setText("I'm very sorry if you think that");
      }
    };
  }

  asPixel(numberOfPixel){
    return numberOfPixel * this.pixelscale;
  }

}