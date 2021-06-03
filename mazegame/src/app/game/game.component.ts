import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { BLOCK_SIZE, XBLOCKS, YBLOCKS } from '../game/game-config/settings';

export interface IScreen {
  playerX: number;
  playerY: number;
  message: string;
  drawPlayer: (
    dungeon: number,
    key: string
  ) => [message: string, dungeon: number];
  drawScreen: (dungeon: number) => void;
  resetEverything: () => void;
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent {
  constructor() {}

  private _ctx: CanvasRenderingContext2D;
  // public dungeons[]
  public dungeon: number;
  public message: string;
  public gameStart: boolean = false;
  public gameOver: boolean = false;
  public screen: IScreen;
  public wealth: number;

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
      this._keepInside();
      console.log(this.dungeon);
      console.log(this.screen.playerX);
      console.log(this.screen.playerY);
      this._doorCollisionCheck(
        this.dungeon,
        this.screen.playerX,
        this.screen.playerY
      );
      // this._checkEnemyInteraction();

      this._ctx.clearRect(
        0,
        0,
        this._ctx.canvas.width,
        this._ctx.canvas.height
      );
      this.screen.drawScreen(this.dungeon);

      // const interaction = this.screen.drawPlayer(this.dungeon, event.key);

      // // Determine what to do with the collision results
      // if (interaction) {
      //   // If first result sent back from collision is a string, update the info sent to interface
      //   if (typeof interaction[0] === 'string') {
      //     this.message = interaction[0];
      //   }

      //   // Finally, clear the canvas and draw the new canvas after collisions have been added
      //   this._ctx.clearRect(
      //     0,
      //     0,
      //     this._ctx.canvas.width,
      //     this._ctx.canvas.height
      //   );
      // this.screen.drawScreen(this.dungeon);
    }
  }

  private _initScreen(canvas: HTMLCanvasElement): void {
    this._ctx = canvas.getContext('2d');
    // Here we calculate the size of the game screen using our predefined parameters in game-config/settings.ts
    this._ctx.canvas.height = YBLOCKS * BLOCK_SIZE;
    this._ctx.canvas.width = XBLOCKS * BLOCK_SIZE;
  }

  public newGame(): void {
    delete this.screen;
    this.gameOver = false;
    this.dungeon = 1;
    this.wealth = 0;
    this.message = `Welcome to pixel hell`;
    this.gameStart = true;
    this.screen = new Screen(this._ctx);
    this._ctx.clearRect(0, 0, this._ctx.canvas.width, this._ctx.canvas.height);
    this.screen.resetEverything();
    this.screen.drawScreen(this.dungeon);
  }

  public play(): void {
    // Begin a brand new game
    this.gameStart = true;
    this.dungeon = 1;
    this.screen = new Screen(this._ctx);
    this.screen.drawScreen(this.dungeon);

    this.message = `You have woken up in a horrible maze! 
        To escape this room, you must defeat the enemy and retrieve the gold behind the enemy. 
        Choose one of the fighting options infront of you, to battle!`;
  }

  public moves = {
    [KEY.left]: (p: IScreen): void => {
      p.playerX -= 25;
    },
    [KEY.right]: (p: IScreen): void => {
      p.playerX += 25;
    },
    [KEY.up]: (p: IScreen): void => {
      p.playerY += 25;
    },
    [KEY.down]: (p: IScreen): void => {
      p.playerY -= 25;
    },
  };

  private _keepInside(): void {
    this.screen.playerX = Math.max(-5, this.screen.playerX);
    this.screen.playerX = Math.min(580, this.screen.playerX);
    this.screen.playerY = Math.max(-10, this.screen.playerY);
    this.screen.playerY = Math.min(575, this.screen.playerY);
  }

  private _doorCollisionCheck(
    dungeon: number,
    playerX: number,
    playerY: number
  ): number {
    if (dungeon === 1 && playerX === 290 && playerY === -10) {
      this.dungeon = 2;
      this.screen.playerX = 290;
      this.screen.playerY = 575;
    }
    if (dungeon === 1 && playerX === -5 && playerY === 275) {
      this.dungeon = 2;
      this.screen.playerX = 580;
      this.screen.playerY = 275;
    }
    if (dungeon === 1 && playerX === 580 && playerY === 275) {
      this.dungeon = 2;
      this.screen.playerX = -5;
      this.screen.playerY = 275;
    }
    if (dungeon === 2 && playerX === 290 && playerY === -10) {
      this.dungeon = 3;
      this.screen.playerX = 290;
      this.screen.playerY = 575;
    }
    if (dungeon === 2 && playerX === -5 && playerY === 275) {
      this.dungeon = 3;
      this.screen.playerX = 580;
      this.screen.playerY = 275;
    }
    if (dungeon === 2 && playerX === 580 && playerY === 275) {
      this.dungeon = 3;
      this.screen.playerX = -5;
      this.screen.playerY = 275;
    }
    if (dungeon === 2 && playerX === 290 && playerY === 575) {
      this.dungeon = 1;
      this.screen.playerX = 290;
      this.screen.playerY = -10;
    }
    if (dungeon === 3 && playerX === 290 && playerY === -10) {
      this.dungeon = 4;
      this.screen.playerX = 290;
      this.screen.playerY = 575;
    }
    if (dungeon === 3 && playerX === -5 && playerY === 275) {
      this.dungeon = 4;
      this.screen.playerX = 580;
      this.screen.playerY = 275;
    }
    if (dungeon === 3 && playerX === 580 && playerY === 275) {
      this.dungeon = 4;
      this.screen.playerX = -5;
      this.screen.playerY = 275;
    }
    if (dungeon === 3 && playerX === 290 && playerY === 575) {
      this.dungeon = 2;
      this.screen.playerX = 290;
      this.screen.playerY = -10;
    }
    if (dungeon === 4 && playerX === 290 && playerY === -10) {
      this.dungeon = 5;
      this.screen.playerX = 290;
      this.screen.playerY = 575;
    }
    if (dungeon === 4 && playerX === -5 && playerY === 275) {
      this.dungeon = 5;
      this.screen.playerX = 580;
      this.screen.playerY = 275;
    }
    if (dungeon === 4 && playerX === 580 && playerY === 275) {
      this.dungeon = 5;
      this.screen.playerX = -5;
      this.screen.playerY = 275;
    }
    if (dungeon === 4 && playerX === 290 && playerY === 575) {
      this.dungeon = 3;
      this.screen.playerX = 290;
      this.screen.playerY = -10;
    }
    if (dungeon === 5 && playerX === 290 && playerY === -10) {
      this.dungeon = 6;
      this.screen.playerX = 290;
      this.screen.playerY = 575;
    }
    if (dungeon === 5 && playerX === -5 && playerY === 275) {
      this.dungeon = 6;
      this.screen.playerX = 580;
      this.screen.playerY = 275;
    }
    if (dungeon === 5 && playerX === 580 && playerY === 275) {
      this.dungeon = 6;
      this.screen.playerX = -5;
      this.screen.playerY = 275;
    }
    if (dungeon === 5 && playerX === 290 && playerY === 575) {
      this.dungeon = 4;
      this.screen.playerX = 290;
      this.screen.playerY = -10;
    }

    return this.dungeon;
  }

  //   private _checkEnemyInteraction(): boolean {
  //     if (this.dungeon <= 3) {
  //       if (
  //         this.screen.playerX >= 200 &&
  //         this.screen.playerX <= 240 &&
  //         this.screen.playerY >= 0 &&
  //         this.screen.playerY <= 1
  //       ) {
  //         return false;
  //       } else {
  //         return true;
  //       }

  //     }

  //     return true;
  //   }
}

export class Screen implements IScreen {
  public playerX: number;
  public playerY: number;
  public message: string;
  public playerBoundary: number[][];
  public blastoiseBoundary: number[][];
  public charizardBoundary: number[][];
  public eternatusBoundary: number[][];

  constructor(private _ctx: CanvasRenderingContext2D) {
    this._createPlayer();
  }

  public drawScreen(dungeon: number): void {
    if (dungeon === 1) {
      this._ctx.beginPath();
      this._ctx.fillStyle = '#79B9F8';
      this._ctx.fillRect(0, 0, 650, 650);

      this.drawPlayer(1, 'ArrowLeft');

      this.drawBlastoise();
      this.drawDoorNorth();
      this.drawDoorLeft();
      this.drawDoorRight();
      // if (dungeon === 1 && this.playerX === 290 && this.playerY === -10) {
      //   dungeon = 2
      //   this.drawScreen(2);
      // }
      // if (this.playerX === -5 && this.playerY === 275) {
      //   this.drawScreen(3);
      // }
    }
    if (dungeon === 2) {
      this._ctx.beginPath();
      this._ctx.fillStyle = '#F86035';
      this._ctx.fillRect(0, 0, 650, 650);
      // if (this.playerX > this.playerX - 1) {
      //   this.drawPlayer(2, 'ArrowRight');
      // }
      // if (this.playerX < this.playerX - 1) {
      //   this.drawPlayer(2, 'ArrowLeft');
      // }
      this.drawPlayer(2, 'ArrowLeft');
      this.drawCharizard();
      this.drawDoorSouth();
      this.drawDoorNorth();
      this.drawDoorLeft();
      this.drawDoorRight();

      // if (this.playerX === 290 && this.playerY === -10) {

      //   this.drawScreen(3);
      // }
    }

    if (dungeon === 3) {
      this._ctx.beginPath();
      this._ctx.fillStyle = '#535EA7';
      this._ctx.fillRect(0, 0, 650, 650);
      this.drawPlayer(3, 'ArrowLeft');
      // this.drawVenasaur();
      this.drawDoorNorth();
      this.drawDoorSouth();
      this.drawDoorLeft();
      this.drawDoorRight();
    }
    if (dungeon === 4) {
      this._ctx.beginPath();
      this._ctx.fillStyle = '#535EA7';
      this._ctx.fillRect(0, 0, 650, 650);
      this.drawPlayer(3, 'ArrowLeft');
      this.drawEternatus();
      this.drawDoorNorth();
      this.drawDoorSouth();
      this.drawDoorLeft();
      this.drawDoorRight();
    }
    if (dungeon === 3) {
      this._ctx.beginPath();
      this._ctx.fillStyle = '#535EA7';
      this._ctx.fillRect(0, 0, 650, 650);
      this.drawPlayer(3, 'ArrowLeft');
      this.drawEternatus();
      this.drawDoorNorth();
      this.drawDoorSouth();
      this.drawDoorLeft();
      this.drawDoorRight();
    }
  }

  // private _checkInteraction(
  //   dungeon: number
  // ): [message: string, dungeon: number] {
  //   return ['Ouch', 1];
  // }

  public drawPlayer(
    dungeon: number,
    key: string
  ): [message: string, dungeon: number] {
    const rightMeowth = document.getElementById(
      'playerRight'
    ) as HTMLCanvasElement;
    const leftMeowth = document.getElementById(
      'playerLeft'
    ) as HTMLCanvasElement;

    this.playerBoundary.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          // this.x & this.y = position on the board
          // x & y position are the positions of the shape
          if (key === 'ArrowRight') {
            this._ctx.drawImage(
              rightMeowth,
              this.playerX + x,
              this.playerY + y,
              50,
              50
            );
          } else if (key === 'ArrowLeft') {
            this._ctx.drawImage(
              leftMeowth,
              this.playerX + x,
              this.playerY + y,
              50,
              50
            );
          }
        }
      });
    });

    // const interaction = this._checkInteraction(dungeon);

    // return interaction;
    return ['yes', 3];
  }

  public drawBlastoise() {
    const Blastoise = document.getElementById('blastoise') as HTMLCanvasElement;
    this._ctx.drawImage(Blastoise, 240, 200, 150, 150);
  }
  public drawCharizard() {
    const Charizard = document.getElementById('charizard') as HTMLCanvasElement;
    this._ctx.drawImage(Charizard, 240, 200, 150, 150);
  }
  public drawEternatus() {
    const Eternatus = document.getElementById('eternatus') as HTMLCanvasElement;
    this._ctx.drawImage(Eternatus, 240, 200, 150, 150);
  }

  public drawDoorNorth() {
    const Door = document.getElementById('door') as HTMLCanvasElement;
    this._ctx.drawImage(Door, 290, 0, 50, 50);
  }
  public drawDoorSouth() {
    const Door = document.getElementById('door') as HTMLCanvasElement;
    this._ctx.drawImage(Door, 290, 575, 50, 50);
  }

  public drawDoorLeft() {
    const Door = document.getElementById('door') as HTMLCanvasElement;
    this._ctx.drawImage(Door, 0, 280, 50, 50);
  }
  public drawDoorRight() {
    const Door = document.getElementById('door') as HTMLCanvasElement;
    this._ctx.drawImage(Door, 580, 280, 50, 50);
  }

  private _createPlayer() {
    this.playerBoundary = [
      [0, 0, 0],
      [0, 2, 0],
      [0, 0, 0],
    ];

    // Position where the character spawns.

    // BOTTOM LEFT
    // this.playerX = -5;
    // this.playerY = 575;

    //BOTTOM RIGHT
    // this.playerX = 580;
    // this.playerY = 575;

    //TOP RIGHT
    // this.playerX = 580;
    // this.playerY = -10;

    //TOP LEFT
    // this.playerX = -5;
    // this.playerY = -10;

    //CENTER
    this.playerX = 290;
    this.playerY = 575;
  }

  public resetEverything(): void {
    this._createPlayer();
  }

  // private _createBlastoise() {
  //   this.blastoiseBoundary = [
  //     [0, 0, 0],
  //     [0, 2, 0],
  //     [0, 0, 0],
  //   ];
  // }

  // private _createCharizard() {
  //   this.charizardBoundary = [
  //     [0, 0, 0, 0],
  //     [0, 2, 2, 0],
  //     [0, 2, 2, 0],
  //     [0, 0, 0, 0],
  //   ];
  // }
  // private _createEternatus() {
  //   this.eternatusBoundary = [
  //     [0, 0, 0, 0, 0, 0],
  //     [0, 2, 2, 2, 2, 0],
  //     [0, 2, 2, 2, 2, 0],
  //     [0, 2, 2, 2, 2, 0],
  //     [0, 2, 2, 2, 2, 0],
  //     [0, 0, 0, 0, 0, 0],
  //   ];
  // }

  // private _createDoor() {
  //   this.playerBoundary = [
  //     [2, 2],
  //     [2, 2],
  //   ];
  // }
}

export class KEY {
  static readonly left = 'ArrowLeft';
  static readonly right = 'ArrowRight';
  static readonly up = 'ArrowDown';
  static readonly down = 'ArrowUp';
}
