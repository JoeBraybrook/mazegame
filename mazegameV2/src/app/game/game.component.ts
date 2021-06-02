import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { BLOCK_SIZE, XAXIS, YAXIS } from './game-config/settings';

export interface IScreen {
  playerX: number;
  playerY: number;
  drawPlayer: (
    dungeon: number,
    key: string
  ) => [message: string, dungeon: number];
  drawScreen: (dungeon: number) => void;
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

  private _doorCollisionCheck(
    dungeon: number,
    playerX: number,
    playerY: number
  ): number {
    // North door
    if (dungeon === 1 && playerX === 350 && playerY === 0) {
      this.dungeon = 4;
      this.screen.playerX = 350;
      this.screen.playerY = 650;
    }
    // Left Door
    if (dungeon === 1 && playerX === 0 && playerY === 350) {
      this.dungeon = 2;
      this.screen.playerX = 650;
      this.screen.playerY = 350;
    }
    // Right Door
    if (dungeon === 1 && playerX === 700 && playerY === 350) {
      this.dungeon = 3;
      this.screen.playerX = 50;
      this.screen.playerY = 350;
    }
    // Dungeon 2
    // Right Door
    if (dungeon === 2 && playerX === 700 && playerY === 350) {
      this.dungeon = 1;
      this.screen.playerX = 50;
      this.screen.playerY = 350;
    }

    // Dungeon 3
    // Left Door
    if (dungeon === 3 && playerX === 0 && playerY === 350) {
      this.dungeon = 1;
      this.screen.playerX = 650;
      this.screen.playerY = 350;
    }

    // Dungeon 4
    if (dungeon === 4 && playerX === 350 && playerY === 0) {
      this.dungeon = 7;
      this.screen.playerX = 350;
      this.screen.playerY = 650;
    }
    // Left Door
    if (dungeon === 4 && playerX === 0 && playerY === 350) {
      this.dungeon = 5;
      this.screen.playerX = 650;
      this.screen.playerY = 350;
    }
    // Right Door
    if (dungeon === 4 && playerX === 700 && playerY === 350) {
      this.dungeon = 6;
      this.screen.playerX = 50;
      this.screen.playerY = 350;
    }
    // South Door
    if (dungeon === 4 && playerX === 350 && playerY === 700) {
      this.dungeon = 1;
      this.screen.playerX = 350;
      this.screen.playerY = 50;
    }

    // Dungeon 5
    // Right Door
    if (dungeon === 5 && playerX === 700 && playerY === 350) {
      this.dungeon = 4;
      this.screen.playerX = 50;
      this.screen.playerY = 350;
    }

    // Dungeon 6
    // Left Door
    if (dungeon === 6 && playerX === 0 && playerY === 350) {
      this.dungeon = 4;
      this.screen.playerX = 650;
      this.screen.playerY = 350;
    }

    // Dungeon 7
    //North Door
    if (dungeon === 7 && playerX === 350 && playerY === 0) {
      this.dungeon = 10;
      this.screen.playerX = 350;
      this.screen.playerY = 650;
    }
    // Left Door
    if (dungeon === 7 && playerX === 0 && playerY === 350) {
      this.dungeon = 8;
      this.screen.playerX = 650;
      this.screen.playerY = 350;
    }
    // Right Door
    if (dungeon === 7 && playerX === 700 && playerY === 350) {
      this.dungeon = 9;
      this.screen.playerX = 50;
      this.screen.playerY = 350;
    }
    // South Door
    if (dungeon === 7 && playerX === 350 && playerY === 700) {
      this.dungeon = 4;
      this.screen.playerX = 350;
      this.screen.playerY = 50;
    }

    // Dungeon 8
    // Right Door
    if (dungeon === 8 && playerX === 700 && playerY === 350) {
      this.dungeon = 7;
      this.screen.playerX = 50;
      this.screen.playerY = 350;
    }

    // Dungeon 9
    // Left Door
    if (dungeon === 9 && playerX === 0 && playerY === 350) {
      this.dungeon = 7;
      this.screen.playerX = 650;
      this.screen.playerY = 350;
    }

    // Dungeon 10
    //North Door
    if (dungeon === 10 && playerX === 350 && playerY === 0) {
      this.dungeon = 13;
      this.screen.playerX = 350;
      this.screen.playerY = 650;
    }
    // Left Door
    if (dungeon === 10 && playerX === 0 && playerY === 350) {
      this.dungeon = 11;
      this.screen.playerX = 650;
      this.screen.playerY = 350;
    }
    // Right Door
    if (dungeon === 10 && playerX === 700 && playerY === 350) {
      this.dungeon = 12;
      this.screen.playerX = 50;
      this.screen.playerY = 350;
    }
    // South Door
    if (dungeon === 10 && playerX === 350 && playerY === 700) {
      this.dungeon = 7;
      this.screen.playerX = 350;
      this.screen.playerY = 50;
    }

    // Dungeon 8
    // Right Door
    if (dungeon === 11 && playerX === 700 && playerY === 350) {
      this.dungeon = 10;
      this.screen.playerX = 50;
      this.screen.playerY = 350;
    }

    // Dungeon 9
    // Left Door
    if (dungeon === 12 && playerX === 0 && playerY === 350) {
      this.dungeon = 10;
      this.screen.playerX = 650;
      this.screen.playerY = 350;
    }
    // Dungeon 9
    // South Door
    if (dungeon === 13 && playerX === 350 && playerY === 700) {
      this.dungeon = 10;
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
    this.dungeon = 1;
    this.screen = new Screen(this._ctx);
    this.screen.drawScreen(this.dungeon);
  }

  public reset(): void {
    delete this.screen;
    this.gameOver = false;
    this.dungeon = 1;
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
  constructor(private _ctx: CanvasRenderingContext2D) {
    this._createPlayer();
  }

  public drawScreen(dungeon: number): void {
    if (dungeon === 1) {
      this._ctx.beginPath();
      this._ctx.fillStyle = '#1abc9c';
      this._ctx.fillRect(0, 0, 750, 750);
      this.drawPlayer(1, this.key);
      this.drawDoorNorth();
      this.drawDoorLeft();
      this.drawDoorRight();
    }
    if (dungeon === 2) {
      this._ctx.beginPath();
      this._ctx.fillStyle = '#f1c40f';
      this._ctx.fillRect(0, 0, 750, 750);
      this.drawPlayer(2, this.key);
      this.drawDoorRight();
    }
    if (dungeon === 3) {
      this._ctx.beginPath();
      this._ctx.fillStyle = '#2ecc71';
      this._ctx.fillRect(0, 0, 750, 750);
      this.drawPlayer(3, this.key);
      this.drawDoorLeft();
      this.drawCoin();
    }
    if (dungeon === 4) {
      this._ctx.beginPath();
      this._ctx.fillStyle = '#e67e22';
      this._ctx.fillRect(0, 0, 750, 750);
      this.drawPlayer(4, this.key);
      this.drawDoorNorth();
      this.drawDoorLeft();
      this.drawDoorRight();
      this.drawDoorSouth();
      this.drawSnorlax();
    }
    if (dungeon === 5) {
      this._ctx.beginPath();
      var lava = new Image(50, 50);

      lava.src =
        'https://forum.gdevelop-app.com/uploads/default/original/2X/e/e6ee4168ca0463917e3651bd4bb7a0e090636d32.gif';

      var ptrn = this._ctx.createPattern(lava, 'repeat');
      this._ctx.fillStyle = ptrn;

      this._ctx.fillRect(0, 0, 750, 750);
      this.drawPlayer(5, this.key);
      this.drawDoorRight();
    }
    if (dungeon === 6) {
      this._ctx.beginPath();
      this._ctx.fillStyle = '#e74c3c';
      this._ctx.fillRect(0, 0, 750, 750);
      this.drawPlayer(6, this.key);
      this.drawDoorLeft();
    }

    if (dungeon === 7) {
      this._ctx.beginPath();
      this._ctx.fillStyle = '#9b59b6';
      this._ctx.fillRect(0, 0, 750, 750);
      this.drawPlayer(7, this.key);
      this.drawDoorNorth();
      this.drawDoorLeft();
      this.drawDoorRight();
      this.drawDoorSouth();
      this.drawEternatus();
    }
    if (dungeon === 8) {
      this._ctx.beginPath();
      this._ctx.fillStyle = '#ecf0f1';
      this._ctx.fillRect(0, 0, 750, 750);
      this.drawPlayer(8, this.key);
      this.drawDoorRight();
    }
    if (dungeon === 9) {
      this._ctx.beginPath();
      this._ctx.fillStyle = '#34495e';
      this._ctx.fillRect(0, 0, 750, 750);
      this.drawPlayer(9, this.key);
      this.drawDoorLeft();
    }

    if (dungeon === 10) {
      this._ctx.beginPath();
      this._ctx.fillStyle = '#F79F1F';
      this._ctx.fillRect(0, 0, 750, 750);
      this.drawPlayer(10, this.key);
      this.drawDoorNorth();
      this.drawDoorLeft();
      this.drawDoorRight();
      this.drawDoorSouth();
    }
    if (dungeon === 11) {
      this._ctx.beginPath();
      this._ctx.fillStyle = '#0652DD';
      this._ctx.fillRect(0, 0, 750, 750);
      this.drawPlayer(11, this.key);
      this.drawDoorRight();
      this.drawBlastoise();
    }
    if (dungeon === 12) {
      this._ctx.beginPath();
      this._ctx.fillStyle = '#EA2027';
      this._ctx.fillRect(0, 0, 750, 750);
      this.drawPlayer(12, this.key);
      this.drawDoorLeft();
      this.drawCharizard();
    }
    if (dungeon === 13) {
      this._ctx.beginPath();
      this._ctx.fillStyle = '#009432';
      this._ctx.fillRect(0, 0, 750, 750);
      this.drawPlayer(13, this.key);
      this.drawDoorSouth();
      this.drawVenusaur();
    }
  }
  // Here wew define the parameters and actions for each room in an if statement separated by the dungeons number

  private _createPlayer() {
    this.playerBoundary = [
      [0, 0, 0],
      [0, 2, 0],
      [0, 0, 0],
    ];

    this.playerX = 350;
    this.playerY = 600;
  }

  public drawPlayer(
    dungeon: number,
    key: string
  ): [message: string, dungeon: number] {
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

    return ['message', dungeon];
  }

  public drawDoorNorth() {
    const Door = document.getElementById('door') as HTMLCanvasElement;
    this._ctx.drawImage(Door, 350, 0, 50, 50);
  }
  public drawDoorSouth() {
    const Door = document.getElementById('door') as HTMLCanvasElement;
    this._ctx.drawImage(Door, 350, 700, 50, 50);
  }
  public drawDoorLeft() {
    const Door = document.getElementById('door') as HTMLCanvasElement;
    this._ctx.drawImage(Door, 0, 350, 50, 50);
  }
  public drawDoorRight() {
    const Door = document.getElementById('door') as HTMLCanvasElement;
    this._ctx.drawImage(Door, 700, 350, 50, 50);
  }
  public drawBlastoise() {
    const Blastoise = document.getElementById('blastoise') as HTMLCanvasElement;
    this._ctx.drawImage(Blastoise, 200, 0, 600, 600);
  }
  public drawCharizard() {
    const Charizard = document.getElementById('charizard') as HTMLCanvasElement;
    this._ctx.drawImage(Charizard, 200, 0, 600, 600);
  }
  public drawEternatus() {
    const Eternatus = document.getElementById('eternatus') as HTMLCanvasElement;
    this._ctx.drawImage(Eternatus, 100, 50, 450, 450);
  }
  public drawVenusaur() {
    const Venusaur = document.getElementById('venusaur') as HTMLCanvasElement;
    this._ctx.drawImage(Venusaur, 350, 350, 200, 200);
  }
  public drawSnorlax() {
    const Snorlax = document.getElementById('snorlax') as HTMLCanvasElement;
    this._ctx.drawImage(Snorlax, 0, 50, 250, 250);
    this._ctx.drawImage(Snorlax, 250, 50, 250, 250);
    this._ctx.drawImage(Snorlax, 500, 50, 250, 250);
  }
  public drawCoin() {
    const Coin = document.getElementById('coin') as HTMLCanvasElement;
    this._ctx.drawImage(Coin, 350, 350, 50, 50);
  }
}

export class KEY {
  static readonly left = 'ArrowLeft';
  static readonly right = 'ArrowRight';
  static readonly up = 'ArrowDown';
  static readonly down = 'ArrowUp';
}
