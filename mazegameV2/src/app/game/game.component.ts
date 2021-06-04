import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import {
  BLOCK_SIZE,
  XAXIS,
  YAXIS,
  DUNGEONS,
  ENEMIES,
} from './game-config/settings';
import * as _ from 'lodash';

export interface IScreen {
  playerX: number;
  playerY: number;
  drawPlayer: () => [message: string];
  drawScreen: (dungeon: number) => void;
  drawCoin: (dungeon: number) => void;

  key: string;
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent {
  constructor() {}

  private _ctx: CanvasRenderingContext2D;
  public dungeon: number;
  public wealth: number;
  public message: string;
  public gameStart: boolean = false;
  public gameOver: boolean = false;
  public screen: IScreen;
  public whosThat: number;
  @ViewChild('screen', { static: true })
  public set canvas(ele: ElementRef<HTMLCanvasElement>) {
    if (ele) {
      this._initScreen(ele.nativeElement);
    }
  }

  @HostListener('window:keydown', ['$event'])
  async keyEvent(event: KeyboardEvent): Promise<void> {
    if (this.moves[event.code]) {
      event.preventDefault();
      this.moves[event.key](this.screen);
      this.screen.key = event.key;
      this._keepInside();
      //  create this function to prevent the player moving beyond the contraints of the desfined screen size
      console.log(this.dungeon);
      console.log(this.screen.playerX);
      console.log(this.screen.playerY);
      this._enemyCollisionCheck(
        this.dungeon,
        this.screen.playerX,
        this.screen.playerY
      );
      this._amuletCollectionCheck(
        this.dungeon,
        this.screen.playerX,
        this.screen.playerY
      );
      this._doorCollisionCheck(
        this.dungeon,
        this.screen.playerX,
        this.screen.playerY
      );
      // create this function to check if an enemy interaction has occured after each move this._checkEnemyInteraction();
      this._ctx.clearRect(
        0,
        0,
        this._ctx.canvas.width,
        this._ctx.canvas.height
      );
      this.screen.drawScreen(this.dungeon);
    }
  }

  public moves = {
    [KEY.left]: (p: IScreen): void => {
      p.playerX -= 50;
    },
    [KEY.right]: (p: IScreen): void => {
      p.playerX += 50;
    },
    [KEY.up]: (p: IScreen): void => {
      p.playerY += 50;
    },
    [KEY.down]: (p: IScreen): void => {
      p.playerY -= 50;
    },
  };

  private _keepInside(): void {
    this.screen.playerX = Math.max(0, this.screen.playerX);
    this.screen.playerX = Math.min(700, this.screen.playerX);
    this.screen.playerY = Math.max(0, this.screen.playerY);
    this.screen.playerY = Math.min(700, this.screen.playerY);
  }
  private _amuletCollectionCheck(
    dungeon: number,
    playerX: number,
    playerY: number
  ) {
    if (DUNGEONS[dungeon].hasCoins) {
      if (playerX === 0 && playerY === 0) {
        this.wealth += DUNGEONS[dungeon].coinValue.TopLeft;
        _.remove(DUNGEONS[dungeon].amulets, (o) => o[0] === 0 && o[1] === 0);
        DUNGEONS[dungeon].coinValue.TopLeft = 0;
      } else if (playerX === 0 && playerY === 700) {
        this.wealth += DUNGEONS[dungeon].coinValue.BottomLeft;
        _.remove(DUNGEONS[dungeon].amulets, (o) => o[0] === 0 && o[1] === 700);
        DUNGEONS[dungeon].coinValue.BottomLeft = 0;
      } else if (playerX === 350 && playerY === 350) {
        this.wealth += DUNGEONS[dungeon].coinValue.Center;
        _.remove(
          DUNGEONS[dungeon].amulets,
          (o) => o[0] === 350 && o[1] === 350
        );
        DUNGEONS[dungeon].coinValue.Center = 0;
        this.screen.drawCoin(dungeon);
      } else if (playerX === 700 && playerY === 0) {
        this.wealth += DUNGEONS[dungeon].coinValue.TopRight;
        _.remove(DUNGEONS[dungeon].amulets, (o) => o[0] === 700 && o[1] === 0);
        DUNGEONS[dungeon].coinValue.TopRight = 0;
      } else if (playerX === 700 && playerY === 700) {
        this.wealth += DUNGEONS[dungeon].coinValue.BottomRight;
        _.remove(
          DUNGEONS[dungeon].amulets,
          (o) => o[0] === 700 && o[1] === 700
        );
        DUNGEONS[dungeon].coinValue.BottomRight = 0;
      }
    }
  }
  private _enemyCollisionCheck(
    dungeon: number,
    playerX: number,
    playerY: number
  ) {
    if (DUNGEONS[dungeon].threats.hasBlastoise === true) {
      this.whosThat = 0;
    }
    if (DUNGEONS[dungeon].threats.hasCharizard === true) {
      this.whosThat = 1;
    }
    if (DUNGEONS[dungeon].threats.hasVenusaur === true) {
      this.whosThat = 2;
    }
    if (DUNGEONS[dungeon].threats.hasEternatus === true) {
      this.whosThat = 3;
    }
    if (DUNGEONS[dungeon].threats.hasSnorlax === true) {
      this.whosThat = 4;
    }
    if (DUNGEONS[dungeon].threats.hasNoEnemy === true) {
      this.whosThat = 5;
    }

    if (
      (playerX >= ENEMIES[this.whosThat].attributes.x ||
        playerX <=
          ENEMIES[this.whosThat].attributes.x +
            ENEMIES[this.whosThat].attributes.width) &&
      (playerY >= ENEMIES[this.whosThat].attributes.y ||
        playerY <=
          ENEMIES[this.whosThat].attributes.y +
            ENEMIES[this.whosThat].attributes.height)
    ) {
      this.wealth -= ENEMIES[this.whosThat].attributes.attackDamage;
    }
  }

  private _doorCollisionCheck(
    dungeon: number,
    playerX: number,
    playerY: number
  ): number {
    // North door
    if (
      DUNGEONS[dungeon].doors.hasNorthDoor &&
      playerX === 350 &&
      playerY === 0
    ) {
      this.dungeon = DUNGEONS[dungeon].passages.northDungeon;
      this.screen.playerX = 350;
      this.screen.playerY = 650;
    }
    // West Door
    if (
      DUNGEONS[dungeon].doors.hasWestDoor &&
      playerX === 0 &&
      playerY === 350
    ) {
      this.dungeon = DUNGEONS[dungeon].passages.westDungeon;
      this.screen.playerX = 650;
      this.screen.playerY = 350;
    }
    // East Door
    if (
      DUNGEONS[dungeon].doors.hasEastDoor &&
      playerX === 700 &&
      playerY === 350
    ) {
      this.dungeon = DUNGEONS[dungeon].passages.eastDungeon;

      this.screen.playerX = 50;
      this.screen.playerY = 350;
    }
    // South Door
    if (
      DUNGEONS[dungeon].doors.hasSouthDoor &&
      playerX === 350 &&
      playerY === 700
    ) {
      this.dungeon = DUNGEONS[dungeon].passages.southDungeon;
      this.screen.playerX = 350;
      this.screen.playerY = 50;
    }
    return this.dungeon;
  }

  private _initScreen(canvas: HTMLCanvasElement): void {
    this._ctx = canvas.getContext('2d');
    // Here we calculate the size of the game screen using our predefined parameters in game-config/settings.ts
    this._ctx.canvas.height = YAXIS * BLOCK_SIZE;
    this._ctx.canvas.width = XAXIS * BLOCK_SIZE;
  }

  public newGame(): void {
    // Begin a brand new game
    this.gameStart = true;
    this.dungeon = Math.floor(Math.random() * 6);
    this.wealth = 0;
    this.screen = new Screen(this._ctx);
    this.screen.drawScreen(this.dungeon);
  }

  public reset(): void {
    delete this.screen;
    this.gameOver = false;
    this.dungeon = Math.floor(Math.random() * 6);
    this.message = `Welcome to pixel hell`;
    this.gameStart = true;
    this.screen = new Screen(this._ctx);
    this._ctx.clearRect(0, 0, this._ctx.canvas.width, this._ctx.canvas.height);
    // this.screen.resetEverything();
    this.screen.drawScreen(this.dungeon);
  }
}

export class Screen implements IScreen {
  public playerX: number;
  public playerY: number;
  public playerBoundary: number[][];
  public key: string;
  public blastoiseKey: boolean = false;
  public charizardKey: boolean = false;
  public venusaurKey: boolean = false;
  public amulets: [number, number][] = [];
  constructor(private _ctx: CanvasRenderingContext2D) {
    this._createPlayer();
  }

  public drawScreen(dungeon: number): void {
    this._ctx.beginPath();
    this._ctx.fillStyle = DUNGEONS[dungeon].background;
    this._ctx.fillRect(0, 0, 750, 750);
    if (DUNGEONS[dungeon].doors.hasNorthDoor) {
      this.drawDoorNorth();
    }
    if (DUNGEONS[dungeon].doors.hasSouthDoor) {
      this.drawDoorSouth();
    }
    if (DUNGEONS[dungeon].doors.hasEastDoor) {
      this.drawDoorEast();
    }
    if (DUNGEONS[dungeon].doors.hasWestDoor) {
      this.drawDoorWest();
    }
    if (DUNGEONS[dungeon].hasCoins) {
      this.drawCoin(dungeon);
    }
    if (DUNGEONS[dungeon].threats.hasBlastoise) {
      this.drawBlastoise();
    }
    if (DUNGEONS[dungeon].threats.hasCharizard) {
      this.drawCharizard();
    }
    if (DUNGEONS[dungeon].threats.hasVenusaur) {
      this.drawVenusaur();
    }
    if (DUNGEONS[dungeon].threats.hasEternatus) {
      this.drawEternatus();
    }
    if (DUNGEONS[dungeon].threats.hasSnorlax) {
      this.drawSnorlax();
    }
    this.drawCoin(dungeon);
    this.drawPlayer();
  }

  private _createPlayer() {
    this.playerBoundary = [
      [0, 0, 0],
      [0, 2, 0],
      [0, 0, 0],
    ];

    this.playerX = 350;
    this.playerY = 600;
  }

  public drawPlayer(): [message: string] {
    const upRightMeowth = document.getElementById(
      'playerUpRight'
    ) as HTMLCanvasElement;
    const upLeftMeowth = document.getElementById(
      'playerUpLeft'
    ) as HTMLCanvasElement;
    const downRightMeowth = document.getElementById(
      'playerDownRight'
    ) as HTMLCanvasElement;
    const downLeftMeowth = document.getElementById(
      'playerDownLeft'
    ) as HTMLCanvasElement;

    this.playerBoundary.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          if (this.key !== 'ArrowLeft' && this.playerY < 350) {
            this._ctx.drawImage(
              upRightMeowth,
              this.playerX + x,
              this.playerY + y,
              50,
              50
            );
          } else if (this.key !== 'ArrowRight' && this.playerY < 350) {
            this._ctx.drawImage(
              upLeftMeowth,
              this.playerX + x,
              this.playerY + y,
              50,
              50
            );
          }
          if (this.key !== 'ArrowLeft' && this.playerY >= 350) {
            this._ctx.drawImage(
              downRightMeowth,
              this.playerX + x,
              this.playerY + y,
              50,
              50
            );
          } else if (this.key !== 'ArrowRight' && this.playerY >= 350) {
            this._ctx.drawImage(
              downLeftMeowth,
              this.playerX + x,
              this.playerY + y,
              50,
              50
            );
          }
        }
      });
    });

    return ['message'];
  }

  public drawDoorNorth() {
    const Door = document.getElementById('door') as HTMLCanvasElement;
    this._ctx.drawImage(Door, 350, 0, 50, 50);
  }
  public drawDoorSouth() {
    const Door = document.getElementById('door') as HTMLCanvasElement;
    this._ctx.drawImage(Door, 350, 700, 50, 50);
  }
  public drawDoorWest() {
    const Door = document.getElementById('door') as HTMLCanvasElement;
    this._ctx.drawImage(Door, 0, 350, 50, 50);
  }
  public drawDoorEast() {
    const Door = document.getElementById('door') as HTMLCanvasElement;
    this._ctx.drawImage(Door, 700, 350, 50, 50);
  }
  public drawBlastoise() {
    const blastoise = ENEMIES[0].attributes;
    const Blastoise = document.getElementById('blastoise') as HTMLCanvasElement;
    this._ctx.drawImage(
      Blastoise,
      blastoise.x,
      blastoise.y,
      blastoise.height,
      blastoise.width
    );
  }
  public drawCharizard() {
    const charizard = ENEMIES[1].attributes;
    const Charizard = document.getElementById('charizard') as HTMLCanvasElement;
    this._ctx.drawImage(
      Charizard,
      charizard.x,
      charizard.y,
      charizard.height,
      charizard.width
    );
  }
  public drawEternatus() {
    const eternatus = ENEMIES[3].attributes;
    const Eternatus = document.getElementById('eternatus') as HTMLCanvasElement;
    this._ctx.drawImage(
      Eternatus,
      eternatus.x,
      eternatus.y,
      eternatus.height,
      eternatus.width
    );
  }
  public drawVenusaur() {
    const venusaur = ENEMIES[2].attributes;
    const Venusaur = document.getElementById('venusaur') as HTMLCanvasElement;
    this._ctx.drawImage(
      Venusaur,
      venusaur.x,
      venusaur.y,
      venusaur.height,
      venusaur.width
    );
  }
  public drawSnorlax() {
    const snorlax = ENEMIES[4].attributes;
    const Snorlax = document.getElementById('snorlax') as HTMLCanvasElement;
    this._ctx.drawImage(
      Snorlax,
      snorlax.x,
      snorlax.y,
      snorlax.height,
      snorlax.width
    );
  }
  public drawCoin(dungeon: number) {
    const Coin = document.getElementById('coin') as HTMLCanvasElement;
    DUNGEONS[dungeon].amulets.forEach((each) => {
      const [x, y] = each;
      this._ctx.drawImage(Coin, x, y, 50, 50);
    });
  }
}

export class KEY {
  static readonly left = 'ArrowLeft';
  static readonly right = 'ArrowRight';
  static readonly up = 'ArrowDown';
  static readonly down = 'ArrowUp';
}
