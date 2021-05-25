import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { BLOCK_SIZE, XBLOCKS, YBLOCKS } from '../game/game-config/settings';

export interface IScreen {
  drawScreen: (dungeon: number) => void;
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
  public gameStarted: boolean = false;
  public gameEnded: boolean = false;

  public screen: IScreen;

  @ViewChild('game', { static: true })
    public set canvas(ele: ElementRef<HTMLCanvasElement>) {
        if (ele) {
            this._initScreen(ele.nativeElement);
        }
    }

    @HostListener('window:keydown', ['$event'])
    async keyEvent(event: KeyboardEvent): Promise<void> {
      this._ctx.clearRect(0, 0, this._ctx.canvas.width, this._ctx.canvas.height);
    }


  

 

  private _initScreen(canvas: HTMLCanvasElement): void {

      this._ctx = canvas.getContext('2d');

      // Here we calculate the size of the game screen using our predefined parameters in game-config/settings.ts
      this._ctx.canvas.height = YBLOCKS * BLOCK_SIZE;
      this._ctx.canvas.width = XBLOCKS * BLOCK_SIZE;

      
  }


//   public drawBoard(dungeon: number): void {
//     if (dungeon === 1) {
       
            
//         }
//       }

  


//   public newGame(): void {
 
//     this.dungeon = 1;
//     this.screen = new Screen(this._ctx);
//     this._ctx.clearRect(0, 0, this._ctx.canvas.width, this._ctx.canvas.height);
//     this.screen.drawScreen(this.dungeon);

// }
 

}


