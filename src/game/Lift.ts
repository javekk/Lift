import * as Phaser from 'phaser';
import { Choice } from './model/Choice';
import { GameEvent } from './model/GameEvent';
import { StuckInTheElevator } from './event/StuckInTheElevator'
import { GameStatus } from './model/GameStatus';
import { Exit } from './event/app/Exit';
import { Restart } from './event/app/Restart';
import { EventPool } from './service/EventPool';
import { SpriteManager } from './model/ui/SpriteManager';
import { UIManager } from './model/ui/UIManager';


const DESTROY_QUESTION_SPRITE_EVENT = 'destroySprite';


export default class Lift extends Phaser.Scene {

  currentStatus: GameStatus
  currentEvent: GameEvent
  eventPool: EventPool

  uiManager: UIManager
  spriteManager: SpriteManager

  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);

    this.currentStatus = new GameStatus();
    this.currentEvent = StuckInTheElevator.getInstance();
    this.eventPool = new EventPool();
    this.uiManager = new UIManager();
    this.spriteManager = new SpriteManager(this, this.uiManager);
  }

  preload() {
    this.spriteManager.init();
    this.spriteManager.loadSprites();
  }

  create() {
    this.spriteManager.addGameSprites();
    this.addQuestionAndChoices();
    this.input.on(
      'gameobjectup', 
      function (pointer: any, gameObject: Phaser.GameObjects.GameObject) {
          gameObject.emit('clicked', gameObject);
      }, 
      this,
    );
    this.currentStatus.logCurrentStatus();
    this.currentEvent.logCurrentEvent();
  }


  private addQuestionAndChoices() {

    this.spriteManager.addQuestion(this.currentEvent);
    this.displayChoices(this.currentEvent.question.getRandomFourChoices());

    this.events.on(
      DESTROY_QUESTION_SPRITE_EVENT, 
        function () {
          this.currentEvent.question.destroySprite(); 
      }, 
      this,
    );
  }

  private displayChoices(choices: Array<Choice>) {
    choices.forEach((choice: Choice, index: number) => {
      let choiceBox = this.spriteManager.addChoice(choice, index);
      choiceBox.setInteractive();
      choiceBox.on('clicked', this.handleChoiceClick(choice), this);
    });
  }

  private handleChoiceClick(choice: Choice) {
    return function () {
      this.currentStatus = this.currentEvent.computeNewGameStatus(choice, this.currentStatus);
      this.handleNewEvent(choice);
    };
  }

  private handleNewEvent(choice: Choice) {
    this.events.emit(DESTROY_QUESTION_SPRITE_EVENT); 
    const nextEvent = this.eventPool.getNextEvent(choice, this.currentStatus);
    if (Exit.isExit(nextEvent))
      this.exitGame();
    else if (Restart.isRestart(nextEvent))
      this.restartGame();
    else
      this.currentEvent = nextEvent;
    this.currentEvent.logCurrentEvent();
    this.addQuestionAndChoices();
  }


  private exitGame() {
    // TODO
    console.log("Exit Game Called");
  }

  private restartGame() {
    // TODO
    console.log("Restart Game Called");
  }
}