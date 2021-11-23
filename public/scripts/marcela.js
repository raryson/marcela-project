var targetsOrigin=[];
var targets=[];
var ps=[];
var colors=['#FFD568','#FFF2D1','#FFC8C3','#FF766D','#91E3FF','#D8F5FF'];

function setup() {
  var cnv=createCanvas(800,400);
  cnv.parent('artboard');
  background(200);
  textFont('Courier', 100);
  textStyle(BOLD);
  var str2='Eu te amo';
  var strWidth2=textWidth(str2);
  text(str2, (width-strWidth2)/2, 300);
  textSize(200);
  var str1='Marcela';
  var strWidth1=textWidth(str1);
  text(str1, (width-strWidth1)/2, 200);

  // var step=floor(random(2,8));
  for (var x=0;x<width;x+=4){
    for(var y=0;y<height;y+=floor(random(2,10))){
      var c=get(x,y);
      if(c[0]==0) {
        var pt=createVector(x,y);
        targetsOrigin.push(pt);
      }
    }
  }

  // drawing settings
  noStroke();
  // for(var i=0;i<1000;i++){
  //   var r=random(4);
  //   if(r<1){
  //     var start=createVector(0,random(height));
  //   }else if(r<2){
  //     var start=createVector(random(width),0);
  //   }else if(r<3){
  //     var start=createVector(random(width),height);
  //   }else {
  //     var start=createVector(width,random(height));
  //   }
  //   var t=random(targets);
  //   ps.push(new Particle(start,t));
  //   targets.splice(targets.indexOf(t),1);
  // }
  targets=targetsOrigin.slice();

}

function draw() {
  background(0);
  if(ps.length<targetsOrigin.length-20){
    for(var i=0;i<20;i++){
      var r=random(4);
      if(r<1){
        var start=createVector(0,random(height));
      }else if(r<2){
        var start=createVector(random(width),0);
      }else if(r<3){
        var start=createVector(random(width),height);
      }else {
        var start=createVector(width,random(height));
      }
      var t=random(targets);
      ps.push(new Particle(start,t));
      targets.splice(targets.indexOf(t),1);
    }
  }

  ps.forEach(function(e){
    e.applyForce();
    e.update();
    e.render();
  })
}

var Particle=function(pos,trg){
  this.pos = pos.copy();
  this.trg = trg.copy();
  this.velocity = createVector(0,0);
  this.acc = createVector(0,0);
  this.c=random(colors);

  this.applyForce = function(){
    var mouse=createVector(mouseX,mouseY);
    this.acc=p5.Vector.sub(this.pos,mouse);
    var length=this.acc.mag();
    this.acc.setMag(800/length);
  }

  this.update = function(){
    this.velocity = p5.Vector.sub(this.trg,this.pos);
    this.velocity.add(this.acc);
    this.velocity.mult(.1);
    this.velocity.limit(10);
    this.pos.add(this.velocity);
  }

  this.render = function() {
    fill(this.c);
    ellipse(this.pos.x, this.pos.y, 5);
  }
}

function mouseClicked(){
  ps=[];
  targets=targetsOrigin.slice();
}