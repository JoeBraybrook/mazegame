import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { BLOCK_SIZE, XBLOCKS, YBLOCKS } from '../game/game-config/settings';

export interface IScreen {
  playerX: number;
  playerY: number;
  message:string;
  drawPlayer:(dungeon: number, key: string) => [message:string, dungeon: number];
  drawScreen: (dungeon: number) => void;
  resetEverything: () => void;
  move: (p: IScreen) => void;
}


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})




export class GameComponent {

  constructor(){}

private _ctx: CanvasRenderingContext2D
  public dungeon: number;
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
      const p = this.moves[event.key](this.screen);
      const inside = await this._keepInside(p);
 
      if (inside) {
        this.screen.move(p);
      }

      this._ctx.clearRect(0, 0, this._ctx.canvas.width, this._ctx.canvas.height);
      this.screen.drawScreen(this.dungeon);

      const interaction = this.screen.drawPlayer(this.dungeon, event.key);

            // Determine what to do with the collision results
            if (interaction) {
                // If first result sent back from collision is a string, update the info sent to interface
                if (typeof interaction[0] === 'string') {
                    this.message = interaction[0];
                }

                

                // Finally, clear the canvas and draw the new canvas after collisions have been added
                this._ctx.clearRect(0, 0, this._ctx.canvas.width, this._ctx.canvas.height);
                this.screen.drawScreen(this.dungeon);
                this.screen.drawPlayer(this.dungeon, event.key);
            }

          


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
    this.message = `Welcome to pixel hell`;
    this.gameStart= true;
    this.screen = new Screen(this._ctx);
    this._ctx.clearRect(0, 0, this._ctx.canvas.width, this._ctx.canvas.height);
    this.screen.resetEverything();
    this.screen.drawScreen(this.dungeon);
    this.screen.drawPlayer(this.dungeon, 'ArrowRight');
    

  }

  public moves = {
  [KEY.left]: (p: IScreen): IScreen => ({ ...p, playerX: p.playerX - 1 }),
  [KEY.right]: (p: IScreen): IScreen => ({ ...p, playerX: p.playerX + 1 }),
  [KEY.up]: (p: IScreen): IScreen => ({ ...p, playerY: p.playerY + 1 }),
  [KEY.down]: (p: IScreen): IScreen => ({ ...p, playerY: p.playerY - 1 })
  };

  private _keepInside(piece): boolean {
  if (piece.playerX >= 580 || piece.playerY >= -580 || piece.playerX <= -5 || piece.playerY <= -10) {
      return false;
  } else {
      return true;
  }
  }

  }


export class Screen implements IScreen {

  public playerX: number;
  public playerY: number;
  public message: string;
  public playerBoundary: number[][];


  constructor(private _ctx: CanvasRenderingContext2D) {
    this._createPlayer();
}

public move(p: IScreen): void {
  this.playerX = p.playerX;
  this.playerY = p.playerY;
}

public drawScreen(dungeon: number): void {
  // if(dungeon === 1){
  //   this._ctx.clearRect(0, 0, this._ctx.canvas.width, this._ctx.canvas.height);
  //   // Draw the new board.
  //   console.log('drawScreen');
  // }
}



private _checkInteraction(dungeon: number): [message:string, dungeon: number] {


  return ['Ouch', 1];
}



public drawPlayer(dungeon: number, key: string): [message:string, dungeon: number] {
  
  const rightMeowth = document.getElementById('playerRight') as HTMLCanvasElement;
  const leftMeowth = document.getElementById('playerLeft') as HTMLCanvasElement;

  this.playerBoundary.forEach((row, y) => {
      row.forEach((value, x) => {
          if (value > 0) {
              // this.x & this.y = position on the board
              // x & y position are the positions of the shape
              if (key === 'ArrowRight' || key === 'ArrowUp') {
                  this._ctx.drawImage(rightMeowth, this.playerX + x, this.playerY + y, 50, 50);
              } else if (key === 'ArrowLeft' || key === 'ArrowDown') {
                  this._ctx.drawImage(leftMeowth, this.playerX + x, this.playerY + y, 50, 50);
              }
          }
      });
      console.log(this.playerBoundary, 'this.playerBoundary');
      console.log(this.playerX, 'this.playerX');
      console.log(this.playerY, 'this.playerY');
  }

  
  
  
  );

  const interaction = this._checkInteraction(dungeon);

  return interaction;
}
private _createPlayer() {
  this.playerBoundary = [
      [0, 0, 0],
      [0, 2, 0],
      [0, 0, 0]
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
  this.playerY = 290;
}

public resetEverything(): void {
  this._createPlayer();
}




}


export class KEY {
    static readonly left = 'ArrowLeft';
    static readonly right = 'ArrowRight';
    static readonly up = 'ArrowDown';
    static readonly down = 'ArrowUp';
}




