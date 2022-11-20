import * as Phaser from 'phaser';
import {
  Question,
  Answer
} from '../game/Question';
import {
  Point
} from '../game/ui/Point';

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
        new Answer("Game?", false),
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

    this.add.image(
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

    const mrBafo = this.addSprite(
      new Point(
        this.pixelscale * this.scalesprite,
        game.config.height - (this.asPixel(36) * this.scalesprite)
      )
    )
    mrBafo.play('mrBafoIdle');

    const mrsOak = this.addSprite(
      new Point(
        this.asPixel(17) * this.scalesprite,
        game.config.height - (this.asPixel(36) * this.scalesprite),
      )
    )
    mrsOak.play('mrsOakidle');

    // Question
    this.addQuestionAndChoices();

    this.input.on('gameobjectup', function (pointer, gameObject) {
      gameObject.emit('clicked', gameObject);
    }, this);
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

  addQuestionAndChoices() {
    const questionCoordinates = new Point(
      (game.config.width / 2) + this.asPixel(2),
      this.asPixel(1)
    );
    this.questionBox = this.addSprite(questionCoordinates, 'bigFrame');
    this.questionText = this.addText(
      new Point(
        questionCoordinates.x + this.asPixel(2),
        questionCoordinates.y + this.asPixel(2),
      ),
      this.currentQuestion.text
    );
    // Choices
    this.displayChoice(this.currentQuestion.choices);
  }

  displayChoice(choices) {
    let verticalOffset = this.asPixel(12);
    let isEven = true;
    choices.forEach(choice => {

      let choiceCoordinates;
      if (isEven) {
        choiceCoordinates = new Point(
          (game.config.width / 2) + this.asPixel(2),
          verticalOffset + this.asPixel(1)
        );
        isEven = !isEven;
      } else {
        choiceCoordinates = new Point(
          (game.config.width / 2) + this.asPixel(20),
          verticalOffset + this.asPixel(1)
        );
        verticalOffset += this.asPixel(8);
        isEven = !isEven;
      }
      let choiceBox = this.addSprite(choiceCoordinates, 'smallFrame');
      choiceBox.setInteractive();
      choiceBox.on('clicked', this.handleChoiceClick(choice), this);
      this.addText(
        new Point(
          choiceCoordinates.x + this.asPixel(2),
          choiceCoordinates.y + this.asPixel(2)
        ),
        choice.text
      );
    });
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

  asPixel(numberOfPixel) {
    return numberOfPixel * this.pixelscale;
  }

  addSprite(coordinates) {
    return this.add.sprite(
        coordinates.x,
        coordinates.y
      )
      .setScale(this.scalesprite)
      .setOrigin(0, 0);
  }

  addSprite(coordinates, spriteName) {
    return this.add.sprite(
        coordinates.x,
        coordinates.y,
        spriteName
      )
      .setScale(this.scalesprite)
      .setOrigin(0, 0);
  }

  addText(coordinates, text) {
    return this.add.text(
        coordinates.x,
        coordinates.y,
        text, {
          font: '42px Arial',
          fill: '#292c33'
        }
      )
      .setOrigin(0, 0);
  }
}