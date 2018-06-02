import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  OnInit,
  OnDestroy,

} from '@angular/core';
import  { Coordinate }  from'../index/Coordinate';
import  { Department }  from'../index/Department';
import  { Main } from'../index/Main';
import  { DatePipe } from '@angular/common';
import  { Observable  } from'rxjs';
import {DepartmentArr}from'../mock/Department';
@Component({
    selector: 'index-root',
    templateUrl: './index.component.html',
    styleUrls: [
      './index.component.scss',
    ],
    providers:[DatePipe],
  })
export class IndexComponent implements OnInit, AfterViewInit, OnDestroy{
  constructor(
    private datePipe: DatePipe,
  ){}
  
  @ViewChild('myCanvas') canvasRef: ElementRef;
  DepartmentArr:Department[]= DepartmentArr;//
  DepartmentList:Department[];
  DepartmentCount:number=this.DepartmentArr.length;
  AllDepartmentConsignee:number=null;
  AllDepartmentOutpiece:number=null;
  AllCount:number=null;
  proportion:number=null;
  main=new Main("温州市龙湾区数据库","1,234,456,78");
  
  items:Department[]=null;//显示的数组
  dateNow: Date = null;
  dateTimer: any = null;
  
  dateStr:string;
  ngOnInit() {
    this.dateNow = new Date();
    this.dateTimer=setInterval(() => {
      this.dateNow = new Date();
    }, 1000);
    this.AllDepartment();
    setInterval(()=>{
      this.AllDepartment()
    },10000);
    this.DepartmentList=DepartmentArr;
    console.log(this.DepartmentList);
    this.items=this.DepartmentList.slice(0,12);
    setInterval(()=>{
      this.GetItmesFromDepartArr()
    },1000);
  }
  //a:商b余
  private  GetItmesFromDepartArr(){
    console.log(this.DepartmentList);
    let a= Math.floor(this.DepartmentList.length/12);
    console.log(a);
    let b=this.DepartmentList.length%12
    if(a==4){
    this.DepartmentList=this.DepartmentList.concat(DepartmentArr);
    }
    this.items=this.DepartmentList.splice(0,12);
  }

  private AllDepartment(){
    let allConsignee=0,allOutpiece=0;
    DepartmentArr.forEach(t=>{
      allConsignee+=t.consignee;
      allOutpiece+=t.Outpiece;
    })
    this.AllDepartmentConsignee=allConsignee;
    this.AllDepartmentOutpiece=allOutpiece;
    this.AllCount=this.AllDepartmentConsignee+this.AllDepartmentOutpiece;
    this.proportion=this.AllDepartmentConsignee/this.AllDepartmentOutpiece;

  }
  ngOnDestroy() {
    clearInterval(this.dateTimer);
    this.dateTimer = null;
  }
   
  //x为椭圆中心横坐标，
  //y为椭圆中心纵坐标，
  //a为椭圆横半轴长，
  //b为椭圆纵半轴长。
private EllipseThree(context:CanvasRenderingContext2D,main:Main, x=475, y=225, a=100, b=10) {
  var ox = 0.5 * a,
  oy = 0.6 * b;
  context.save();
  context.strokeStyle = 'rgb(125,235,243)';
  context.translate(x, y);
  context.beginPath();
  //从椭圆纵轴下端开始逆时针方向绘制
  context.moveTo(-a, 0); 
  context.bezierCurveTo(-a, oy, -ox, b, 0, b);
  context.bezierCurveTo(ox, b, a, oy, a, 0);
  context.bezierCurveTo(a, -oy, ox, -b, 0, -b);
  context.bezierCurveTo(-ox, -b, -a, -oy, -a, 0);

  context.moveTo(-a,0);
  context.lineTo(-a, 100); 
  context.bezierCurveTo(-a, oy+100, -ox, b+100, 0, b+100);
  context.bezierCurveTo(ox, b+100, a, oy+100, a, 100);
  context.lineTo(a, 0)
  context.stroke();
  context.restore();
  context.textAlign="center";
  context.fillStyle = 'white';
  context.fillText(main.title,x,y+50)
  context.fillText(main.Count,x,y+75)
 
}
private drawPic(){
  var canvasEl: HTMLCanvasElement = this.canvasRef.nativeElement;
  canvasEl.width=850;
  canvasEl.height=580;
  var ctx: CanvasRenderingContext2D = canvasEl.getContext('2d');

  this.EllipseThree(ctx,this.main,canvasEl.width/2,(canvasEl.height-120)/2);
  ctx.beginPath();
  ctx.strokeStyle = 'rgb(47,187,208)';
  this.createFirstTen(ctx,canvasEl,this.DepartmentArr); 
  ctx.beginPath();
  ctx.fillStyle="#ffffff00";
  ctx.fillRect(0,0,850,580);
} 

  ngAfterViewInit(){
    this.drawPic();
  };
 
  /*绘制*/
  private _draw_rank(ctx:CanvasRenderingContext2D,CoordinateArr:Array<Coordinate>,department:Department) {
    //获取上下文
    
    for(let i=0;i<CoordinateArr.length;i++){
      let Coordinate=CoordinateArr[i];
      if(i==0){
        ctx.moveTo(Coordinate.x,Coordinate.y);
      }
      else{
        ctx.lineTo(Coordinate.x,Coordinate.y);
      }
    }
    ctx.fillStyle="rgb(30,108,140)";
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
   
    

    ctx.textAlign="center";
    ctx.fillStyle="white";
    ctx.fillText(department.name,CoordinateArr[0].x+32,CoordinateArr[0].y+18)


   
  }
  /*一点绘图 */
  private createCoordinateArr(ctx:CanvasRenderingContext2D,x:number,y:number,department:Department){
    let a=66,b=8,c=4,d=14;
    let coordinateArr: Coordinate[]=[
      new Coordinate(x,y),
      new Coordinate(x+a,y),
      new Coordinate(x+a,y+b),
      new Coordinate(x+a+c,y+b),
      new Coordinate(x+a+c,y+b+d),
      new Coordinate(x+a,y+b+d),
      new Coordinate(x+a,y+2*b+d),
      new Coordinate(x,y+2*b+d),
      new Coordinate(x,y+b+d),
      new Coordinate(x-c,y+b+d),
      new Coordinate(x-c,y+b),
      new Coordinate(x,y+b),
      new Coordinate(x,y),
    ]
    this._draw_rank(ctx,coordinateArr,department);
  }
  /*1~10*/ 
  private createFirstTen(ctx:CanvasRenderingContext2D,canvasEl:HTMLCanvasElement,DepartmentArr:Array<Department>){
    var HalfWidth=canvasEl.width/2;
    var HalfHeight=canvasEl.height/2;
    let nowX=HalfWidth-177;
    let nowY=HalfHeight-184,TwotyY=HalfHeight-200,FourtyY=HalfHeight-216,SixtyY=HalfHeight-200;
    let DepartmentList: Department[];
    

    for(let i in DepartmentArr){
      switch(true){
        case(parseInt(i)<20):
          this.createCoordinateArr(ctx,nowX,nowY,DepartmentArr[i]);
          nowX+=74;
          if((parseInt(i)%2==0&&
                (
                    parseInt(i)<4||(parseInt(i)>9&&parseInt(i)<14)
                )
        )||(
            parseInt(i)%2!=0&&
                (
                    parseInt(i)>4&&parseInt(i)<9||(parseInt(i)>14&&parseInt(i)<19)
                )
        )){
            nowY-=16;
          }
          else{
            nowY+=16;
          }
          if(parseInt(i)==4){
            nowX=HalfWidth-177;
            nowY=HalfHeight-150;
          }
          else if(parseInt(i)==9){
            nowX=HalfWidth-177;
            nowY=HalfHeight+80;
          }
          else if(parseInt(i)==14){
            nowX=HalfWidth-177;
            nowY=HalfHeight+114;
          }
          break;
        case(parseInt(i)<40):
          if(parseInt(i)%2==0){
            this.createCoordinateArr(ctx,HalfWidth-251,TwotyY,DepartmentArr[i]);
          }
          else{
            this.createCoordinateArr(ctx,HalfWidth+193,TwotyY,DepartmentArr[i]);
            TwotyY+=33;
          }break;
        case(parseInt(i)<60):
          if(parseInt(i)%2==0){
            this.createCoordinateArr(ctx,HalfWidth-325,FourtyY,DepartmentArr[i]);
          }
          else{
            this.createCoordinateArr(ctx,HalfWidth+267,FourtyY,DepartmentArr[i]);
            FourtyY+=33;
          }
        break;
        case(parseInt(i)<80):
          if(parseInt(i)%2==0){
            this.createCoordinateArr(ctx,HalfWidth-399,SixtyY,DepartmentArr[i]);
          }
          else{
            this.createCoordinateArr(ctx,HalfWidth+341,SixtyY,DepartmentArr[i]);
            SixtyY+=33;
          }
        break;
      }
    } 
  }
  /*1~20*/
 
}