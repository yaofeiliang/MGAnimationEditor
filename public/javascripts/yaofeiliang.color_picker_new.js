class ColorControl{
  constructor(that,attr,isnodeattr,isstroke,isshadow){
    console.dir(attr)
    this.isnodeattr=isnodeattr;
    this.isstroke=isstroke;
    this.isshadow=isshadow;
    this.that=that;
    this.attr=attr;
    this.width = that.layer.canvas._canvas.width*0.8;
    this.height = 176;
    this.topheight=66;

    this.view();
    /*
    *
    *
    * var path = new Path.Circle({
	center: [50, 50],
	radius: 30,
	strokeColor: 'black'
});
raster.on('load', function() {
	// Downsize the pixel content to 80 pixels wide and 60 pixels high:
	raster.size = new Size(80, 60);
	path.fitBounds(raster.bounds);
	var sub = raster.getSubRaster(path);
	console.dir(sub)
	sub.bringToFront();
	var subData = sub.toDataURL();
         sub.remove();
});
    * */
  };
  parentrefreshSize(){
    let that =this.that;
    if(!this.isnodeattr){
      that.parent.centre_canvas.refreshSize();
    }else{
      if(this.isshadow){
        this.isnodeattr.shadowColor = this.attr.data.sc;
        this.isnodeattr.shadowBlur= this.attr.shadowBlur;
        this.isnodeattr.shadowOffset= new paper.Point(Number( this.attr.shadowOffset.x), Number( this.attr.shadowOffset.y));
      }else if(this.isstroke){
        if(this.attr.typeid==1){
          this.isnodeattr.strokeColor={
            gradient:{
              stops:
                [this.attr.data.sc, this.attr.data.ec]
            },
            origin: [
              that.parent.head_canvas.attr.project.size.width*this.attr.data.sw,
              that.parent.head_canvas.attr.project.size.height*this.attr.data.sh
            ],
            destination: [
              that.parent.head_canvas.attr.project.size.width*this.attr.data.ew,
              that.parent.head_canvas.attr.project.size.height*this.attr.data.eh
            ]
          };
        }else if(this.attr.typeid==0){
          this.isnodeattr.strokeColor = this.attr.data.sc;
        }else if(this.attr.typeid==2){
          this.isnodeattr.strokeColor={
            gradient:{
              stops:
                [
                  [this.attr.data.sc,this.attr.data.sr],
                  [this.attr.data.ec,this.attr.data.er]
                ],
              radial: true
            },
            origin: [
              that.parent.head_canvas.attr.project.size.width*this.attr.data.sw,
              that.parent.head_canvas.attr.project.size.height*this.attr.data.sh
            ],
            destination: [
              that.parent.head_canvas.attr.project.size.width*this.attr.data.ew,
              that.parent.head_canvas.attr.project.size.height*this.attr.data.eh
            ]
          };
        }
      }else{
        if(this.attr.typeid==1){
          this.isnodeattr.fillColor={
            gradient:{
              stops:
                [this.attr.data.sc, this.attr.data.ec]
            },
            origin: [
              that.parent.head_canvas.attr.project.size.width*this.attr.data.sw,
              that.parent.head_canvas.attr.project.size.height*this.attr.data.sh
            ],
            destination: [
              that.parent.head_canvas.attr.project.size.width*this.attr.data.ew,
              that.parent.head_canvas.attr.project.size.height*this.attr.data.eh
            ]
          };
        }else if(this.attr.typeid==0){
          this.isnodeattr.fillColor = this.attr.data.sc;
        }else if(this.attr.typeid==2){
          this.isnodeattr.fillColor={
            gradient:{
              stops:
                [
                  [this.attr.data.sc,this.attr.data.sr],
                  [this.attr.data.ec,this.attr.data.er]
                ],
              radial: true
            },
            origin: [
              that.parent.head_canvas.attr.project.size.width*this.attr.data.sw,
              that.parent.head_canvas.attr.project.size.height*this.attr.data.sh
            ],
            destination: [
              that.parent.head_canvas.attr.project.size.width*this.attr.data.ew,
              that.parent.head_canvas.attr.project.size.height*this.attr.data.eh
            ]
          };
        }
      }

    }
  }

  view(){
    let self= this;
    self.but_view();
    self.type_view();

    //self.that.layer.batchDraw();
  }
  but_view(){
    let temp_this=this;
    let that =this.that;
    that.layer.destroyChildren();
    that.layer.batchDraw();
    let butontext='  返回   ';
    let projectname='  背景色   ';
    var labelback = new Konva.Label({
      x: 2,
      y: 15,
      width: 76,
      height:26,
      draggable: true
    });
    labelback.add(new Konva.Tag({
      fill: '#338cfc',
      stroke: '#338cfc',
      strokeWidth: 0.3,
      shadowColor: '#338cfc',
      shadowBlur: 15,
      shadowOffset: [2.5, 2.5],
      shadowOpacity: 0.2,
      lineJoin: 'round',
      pointerDirection: 'left',
      pointerWidth: 15,
      pointerHeight: 24,
      cornerRadius: 1
    }));
    let text = new Konva.Text({
      text: butontext,
      fontSize: 12,
      lineHeight: 2,
      fontFamily: 'Calibri',
      padding: 0,
      fill: '#f7f7f7'
    });
    text.align('center');
    labelback.add(text);
    that.layer.add( labelback );
    let text_name = new Konva.Text({
      text: projectname,
      fontSize: 12,
      lineHeight: 2,
      fontFamily: 'Calibri',
      padding: 0,
      fill: '#808080',
      x: that.width/2,
      y: 4,
    });
    that.layer.add( text_name );
    let line = new Konva.Line({
      points: [0, 30, that.width,30],
      stroke: '#bcbcbc',
      strokeWidth: 1,
      opacity: 0.5
    });
    that.layer.add( line );
    labelback.on('click', function (e) {

      if(!temp_this.isnodeattr){
        that.signal(that);
      }else{
        that.configAttrview(temp_this.isnodeattr);
      }

    });
  }
  type_view(){
    let self= this;
    let that =this.that;
    var label_projet_access_public= new Konva.Group({
      x: 40,
      y: 34,
      width: 50,
      height:24,
      //draggable: true,

    });
    label_projet_access_public.add(new Konva.Rect({
      x:0,
      y:0,
      width: 50,
      height: 24,
      fill: '#e6e6e6',
      stroke: '#808080',
      strokeWidth:0.8,
      cornerRadius: 3
    }));
    let text_projet_access_public = new Konva.Text({
      text: '正常颜色',
      fontSize: 12,
      lineHeight: 2,
      fontFamily: 'Calibri',
      padding: 0,
      fill: '#808080'
      //fill: '#f7f7f7'
    });
    text_projet_access_public.align('center');
    label_projet_access_public.add(text_projet_access_public);

    label_projet_access_public.addName('color_type0');
    //====color_type1
    var label_projet_access_unlisted= new Konva.Group({
      x: 100,
      y: 34,
      width: 50,
      height:24,
      //draggable: true,

    });
    label_projet_access_unlisted.add(new Konva.Rect({
      x:0,
      y:0,
      width: 50,
      height: 24,
      fill: '#e6e6e6',
      stroke: '#808080',
      strokeWidth:0.8,
      cornerRadius: 3
    }));

    let text_projet_access_unlisted = new Konva.Text({
      text: '线性渐变',
      fontSize: 12,
      lineHeight: 2,
      fontFamily: 'Calibri',
      padding: 0,
      fill: '#808080'
      //fill: '#f7f7f7'
    });
    text_projet_access_unlisted.align('center');
    label_projet_access_unlisted.add(text_projet_access_unlisted);

    label_projet_access_unlisted.addName('color_type1');
    //====color_type2
    var label_projet_access_private= new Konva.Group({
      x: 160,
      y: 34,
      width: 50,
      height:24,
      //draggable: true,

    });
    label_projet_access_private.add(new Konva.Rect({
      x:0,
      y:0,
      width: 50,
      height: 24,
      fill: '#e6e6e6',
      stroke: '#808080',
      strokeWidth:0.8,
      cornerRadius: 3
    }));
    let text_projet_access_private = new Konva.Text({
      text: '环形渐变',
      fontSize: 12,
      lineHeight: 2,
      fontFamily: 'Calibri',
      padding: 0,
      fill: '#808080'
      //fill: '#f7f7f7'
    });
    text_projet_access_private.align('center');
    label_projet_access_private.add(text_projet_access_private);

    label_projet_access_private.addName('color_type2');
    //======
    //======
    var color_type0_fun=function (e) {
      let public_label = that.layer.find('.color_type0')[0];
      let public_rect_temp = public_label.find('Rect')[0];
      public_rect_temp.attrs.fill='#707070';
      let public_Text_temp = public_label.find('Text')[0];
      public_Text_temp.attrs.fill='#ebebeb';


      let unlisted_label = that.layer.find('.color_type1')[0];
      let unlisted_rect_temp = unlisted_label.find('Rect')[0];
      unlisted_rect_temp.attrs.fill='#e6e6e6';
      let unlisted_Text_temp = unlisted_label.find('Text')[0];
      unlisted_Text_temp.attrs.fill="#808080";

      let private_label = that.layer.find('.color_type2')[0];
      let private_rect_temp = private_label.find('Rect')[0];
      private_rect_temp.attrs.fill='#e6e6e6';
      let private_Text_temp = private_label.find('Text')[0];
      private_Text_temp.attrs.fill="#808080";

      self.attr.typeid=0;
      self.type_attr_view()


    };

    var color_type1_fun = function (e) {

      let public_label = that.layer.find('.color_type0')[0];
      let public_rect_temp = public_label.find('Rect')[0];
      public_rect_temp.attrs.fill='#e6e6e6';
      let public_Text_temp = public_label.find('Text')[0];
      public_Text_temp.attrs.fill='#808080';


      let unlisted_label = that.layer.find('.color_type1')[0];
      let unlisted_rect_temp = unlisted_label.find('Rect')[0];
      unlisted_rect_temp.attrs.fill='#707070';
      let unlisted_Text_temp = unlisted_label.find('Text')[0];
      unlisted_Text_temp.attrs.fill="#ebebeb";

      let private_label = that.layer.find('.color_type2')[0];
      let private_rect_temp = private_label.find('Rect')[0];
      private_rect_temp.attrs.fill='#e6e6e6';
      let private_Text_temp = private_label.find('Text')[0];
      private_Text_temp.attrs.fill="#808080";
      self.attr.typeid=1;
      self.type_attr_view()

    };

    var color_type2_fun= function (e) {
      console.dir('color_type2_fun');
      let public_label = that.layer.find('.color_type0')[0];
      let public_rect_temp = public_label.find('Rect')[0];
      public_rect_temp.attrs.fill='#e6e6e6';
      let public_Text_temp = public_label.find('Text')[0];
      public_Text_temp.attrs.fill='#808080';


      let unlisted_label = that.layer.find('.color_type1')[0];
      let unlisted_rect_temp = unlisted_label.find('Rect')[0];
      unlisted_rect_temp.attrs.fill='#e6e6e6';
      let unlisted_Text_temp = unlisted_label.find('Text')[0];
      unlisted_Text_temp.attrs.fill="#808080";

      let private_label = that.layer.find('.color_type2')[0];
      let private_rect_temp = private_label.find('Rect')[0];
      private_rect_temp.attrs.fill='#707070';
      let private_Text_temp = private_label.find('Text')[0];
      private_Text_temp.attrs.fill="#ebebeb";
      self.attr.typeid=2;
      self.type_attr_view()

    };
    console.dir(self.attr.typeid);
    label_projet_access_public.on( 'click', color_type0_fun);
    label_projet_access_unlisted.on('click',color_type1_fun);
    label_projet_access_private.on('click',color_type2_fun);

    that.layer.add( label_projet_access_private );
    that.layer.add( label_projet_access_unlisted );
    that.layer.add( label_projet_access_public );

    console.dir(label_projet_access_unlisted)
    console.dir(label_projet_access_private)
    switch (self.attr.typeid) {
      case 0:
        color_type0_fun();
        break;
      case 1:
        color_type1_fun();
        break;
      case 2:
        color_type2_fun();
        break;
    }


    //========================================================

  }
  control_0(){
    let self= this;
    let that =this.that;
    that.layer.find('.displayColorGroup')[0]?that.layer.find('.displayColorGroup')[0].destroy():'';
    that.layer.find('.startColorRect')[0]?that.layer.find('.startColorRect')[0].destroy():'';
    that.layer.find('.endColorRect')[0]?that.layer.find('.endColorRect')[0].destroy():'';
    that.layer.find('.controlColorGroup')[0]?that.layer.find('.controlColorGroup')[0].destroy():'';

    var displayColorGroup= new Konva.Group({
      x: 232-25,
      y: 246,
      width: 25,
      height:25,
      //draggable: true,
    });
    displayColorGroup.add(new Konva.Rect({
      x:0,
      y:0,
      width: 25,
      height: 25,
      fill: '#e6e6e6',
      stroke: '#808080',
      strokeWidth:0.8,
      cornerRadius: 3
    }));
    var displayColorShape = new Konva.Shape({
      x: 0,
      y: 0,
      //fill: 'red',
      // a Konva.Canvas renderer is passed into the sceneFunc function
      sceneFunc (context, shape) {
        if(self.attr.typeid==0){
          context.fillStyle=self.attr.data.sc;
        }else if(self.attr.typeid==1){
          var gradientBar = context.createLinearGradient(
            25*self.attr.data.sw,
            25*self.attr.data.sh,
            25*self.attr.data.ew,
            25*self.attr.data.eh
          );
          gradientBar.addColorStop(0, self.attr.data.sc);
          gradientBar.addColorStop(1, self.attr.data.ec);
          context.fillStyle = gradientBar;
        }else if(self.attr.typeid==2){
          var gradientBar = context.createRadialGradient(
            25*self.attr.data.sw,
            25*self.attr.data.sh,
            25*self.attr.data.sr,
            25*self.attr.data.ew,
            25*self.attr.data.eh,
            25*self.attr.data.er,
          );
          gradientBar.addColorStop(0, self.attr.data.sc);
          gradientBar.addColorStop(1, self.attr.data.ec);
          context.fillStyle = gradientBar;
        }

        context.fillRect(0, 0, 25, 25);
        context.strokeStyle="#808080";
        context.lineWidth=1;
        context.strokeRect(0, 0, 25, 25);
        context.fillStrokeShape(shape);
      }
    });
    displayColorGroup.add(displayColorShape);
    that.layer.add( displayColorGroup );
    displayColorGroup.addName('displayColorGroup');

    if(self.attr.typeid==1||self.attr.typeid==2){
      //开始颜色
      let startColorRect = new Konva.Rect({
        x: 30,
        y: 246,
        width: 25,
        height: 25,
        fill: self.attr.data.sc,
        stroke: '#bcbcbc',
        draggable: true,
      });
      that.layer.add( startColorRect );
      startColorRect.addName('startColorRect');
      startColorRect.on( 'click', function (e) {
        console.dir("起始颜色")
        self.select_color_qs=true;
      });
      let endColorRect = new Konva.Rect({
        x: 30+(232-30)/2-12.5,
        y: 246,
        width: 25,
        height: 25,
        fill: self.attr.data.ec,
        stroke: '#bcbcbc',
        draggable: true,
      });
      that.layer.add( endColorRect );
      endColorRect.addName('endColorRect');
      endColorRect.on( 'click', function (e) {
        console.dir("终点颜色")
        self.select_color_qs=false;
      });
      //终点颜色
      //======
      self.control_1();
      //======


    }



    self.parentrefreshSize();
    that.layer.batchDraw();

  }
  control_1(){

    let self= this;
    let that =this.that;
    const list_grop_stroke='#bcbcbc';
    const list_grop_strokeWidth=0.5;


    var controlColorGroup= new Konva.Group({
      x: 0,
      y: 0,
      width: that.width,
      height:that.height,
      //draggable: true,
    });
    controlColorGroup.addName('controlColorGroup');
    let hhhh=70;
    let tophh=that.width+hhhh;
    let tempsw=180;
    let tempew=20;
    var line = new Konva.Line({
      points: [that.width-tempsw, tophh,
        that.width-tempew, tophh],
      stroke: list_grop_stroke,
      strokeWidth: list_grop_strokeWidth,
    });
    controlColorGroup.add( line );
    //that.layer.add( line );
    //let tempbl=(tempsw-tempew)*0.1;
    let tempbl=(tempsw-tempew)*self.attr.data.sw;
    let rect = new Konva.Rect({
      x: that.width-tempsw+tempbl,
      y: tophh-9,
      width: 12,
      height: 18,
      fill: '#808080',
      stroke: '#bcbcbc',
      draggable: true,
      opacity: 0.5
    });
    controlColorGroup.add( rect );
    let text = new Konva.Text({
      x:10,
      y:tophh-9-6,
      text: '起始X:',
      fontSize: 12,
      lineHeight: 2,
      fontFamily: 'Calibri',
      padding: 0,
      fill: '#808080'
    });
    text.align('center');
    controlColorGroup.add( text );


    let tophh2=that.width+hhhh+18;
    var line2 = new Konva.Line({
      points: [that.width-tempsw, tophh2,
        that.width-tempew, tophh2],
      stroke: list_grop_stroke,
      strokeWidth: list_grop_strokeWidth,
    });
    controlColorGroup.add( line2 );
    //let tempbl2=(tempsw-tempew)*0.9;
    let tempbl2=(tempsw-tempew)*self.attr.data.ew;
    let rect2 = new Konva.Rect({
      x: that.width-tempsw+tempbl2,
      y: tophh2-9,
      width: 12,
      height: 18,
      fill: '#808080',
      stroke: '#bcbcbc',
      draggable: true,
      opacity: 0.5
    });
    controlColorGroup.add( rect2 );
    let text2 = new Konva.Text({
      x:10,
      y:tophh2-9-6,
      text: '终点X:',
      fontSize: 12,
      lineHeight: 2,
      fontFamily: 'Calibri',
      padding: 0,
      fill: '#808080'
    });
    text2.align('center');
    controlColorGroup.add( text2 );
    //=====
    let tophh3=that.width+hhhh+18+18+18;
    var line3 = new Konva.Line({
      points: [that.width-tempsw, tophh3,
        that.width-tempew, tophh3],
      stroke: list_grop_stroke,
      strokeWidth: list_grop_strokeWidth,
    });
    controlColorGroup.add( line3 );
    //let tempbl3=(tempsw-tempew)*0.1;
    let tempbl3=(tempsw-tempew)*self.attr.data.sh;
    let rect3 = new Konva.Rect({
      x: that.width-tempsw+tempbl3,
      y: tophh3-9,
      width: 12,
      height: 18,
      fill: '#808080',
      stroke: '#bcbcbc',
      draggable: true,
      opacity: 0.5
    });
    controlColorGroup.add( rect3 );
    let text3 = new Konva.Text({
      x:10,
      y:tophh3-9-6,
      text: '起点Y:',
      fontSize: 12,
      lineHeight: 2,
      fontFamily: 'Calibri',
      padding: 0,
      fill: '#808080'
    });
    text3.align('center');
    controlColorGroup.add( text3 );

    let tophh4=that.width+hhhh+18+18+18+18;
    var line4 = new Konva.Line({
      points: [that.width-tempsw, tophh4,
        that.width-tempew, tophh4],
      stroke: list_grop_stroke,
      strokeWidth: list_grop_strokeWidth,
    });
    controlColorGroup.add( line4 );
    //let tempbl4=(tempsw-tempew)*0.9;
    let tempbl4=(tempsw-tempew)*self.attr.data.eh;
    let rect4 = new Konva.Rect({
      x: that.width-tempsw+tempbl4,
      y: tophh4-9,
      width: 12,
      height: 18,
      fill: '#808080',
      stroke: '#bcbcbc',
      draggable: true,
      opacity: 0.5
    });
    controlColorGroup.add( rect4 );
    let text4 = new Konva.Text({
      x:10,
      y:tophh4-9-6,
      text: '终点Y:',
      fontSize: 12,
      lineHeight: 2,
      fontFamily: 'Calibri',
      padding: 0,
      fill: '#808080'
    });
    text4.align('center');
    controlColorGroup.add( text4 );

    //====
    //绑定事件 Konva支持事件：mouseover, mouseout, mouseenter, mouseleave, mousemove, mousedown, mouseup, mousewheel, click, dblclick, dragstart, dragmove, and dragend

    rect.on( 'xChange', function (e) {
      let temp_item =Math.abs((that.width-tempsw-e.newVal)/(tempsw-tempew));
      console.dir(temp_item)
      if(temp_item<0){
        temp_item=0;
      }
      if(temp_item>1){
        temp_item=1;
      }
      self.attr.data.sw=temp_item;
      self.parentrefreshSize();
    });

    rect2.on( 'xChange', function (e) {
      let temp_item =Math.abs((that.width-tempsw-e.newVal)/(tempsw-tempew));
      if(temp_item<0){
        temp_item=0;
      }
      if(temp_item>1){
        temp_item=1;
      }
      self.attr.data.ew=temp_item;
      self.parentrefreshSize();
    });

    rect3.on( 'xChange', function (e) {
      let temp_item =Math.abs((that.width-tempsw-e.newVal)/(tempsw-tempew));
      if(temp_item<0){
        temp_item=0;
      }
      if(temp_item>1){
        temp_item=1;
      }
      self.attr.data.sh=temp_item;
      self.parentrefreshSize();
    });

    rect4.on( 'xChange', function (e) {
      let temp_item =Math.abs((that.width-tempsw-e.newVal)/(tempsw-tempew));

      if(temp_item<0){
        temp_item=0;
      }
      if(temp_item>1){
        temp_item=1;
      }
      self.attr.data.eh=temp_item;
      self.parentrefreshSize();
    });

    rect.dragBoundFunc(function(pos){

      if(pos.x<that.width-tempsw){
        pos.x=that.width-tempsw
      }
      if(pos.x>that.width-tempew){
        pos.x=that.width-tempew
      }

      return {
        x: pos.x,
        y: this.absolutePosition().y
      };
    });

    rect2.dragBoundFunc(function(pos){
      if(pos.x<that.width-tempsw){
        pos.x=that.width-tempsw
      }
      if(pos.x>that.width-tempew){
        pos.x=that.width-tempew
      }
      return {
        x: pos.x,
        y: this.absolutePosition().y
      };
    });
    rect3.dragBoundFunc(function(pos){
      if(pos.x<that.width-tempsw){
        pos.x=that.width-tempsw
      }
      if(pos.x>that.width-tempew){
        pos.x=that.width-tempew
      }
      return {
        x: pos.x,
        y: this.absolutePosition().y
      };
    });
    rect4.dragBoundFunc(function(pos){
      if(pos.x<that.width-tempsw){
        pos.x=that.width-tempsw
      }
      if(pos.x>that.width-tempew){
        pos.x=that.width-tempew
      }
      return {
        x: pos.x,
        y: this.absolutePosition().y
      };
    });


    //====
    if(self.attr.typeid==2){
      let tophh5=that.width+hhhh+18+18+18+18+18+18;
      var line5 = new Konva.Line({
        points: [that.width-tempsw, tophh5,
          that.width-tempew, tophh5],
        stroke: list_grop_stroke,
        strokeWidth: list_grop_strokeWidth,
      });
      controlColorGroup.add( line5 );
      //let tempbl5=(tempsw-tempew)*0.9;
      let tempbl5=(tempsw-tempew)*self.attr.data.eh;
      let rect5 = new Konva.Rect({
        x: that.width-tempsw+tempbl5,
        y: tophh5-9,
        width: 12,
        height: 18,
        fill: '#808080',
        stroke: '#bcbcbc',
        draggable: true,
        opacity: 0.5
      });
      controlColorGroup.add( rect5 );
      let text5 = new Konva.Text({
        x:10,
        y:tophh5-9-6,
        text: '起点半径:',
        fontSize: 12,
        lineHeight: 2,
        fontFamily: 'Calibri',
        padding: 0,
        fill: '#808080'
      });
      text5.align('center');
      controlColorGroup.add( text5 );

      let tophh6=that.width+hhhh+18+18+18+18+18+18+18;
      var line6 = new Konva.Line({
        points: [that.width-tempsw, tophh6,
          that.width-tempew, tophh6],
        stroke: list_grop_stroke,
        strokeWidth: list_grop_strokeWidth,
      });
      controlColorGroup.add( line6 );
      //let tempbl5=(tempsw-tempew)*0.9;
      let tempbl6=(tempsw-tempew)*self.attr.data.eh;
      let rect6 = new Konva.Rect({
        x: that.width-tempsw+tempbl6,
        y: tophh6-9,
        width: 12,
        height: 18,
        fill: '#808080',
        stroke: '#bcbcbc',
        draggable: true,
        opacity: 0.5
      });
      controlColorGroup.add( rect6 );
      let text6 = new Konva.Text({
        x:10,
        y:tophh6-9-6,
        text: '终点半径:',
        fontSize: 12,
        lineHeight: 2,
        fontFamily: 'Calibri',
        padding: 0,
        fill: '#808080'
      });
      text6.align('center');
      controlColorGroup.add( text6 );
      rect5.on( 'xChange', function (e) {
        let temp_item =Math.abs((that.width-tempsw-e.newVal)/(tempsw-tempew));
        if(temp_item<0){
          temp_item=0;
        }
        if(temp_item>1){
          temp_item=1;
        }
        self.attr.data.sr=temp_item;
        self.parentrefreshSize();
      });

      rect6.on( 'xChange', function (e) {
        let temp_item =Math.abs((that.width-tempsw-e.newVal)/(tempsw-tempew));

        if(temp_item<0){
          temp_item=0;
        }
        if(temp_item>1){
          temp_item=1;
        }
        self.attr.data.er=temp_item;
        self.parentrefreshSize();
      });

      rect5.dragBoundFunc(function(pos){
        if(pos.x<that.width-tempsw){
          pos.x=that.width-tempsw
        }
        if(pos.x>that.width-tempew){
          pos.x=that.width-tempew
        }
        return {
          x: pos.x,
          y: this.absolutePosition().y
        };
      });
      rect6.dragBoundFunc(function(pos){
        if(pos.x<that.width-tempsw){
          pos.x=that.width-tempsw
        }
        if(pos.x>that.width-tempew){
          pos.x=that.width-tempew
        }
        return {
          x: pos.x,
          y: this.absolutePosition().y
        };
      });
    }


    that.layer.add( controlColorGroup );

  }
  type_attr_view(){
    let self= this;
    let that =this.that;
    console.dir(self.attr)
    self.colorBar();
    self.colorBox(self.attr.data.sc);
    self.control_0();
    that.layer.batchDraw();
  }
  colorBar() {
    let self= this;
    let that =this.that;
    var colorBarShapeGroup= new Konva.Group({
      x: 0,
      y: self.topheight,
      width: 20,
      height:self.height,
    });
    let colorBarShape = new Konva.Shape({
      x: 0,
      y: 0,
      sceneFunc (context,shape) {
        var gradientBar = context.createLinearGradient(0, 0, 0, self.height);
        gradientBar.addColorStop(0, '#f00');
        gradientBar.addColorStop(1 / 6, '#f0f');
        gradientBar.addColorStop(2 / 6, '#00f');
        gradientBar.addColorStop(3 / 6, '#0ff');
        gradientBar.addColorStop(4 / 6, '#0f0');
        gradientBar.addColorStop(5 / 6, '#ff0');
        gradientBar.addColorStop(1, '#f00');
        context.fillStyle = gradientBar;
        context.fillRect(0, 0, 20, self.height);
        context.fillStrokeShape(shape);
      }
    });
    colorBarShapeGroup.add(new Konva.Rect({
      x:0,
      y:0,
      width: 20,
      height: self.height,
      fill: '#e6e6e6',
      stroke: '#808080',
      strokeWidth:0.8,
      cornerRadius: 3
    }));
    colorBarShapeGroup.add(colorBarShape);
    colorBarShapeGroup.addName('colorBarShape');

    that.layer.add( colorBarShapeGroup );



    colorBarShapeGroup.on( 'click', function (e) {
      console.dir(e.evt);
      console.dir(e.evt.offsetX+' , '+e.evt.offsetY);
      console.dir(e.evt.layerX+' , '+e.evt.layerY);
      console.dir('colorBarShape');
      self.rgbaStr = '#000';
      var ePos = {
        x: e.evt.offsetX || e.evt.layerX,
        y: e.evt.offsetY || e.evt.layerY
      }
      if (ePos.x >= 0 && ePos.x < 20 && ePos.y >= 69 && ePos.y < self.topheight+self.height) {
        // in
        self.rgbaStr = self.getRgbaAtPoint(ePos, 'bar');
        self.colorBox('rgba(' + self.rgbaStr + ')');
        that.layer.batchDraw();
      } else if (ePos.x >= 30 && ePos.x <= self.width && ePos.y >= 69 && ePos.y <= self.topheight+self.height) {
        self.rgbaStr = self.getRgbaAtPoint(ePos, 'box');
      } else {
        return;
      }
    });
  }
  getRgbaAtPoint(pos, area) {
    let self= this;
    let that =this.that;
    if (area == 'bar') {
      var imgData = that.layer.canvas._canvas.getContext('2d').getImageData(0, 0, 20, that.layer.canvas._canvas.height);
    } else {
      var imgData = that.layer.canvas._canvas.getContext('2d').getImageData(0, 0, that.layer.canvas._canvas.width, that.layer.canvas._canvas.height);
    }

    var data = imgData.data;
    var dataIndex = (pos.y * imgData.width + pos.x) * 4;
    return [
      data[dataIndex],
      data[dataIndex + 1],
      data[dataIndex + 2],
      (data[dataIndex + 3] / 255).toFixed(2),
    ];
  }
  colorBox(color) {
    let self= this;
    let that =this.that;
    let colorBoxShape = new Konva.Shape({
      x: 0,
      y: 0,
      //fill: 'red',
      // a Konva.Canvas renderer is passed into the sceneFunc function
      sceneFunc (context, shape) {
        //context.beginPath();
        // 底色填充，也就是（举例红色）到白色
        //var gradientBase = context.createLinearGradient(30, that.topheight, that.width + 30, that.topheight);
        var gradientBase = context.createLinearGradient(0, 0,self.width,0);
        gradientBase.addColorStop(1, color);
        gradientBase.addColorStop(0, 'rgba(255,255,255,1)');
        //gradientBase.addColorStop(0, 'rgba(0,0,0,0)');
        context.fillStyle = gradientBase;
        //context.fillRect(30, that.topheight, that.width, that.width);
        context.fillRect(0, 0, self.width, self.height);
        // 第二次填充，黑色到透明
        //var my_gradient1 = context.createLinearGradient(30, that.topheight, 0, that.width);
        var my_gradient1 = context.createLinearGradient(0, 0, 0, self.height);
        my_gradient1.addColorStop(0, 'rgba(0,0,0,0)');
        my_gradient1.addColorStop(1, 'rgba(0,0,0,1)');
        context.fillStyle = my_gradient1;
        //context.fillStyle = gradientBase;
        //context.fillRect(30, that.topheight, that.width, that.width);
        context.fillRect(0, 0, self.width, self.height);
        context.fillStrokeShape(shape);
      }
    });
    var colorBoxShapeGroup= new Konva.Group({
      x: 30,
      y: self.topheight,
      width: self.width,
      height:self.height,
    });
    colorBoxShapeGroup.add(new Konva.Rect({
      x:0,
      y:0,
      width: self.width,
      height: self.height,
      fill: '#fff',
      stroke: '#808080',
      strokeWidth:0.8,
      cornerRadius: 3
    }));
    colorBoxShapeGroup.add(colorBoxShape);
    colorBoxShapeGroup.addName('colorBoxShapeGroup');
    that.layer.add( colorBoxShapeGroup );



    colorBoxShapeGroup.on( 'click', function (e) {
      console.dir('colorBoxShapeGroup');
      console.dir(e.evt);
      console.dir(e.evt.offsetX+' , '+e.evt.offsetY);
      console.dir(e.evt.layerX+' , '+e.evt.layerY);
      console.dir('colorBarShape');
      self.rgbaStr = '#000';
      var ePos = {
        x: e.evt.offsetX || e.evt.layerX,
        y: e.evt.offsetY || e.evt.layerY
      }
      if (ePos.x >= 30 && ePos.x < 231 && ePos.y >= 69 && ePos.y < self.topheight+self.height) {
        // in
        self.rgbaStr = self.getRgbaAtPoint(ePos, 'box');
        /*self.colorBox('rgba(' + self.rgbaStr + ')');
        */


        if(self.attr.typeid==0){
          self.attr.data.sc=`#${self.rgb2hex(self.rgbaStr)}`;
        }else{
          if(self.select_color_qs){
            self.attr.data.sc=`#${self.rgb2hex(self.rgbaStr)}`;
          }else{
            self.attr.data.ec=`#${self.rgb2hex(self.rgbaStr)}`;
          }
        }

        self.control_0();
      } else {
        return;
      }



    });
  }





  rgb2hex(rgb) {
    let that  = this;
    var aRgb = rgb instanceof Array ? rgb : (rgb.split(',') || [0, 0, 0]);
    var temp;
    return [
      (temp = Number(aRgb[0]).toString(16)).length == 1 ? ('0' + temp) : temp,
      (temp = Number(aRgb[1]).toString(16)).length == 1 ? ('0' + temp) : temp,
      (temp = Number(aRgb[2]).toString(16)).length == 1 ? ('0' + temp) : temp,
    ].join('');
  }
  hex2rgb(hex) {
    let that  = this;
    if (hex.length == 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    return [
      parseInt(hex[0] + hex[1], 16),
      parseInt(hex[2] + hex[3], 16),
      parseInt(hex[4] + hex[5], 16),
    ].join();
  }
  outColor(rgb) {
    let that  = this;
    if(that.select_color_qs){
      let color_rect_s5 = that.fthat.layer.find('.color_rect_s5')[0];
      color_rect_s5.attrs.fill=`#${that.rgb2hex(rgb)}`;
      that.fthat.parent.head_canvas.attr.project.backgroundType.data.sc=`#${that.rgb2hex(rgb)}`;

    }else{
      let color_rect_e5 = that.fthat.layer.find('.color_rect_e5')[0];
      color_rect_e5.attrs.fill=`#${that.rgb2hex(rgb)}`;
      that.fthat.parent.head_canvas.attr.project.backgroundType.data.ec=`#${that.rgb2hex(rgb)}`;
    }


    var customShape_color_rect = new Konva.Shape({
      x: 120,
      y: 272,
      fill: 'red',
      // a Konva.Canvas renderer is passed into the sceneFunc function
      sceneFunc (context, shape) {
        var gradientBar = context.createLinearGradient(
          25*that.fthat.parent.head_canvas.attr.project.backgroundType.data.sw,
          25*that.fthat.parent.head_canvas.attr.project.backgroundType.data.sh,
          25*that.fthat.parent.head_canvas.attr.project.backgroundType.data.ew,
          25*that.fthat.parent.head_canvas.attr.project.backgroundType.data.eh
        );
        gradientBar.addColorStop(0, that.fthat.parent.head_canvas.attr.project.backgroundType.data.sc);
        gradientBar.addColorStop(1, that.fthat.parent.head_canvas.attr.project.backgroundType.data.ec);
        context.fillStyle = gradientBar;
        context.fillRect(0, 0, 25, 25);
        context.fillStrokeShape(shape);
      }
    });
    that.fthat.layer.add( customShape_color_rect );
    that.fthat.layer.batchDraw();
    if(!that.isnodeattr){
      that.fthat.parent.centre_canvas.refreshSize();
    }

  }



}