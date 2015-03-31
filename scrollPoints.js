/*!
ScrollPoints.js - 1.0.16032015
Copyright © 2015 Héctor Álvarez
Licensed under the MIT license.
Link.................
*/



function Point(values){
  this.id=values.id;
  this.next=values.next;
  this.previous=undefined;
  this.onScroll=values.onScroll;
  this.onScrollBackwards=values.onScrollBackwards;
  if(values.offset!=undefined){
    this.offset=values.offset;
  }else{
    this.offset=0;
  }

  this.position=$(this.id).position().top -this.offset;
  this.fadeTime=values.fadeTime;
  this.fadeElements=values.fadeElements;
  this.menuHighlight=values.menuHighlight;
  if(this.fadeElements!=undefined){
    this.hide();
  }
  this.scrolled=false;

};

Point.prototype.scroll=function(){
  var y_scroll_pos = window.pageYOffset;

  if((y_scroll_pos > this.position)&&(!this.scrolled)){
    this.scrolled=true;
    this.onScroll();
    this.fadeIn();
    this.menuEntryIn();
    if(this.hasNext()){
      this.next.recalculate();
      return this.next;
    }
    return this;
  }
  if(this.hasPrevious()&&(y_scroll_pos < this.previous.position)&&(this.previous.scrolled)){
    this.previous.scrolled=false;
    if(this.previous.onScrollBackwards!=undefined){
      this.previous.onScrollBackwards();
      this.previous.fadeOut();
      this.previous.menuEntryOut();
    }

    this.previous.recalculate();

    return this.previous;
  }
  return this;
};

Point.prototype.hasNext=function(){
  return this.next!=undefined;
};

Point.prototype.hasPrevious=function(){
  return this.previous!=undefined;
};

Point.prototype.recalculate=function(){
  this.position = $(this.id).position().top -this.offset;
};

Point.prototype.fadeIn=function(){
  if(this.fadeElements!=undefined){
    var fadeTime = this.fadeTime;
    this.fadeElements.forEach(function(element){
      $(element).fadeIn(fadeTime);
    });
  }
};

Point.prototype.hide=function(){
  if(this.fadeElements!=undefined){
    this.fadeElements.forEach(function(element){
      $(element).hide();
    });
  }
};

Point.prototype.fadeOut=function(){
  if(this.fadeElements!=undefined){
    var fadeTime = this.fadeTime;
    this.fadeElements.forEach(function(element){
      $(element).fadeOut(fadeTime);
    });
  }
};

Point.prototype.menuEntryIn=function(){
  if(this.menuHighlight!=undefined){
    $('.'+this.menuHighlight.class).removeClass(this.menuHighlight.class);
    $(this.menuHighlight.menuEntry).addClass(this.menuHighlight.class);
  }else{
    if(this.hasPrevious()){
      this.previous.menuEntryIn();
    }
  }
};
Point.prototype.menuEntryOut=function(){
  if(this.menuHighlight!=undefined){
    $('.'+this.menuHighlight.class).removeClass(this.menuHighlight.class);
    if(this.hasPrevious()){
      this.previous.menuEntryIn();
    }
  }
};

function ScrollPoints(){
  this.currentPoint = undefined;
  this.lastPoint=undefined
};
ScrollPoints.prototype.addPoint=function(point){
  if(this.currentPoint == undefined){
    this.currentPoint = point;
  }
  if(this.lastPoint!=undefined){
    this.lastPoint.next=point;
  }
  point.previous=this.lastPoint;
  this.lastPoint = point;
};

ScrollPoints.prototype.onScroll=function(){
  if(this.currentPoint!=undefined){
    this.currentPoint=this.currentPoint.scroll();
  }
};
