class ContentCanvas{
  constructor(container='content_body_canvasTimeLine_left_head_div',strokeColor='#bcbcbc',parent){
    this.strokeColor=strokeColor;
    //this.fillColor=strokeColor;
    this.container=container;
    if(parent){
      this.parent=parent;
    }
    this.init();
  }

  init(){
    let that = this;
    let container_dom=document.getElementById(that.container);
    if(!container_dom){
      that.errorMessage(`Can not find document with id ${that.container} `);
      return;
    }
    that.width=container_dom.clientWidth||container_dom.offsetWidth;
    that.height=container_dom.clientHeight||container_dom.offsetHeight;
    if(!that.width) that.height=window.innerWidth;
    if(!that.height) that.height=window.innerHeight;
    that.stage = new Konva.Stage({
      container: that.container,
      width: that.width,
      height: that.height
    });
    that.layer = new Konva.Layer();
    that.stage.add( that.layer );
    that.drawBorderline();
    that.drawCell();
    if(!this.fn){
      that.layer.draw();
    }else{
      this.fn();
    }

    //if(this.fn){this.fn();}
  }
  drawBorderline(){
    let that = this;
    let line = new Konva.Line({
      points: [0, 0, that.width, 0, that.width, that.height, 0, that.height,0, that.height],
      stroke: that.strokeColor,
      tension: 0,
      strokeWidth: 1,
      opacity: 1
    });
    that.layer.add( line );
  }
  drawCell(){
    let that = this;
  }
}
/*时间轴左半边*/
class Content_body_canvasTimeLine_left_canvas{
  constructor(){
    this.head=new Content_body_canvasTimeLine_left_head_canvas();
    this.body=new Content_body_canvasTimeLine_left_body_canvas();
    this.head.parent=this;
    this.body.parent=this;
  }
}
class Content_body_canvasTimeLine_left_head_canvas extends ContentCanvas{
  constructor(container='content_body_canvasTimeLine_left_head_div',strokeColor='#bcbcbc',parent){
    super(container,strokeColor,parent);
  }
  drawCell(){
    let that = this;
    that.playTween();
  }
  playTween(){
    console.dir('playTween')
    let that = this;
    var tag = new Konva.Tag({
      fill: '#bbb',
      stroke: '#7b7b7b',
      shadowColor: '#7b7b7b',
      shadowBlur: 5,
      shadowOffset: [5, 5],
      shadowOpacity: 0.2,
      lineJoin: 'round',
      pointerDirection: 'right',
      pointerWidth: 10,
      pointerHeight: 10,
      cornerRadius: 7.5,
      x: that.width/2,
      y: that.height/2,
    });
    that.layer.add(tag);
    tag.on( 'click', function (e) {
      if(that.anim){
        that.anim=false;
        that.parent.parent.right.head.attr.start_timestamp = new Date("2018-08-08 00:00:00").getTime();
        that.parent.parent.right.head.layer.destroyChildren();
        //that.parent.parent.right.head.signal();
        that.parent.parent.right.head.drawCell(true);
      }else{




          let playfunction=function(item,i){
            if(i<item.length){
              if(item[i].keyframe){
                let upjson,dowjson;
                for(let ki=0;ki<item[i].keyframe.length;ki++){
                  upjson=item[i].keyframe[ki]
                  if(upjson.path_node){
                    upjson.path_node.visible = false;
                    if(upjson.path_node._curveSegments_Group){
                      upjson.path_node._curveSegments_Group.visible = false;
                    }
                  }
                }
              }
              i++;
              playfunction(item,i);
              /*}*/
            }
          }
          playfunction(that.parent.parent.parent.centre_canvas.group.children,0)






        var clockTimeline = new THREE.Clock(true);
        var  clock_startTime=that.parent.parent.right.head.attr.play_timestamp;
        var  clock_oldTime=that.parent.parent.right.head.attr.end_timestamp;
        function playTimeline() {
          if(that.anim) {
            var delta = clockTimeline.getElapsedTime ();
            var temp_delta= clock_startTime+(delta*1000);
            if(temp_delta<clock_oldTime){
              that.anim=true;
              that.parent.parent.right.head.attr.play_timestamp=temp_delta;
              that.parent.parent.right.head.layer.destroyChildren();

              let canvansW = that.width-8;
              let ms_per_ruler=that.parent.parent.right.head.attr.ms_per_ruler;
              let px_per_ms = canvansW / (ms_per_ruler*60*60 * 1000); // px/ms 毫秒
              let  beginX = (that.parent.parent.right.head.attr.play_timestamp - that.parent.parent.right.head.attr.start_timestamp) * px_per_ms;
              if(beginX>canvansW*0.9){
                that.parent.parent.right.head.attr.start_timestamp=that.parent.parent.right.head.attr.start_timestamp+(ms_per_ruler * 60 * 60 * 1000)/2;
              }
              //that.parent.parent.right.head.signal();
              that.parent.parent.right.head.drawCell(true);
              requestAnimationFrame(playTimeline);
            }else{
              that.anim=false;
              that.parent.parent.right.head.attr.start_timestamp = new Date("2018-08-08 00:00:00").getTime();
              that.parent.parent.right.head.layer.destroyChildren();
              that.parent.parent.right.head.init();
            }
          }

        }
        that.anim=true;
        playTimeline();


      }
    });

    var add = new Konva.Path({
      x: 4,
      y: 6,
      data: 'M243.174168 550.404463c-27.159206 0-38.39184-11.25247-38.39184-38.395447 0-27.159206 11.232634-38.411676 38.39184-38.411676h230.369074v-230.387106c0-27.159206 11.250667-38.409873 38.408069-38.409873 27.141174 0 38.39184 11.250667 38.391841 38.409873v230.387106h230.387106c27.141174 0 38.393643 11.25247 38.393644 38.411676 0 27.142977-11.25247 38.395447-38.393644 38.395447H550.343152v230.38891c0 27.157403-11.250667 38.409873-38.391841 38.409873-27.157403 0-38.40807-11.25247-38.408069-38.409873V550.404463h-230.369074zM102.390262 1024h819.122099c56.550874 0 102.390262-45.842995 102.390262-102.397475V102.399279c0-56.540054-45.839388-102.399279-102.390262-102.399279H102.390262C45.839388 0.001803 0 45.861028 0 102.401082v819.203246c0 56.552677 45.839388 102.395672 102.390262 102.395672z',
      fill: '#7b7b7b',
      scaleX: 0.015,
      scaleY: 0.015,
    });
    that.layer.add(add);

    var copy = new Konva.Path({
      x: 26,
      y: 6,
      data: 'M896 170.666667H298.666667c-70.4 0-128 57.6-128 128v597.333333c0 70.4 57.6 128 128 128h597.333333c70.4 0 128-57.6 128-128V298.666667c0-70.4-57.6-128-128-128m0 85.333333c23.125333 0 42.666667 19.541333 42.666667 42.666667v597.333333c0 23.125333-19.541333 42.666667-42.666667 42.666667H298.666667c-23.125333 0-42.666667-19.541333-42.666667-42.666667V298.666667c0-23.125333 19.541333-42.666667 42.666667-42.666667h597.333333 M170.666667 768h-42.666667c-23.125333 0-42.666667-19.541333-42.666667-42.666667V128c0-23.125333 19.541333-42.666667 42.666667-42.666667h597.333333c23.125333 0 42.666667 19.541333 42.666667 42.666667v42.496h85.333333V128c0-70.4-57.6-128-128-128H128C57.6 0 0 57.6 0 128v597.333333c0 70.4 57.6 128 128 128h42.666667V768z M554.666667 768V426.666667c0-23.466667 19.2-42.666667 42.666666-42.666667s42.666667 19.2 42.666667 42.666667v341.333333c0 23.466667-19.2 42.666667-42.666667 42.666667s-42.666667-19.2-42.666666-42.666667 M768 640H426.666667c-23.466667 0-42.666667-19.2-42.666667-42.666667s19.2-42.666667 42.666667-42.666666h341.333333c23.466667 0 42.666667 19.2 42.666667 42.666666s-19.2 42.666667-42.666667 42.666667',
      fill: '#7b7b7b',
      scaleX: 0.017,
      scaleY: 0.017,
    });
    that.layer.add(copy);

    var delet = new Konva.Path({
      x: 48,
      y: 6,
      data: 'M482.656 316.672c0-17.6 14.4-32 32-32l0 0c17.6 0 32 14.4 32 32l0 485.344c0 17.6-14.4 32-32 32l0 0c-17.6 0-32-14.4-32-32L482.656 316.672zM332 316.672c0-17.6 14.4-32 32-32l0 0c17.6 0 32 14.4 32 32l0 485.344c0 17.6-14.4 32-32 32l0 0c-17.6 0-32-14.4-32-32L332 316.672zM633.344 316.672c0-17.6 14.4-32 32-32l0 0c17.6 0 32 14.4 32 32l0 485.344c0 17.6-14.4 32-32 32l0 0c-17.6 0-32-14.4-32-32L633.344 316.672zM898.656 159.328l-125.952 0-46.016 0 0-40.224c0-31.328-28.096-55.776-64-55.776l-296 0c-35.904 0-64 24.512-64 55.776l0 40.224-46.016 0-131.328 0c-17.664 0-32 14.304-32 32s14.336 32 32 32l67.328 0 0 674.912c0 34.432 28.704 62.432 64 62.432l516 0c35.296 0 64-28 64-62.432l0-674.912 61.984 0c17.664 0 32-14.304 32-32S916.32 159.328 898.656 159.328zM366.656 127.328l296 0 0 32-296 0L366.656 127.328zM739.008 896.768c0 0-414.016 1.376-449.024 1.376s-33.312-36.128-33.312-36.128 0-570.976 0-608 31.328-30.688 31.328-30.688l78.688 0 296 0 72.32 0c0 0 37.728-2.272 37.728 30.688s0.512 579.968 0.512 610.976S739.008 896.768 739.008 896.768z',
      fill: '#7b7b7b',
      scaleX: 0.018,
      scaleY: 0.018,
    });
    that.layer.add(delet);
    var zindex = new Konva.Path({
      x: 70,
      y: 6,
      data: 'M25.319154 296.265564 521.801738 512.017396 998.679823 296.265564 540.539498 64.303538Z M521.801738 808.957319 195.696566 667.224294 25.319154 743.94463 521.801738 959.696462 998.679823 743.94463 841.429383 664.348804Z M521.801738 596.149539 195.696566 454.416514 25.319154 531.135826 521.801738 746.888681 998.679823 531.135826 841.429383 451.541023Z',
      fill: '#7b7b7b',
      scaleX: 0.017,
      scaleY: 0.017,
    });
    that.layer.add(zindex);

    let line = new Konva.Line({
      points: [0, 0, that.width, 0, that.width, that.height, 0, that.height,0, that.height],
      stroke: that.strokeColor,
      tension: 0,
      strokeWidth: 1,
      opacity: 1
    });
    that.layer.add( line );

  }
}
class Content_body_canvasTimeLine_left_body_canvas extends ContentCanvas{
  constructor(container='content_body_canvasTimeLine_left_body_div',strokeColor='#bcbcbc',parent){
    super(container,strokeColor,parent);
  }
  drawBorderline(){
    let that = this;
    let list_group_body = new Konva.Rect({
      x: 0,
      y: 0,
      width: that.width,
      height: that.height,
      stroke: that.strokeColor,
      strokeWidth: 1,
      fill: '#f8f8f8',
    });
    this.layer.add( list_group_body );
  }
  drawCell(){
    let that = this;
  }
}
/*时间轴右半边*/
class Content_body_canvasTimeLine_right_canvas {
  constructor(){
    this.body = new Content_body_canvasTimeLine_right_body();
    this.head = new Content_body_canvasTimeLine_right_head();
    this.foot = new Content_body_canvasTimeLine_right_foot();
    this.body.parent=this;
    this.head.parent=this;
    this.foot.parent=this;


  }
}
class Content_body_canvasTimeLine_right_head extends ContentCanvas {
  constructor(container='content_body_canvasTimeLine_right_head_div',strokeColor='#bcbcbc',parent){
    super(container,strokeColor,parent);
  }
  /**
   * 绘制添加刻度
   */
  add_graduations(){
    let that =this;
    let canvansW = that.width-8;
    let ms_per_ruler=that.attr.ms_per_ruler;
    let px_per_step = that.attr.graduation_step;  // px/格 默认最小值20px 6
    var px_per_s = canvansW / (ms_per_ruler*60); // px/min           秒
    var px_per_ms = canvansW / (ms_per_ruler*60*60 * 1000); // px/ms 毫秒

    var s_per_step = px_per_step / px_per_s; // min/格
    for(var i = 0; i < that.attr.minutes_per_step.length;i++){
      if(s_per_step <= that.attr.minutes_per_step[i]){ //让每格时间在minutes_per_step规定的范围内
        s_per_step = that.attr.minutes_per_step[i];
        px_per_step = px_per_s * s_per_step;
        break
      }
    }

    var num_steps = canvansW / px_per_step; //总格数
    var graduation_left;
    var graduation_time;
    var caret_class;
    var lineH;
    function ms_to_next_step(timestamp, step) {
      var remainder = timestamp % step;
      return remainder ? step - remainder : 0;
    }
    var ms_offset = ms_to_next_step(that.attr.start_timestamp,s_per_step*60*1000);//开始的偏移时间 ms
    var px_offset =8 + ms_offset * px_per_ms; //开始的偏移距离 px
    var ms_per_step = px_per_step / px_per_ms; // ms/step
    var temptimearr=[];
    for(var i = 0; i < num_steps; i++){
      graduation_left = px_offset + i * px_per_step; // 距离=开始的偏移距离+格数*px/格
      graduation_time = that.attr.start_timestamp + ms_offset + i * ms_per_step; //时间=左侧开始时间+偏移时间+格数*ms/格
      var date = new Date(graduation_time);
      var middle_date =  that.graduation_title(date);
      let iscunzai=false;
      for(var j=0;j<temptimearr.length;j++){
        if(temptimearr[j]&&temptimearr[j]==middle_date){
          iscunzai=true;
          break;
        }
      }
      if(iscunzai){
        continue;
      }
      temptimearr.push(middle_date);
      if (
        date.getUTCSeconds() == 0||
        date.getUTCSeconds() == 10||
        date.getUTCSeconds() == 20||
        date.getUTCSeconds() == 30||
        date.getUTCSeconds() == 40||
        date.getUTCSeconds() == 50||
        date.getUTCSeconds() == 5||
        date.getUTCSeconds() == 15||
        date.getUTCSeconds() == 25||
        date.getUTCSeconds() == 35||
        date.getUTCSeconds() == 45||
        date.getUTCSeconds() == 55) {

        caret_class = 'middle';
        lineH = 6;
        var middle_date =  that.graduation_title(date);
        var text = new Konva.Text({
          x: graduation_left-12,
          y: 8,
          text: middle_date,
          fontSize: 9,
          fontFamily: 'Calibri',
          fill: '#808080'
        });
        that.layer.add(text);
      }
      else{
        lineH = 3;
      }
      that.drawLine(graduation_left,26-lineH,graduation_left,26,"#808080",1);
    }
  }
  /**
   * 绘制线
   * @param {*} beginX
   * @param {*} beginY
   * @param {*} endX
   * @param {*} endY
   * @param {*} color
   * @param {*} width
   */
  drawLine(beginX,beginY,endX,endY,color,width){
    /*线*/
    var line = new Konva.Line({
      points: [beginX, beginY, endX, endY],
      stroke: color,
      strokeWidth: 0.8,
    });
    this.layer.add( line );
  }

  graduation_title(datetime) {
    return  ('0' + datetime.getMinutes().toString()).substr(-2)+':'+datetime.getUTCSeconds();
  };
  /*绘制重点指针*/
  endPointer(){
    let that = this;
    let canvansW = that.width-8;
    let ms_per_ruler=that.attr.ms_per_ruler;
    var px_per_ms = canvansW / (ms_per_ruler*60*60 * 1000); // px/ms 毫秒
    let temp_group_x =(that.attr.end_timestamp-that.attr.start_timestamp)*px_per_ms;
    if(temp_group_x>=0){
      let temp_s=15,temp_e=1;
      let temp_x=8-temp_s;
      let group = new Konva.Group({
        x:temp_group_x,
        draggable: true,
      });
      let customShape = new Konva.Shape({
        x: temp_x,
        y: 0,
        fill: '#808080',
        // a Konva.Canvas renderer is passed into the sceneFunc function
        sceneFunc (context, shape) {
          context.beginPath();
          context.moveTo(temp_s, temp_e);
          context.lineTo(temp_e, temp_e);
          context.quadraticCurveTo(temp_s, temp_s/4, temp_s, temp_s);
          context.closePath();
          // Konva specific method
          context.fillStrokeShape(shape);
        }
      });
      /*线*/
      const list_grop_strokeWidth=0.5;
      let line = new Konva.Line({
        points: [temp_x+temp_s, temp_s, temp_x+temp_s,that.height-26],
        stroke: 'red',
        strokeWidth: list_grop_strokeWidth,
        opacity: 0.5
      });
      //this.layer.add( line );
      group.add(customShape);
      group.add(line);
      that.layer.add(group);
      group.on( 'xChange', function (e) {
        that.attr.end_timestamp=that.attr.start_timestamp+e.newVal/px_per_ms;
      });
      group.dragBoundFunc(function(pos){

        if(pos.x<0){
          pos.x=0
        }
        if(pos.x>that.width-8){
          pos.x=that.width-8
        }

        return {
          x: pos.x,
          y: this.absolutePosition().y
        };
      });
    }
  }
  /*绘制当前观看、点击指针*/
  playPointer(){
    let that = this;
    let canvansW = that.width-8;
    let ms_per_ruler=that.attr.ms_per_ruler;
    var px_per_ms = canvansW / (ms_per_ruler*60*60 * 1000); // px/ms 毫秒
    let temp_group_x =(that.attr.play_timestamp-that.attr.start_timestamp)*px_per_ms;
    if(temp_group_x>=0){
      let temp_x=8+temp_group_x;
      var label = new Konva.Label({
        x: temp_x,
        y: 26,
        width: 200,
        //height: that.height,
        draggable: true
      });
      label.add(new Konva.Tag({
        fill: '#000000',
        stroke: '#737373',
        strokeWidth: 0.3,
        shadowColor: '#000000',
        shadowBlur: 15,
        shadowOffset: [2.5, 2.5],
        shadowOpacity: 0.2,
        lineJoin: 'round',
        pointerDirection: 'down',
        pointerWidth: 5,
        pointerHeight: 5,
        cornerRadius: 3
      }));
      var date = new Date(that.attr.play_timestamp);
      var middle_date =  that.graduation_title(date);
      let text = new Konva.Text({
        text: '  '+middle_date,
        fontSize: 9,
        lineHeight: 2,
        fontFamily: 'Calibri',
        padding: 0,
        fill: '#f7f7f7'
      });
      text.align('center');
      label.add(text);
      /*线*/
      const list_grop_strokeWidth=0.5;
      let line = new Konva.Line({
        points: [0, 0,0,that.height-26-26 ],
        stroke: '#000000',
        strokeWidth: list_grop_strokeWidth,
        //opacity: 0.5
      });
      label.add(line);
      that.layer.add(label);

      label.on( 'xChange', function (e) {
        that.attr.play_timestamp=that.attr.start_timestamp+(e.newVal-8)/px_per_ms;
        var date = new Date(that.attr.play_timestamp);
        var middle_date =  that.graduation_title(date);
        label.getText().text('  '+middle_date);
        that.playgroup()
      });
      label.dragBoundFunc(function(pos){

        if(pos.x<8){
          pos.x=8
        }
        if(pos.x>that.width){
          pos.x=that.width;
        }
        return {
          x: pos.x,
          y: this.absolutePosition().y
        };
      });
    }

  }
  playgroup(){
    let that = this;
    if(that.parent){
      that.tween_play_all=[];
      let playfunction=function(item,i,fn){
        if(i<item.length){
          if(item[i]._node_Group){
            item[i]._node_Group.remove();
          }
          if(item[i]._curveSegments_Group){
            item[i]._curveSegments_Group.remove();
          }
          if(item[i].addSegmentscircle){
            item[i].addSegmentscircle.remove();
          }

          if(item[i].className=='Path'){
            if(item[i].keyframe){
              let upjson,dowjson;
              for(let ki=0;ki<item[i].keyframe.length;ki++){
                if(!upjson&&item[i].keyframe[ki].time<=that.attr.play_timestamp){
                  upjson=item[i].keyframe[ki]
                }
                if(!dowjson&&item[i].keyframe[ki].time>=that.attr.play_timestamp){
                  dowjson=item[i].keyframe[ki]
                }
                if(item[i].keyframe[ki].time<=that.attr.play_timestamp){
                  if(upjson.time<item[i].keyframe[ki].time){
                    upjson=item[i].keyframe[ki];
                  }
                }
                if(item[i].keyframe[ki].time>=that.attr.play_timestamp){
                  if(dowjson.time>item[i].keyframe[ki].time){
                    dowjson=item[i].keyframe[ki];
                  }
                }
              }
              if(upjson){
                item[i].importJSON(JSON.parse(upjson.exportJSON));
                item[i].temp_control=JSON.parse(upjson.temp_control);
              }
              if(upjson&&dowjson&&upjson.time!=dowjson.time){
                var pathFrom = paper.importJSON(JSON.parse(upjson.exportJSON));
                pathFrom.insert=false;
                var pathTo = paper.importJSON(JSON.parse(dowjson.exportJSON));
                pathTo.insert=false;

                pathFrom.temp_control = JSON.parse(upjson.temp_control);
                pathTo.temp_control = JSON.parse(dowjson.temp_control);

                let temp_factor = (that.attr.play_timestamp-upjson.time)/(dowjson.time-upjson.time);



                if(!upjson.path_node){
                  let node =new paper.Path.Line({
                    from: [pathFrom.position.x, pathFrom.position.y],
                    to: [pathTo.position.x, pathTo.position.y],
                    strokeColor: 'black',strokeWidth:1
                  });

                  node.onMouseDown = function(event) {
                    console.dir(that)
                    if(!node._curveSegments_Group){
                      that.parent.parent.parent.attr_canvas.easingview(node);
                      that.selectNode=node;
                      that.parent.parent.parent.centre_canvas.canvasDom.copySegments(node);
                      that.parent.parent.parent.centre_canvas.canvasDom.curveSegments_view(node,true,true);
                    }
                  }
                  upjson.path_node=node;
                }else{
                  var temp_point = upjson.path_node.getPointAt(upjson.path_node.length);
                  if(temp_point.x!=pathTo.position.x||temp_point.y!=pathTo.position.y){
                    let node =new paper.Path.Line({
                      from: [pathFrom.position.x, pathFrom.position.y],
                      to: [pathTo.position.x, pathTo.position.y],
                      strokeColor: 'black',strokeWidth:1
                    });

                    node.onMouseDown = function(event) {
                      console.dir(that)
                      if(!node._curveSegments_Group){
                        that.parent.parent.parent.attr_canvas.easingview(node);
                        that.selectNode=node;
                        that.parent.parent.parent.centre_canvas.canvasDom.copySegments(node);
                        that.parent.parent.parent.centre_canvas.canvasDom.curveSegments_view(node,true,true);
                      }
                    }
                    upjson.path_node.remove();
                    upjson.path_node=node;
                  }
                }
                if(that.parent.parent.left.head.anim){
                  upjson.path_node.visible = false;
                  if(upjson.path_node._curveSegments_Group){
                    upjson.path_node._curveSegments_Group.visible = false;
                  }
                }else{
                  upjson.path_node.visible = true;
                  if(upjson.path_node._curveSegments_Group){
                    upjson.path_node._curveSegments_Group.visible = true;
                  }
                }
                switch (upjson.path_node.Easingtype) {
                  case 'Linear':
                    //temp_factor= TWEEN.Easing.Linear.InOut(temp_factor);
                    break;
                  case 'Quadratic':
                    if(upjson.path_node.EasingIN&&upjson.path_node.EasingOUT){
                      temp_factor= TWEEN.Easing.Quadratic.InOut(temp_factor);
                    }else if(upjson.path_node.EasingIN){
                      temp_factor= TWEEN.Easing.Quadratic.In(temp_factor);
                    }else if(upjson.path_node.EasingOUT){
                      temp_factor= TWEEN.Easing.Quadratic.Out(temp_factor);
                    }
                    break;
                  case 'Cubic':
                    if(upjson.path_node.EasingIN&&upjson.path_node.EasingOUT){
                      temp_factor= TWEEN.Easing.Cubic.InOut(temp_factor);
                    }else if(upjson.path_node.EasingIN){
                      temp_factor= TWEEN.Easing.Cubic.In(temp_factor);
                    }else if(upjson.path_node.EasingOUT){
                      temp_factor= TWEEN.Easing.Cubic.Out(temp_factor);
                    }
                    break;
                  case 'Quartic':
                    if(upjson.path_node.EasingIN&&upjson.path_node.EasingOUT){
                      temp_factor= TWEEN.Easing.Quartic.InOut(temp_factor);
                    }else if(upjson.path_node.EasingIN){
                      temp_factor= TWEEN.Easing.Quartic.In(temp_factor);
                    }else if(upjson.path_node.EasingOUT){
                      temp_factor= TWEEN.Easing.Quartic.Out(temp_factor);
                    }
                    break;
                  case 'Quintic':
                    if(upjson.path_node.EasingIN&&upjson.path_node.EasingOUT){
                      temp_factor= TWEEN.Easing.Quintic.InOut(temp_factor);
                    }else if(upjson.path_node.EasingIN){
                      temp_factor= TWEEN.Easing.Quintic.In(temp_factor);
                    }else if(upjson.path_node.EasingOUT){
                      temp_factor= TWEEN.Easing.Quintic.Out(temp_factor);
                    }
                    break;
                  case 'Sinusoidal':
                    if(upjson.path_node.EasingIN&&upjson.path_node.EasingOUT){
                      temp_factor= TWEEN.Easing.Sinusoidal.InOut(temp_factor);
                    }else if(upjson.path_node.EasingIN){
                      temp_factor= TWEEN.Easing.Sinusoidal.In(temp_factor);
                    }else if(upjson.path_node.EasingOUT){
                      temp_factor= TWEEN.Easing.Sinusoidal.Out(temp_factor);
                    }
                    break;
                  case 'Exponential':
                    if(upjson.path_node.EasingIN&&upjson.path_node.EasingOUT){
                      temp_factor= TWEEN.Easing.Exponential.InOut(temp_factor);
                    }else if(upjson.path_node.EasingIN){
                      temp_factor= TWEEN.Easing.Exponential.In(temp_factor);
                    }else if(upjson.path_node.EasingOUT){
                      temp_factor= TWEEN.Easing.Exponential.Out(temp_factor);
                    }
                    break;
                  case 'Circular':
                    if(upjson.path_node.EasingIN&&upjson.path_node.EasingOUT){
                      temp_factor= TWEEN.Easing.Circular.InOut(temp_factor);
                    }else if(upjson.path_node.EasingIN){
                      temp_factor= TWEEN.Easing.Circular.In(temp_factor);
                    }else if(upjson.path_node.EasingOUT){
                      temp_factor= TWEEN.Easing.Circular.Out(temp_factor);
                    }
                    break;
                  case 'Elastic':
                    if(upjson.path_node.EasingIN&&upjson.path_node.EasingOUT){
                      temp_factor= TWEEN.Easing.Elastic.InOut(temp_factor);
                    }else if(upjson.path_node.EasingIN){
                      temp_factor= TWEEN.Easing.Elastic.In(temp_factor);
                    }else if(upjson.path_node.EasingOUT){
                      temp_factor= TWEEN.Easing.Elastic.Out(temp_factor);
                    }
                    break;
                  case 'Back':
                    if(upjson.path_node.EasingIN&&upjson.path_node.EasingOUT){
                      temp_factor= TWEEN.Easing.Back.InOut(temp_factor);
                    }else if(upjson.path_node.EasingIN){
                      temp_factor= TWEEN.Easing.Back.In(temp_factor);
                    }else if(upjson.path_node.EasingOUT){
                      temp_factor= TWEEN.Easing.Back.Out(temp_factor);
                    }
                    break;
                  case 'Bounce':
                    if(upjson.path_node.EasingIN&&upjson.path_node.EasingOUT){
                      temp_factor= TWEEN.Easing.Bounce.InOut(temp_factor);
                    }else if(upjson.path_node.EasingIN){
                      temp_factor= TWEEN.Easing.Bounce.In(temp_factor);
                    }else if(upjson.path_node.EasingOUT){
                      temp_factor= TWEEN.Easing.Bounce.Out(temp_factor);
                    }
                    break;
                }

                if(temp_factor>1){
                  temp_factor=1
                }

                var point = upjson.path_node.getPointAt(upjson.path_node.length*temp_factor);

                /*if(item[i].className=='Group'&&pathFrom.className=='Group'&&pathFrom.className=='Group'){
                  for(let gi=0;gi<item[i].children.length;gi++){
                    if(item[i].children[gi].className!='Raster'){
                      item[i].children[gi].interpolate(pathFrom.children[gi], pathTo.children[gi], temp_factor);
                      item[i].position.x=point.x;
                      item[i].position.y=point.y;
                    }else{
                      item[i].children[gi].matrix.tx=point.x+(pathFrom.children[gi].matrix.tx-pathFrom.children[0].position.x);
                      item[i].children[gi].matrix.ty=point.y+(pathFrom.children[gi].matrix.ty-pathFrom.children[0].position.y);
                      item[i].children[gi].rotate(pathFrom.children[gi].rotation+(pathTo.children[gi].rotation-pathFrom.children[gi].rotation)*temp_factor,point);


                      item[i].children[gi].matrix.a=pathFrom.children[gi].matrix.a+(pathTo.children[gi].matrix.a-pathFrom.children[gi].matrix.a)*temp_factor;
                      item[i].children[gi].matrix.b=pathFrom.children[gi].matrix.b+(pathTo.children[gi].matrix.b-pathFrom.children[gi].matrix.b)*temp_factor;
                      item[i].children[gi].matrix.c=pathFrom.children[gi].matrix.c+(pathTo.children[gi].matrix.c-pathFrom.children[gi].matrix.c)*temp_factor;
                      item[i].children[gi].matrix.d=pathFrom.children[gi].matrix.d+(pathTo.children[gi].matrix.d-pathFrom.children[gi].matrix.d)*temp_factor;


                      //item[i].children[gi].rotation=pathFrom.children[gi].rotation+(pathTo.children[gi].rotation-pathFrom.children[gi].rotation)*temp_factor;
                      /!*item[i].children[gi].position.x=point.x;
                      item[i].children[gi].position.y=point.y;*!/
                    }
                  }
                }else{
                  item[i].interpolate(pathFrom, pathTo, temp_factor);
                  item[i].position.x=point.x;
                  item[i].position.y=point.y;
                }*/

                //temp_control=JSON.parse(upjson.temp_control);
                console.dir(pathFrom.temp_control)
                console.dir(pathTo.temp_control)
                item[i].interpolate(pathFrom, pathTo, temp_factor);
                item[i].position.x=point.x;
                item[i].position.y=point.y;


              }
            }
            i++;
            playfunction(item,i,fn);
          }else if(item[i].className=='Raster'){

            /*if(item[i].keyframe){
              let upjson,dowjson;
              for(let ki=0;ki<item[i].keyframe.length;ki++){
                if(!upjson&&item[i].keyframe[ki].time<=that.attr.play_timestamp){
                  upjson=item[i].keyframe[ki]
                }
                if(!dowjson&&item[i].keyframe[ki].time>=that.attr.play_timestamp){
                  dowjson=item[i].keyframe[ki]
                }
                if(item[i].keyframe[ki].time<=that.attr.play_timestamp){
                  if(upjson.time<item[i].keyframe[ki].time){
                    upjson=item[i].keyframe[ki];
                  }
                }
                if(item[i].keyframe[ki].time>=that.attr.play_timestamp){
                  if(dowjson.time>item[i].keyframe[ki].time){
                    dowjson=item[i].keyframe[ki];
                  }
                }
              }
              if(upjson){
                item[i].importJSON(JSON.parse(upjson.exportJSON));
              }
              if(upjson&&dowjson&&upjson.time!=dowjson.time){
                var pathFrom = paper.importJSON(JSON.parse(upjson.exportJSON));
                pathFrom.insert=false;
                var pathTo = paper.importJSON(JSON.parse(dowjson.exportJSON));
                pathTo.insert=false;

                let temp_factor = (that.attr.play_timestamp-upjson.time)/(dowjson.time-upjson.time);

                if(item[i]._node_Group){
                  item[i]._node_Group.remove();
                }
                if(item[i]._curveSegments_Group){
                  item[i]._curveSegments_Group.remove();
                }
                if(item[i].addSegmentscircle){
                  item[i].addSegmentscircle.remove();
                }

                if(!upjson.path_node){
                  let node =new paper.Path.Line({
                    from: [pathFrom.position.x, pathFrom.position.y],
                    to: [pathTo.position.x, pathTo.position.y],
                    strokeColor: 'black',strokeWidth:1
                  });

                  node.onMouseDown = function(event) {
                    console.dir(that)
                    if(!node._curveSegments_Group){
                      that.parent.parent.parent.attr_canvas.easingview(node);
                      that.selectNode=node;
                      that.parent.parent.parent.centre_canvas.canvasDom.copySegments(node);
                      that.parent.parent.parent.centre_canvas.canvasDom.curveSegments_view(node,true,true);
                    }
                  }
                  upjson.path_node=node;
                }else{
                  var temp_point = upjson.path_node.getPointAt(upjson.path_node.length);
                  if(temp_point.x!=pathTo.position.x||temp_point.y!=pathTo.position.y){
                    let node =new paper.Path.Line({
                      from: [pathFrom.position.x, pathFrom.position.y],
                      to: [pathTo.position.x, pathTo.position.y],
                      strokeColor: 'black',strokeWidth:1
                    });

                    node.onMouseDown = function(event) {
                      console.dir(that)
                      if(!node._curveSegments_Group){
                        that.parent.parent.parent.attr_canvas.easingview(node);
                        that.selectNode=node;
                        that.parent.parent.parent.centre_canvas.canvasDom.copySegments(node);
                        that.parent.parent.parent.centre_canvas.canvasDom.curveSegments_view(node,true,true);
                      }
                    }
                    upjson.path_node.remove();
                    upjson.path_node=node;
                  }
                }
                if(that.parent.parent.left.head.anim){
                  upjson.path_node.visible = false;
                  if(upjson.path_node._curveSegments_Group){
                    upjson.path_node._curveSegments_Group.visible = false;
                  }
                }else{
                  upjson.path_node.visible = true;
                  if(upjson.path_node._curveSegments_Group){
                    upjson.path_node._curveSegments_Group.visible = true;
                  }
                }
                switch (upjson.path_node.Easingtype) {
                  case 'Linear':
                    //temp_factor= TWEEN.Easing.Linear.InOut(temp_factor);
                    break;
                  case 'Quadratic':
                    if(upjson.path_node.EasingIN&&upjson.path_node.EasingOUT){
                      temp_factor= TWEEN.Easing.Quadratic.InOut(temp_factor);
                    }else if(upjson.path_node.EasingIN){
                      temp_factor= TWEEN.Easing.Quadratic.In(temp_factor);
                    }else if(upjson.path_node.EasingOUT){
                      temp_factor= TWEEN.Easing.Quadratic.Out(temp_factor);
                    }
                    break;
                  case 'Cubic':
                    if(upjson.path_node.EasingIN&&upjson.path_node.EasingOUT){
                      temp_factor= TWEEN.Easing.Cubic.InOut(temp_factor);
                    }else if(upjson.path_node.EasingIN){
                      temp_factor= TWEEN.Easing.Cubic.In(temp_factor);
                    }else if(upjson.path_node.EasingOUT){
                      temp_factor= TWEEN.Easing.Cubic.Out(temp_factor);
                    }
                    break;
                  case 'Quartic':
                    if(upjson.path_node.EasingIN&&upjson.path_node.EasingOUT){
                      temp_factor= TWEEN.Easing.Quartic.InOut(temp_factor);
                    }else if(upjson.path_node.EasingIN){
                      temp_factor= TWEEN.Easing.Quartic.In(temp_factor);
                    }else if(upjson.path_node.EasingOUT){
                      temp_factor= TWEEN.Easing.Quartic.Out(temp_factor);
                    }
                    break;
                  case 'Quintic':
                    if(upjson.path_node.EasingIN&&upjson.path_node.EasingOUT){
                      temp_factor= TWEEN.Easing.Quintic.InOut(temp_factor);
                    }else if(upjson.path_node.EasingIN){
                      temp_factor= TWEEN.Easing.Quintic.In(temp_factor);
                    }else if(upjson.path_node.EasingOUT){
                      temp_factor= TWEEN.Easing.Quintic.Out(temp_factor);
                    }
                    break;
                  case 'Sinusoidal':
                    if(upjson.path_node.EasingIN&&upjson.path_node.EasingOUT){
                      temp_factor= TWEEN.Easing.Sinusoidal.InOut(temp_factor);
                    }else if(upjson.path_node.EasingIN){
                      temp_factor= TWEEN.Easing.Sinusoidal.In(temp_factor);
                    }else if(upjson.path_node.EasingOUT){
                      temp_factor= TWEEN.Easing.Sinusoidal.Out(temp_factor);
                    }
                    break;
                  case 'Exponential':
                    if(upjson.path_node.EasingIN&&upjson.path_node.EasingOUT){
                      temp_factor= TWEEN.Easing.Exponential.InOut(temp_factor);
                    }else if(upjson.path_node.EasingIN){
                      temp_factor= TWEEN.Easing.Exponential.In(temp_factor);
                    }else if(upjson.path_node.EasingOUT){
                      temp_factor= TWEEN.Easing.Exponential.Out(temp_factor);
                    }
                    break;
                  case 'Circular':
                    if(upjson.path_node.EasingIN&&upjson.path_node.EasingOUT){
                      temp_factor= TWEEN.Easing.Circular.InOut(temp_factor);
                    }else if(upjson.path_node.EasingIN){
                      temp_factor= TWEEN.Easing.Circular.In(temp_factor);
                    }else if(upjson.path_node.EasingOUT){
                      temp_factor= TWEEN.Easing.Circular.Out(temp_factor);
                    }
                    break;
                  case 'Elastic':
                    if(upjson.path_node.EasingIN&&upjson.path_node.EasingOUT){
                      temp_factor= TWEEN.Easing.Elastic.InOut(temp_factor);
                    }else if(upjson.path_node.EasingIN){
                      temp_factor= TWEEN.Easing.Elastic.In(temp_factor);
                    }else if(upjson.path_node.EasingOUT){
                      temp_factor= TWEEN.Easing.Elastic.Out(temp_factor);
                    }
                    break;
                  case 'Back':
                    if(upjson.path_node.EasingIN&&upjson.path_node.EasingOUT){
                      temp_factor= TWEEN.Easing.Back.InOut(temp_factor);
                    }else if(upjson.path_node.EasingIN){
                      temp_factor= TWEEN.Easing.Back.In(temp_factor);
                    }else if(upjson.path_node.EasingOUT){
                      temp_factor= TWEEN.Easing.Back.Out(temp_factor);
                    }
                    break;
                  case 'Bounce':
                    if(upjson.path_node.EasingIN&&upjson.path_node.EasingOUT){
                      temp_factor= TWEEN.Easing.Bounce.InOut(temp_factor);
                    }else if(upjson.path_node.EasingIN){
                      temp_factor= TWEEN.Easing.Bounce.In(temp_factor);
                    }else if(upjson.path_node.EasingOUT){
                      temp_factor= TWEEN.Easing.Bounce.Out(temp_factor);
                    }
                    break;
                }

                if(temp_factor>1){
                  temp_factor=1
                }

                var point = upjson.path_node.getPointAt(upjson.path_node.length*temp_factor);


                /!*item[i].matrix.tx=point.x+(pathFrom.matrix.tx-item[0].position.x);
                item[i].matrix.ty=point.y+(pathFrom.matrix.ty-item[0].position.y);*!/
                item[i].matrix.tx=point.x+(pathFrom.matrix.tx-pathTo.matrix.tx);
                item[i].matrix.ty=point.y+(pathFrom.matrix.ty-pathTo.matrix.tx);
                item[i].rotate(pathFrom.rotation+(pathTo.rotation-pathFrom.rotation)*temp_factor,point);


                item[i].matrix.a=pathFrom.matrix.a+(pathTo.matrix.a-pathFrom.matrix.a)*temp_factor;
                item[i].matrix.b=pathFrom.matrix.b+(pathTo.matrix.b-pathFrom.matrix.b)*temp_factor;
                item[i].matrix.c=pathFrom.matrix.c+(pathTo.matrix.c-pathFrom.matrix.c)*temp_factor;
                item[i].matrix.d=pathFrom.matrix.d+(pathTo.matrix.d-pathFrom.matrix.d)*temp_factor;




              }
            }
            i++;
            playfunction(item,i,fn);*/
            if(item[i].keyframe){
              let upjson,dowjson;
              for(let ki=0;ki<item[i].keyframe.length;ki++){
                if(!upjson&&item[i].keyframe[ki].time<=that.attr.play_timestamp){
                  upjson=item[i].keyframe[ki]
                }
                if(!dowjson&&item[i].keyframe[ki].time>=that.attr.play_timestamp){
                  dowjson=item[i].keyframe[ki]
                }
                if(item[i].keyframe[ki].time<=that.attr.play_timestamp){
                  if(upjson.time<item[i].keyframe[ki].time){
                    upjson=item[i].keyframe[ki];
                  }
                }
                if(item[i].keyframe[ki].time>=that.attr.play_timestamp){
                  if(dowjson.time>item[i].keyframe[ki].time){
                    dowjson=item[i].keyframe[ki];
                  }
                }
              }

              if(upjson&&dowjson&&upjson.time!=dowjson.time){
                //item[i].importJSON(JSON.parse(upjson.exportJSON));
                var pathFrom = JSON.parse(upjson.exportJSON);
                var pathTo =JSON.parse(dowjson.exportJSON);
                pathFrom.temp_control = JSON.parse(upjson.temp_control);
                pathTo.temp_control = JSON.parse(dowjson.temp_control);

                let temp_factor = (that.attr.play_timestamp-upjson.time)/(dowjson.time-upjson.time);



                if(!upjson.path_node){
                  let node =new paper.Path.Line({
                    from: [pathFrom.center[0], pathFrom.center[1]],
                    to: [pathTo.center[0], pathTo.center[1]],
                    strokeColor: 'black',strokeWidth:1
                  });

                  node.onMouseDown = function(event) {
                    console.dir(that)
                    if(!node._curveSegments_Group){
                      that.parent.parent.parent.attr_canvas.easingview(node);
                      that.selectNode=node;
                      that.parent.parent.parent.centre_canvas.canvasDom.copySegments(node);
                      that.parent.parent.parent.centre_canvas.canvasDom.curveSegments_view(node,true,true);
                    }
                  }
                  upjson.path_node=node;
                }
                if(that.parent.parent.left.head.anim){
                  upjson.path_node.visible = false;
                  if(upjson.path_node._curveSegments_Group){
                    upjson.path_node._curveSegments_Group.visible = false;
                  }
                }else{
                  upjson.path_node.visible = true;
                  if(upjson.path_node._curveSegments_Group){
                    upjson.path_node._curveSegments_Group.visible = true;
                  }
                }
                switch (upjson.path_node.Easingtype) {
                  case 'Linear':
                    //temp_factor= TWEEN.Easing.Linear.InOut(temp_factor);
                    break;
                  case 'Quadratic':
                    if(upjson.path_node.EasingIN&&upjson.path_node.EasingOUT){
                      temp_factor= TWEEN.Easing.Quadratic.InOut(temp_factor);
                    }else if(upjson.path_node.EasingIN){
                      temp_factor= TWEEN.Easing.Quadratic.In(temp_factor);
                    }else if(upjson.path_node.EasingOUT){
                      temp_factor= TWEEN.Easing.Quadratic.Out(temp_factor);
                    }
                    break;
                  case 'Cubic':
                    if(upjson.path_node.EasingIN&&upjson.path_node.EasingOUT){
                      temp_factor= TWEEN.Easing.Cubic.InOut(temp_factor);
                    }else if(upjson.path_node.EasingIN){
                      temp_factor= TWEEN.Easing.Cubic.In(temp_factor);
                    }else if(upjson.path_node.EasingOUT){
                      temp_factor= TWEEN.Easing.Cubic.Out(temp_factor);
                    }
                    break;
                  case 'Quartic':
                    if(upjson.path_node.EasingIN&&upjson.path_node.EasingOUT){
                      temp_factor= TWEEN.Easing.Quartic.InOut(temp_factor);
                    }else if(upjson.path_node.EasingIN){
                      temp_factor= TWEEN.Easing.Quartic.In(temp_factor);
                    }else if(upjson.path_node.EasingOUT){
                      temp_factor= TWEEN.Easing.Quartic.Out(temp_factor);
                    }
                    break;
                  case 'Quintic':
                    if(upjson.path_node.EasingIN&&upjson.path_node.EasingOUT){
                      temp_factor= TWEEN.Easing.Quintic.InOut(temp_factor);
                    }else if(upjson.path_node.EasingIN){
                      temp_factor= TWEEN.Easing.Quintic.In(temp_factor);
                    }else if(upjson.path_node.EasingOUT){
                      temp_factor= TWEEN.Easing.Quintic.Out(temp_factor);
                    }
                    break;
                  case 'Sinusoidal':
                    if(upjson.path_node.EasingIN&&upjson.path_node.EasingOUT){
                      temp_factor= TWEEN.Easing.Sinusoidal.InOut(temp_factor);
                    }else if(upjson.path_node.EasingIN){
                      temp_factor= TWEEN.Easing.Sinusoidal.In(temp_factor);
                    }else if(upjson.path_node.EasingOUT){
                      temp_factor= TWEEN.Easing.Sinusoidal.Out(temp_factor);
                    }
                    break;
                  case 'Exponential':
                    if(upjson.path_node.EasingIN&&upjson.path_node.EasingOUT){
                      temp_factor= TWEEN.Easing.Exponential.InOut(temp_factor);
                    }else if(upjson.path_node.EasingIN){
                      temp_factor= TWEEN.Easing.Exponential.In(temp_factor);
                    }else if(upjson.path_node.EasingOUT){
                      temp_factor= TWEEN.Easing.Exponential.Out(temp_factor);
                    }
                    break;
                  case 'Circular':
                    if(upjson.path_node.EasingIN&&upjson.path_node.EasingOUT){
                      temp_factor= TWEEN.Easing.Circular.InOut(temp_factor);
                    }else if(upjson.path_node.EasingIN){
                      temp_factor= TWEEN.Easing.Circular.In(temp_factor);
                    }else if(upjson.path_node.EasingOUT){
                      temp_factor= TWEEN.Easing.Circular.Out(temp_factor);
                    }
                    break;
                  case 'Elastic':
                    if(upjson.path_node.EasingIN&&upjson.path_node.EasingOUT){
                      temp_factor= TWEEN.Easing.Elastic.InOut(temp_factor);
                    }else if(upjson.path_node.EasingIN){
                      temp_factor= TWEEN.Easing.Elastic.In(temp_factor);
                    }else if(upjson.path_node.EasingOUT){
                      temp_factor= TWEEN.Easing.Elastic.Out(temp_factor);
                    }
                    break;
                  case 'Back':
                    if(upjson.path_node.EasingIN&&upjson.path_node.EasingOUT){
                      temp_factor= TWEEN.Easing.Back.InOut(temp_factor);
                    }else if(upjson.path_node.EasingIN){
                      temp_factor= TWEEN.Easing.Back.In(temp_factor);
                    }else if(upjson.path_node.EasingOUT){
                      temp_factor= TWEEN.Easing.Back.Out(temp_factor);
                    }
                    break;
                  case 'Bounce':
                    if(upjson.path_node.EasingIN&&upjson.path_node.EasingOUT){
                      temp_factor= TWEEN.Easing.Bounce.InOut(temp_factor);
                    }else if(upjson.path_node.EasingIN){
                      temp_factor= TWEEN.Easing.Bounce.In(temp_factor);
                    }else if(upjson.path_node.EasingOUT){
                      temp_factor= TWEEN.Easing.Bounce.Out(temp_factor);
                    }
                    break;
                }

                if(temp_factor>1){
                  temp_factor=1
                }

                var point = upjson.path_node.getPointAt(upjson.path_node.length*temp_factor);

                /*if(item[i].className=='Group'&&pathFrom.className=='Group'&&pathFrom.className=='Group'){
                  for(let gi=0;gi<item[i].children.length;gi++){
                    if(item[i].children[gi].className!='Raster'){
                      item[i].children[gi].interpolate(pathFrom.children[gi], pathTo.children[gi], temp_factor);
                      item[i].position.x=point.x;
                      item[i].position.y=point.y;
                    }else{
                      item[i].children[gi].matrix.tx=point.x+(pathFrom.children[gi].matrix.tx-pathFrom.children[0].position.x);
                      item[i].children[gi].matrix.ty=point.y+(pathFrom.children[gi].matrix.ty-pathFrom.children[0].position.y);
                      item[i].children[gi].rotate(pathFrom.children[gi].rotation+(pathTo.children[gi].rotation-pathFrom.children[gi].rotation)*temp_factor,point);


                      item[i].children[gi].matrix.a=pathFrom.children[gi].matrix.a+(pathTo.children[gi].matrix.a-pathFrom.children[gi].matrix.a)*temp_factor;
                      item[i].children[gi].matrix.b=pathFrom.children[gi].matrix.b+(pathTo.children[gi].matrix.b-pathFrom.children[gi].matrix.b)*temp_factor;
                      item[i].children[gi].matrix.c=pathFrom.children[gi].matrix.c+(pathTo.children[gi].matrix.c-pathFrom.children[gi].matrix.c)*temp_factor;
                      item[i].children[gi].matrix.d=pathFrom.children[gi].matrix.d+(pathTo.children[gi].matrix.d-pathFrom.children[gi].matrix.d)*temp_factor;


                      //item[i].children[gi].rotation=pathFrom.children[gi].rotation+(pathTo.children[gi].rotation-pathFrom.children[gi].rotation)*temp_factor;
                      /!*item[i].children[gi].position.x=point.x;
                      item[i].children[gi].position.y=point.y;*!/
                    }
                  }
                }else{
                  item[i].interpolate(pathFrom, pathTo, temp_factor);
                  item[i].position.x=point.x;
                  item[i].position.y=point.y;
                }*/

                //item[i].interpolate(pathFrom, pathTo, temp_factor);

                /*item[i].matrix.scaling.x
                item[i].matrix.scaling.y*/
                item[i].scale(
                  1/item[i].matrix.scaling.x*0.5,
                  1/item[i].matrix.scaling.y*0.5);
                item[i].scale(
                  pathFrom.w+(pathTo.w-pathFrom.w)*temp_factor,
                  pathFrom.h+(pathTo.h-pathFrom.h)*temp_factor);
                item[i].rotate(pathFrom.angle+(pathTo.angle-pathFrom.angle)*temp_factor);
                // node.position.x=node.position.x+temp_control.x;
                // node.position.y=node.position.y+temp_control.y;
                item[i].position.x=point.x;
                item[i].position.y=point.y;


              }else{
                if(upjson&&!dowjson){
                  var pathFrom = JSON.parse(upjson.exportJSON);
                  item[i].scale(
                    1/item[i].matrix.scaling.x*0.5,
                    1/item[i].matrix.scaling.y*0.5);
                  item[i].scale(
                    pathFrom.w,
                    pathFrom.h);
                  item[i].rotate(pathFrom.angle);
                  item[i].position.x=pathFrom.center[0];
                  item[i].position.y=pathFrom.center[1];
                }
              }
            }
            i++;
            playfunction(item,i,fn);


          }else if(item[i].className=='Group'){
            playfunction(item[i].children,0,function () {
              if(item[i].keyframe){
                let upjson,dowjson;
                for(let ki=0;ki<item[i].keyframe.length;ki++){
                  if(!upjson&&item[i].keyframe[ki].time<=that.attr.play_timestamp){
                    upjson=item[i].keyframe[ki]
                  }
                  if(!dowjson&&item[i].keyframe[ki].time>=that.attr.play_timestamp){
                    dowjson=item[i].keyframe[ki]
                  }
                  if(item[i].keyframe[ki].time<=that.attr.play_timestamp){
                    if(upjson.time<item[i].keyframe[ki].time){
                      upjson=item[i].keyframe[ki];
                    }
                  }
                  if(item[i].keyframe[ki].time>=that.attr.play_timestamp){
                    if(dowjson.time>item[i].keyframe[ki].time){
                      dowjson=item[i].keyframe[ki];
                    }
                  }
                }

                if(upjson&&dowjson&&upjson.time!=dowjson.time){
                  //item[i].importJSON(JSON.parse(upjson.exportJSON));
                  var pathFrom = JSON.parse(upjson.exportJSON);
                  var pathTo =JSON.parse(dowjson.exportJSON);
                  pathFrom.temp_control = JSON.parse(upjson.temp_control);
                  pathTo.temp_control = JSON.parse(dowjson.temp_control);

                  let temp_factor = (that.attr.play_timestamp-upjson.time)/(dowjson.time-upjson.time);



                  if(!upjson.path_node){
                    let node =new paper.Path.Line({
                      from: [pathFrom.center[0], pathFrom.center[1]],
                      to: [pathTo.center[0], pathTo.center[1]],
                      strokeColor: 'black',strokeWidth:1
                    });

                    node.onMouseDown = function(event) {
                      console.dir(that)
                      if(!node._curveSegments_Group){
                        that.parent.parent.parent.attr_canvas.easingview(node);
                        that.selectNode=node;
                        that.parent.parent.parent.centre_canvas.canvasDom.copySegments(node);
                        that.parent.parent.parent.centre_canvas.canvasDom.curveSegments_view(node,true,true);
                      }
                    }
                    upjson.path_node=node;
                  }
                  if(that.parent.parent.left.head.anim){
                    upjson.path_node.visible = false;
                    if(upjson.path_node._curveSegments_Group){
                      upjson.path_node._curveSegments_Group.visible = false;
                    }
                  }else{
                    upjson.path_node.visible = true;
                    if(upjson.path_node._curveSegments_Group){
                      upjson.path_node._curveSegments_Group.visible = true;
                    }
                  }
                  switch (upjson.path_node.Easingtype) {
                    case 'Linear':
                      //temp_factor= TWEEN.Easing.Linear.InOut(temp_factor);
                      break;
                    case 'Quadratic':
                      if(upjson.path_node.EasingIN&&upjson.path_node.EasingOUT){
                        temp_factor= TWEEN.Easing.Quadratic.InOut(temp_factor);
                      }else if(upjson.path_node.EasingIN){
                        temp_factor= TWEEN.Easing.Quadratic.In(temp_factor);
                      }else if(upjson.path_node.EasingOUT){
                        temp_factor= TWEEN.Easing.Quadratic.Out(temp_factor);
                      }
                      break;
                    case 'Cubic':
                      if(upjson.path_node.EasingIN&&upjson.path_node.EasingOUT){
                        temp_factor= TWEEN.Easing.Cubic.InOut(temp_factor);
                      }else if(upjson.path_node.EasingIN){
                        temp_factor= TWEEN.Easing.Cubic.In(temp_factor);
                      }else if(upjson.path_node.EasingOUT){
                        temp_factor= TWEEN.Easing.Cubic.Out(temp_factor);
                      }
                      break;
                    case 'Quartic':
                      if(upjson.path_node.EasingIN&&upjson.path_node.EasingOUT){
                        temp_factor= TWEEN.Easing.Quartic.InOut(temp_factor);
                      }else if(upjson.path_node.EasingIN){
                        temp_factor= TWEEN.Easing.Quartic.In(temp_factor);
                      }else if(upjson.path_node.EasingOUT){
                        temp_factor= TWEEN.Easing.Quartic.Out(temp_factor);
                      }
                      break;
                    case 'Quintic':
                      if(upjson.path_node.EasingIN&&upjson.path_node.EasingOUT){
                        temp_factor= TWEEN.Easing.Quintic.InOut(temp_factor);
                      }else if(upjson.path_node.EasingIN){
                        temp_factor= TWEEN.Easing.Quintic.In(temp_factor);
                      }else if(upjson.path_node.EasingOUT){
                        temp_factor= TWEEN.Easing.Quintic.Out(temp_factor);
                      }
                      break;
                    case 'Sinusoidal':
                      if(upjson.path_node.EasingIN&&upjson.path_node.EasingOUT){
                        temp_factor= TWEEN.Easing.Sinusoidal.InOut(temp_factor);
                      }else if(upjson.path_node.EasingIN){
                        temp_factor= TWEEN.Easing.Sinusoidal.In(temp_factor);
                      }else if(upjson.path_node.EasingOUT){
                        temp_factor= TWEEN.Easing.Sinusoidal.Out(temp_factor);
                      }
                      break;
                    case 'Exponential':
                      if(upjson.path_node.EasingIN&&upjson.path_node.EasingOUT){
                        temp_factor= TWEEN.Easing.Exponential.InOut(temp_factor);
                      }else if(upjson.path_node.EasingIN){
                        temp_factor= TWEEN.Easing.Exponential.In(temp_factor);
                      }else if(upjson.path_node.EasingOUT){
                        temp_factor= TWEEN.Easing.Exponential.Out(temp_factor);
                      }
                      break;
                    case 'Circular':
                      if(upjson.path_node.EasingIN&&upjson.path_node.EasingOUT){
                        temp_factor= TWEEN.Easing.Circular.InOut(temp_factor);
                      }else if(upjson.path_node.EasingIN){
                        temp_factor= TWEEN.Easing.Circular.In(temp_factor);
                      }else if(upjson.path_node.EasingOUT){
                        temp_factor= TWEEN.Easing.Circular.Out(temp_factor);
                      }
                      break;
                    case 'Elastic':
                      if(upjson.path_node.EasingIN&&upjson.path_node.EasingOUT){
                        temp_factor= TWEEN.Easing.Elastic.InOut(temp_factor);
                      }else if(upjson.path_node.EasingIN){
                        temp_factor= TWEEN.Easing.Elastic.In(temp_factor);
                      }else if(upjson.path_node.EasingOUT){
                        temp_factor= TWEEN.Easing.Elastic.Out(temp_factor);
                      }
                      break;
                    case 'Back':
                      if(upjson.path_node.EasingIN&&upjson.path_node.EasingOUT){
                        temp_factor= TWEEN.Easing.Back.InOut(temp_factor);
                      }else if(upjson.path_node.EasingIN){
                        temp_factor= TWEEN.Easing.Back.In(temp_factor);
                      }else if(upjson.path_node.EasingOUT){
                        temp_factor= TWEEN.Easing.Back.Out(temp_factor);
                      }
                      break;
                    case 'Bounce':
                      if(upjson.path_node.EasingIN&&upjson.path_node.EasingOUT){
                        temp_factor= TWEEN.Easing.Bounce.InOut(temp_factor);
                      }else if(upjson.path_node.EasingIN){
                        temp_factor= TWEEN.Easing.Bounce.In(temp_factor);
                      }else if(upjson.path_node.EasingOUT){
                        temp_factor= TWEEN.Easing.Bounce.Out(temp_factor);
                      }
                      break;
                  }

                  if(temp_factor>1){
                    temp_factor=1
                  }

                  var point = upjson.path_node.getPointAt(upjson.path_node.length*temp_factor);

                  /*if(item[i].className=='Group'&&pathFrom.className=='Group'&&pathFrom.className=='Group'){
                    for(let gi=0;gi<item[i].children.length;gi++){
                      if(item[i].children[gi].className!='Raster'){
                        item[i].children[gi].interpolate(pathFrom.children[gi], pathTo.children[gi], temp_factor);
                        item[i].position.x=point.x;
                        item[i].position.y=point.y;
                      }else{
                        item[i].children[gi].matrix.tx=point.x+(pathFrom.children[gi].matrix.tx-pathFrom.children[0].position.x);
                        item[i].children[gi].matrix.ty=point.y+(pathFrom.children[gi].matrix.ty-pathFrom.children[0].position.y);
                        item[i].children[gi].rotate(pathFrom.children[gi].rotation+(pathTo.children[gi].rotation-pathFrom.children[gi].rotation)*temp_factor,point);


                        item[i].children[gi].matrix.a=pathFrom.children[gi].matrix.a+(pathTo.children[gi].matrix.a-pathFrom.children[gi].matrix.a)*temp_factor;
                        item[i].children[gi].matrix.b=pathFrom.children[gi].matrix.b+(pathTo.children[gi].matrix.b-pathFrom.children[gi].matrix.b)*temp_factor;
                        item[i].children[gi].matrix.c=pathFrom.children[gi].matrix.c+(pathTo.children[gi].matrix.c-pathFrom.children[gi].matrix.c)*temp_factor;
                        item[i].children[gi].matrix.d=pathFrom.children[gi].matrix.d+(pathTo.children[gi].matrix.d-pathFrom.children[gi].matrix.d)*temp_factor;


                        //item[i].children[gi].rotation=pathFrom.children[gi].rotation+(pathTo.children[gi].rotation-pathFrom.children[gi].rotation)*temp_factor;
                        /!*item[i].children[gi].position.x=point.x;
                        item[i].children[gi].position.y=point.y;*!/
                      }
                    }
                  }else{
                    item[i].interpolate(pathFrom, pathTo, temp_factor);
                    item[i].position.x=point.x;
                    item[i].position.y=point.y;
                  }*/

                  //item[i].interpolate(pathFrom, pathTo, temp_factor);

                  item[i].scale(
                    pathFrom.w+(pathTo.w-pathFrom.w)*temp_factor,
                    pathFrom.h+(pathTo.h-pathFrom.h)*temp_factor);
                  item[i].rotate(pathFrom.angle+(pathTo.angle-pathFrom.angle)*temp_factor);
                  // node.position.x=node.position.x+temp_control.x;
                  // node.position.y=node.position.y+temp_control.y;
                  item[i].position.x=point.x;
                  item[i].position.y=point.y;


                }else{
                  if(upjson&&!dowjson){
                    var pathFrom = JSON.parse(upjson.exportJSON);
                    item[i].scale(
                      pathFrom.w,
                      pathFrom.h);
                    item[i].rotate(pathFrom.angle);
                    item[i].position.x=pathFrom.center[0];
                    item[i].position.y=pathFrom.center[1];
                  }
                }
              }
              i++;
              playfunction(item,i,fn);
            })
          }
        }else{
          if(fn){
            fn();
          }
        }
      }
      playfunction(that.parent.parent.parent.centre_canvas.group.children,0)
    }

  }

  signal(){
    let that = this;

    //绘制添加刻度
    that.add_graduations();
    /*绘制重点指针*/
    that.endPointer();
    that.playPointer();
    that.draw();
  }

  draw(){
    this.layer.draw();
  }
  drawCell(isclick,node){
    let that = this;
    let rect = new Konva.Rect({
      x: 0,
      y: 0,
      width: that.width,
      height:that.height,
      opacity: 1
    });
    this.layer.add( rect );
    if(!that.attr){
      that.attr={
        minutes_per_step:[
          0.0166666666666666666666/9,
          0.0166666666666666666666/8,
          0.0166666666666666666666/7,
          0.0166666666666666666666/6,
          0.0166666666666666666666/5,
          0.0166666666666666666666/4,
          0.0166666666666666666666/3,
          0.0166666666666666666666/2,
          0.0166666666666666666666,
          0.0166666666666666666666*2,
          0.0166666666666666666666*3,
          0.0166666666666666666666*4,
          0.0166666666666666666666*5,
          0.0166666666666666666666*6,
          0.0166666666666666666666*7,
          0.0166666666666666666666*8,
          0.0166666666666666666666*9
          //1, 2, 5, 10, 15, 20, 30, 60, 120, 180, 240, 360, 720, 1440
        ],
        graduation_step : 6,//刻度间最小宽度，单位px
        ms_per_ruler :0.0166666666666666666666/2,//时间轴显示24小时
        start_timestamp : new Date("2018-08-08 00:00:00").getTime(),
        play_timestamp : new Date("2018-08-08 00:00:00").getTime(),
        end_timestamp : new Date("2018-08-08 00:00:25").getTime(),
        distance_between_gtitle : 80,
        zoom : 0.0166666666666666666666,
        g_isMousedown : false,//拖动mousedown标记
        g_isMousemove : false,//拖动mousemove标记
        g_mousedownCursor : null,//拖动mousedown的位置
        returnTime : null,//mouseup返回时间

        oldstart_timestamp : undefined,
        temp_time : undefined,
        //beginX : canvansW/2,
      };
    }
    that.attr_draw(node);
    that.signal();
    /*if(that.parent&&that.parent.parent.left.head.anim){
      that.tween_playgroup();
    }else{*/
      that.playgroup();
    //}

    rect.on('mousedown',function(e){
      let canvansW = that.width-8;
      let ms_per_ruler=that.attr.ms_per_ruler;
      var px_per_ms = canvansW / (ms_per_ruler*60*60 * 1000); // px/ms 毫秒
      that.attr.play_timestamp=that.attr.start_timestamp+(e.evt.layerX-8)/px_per_ms;
      //console.dir(that.attr);
      that.layer.destroyChildren();
      that.drawCell(true);
    });
  }
  attr_draw(node){
    let that = this;
    //console.dir(that);
    //canvasDom
    if(that.parent){
     // console.dir(that.parent.parent.parent.centre_canvas.group);
      //========
      for(let groupi=0;groupi<that.parent.parent.parent.centre_canvas.group.children.length;groupi++){
        if(that.parent.parent.parent.centre_canvas.group.children[groupi].name!="displayLine"){
          var group = new Konva.Group({
            //draggable: true
          });
          let stroke='#338efa';
          let fill='#e0ecf0';
          if(node){
            that.selectnode=node;
          }else{
            if(that.selectnode){
              node=that.selectnode;
            }
          }
          if(node&&that.parent.parent.parent.centre_canvas.group.children[groupi]==node){
            stroke='#338efa';
            fill='#e0ecf0';
          }else{
            stroke='#bfbfbf';
            fill='#f3f3f3';
          }
          let list_group_body = new Konva.Rect({
            x: 8,
            y: 28+(groupi-1)*30,
            width: that.width-8,
            height: 30,
            stroke:stroke,
            strokeWidth: 1,
            fill: fill,
          });
          group.add(list_group_body);
          if(that.parent.parent.parent.centre_canvas.group.children[groupi].keyframe){
            for(let kf=0;kf<that.parent.parent.parent.centre_canvas.group.children[groupi].keyframe.length;kf++){
              //console.dir(up.content_body_canvasTimeLine.right.head.attr.play_timestamp);
              let canvansW = up.content_body_canvasTimeLine.right.head.width-8;
              let ms_per_ruler=up.content_body_canvasTimeLine.right.head.attr.ms_per_ruler;
              var px_per_ms = canvansW / (ms_per_ruler*60*60 * 1000); // px/ms 毫秒
              let temp_group_x =(that.parent.parent.parent.centre_canvas.group.children[groupi].keyframe[kf].time-up.content_body_canvasTimeLine.right.head.attr.start_timestamp)*px_per_ms;
              if(temp_group_x>=0){
                let temp_x=8+temp_group_x;
                that.parent.parent.parent.centre_canvas.group.children[groupi].keyframe[kf].framedom =  new Konva.Rect({
                  x: temp_x,
                  y: 28+(groupi-1)*30+11,
                  width: 8,
                  height: 8,
                  stroke:'#77abf6',
                  strokeWidth: 2,
                  fill: '#5e5e5e',
                  draggable: true
                });
                that.parent.parent.parent.centre_canvas.group.children[groupi].keyframe[kf].framedom.rotate(45);
                group.add(that.parent.parent.parent.centre_canvas.group.children[groupi].keyframe[kf].framedom);
                //==
               /* that.parent.parent.parent.centre_canvas.group.children[groupi].keyframe[kf].framedom.onMouseDrag = function(event) {

                };*/

                that.parent.parent.parent.centre_canvas.group.children[groupi].keyframe[kf].framedom.on( 'xChange', function (e) {
                  console.dir(e)
                  console.dir(e.newVal)
                  console.dir(e.newVal/px_per_ms+up.content_body_canvasTimeLine.right.head.attr.start_timestamp)
                  console.dir(that.parent.parent.parent.centre_canvas.group.children[groupi].keyframe[kf].time)
                  that.parent.parent.parent.centre_canvas.group.children[groupi].keyframe[kf].time=
                    e.newVal/px_per_ms+up.content_body_canvasTimeLine.right.head.attr.start_timestamp;
                });

                that.parent.parent.parent.centre_canvas.group.children[groupi].keyframe[kf].framedom.dragBoundFunc(function(pos){
                  console.dir(pos);
                  /*if(pos.x<8){
                    pos.x=8
                  }
                  if(pos.x+(that.width-8-320)*tempbl>that.width+8-320){
                    pos.x=that.width+8-320-(that.width-8-320)*tempbl;
                  }*/
                  return {
                    x: pos.x,
                    y: this.absolutePosition().y
                  };
                });
                //==
              }
            }
          }



          that.layer.add( group );
          group.node=that.parent.parent.parent.centre_canvas.group.children[groupi];
          /*group.dragBoundFunc(function(pos){
            console.dir(pos);
            /!*if(pos.x<8){
              pos.x=8
            }
            if(pos.x+(that.width-8-320)*tempbl>that.width+8-320){
              pos.x=that.width+8-320-(that.width-8-320)*tempbl;
            }*!/
            return {
              x: pos.x,
              y: this.absolutePosition().y
            };
          });*/
          list_group_body.on('mousedown',function (ee) {
            //that.parent.parent.parent.centre_canvas.canvasDom.eventNode(ee.target.parent.node,'nodeDrag');

            for(let gi=0;gi<that.parent.parent.parent.centre_canvas.group.children.length;gi++){
              if(that.parent.parent.parent.centre_canvas.group.children[gi]._node_Group){
                that.parent.parent.parent.centre_canvas.group.children[gi]._node_Group.remove();
              }
              if(that.parent.parent.parent.centre_canvas.group.children[gi]._curveSegments_Group){
                that.parent.parent.parent.centre_canvas.group.children[gi]._curveSegments_Group.remove();
              }
              if(that.parent.parent.parent.centre_canvas.group.children[gi].addSegmentscircle){
                that.parent.parent.parent.centre_canvas.group.children[gi].addSegmentscircle.remove();
              }
            }
            that.parent.parent.parent.centre_canvas.canvasDom.selectNode=ee.target.parent.node;
            console.dir(ee.target.parent.node.name)
            if(that.parent.parent.parent.tools_canvas.attr.selectitem==2){
              that.parent.parent.parent.centre_canvas.canvasDom.copySegments(node);
              that.parent.parent.parent.centre_canvas.canvasDom.curveSegments_view(node,true,true);
            }else {
              that.parent.parent.parent.centre_canvas.canvasDom.eventNode(ee.target.parent.node,'nodeDrag');
            }
            that.parent.parent.refresh(ee.target.parent.node);
            let canvansW = that.width-8;
            let ms_per_ruler=that.attr.ms_per_ruler;
            var px_per_ms = canvansW / (ms_per_ruler*60*60 * 1000); // px/ms 毫秒
            that.attr.play_timestamp=that.attr.start_timestamp+(ee.evt.layerX-8)/px_per_ms;
            //console.dir(that.attr);
            that.layer.destroyChildren();
            that.drawCell(true);
            //that.refresh(ee.target.parent.node);
          });
          /*group.on('dragstart',function(e){
            console.dir('dragstart')
          });
          group.on('dragmove',function(e){
          });
          group.on('dragend',function(e){
            console.dir('dragend')
            console.dir(e)
            console.dir(e.evt.offsetX)
            console.dir(e.evt.offsetY)
            console.dir(e.evt.layerX)
            console.dir(e.evt.layerY)
            console.dir(e.target)
          });*/

        }
      }

      //========
    }

  }


}
class Content_body_canvasTimeLine_right_foot extends ContentCanvas{
  constructor(container='content_body_canvasTimeLine_right_foot_div',strokeColor='#bcbcbc',parent){
    super(container,strokeColor,parent);
  }
  drawCell(){
    let that = this;
    that.draw_back_line();
    that.scroll();
    that.zoom();
  }
  draw_back_line(){
    let that = this;
    const list_grop_stroke='#bcbcbc';
    const list_grop_strokeWidth=0.5;
    let list_group_time_foot = new Konva.Rect({
      x: 8,
      y: 4,
      width: that.width-320,//12
      height: that.height-8,
      stroke: list_grop_stroke,
      strokeWidth: list_grop_strokeWidth,
    });
    that.layer.add( list_group_time_foot );
  }
  scroll(){
    let that = this;
    const list_grop_width=0;
    const list_grop_strokeWidth=0.5;
    let tempbl=0.5;
    let rect = new Konva.Rect({
      x: list_grop_width+8,
      y: 6,
      width: (that.width-320-8)*tempbl,
      height: that.height-12,
      fill: '#c8c8c8',
      stroke: '#404040',
      strokeWidth: list_grop_strokeWidth,
      draggable: true,
      opacity: 1
    });
    this.layer.add( rect );
    rect.on( 'xChange', function (e) {

      let temp_item =Math.abs((e.newVal-8)/
        ((that.width-320)-(that.width-8-320)*tempbl-8));
      let tempSTIME=new Date("2018-08-08 00:00:00").getTime();
      let tempEndTime=new Date("2018-08-08 00:10:00").getTime();
      if(that.parent.head.attr.start_timestamp!=tempSTIME+parseInt((tempEndTime-tempSTIME)*temp_item))
        that.parent.head.layer.destroyChildren();
      that.parent.head.attr.start_timestamp=tempSTIME+parseInt((tempEndTime-tempSTIME)*temp_item);
      //that.parent.head.signal();
      that.parent.head.drawCell(true);
    });

    rect.dragBoundFunc(function(pos){
      if(pos.x<8){
        pos.x=8
      }
      if(pos.x+(that.width-8-320)*tempbl>that.width+8-320){
        pos.x=that.width+8-320-(that.width-8-320)*tempbl;
      }
      return {
        x: pos.x,
        y: this.absolutePosition().y
      };
    });


  }
  zoom(){
    let that = this;
    const list_grop_stroke='#bcbcbc';
    const list_grop_strokeWidth=0.5;
    var line = new Konva.Line({
      points: [that.width-220, that.height/2,
        that.width-60, that.height/2],
      stroke: list_grop_stroke,
      strokeWidth: list_grop_strokeWidth,
    });
    this.layer.add( line );
    let tempbl=(220-60)*0.5
    let rect = new Konva.Rect({
      x: that.width-220+tempbl,
      y: 4,
      width: 12,
      height: that.height-8,
      fill: '#808080',
      stroke: '#bcbcbc',
      draggable: true,
      opacity: 0.5
    });
    //绑定事件 Konva支持事件：mouseover, mouseout, mouseenter, mouseleave, mousemove, mousedown, mouseup, mousewheel, click, dblclick, dragstart, dragmove, and dragend

    /*
    * //绑定多个事件
      rect.on('click mousemove',function(e){
      });
      //解除绑定事件
      rect.off('click');             //这不是jQuery吗？
      //触发事件
      rect.fire('click');
      //取消事件冒泡
      rect.on('click', function(evt) {
        alert('You clicked the circle!');
        evt.cancelBubble = true;      //取消事件冒泡
      });
    */


    that.layer.add( rect );
    rect.on( 'xChange', function (e) {
      let temp_item =parseInt(Math.abs((that.width-220-e.newVal)/(220-60))*that.parent.head.attr.minutes_per_step.length-1);
      console.dir(temp_item)
      if(temp_item<0){
        temp_item=0;
      }
      if(that.parent.head.attr.ms_per_ruler!=that.parent.head.attr.minutes_per_step[temp_item]){
        that.parent.head.layer.destroyChildren();
        that.parent.head.attr.ms_per_ruler=that.parent.head.attr.minutes_per_step[temp_item];
        //that.parent.head.signal();
        that.parent.head.drawCell(true);
      }


    });

    rect.dragBoundFunc(function(pos){

      if(pos.x<that.width-220){
        pos.x=that.width-220
      }
      if(pos.x>that.width-60){
        pos.x=that.width-60
      }

      return {
        x: pos.x,
        y: this.absolutePosition().y
      };
    });
  }
}
class Content_body_canvasTimeLine_right_body extends ContentCanvas{
  constructor(container='content_body_canvasTimeLine_right_body_div',strokeColor='#bcbcbc',parent){
    super(container,strokeColor,parent);
  }
  drawBorderline(){
    let that = this;
    let temp_left=8;
    let list_group_body = new Konva.Rect({
      x: temp_left,
      y: 0,
      width: that.width-temp_left,
      height: that.height,
      stroke: that.strokeColor,
      strokeWidth: 1,
      fill: '#ffffff',
    });
    this.layer.add( list_group_body );
  }
}
/*时间轴*/
class Content_body_canvasTimeLine{
  constructor(parent){
    this.left=new Content_body_canvasTimeLine_left_canvas();
    this.right=new Content_body_canvasTimeLine_right_canvas();
    this.parent=parent;
    this.left.parent=this;
    this.right.parent=this;
  }
  refresh(node){
    let that = this;
    that.parent.centre_canvas.canvasDom.selectnode=node;
    let list_back_body = new Konva.Rect({
      x: 0,
      y: 0,
      width: that.left.body.width,
      height: that.left.body.height,
      stroke: that.left.body.strokeColor,
      strokeWidth: 1,
      fill: '#f8f8f8',
    });
    that.left.body.layer.add( list_back_body );
    if(!node&&that.parent.centre_canvas.group.children.length>=1){
      node = that.parent.centre_canvas.group.children[1];
    }
    for(let groupi=0;groupi<that.parent.centre_canvas.group.children.length;groupi++){
      if(that.parent.centre_canvas.group.children[groupi].name!="displayLine"){
        var group = new Konva.Group({
          draggable: true
        });
        let stroke='#338efa';
        let fill='#fff';
        if(that.parent.centre_canvas.group.children[groupi]==node){
           stroke='#338efa';
           fill='#fff';
        }else{
          stroke='#bfbfbf';
          fill='#f3f3f3';
        }
        let list_group_body = new Konva.Rect({
          x: 0,
          y: (groupi-1)*30,
          width: that.left.body.width,
          height: 30,
          stroke:stroke,
          strokeWidth: 1,
          fill: fill,
        });
        var text = new Konva.Text({
          x: that.left.body.width/4,
          y: 15+(groupi-1)*30,
          text: that.parent.centre_canvas.group.children[groupi].name,
          fontSize: 15,
          fontFamily: 'Calibri',
          fill: '#555555'
        });
        group.add(list_group_body,text);
        that.left.body.layer.add( group );
        group.node=that.parent.centre_canvas.group.children[groupi];
        group.on('mousedown',function (ee) {
          for(let gi=0;gi<that.parent.centre_canvas.group.children.length;gi++){
            if(that.parent.centre_canvas.group.children[gi]._node_Group){
              that.parent.centre_canvas.group.children[gi]._node_Group.remove();
            }
            if(that.parent.centre_canvas.group.children[gi]._curveSegments_Group){
              that.parent.centre_canvas.group.children[gi]._curveSegments_Group.remove();
            }
            if(that.parent.centre_canvas.group.children[gi].addSegmentscircle){
              that.parent.centre_canvas.group.children[gi].addSegmentscircle.remove();
            }
          }
          //that.parent.centre_canvas.canvasDom.eventNode(ee.target.parent.node,'nodeDrag');

          if(that.parent.tools_canvas.attr.selectitem==2){
            that.parent.centre_canvas.canvasDom.copySegments(node);
            that.parent.centre_canvas.canvasDom.curveSegments_view(node,true,true);
          }else {
            that.parent.centre_canvas.canvasDom.eventNode(ee.target.parent.node,'nodeDrag');
          }

          that.refresh(ee.target.parent.node);
        });
        group.on('dragstart',function(e){
          console.dir('dragstart')
        });
        group.on('dragmove',function(e){
        });
        group.on('dragend',function(e){
          console.dir('dragend')
          console.dir(e)
          console.dir(e.evt.offsetX)
          console.dir(e.evt.offsetY)
          console.dir(e.evt.layerX)
          console.dir(e.evt.layerY)
          console.dir(e.target)
          let itemid=0;
          for(let grpi=0;grpi<that.parent.centre_canvas.group.children.length;grpi++){
            if(that.parent.centre_canvas.group.children[grpi]==e.target.node){
              itemid=grpi;
            }
          }
          for(let grpi=0;grpi<that.parent.centre_canvas.group.children.length;grpi++){
            if(that.parent.centre_canvas.group.children[grpi].name!="displayLine"){
               if(e.evt.offsetY>=(grpi-1)*30&&e.evt.offsetY<(grpi-1)*30+30){
                 console.dir(that.parent.centre_canvas.group.children[grpi])
                 if(grpi>itemid){
                   that.parent.centre_canvas.group.children[grpi].insertBelow(e.target.node);
                 }else{
                   that.parent.centre_canvas.group.children[grpi].insertAbove(e.target.node);
                 }
                 break;
               }
            }
          }
          that.refresh(e.target.node);
        });

      }
    }
    that.left.body.layer.draw();
    that.right.head.layer.destroyChildren();
    that.right.head.drawCell(true,node)
    //绑定事件 Konva支持事件：mouseover, mouseout, mouseenter, mouseleave, mousemove, mousedown, mouseup, mousewheel, click, dblclick, dragstart, dragmove, and dragend

    /*
    * //绑定多个事件
      rect.on('click mousemove',function(e){
      });
      //解除绑定事件
      rect.off('click');             //这不是jQuery吗？
      //触发事件
      rect.fire('click');
      //取消事件冒泡
      rect.on('click', function(evt) {
        alert('You clicked the circle!');
        evt.cancelBubble = true;      //取消事件冒泡
      });
    */
  }
}

/*================================================================*/
class Content_body_left_tools_canvas extends ContentCanvas{
  constructor(container='content_body_left_tools_div',strokeColor='#bcbcbc',parent){
    super(container,strokeColor,parent);
  }
  drawBorderline(){
    let that = this;
    let list_group_body = new Konva.Rect({
      x: 0,
      y: 0,
      width: that.width,
      height: that.height,
      stroke: that.strokeColor,
      strokeWidth: 1,
      fill: '#292929',
    });
    this.layer.add( list_group_body );


  }
  drawCell() {
    let that = this;
    that.attr = {
      selectitem: 0,
      arr: [
        {
          name: 'home',
          zhname: '首页',
          icon: 'M938.977859 1024c-100.292785 0-198.718416 0-298.210992 0 0-113.362855 0-226.458974 0-340.355301-85.889034 0-170.17765 0-255.799948 0 0 112.829383 0 225.658765 0 339.821829-100.292785 0-199.251889 0-299.277937 0 0-4.534514 0-8.802292 0-13.07007 0-176.579318 0-352.891899 0.266736-529.471216 0-5.868195 3.46757-13.870279 8.002084-17.604585 138.436051-111.228966 277.138838-222.191196 416.108362-333.153425 0.533472-0.533472 1.600417-0.800208 3.200834-1.333681 45.345142 36.276114 91.223756 72.818963 136.835634 109.361813 91.490492 73.352436 182.980985 146.704871 275.004949 219.523834 10.402709 8.26882 14.403751 16.53764 14.403751 29.874446-0.533472 173.911956-0.266736 347.557176-0.266736 521.469133C938.977859 1013.864027 938.977859 1018.932014 938.977859 1024z M85.422245 85.889034c57.348268 0 113.096119 0 169.910914 0 0 38.410003 0 76.820005 0 119.497786 87.222714-69.61813 171.511331-137.10237 256.866892-205.386819 22.939307 18.404793 46.14535 36.809586 69.351394 55.214379 144.570982 115.76348 289.141964 231.52696 433.979682 347.023704 6.668403 5.334723 9.602501 10.135973 9.335765 18.671529-0.800208 13.603543-0.266736 27.207085-0.266736 44.011461C852.288617 327.285231 682.644439 191.516541 512.200052 55.214379 342.022402 191.516541 172.111487 327.285231 0.066684 464.921073c0-19.205001-0.266736-35.475905 0.266736-51.480073 0-3.200834 3.734306-6.668403 6.401667-9.069028 22.672571-18.404793 45.611878-36.809586 68.817921-54.680906 7.468612-5.868195 10.135973-12.003126 9.869237-21.33889C85.422245 252.599114 85.422245 177.11279 85.422245 101.626465 85.422245 96.825215 85.422245 92.023965 85.422245 85.889034z'
        },
        {
          name: 'shuxing',
          zhname: '属性',
          icon: 'M818.29888 709.67296 709.70368 818.28864c-6.02112 6.00064-15.7184 6.00064-21.73952 0L374.2208 504.53504l-82.01216 189.07136c-2.75456 6.32832-9.39008 10.06592-16.2304 9.09312-6.84032-0.95232-12.21632-6.3488-13.09696-13.23008l-61.55264-470.91712c-0.62464-4.72064 0.99328-9.48224 4.36224-12.8512 3.3792-3.3792 8.13056-4.98688 12.86144-4.37248l470.92736 61.55264c3.45088 0.45056 6.54336 2.02752 8.87808 4.37248 2.304 2.304 3.87072 5.3248 4.352 8.73472 0.96256 6.83008-2.77504 13.47584-9.10336 16.22016l-189.07136 81.99168 313.76384 313.7536C824.29952 693.9648 824.29952 703.67232 818.29888 709.67296z'
        },
        {
          name: 'bianxing',
          zhname: '变形',
          icon: 'M804.851993 1023.998539a73.049406 73.049406 0 0 1-51.865079-21.184328L439.604962 688.701765l-167.28314 168.013634a73.049406 73.049406 0 0 1-73.049406 18.262352A73.049406 73.049406 0 0 1 147.407338 819.460202l-146.098812-730.494061A73.049406 73.049406 0 0 1 22.492853 22.491182 73.049406 73.049406 0 0 1 88.967813 1.306854l730.494061 146.098812a73.049406 73.049406 0 0 1 55.517548 50.40409 73.049406 73.049406 0 0 1-18.262351 73.049406L688.703437 439.60329l314.112446 313.381952a73.049406 73.049406 0 0 1 0 103.730157l-146.098812 146.098812A73.049406 73.049406 0 0 1 804.851993 1023.998539zM439.604962 512.652696a73.049406 73.049406 0 0 1 51.865079 21.184328l313.381952 314.112446 43.099149-43.099149-314.112446-313.381952a73.049406 73.049406 0 0 1 0-103.730157L658.75318 265.01521 167.130678 167.8595 265.016882 658.751509l122.723002-124.914485A73.049406 73.049406 0 0 1 439.604962 512.652696z'
        },
        {
          name: 'Rect',
          zhname: '矩形',
          icon: 'M62 62h900v900h-900v-900z'
        },
        {
          name: 'Line',
          zhname: '线',
          icon: 'M930.263 61.981l31.756 31.756-868.272 868.272-31.756-31.756 868.272-868.272z'
        },
        {
          name: 'Circle',
          zhname: '圆',
          icon: 'M512 960C264.96 960 64 759.04 64 512S264.96 64 512 64s448 200.96 448 448-200.96 448-448 448z m0-832c-211.744 0-384 172.256-384 384s172.256 384 384 384 384-172.256 384-384-172.256-384-384-384z'
        },
        {
          name: 'Rectangle',
          zhname: '椭圆',
          icon: 'M512 199.6c53.5 0 105.3 8.7 153.9 25.8 46.4 16.4 88 39.7 123.5 69.3 70.5 58.7 109.3 135.9 109.3 217.3s-38.8 158.5-109.3 217.3c-35.5 29.6-77.1 52.9-123.5 69.3-48.6 17.1-100.4 25.8-153.9 25.8s-105.3-8.7-153.9-25.8c-46.4-16.4-88-39.7-123.5-69.3-70.5-58.8-109.4-135.9-109.4-217.3S164 353.5 234.5 294.7c35.5-29.6 77.1-52.9 123.5-69.3 48.7-17.1 100.5-25.8 154-25.8m0-59.5C265.5 140.1 65.7 306.6 65.7 512c0 205.4 199.8 371.9 446.3 371.9S958.3 717.4 958.3 512c0-205.4-199.8-371.9-446.3-371.9z'
        },
        {
          name: 'Arc',
          zhname: '圆弧',
          icon: 'M894.368 656c-16.32-197.056-181.12-352-382.368-352-201.28 0-366.08 154.944-382.4 352H128v40c0 13.312 10.688 24 24 24h720c13.312 0 24-10.688 24-24V656h-1.632z m-682.368 0H193.6c16.064-161.696 152.448-288 318.4-288s302.304 126.304 318.368 288H212z'
        },
        {
          name: 'RegularPolygon',
          zhname: '多边形',
          icon: 'M71.675 893.33l440.325-762.683 440.325 762.683z'
        },
        {
          name: 'Star',
          zhname: '星形',
          icon: 'M512.005628 86.322018 619.43129 394.883629l340.15005 2.428306L696.758446 605.436042 800.160467 937.679006 512.005628 739.707119 223.851812 937.679006l96.717785-336.665693L64.416614 397.311935l340.16233-2.428306L512.005628 86.322018z'
        },
        {
          name: 'wenzi',
          zhname: '文字',
          icon: 'M32 0 972.651987 0 972.651987 316.651576 931.05337 316.651576C931.05337 316.651576 851.664627 123.301587 757.99696 106.426488 664.326945 89.551388 599.217138 101.163665 599.217138 101.163665L598.048275 908.460659C598.048275 908.460659 624.046382 963.027206 666.957181 966.897965L761.948781 966.897965 761.948781 1022.63337 242.777214 1022.63337 244.09057 965.511776 327.28898 964.19607C327.28898 964.19607 389.765027 944.689555 389.765027 899.258944 389.765027 853.896474 391.083083 107.668185 391.083083 107.668185 391.083083 107.668185 288.327649 93.496156 234.939369 106.496972 181.625097 119.427304 87.881073 197.297106 73.598618 311.462763L32 312.778468 32 0 32 0 32 0Z'
        },
        {
          name: 'addsegment',
          zhname: '增加顶点',
          icon: 'M756.869565 526.84058c0 118.724638-96.463768 215.188406-215.188406 215.188406S326.492754 645.565217 326.492754 526.84058 422.956522 311.652174 541.681159 311.652174 756.869565 408.115942 756.869565 526.84058z M170.666667 140.985507h742.028985v29.68116h-742.028985z M650.017391 897.855072l-8.904348-28.197101c115.756522-34.133333 207.768116-126.144928 241.90145-241.901449l28.197101 8.904348C875.594203 759.837681 774.678261 860.753623 650.017391 897.855072z  M927.536232 526.84058h-29.68116c0-195.895652-160.278261-356.173913-356.173913-356.173913s-356.173913 160.278261-356.173913 356.173913h-29.681159c0-212.22029 173.634783-385.855072 385.855072-385.855073s385.855072 173.634783 385.855073 385.855073z M433.344928 897.855072C308.684058 860.753623 207.768116 759.837681 170.666667 635.176812l28.197101-8.904348C232.997101 742.028986 326.492754 835.524638 442.249275 868.173913l-8.904347 29.681159z M482.318841 96.463768h118.724637v118.724638h-118.724637z  M615.884058 230.028986h-148.405797v-148.405798h148.405797v148.405798z m-118.724638-29.68116h89.043479v-89.043478h-89.043479v89.043478z M111.304348 467.478261h118.724638v118.724638h-118.724638z M244.869565 601.043478h-148.405797v-148.405797h148.405797v148.405797z m-118.724637-29.681159h89.043478v-89.043478h-89.043478v89.043478z M853.333333 467.478261h118.724638v118.724638h-118.724638z M986.898551 601.043478h-148.405797v-148.405797h148.405797v148.405797z m-118.724638-29.681159h89.043478v-89.043478h-89.043478v89.043478z M170.666667 155.826087m-44.521739 0a44.521739 44.521739 0 1 0 89.043478 0 44.521739 44.521739 0 1 0-89.043478 0Z M170.666667 215.188406c-32.649275 0-59.362319-26.713043-59.362319-59.362319s26.713043-59.362319 59.362319-59.362319 59.362319 26.713043 59.362319 59.362319-26.713043 59.362319-59.362319 59.362319z m0-89.043478c-16.324638 0-29.681159 13.356522-29.68116 29.681159s13.356522 29.681159 29.68116 29.681159 29.681159-13.356522 29.681159-29.681159-13.356522-29.681159-29.681159-29.681159z M912.695652 155.826087m-44.521739 0a44.521739 44.521739 0 1 0 89.043478 0 44.521739 44.521739 0 1 0-89.043478 0Z M912.695652 215.188406c-32.649275 0-59.362319-26.713043-59.362319-59.362319s26.713043-59.362319 59.362319-59.362319 59.362319 26.713043 59.362319 59.362319-26.713043 59.362319-59.362319 59.362319z m0-89.043478c-16.324638 0-29.681159 13.356522-29.681159 29.681159s13.356522 29.681159 29.681159 29.681159 29.681159-13.356522 29.68116-29.681159-13.356522-29.681159-29.68116-29.681159z M541.681159 719.768116h53.426087c20.776812-59.362319 63.814493-117.24058 94.979711-148.405797-41.553623-50.457971-114.272464-172.150725-148.405798-267.130435-34.133333 94.97971-106.852174 216.672464-148.405797 267.130435 29.681159 31.165217 74.202899 89.043478 94.97971 148.405797h53.426087z M595.107246 734.608696h-108.336232c-5.936232 0-11.872464-4.452174-13.356521-10.388406-19.292754-53.426087-59.362319-111.304348-90.527536-142.469565-5.936232-5.936232-5.936232-13.356522-1.484058-19.292754 37.101449-46.005797 111.304348-167.698551 145.437681-262.678261 1.484058-5.936232 7.42029-10.388406 13.356521-10.388406s11.872464 4.452174 13.356522 10.388406c34.133333 94.97971 108.336232 216.672464 145.437681 262.678261 4.452174 5.936232 4.452174 14.84058-1.484058 19.292754-31.165217 32.649275-72.718841 89.043478-90.527536 142.469565 0 5.936232-4.452174 10.388406-11.872464 10.388406z m-96.463768-29.68116h87.559421c20.776812-53.426087 56.394203-102.4 84.591304-135.049275-35.617391-47.489855-92.011594-140.985507-129.113044-225.576812-35.617391 84.591304-93.495652 178.086957-129.113043 225.576812 28.197101 32.649275 65.298551 81.623188 86.075362 135.049275z M526.84058 319.072464h29.681159v252.289855h-29.681159z M467.478261 704.927536h148.405797v222.608696h-148.405797z M630.724638 942.376812h-178.086957v-252.289855h178.086957v252.289855z m-148.405797-29.68116h118.724637v-192.927536h-118.724637v192.927536z M452.637681 764.289855h178.086957v163.246377h-178.086957z M645.565217 942.376812h-207.768116v-192.927537h207.768116v192.927537z m-178.086956-29.68116h148.405797v-133.565217h-148.405797v133.565217z M512 541.681159h59.362319v29.68116h-59.362319z'
        },
        {
          name: 'removeSegments',
          zhname: '删除顶点',
          icon: 'M357.1 896.2L197.7 736.9c-45.7-45.7-45.7-119.8 0-165.5l446.2-446.2 182.4 182.4c45.7 45.7 45.7 119.8 0 165.5L403.7 895.6l-46.6 0.6z M357.1 911.2c-4 0-7.8-1.6-10.6-4.4L187.1 747.5c-24.9-24.9-38.7-58.1-38.7-93.4s13.7-68.4 38.7-93.4l446.2-446.2c2.8-2.8 6.6-4.4 10.6-4.4s7.8 1.6 10.6 4.4L836.9 297c51.5 51.5 51.5 135.3 0 186.8L414.3 906.2c-2.8 2.8-6.5 4.3-10.4 4.4l-46.7 0.6h-0.1z m286.8-764.8L208.3 582c-19.3 19.3-29.9 44.9-29.9 72.2s10.6 52.9 29.9 72.2l154.9 154.9 34.2-0.4 418.2-418.2c39.8-39.8 39.8-104.5 0-144.3l-171.7-172z M357.1 896.2L197.7 736.9c-45.7-45.7-45.7-119.8 0-165.5L380.1 389l265.1 265.1-241.5 241.5-46.6 0.6z M357.1 911.2c-4 0-7.8-1.6-10.6-4.4L187.1 747.5c-24.9-24.9-38.7-58.1-38.7-93.4s13.7-68.4 38.7-93.4l182.4-182.4c5.9-5.9 15.4-5.9 21.2 0l265.1 265.1c5.9 5.9 5.9 15.4 0 21.2L414.3 906.2c-2.8 2.8-6.5 4.3-10.4 4.4l-46.7 0.6h-0.1z m23-501L208.3 582c-19.3 19.3-29.9 44.9-29.9 72.2s10.6 52.9 29.9 72.2l154.9 154.9 34.2-0.4L624 654.1 380.1 410.2z M356.5 895.6h350.6M707.1 910.6H356.5c-8.3 0-15-6.7-15-15s6.7-15 15-15h350.6c8.3 0 15 6.7 15 15s-6.8 15-15 15z'
        }
      ]
    };
    that.view();
  }
  view(){
    let that = this;
    for(let i=0;i<that.attr.arr.length;i++){
      let group = new Konva.Group({
        draggable: true,
      });
      let tempcolor='#2a2a2a';
      if(that.attr.selectitem==i){
        tempcolor='#e6e6e6';
      }
        let list_bg = new Konva.Rect({
          x: 4,
          y: 6+35*i,
          width: that.width-4,
          height: 35,
          fill: tempcolor
        });
        group.add(list_bg);


      var homepath = new Konva.Path({
        x: that.width/2-10,
        y: 35*(i+1)-15,
        data: that.attr.arr[i].icon,
        fill: '#7b7b7b',
        scaleX: 0.018,
        scaleY: 0.018,
      });
      group.add(homepath);
      that.layer.add(group);
      group.on( 'click', function (e) {
        //this.Group.children
        console.dir(this);
        //for(let t=0;t<this.children.length;t++){
        //   if(this.children[t].className=="Rect"){
        //     that.attr.selectitem =(this.children[t].attrs.y-6)/35;
        //     if(that.attr.selectitem==3){
        //     that.parent.centre_canvas.canvasDom.off();
        //     that.parent.centre_canvas.canvasDom.init();
        //   }
        // }
        console.dir(i);
          that.attr.selectitem =i;
            that.parent.centre_canvas.canvasDom.off();
            that.parent.centre_canvas.canvasDom.init();
        //}
        console.dir(that);
        if(i==0){
          that.parent.attr_canvas.imagesview();
        }
        that.view();

      });

    }
    // var homepath = new Konva.Path({
    //   x: that.width/2-10,
    //   y: 26/2-3,
    //   data: 'M32 0 972.651987 0 972.651987 316.651576 931.05337 316.651576C931.05337 316.651576 851.664627 123.301587 757.99696 106.426488 664.326945 89.551388 599.217138 101.163665 599.217138 101.163665L598.048275 908.460659C598.048275 908.460659 624.046382 963.027206 666.957181 966.897965L761.948781 966.897965 761.948781 1022.63337 242.777214 1022.63337 244.09057 965.511776 327.28898 964.19607C327.28898 964.19607 389.765027 944.689555 389.765027 899.258944 389.765027 853.896474 391.083083 107.668185 391.083083 107.668185 391.083083 107.668185 288.327649 93.496156 234.939369 106.496972 181.625097 119.427304 87.881073 197.297106 73.598618 311.462763L32 312.778468 32 0 32 0 32 0Z',
    //   fill: '#7b7b7b',
    //   scaleX: 0.018,
    //   scaleY: 0.018,
    // });
    // that.layer.add(homepath);

    // enlarge.on( 'click', function (e) {
    //   that.parent.centre_canvas.zoomjia();
    // });
  }

}




class Content_body_left_attr_canvas extends ContentCanvas{
  constructor(container='content_body_left_attr_div',strokeColor='#bcbcbc',parent){
    super(container,strokeColor,parent);
  }
  color(that,attr_color){


    that.layer.destroyChildren();
    that.layer.draw();
    let butontext='  返回   ';
    let projectname='  背景色   ';
    var labelback = new Konva.Label({
      x: 2,
      y: 15,
      width: 76,
      height:26,
      //draggable: true
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
    //that.parent.head_canvas.attr.project.background

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
    //============
    //正常颜色
    //线性渐变
    //放射状/环形的渐变   that.parent.head_canvas.attr.project.backgroundType
    //====color_type0
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
    that.layer.add( label_projet_access_public );
    label_projet_access_public.addName('color_type0');


    //======
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
    that.layer.add( label_projet_access_unlisted );
    label_projet_access_unlisted.addName('color_type1');
    //======
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
    that.layer.add( label_projet_access_private );
    label_projet_access_private.addName('color_type2');
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

      that.parent.head_canvas.attr.project.backgroundType.typeid=0;
      that.layer.draw();
      if(that.colorPicker0){
        that.colorPicker0.removeEventListener();
      }

      labelback.on( 'click', function (e) {
        //返回
        if(that.colorPicker0){
          that.colorPicker0.removeEventListener();
          that.colorPicker0.starting=true;
        }
        if(that.colorPicker1){
          that.colorPicker1.removeEventListener();
          that.colorPicker1.starting=true;
        }
        if(that.colorPicker2){
          that.colorPicker2.removeEventListener();
          that.colorPicker2.starting=true;
        }
        that.signal(that);
      });
      that.colorPicker0 = new ColorPicker(that);
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
      that.parent.head_canvas.attr.project.backgroundType.typeid=1;

      let select_x = '';
      let select_y = '';
      //that.zoom_0();


      labelback.on( 'click', function (e) {
        //返回
        if(that.colorPicker0){
          that.colorPicker0.removeEventListener();
          that.colorPicker0.starting=true;
        }
        if(that.colorPicker1){
          that.colorPicker1.removeEventListener();
          that.colorPicker1.starting=true;
        }
        if(that.colorPicker2){
          that.colorPicker2.removeEventListener();
          that.colorPicker2.starting=true;
        }
        that.signal(that);
      });
      if(that.colorPicker1){
        that.colorPicker1.removeEventListener();
        that.colorPicker1.starting=true;
      }

      that.colorPicker1 = new ColorPicker_jianbian(that);
      that.layer.draw();
    };

    var color_type2_fun= function (e) {

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
      that.parent.head_canvas.attr.project.backgroundType.typeid=2;
      that.layer.draw();
      if(that.colorPicker2){
        that.colorPicker2.removeEventListener();
      }

      labelback.on( 'click', function (e) {
        //返回
        if(that.colorPicker0){
          that.colorPicker0.removeEventListener();
          that.colorPicker0.starting=true;
        }
        if(that.colorPicker1){
          that.colorPicker1.removeEventListener();
          that.colorPicker1.starting=true;
        }
        if(that.colorPicker2){
          that.colorPicker2.removeEventListener();
          that.colorPicker2.starting=true;
        }
        that.signal(that);
      });
      that.colorPicker2 = new ColorPicker(that);
    };

    switch (that.parent.head_canvas.attr.project.backgroundType.typeid) {
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
    //label_projet_access_public.children
    label_projet_access_public.on( 'click', function () {
      color_type0_fun(true);
    });
    label_projet_access_unlisted.on( 'click',function(){
      color_type1_fun(true);
    } );
    label_projet_access_private.on( 'click',function(){
      color_type2_fun(true);
    } );

    //========================================================
    //that.layer.draw();

    if(!that.inputArr){
      that.inputArr=[];
    }else{
      for(let t=0;t<that.inputArr.length;t++){
        that.inputArr[t].removeEventListener();
      }
      that.inputArr=[];
    }

    /*let colorPicker2 = new ColorPicker(that);
    labelback.on( 'click', function (e) {
      //返回
      colorPicker2.removeEventListener();
      that.signal(that);
    });*/
  }
  drawCell(){
    let that = this;
    that.signal=function (that) {
      that.layer.destroyChildren();
      let butontext='  返回   ';
      let projectname='  项目   ';
      var labelback = new Konva.Label({
        x: 2,
        y: 15,
        width: 76,
        height:26,
        //draggable: true
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
      labelback.on( 'click', function (e) {
        //返回
        that.layer.destroyChildren();
        that.layer.draw();
      });
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
      //======================================

      console.dir(that.parent.head_canvas.attr.project);
      let temp_name_lab = new Konva.Text({
        text: '名称',
        fontSize: 12,
        lineHeight: 2,
        fontFamily: 'Calibri',
        padding: 0,
        fill: '#808080',
        x: 10,
        y: 45,
      });
      that.layer.add( temp_name_lab );

      let temp_size_lab = new Konva.Text({
        text: '大小',
        fontSize: 12,
        lineHeight: 2,
        fontFamily: 'Calibri',
        padding: 0,
        fill: '#808080',
        x: 10,
        y: 75,
      });
      that.layer.add( temp_size_lab );

      let temp_size_w_lab = new Konva.Text({
        text: 'width',
        fontSize: 8,
        lineHeight: 2,
        fontFamily: 'Calibri',
        padding: 0,
        fill: '#808080',
        x: that.width/2-26+that.width/6/2,
        y: 100,
      });
      that.layer.add( temp_size_w_lab );

      let temp_size_h_lab = new Konva.Text({
        text: 'height',
        fontSize: 8,
        lineHeight: 2,
        fontFamily: 'Calibri',
        padding: 0,
        fill: '#808080',
        x: that.width-that.width/6-26+that.width/6/2,
        y: 100,
      });
      that.layer.add( temp_size_h_lab );
      let temp_selet_wh_lab = new Konva.Text({
        text: '选择预设',
        fontSize: 12,
        lineHeight: 2,
        fontFamily: 'Calibri',
        padding: 0,
        fill: '#808080',
        x: that.width/2,
        y: 115,
      });
      that.layer.add( temp_selet_wh_lab );
      let temp_backcolor_lab = new Konva.Text({
        text: '背景颜色',
        fontSize: 12,
        lineHeight: 2,
        fontFamily: 'Calibri',
        padding: 0,
        fill: '#808080',
        x: 10,
        y: 140,
      });
      that.layer.add( temp_backcolor_lab );


      var rect_colorGroup= new Konva.Group({
        x: that.width/2-26,
        y: 145,
        width: 25,
        height:25,
        //draggable: true,
      });
      rect_colorGroup.add(new Konva.Rect({
        x:0,
        y:0,
        width: 25,
        height: 25,
        fill: '#e6e6e6',
        stroke: '#808080',
        strokeWidth:0.8,
        cornerRadius: 3
      }));
      var rect_color = new Konva.Shape({
        x: 0,
        y: 0,
        // a Konva.Canvas renderer is passed into the sceneFunc function
        sceneFunc (context, shape) {
          if(that.parent.head_canvas.attr.project.backgroundType.typeid==1){
            var gradientBar = context.createLinearGradient(
              25*that.parent.head_canvas.attr.project.backgroundType.data.sw,
              25*that.parent.head_canvas.attr.project.backgroundType.data.sh,
              25*that.parent.head_canvas.attr.project.backgroundType.data.ew,
              25*that.parent.head_canvas.attr.project.backgroundType.data.eh
            );
            gradientBar.addColorStop(0, that.parent.head_canvas.attr.project.backgroundType.data.sc);
            gradientBar.addColorStop(1, that.parent.head_canvas.attr.project.backgroundType.data.ec);
            context.fillStyle = gradientBar;

          }else if(that.parent.head_canvas.attr.project.backgroundType.typeid==0){
            context.fillStyle = that.parent.head_canvas.attr.project.backgroundType.data.sc;
          }else if(that.parent.head_canvas.attr.project.backgroundType.typeid==2){
            var gradientBar = context.createRadialGradient(
              25*that.parent.head_canvas.attr.project.backgroundType.data.sw,
              25*that.parent.head_canvas.attr.project.backgroundType.data.sh,

              25*that.parent.head_canvas.attr.project.backgroundType.data.sr,


              25*that.parent.head_canvas.attr.project.backgroundType.data.ew,
              25*that.parent.head_canvas.attr.project.backgroundType.data.eh,

              25*that.parent.head_canvas.attr.project.backgroundType.data.er,
            );
            gradientBar.addColorStop(0, that.parent.head_canvas.attr.project.backgroundType.data.sc);
            gradientBar.addColorStop(1, that.parent.head_canvas.attr.project.backgroundType.data.ec);
            context.fillStyle = gradientBar;

          }
          context.strokeStyle="#808080";
          context.lineWidth=1;
          context.fillRect(0, 0, 25,25);
          context.strokeRect(0, 0,25, 25);
          context.fillStrokeShape(shape);
        }
      });


      rect_colorGroup.add(rect_color)
      that.layer.add( rect_colorGroup );
      rect_colorGroup.on( 'click', function (e) {
        //that.color(that,that.parent.head_canvas.attr.project.background)

        if(!that.inputArr){
          that.inputArr=[];
        }else{
          for(let t=0;t<that.inputArr.length;t++){
            that.inputArr[t].removeEventListener();
          }
          that.inputArr=[];
        }
        let colorControl = new ColorControl(that,that.parent.head_canvas.attr.project.backgroundType);

      });

      let rect_loop_color_lab = new Konva.Text({
        text: '循环播放',
        fontSize: 12,
        lineHeight: 2,
        fontFamily: 'Calibri',
        padding: 0,
        fill: '#808080',
        x: 10,
        y: 170,
      });
      that.layer.add( rect_loop_color_lab );

      let temp_loop_c='#e6e6e6';
      if(that.parent.head_canvas.attr.project.loop){
        temp_loop_c='#808080';
      }
      let rect_loop_color = new Konva.Rect({
        x:that.width/2-26,
        y:175,
        width: 10,
        height: 10,
        fill: temp_loop_c,
        stroke: '#808080',
        strokeWidth:0.5
      });
      that.layer.add( rect_loop_color );
      rect_loop_color.on( 'click', function (e) {
        if(this.attrs.fill=="#e6e6e6"){
          this.attrs.fill="#808080";
          that.parent.head_canvas.attr.project.loop=true;
        }else{
          this.attrs.fill="#e6e6e6";
          that.parent.head_canvas.attr.project.loop=false;
        }
        that.layer.draw();
        if(that.fn){that.fn();}
      });

      let tags_lab = new Konva.Text({
        text: '类别标签',
        fontSize: 12,
        lineHeight: 2,
        fontFamily: 'Calibri',
        padding: 0,
        fill: '#808080',
        x: 10,
        y: 195,
      });
      that.layer.add( tags_lab );

      let tags_maoshu_lab = new Konva.Text({
        text: '多个标签用逗号分隔',
        fontSize: 10,
        lineHeight: 2,
        fontFamily: 'Calibri',
        padding: 0,
        fill: '#808080',
        x: 70,
        y: 245,
      });
      that.layer.add( tags_maoshu_lab );

      let description_lab = new Konva.Text({
        text: '项目描述',
        fontSize: 12,
        lineHeight: 2,
        fontFamily: 'Calibri',
        padding: 0,
        fill: '#808080',
        x: 10,
        y: 260,
      });
      that.layer.add( description_lab );


      //======
      let projet_access_lab = new Konva.Text({
        text: '项目权限',
        fontSize: 12,
        lineHeight: 2,
        fontFamily: 'Calibri',
        padding: 0,
        fill: '#808080',
        x: 10,
        y: 320,
      });
      that.layer.add( projet_access_lab );

      //====public
      var label_projet_access_public= new Konva.Group({
        x: 40,
        y: 350,
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
        text: '   公共',
        fontSize: 12,
        lineHeight: 2,
        fontFamily: 'Calibri',
        padding: 0,
        fill: '#808080'
        //fill: '#f7f7f7'
      });
      text_projet_access_public.align('center');
      label_projet_access_public.add(text_projet_access_public);
      that.layer.add( label_projet_access_public );
      label_projet_access_public.addName('public_label');


      //======
      //====unlisted
      var label_projet_access_unlisted= new Konva.Group({
        x: 100,
        y: 350,
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
        text: '  未上市',
        fontSize: 12,
        lineHeight: 2,
        fontFamily: 'Calibri',
        padding: 0,
        fill: '#808080'
        //fill: '#f7f7f7'
      });
      text_projet_access_unlisted.align('center');
      label_projet_access_unlisted.add(text_projet_access_unlisted);
      that.layer.add( label_projet_access_unlisted );
      label_projet_access_unlisted.addName('unlisted_label');
      //======
      //====private
      var label_projet_access_private= new Konva.Group({
        x: 160,
        y: 350,
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
        text: '   私有',
        fontSize: 12,
        lineHeight: 2,
        fontFamily: 'Calibri',
        padding: 0,
        fill: '#808080'
        //fill: '#f7f7f7'
      });
      text_projet_access_private.align('center');
      label_projet_access_private.add(text_projet_access_private);
      that.layer.add( label_projet_access_private );
      label_projet_access_private.addName('private_label');
      //======
      let massage_lab = new Konva.Text({
        //name:'massagetext',
        text: '这个项目在odqoo.com是可浏览和可搜索的',
        fontSize: 8,
        lineHeight: 2,
        fontFamily: 'Calibri',
        padding: 0,
        fill: '#808080',
        x: 40,
        y: 380,
      });
      that.layer.add( massage_lab );
      massage_lab.addName('massage_text');
      //========
      console.dir(label_projet_access_public);
      console.dir(massage_lab.name());
      var public_fun=function (e) {
        let public_label = that.layer.find('.public_label')[0];
        let public_rect_temp = public_label.find('Rect')[0];
        public_rect_temp.attrs.fill='#707070';
        let public_Text_temp = public_label.find('Text')[0];
        public_Text_temp.attrs.fill='#ebebeb';

        let massage_text = that.layer.find('.massage_text')[0];
        //massage_text.attrs.text="这个项目在odqoo.com是可浏览和可搜索的";
        massage_text.setText("这个项目在odqoo.com是可浏览和可搜索的");
        massage_text.absolutePosition({
          x: 40,
          y: 380
        });
        let unlisted_label = that.layer.find('.unlisted_label')[0];
        let unlisted_rect_temp = unlisted_label.find('Rect')[0];
        unlisted_rect_temp.attrs.fill='#e6e6e6';
        let unlisted_Text_temp = unlisted_label.find('Text')[0];
        unlisted_Text_temp.attrs.fill="#808080";

        let private_label = that.layer.find('.private_label')[0];
        let private_rect_temp = private_label.find('Rect')[0];
        private_rect_temp.attrs.fill='#e6e6e6';
        let private_Text_temp = private_label.find('Text')[0];
        private_Text_temp.attrs.fill="#808080";

        that.parent.head_canvas.attr.project.access="public";

        if(e){
          that.signal(that);
        }
      };

      var unlisted_fun = function (e) {

        let public_label = that.layer.find('.public_label')[0];
        let public_rect_temp = public_label.find('Rect')[0];
        public_rect_temp.attrs.fill='#e6e6e6';
        let public_Text_temp = public_label.find('Text')[0];
        public_Text_temp.attrs.fill='#808080';

        let massage_text = that.layer.find('.massage_text')[0];
        console.dir(massage_text);
        massage_text.setText("这个项目在odqoo.com是不能搜索到的，可以通过分享链接看到");
        //massage_text.attrs.text="这个项目在odqoo.com是不能搜索到的，其他用户可以通过分享链接看到";
        massage_text.absolutePosition({
          x: 10,
          y: 380
        });
        let unlisted_label = that.layer.find('.unlisted_label')[0];
        let unlisted_rect_temp = unlisted_label.find('Rect')[0];
        unlisted_rect_temp.attrs.fill='#707070';
        let unlisted_Text_temp = unlisted_label.find('Text')[0];
        unlisted_Text_temp.attrs.fill="#ebebeb";

        let private_label = that.layer.find('.private_label')[0];
        let private_rect_temp = private_label.find('Rect')[0];
        private_rect_temp.attrs.fill='#e6e6e6';
        let private_Text_temp = private_label.find('Text')[0];
        private_Text_temp.attrs.fill="#808080";
        that.parent.head_canvas.attr.project.access="unlisted";
        if(e){
          that.signal(that);
        }
      };

      var private_fun= function (e) {

        let public_label = that.layer.find('.public_label')[0];
        let public_rect_temp = public_label.find('Rect')[0];
        public_rect_temp.attrs.fill='#e6e6e6';
        let public_Text_temp = public_label.find('Text')[0];
        public_Text_temp.attrs.fill='#808080';

        let massage_text = that.layer.find('.massage_text')[0];
        //massage_text.attrs.text="只有自己才能看到";
        massage_text.setText("只有自己才能看到");
        massage_text.absolutePosition({
          x: 80,
          y: 380
        });
        let unlisted_label = that.layer.find('.unlisted_label')[0];
        let unlisted_rect_temp = unlisted_label.find('Rect')[0];
        unlisted_rect_temp.attrs.fill='#e6e6e6';
        let unlisted_Text_temp = unlisted_label.find('Text')[0];
        unlisted_Text_temp.attrs.fill="#808080";

        let private_label = that.layer.find('.private_label')[0];
        let private_rect_temp = private_label.find('Rect')[0];
        private_rect_temp.attrs.fill='#707070';
        let private_Text_temp = private_label.find('Text')[0];
        private_Text_temp.attrs.fill="#ebebeb";
        that.parent.head_canvas.attr.project.access="private";
        if(e){
          that.signal(that);
        }

      };

      switch (that.parent.head_canvas.attr.project.access) {
        case 'public':
          public_fun();
          break;
        case 'unlisted':
          unlisted_fun();
          break;
        case 'private':
          private_fun();
          break;
      }
      //label_projet_access_public.children
      label_projet_access_public.on( 'click', function () {
        public_fun(true);
      });

      label_projet_access_unlisted.on( 'click',function(){
        unlisted_fun(true);
      } );
      label_projet_access_private.on( 'click',function(){
        private_fun(true);
      } );
      //======
      if(!that.inputArr){
        that.inputArr=[];
      }else{
        for(let t=0;t<that.inputArr.length;t++){
          that.inputArr[t].removeEventListener();
        }
        that.inputArr=[];
      }
      that.fn=function () {

        var project_name_input = new CanvasInput({
          canvas: that.layer.canvas._canvas,
          fontSize: 12,
          fontFamily: 'Arial',
          fontColor: '#808080',
          //fontWeight: 'bold',
          width: that.width/2,
          padding: 8,
          borderWidth: 1,
          borderColor: '#e6e6e6',
          borderRadius: 3,
          boxShadow: '1px 1px 0px #e6e6e6',
          innerShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
          placeHolder: '请输入项目名字',
          x:that.width/2-26,
          y:40,
          value:that.parent.head_canvas.attr.project.name
        });
        that.inputArr.push(project_name_input);
        project_name_input.onkeyup(function () {
          console.dir(this._value);
          that.parent.head_canvas.attr.project.name=this._value;
          console.dir(that.parent.head_canvas.attr.project);
          that.parent.head_canvas.signal(that.parent.head_canvas);
        });
        //==
        var project_size_w_input = new CanvasInput({
          canvas: that.layer.canvas._canvas,
          fontSize: 12,
          fontFamily: 'Arial',
          fontColor: '#808080',
          //fontWeight: 'bold',
          width: that.width/6,
          padding: 8,
          borderWidth: 1,
          borderColor: '#e6e6e6',
          borderRadius: 3,
          boxShadow: '1px 1px 0px #e6e6e6',
          innerShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
          placeHolder: '请输入项目名字',
          x:that.width/2-26,
          y:70,
          value:that.parent.head_canvas.attr.project.size.width
        });
        that.inputArr.push(project_size_w_input);
        project_size_w_input.onkeyup(function () {
          console.dir(this._value);
          that.parent.head_canvas.attr.project.size.width=this._value;
          console.dir(that.parent.head_canvas.attr.project);
          that.parent.head_canvas.signal(that.parent.head_canvas);
          that.parent.centre_canvas.refreshSize();
        });
        var project_size_h_input = new CanvasInput({
          canvas: that.layer.canvas._canvas,
          fontSize: 12,
          fontFamily: 'Arial',
          fontColor: '#808080',
          //fontWeight: 'bold',
          width: that.width/6,
          padding: 8,
          borderWidth: 1,
          borderColor: '#e6e6e6',
          borderRadius: 3,
          boxShadow: '1px 1px 0px #e6e6e6',
          innerShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
          placeHolder: '请输入项目名字',
          x:that.width-that.width/6-26,
          y:70,
          value:that.parent.head_canvas.attr.project.size.height
        });
        that.inputArr.push(project_size_h_input);
        project_size_h_input.onkeyup(function () {
          console.dir(this._value);
          that.parent.head_canvas.attr.project.size.height=this._value;
          console.dir(that.parent.head_canvas.attr.project);
          that.parent.head_canvas.signal(that.parent.head_canvas);
          that.parent.centre_canvas.refreshSize();
        });
        var project_tags_input = new CanvasInput({
          canvas: that.layer.canvas._canvas,
          fontSize: 12,
          fontFamily: 'Arial',
          fontColor: '#808080',
          //fontWeight: 'bold',
          width: that.width-40,
          padding: 8,
          borderWidth: 1,
          borderColor: '#e6e6e6',
          borderRadius: 3,
          boxShadow: '1px 1px 0px #e6e6e6',
          innerShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
          //placeHolder: '请输入项目名字',
          x:10,
          y:215,
          value:that.parent.head_canvas.attr.project.tags
        });
        that.inputArr.push(project_tags_input);
        project_tags_input.onkeyup(function () {
          console.dir(this._value);
          that.parent.head_canvas.attr.project.tags=this._value;
          console.dir(that.parent.head_canvas.attr.project);
        });
        var project_description_input = new CanvasInput({
          canvas: that.layer.canvas._canvas,
          fontSize: 12,
          fontFamily: 'Arial',
          fontColor: '#808080',
          //fontWeight: 'bold',
          width: that.width-40,
          //height: 100,
          padding: 8,
          borderWidth: 1,
          borderColor: '#e6e6e6',
          borderRadius: 3,
          boxShadow: '1px 1px 0px #e6e6e6',
          innerShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
          //placeHolder: '请输入项目名字',
          x:10,
          y:280,
          value:that.parent.head_canvas.attr.project.description
        });
        that.inputArr.push(project_description_input);
        project_description_input.onkeyup(function () {
          console.dir(this._value);
          that.parent.head_canvas.attr.project.description=this._value;
          console.dir(that.parent.head_canvas.attr.project);
        });

      }
      // this.layerctx.fillStyle="#FF0000";
      // ctx.fillRect(0,0,150,75);
      //let navigationBar = new Konva

      /*
      * let group = new Konva.Group({
          x:temp_group_x,
          draggable: true,
        });
        let customShape = new Konva.Shape({
          x: temp_x,
          y: 0,
          fill: '#808080',
          // a Konva.Canvas renderer is passed into the sceneFunc function
          sceneFunc (context, shape) {
            context.beginPath();
            context.moveTo(temp_s, temp_e);
            context.lineTo(temp_e, temp_e);
            context.quadraticCurveTo(temp_s, temp_s/4, temp_s, temp_s);
            context.closePath();
            // Konva specific method
            context.fillStrokeShape(shape);
          }
        });
      * */

      //that.layer.destroyChildren();

      that.layer.draw();
      that.fn();
    }
    that.signal2=function (that) {
      that.layer.destroyChildren();
      let butontext='  返回   ';
      let projectname='  项目   ';
      var labelback = new Konva.Label({
        x: 2,
        y: 15,
        width: 76,
        height:26,
        //draggable: true
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
      labelback.on( 'click', function (e) {
        //返回
        that.layer.destroyChildren();
        that.layer.draw();
      });
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
      //======================================

      console.dir(that.parent.head_canvas.attr.project);
      let temp_name_lab = new Konva.Text({
        text: '名称',
        fontSize: 12,
        lineHeight: 2,
        fontFamily: 'Calibri',
        padding: 0,
        fill: '#808080',
        x: 10,
        y: 45,
      });
      that.layer.add( temp_name_lab );

      let temp_size_lab = new Konva.Text({
        text: '大小',
        fontSize: 12,
        lineHeight: 2,
        fontFamily: 'Calibri',
        padding: 0,
        fill: '#808080',
        x: 10,
        y: 75,
      });
      that.layer.add( temp_size_lab );

      let temp_size_w_lab = new Konva.Text({
        text: 'width',
        fontSize: 8,
        lineHeight: 2,
        fontFamily: 'Calibri',
        padding: 0,
        fill: '#808080',
        x: that.width/2-26+that.width/6/2,
        y: 100,
      });
      that.layer.add( temp_size_w_lab );

      let temp_size_h_lab = new Konva.Text({
        text: 'height',
        fontSize: 8,
        lineHeight: 2,
        fontFamily: 'Calibri',
        padding: 0,
        fill: '#808080',
        x: that.width-that.width/6-26+that.width/6/2,
        y: 100,
      });
      that.layer.add( temp_size_h_lab );
      let temp_selet_wh_lab = new Konva.Text({
        text: '选择预设',
        fontSize: 12,
        lineHeight: 2,
        fontFamily: 'Calibri',
        padding: 0,
        fill: '#808080',
        x: that.width/2,
        y: 115,
      });
      that.layer.add( temp_selet_wh_lab );
      let temp_backcolor_lab = new Konva.Text({
        text: '背景颜色',
        fontSize: 12,
        lineHeight: 2,
        fontFamily: 'Calibri',
        padding: 0,
        fill: '#808080',
        x: 10,
        y: 140,
      });
      that.layer.add( temp_backcolor_lab );


      var rect_colorGroup= new Konva.Group({
        x: that.width/2-26,
        y: 145,
        width: 25,
        height:25,
        //draggable: true,
      });
      rect_colorGroup.add(new Konva.Rect({
        x:0,
        y:0,
        width: 25,
        height: 25,
        fill: '#e6e6e6',
        stroke: '#808080',
        strokeWidth:0.8,
        cornerRadius: 3
      }));
      var rect_color = new Konva.Shape({
        x: 0,
        y: 0,
        // a Konva.Canvas renderer is passed into the sceneFunc function
        sceneFunc (context, shape) {
          if(that.parent.head_canvas.attr.project.backgroundType.typeid==1){
            var gradientBar = context.createLinearGradient(
              25*that.parent.head_canvas.attr.project.backgroundType.data.sw,
              25*that.parent.head_canvas.attr.project.backgroundType.data.sh,
              25*that.parent.head_canvas.attr.project.backgroundType.data.ew,
              25*that.parent.head_canvas.attr.project.backgroundType.data.eh
            );
            gradientBar.addColorStop(0, that.parent.head_canvas.attr.project.backgroundType.data.sc);
            gradientBar.addColorStop(1, that.parent.head_canvas.attr.project.backgroundType.data.ec);
            context.fillStyle = gradientBar;

          }else if(that.parent.head_canvas.attr.project.backgroundType.typeid==0){
            context.fillStyle = that.parent.head_canvas.attr.project.backgroundType.data.sc;
          }else if(that.parent.head_canvas.attr.project.backgroundType.typeid==2){
            var gradientBar = context.createRadialGradient(
              25*that.parent.head_canvas.attr.project.backgroundType.data.sw,
              25*that.parent.head_canvas.attr.project.backgroundType.data.sh,

              25*that.parent.head_canvas.attr.project.backgroundType.data.sr,


              25*that.parent.head_canvas.attr.project.backgroundType.data.ew,
              25*that.parent.head_canvas.attr.project.backgroundType.data.eh,

              25*that.parent.head_canvas.attr.project.backgroundType.data.er,
            );
            gradientBar.addColorStop(0, that.parent.head_canvas.attr.project.backgroundType.data.sc);
            gradientBar.addColorStop(1, that.parent.head_canvas.attr.project.backgroundType.data.ec);
            context.fillStyle = gradientBar;

          }
          context.strokeStyle="#808080";
          context.lineWidth=1;
          context.fillRect(0, 0, 25,25);
          context.strokeRect(0, 0,25, 25);
          context.fillStrokeShape(shape);
        }
      });


      rect_colorGroup.add(rect_color)
      that.layer.add( rect_colorGroup );
      rect_colorGroup.on( 'click', function (e) {
        //that.color(that,that.parent.head_canvas.attr.project.background)

        if(!that.inputArr){
          that.inputArr=[];
        }else{
          for(let t=0;t<that.inputArr.length;t++){
            that.inputArr[t].removeEventListener();
          }
          that.inputArr=[];
        }
        let colorControl = new ColorControl(that,that.parent.head_canvas.attr.project.backgroundType);

      });

      let rect_loop_color_lab = new Konva.Text({
        text: '循环播放',
        fontSize: 12,
        lineHeight: 2,
        fontFamily: 'Calibri',
        padding: 0,
        fill: '#808080',
        x: 10,
        y: 170,
      });
      that.layer.add( rect_loop_color_lab );

      let temp_loop_c='#e6e6e6';
      if(that.parent.head_canvas.attr.project.loop){
        temp_loop_c='#808080';
      }
      let rect_loop_color = new Konva.Rect({
        x:that.width/2-26,
        y:175,
        width: 10,
        height: 10,
        fill: temp_loop_c,
        stroke: '#808080',
        strokeWidth:0.5
      });
      that.layer.add( rect_loop_color );
      rect_loop_color.on( 'click', function (e) {
        if(this.attrs.fill=="#e6e6e6"){
          this.attrs.fill="#808080";
          that.parent.head_canvas.attr.project.loop=true;
        }else{
          this.attrs.fill="#e6e6e6";
          that.parent.head_canvas.attr.project.loop=false;
        }
        that.layer.draw();
        if(that.fn){that.fn();}
      });

      let tags_lab = new Konva.Text({
        text: '类别标签',
        fontSize: 12,
        lineHeight: 2,
        fontFamily: 'Calibri',
        padding: 0,
        fill: '#808080',
        x: 10,
        y: 195,
      });
      that.layer.add( tags_lab );

      let tags_maoshu_lab = new Konva.Text({
        text: '多个标签用逗号分隔',
        fontSize: 10,
        lineHeight: 2,
        fontFamily: 'Calibri',
        padding: 0,
        fill: '#808080',
        x: 70,
        y: 245,
      });
      that.layer.add( tags_maoshu_lab );

      let description_lab = new Konva.Text({
        text: '项目描述',
        fontSize: 12,
        lineHeight: 2,
        fontFamily: 'Calibri',
        padding: 0,
        fill: '#808080',
        x: 10,
        y: 260,
      });
      that.layer.add( description_lab );


      //======
      let projet_access_lab = new Konva.Text({
        text: '项目权限',
        fontSize: 12,
        lineHeight: 2,
        fontFamily: 'Calibri',
        padding: 0,
        fill: '#808080',
        x: 10,
        y: 320,
      });
      that.layer.add( projet_access_lab );

      //====public
      var label_projet_access_public= new Konva.Group({
        x: 40,
        y: 350,
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
        text: '   公共',
        fontSize: 12,
        lineHeight: 2,
        fontFamily: 'Calibri',
        padding: 0,
        fill: '#808080'
        //fill: '#f7f7f7'
      });
      text_projet_access_public.align('center');
      label_projet_access_public.add(text_projet_access_public);
      that.layer.add( label_projet_access_public );
      label_projet_access_public.addName('public_label');


      //======
      //====unlisted
      var label_projet_access_unlisted= new Konva.Group({
        x: 100,
        y: 350,
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
        text: '  未上市',
        fontSize: 12,
        lineHeight: 2,
        fontFamily: 'Calibri',
        padding: 0,
        fill: '#808080'
        //fill: '#f7f7f7'
      });
      text_projet_access_unlisted.align('center');
      label_projet_access_unlisted.add(text_projet_access_unlisted);
      that.layer.add( label_projet_access_unlisted );
      label_projet_access_unlisted.addName('unlisted_label');
      //======
      //====private
      var label_projet_access_private= new Konva.Group({
        x: 160,
        y: 350,
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
        text: '   私有',
        fontSize: 12,
        lineHeight: 2,
        fontFamily: 'Calibri',
        padding: 0,
        fill: '#808080'
        //fill: '#f7f7f7'
      });
      text_projet_access_private.align('center');
      label_projet_access_private.add(text_projet_access_private);
      that.layer.add( label_projet_access_private );
      label_projet_access_private.addName('private_label');
      //======
      let massage_lab = new Konva.Text({
        //name:'massagetext',
        text: '这个项目在odqoo.com是可浏览和可搜索的',
        fontSize: 8,
        lineHeight: 2,
        fontFamily: 'Calibri',
        padding: 0,
        fill: '#808080',
        x: 40,
        y: 380,
      });
      that.layer.add( massage_lab );
      massage_lab.addName('massage_text');
      //========
      console.dir(label_projet_access_public);
      console.dir(massage_lab.name());
      var public_fun=function (e) {
        let public_label = that.layer.find('.public_label')[0];
        let public_rect_temp = public_label.find('Rect')[0];
        public_rect_temp.attrs.fill='#707070';
        let public_Text_temp = public_label.find('Text')[0];
        public_Text_temp.attrs.fill='#ebebeb';

        let massage_text = that.layer.find('.massage_text')[0];
        //massage_text.attrs.text="这个项目在odqoo.com是可浏览和可搜索的";
        massage_text.setText("这个项目在odqoo.com是可浏览和可搜索的");
        massage_text.absolutePosition({
          x: 40,
          y: 380
        });
        let unlisted_label = that.layer.find('.unlisted_label')[0];
        let unlisted_rect_temp = unlisted_label.find('Rect')[0];
        unlisted_rect_temp.attrs.fill='#e6e6e6';
        let unlisted_Text_temp = unlisted_label.find('Text')[0];
        unlisted_Text_temp.attrs.fill="#808080";

        let private_label = that.layer.find('.private_label')[0];
        let private_rect_temp = private_label.find('Rect')[0];
        private_rect_temp.attrs.fill='#e6e6e6';
        let private_Text_temp = private_label.find('Text')[0];
        private_Text_temp.attrs.fill="#808080";

        that.parent.head_canvas.attr.project.access="public";

        if(e){
          that.signal(that);
        }
      };

      var unlisted_fun = function (e) {

        let public_label = that.layer.find('.public_label')[0];
        let public_rect_temp = public_label.find('Rect')[0];
        public_rect_temp.attrs.fill='#e6e6e6';
        let public_Text_temp = public_label.find('Text')[0];
        public_Text_temp.attrs.fill='#808080';

        let massage_text = that.layer.find('.massage_text')[0];
        console.dir(massage_text);
        massage_text.setText("这个项目在odqoo.com是不能搜索到的，可以通过分享链接看到");
        //massage_text.attrs.text="这个项目在odqoo.com是不能搜索到的，其他用户可以通过分享链接看到";
        massage_text.absolutePosition({
          x: 10,
          y: 380
        });
        let unlisted_label = that.layer.find('.unlisted_label')[0];
        let unlisted_rect_temp = unlisted_label.find('Rect')[0];
        unlisted_rect_temp.attrs.fill='#707070';
        let unlisted_Text_temp = unlisted_label.find('Text')[0];
        unlisted_Text_temp.attrs.fill="#ebebeb";

        let private_label = that.layer.find('.private_label')[0];
        let private_rect_temp = private_label.find('Rect')[0];
        private_rect_temp.attrs.fill='#e6e6e6';
        let private_Text_temp = private_label.find('Text')[0];
        private_Text_temp.attrs.fill="#808080";
        that.parent.head_canvas.attr.project.access="unlisted";
        if(e){
          that.signal(that);
        }
      };

      var private_fun= function (e) {

        let public_label = that.layer.find('.public_label')[0];
        let public_rect_temp = public_label.find('Rect')[0];
        public_rect_temp.attrs.fill='#e6e6e6';
        let public_Text_temp = public_label.find('Text')[0];
        public_Text_temp.attrs.fill='#808080';

        let massage_text = that.layer.find('.massage_text')[0];
        //massage_text.attrs.text="只有自己才能看到";
        massage_text.setText("只有自己才能看到");
        massage_text.absolutePosition({
          x: 80,
          y: 380
        });
        let unlisted_label = that.layer.find('.unlisted_label')[0];
        let unlisted_rect_temp = unlisted_label.find('Rect')[0];
        unlisted_rect_temp.attrs.fill='#e6e6e6';
        let unlisted_Text_temp = unlisted_label.find('Text')[0];
        unlisted_Text_temp.attrs.fill="#808080";

        let private_label = that.layer.find('.private_label')[0];
        let private_rect_temp = private_label.find('Rect')[0];
        private_rect_temp.attrs.fill='#707070';
        let private_Text_temp = private_label.find('Text')[0];
        private_Text_temp.attrs.fill="#ebebeb";
        that.parent.head_canvas.attr.project.access="private";
        if(e){
          that.signal(that);
        }

      };

      switch (that.parent.head_canvas.attr.project.access) {
        case 'public':
          public_fun();
          break;
        case 'unlisted':
          unlisted_fun();
          break;
        case 'private':
          private_fun();
          break;
      }
      //label_projet_access_public.children
      label_projet_access_public.on( 'click', function () {
        public_fun(true);
      });

      label_projet_access_unlisted.on( 'click',function(){
        unlisted_fun(true);
      } );
      label_projet_access_private.on( 'click',function(){
        private_fun(true);
      } );
      //======
      if(!that.inputArr){
        that.inputArr=[];
      }else{
        for(let t=0;t<that.inputArr.length;t++){
          that.inputArr[t].removeEventListener();
        }
        that.inputArr=[];
      }
      that.fn=function () {

        var project_name_input = new CanvasInput({
          canvas: that.layer.canvas._canvas,
          fontSize: 12,
          fontFamily: 'Arial',
          fontColor: '#808080',
          //fontWeight: 'bold',
          width: that.width/2,
          padding: 8,
          borderWidth: 1,
          borderColor: '#e6e6e6',
          borderRadius: 3,
          boxShadow: '1px 1px 0px #e6e6e6',
          innerShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
          placeHolder: '请输入项目名字',
          x:that.width/2-26,
          y:40,
          value:that.parent.head_canvas.attr.project.name
        });
        that.inputArr.push(project_name_input);
        project_name_input.onkeyup(function () {
          console.dir(this._value);
          that.parent.head_canvas.attr.project.name=this._value;
          console.dir(that.parent.head_canvas.attr.project);
          that.parent.head_canvas.signal(that.parent.head_canvas);
        });
        //==
        var project_size_w_input = new CanvasInput({
          canvas: that.layer.canvas._canvas,
          fontSize: 12,
          fontFamily: 'Arial',
          fontColor: '#808080',
          //fontWeight: 'bold',
          width: that.width/6,
          padding: 8,
          borderWidth: 1,
          borderColor: '#e6e6e6',
          borderRadius: 3,
          boxShadow: '1px 1px 0px #e6e6e6',
          innerShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
          placeHolder: '请输入项目名字',
          x:that.width/2-26,
          y:70,
          value:that.parent.head_canvas.attr.project.size.width
        });
        that.inputArr.push(project_size_w_input);
        project_size_w_input.onkeyup(function () {
          console.dir(this._value);
          that.parent.head_canvas.attr.project.size.width=this._value;
          console.dir(that.parent.head_canvas.attr.project);
          that.parent.head_canvas.signal(that.parent.head_canvas);
          that.parent.centre_canvas.refreshSize();
        });
        var project_size_h_input = new CanvasInput({
          canvas: that.layer.canvas._canvas,
          fontSize: 12,
          fontFamily: 'Arial',
          fontColor: '#808080',
          //fontWeight: 'bold',
          width: that.width/6,
          padding: 8,
          borderWidth: 1,
          borderColor: '#e6e6e6',
          borderRadius: 3,
          boxShadow: '1px 1px 0px #e6e6e6',
          innerShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
          placeHolder: '请输入项目名字',
          x:that.width-that.width/6-26,
          y:70,
          value:that.parent.head_canvas.attr.project.size.height
        });
        that.inputArr.push(project_size_h_input);
        project_size_h_input.onkeyup(function () {
          console.dir(this._value);
          that.parent.head_canvas.attr.project.size.height=this._value;
          console.dir(that.parent.head_canvas.attr.project);
          that.parent.head_canvas.signal(that.parent.head_canvas);
          that.parent.centre_canvas.refreshSize();
        });
        var project_tags_input = new CanvasInput({
          canvas: that.layer.canvas._canvas,
          fontSize: 12,
          fontFamily: 'Arial',
          fontColor: '#808080',
          //fontWeight: 'bold',
          width: that.width-40,
          padding: 8,
          borderWidth: 1,
          borderColor: '#e6e6e6',
          borderRadius: 3,
          boxShadow: '1px 1px 0px #e6e6e6',
          innerShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
          //placeHolder: '请输入项目名字',
          x:10,
          y:215,
          value:that.parent.head_canvas.attr.project.tags
        });
        that.inputArr.push(project_tags_input);
        project_tags_input.onkeyup(function () {
          console.dir(this._value);
          that.parent.head_canvas.attr.project.tags=this._value;
          console.dir(that.parent.head_canvas.attr.project);
        });
        var project_description_input = new CanvasInput({
          canvas: that.layer.canvas._canvas,
          fontSize: 12,
          fontFamily: 'Arial',
          fontColor: '#808080',
          //fontWeight: 'bold',
          width: that.width-40,
          //height: 100,
          padding: 8,
          borderWidth: 1,
          borderColor: '#e6e6e6',
          borderRadius: 3,
          boxShadow: '1px 1px 0px #e6e6e6',
          innerShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
          //placeHolder: '请输入项目名字',
          x:10,
          y:280,
          value:that.parent.head_canvas.attr.project.description
        });
        that.inputArr.push(project_description_input);
        project_description_input.onkeyup(function () {
          console.dir(this._value);
          that.parent.head_canvas.attr.project.description=this._value;
          console.dir(that.parent.head_canvas.attr.project);
        });

      }
      // this.layerctx.fillStyle="#FF0000";
      // ctx.fillRect(0,0,150,75);
      //let navigationBar = new Konva

      /*
      * let group = new Konva.Group({
          x:temp_group_x,
          draggable: true,
        });
        let customShape = new Konva.Shape({
          x: temp_x,
          y: 0,
          fill: '#808080',
          // a Konva.Canvas renderer is passed into the sceneFunc function
          sceneFunc (context, shape) {
            context.beginPath();
            context.moveTo(temp_s, temp_e);
            context.lineTo(temp_e, temp_e);
            context.quadraticCurveTo(temp_s, temp_s/4, temp_s, temp_s);
            context.closePath();
            // Konva specific method
            context.fillStrokeShape(shape);
          }
        });
      * */

      //that.layer.destroyChildren();

      that.layer.draw();
      that.fn();
    }

    that.nodeAttrs=function (that) {
      that.layer.destroyChildren();
      let butontext='  返回   ';
      let projectname='  项目   ';
      var labelback = new Konva.Label({
        x: 2,
        y: 15,
        width: 76,
        height:26,
        //draggable: true
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
      labelback.on( 'click', function (e) {
        //返回
        that.layer.destroyChildren();
        that.layer.draw();
      });
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
      //======================================

      console.dir(that.parent.head_canvas.attr.project);
      let temp_name_lab = new Konva.Text({
        text: '名称',
        fontSize: 12,
        lineHeight: 2,
        fontFamily: 'Calibri',
        padding: 0,
        fill: '#808080',
        x: 10,
        y: 45,
      });
      that.layer.add( temp_name_lab );

      let temp_size_lab = new Konva.Text({
        text: '大小',
        fontSize: 12,
        lineHeight: 2,
        fontFamily: 'Calibri',
        padding: 0,
        fill: '#808080',
        x: 10,
        y: 75,
      });
      that.layer.add( temp_size_lab );

      let temp_size_w_lab = new Konva.Text({
        text: 'width',
        fontSize: 8,
        lineHeight: 2,
        fontFamily: 'Calibri',
        padding: 0,
        fill: '#808080',
        x: that.width/2-26+that.width/6/2,
        y: 100,
      });
      that.layer.add( temp_size_w_lab );

      let temp_size_h_lab = new Konva.Text({
        text: 'height',
        fontSize: 8,
        lineHeight: 2,
        fontFamily: 'Calibri',
        padding: 0,
        fill: '#808080',
        x: that.width-that.width/6-26+that.width/6/2,
        y: 100,
      });
      that.layer.add( temp_size_h_lab );
      let temp_selet_wh_lab = new Konva.Text({
        text: '选择预设',
        fontSize: 12,
        lineHeight: 2,
        fontFamily: 'Calibri',
        padding: 0,
        fill: '#808080',
        x: that.width/2,
        y: 115,
      });
      that.layer.add( temp_selet_wh_lab );
      let temp_backcolor_lab = new Konva.Text({
        text: '背景颜色',
        fontSize: 12,
        lineHeight: 2,
        fontFamily: 'Calibri',
        padding: 0,
        fill: '#808080',
        x: 10,
        y: 140,
      });
      that.layer.add( temp_backcolor_lab );


      var rect_colorGroup= new Konva.Group({
        x: that.width/2-26,
        y: 145,
        width: 25,
        height:25,
        //draggable: true,
      });
      rect_colorGroup.add(new Konva.Rect({
        x:0,
        y:0,
        width: 25,
        height: 25,
        fill: '#e6e6e6',
        stroke: '#808080',
        strokeWidth:0.8,
        cornerRadius: 3
      }));
      var rect_color = new Konva.Shape({
        x: 0,
        y: 0,
        // a Konva.Canvas renderer is passed into the sceneFunc function
        sceneFunc (context, shape) {
          if(that.parent.head_canvas.attr.project.backgroundType.typeid==1){
            var gradientBar = context.createLinearGradient(
              25*that.parent.head_canvas.attr.project.backgroundType.data.sw,
              25*that.parent.head_canvas.attr.project.backgroundType.data.sh,
              25*that.parent.head_canvas.attr.project.backgroundType.data.ew,
              25*that.parent.head_canvas.attr.project.backgroundType.data.eh
            );
            gradientBar.addColorStop(0, that.parent.head_canvas.attr.project.backgroundType.data.sc);
            gradientBar.addColorStop(1, that.parent.head_canvas.attr.project.backgroundType.data.ec);
            context.fillStyle = gradientBar;

          }else if(that.parent.head_canvas.attr.project.backgroundType.typeid==0){
            context.fillStyle = that.parent.head_canvas.attr.project.backgroundType.data.sc;
          }else if(that.parent.head_canvas.attr.project.backgroundType.typeid==2){
            var gradientBar = context.createRadialGradient(
              25*that.parent.head_canvas.attr.project.backgroundType.data.sw,
              25*that.parent.head_canvas.attr.project.backgroundType.data.sh,

              25*that.parent.head_canvas.attr.project.backgroundType.data.sr,


              25*that.parent.head_canvas.attr.project.backgroundType.data.ew,
              25*that.parent.head_canvas.attr.project.backgroundType.data.eh,

              25*that.parent.head_canvas.attr.project.backgroundType.data.er,
            );
            gradientBar.addColorStop(0, that.parent.head_canvas.attr.project.backgroundType.data.sc);
            gradientBar.addColorStop(1, that.parent.head_canvas.attr.project.backgroundType.data.ec);
            context.fillStyle = gradientBar;

          }
          context.strokeStyle="#808080";
          context.lineWidth=1;
          context.fillRect(0, 0, 25,25);
          context.strokeRect(0, 0,25, 25);
          context.fillStrokeShape(shape);
        }
      });


      rect_colorGroup.add(rect_color)
      that.layer.add( rect_colorGroup );
      rect_colorGroup.on( 'click', function (e) {
        //that.color(that,that.parent.head_canvas.attr.project.background)

        if(!that.inputArr){
          that.inputArr=[];
        }else{
          for(let t=0;t<that.inputArr.length;t++){
            that.inputArr[t].removeEventListener();
          }
          that.inputArr=[];
        }
        let colorControl = new ColorControl(that,that.parent.head_canvas.attr.project.backgroundType);

      });

      let rect_loop_color_lab = new Konva.Text({
        text: '循环播放',
        fontSize: 12,
        lineHeight: 2,
        fontFamily: 'Calibri',
        padding: 0,
        fill: '#808080',
        x: 10,
        y: 170,
      });
      that.layer.add( rect_loop_color_lab );

      let temp_loop_c='#e6e6e6';
      if(that.parent.head_canvas.attr.project.loop){
        temp_loop_c='#808080';
      }
      let rect_loop_color = new Konva.Rect({
        x:that.width/2-26,
        y:175,
        width: 10,
        height: 10,
        fill: temp_loop_c,
        stroke: '#808080',
        strokeWidth:0.5
      });
      that.layer.add( rect_loop_color );
      rect_loop_color.on( 'click', function (e) {
        if(this.attrs.fill=="#e6e6e6"){
          this.attrs.fill="#808080";
          that.parent.head_canvas.attr.project.loop=true;
        }else{
          this.attrs.fill="#e6e6e6";
          that.parent.head_canvas.attr.project.loop=false;
        }
        that.layer.draw();
        if(that.fn){that.fn();}
      });

      let tags_lab = new Konva.Text({
        text: '类别标签',
        fontSize: 12,
        lineHeight: 2,
        fontFamily: 'Calibri',
        padding: 0,
        fill: '#808080',
        x: 10,
        y: 195,
      });
      that.layer.add( tags_lab );

      let tags_maoshu_lab = new Konva.Text({
        text: '多个标签用逗号分隔',
        fontSize: 10,
        lineHeight: 2,
        fontFamily: 'Calibri',
        padding: 0,
        fill: '#808080',
        x: 70,
        y: 245,
      });
      that.layer.add( tags_maoshu_lab );

      let description_lab = new Konva.Text({
        text: '项目描述',
        fontSize: 12,
        lineHeight: 2,
        fontFamily: 'Calibri',
        padding: 0,
        fill: '#808080',
        x: 10,
        y: 260,
      });
      that.layer.add( description_lab );


      //======
      let projet_access_lab = new Konva.Text({
        text: '项目权限',
        fontSize: 12,
        lineHeight: 2,
        fontFamily: 'Calibri',
        padding: 0,
        fill: '#808080',
        x: 10,
        y: 320,
      });
      that.layer.add( projet_access_lab );

      //====public
      var label_projet_access_public= new Konva.Group({
        x: 40,
        y: 350,
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
        text: '   公共',
        fontSize: 12,
        lineHeight: 2,
        fontFamily: 'Calibri',
        padding: 0,
        fill: '#808080'
        //fill: '#f7f7f7'
      });
      text_projet_access_public.align('center');
      label_projet_access_public.add(text_projet_access_public);
      that.layer.add( label_projet_access_public );
      label_projet_access_public.addName('public_label');


      //======
      //====unlisted
      var label_projet_access_unlisted= new Konva.Group({
        x: 100,
        y: 350,
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
        text: '  未上市',
        fontSize: 12,
        lineHeight: 2,
        fontFamily: 'Calibri',
        padding: 0,
        fill: '#808080'
        //fill: '#f7f7f7'
      });
      text_projet_access_unlisted.align('center');
      label_projet_access_unlisted.add(text_projet_access_unlisted);
      that.layer.add( label_projet_access_unlisted );
      label_projet_access_unlisted.addName('unlisted_label');
      //======
      //====private
      var label_projet_access_private= new Konva.Group({
        x: 160,
        y: 350,
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
        text: '   私有',
        fontSize: 12,
        lineHeight: 2,
        fontFamily: 'Calibri',
        padding: 0,
        fill: '#808080'
        //fill: '#f7f7f7'
      });
      text_projet_access_private.align('center');
      label_projet_access_private.add(text_projet_access_private);
      that.layer.add( label_projet_access_private );
      label_projet_access_private.addName('private_label');
      //======
      let massage_lab = new Konva.Text({
        //name:'massagetext',
        text: '这个项目在odqoo.com是可浏览和可搜索的',
        fontSize: 8,
        lineHeight: 2,
        fontFamily: 'Calibri',
        padding: 0,
        fill: '#808080',
        x: 40,
        y: 380,
      });
      that.layer.add( massage_lab );
      massage_lab.addName('massage_text');
      //========
      console.dir(label_projet_access_public);
      console.dir(massage_lab.name());
      var public_fun=function (e) {
        let public_label = that.layer.find('.public_label')[0];
        let public_rect_temp = public_label.find('Rect')[0];
        public_rect_temp.attrs.fill='#707070';
        let public_Text_temp = public_label.find('Text')[0];
        public_Text_temp.attrs.fill='#ebebeb';

        let massage_text = that.layer.find('.massage_text')[0];
        //massage_text.attrs.text="这个项目在odqoo.com是可浏览和可搜索的";
        massage_text.setText("这个项目在odqoo.com是可浏览和可搜索的");
        massage_text.absolutePosition({
          x: 40,
          y: 380
        });
        let unlisted_label = that.layer.find('.unlisted_label')[0];
        let unlisted_rect_temp = unlisted_label.find('Rect')[0];
        unlisted_rect_temp.attrs.fill='#e6e6e6';
        let unlisted_Text_temp = unlisted_label.find('Text')[0];
        unlisted_Text_temp.attrs.fill="#808080";

        let private_label = that.layer.find('.private_label')[0];
        let private_rect_temp = private_label.find('Rect')[0];
        private_rect_temp.attrs.fill='#e6e6e6';
        let private_Text_temp = private_label.find('Text')[0];
        private_Text_temp.attrs.fill="#808080";

        that.parent.head_canvas.attr.project.access="public";

        if(e){
          that.signal(that);
        }
      };

      var unlisted_fun = function (e) {

        let public_label = that.layer.find('.public_label')[0];
        let public_rect_temp = public_label.find('Rect')[0];
        public_rect_temp.attrs.fill='#e6e6e6';
        let public_Text_temp = public_label.find('Text')[0];
        public_Text_temp.attrs.fill='#808080';

        let massage_text = that.layer.find('.massage_text')[0];
        console.dir(massage_text);
        massage_text.setText("这个项目在odqoo.com是不能搜索到的，可以通过分享链接看到");
        //massage_text.attrs.text="这个项目在odqoo.com是不能搜索到的，其他用户可以通过分享链接看到";
        massage_text.absolutePosition({
          x: 10,
          y: 380
        });
        let unlisted_label = that.layer.find('.unlisted_label')[0];
        let unlisted_rect_temp = unlisted_label.find('Rect')[0];
        unlisted_rect_temp.attrs.fill='#707070';
        let unlisted_Text_temp = unlisted_label.find('Text')[0];
        unlisted_Text_temp.attrs.fill="#ebebeb";

        let private_label = that.layer.find('.private_label')[0];
        let private_rect_temp = private_label.find('Rect')[0];
        private_rect_temp.attrs.fill='#e6e6e6';
        let private_Text_temp = private_label.find('Text')[0];
        private_Text_temp.attrs.fill="#808080";
        that.parent.head_canvas.attr.project.access="unlisted";
        if(e){
          that.signal(that);
        }
      };

      var private_fun= function (e) {

        let public_label = that.layer.find('.public_label')[0];
        let public_rect_temp = public_label.find('Rect')[0];
        public_rect_temp.attrs.fill='#e6e6e6';
        let public_Text_temp = public_label.find('Text')[0];
        public_Text_temp.attrs.fill='#808080';

        let massage_text = that.layer.find('.massage_text')[0];
        //massage_text.attrs.text="只有自己才能看到";
        massage_text.setText("只有自己才能看到");
        massage_text.absolutePosition({
          x: 80,
          y: 380
        });
        let unlisted_label = that.layer.find('.unlisted_label')[0];
        let unlisted_rect_temp = unlisted_label.find('Rect')[0];
        unlisted_rect_temp.attrs.fill='#e6e6e6';
        let unlisted_Text_temp = unlisted_label.find('Text')[0];
        unlisted_Text_temp.attrs.fill="#808080";

        let private_label = that.layer.find('.private_label')[0];
        let private_rect_temp = private_label.find('Rect')[0];
        private_rect_temp.attrs.fill='#707070';
        let private_Text_temp = private_label.find('Text')[0];
        private_Text_temp.attrs.fill="#ebebeb";
        that.parent.head_canvas.attr.project.access="private";
        if(e){
          that.signal(that);
        }

      };

      switch (that.parent.head_canvas.attr.project.access) {
        case 'public':
          public_fun();
          break;
        case 'unlisted':
          unlisted_fun();
          break;
        case 'private':
          private_fun();
          break;
      }
      //label_projet_access_public.children
      label_projet_access_public.on( 'click', function () {
        public_fun(true);
      });

      label_projet_access_unlisted.on( 'click',function(){
        unlisted_fun(true);
      } );
      label_projet_access_private.on( 'click',function(){
        private_fun(true);
      } );
      //======
      if(!that.inputArr){
        that.inputArr=[];
      }else{
        for(let t=0;t<that.inputArr.length;t++){
          that.inputArr[t].removeEventListener();
        }
        that.inputArr=[];
      }
      that.fn=function () {

        var project_name_input = new CanvasInput({
          canvas: that.layer.canvas._canvas,
          fontSize: 12,
          fontFamily: 'Arial',
          fontColor: '#808080',
          //fontWeight: 'bold',
          width: that.width/2,
          padding: 8,
          borderWidth: 1,
          borderColor: '#e6e6e6',
          borderRadius: 3,
          boxShadow: '1px 1px 0px #e6e6e6',
          innerShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
          placeHolder: '请输入项目名字',
          x:that.width/2-26,
          y:40,
          value:that.parent.head_canvas.attr.project.name
        });
        that.inputArr.push(project_name_input);
        project_name_input.onkeyup(function () {
          console.dir(this._value);
          that.parent.head_canvas.attr.project.name=this._value;
          console.dir(that.parent.head_canvas.attr.project);
          that.parent.head_canvas.signal(that.parent.head_canvas);
        });
        //==
        var project_size_w_input = new CanvasInput({
          canvas: that.layer.canvas._canvas,
          fontSize: 12,
          fontFamily: 'Arial',
          fontColor: '#808080',
          //fontWeight: 'bold',
          width: that.width/6,
          padding: 8,
          borderWidth: 1,
          borderColor: '#e6e6e6',
          borderRadius: 3,
          boxShadow: '1px 1px 0px #e6e6e6',
          innerShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
          placeHolder: '请输入项目名字',
          x:that.width/2-26,
          y:70,
          value:that.parent.head_canvas.attr.project.size.width
        });
        that.inputArr.push(project_size_w_input);
        project_size_w_input.onkeyup(function () {
          console.dir(this._value);
          that.parent.head_canvas.attr.project.size.width=this._value;
          console.dir(that.parent.head_canvas.attr.project);
          that.parent.head_canvas.signal(that.parent.head_canvas);
          that.parent.centre_canvas.refreshSize();
        });
        var project_size_h_input = new CanvasInput({
          canvas: that.layer.canvas._canvas,
          fontSize: 12,
          fontFamily: 'Arial',
          fontColor: '#808080',
          //fontWeight: 'bold',
          width: that.width/6,
          padding: 8,
          borderWidth: 1,
          borderColor: '#e6e6e6',
          borderRadius: 3,
          boxShadow: '1px 1px 0px #e6e6e6',
          innerShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
          placeHolder: '请输入项目名字',
          x:that.width-that.width/6-26,
          y:70,
          value:that.parent.head_canvas.attr.project.size.height
        });
        that.inputArr.push(project_size_h_input);

        project_size_h_input.onkeyup(function () {
          console.dir(this._value);
          that.parent.head_canvas.attr.project.size.height=this._value;
          console.dir(that.parent.head_canvas.attr.project);
          that.parent.head_canvas.signal(that.parent.head_canvas);
          that.parent.centre_canvas.refreshSize();
        });
        var project_tags_input = new CanvasInput({
          canvas: that.layer.canvas._canvas,
          fontSize: 12,
          fontFamily: 'Arial',
          fontColor: '#808080',
          //fontWeight: 'bold',
          width: that.width-40,
          padding: 8,
          borderWidth: 1,
          borderColor: '#e6e6e6',
          borderRadius: 3,
          boxShadow: '1px 1px 0px #e6e6e6',
          innerShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
          //placeHolder: '请输入项目名字',
          x:10,
          y:215,
          value:that.parent.head_canvas.attr.project.tags
        });
        that.inputArr.push(project_tags_input);
        project_tags_input.onkeyup(function () {
          console.dir(this._value);
          that.parent.head_canvas.attr.project.tags=this._value;
          console.dir(that.parent.head_canvas.attr.project);
        });
        var project_description_input = new CanvasInput({
          canvas: that.layer.canvas._canvas,
          fontSize: 12,
          fontFamily: 'Arial',
          fontColor: '#808080',
          //fontWeight: 'bold',
          width: that.width-40,
          //height: 100,
          padding: 8,
          borderWidth: 1,
          borderColor: '#e6e6e6',
          borderRadius: 3,
          boxShadow: '1px 1px 0px #e6e6e6',
          innerShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
          //placeHolder: '请输入项目名字',
          x:10,
          y:280,
          value:that.parent.head_canvas.attr.project.description
        });
        that.inputArr.push(project_description_input);
        project_description_input.onkeyup(function () {
          console.dir(this._value);
          that.parent.head_canvas.attr.project.description=this._value;
          console.dir(that.parent.head_canvas.attr.project);
        });

      }
      // this.layerctx.fillStyle="#FF0000";
      // ctx.fillRect(0,0,150,75);
      //let navigationBar = new Konva

      /*
      * let group = new Konva.Group({
          x:temp_group_x,
          draggable: true,
        });
        let customShape = new Konva.Shape({
          x: temp_x,
          y: 0,
          fill: '#808080',
          // a Konva.Canvas renderer is passed into the sceneFunc function
          sceneFunc (context, shape) {
            context.beginPath();
            context.moveTo(temp_s, temp_e);
            context.lineTo(temp_e, temp_e);
            context.quadraticCurveTo(temp_s, temp_s/4, temp_s, temp_s);
            context.closePath();
            // Konva specific method
            context.fillStrokeShape(shape);
          }
        });
      * */

      //that.layer.destroyChildren();

      that.layer.draw();
      that.fn();
    }


   //that.attrview();
  }
  attrview(){
    let that = this;
    console.dir(that);
    console.dir(that.parent.head_canvas.attr.project);


    that.parent.head_canvas.attr.project.bl=0.5;
    that.parent.head_canvas.attr.project.size.background=640;
    that.parent.head_canvas.attr.project.size.width=640;
    that.parent.head_canvas.attr.project.size.height=360;
    that.parent.centre_canvas.refreshSize();

  }
  configAttrview(node){

    if(node.temp_control){
      if(!node._styles){
        node._styles={};
      }
      node._styles.temp_control={
        topLeft:[node.bounds.topLeft.x, node.bounds.topLeft.y],
        topCenter:[node.bounds.topCenter.x, node.bounds.topCenter.y],
        topRight:[node.bounds.topRight.x, node.bounds.topRight.y],
        leftCenter:[node.bounds.leftCenter.x, node.bounds.leftCenter.y],
        center:[node.bounds.center.x, node.bounds.center.y],
        rightCenter:[node.bounds.rightCenter.x, node.bounds.rightCenter.y],
        bottomLeft:[node.bounds.bottomLeft.x, node.bounds.bottomLeft.y],
        bottomCenter:[node.bounds.bottomCenter.x, node.bounds.bottomCenter.y],
        bottomRight:[node.bounds.bottomRight.x, node.bounds.bottomRight.y],
        angle:node.temp_control.angle,
        center_control:[node.bounds.center.x, node.bounds.center.y-50],
        w:node.temp_control.w,
        h:node.temp_control.h,
        c:[node.bounds.center.x, node.bounds.center.y],
        x:node.position.x,
        y:node.position.y
      };
    }

    console.dir(node.style)
    let that = this;
    that.layer.destroyChildren();
    let butontext='  返回   ';
    let projectname='  项目   ';
    var labelback = new Konva.Label({
      x: 2,
      y: 15,
      width: 76,
      height:26,
      //draggable: true
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
    labelback.on( 'click', function (e) {
      //返回
      that.layer.destroyChildren();
      that.layer.draw();
    });
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
    //======================================
    let temp_backcolor_lab = new Konva.Text({
      text: '背景颜色',
      fontSize: 12,
      lineHeight: 2,
      fontFamily: 'Calibri',
      padding: 0,
      fill: '#808080',
      x: 10,
      y: 45,
    });
    that.layer.add( temp_backcolor_lab );
    var rect_colorGroup= new Konva.Group({
      x: that.width/2-26,
      y: 45,
      width: 25,
      height:25,
      //draggable: true,
    });
    rect_colorGroup.add(new Konva.Rect({
      x:0,
      y:0,
      width: 25,
      height: 25,
      fill: '#7b7b7b',
      stroke: '#808080',
      strokeWidth:0.8,
      cornerRadius: 3
    }));
    if(!node._styles){
      node._styles={
        //0正常1渐变2环形渐变
        fill:{typeid:1, data:{sw:0.5, sh:0, ew:0.5, eh:1, sr:0, er:1, sc:'#7b7b7b', ec:'#7b7b7b'}},
        stroke:{typeid:1, data:{sw:0.5, sh:0, ew:0.5, eh:1, sr:0, er:1, sc:'#000000', ec:'#000000'},strokeWidth:1},
        shadow:{typeid:0,data:{sc:'#000000'},shadowBlur:5,shadowOffset:{x:5,y:5}},
        opacity:1,
        registration:'center'
        //topLeft, topCenter, topRight, leftCenter, center, rightCenter, bottomLeft, bottomCenter, bottomRight
        //position:{x:node.position.x,y:node.position.y}

      }
    }
    var rect_color = new Konva.Shape({
      x: 0,
      y: 0,
      // a Konva.Canvas renderer is passed into the sceneFunc function
      sceneFunc (context, shape) {
        if(node._styles.fill.typeid==1){
          var gradientBar = context.createLinearGradient(
            25*node._styles.fill.data.sw,
            25*node._styles.fill.data.sh,
            25*node._styles.fill.data.ew,
            25*node._styles.fill.data.eh
          );
          gradientBar.addColorStop(0, node._styles.fill.data.sc);
          gradientBar.addColorStop(1, node._styles.fill.data.ec);
          context.fillStyle = gradientBar;

        }else if(node._styles.fill.typeid==0){
          context.fillStyle = node._styles.fill.data.sc;
        }else if(node._styles.fill.typeid==2){
          var gradientBar = context.createRadialGradient(
            25*node._styles.fill.data.sw,
            25*node._styles.fill.data.sh,

            25*node._styles.fill.data.sr,


            25*node._styles.fill.data.ew,
            25*node._styles.fill.data.eh,

            25*node._styles.fill.data.er,
          );
          gradientBar.addColorStop(0, node._styles.fill.data.sc);
          gradientBar.addColorStop(1, node._styles.fill.data.ec);
          context.fillStyle = gradientBar;

        }
        context.strokeStyle="#808080";
        context.lineWidth=1;
        context.fillRect(0, 0, 25,25);
        context.strokeRect(0, 0,25, 25);
        context.fillStrokeShape(shape);
      }
    });

    rect_colorGroup.add(rect_color)
    that.layer.add( rect_colorGroup );
    rect_colorGroup.on( 'click', function (e) {
      //that.color(that,that.parent.head_canvas.attr.project.background)
      if(!that.inputArr){
        that.inputArr=[];
      }else{
        for(let t=0;t<that.inputArr.length;t++){
          that.inputArr[t].removeEventListener();
        }
        that.inputArr=[];
      }
      let colorControl = new ColorControl(that,node._styles.fill,node);

    });

//===========
    let temp_stroke_lab = new Konva.Text({
      text: '边框颜色',
      fontSize: 12,
      lineHeight: 2,
      fontFamily: 'Calibri',
      padding: 0,
      fill: '#808080',
      x: 10,
      y: 75,
    });
    that.layer.add( temp_stroke_lab );

    var rect_stroke_colorGroup= new Konva.Group({
      x: that.width/2-26,
      y: 75,
      width: 25,
      height:25,
      //draggable: true,
    });
    rect_stroke_colorGroup.add(new Konva.Rect({
      x:0,
      y:0,
      width: 25,
      height: 25,
      fill: '#7b7b7b',
      stroke: '#808080',
      strokeWidth:0.8,
      cornerRadius: 3
    }));

    var rect_stroke_color = new Konva.Shape({
      x: 0,
      y: 0,
      // a Konva.Canvas renderer is passed into the sceneFunc function
      sceneFunc (context, shape) {
        if(node._styles.stroke.typeid==1){
          var gradientBar = context.createLinearGradient(
            25*node._styles.stroke.data.sw,
            25*node._styles.stroke.data.sh,
            25*node._styles.stroke.data.ew,
            25*node._styles.stroke.data.eh
          );
          gradientBar.addColorStop(0, node._styles.stroke.data.sc);
          gradientBar.addColorStop(1, node._styles.stroke.data.ec);
          context.fillStyle = gradientBar;

        }else if(node._styles.stroke.typeid==0){
          context.fillStyle = node._styles.stroke.data.sc;
        }else if(node._styles.stroke.typeid==2){
          var gradientBar = context.createRadialGradient(
            25*node._styles.stroke.data.sw,
            25*node._styles.stroke.data.sh,

            25*node._styles.stroke.data.sr,


            25*node._styles.stroke.data.ew,
            25*node._styles.stroke.data.eh,

            25*node._styles.stroke.data.er,
          );
          gradientBar.addColorStop(0, node._styles.stroke.data.sc);
          gradientBar.addColorStop(1, node._styles.stroke.data.ec);
          context.fillStyle = gradientBar;

        }
        context.strokeStyle="#808080";
        context.lineWidth=1;
        context.fillRect(0, 0, 25,25);
        context.strokeRect(0, 0,25, 25);
        context.fillStrokeShape(shape);
      }
    });
    rect_stroke_colorGroup.add(rect_stroke_color)
    that.layer.add( rect_stroke_colorGroup );
    rect_stroke_color.on( 'click', function (e) {
      //that.color(that,that.parent.head_canvas.attr.project.background)
      if(!that.inputArr){
        that.inputArr=[];
      }else{
        for(let t=0;t<that.inputArr.length;t++){
          that.inputArr[t].removeEventListener();
        }
        that.inputArr=[];
      }
      let colorControl = new ColorControl(that,node._styles.stroke,node,true);

    });
//=========== shadowColor   shadowBlur  shadowOffset
    let temp_shadow_lab = new Konva.Text({
      text: '阴影颜色',
      fontSize: 12,
      lineHeight: 2,
      fontFamily: 'Calibri',
      padding: 0,
      fill: '#808080',
      x: 10,
      y: 105,
    });
    that.layer.add( temp_shadow_lab );

    var rect_shadow_colorGroup= new Konva.Group({
      x: that.width/2-26,
      y: 105,
      width: 25,
      height:25,
      //draggable: true,
    });
    rect_shadow_colorGroup.add(new Konva.Rect({
      x:0,
      y:0,
      width: 25,
      height: 25,
      fill: '#000000',
      stroke: '#808080',
      strokeWidth:0.8,
      cornerRadius: 3
    }));

    var rect_shadow_color = new Konva.Shape({
      x: 0,
      y: 0,
      // a Konva.Canvas renderer is passed into the sceneFunc function
      sceneFunc (context, shape) {
        if(node._styles.shadow.typeid==0){
          context.fillStyle = node._styles.shadow.data.sc;
        }
        context.strokeStyle="#808080";
        context.lineWidth=1;
        context.fillRect(0, 0, 25,25);
        context.strokeRect(0, 0,25, 25);
        context.fillStrokeShape(shape);
      }
    });
    rect_shadow_colorGroup.add(rect_shadow_color)
    that.layer.add( rect_shadow_colorGroup );
    rect_shadow_color.on( 'click', function (e) {
      //that.color(that,that.parent.head_canvas.attr.project.background)
      if(!that.inputArr){
        that.inputArr=[];
      }else{
        for(let t=0;t<that.inputArr.length;t++){
          that.inputArr[t].removeEventListener();
        }
        that.inputArr=[];
      }
      let colorControl = new ColorControl(that,node._styles.shadow,node,false,true);
    });


    let temp_opacity_lab = new Konva.Text({
      text: '透明度',
      fontSize: 12,
      lineHeight: 2,
      fontFamily: 'Calibri',
      padding: 0,
      fill: '#808080',
      x: 10,
      y: 135,
    });
    that.layer.add( temp_opacity_lab );

    let temp_position_lab = new Konva.Text({
      text: '中心点',
      fontSize: 12,
      lineHeight: 2,
      fontFamily: 'Calibri',
      padding: 0,
      fill: '#808080',
      x: 10,
      y: 165,
    });
    that.layer.add( temp_position_lab );

    let temp_size_lab = new Konva.Text({
      text: '大小',
      fontSize: 12,
      lineHeight: 2,
      fontFamily: 'Calibri',
      padding: 0,
      fill: '#808080',
      x: 10,
      y: 195,
    });
    that.layer.add( temp_size_lab );

    let temp_scale_lab = new Konva.Text({
      text: '缩放',
      fontSize: 12,
      lineHeight: 2,
      fontFamily: 'Calibri',
      padding: 0,
      fill: '#808080',
      x: 10,
      y: 225,
    });
    that.layer.add( temp_scale_lab );

    let temp_rotate_lab = new Konva.Text({
      text: '旋转',
      fontSize: 12,
      lineHeight: 2,
      fontFamily: 'Calibri',
      padding: 0,
      fill: '#808080',
      x: 10,
      y: 255,
    });
    that.layer.add( temp_rotate_lab );

    let temp_registration_lab = new Konva.Text({
      text: '中心点',
      fontSize: 12,
      lineHeight: 2,
      fontFamily: 'Calibri',
      padding: 0,
      fill: '#808080',
      x: 10,
      y: 285,
    });
    that.layer.add( temp_registration_lab );





    //=================================================================================================================

    //registration:'center'
    //topLeft, topCenter, topRight, leftCenter, center, rightCenter, bottomLeft, bottomCenter, bottomRight
    let topLeft=new Konva.Rect({
      x:0,
      y:0,
      width: 10,
      height: 10,
      fill:  node._styles.registration=='topLeft'?'#c0c0c0':'#ffffff',
      stroke: '#000000',
      strokeWidth:1,
      cornerRadius: 3
    });
    let topCenter=new Konva.Rect({
      x:50-12,
      y:0,
      width: 10,
      height: 10,
      fill: node._styles.registration=='topCenter'?'#c0c0c0':'#ffffff',
      stroke: '#000000',
      strokeWidth:1,
      cornerRadius: 3
    });
    let topRight=new Konva.Rect({
      x:75,
      y:0,
      width: 10,
      height: 10,
      fill: node._styles.registration=='topRight'?'#c0c0c0':'#ffffff',
      stroke: '#000000',
      strokeWidth:1,
      cornerRadius: 3
    });


    let leftCenter=new Konva.Rect({
      x:0,
      y:50-12,
      width: 10,
      height: 10,
      fill: node._styles.registration=='leftCenter'?'#c0c0c0':'#ffffff',
      stroke: '#000000',
      strokeWidth:1,
      cornerRadius: 3
    });
    let center=new Konva.Rect({
      x:50-12,
      y:50-12,
      width: 10,
      height: 10,
      fill: node._styles.registration=='center'?'#c0c0c0':'#ffffff',
      stroke: '#000000',
      strokeWidth:1,
      cornerRadius: 3
    });
    let rightCenter=new Konva.Rect({
      x:75,
      y:50-12,
      width: 10,
      height: 10,
      fill: node._styles.registration=='rightCenter'?'#c0c0c0':'#ffffff',
      stroke: '#000000',
      strokeWidth:1,
      cornerRadius: 3
    });

    let bottomLeft=new Konva.Rect({
      x:0,
      y:75,
      width: 10,
      height: 10,
      fill: node._styles.registration=='bottomLeft'?'#c0c0c0':'#ffffff',
      stroke: '#000000',
      strokeWidth:1,
      cornerRadius: 3
    });
    let bottomCenter=new Konva.Rect({
      x:50-12,
      y:75,
      width: 10,
      height: 10,
      fill: node._styles.registration=='bottomCenter'?'#c0c0c0':'#ffffff',
      stroke: '#000000',
      strokeWidth:1,
      cornerRadius: 3
    });
    let bottomRight=new Konva.Rect({
      x:75,
      y:75,
      width: 10,
      height: 10,
      fill: node._styles.registration=='bottomRight'?'#c0c0c0':'#ffffff',
      stroke: '#000000',
      strokeWidth:1,
      cornerRadius: 3
    });

    var rect_registration_Group= new Konva.Group({
      x: that.width/2-60,
      y: 300,
      /*width: 25,
      height:25,*/
      //draggable: true,
    });
    rect_registration_Group.add(topLeft, topCenter, topRight, leftCenter, center, rightCenter, bottomLeft, bottomCenter, bottomRight);

    that.layer.add( rect_registration_Group );
    topLeft.on( 'click', function (e) {
      node._styles.registration='topLeft';
      node.temp_control={
        topLeft:[node.bounds.topLeft.x, node.bounds.topLeft.y],
        topCenter:[node.bounds.topCenter.x, node.bounds.topCenter.y],
        topRight:[node.bounds.topRight.x, node.bounds.topRight.y],
        leftCenter:[node.bounds.leftCenter.x, node.bounds.leftCenter.y],
        center:[node.bounds.center.x, node.bounds.center.y],
        rightCenter:[node.bounds.rightCenter.x, node.bounds.rightCenter.y],
        bottomLeft:[node.bounds.bottomLeft.x, node.bounds.bottomLeft.y],
        bottomCenter:[node.bounds.bottomCenter.x, node.bounds.bottomCenter.y],
        bottomRight:[node.bounds.bottomRight.x, node.bounds.bottomRight.y],
        angle:0,
        center_control:[node.bounds.center.x, node.bounds.center.y-50],
        w:1,
        h:1,
        c:[node.bounds.center.x, node.bounds.center.y],
        x:0,
        y:0
      };

      //node.temp_control.center=[node.bounds.topLeft.x, node.bounds.topLeft.y];
      node.temp_control.c=[node.bounds.topLeft.x, node.bounds.topLeft.y];
      node.temp_control.center_control=[node.bounds.topLeft.x, node.bounds.topLeft.y-50];
      that.configAttrview(node);
      that.parent.centre_canvas.canvasDom.eventNode(node);
      //node.onMouseDown();
    });
    topCenter.on( 'click', function (e) {
      node._styles.registration='topCenter';
      node.temp_control={
        topLeft:[node.bounds.topLeft.x, node.bounds.topLeft.y],
        topCenter:[node.bounds.topCenter.x, node.bounds.topCenter.y],
        topRight:[node.bounds.topRight.x, node.bounds.topRight.y],
        leftCenter:[node.bounds.leftCenter.x, node.bounds.leftCenter.y],
        center:[node.bounds.center.x, node.bounds.center.y],
        rightCenter:[node.bounds.rightCenter.x, node.bounds.rightCenter.y],
        bottomLeft:[node.bounds.bottomLeft.x, node.bounds.bottomLeft.y],
        bottomCenter:[node.bounds.bottomCenter.x, node.bounds.bottomCenter.y],
        bottomRight:[node.bounds.bottomRight.x, node.bounds.bottomRight.y],
        angle:0,
        center_control:[node.bounds.center.x, node.bounds.center.y-50],
        w:1,
        h:1,
        c:[node.bounds.center.x, node.bounds.center.y],
        x:0,
        y:0
      };
      //node.temp_control.center=[node.bounds.topCenter.x, node.bounds.topCenter.y];
      node.temp_control.c=[node.bounds.topCenter.x, node.bounds.topCenter.y];
      node.temp_control.center_control=[node.bounds.topCenter.x, node.bounds.topCenter.y-50];
      that.configAttrview(node);
      that.parent.centre_canvas.canvasDom.eventNode(node);
      //node.onMouseDown();
    });
    topRight.on( 'click', function (e) {
      node._styles.registration='topRight';
      node.temp_control={
        topLeft:[node.bounds.topLeft.x, node.bounds.topLeft.y],
        topCenter:[node.bounds.topCenter.x, node.bounds.topCenter.y],
        topRight:[node.bounds.topRight.x, node.bounds.topRight.y],
        leftCenter:[node.bounds.leftCenter.x, node.bounds.leftCenter.y],
        center:[node.bounds.center.x, node.bounds.center.y],
        rightCenter:[node.bounds.rightCenter.x, node.bounds.rightCenter.y],
        bottomLeft:[node.bounds.bottomLeft.x, node.bounds.bottomLeft.y],
        bottomCenter:[node.bounds.bottomCenter.x, node.bounds.bottomCenter.y],
        bottomRight:[node.bounds.bottomRight.x, node.bounds.bottomRight.y],
        angle:0,
        center_control:[node.bounds.center.x, node.bounds.center.y-50],
        w:1,
        h:1,
        c:[node.bounds.center.x, node.bounds.center.y],
        x:0,
        y:0
      };
      //node.temp_control.center=[node.bounds.topRight.x, node.bounds.topRight.y];
      node.temp_control.c=[node.bounds.topRight.x, node.bounds.topRight.y];
      node.temp_control.center_control=[node.bounds.topRight.x, node.bounds.topRight.y-50];
      that.configAttrview(node);
      that.parent.centre_canvas.canvasDom.eventNode(node);
      //node.onMouseDown();
    });
    //=
    leftCenter.on( 'click', function (e) {
      node._styles.registration='leftCenter';
      node.temp_control={
        topLeft:[node.bounds.topLeft.x, node.bounds.topLeft.y],
        topCenter:[node.bounds.topCenter.x, node.bounds.topCenter.y],
        topRight:[node.bounds.topRight.x, node.bounds.topRight.y],
        leftCenter:[node.bounds.leftCenter.x, node.bounds.leftCenter.y],
        center:[node.bounds.center.x, node.bounds.center.y],
        rightCenter:[node.bounds.rightCenter.x, node.bounds.rightCenter.y],
        bottomLeft:[node.bounds.bottomLeft.x, node.bounds.bottomLeft.y],
        bottomCenter:[node.bounds.bottomCenter.x, node.bounds.bottomCenter.y],
        bottomRight:[node.bounds.bottomRight.x, node.bounds.bottomRight.y],
        angle:0,
        center_control:[node.bounds.center.x, node.bounds.center.y-50],
        w:1,
        h:1,
        c:[node.bounds.center.x, node.bounds.center.y],
        x:0,
        y:0
      };
      //node.temp_control.center=[node.bounds.leftCenter.x, node.bounds.leftCenter.y];
      node.temp_control.c=[node.bounds.leftCenter.x, node.bounds.leftCenter.y];
      node.temp_control.center_control=[node.bounds.leftCenter.x, node.bounds.leftCenter.y-50];
      that.configAttrview(node);
      that.parent.centre_canvas.canvasDom.eventNode(node);
      //node.onMouseDown();
    });
    center.on( 'click', function (e) {
      node._styles.registration='center';
      node.temp_control={
        topLeft:[node.bounds.topLeft.x, node.bounds.topLeft.y],
        topCenter:[node.bounds.topCenter.x, node.bounds.topCenter.y],
        topRight:[node.bounds.topRight.x, node.bounds.topRight.y],
        leftCenter:[node.bounds.leftCenter.x, node.bounds.leftCenter.y],
        center:[node.bounds.center.x, node.bounds.center.y],
        rightCenter:[node.bounds.rightCenter.x, node.bounds.rightCenter.y],
        bottomLeft:[node.bounds.bottomLeft.x, node.bounds.bottomLeft.y],
        bottomCenter:[node.bounds.bottomCenter.x, node.bounds.bottomCenter.y],
        bottomRight:[node.bounds.bottomRight.x, node.bounds.bottomRight.y],
        angle:0,
        center_control:[node.bounds.center.x, node.bounds.center.y-50],
        w:1,
        h:1,
        c:[node.bounds.center.x, node.bounds.center.y],
        x:0,
        y:0
      };
      //node.temp_control.center=[node.bounds.center.x, node.bounds.center.y];
      node.temp_control.c=[node.bounds.center.x, node.bounds.center.y];
      node.temp_control.center_control=[node.bounds.center.x, node.bounds.center.y-50];
      that.configAttrview(node);
      that.parent.centre_canvas.canvasDom.eventNode(node);
      //node.onMouseDown();
    });
    rightCenter.on( 'click', function (e) {
      node._styles.registration='rightCenter';
      node.temp_control={
        topLeft:[node.bounds.topLeft.x, node.bounds.topLeft.y],
        topCenter:[node.bounds.topCenter.x, node.bounds.topCenter.y],
        topRight:[node.bounds.topRight.x, node.bounds.topRight.y],
        leftCenter:[node.bounds.leftCenter.x, node.bounds.leftCenter.y],
        center:[node.bounds.center.x, node.bounds.center.y],
        rightCenter:[node.bounds.rightCenter.x, node.bounds.rightCenter.y],
        bottomLeft:[node.bounds.bottomLeft.x, node.bounds.bottomLeft.y],
        bottomCenter:[node.bounds.bottomCenter.x, node.bounds.bottomCenter.y],
        bottomRight:[node.bounds.bottomRight.x, node.bounds.bottomRight.y],
        angle:0,
        center_control:[node.bounds.center.x, node.bounds.center.y-50],
        w:1,
        h:1,
        c:[node.bounds.center.x, node.bounds.center.y],
        x:0,
        y:0
      };
      //node.temp_control.center=[node.bounds.rightCenter.x, node.bounds.rightCenter.y];
      node.temp_control.c=[node.bounds.rightCenter.x, node.bounds.rightCenter.y];
      node.temp_control.center_control=[node.bounds.rightCenter.x, node.bounds.rightCenter.y-50];
      that.configAttrview(node);
      that.parent.centre_canvas.canvasDom.eventNode(node);
      //node.onMouseDown();
    });
    //==
    bottomLeft.on( 'click', function (e) {
      node._styles.registration='bottomLeft';
      node.temp_control={
        topLeft:[node.bounds.topLeft.x, node.bounds.topLeft.y],
        topCenter:[node.bounds.topCenter.x, node.bounds.topCenter.y],
        topRight:[node.bounds.topRight.x, node.bounds.topRight.y],
        leftCenter:[node.bounds.leftCenter.x, node.bounds.leftCenter.y],
        center:[node.bounds.center.x, node.bounds.center.y],
        rightCenter:[node.bounds.rightCenter.x, node.bounds.rightCenter.y],
        bottomLeft:[node.bounds.bottomLeft.x, node.bounds.bottomLeft.y],
        bottomCenter:[node.bounds.bottomCenter.x, node.bounds.bottomCenter.y],
        bottomRight:[node.bounds.bottomRight.x, node.bounds.bottomRight.y],
        angle:0,
        center_control:[node.bounds.center.x, node.bounds.center.y-50],
        w:1,
        h:1,
        c:[node.bounds.center.x, node.bounds.center.y],
        x:0,
        y:0
      };
      //node.temp_control.center=[node.bounds.bottomLeft.x, node.bounds.bottomLeft.y];
      node.temp_control.c=[node.bounds.bottomLeft.x, node.bounds.bottomLeft.y];
      node.temp_control.center_control=[node.bounds.bottomLeft.x, node.bounds.bottomLeft.y-50];
      that.configAttrview(node);
      that.parent.centre_canvas.canvasDom.eventNode(node);
      //node.onMouseDown();
    });
    bottomCenter.on( 'click', function (e) {
      node._styles.registration='bottomCenter';
      node.temp_control={
        topLeft:[node.bounds.topLeft.x, node.bounds.topLeft.y],
        topCenter:[node.bounds.topCenter.x, node.bounds.topCenter.y],
        topRight:[node.bounds.topRight.x, node.bounds.topRight.y],
        leftCenter:[node.bounds.leftCenter.x, node.bounds.leftCenter.y],
        center:[node.bounds.center.x, node.bounds.center.y],
        rightCenter:[node.bounds.rightCenter.x, node.bounds.rightCenter.y],
        bottomLeft:[node.bounds.bottomLeft.x, node.bounds.bottomLeft.y],
        bottomCenter:[node.bounds.bottomCenter.x, node.bounds.bottomCenter.y],
        bottomRight:[node.bounds.bottomRight.x, node.bounds.bottomRight.y],
        angle:0,
        center_control:[node.bounds.center.x, node.bounds.center.y-50],
        w:1,
        h:1,
        c:[node.bounds.center.x, node.bounds.center.y],
        x:0,
        y:0
      };
      //node.temp_control.center=[node.bounds.bottomCenter.x, node.bounds.bottomCenter.y];
      node.temp_control.c=[node.bounds.bottomCenter.x, node.bounds.bottomCenter.y];
      node.temp_control.center_control=[node.bounds.bottomCenter.x, node.bounds.bottomCenter.y-50];
      that.configAttrview(node);
      that.parent.centre_canvas.canvasDom.eventNode(node);
      //node.onMouseDown();
    });
    bottomRight.on( 'click', function (e) {
      node._styles.registration='bottomRight';
      node.temp_control={
        topLeft:[node.bounds.topLeft.x, node.bounds.topLeft.y],
        topCenter:[node.bounds.topCenter.x, node.bounds.topCenter.y],
        topRight:[node.bounds.topRight.x, node.bounds.topRight.y],
        leftCenter:[node.bounds.leftCenter.x, node.bounds.leftCenter.y],
        center:[node.bounds.center.x, node.bounds.center.y],
        rightCenter:[node.bounds.rightCenter.x, node.bounds.rightCenter.y],
        bottomLeft:[node.bounds.bottomLeft.x, node.bounds.bottomLeft.y],
        bottomCenter:[node.bounds.bottomCenter.x, node.bounds.bottomCenter.y],
        bottomRight:[node.bounds.bottomRight.x, node.bounds.bottomRight.y],
        angle:0,
        center_control:[node.bounds.center.x, node.bounds.center.y-50],
        w:1,
        h:1,
        c:[node.bounds.center.x, node.bounds.center.y],
        x:0,
        y:0
      };
      //node.temp_control.center=[node.bounds.bottomRight.x, node.bounds.bottomRight.y];
      node.temp_control.c=[node.bounds.bottomRight.x, node.bounds.bottomRight.y];
      node.temp_control.center_control=[node.bounds.bottomRight.x, node.bounds.bottomRight.y-50];
      that.configAttrview(node);
      that.parent.centre_canvas.canvasDom.eventNode(node);
      //node.onMouseDown();
    });
    //=================================================================================================================


    if(!that.inputArr){
      that.inputArr=[];
    }else{
      for(let t=0;t<that.inputArr.length;t++){
        that.inputArr[t].removeEventListener();
      }
      that.inputArr=[];
    }
    that.layer.draw();

    var project_strokeWidth_input = new CanvasInput({
      canvas: that.layer.canvas._canvas,
      fontSize: 12,
      fontFamily: 'Arial',
      fontColor: '#808080',
      //fontWeight: 'bold',
      width: that.width/6,
      padding: 8,
      borderWidth: 1,
      borderColor: '#e6e6e6',
      borderRadius: 3,
      boxShadow: '1px 1px 0px #e6e6e6',
      innerShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
      placeHolder: '请输入项目名字',
      x:that.width-that.width/6-26,
      y:75,
      value:node._styles.stroke.strokeWidth
    });
    that.inputArr.push(project_strokeWidth_input);
    project_strokeWidth_input.onkeyup(function () {
      console.dir(this._value);
      node._styles.stroke.strokeWidth=this._value;
      node.strokeWidth=node._styles.stroke.strokeWidth;
    });

    //=========== shadowColor   shadowBlur  shadowOffset
    var project_shadowBlur_input = new CanvasInput({
      canvas: that.layer.canvas._canvas,
      fontSize: 12,
      fontFamily: 'Arial',
      fontColor: '#808080',
      //fontWeight: 'bold',
      width: that.width/15,
      padding: 8,
      borderWidth: 1,
      borderColor: '#e6e6e6',
      borderRadius: 3,
      boxShadow: '1px 1px 0px #e6e6e6',
      innerShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
      placeHolder: '请输入项目名字',
      x:that.width-that.width/6-26-that.width/10*2,
      y:105,
      value:node._styles.shadow.shadowBlur
    });
    that.inputArr.push(project_shadowBlur_input);
    project_shadowBlur_input.onkeyup(function () {
      console.dir(this._value);
      node._styles.shadow.shadowBlur=this._value;
      node.shadowBlur=node._styles.shadow.shadowBlur;
      node.shadowOffset= new paper.Point(Number(node._styles.shadow.shadowOffset.x), Number(node._styles.shadow.shadowOffset.y));
    });
    //=======
    var project_shadowOffset_x_input = new CanvasInput({
      canvas: that.layer.canvas._canvas,
      fontSize: 12,
      fontFamily: 'Arial',
      fontColor: '#808080',
      //fontWeight: 'bold',
      width: that.width/15,
      padding: 8,
      borderWidth: 1,
      borderColor: '#e6e6e6',
      borderRadius: 3,
      boxShadow: '1px 1px 0px #e6e6e6',
      innerShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
      placeHolder: '请输入项目名字',
      x:that.width-that.width/6-35,
      y:105,
      value:node._styles.shadow.shadowOffset.x
    });
    that.inputArr.push(project_shadowOffset_x_input);
    project_shadowOffset_x_input.onkeyup(function () {
      console.dir(this._value);
      node._styles.shadow.shadowOffset.x=this._value;
      //node.shadowOffset.x=Number(node._styles.shadow.shadowOffset.x);
      node.shadowBlur=node._styles.shadow.shadowBlur;
      node.shadowOffset= new paper.Point(Number(node._styles.shadow.shadowOffset.x), Number(node._styles.shadow.shadowOffset.y));
    });
    //=======
    //=======
    var project_shadowOffset_y_input = new CanvasInput({
      canvas: that.layer.canvas._canvas,
      fontSize: 12,
      fontFamily: 'Arial',
      fontColor: '#808080',
      //fontWeight: 'bold',
      width: that.width/15,
      padding: 8,
      borderWidth: 1,
      borderColor: '#e6e6e6',
      borderRadius: 3,
      boxShadow: '1px 1px 0px #e6e6e6',
      innerShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
      placeHolder: '请输入项目名字',
      x:that.width-that.width/10-10,
      y:105,
      value:node._styles.shadow.shadowOffset.y
    });
    that.inputArr.push(project_shadowOffset_y_input);
    project_shadowOffset_y_input.onkeyup(function () {
      console.dir(this._value);
      node._styles.shadow.shadowOffset.y=this._value;
      node.shadowBlur=node._styles.shadow.shadowBlur;
      node.shadowOffset= new paper.Point(Number(node._styles.shadow.shadowOffset.x), Number(node._styles.shadow.shadowOffset.y));

    });
    //=======
    //===========

    var project_opacity_input = new CanvasInput({
      canvas: that.layer.canvas._canvas,
      fontSize: 12,
      fontFamily: 'Arial',
      fontColor: '#808080',
      //fontWeight: 'bold',
      width: that.width/6,
      padding: 8,
      borderWidth: 1,
      borderColor: '#e6e6e6',
      borderRadius: 3,
      boxShadow: '1px 1px 0px #e6e6e6',
      innerShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
      placeHolder: '请输入项目名字',
      x:that.width-that.width/6-26,
      y:135,
      value:node._styles.opacity
    });
    that.inputArr.push(project_opacity_input);
    project_opacity_input.onkeyup(function () {
      console.dir(this._value);
      node._styles.opacity=Number(this._value);
      node.opacity=node._styles.opacity;
    });
    //======position
    var project_position_x_input = new CanvasInput({
      canvas: that.layer.canvas._canvas,
      fontSize: 12,
      fontFamily: 'Arial',
      fontColor: '#808080',
      //fontWeight: 'bold',
      width: that.width/4,
      padding: 8,
      borderWidth: 1,
      borderColor: '#e6e6e6',
      borderRadius: 3,
      boxShadow: '1px 1px 0px #e6e6e6',
      innerShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
      placeHolder: '请输入项目名字',
      x:that.width/2-60,
      y:165,
      value:node.position.x.toFixed(2)
    });
    that.inputArr.push(project_position_x_input);
    project_position_x_input.onkeyup(function () {
      console.dir(this._value);
      node.position.x=Number(this._value).toFixed(2);
    });
    var project_position_y_input = new CanvasInput({
      canvas: that.layer.canvas._canvas,
      fontSize: 12,
      fontFamily: 'Arial',
      fontColor: '#808080',
      //fontWeight: 'bold',
      width: that.width/4,
      padding: 8,
      borderWidth: 1,
      borderColor: '#e6e6e6',
      borderRadius: 3,
      boxShadow: '1px 1px 0px #e6e6e6',
      innerShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
      placeHolder: '请输入项目名字',
      x:that.width-that.width/4-30,
      y:165,
      value:node.position.y.toFixed(2)
    });
    that.inputArr.push(project_position_y_input);
    project_position_y_input.onkeyup(function () {
      console.dir(this._value);
      node.position.y=Number(this._value).toFixed(2);
    });
    //==
    var project_size_w_input = new CanvasInput({
      canvas: that.layer.canvas._canvas,
      fontSize: 12,
      fontFamily: 'Arial',
      fontColor: '#808080',
      //fontWeight: 'bold',
      width: that.width/4,
      padding: 8,
      borderWidth: 1,
      borderColor: '#e6e6e6',
      borderRadius: 3,
      boxShadow: '1px 1px 0px #e6e6e6',
      innerShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
      placeHolder: '请输入项目名字',
      x:that.width/2-60,
      y:195,
      value:node.bounds.size.width.toFixed(2)
    });
    that.inputArr.push(project_size_w_input);
    project_size_w_input.onkeyup(function () {
      console.dir(this._value);
      node.bounds.size.width=Number(this._value).toFixed(2);
    });
    var project_size_h_input = new CanvasInput({
      canvas: that.layer.canvas._canvas,
      fontSize: 12,
      fontFamily: 'Arial',
      fontColor: '#808080',
      //fontWeight: 'bold',
      width: that.width/4,
      padding: 8,
      borderWidth: 1,
      borderColor: '#e6e6e6',
      borderRadius: 3,
      boxShadow: '1px 1px 0px #e6e6e6',
      innerShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
      placeHolder: '请输入项目名字',
      x:that.width-that.width/4-30,
      y:195,
      value:node.bounds.size.height.toFixed(2)
    });
    that.inputArr.push(project_size_h_input);
    project_size_h_input.onkeyup(function () {
      console.dir(this._value);
      node.bounds.size.height=Number(this._value).toFixed(2);
    });
    //==

    //==
    var project_scale_w_input = new CanvasInput({
      canvas: that.layer.canvas._canvas,
      fontSize: 12,
      fontFamily: 'Arial',
      fontColor: '#808080',
      //fontWeight: 'bold',
      width: that.width/4,
      padding: 8,
      borderWidth: 1,
      borderColor: '#e6e6e6',
      borderRadius: 3,
      boxShadow: '1px 1px 0px #e6e6e6',
      innerShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
      placeHolder: '请输入项目名字',
      x:that.width/2-60,
      y:225,
      value:node.temp_control?Number(node.temp_control.w).toFixed(2):1
    });
    that.inputArr.push(project_scale_w_input);
    project_scale_w_input.onkeyup(function () {
      console.dir(this._value);
      //node.bounds.size.width=Number(this._value).toFixed(2);
      node.temp_control.w=Number(Number(this._value).toFixed(2));
      //node.scale(node.temp_control.w,node.temp_control.h,node.temp_control.c);
      //that.parent.centre_canvas.canvasDom.eventNode(node);
      console.dir(that)
    });
    var project_scale_h_input = new CanvasInput({
      canvas: that.layer.canvas._canvas,
      fontSize: 12,
      fontFamily: 'Arial',
      fontColor: '#808080',
      //fontWeight: 'bold',
      width: that.width/4,
      padding: 8,
      borderWidth: 1,
      borderColor: '#e6e6e6',
      borderRadius: 3,
      boxShadow: '1px 1px 0px #e6e6e6',
      innerShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
      placeHolder: '请输入项目名字',
      x:that.width-that.width/4-30,
      y:225,
      value:node.temp_control?Number(node.temp_control.h).toFixed(2):1
    });
    that.inputArr.push(project_scale_h_input);
    project_scale_h_input.onkeyup(function () {
      console.dir(this._value);
     // node.bounds.size.height=Number(this._value).toFixed(2);
      node.temp_control.h=Number(Number(this._value).toFixed(2));
      //that.parent.centre_canvas.canvasDom.eventNode(node);
      console.dir(that)
      //eventNode
    });
    //==
    var project_rotate_input = new CanvasInput({
      canvas: that.layer.canvas._canvas,
      fontSize: 12,
      fontFamily: 'Arial',
      fontColor: '#808080',
      //fontWeight: 'bold',
      width: that.width/4,
      padding: 8,
      borderWidth: 1,
      borderColor: '#e6e6e6',
      borderRadius: 3,
      boxShadow: '1px 1px 0px #e6e6e6',
      innerShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
      placeHolder: '请输入项目名字',
      x:that.width/2-60,
      y:255,
      value:node.temp_control?Number(node.temp_control.angle).toFixed(2):0
    });
    that.inputArr.push(project_rotate_input);
    project_rotate_input.onkeyup(function () {
      console.dir(this._value);
      //node.bounds.size.width=Number(this._value).toFixed(2);
      node.temp_control.angle=Number(Number(this._value).toFixed(2));
      //node.scale(node.temp_control.w,node.temp_control.h,node.temp_control.c);
      //that.parent.centre_canvas.canvasDom.eventNode(node);
      console.dir(that)
    });





  }
  imagesview(){
    let that = this;
    that.layer.destroyChildren();
    let butontext='  返回   ';
    let projectname='  项目   ';
    var labelback = new Konva.Label({
      x: 2,
      y: 15,
      width: 76,
      height:26,
      //draggable: true
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
    labelback.on( 'click', function (e) {
      //返回
      that.layer.destroyChildren();
      that.layer.draw();
    });
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
    //======================================
    var imagesarr=[
      '/images/nv1.jpeg',
      '/images/nv2.jpeg',
      '/images/nv3.jpeg',
      '/images/nv4.jpeg',
      '/images/nv5.jpeg',
      '/images/nv6.jpeg',
      '/images/nv7.jpeg',
      '/images/nv8.jpeg',
      '/images/nv9.jpeg',
      '/images/nv10.jpeg',
      '/images/nv11.jpeg',
      '/images/nv12.jpeg',
      '/images/nv13.jpeg',
      '/images/nv14.jpeg'
    ];
    let count=0;
    for(let imagei=0;imagei<imagesarr.length;imagei++){
      let temp_X=0,temp_Y=0;

      if(imagei%2==0){
        temp_X=0;
        temp_Y=50+100*count;
      }else{
        temp_X=that.width/2;
        temp_Y=50+100*count;
        count++;
      }
      let imageObj = new Image();
      imageObj.onload = function() {
        let image = new Konva.Image({
          x: temp_X,
          y: temp_Y,
          image: imageObj,
          width: that.width/2-10,
          height: 100-10,
        });
        that.layer.add(image);
        that.layer.draw();
        image.on( 'click', function (e) {
          console.dir(image.attrs.image.src)
          that.parent.centre_canvas.canvasDom.imgDom(image.attrs.image.src);
        });
      };
      imageObj.src = imagesarr[imagei];
      //imageObj.src = '/images/nv1.jpeg'
    }


  }
  easingview(tempnode){
    let that = this;
    that.layer.destroyChildren();
    let butontext='  返回   ';
    let projectname='  项目   ';
    var labelback = new Konva.Label({
      x: 2,
      y: 15,
      width: 76,
      height:26,
      //draggable: true
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
    labelback.on( 'click', function (e) {
      //返回
      that.layer.destroyChildren();
      that.layer.draw();
    });
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
    //======================================


    let rect_loop_IN_lab = new Konva.Text({
      text: 'IN',
      fontSize: 12,
      lineHeight: 2,
      fontFamily: 'Calibri',
      padding: 0,
      fill: '#808080',
      x: 20,
      y: 40,
    });
    that.layer.add( rect_loop_IN_lab );

    let temp_loop_c='#e6e6e6';
    if(tempnode.EasingIN){
      temp_loop_c='#808080';
    }
    let rect_loop_IN = new Konva.Rect({
      x:that.width/2-26,
      y:50,
      width: 10,
      height: 10,
      fill: temp_loop_c,
      stroke: '#808080',
      strokeWidth:0.5
    });
    that.layer.add( rect_loop_IN );
    rect_loop_IN.on( 'click', function (e) {
      if(this.attrs.fill=="#e6e6e6"){
        this.attrs.fill="#808080";
        tempnode.EasingIN=true;
      }else{
        this.attrs.fill="#e6e6e6";
        tempnode.EasingIN=false;
      }
      that.layer.draw();
    });
    let rect_loop_OUT_lab = new Konva.Text({
      text: 'OUT',
      fontSize: 12,
      lineHeight: 2,
      fontFamily: 'Calibri',
      padding: 0,
      fill: '#808080',
      x: that.width/2+26,
      y: 40,
    });
    that.layer.add( rect_loop_OUT_lab );

    let temp_loop_c_OUT='#e6e6e6';
    if(tempnode.EasingOUT){
      temp_loop_c_OUT='#808080';
    }
    let rect_loop_OUT = new Konva.Rect({
      x:that.width-26,
      y:50,
      width: 10,
      height: 10,
      fill: temp_loop_c_OUT,
      stroke: '#808080',
      strokeWidth:0.5
    });
    that.layer.add( rect_loop_OUT );
    rect_loop_OUT.on( 'click', function (e) {
      if(this.attrs.fill=="#e6e6e6"){
        this.attrs.fill="#808080";
        tempnode.EasingOUT=true;
      }else{
        this.attrs.fill="#e6e6e6";
        tempnode.EasingOUT=false;
      }
      that.layer.draw();

    });

    //====Linear
    var label_projet_access_Linear= new Konva.Group({
      x: 40,
      y: 50+50,
      width: 50,
      height:24,
      //draggable: true,

    });
    label_projet_access_Linear.add(new Konva.Rect({
      x:0,
      y:0,
      width: 50,
      height: 24,
      fill: '#e6e6e6',
      stroke: '#808080',
      strokeWidth:0.8,
      cornerRadius: 3
    }));
    let text_projet_access_Linear = new Konva.Text({
      text: '   线性',
      fontSize: 12,
      lineHeight: 2,
      fontFamily: 'Calibri',
      padding: 0,
      fill: '#808080'
      //fill: '#f7f7f7'
    });
    text_projet_access_Linear.align('center');
    label_projet_access_Linear.add(text_projet_access_Linear);
    that.layer.add( label_projet_access_Linear );
    label_projet_access_Linear.addName('Linear_label');


    //======
    //====Quadratic
    var label_projet_access_Quadratic= new Konva.Group({
      x: 100,
      y: 50+50,
      width: 50,
      height:24,
      //draggable: true,

    });
    label_projet_access_Quadratic.add(new Konva.Rect({
      x:0,
      y:0,
      width: 50,
      height: 24,
      fill: '#e6e6e6',
      stroke: '#808080',
      strokeWidth:0.8,
      cornerRadius: 3
    }));


    let text_projet_access_Quadratic = new Konva.Text({
      text: '   二次',
      fontSize: 12,
      lineHeight: 2,
      fontFamily: 'Calibri',
      padding: 0,
      fill: '#808080'
      //fill: '#f7f7f7'
    });
    text_projet_access_Quadratic.align('center');
    label_projet_access_Quadratic.add(text_projet_access_Quadratic);
    that.layer.add( label_projet_access_Quadratic );
    label_projet_access_Quadratic.addName('Quadratic_label');
    //======
    //====Cubic
    var label_projet_access_Cubic= new Konva.Group({
      x: 160,
      y: 50+50,
      width: 50,
      height:24,
      //draggable: true,

    });
    label_projet_access_Cubic.add(new Konva.Rect({
      x:0,
      y:0,
      width: 50,
      height: 24,
      fill: '#e6e6e6',
      stroke: '#808080',
      strokeWidth:0.8,
      cornerRadius: 3
    }));
    let text_projet_access_Cubic = new Konva.Text({
      text: '   三次',
      fontSize: 12,
      lineHeight: 2,
      fontFamily: 'Calibri',
      padding: 0,
      fill: '#808080'
      //fill: '#f7f7f7'
    });
    text_projet_access_Cubic.align('center');
    label_projet_access_Cubic.add(text_projet_access_Cubic);
    that.layer.add( label_projet_access_Cubic );
    label_projet_access_Cubic.addName('Cubic_label');
    //======
    //============================================================================================
    //====Quartic
    var label_projet_access_Quartic= new Konva.Group({
      x: 40,
      y: 80+50,
      width: 50,
      height:24,
      //draggable: true,

    });
    label_projet_access_Quartic.add(new Konva.Rect({
      x:0,
      y:0,
      width: 50,
      height: 24,
      fill: '#e6e6e6',
      stroke: '#808080',
      strokeWidth:0.8,
      cornerRadius: 3
    }));
    let text_projet_access_Quartic = new Konva.Text({
      text: '   四次',
      fontSize: 12,
      lineHeight: 2,
      fontFamily: 'Calibri',
      padding: 0,
      fill: '#808080'
      //fill: '#f7f7f7'
    });
    text_projet_access_Quartic.align('center');
    label_projet_access_Quartic.add(text_projet_access_Quartic);
    that.layer.add( label_projet_access_Quartic );
    label_projet_access_Quartic.addName('Quartic_label');


    //======
    //====Quintic
    var label_projet_access_Quintic= new Konva.Group({
      x: 100,
      y: 80+50,
      width: 50,
      height:24,
      //draggable: true,

    });
    label_projet_access_Quintic.add(new Konva.Rect({
      x:0,
      y:0,
      width: 50,
      height: 24,
      fill: '#e6e6e6',
      stroke: '#808080',
      strokeWidth:0.8,
      cornerRadius: 3
    }));


    let text_projet_access_Quintic = new Konva.Text({
      text: '   五次',
      fontSize: 12,
      lineHeight: 2,
      fontFamily: 'Calibri',
      padding: 0,
      fill: '#808080'
      //fill: '#f7f7f7'
    });
    text_projet_access_Quintic.align('center');
    label_projet_access_Quintic.add(text_projet_access_Quintic);
    that.layer.add( label_projet_access_Quintic );
    label_projet_access_Quintic.addName('Quintic_label');
    //======
    //====Sinusoidal
    var label_projet_access_Sinusoidal= new Konva.Group({
      x: 160,
      y: 80+50,
      width: 50,
      height:24,
      //draggable: true,

    });
    label_projet_access_Sinusoidal.add(new Konva.Rect({
      x:0,
      y:0,
      width: 50,
      height: 24,
      fill: '#e6e6e6',
      stroke: '#808080',
      strokeWidth:0.8,
      cornerRadius: 3
    }));
    let text_projet_access_Sinusoidal = new Konva.Text({
      text: '   正弦',
      fontSize: 12,
      lineHeight: 2,
      fontFamily: 'Calibri',
      padding: 0,
      fill: '#808080'
      //fill: '#f7f7f7'
    });
    text_projet_access_Sinusoidal.align('center');
    label_projet_access_Sinusoidal.add(text_projet_access_Sinusoidal);
    that.layer.add( label_projet_access_Sinusoidal );
    label_projet_access_Sinusoidal.addName('Sinusoidal_label');
    //======
    //============================================================================================
    //====Exponential
    var label_projet_access_Exponential= new Konva.Group({
      x: 40,
      y: 120+50,
      width: 50,
      height:24,
      //draggable: true,

    });
    label_projet_access_Exponential.add(new Konva.Rect({
      x:0,
      y:0,
      width: 50,
      height: 24,
      fill: '#e6e6e6',
      stroke: '#808080',
      strokeWidth:0.8,
      cornerRadius: 3
    }));
    let text_projet_access_Exponential = new Konva.Text({
      text: '   指数',
      fontSize: 12,
      lineHeight: 2,
      fontFamily: 'Calibri',
      padding: 0,
      fill: '#808080'
      //fill: '#f7f7f7'
    });
    text_projet_access_Exponential.align('center');
    label_projet_access_Exponential.add(text_projet_access_Exponential);
    that.layer.add( label_projet_access_Exponential );
    label_projet_access_Exponential.addName('Exponential_label');
    //======
    //====Circular
    var label_projet_access_Circular= new Konva.Group({
      x: 100,
      y: 120+50,
      width: 50,
      height:24,
      //draggable: true,

    });
    label_projet_access_Circular.add(new Konva.Rect({
      x:0,
      y:0,
      width: 50,
      height: 24,
      fill: '#e6e6e6',
      stroke: '#808080',
      strokeWidth:0.8,
      cornerRadius: 3
    }));
    let text_projet_access_Circular = new Konva.Text({
      text: '   圆形',
      fontSize: 12,
      lineHeight: 2,
      fontFamily: 'Calibri',
      padding: 0,
      fill: '#808080'
      //fill: '#f7f7f7'
    });
    text_projet_access_Circular.align('center');
    label_projet_access_Circular.add(text_projet_access_Circular);
    that.layer.add( label_projet_access_Circular );
    label_projet_access_Circular.addName('Circular_label');
    //======
    //====Elastic
    var label_projet_access_Elastic= new Konva.Group({
      x: 160,
      y: 120+50,
      width: 50,
      height:24,
      //draggable: true,

    });
    label_projet_access_Elastic.add(new Konva.Rect({
      x:0,
      y:0,
      width: 50,
      height: 24,
      fill: '#e6e6e6',
      stroke: '#808080',
      strokeWidth:0.8,
      cornerRadius: 3
    }));
    let text_projet_access_Elastic = new Konva.Text({
      text: '   弹性',
      fontSize: 12,
      lineHeight: 2,
      fontFamily: 'Calibri',
      padding: 0,
      fill: '#808080'
      //fill: '#f7f7f7'
    });
    text_projet_access_Elastic.align('center');
    label_projet_access_Elastic.add(text_projet_access_Elastic);
    that.layer.add( label_projet_access_Elastic );
    label_projet_access_Elastic.addName('Elastic_label');
    //======
    //============================================================================================
    //====Back
    var label_projet_access_Back= new Konva.Group({
      x: 40,
      y: 150+50,
      width: 50,
      height:24,
      //draggable: true,

    });
    label_projet_access_Back.add(new Konva.Rect({
      x:0,
      y:0,
      width: 50,
      height: 24,
      fill: '#e6e6e6',
      stroke: '#808080',
      strokeWidth:0.8,
      cornerRadius: 3
    }));
    let text_projet_access_Back = new Konva.Text({
      text: '   背部',
      fontSize: 12,
      lineHeight: 2,
      fontFamily: 'Calibri',
      padding: 0,
      fill: '#808080'
      //fill: '#f7f7f7'
    });
    text_projet_access_Back.align('center');
    label_projet_access_Back.add(text_projet_access_Back);
    that.layer.add( label_projet_access_Back );
    label_projet_access_Back.addName('Back_label');
    //====Bounce
    var label_projet_access_Bounce= new Konva.Group({
      x: 100,
      y: 150+50,
      width: 50,
      height:24,
      //draggable: true,

    });
    label_projet_access_Bounce.add(new Konva.Rect({
      x:0,
      y:0,
      width: 50,
      height: 24,
      fill: '#e6e6e6',
      stroke: '#808080',
      strokeWidth:0.8,
      cornerRadius: 3
    }));
    let text_projet_access_Bounce = new Konva.Text({
      text: '   弹跳',
      fontSize: 12,
      lineHeight: 2,
      fontFamily: 'Calibri',
      padding: 0,
      fill: '#808080'
      //fill: '#f7f7f7'
    });
    text_projet_access_Bounce.align('center');
    label_projet_access_Bounce.add(text_projet_access_Bounce);
    that.layer.add( label_projet_access_Bounce );
    label_projet_access_Bounce.addName('Bounce_label');
    //========

    var Linear_fun=function (e) {
      let Linear_label = that.layer.find('.Linear_label')[0];
      let Linear_rect_temp = Linear_label.find('Rect')[0];
      Linear_rect_temp.attrs.fill='#707070';
      let Linear_Text_temp = Linear_label.find('Text')[0];
      Linear_Text_temp.attrs.fill='#ebebeb';

      let Quadratic_label = that.layer.find('.Quadratic_label')[0];
      let Quadratic_rect_temp = Quadratic_label.find('Rect')[0];
      Quadratic_rect_temp.attrs.fill='#e6e6e6';
      let Quadratic_Text_temp = Quadratic_label.find('Text')[0];
      Quadratic_Text_temp.attrs.fill="#808080";

      let Cubic_label = that.layer.find('.Cubic_label')[0];
      let Cubic_rect_temp = Cubic_label.find('Rect')[0];
      Cubic_rect_temp.attrs.fill='#e6e6e6';
      let Cubic_Text_temp = Cubic_label.find('Text')[0];
      Cubic_Text_temp.attrs.fill="#808080";

      let Quartic_label = that.layer.find('.Quartic_label')[0];
      let Quartic_rect_temp = Quartic_label.find('Rect')[0];
      Quartic_rect_temp.attrs.fill='#e6e6e6';
      let Quartic_Text_temp = Quartic_label.find('Text')[0];
      Quartic_Text_temp.attrs.fill="#808080";

      let Quintic_label = that.layer.find('.Quintic_label')[0];
      let Quintic_rect_temp = Quintic_label.find('Rect')[0];
      Quintic_rect_temp.attrs.fill='#e6e6e6';
      let Quintic_Text_temp = Quintic_label.find('Text')[0];
      Quintic_Text_temp.attrs.fill="#808080";

      let Sinusoidal_label = that.layer.find('.Sinusoidal_label')[0];
      let Sinusoidal_rect_temp = Sinusoidal_label.find('Rect')[0];
      Sinusoidal_rect_temp.attrs.fill='#e6e6e6';
      let Sinusoidal_Text_temp = Sinusoidal_label.find('Text')[0];
      Sinusoidal_Text_temp.attrs.fill="#808080";


      let Exponential_label = that.layer.find('.Exponential_label')[0];
      let Exponential_rect_temp = Exponential_label.find('Rect')[0];
      Exponential_rect_temp.attrs.fill='#e6e6e6';
      let Exponential_Text_temp = Exponential_label.find('Text')[0];
      Exponential_Text_temp.attrs.fill="#808080";

      let Circular_label = that.layer.find('.Circular_label')[0];
      let Circular_rect_temp = Circular_label.find('Rect')[0];
      Circular_rect_temp.attrs.fill='#e6e6e6';
      let Circular_Text_temp = Circular_label.find('Text')[0];
      Circular_Text_temp.attrs.fill="#808080";

      let Elastic_label = that.layer.find('.Elastic_label')[0];
      let Elastic_rect_temp = Elastic_label.find('Rect')[0];
      Elastic_rect_temp.attrs.fill='#e6e6e6';
      let Elastic_Text_temp = Elastic_label.find('Text')[0];
      Elastic_Text_temp.attrs.fill="#808080";

      let Back_label = that.layer.find('.Back_label')[0];
      let Back_rect_temp = Back_label.find('Rect')[0];
      Back_rect_temp.attrs.fill='#e6e6e6';
      let Back_Text_temp = Back_label.find('Text')[0];
      Back_Text_temp.attrs.fill="#808080";

      let Bounce_label = that.layer.find('.Bounce_label')[0];
      let Bounce_rect_temp = Bounce_label.find('Rect')[0];
      Bounce_rect_temp.attrs.fill='#e6e6e6';
      let Bounce_Text_temp = Bounce_label.find('Text')[0];
      Bounce_Text_temp.attrs.fill="#808080";

      tempnode.Easingtype="Linear";
      if(e){
        that.easingview(tempnode);
      }
    };

    var Quadratic_fun=function (e) {
      let Linear_label = that.layer.find('.Linear_label')[0];
      let Linear_rect_temp = Linear_label.find('Rect')[0];
      Linear_rect_temp.attrs.fill='#e6e6e6';
      let Linear_Text_temp = Linear_label.find('Text')[0];
      Linear_Text_temp.attrs.fill='#808080';

      let Quadratic_label = that.layer.find('.Quadratic_label')[0];
      let Quadratic_rect_temp = Quadratic_label.find('Rect')[0];
      Quadratic_rect_temp.attrs.fill='#707070';
      let Quadratic_Text_temp = Quadratic_label.find('Text')[0];
      Quadratic_Text_temp.attrs.fill="#ebebeb";

      tempnode.Easingtype="Quadratic";

      let Cubic_label = that.layer.find('.Cubic_label')[0];
      let Cubic_rect_temp = Cubic_label.find('Rect')[0];
      Cubic_rect_temp.attrs.fill='#e6e6e6';
      let Cubic_Text_temp = Cubic_label.find('Text')[0];
      Cubic_Text_temp.attrs.fill="#808080";

      let Quartic_label = that.layer.find('.Quartic_label')[0];
      let Quartic_rect_temp = Quartic_label.find('Rect')[0];
      Quartic_rect_temp.attrs.fill='#e6e6e6';
      let Quartic_Text_temp = Quartic_label.find('Text')[0];
      Quartic_Text_temp.attrs.fill="#808080";

      let Quintic_label = that.layer.find('.Quintic_label')[0];
      let Quintic_rect_temp = Quintic_label.find('Rect')[0];
      Quintic_rect_temp.attrs.fill='#e6e6e6';
      let Quintic_Text_temp = Quintic_label.find('Text')[0];
      Quintic_Text_temp.attrs.fill="#808080";

      let Sinusoidal_label = that.layer.find('.Sinusoidal_label')[0];
      let Sinusoidal_rect_temp = Sinusoidal_label.find('Rect')[0];
      Sinusoidal_rect_temp.attrs.fill='#e6e6e6';
      let Sinusoidal_Text_temp = Sinusoidal_label.find('Text')[0];
      Sinusoidal_Text_temp.attrs.fill="#808080";


      let Exponential_label = that.layer.find('.Exponential_label')[0];
      let Exponential_rect_temp = Exponential_label.find('Rect')[0];
      Exponential_rect_temp.attrs.fill='#e6e6e6';
      let Exponential_Text_temp = Exponential_label.find('Text')[0];
      Exponential_Text_temp.attrs.fill="#808080";

      let Circular_label = that.layer.find('.Circular_label')[0];
      let Circular_rect_temp = Circular_label.find('Rect')[0];
      Circular_rect_temp.attrs.fill='#e6e6e6';
      let Circular_Text_temp = Circular_label.find('Text')[0];
      Circular_Text_temp.attrs.fill="#808080";

      let Elastic_label = that.layer.find('.Elastic_label')[0];
      let Elastic_rect_temp = Elastic_label.find('Rect')[0];
      Elastic_rect_temp.attrs.fill='#e6e6e6';
      let Elastic_Text_temp = Elastic_label.find('Text')[0];
      Elastic_Text_temp.attrs.fill="#808080";

      let Back_label = that.layer.find('.Back_label')[0];
      let Back_rect_temp = Back_label.find('Rect')[0];
      Back_rect_temp.attrs.fill='#e6e6e6';
      let Back_Text_temp = Back_label.find('Text')[0];
      Back_Text_temp.attrs.fill="#808080";

      let Bounce_label = that.layer.find('.Bounce_label')[0];
      let Bounce_rect_temp = Bounce_label.find('Rect')[0];
      Bounce_rect_temp.attrs.fill='#e6e6e6';
      let Bounce_Text_temp = Bounce_label.find('Text')[0];
      Bounce_Text_temp.attrs.fill="#808080";


      if(e){
        that.easingview(tempnode);
      }
    };

    var Cubic_fun=function (e) {
      let Linear_label = that.layer.find('.Linear_label')[0];
      let Linear_rect_temp = Linear_label.find('Rect')[0];
      Linear_rect_temp.attrs.fill='#e6e6e6';
      let Linear_Text_temp = Linear_label.find('Text')[0];
      Linear_Text_temp.attrs.fill='#808080';

      let Quadratic_label = that.layer.find('.Quadratic_label')[0];
      let Quadratic_rect_temp = Quadratic_label.find('Rect')[0];
      Quadratic_rect_temp.attrs.fill='#e6e6e6';
      let Quadratic_Text_temp = Quadratic_label.find('Text')[0];
      Quadratic_Text_temp.attrs.fill="#808080";


      let Cubic_label = that.layer.find('.Cubic_label')[0];
      let Cubic_rect_temp = Cubic_label.find('Rect')[0];
      Cubic_rect_temp.attrs.fill='#707070';
      let Cubic_Text_temp = Cubic_label.find('Text')[0];
      Cubic_Text_temp.attrs.fill="#ebebeb";

      tempnode.Easingtype="Cubic";

      let Quartic_label = that.layer.find('.Quartic_label')[0];
      let Quartic_rect_temp = Quartic_label.find('Rect')[0];
      Quartic_rect_temp.attrs.fill='#e6e6e6';
      let Quartic_Text_temp = Quartic_label.find('Text')[0];
      Quartic_Text_temp.attrs.fill="#808080";

      let Quintic_label = that.layer.find('.Quintic_label')[0];
      let Quintic_rect_temp = Quintic_label.find('Rect')[0];
      Quintic_rect_temp.attrs.fill='#e6e6e6';
      let Quintic_Text_temp = Quintic_label.find('Text')[0];
      Quintic_Text_temp.attrs.fill="#808080";

      let Sinusoidal_label = that.layer.find('.Sinusoidal_label')[0];
      let Sinusoidal_rect_temp = Sinusoidal_label.find('Rect')[0];
      Sinusoidal_rect_temp.attrs.fill='#e6e6e6';
      let Sinusoidal_Text_temp = Sinusoidal_label.find('Text')[0];
      Sinusoidal_Text_temp.attrs.fill="#808080";


      let Exponential_label = that.layer.find('.Exponential_label')[0];
      let Exponential_rect_temp = Exponential_label.find('Rect')[0];
      Exponential_rect_temp.attrs.fill='#e6e6e6';
      let Exponential_Text_temp = Exponential_label.find('Text')[0];
      Exponential_Text_temp.attrs.fill="#808080";

      let Circular_label = that.layer.find('.Circular_label')[0];
      let Circular_rect_temp = Circular_label.find('Rect')[0];
      Circular_rect_temp.attrs.fill='#e6e6e6';
      let Circular_Text_temp = Circular_label.find('Text')[0];
      Circular_Text_temp.attrs.fill="#808080";

      let Elastic_label = that.layer.find('.Elastic_label')[0];
      let Elastic_rect_temp = Elastic_label.find('Rect')[0];
      Elastic_rect_temp.attrs.fill='#e6e6e6';
      let Elastic_Text_temp = Elastic_label.find('Text')[0];
      Elastic_Text_temp.attrs.fill="#808080";

      let Back_label = that.layer.find('.Back_label')[0];
      let Back_rect_temp = Back_label.find('Rect')[0];
      Back_rect_temp.attrs.fill='#e6e6e6';
      let Back_Text_temp = Back_label.find('Text')[0];
      Back_Text_temp.attrs.fill="#808080";

      let Bounce_label = that.layer.find('.Bounce_label')[0];
      let Bounce_rect_temp = Bounce_label.find('Rect')[0];
      Bounce_rect_temp.attrs.fill='#e6e6e6';
      let Bounce_Text_temp = Bounce_label.find('Text')[0];
      Bounce_Text_temp.attrs.fill="#808080";


      if(e){
        that.easingview(tempnode);
      }
    };

    var Quartic_fun=function (e) {
      let Linear_label = that.layer.find('.Linear_label')[0];
      let Linear_rect_temp = Linear_label.find('Rect')[0];
      Linear_rect_temp.attrs.fill='#e6e6e6';
      let Linear_Text_temp = Linear_label.find('Text')[0];
      Linear_Text_temp.attrs.fill='#808080';

      let Quadratic_label = that.layer.find('.Quadratic_label')[0];
      let Quadratic_rect_temp = Quadratic_label.find('Rect')[0];
      Quadratic_rect_temp.attrs.fill='#e6e6e6';
      let Quadratic_Text_temp = Quadratic_label.find('Text')[0];
      Quadratic_Text_temp.attrs.fill="#808080";


      let Cubic_label = that.layer.find('.Cubic_label')[0];
      let Cubic_rect_temp = Cubic_label.find('Rect')[0];
      Cubic_rect_temp.attrs.fill='#e6e6e6';
      let Cubic_Text_temp = Cubic_label.find('Text')[0];
      Cubic_Text_temp.attrs.fill="#808080";

      let Quartic_label = that.layer.find('.Quartic_label')[0];
      let Quartic_rect_temp = Quartic_label.find('Rect')[0];
      Quartic_rect_temp.attrs.fill='#707070';
      let Quartic_Text_temp = Quartic_label.find('Text')[0];
      Quartic_Text_temp.attrs.fill="#ebebeb";

      tempnode.Easingtype="Quartic";

      let Quintic_label = that.layer.find('.Quintic_label')[0];
      let Quintic_rect_temp = Quintic_label.find('Rect')[0];
      Quintic_rect_temp.attrs.fill='#e6e6e6';
      let Quintic_Text_temp = Quintic_label.find('Text')[0];
      Quintic_Text_temp.attrs.fill="#808080";

      let Sinusoidal_label = that.layer.find('.Sinusoidal_label')[0];
      let Sinusoidal_rect_temp = Sinusoidal_label.find('Rect')[0];
      Sinusoidal_rect_temp.attrs.fill='#e6e6e6';
      let Sinusoidal_Text_temp = Sinusoidal_label.find('Text')[0];
      Sinusoidal_Text_temp.attrs.fill="#808080";


      let Exponential_label = that.layer.find('.Exponential_label')[0];
      let Exponential_rect_temp = Exponential_label.find('Rect')[0];
      Exponential_rect_temp.attrs.fill='#e6e6e6';
      let Exponential_Text_temp = Exponential_label.find('Text')[0];
      Exponential_Text_temp.attrs.fill="#808080";

      let Circular_label = that.layer.find('.Circular_label')[0];
      let Circular_rect_temp = Circular_label.find('Rect')[0];
      Circular_rect_temp.attrs.fill='#e6e6e6';
      let Circular_Text_temp = Circular_label.find('Text')[0];
      Circular_Text_temp.attrs.fill="#808080";

      let Elastic_label = that.layer.find('.Elastic_label')[0];
      let Elastic_rect_temp = Elastic_label.find('Rect')[0];
      Elastic_rect_temp.attrs.fill='#e6e6e6';
      let Elastic_Text_temp = Elastic_label.find('Text')[0];
      Elastic_Text_temp.attrs.fill="#808080";

      let Back_label = that.layer.find('.Back_label')[0];
      let Back_rect_temp = Back_label.find('Rect')[0];
      Back_rect_temp.attrs.fill='#e6e6e6';
      let Back_Text_temp = Back_label.find('Text')[0];
      Back_Text_temp.attrs.fill="#808080";

      let Bounce_label = that.layer.find('.Bounce_label')[0];
      let Bounce_rect_temp = Bounce_label.find('Rect')[0];
      Bounce_rect_temp.attrs.fill='#e6e6e6';
      let Bounce_Text_temp = Bounce_label.find('Text')[0];
      Bounce_Text_temp.attrs.fill="#808080";


      if(e){
        that.easingview(tempnode);
      }
    };

    var Quintic_fun=function (e) {
      let Linear_label = that.layer.find('.Linear_label')[0];
      let Linear_rect_temp = Linear_label.find('Rect')[0];
      Linear_rect_temp.attrs.fill='#e6e6e6';
      let Linear_Text_temp = Linear_label.find('Text')[0];
      Linear_Text_temp.attrs.fill='#808080';

      let Quadratic_label = that.layer.find('.Quadratic_label')[0];
      let Quadratic_rect_temp = Quadratic_label.find('Rect')[0];
      Quadratic_rect_temp.attrs.fill='#e6e6e6';
      let Quadratic_Text_temp = Quadratic_label.find('Text')[0];
      Quadratic_Text_temp.attrs.fill="#808080";


      let Cubic_label = that.layer.find('.Cubic_label')[0];
      let Cubic_rect_temp = Cubic_label.find('Rect')[0];
      Cubic_rect_temp.attrs.fill='#e6e6e6';
      let Cubic_Text_temp = Cubic_label.find('Text')[0];
      Cubic_Text_temp.attrs.fill="#808080";

      let Quartic_label = that.layer.find('.Quartic_label')[0];
      let Quartic_rect_temp = Quartic_label.find('Rect')[0];
      Quartic_rect_temp.attrs.fill='#e6e6e6';
      let Quartic_Text_temp = Quartic_label.find('Text')[0];
      Quartic_Text_temp.attrs.fill="#808080";



      let Quintic_label = that.layer.find('.Quintic_label')[0];
      let Quintic_rect_temp = Quintic_label.find('Rect')[0];
      Quintic_rect_temp.attrs.fill='#707070';
      let Quintic_Text_temp = Quintic_label.find('Text')[0];
      Quintic_Text_temp.attrs.fill="#ebebeb";

      tempnode.Easingtype="Quintic";

      let Sinusoidal_label = that.layer.find('.Sinusoidal_label')[0];
      let Sinusoidal_rect_temp = Sinusoidal_label.find('Rect')[0];
      Sinusoidal_rect_temp.attrs.fill='#e6e6e6';
      let Sinusoidal_Text_temp = Sinusoidal_label.find('Text')[0];
      Sinusoidal_Text_temp.attrs.fill="#808080";


      let Exponential_label = that.layer.find('.Exponential_label')[0];
      let Exponential_rect_temp = Exponential_label.find('Rect')[0];
      Exponential_rect_temp.attrs.fill='#e6e6e6';
      let Exponential_Text_temp = Exponential_label.find('Text')[0];
      Exponential_Text_temp.attrs.fill="#808080";

      let Circular_label = that.layer.find('.Circular_label')[0];
      let Circular_rect_temp = Circular_label.find('Rect')[0];
      Circular_rect_temp.attrs.fill='#e6e6e6';
      let Circular_Text_temp = Circular_label.find('Text')[0];
      Circular_Text_temp.attrs.fill="#808080";

      let Elastic_label = that.layer.find('.Elastic_label')[0];
      let Elastic_rect_temp = Elastic_label.find('Rect')[0];
      Elastic_rect_temp.attrs.fill='#e6e6e6';
      let Elastic_Text_temp = Elastic_label.find('Text')[0];
      Elastic_Text_temp.attrs.fill="#808080";

      let Back_label = that.layer.find('.Back_label')[0];
      let Back_rect_temp = Back_label.find('Rect')[0];
      Back_rect_temp.attrs.fill='#e6e6e6';
      let Back_Text_temp = Back_label.find('Text')[0];
      Back_Text_temp.attrs.fill="#808080";

      let Bounce_label = that.layer.find('.Bounce_label')[0];
      let Bounce_rect_temp = Bounce_label.find('Rect')[0];
      Bounce_rect_temp.attrs.fill='#e6e6e6';
      let Bounce_Text_temp = Bounce_label.find('Text')[0];
      Bounce_Text_temp.attrs.fill="#808080";


      if(e){
        that.easingview(tempnode);
      }
    };

    var Sinusoidal_fun=function (e) {
      let Linear_label = that.layer.find('.Linear_label')[0];
      let Linear_rect_temp = Linear_label.find('Rect')[0];
      Linear_rect_temp.attrs.fill='#e6e6e6';
      let Linear_Text_temp = Linear_label.find('Text')[0];
      Linear_Text_temp.attrs.fill='#808080';

      let Quadratic_label = that.layer.find('.Quadratic_label')[0];
      let Quadratic_rect_temp = Quadratic_label.find('Rect')[0];
      Quadratic_rect_temp.attrs.fill='#e6e6e6';
      let Quadratic_Text_temp = Quadratic_label.find('Text')[0];
      Quadratic_Text_temp.attrs.fill="#808080";


      let Cubic_label = that.layer.find('.Cubic_label')[0];
      let Cubic_rect_temp = Cubic_label.find('Rect')[0];
      Cubic_rect_temp.attrs.fill='#e6e6e6';
      let Cubic_Text_temp = Cubic_label.find('Text')[0];
      Cubic_Text_temp.attrs.fill="#808080";

      let Quartic_label = that.layer.find('.Quartic_label')[0];
      let Quartic_rect_temp = Quartic_label.find('Rect')[0];
      Quartic_rect_temp.attrs.fill='#e6e6e6';
      let Quartic_Text_temp = Quartic_label.find('Text')[0];
      Quartic_Text_temp.attrs.fill="#808080";



      let Quintic_label = that.layer.find('.Quintic_label')[0];
      let Quintic_rect_temp = Quintic_label.find('Rect')[0];
      Quintic_rect_temp.attrs.fill='#e6e6e6';
      let Quintic_Text_temp = Quintic_label.find('Text')[0];
      Quintic_Text_temp.attrs.fill="#808080";



      let Sinusoidal_label = that.layer.find('.Sinusoidal_label')[0];
      let Sinusoidal_rect_temp = Sinusoidal_label.find('Rect')[0];
      Sinusoidal_rect_temp.attrs.fill='#707070';
      let Sinusoidal_Text_temp = Sinusoidal_label.find('Text')[0];
      Sinusoidal_Text_temp.attrs.fill="#ebebeb";

      tempnode.Easingtype="Sinusoidal";

      let Exponential_label = that.layer.find('.Exponential_label')[0];
      let Exponential_rect_temp = Exponential_label.find('Rect')[0];
      Exponential_rect_temp.attrs.fill='#e6e6e6';
      let Exponential_Text_temp = Exponential_label.find('Text')[0];
      Exponential_Text_temp.attrs.fill="#808080";

      let Circular_label = that.layer.find('.Circular_label')[0];
      let Circular_rect_temp = Circular_label.find('Rect')[0];
      Circular_rect_temp.attrs.fill='#e6e6e6';
      let Circular_Text_temp = Circular_label.find('Text')[0];
      Circular_Text_temp.attrs.fill="#808080";

      let Elastic_label = that.layer.find('.Elastic_label')[0];
      let Elastic_rect_temp = Elastic_label.find('Rect')[0];
      Elastic_rect_temp.attrs.fill='#e6e6e6';
      let Elastic_Text_temp = Elastic_label.find('Text')[0];
      Elastic_Text_temp.attrs.fill="#808080";

      let Back_label = that.layer.find('.Back_label')[0];
      let Back_rect_temp = Back_label.find('Rect')[0];
      Back_rect_temp.attrs.fill='#e6e6e6';
      let Back_Text_temp = Back_label.find('Text')[0];
      Back_Text_temp.attrs.fill="#808080";

      let Bounce_label = that.layer.find('.Bounce_label')[0];
      let Bounce_rect_temp = Bounce_label.find('Rect')[0];
      Bounce_rect_temp.attrs.fill='#e6e6e6';
      let Bounce_Text_temp = Bounce_label.find('Text')[0];
      Bounce_Text_temp.attrs.fill="#808080";


      if(e){
        that.easingview(tempnode);
      }
    };

    var Exponential_fun=function (e) {
      let Linear_label = that.layer.find('.Linear_label')[0];
      let Linear_rect_temp = Linear_label.find('Rect')[0];
      Linear_rect_temp.attrs.fill='#e6e6e6';
      let Linear_Text_temp = Linear_label.find('Text')[0];
      Linear_Text_temp.attrs.fill='#808080';

      let Quadratic_label = that.layer.find('.Quadratic_label')[0];
      let Quadratic_rect_temp = Quadratic_label.find('Rect')[0];
      Quadratic_rect_temp.attrs.fill='#e6e6e6';
      let Quadratic_Text_temp = Quadratic_label.find('Text')[0];
      Quadratic_Text_temp.attrs.fill="#808080";


      let Cubic_label = that.layer.find('.Cubic_label')[0];
      let Cubic_rect_temp = Cubic_label.find('Rect')[0];
      Cubic_rect_temp.attrs.fill='#e6e6e6';
      let Cubic_Text_temp = Cubic_label.find('Text')[0];
      Cubic_Text_temp.attrs.fill="#808080";

      let Quartic_label = that.layer.find('.Quartic_label')[0];
      let Quartic_rect_temp = Quartic_label.find('Rect')[0];
      Quartic_rect_temp.attrs.fill='#e6e6e6';
      let Quartic_Text_temp = Quartic_label.find('Text')[0];
      Quartic_Text_temp.attrs.fill="#808080";



      let Quintic_label = that.layer.find('.Quintic_label')[0];
      let Quintic_rect_temp = Quintic_label.find('Rect')[0];
      Quintic_rect_temp.attrs.fill='#e6e6e6';
      let Quintic_Text_temp = Quintic_label.find('Text')[0];
      Quintic_Text_temp.attrs.fill="#808080";



      let Sinusoidal_label = that.layer.find('.Sinusoidal_label')[0];
      let Sinusoidal_rect_temp = Sinusoidal_label.find('Rect')[0];
      Sinusoidal_rect_temp.attrs.fill='#e6e6e6';
      let Sinusoidal_Text_temp = Sinusoidal_label.find('Text')[0];
      Sinusoidal_Text_temp.attrs.fill="#808080";

      let Exponential_label = that.layer.find('.Exponential_label')[0];
      let Exponential_rect_temp = Exponential_label.find('Rect')[0];
      Exponential_rect_temp.attrs.fill='#707070';
      let Exponential_Text_temp = Exponential_label.find('Text')[0];
      Exponential_Text_temp.attrs.fill="#ebebeb";

      tempnode.Easingtype="Exponential";

      let Circular_label = that.layer.find('.Circular_label')[0];
      let Circular_rect_temp = Circular_label.find('Rect')[0];
      Circular_rect_temp.attrs.fill='#e6e6e6';
      let Circular_Text_temp = Circular_label.find('Text')[0];
      Circular_Text_temp.attrs.fill="#808080";

      let Elastic_label = that.layer.find('.Elastic_label')[0];
      let Elastic_rect_temp = Elastic_label.find('Rect')[0];
      Elastic_rect_temp.attrs.fill='#e6e6e6';
      let Elastic_Text_temp = Elastic_label.find('Text')[0];
      Elastic_Text_temp.attrs.fill="#808080";

      let Back_label = that.layer.find('.Back_label')[0];
      let Back_rect_temp = Back_label.find('Rect')[0];
      Back_rect_temp.attrs.fill='#e6e6e6';
      let Back_Text_temp = Back_label.find('Text')[0];
      Back_Text_temp.attrs.fill="#808080";

      let Bounce_label = that.layer.find('.Bounce_label')[0];
      let Bounce_rect_temp = Bounce_label.find('Rect')[0];
      Bounce_rect_temp.attrs.fill='#e6e6e6';
      let Bounce_Text_temp = Bounce_label.find('Text')[0];
      Bounce_Text_temp.attrs.fill="#808080";


      if(e){
        that.easingview(tempnode);
      }
    };

    var Circular_fun=function (e) {
      let Linear_label = that.layer.find('.Linear_label')[0];
      let Linear_rect_temp = Linear_label.find('Rect')[0];
      Linear_rect_temp.attrs.fill='#e6e6e6';
      let Linear_Text_temp = Linear_label.find('Text')[0];
      Linear_Text_temp.attrs.fill='#808080';

      let Quadratic_label = that.layer.find('.Quadratic_label')[0];
      let Quadratic_rect_temp = Quadratic_label.find('Rect')[0];
      Quadratic_rect_temp.attrs.fill='#e6e6e6';
      let Quadratic_Text_temp = Quadratic_label.find('Text')[0];
      Quadratic_Text_temp.attrs.fill="#808080";


      let Cubic_label = that.layer.find('.Cubic_label')[0];
      let Cubic_rect_temp = Cubic_label.find('Rect')[0];
      Cubic_rect_temp.attrs.fill='#e6e6e6';
      let Cubic_Text_temp = Cubic_label.find('Text')[0];
      Cubic_Text_temp.attrs.fill="#808080";

      let Quartic_label = that.layer.find('.Quartic_label')[0];
      let Quartic_rect_temp = Quartic_label.find('Rect')[0];
      Quartic_rect_temp.attrs.fill='#e6e6e6';
      let Quartic_Text_temp = Quartic_label.find('Text')[0];
      Quartic_Text_temp.attrs.fill="#808080";



      let Quintic_label = that.layer.find('.Quintic_label')[0];
      let Quintic_rect_temp = Quintic_label.find('Rect')[0];
      Quintic_rect_temp.attrs.fill='#e6e6e6';
      let Quintic_Text_temp = Quintic_label.find('Text')[0];
      Quintic_Text_temp.attrs.fill="#808080";



      let Sinusoidal_label = that.layer.find('.Sinusoidal_label')[0];
      let Sinusoidal_rect_temp = Sinusoidal_label.find('Rect')[0];
      Sinusoidal_rect_temp.attrs.fill='#e6e6e6';
      let Sinusoidal_Text_temp = Sinusoidal_label.find('Text')[0];
      Sinusoidal_Text_temp.attrs.fill="#808080";

      let Exponential_label = that.layer.find('.Exponential_label')[0];
      let Exponential_rect_temp = Exponential_label.find('Rect')[0];
      Exponential_rect_temp.attrs.fill='#e6e6e6';
      let Exponential_Text_temp = Exponential_label.find('Text')[0];
      Exponential_Text_temp.attrs.fill="#808080";

      let Circular_label = that.layer.find('.Circular_label')[0];
      let Circular_rect_temp = Circular_label.find('Rect')[0];
      Circular_rect_temp.attrs.fill='#707070';
      let Circular_Text_temp = Circular_label.find('Text')[0];
      Circular_Text_temp.attrs.fill="#ebebeb";

      tempnode.Easingtype="Circular";

      let Elastic_label = that.layer.find('.Elastic_label')[0];
      let Elastic_rect_temp = Elastic_label.find('Rect')[0];
      Elastic_rect_temp.attrs.fill='#e6e6e6';
      let Elastic_Text_temp = Elastic_label.find('Text')[0];
      Elastic_Text_temp.attrs.fill="#808080";

      let Back_label = that.layer.find('.Back_label')[0];
      let Back_rect_temp = Back_label.find('Rect')[0];
      Back_rect_temp.attrs.fill='#e6e6e6';
      let Back_Text_temp = Back_label.find('Text')[0];
      Back_Text_temp.attrs.fill="#808080";

      let Bounce_label = that.layer.find('.Bounce_label')[0];
      let Bounce_rect_temp = Bounce_label.find('Rect')[0];
      Bounce_rect_temp.attrs.fill='#e6e6e6';
      let Bounce_Text_temp = Bounce_label.find('Text')[0];
      Bounce_Text_temp.attrs.fill="#808080";


      if(e){
        that.easingview(tempnode);
      }
    };

    var Elastic_fun=function (e) {
      let Linear_label = that.layer.find('.Linear_label')[0];
      let Linear_rect_temp = Linear_label.find('Rect')[0];
      Linear_rect_temp.attrs.fill='#e6e6e6';
      let Linear_Text_temp = Linear_label.find('Text')[0];
      Linear_Text_temp.attrs.fill='#808080';

      let Quadratic_label = that.layer.find('.Quadratic_label')[0];
      let Quadratic_rect_temp = Quadratic_label.find('Rect')[0];
      Quadratic_rect_temp.attrs.fill='#e6e6e6';
      let Quadratic_Text_temp = Quadratic_label.find('Text')[0];
      Quadratic_Text_temp.attrs.fill="#808080";


      let Cubic_label = that.layer.find('.Cubic_label')[0];
      let Cubic_rect_temp = Cubic_label.find('Rect')[0];
      Cubic_rect_temp.attrs.fill='#e6e6e6';
      let Cubic_Text_temp = Cubic_label.find('Text')[0];
      Cubic_Text_temp.attrs.fill="#808080";

      let Quartic_label = that.layer.find('.Quartic_label')[0];
      let Quartic_rect_temp = Quartic_label.find('Rect')[0];
      Quartic_rect_temp.attrs.fill='#e6e6e6';
      let Quartic_Text_temp = Quartic_label.find('Text')[0];
      Quartic_Text_temp.attrs.fill="#808080";



      let Quintic_label = that.layer.find('.Quintic_label')[0];
      let Quintic_rect_temp = Quintic_label.find('Rect')[0];
      Quintic_rect_temp.attrs.fill='#e6e6e6';
      let Quintic_Text_temp = Quintic_label.find('Text')[0];
      Quintic_Text_temp.attrs.fill="#808080";

      let Sinusoidal_label = that.layer.find('.Sinusoidal_label')[0];
      let Sinusoidal_rect_temp = Sinusoidal_label.find('Rect')[0];
      Sinusoidal_rect_temp.attrs.fill='#e6e6e6';
      let Sinusoidal_Text_temp = Sinusoidal_label.find('Text')[0];
      Sinusoidal_Text_temp.attrs.fill="#808080";

      let Exponential_label = that.layer.find('.Exponential_label')[0];
      let Exponential_rect_temp = Exponential_label.find('Rect')[0];
      Exponential_rect_temp.attrs.fill='#e6e6e6';
      let Exponential_Text_temp = Exponential_label.find('Text')[0];
      Exponential_Text_temp.attrs.fill="#808080";

      let Circular_label = that.layer.find('.Circular_label')[0];
      let Circular_rect_temp = Circular_label.find('Rect')[0];
      Circular_rect_temp.attrs.fill='#e6e6e6';
      let Circular_Text_temp = Circular_label.find('Text')[0];
      Circular_Text_temp.attrs.fill="#808080";

      let Elastic_label = that.layer.find('.Elastic_label')[0];
      let Elastic_rect_temp = Elastic_label.find('Rect')[0];
      Elastic_rect_temp.attrs.fill='#707070';
      let Elastic_Text_temp = Elastic_label.find('Text')[0];
      Elastic_Text_temp.attrs.fill="#ebebeb";

      tempnode.Easingtype="Elastic";

      let Back_label = that.layer.find('.Back_label')[0];
      let Back_rect_temp = Back_label.find('Rect')[0];
      Back_rect_temp.attrs.fill='#e6e6e6';
      let Back_Text_temp = Back_label.find('Text')[0];
      Back_Text_temp.attrs.fill="#808080";

      let Bounce_label = that.layer.find('.Bounce_label')[0];
      let Bounce_rect_temp = Bounce_label.find('Rect')[0];
      Bounce_rect_temp.attrs.fill='#e6e6e6';
      let Bounce_Text_temp = Bounce_label.find('Text')[0];
      Bounce_Text_temp.attrs.fill="#808080";


      if(e){
        that.easingview(tempnode);
      }
    };

    var Back_fun=function (e) {
      let Linear_label = that.layer.find('.Linear_label')[0];
      let Linear_rect_temp = Linear_label.find('Rect')[0];
      Linear_rect_temp.attrs.fill='#e6e6e6';
      let Linear_Text_temp = Linear_label.find('Text')[0];
      Linear_Text_temp.attrs.fill='#808080';

      let Quadratic_label = that.layer.find('.Quadratic_label')[0];
      let Quadratic_rect_temp = Quadratic_label.find('Rect')[0];
      Quadratic_rect_temp.attrs.fill='#e6e6e6';
      let Quadratic_Text_temp = Quadratic_label.find('Text')[0];
      Quadratic_Text_temp.attrs.fill="#808080";


      let Cubic_label = that.layer.find('.Cubic_label')[0];
      let Cubic_rect_temp = Cubic_label.find('Rect')[0];
      Cubic_rect_temp.attrs.fill='#e6e6e6';
      let Cubic_Text_temp = Cubic_label.find('Text')[0];
      Cubic_Text_temp.attrs.fill="#808080";

      let Quartic_label = that.layer.find('.Quartic_label')[0];
      let Quartic_rect_temp = Quartic_label.find('Rect')[0];
      Quartic_rect_temp.attrs.fill='#e6e6e6';
      let Quartic_Text_temp = Quartic_label.find('Text')[0];
      Quartic_Text_temp.attrs.fill="#808080";



      let Quintic_label = that.layer.find('.Quintic_label')[0];
      let Quintic_rect_temp = Quintic_label.find('Rect')[0];
      Quintic_rect_temp.attrs.fill='#e6e6e6';
      let Quintic_Text_temp = Quintic_label.find('Text')[0];
      Quintic_Text_temp.attrs.fill="#808080";

      let Sinusoidal_label = that.layer.find('.Sinusoidal_label')[0];
      let Sinusoidal_rect_temp = Sinusoidal_label.find('Rect')[0];
      Sinusoidal_rect_temp.attrs.fill='#e6e6e6';
      let Sinusoidal_Text_temp = Sinusoidal_label.find('Text')[0];
      Sinusoidal_Text_temp.attrs.fill="#808080";

      let Exponential_label = that.layer.find('.Exponential_label')[0];
      let Exponential_rect_temp = Exponential_label.find('Rect')[0];
      Exponential_rect_temp.attrs.fill='#e6e6e6';
      let Exponential_Text_temp = Exponential_label.find('Text')[0];
      Exponential_Text_temp.attrs.fill="#808080";

      let Circular_label = that.layer.find('.Circular_label')[0];
      let Circular_rect_temp = Circular_label.find('Rect')[0];
      Circular_rect_temp.attrs.fill='#e6e6e6';
      let Circular_Text_temp = Circular_label.find('Text')[0];
      Circular_Text_temp.attrs.fill="#808080";

      let Elastic_label = that.layer.find('.Elastic_label')[0];
      let Elastic_rect_temp = Elastic_label.find('Rect')[0];
      Elastic_rect_temp.attrs.fill='#e6e6e6';
      let Elastic_Text_temp = Elastic_label.find('Text')[0];
      Elastic_Text_temp.attrs.fill="#808080";


      let Back_label = that.layer.find('.Back_label')[0];
      let Back_rect_temp = Back_label.find('Rect')[0];
      Back_rect_temp.attrs.fill='#707070';
      let Back_Text_temp = Back_label.find('Text')[0];
      Back_Text_temp.attrs.fill="#ebebeb";

      tempnode.Easingtype="Back";

      let Bounce_label = that.layer.find('.Bounce_label')[0];
      let Bounce_rect_temp = Bounce_label.find('Rect')[0];
      Bounce_rect_temp.attrs.fill='#e6e6e6';
      let Bounce_Text_temp = Bounce_label.find('Text')[0];
      Bounce_Text_temp.attrs.fill="#808080";


      if(e){
        that.easingview(tempnode);
      }
    };

    var Bounce_fun=function (e) {
      let Linear_label = that.layer.find('.Linear_label')[0];
      let Linear_rect_temp = Linear_label.find('Rect')[0];
      Linear_rect_temp.attrs.fill='#e6e6e6';
      let Linear_Text_temp = Linear_label.find('Text')[0];
      Linear_Text_temp.attrs.fill='#808080';

      let Quadratic_label = that.layer.find('.Quadratic_label')[0];
      let Quadratic_rect_temp = Quadratic_label.find('Rect')[0];
      Quadratic_rect_temp.attrs.fill='#e6e6e6';
      let Quadratic_Text_temp = Quadratic_label.find('Text')[0];
      Quadratic_Text_temp.attrs.fill="#808080";


      let Cubic_label = that.layer.find('.Cubic_label')[0];
      let Cubic_rect_temp = Cubic_label.find('Rect')[0];
      Cubic_rect_temp.attrs.fill='#e6e6e6';
      let Cubic_Text_temp = Cubic_label.find('Text')[0];
      Cubic_Text_temp.attrs.fill="#808080";

      let Quartic_label = that.layer.find('.Quartic_label')[0];
      let Quartic_rect_temp = Quartic_label.find('Rect')[0];
      Quartic_rect_temp.attrs.fill='#e6e6e6';
      let Quartic_Text_temp = Quartic_label.find('Text')[0];
      Quartic_Text_temp.attrs.fill="#808080";



      let Quintic_label = that.layer.find('.Quintic_label')[0];
      let Quintic_rect_temp = Quintic_label.find('Rect')[0];
      Quintic_rect_temp.attrs.fill='#e6e6e6';
      let Quintic_Text_temp = Quintic_label.find('Text')[0];
      Quintic_Text_temp.attrs.fill="#808080";

      let Sinusoidal_label = that.layer.find('.Sinusoidal_label')[0];
      let Sinusoidal_rect_temp = Sinusoidal_label.find('Rect')[0];
      Sinusoidal_rect_temp.attrs.fill='#e6e6e6';
      let Sinusoidal_Text_temp = Sinusoidal_label.find('Text')[0];
      Sinusoidal_Text_temp.attrs.fill="#808080";

      let Exponential_label = that.layer.find('.Exponential_label')[0];
      let Exponential_rect_temp = Exponential_label.find('Rect')[0];
      Exponential_rect_temp.attrs.fill='#e6e6e6';
      let Exponential_Text_temp = Exponential_label.find('Text')[0];
      Exponential_Text_temp.attrs.fill="#808080";

      let Circular_label = that.layer.find('.Circular_label')[0];
      let Circular_rect_temp = Circular_label.find('Rect')[0];
      Circular_rect_temp.attrs.fill='#e6e6e6';
      let Circular_Text_temp = Circular_label.find('Text')[0];
      Circular_Text_temp.attrs.fill="#808080";

      let Elastic_label = that.layer.find('.Elastic_label')[0];
      let Elastic_rect_temp = Elastic_label.find('Rect')[0];
      Elastic_rect_temp.attrs.fill='#e6e6e6';
      let Elastic_Text_temp = Elastic_label.find('Text')[0];
      Elastic_Text_temp.attrs.fill="#808080";


      let Back_label = that.layer.find('.Back_label')[0];
      let Back_rect_temp = Back_label.find('Rect')[0];
      Back_rect_temp.attrs.fill='#e6e6e6';
      let Back_Text_temp = Back_label.find('Text')[0];
      Back_Text_temp.attrs.fill="#808080";

      let Bounce_label = that.layer.find('.Bounce_label')[0];
      let Bounce_rect_temp = Bounce_label.find('Rect')[0];
      Bounce_rect_temp.attrs.fill='#707070';
      let Bounce_Text_temp = Bounce_label.find('Text')[0];
      Bounce_Text_temp.attrs.fill="#ebebeb";
      tempnode.Easingtype="Bounce";

      if(e){
        that.easingview(tempnode);
      }
    };



    switch (tempnode.Easingtype) {
      case 'Linear':
        Linear_fun();
        break;
      case 'Quadratic':
        Quadratic_fun();
        break;
      case 'Cubic':
        Cubic_fun();
        break;
      case 'Quartic':
        Quartic_fun();
        break;
      case 'Quintic':
        Quintic_fun();
        break;
      case 'Sinusoidal':
        Sinusoidal_fun();
        break;
      case 'Exponential':
        Exponential_fun();
        break;
      case 'Circular':
        Circular_fun();
        break;
      case 'Elastic':
        Elastic_fun();
        break;
      case 'Back':
        Back_fun();
        break;
      case 'Bounce':
        Bounce_fun();
        break;
    }
    label_projet_access_Linear.on( 'click', function () {
      Linear_fun(true);
    });
    label_projet_access_Quadratic.on( 'click', function () {
      Quadratic_fun(true);
    });
    label_projet_access_Cubic.on( 'click', function () {
      Cubic_fun(true);
    });
    label_projet_access_Quartic.on( 'click', function () {
      Quartic_fun(true);
    });
    label_projet_access_Quintic.on( 'click', function () {
      Quintic_fun(true);
    });
    label_projet_access_Sinusoidal.on( 'click', function () {
      Sinusoidal_fun(true);
    });
    label_projet_access_Exponential.on( 'click', function () {
      Exponential_fun(true);
    });
    label_projet_access_Circular.on( 'click', function () {
      Circular_fun(true);
    });
    label_projet_access_Elastic.on( 'click', function () {
      Elastic_fun(true);
    });
    label_projet_access_Back.on( 'click', function () {
      Back_fun(true);
    });
    label_projet_access_Bounce.on( 'click', function () {
      Bounce_fun(true);
    });
    //============================================================================================
    that.layer.draw();


  }
}
class Content_centre_navigationbar_canvas extends ContentCanvas{
  constructor(container='content_centre_navigationbar_div',strokeColor='#bcbcbc',parent){
    super(container,strokeColor,parent);
  }
  drawCell(){
    let that = this;
    that.zoom();
  }
  zoom(){
    let that = this;
    var enlarge = new Konva.Path({
      x: that.width-180,
      y: 2,
      data: 'M919.024645 800.073998 727.696062 608.710622c34.514071-54.779627 54.744835-119.43109 54.744835-188.948373 0-196.316178-159.125137-355.458711-355.424942-355.458711-196.298781 0-355.493503 159.142533-355.493503 355.458711s159.194722 355.459734 355.493503 355.459734c61.956074 0 120.201639-15.944134 170.957627-43.841507L792.871457 926.278351c37.033451 37.051871 89.74907 44.419675 117.681236 16.435321l24.922622-24.88783C963.47809 889.839441 956.128705 837.124845 919.024645 800.073998zM625.626385 481.368352 488.623082 481.368352l0 137.003304L365.410875 618.371656 365.410875 481.368352 228.408595 481.368352 228.408595 358.156146l137.003304 0L365.411899 221.152842l123.211183 0 0 137.003304 137.003304 0L625.626385 481.368352z',
      fill: '#7b7b7b',
      scaleX: 0.018,
      scaleY: 0.018,
    });
    that.layer.add(enlarge);
    enlarge.on( 'click', function (e) {
      that.parent.centre_canvas.zoomjia();
    });
    var narrow = new Konva.Path({
      x: that.width-80,
      y: 2,
      data: 'M927.744 829.44q28.672 32.768 31.232 57.344t-18.944 48.128q-24.576 27.648-54.272 26.112t-57.344-24.064l-164.864-157.696q-46.08 29.696-99.84 46.592t-113.152 16.896q-80.896 0-151.552-30.72t-123.392-83.456-82.944-123.392-30.208-151.552q0-79.872 30.208-150.528t82.944-123.392 123.392-83.456 151.552-30.72 151.552 30.72 123.392 83.456 83.456 123.392 30.72 150.528q0 61.44-17.92 116.736t-49.664 102.4l36.864 37.888q24.576 23.552 48.64 48.128t43.52 44.032zM450.56 705.536q53.248 0 100.352-19.968t81.92-54.784 54.784-81.92 19.968-100.352-19.968-100.352-54.784-81.92-81.92-54.784-100.352-19.968-99.84 19.968-81.408 54.784-55.296 81.92-20.48 100.352 20.48 100.352 55.296 81.92 81.408 54.784 99.84 19.968zM256 384l385.024 0 0 128-385.024 0 0-128z',
      fill: '#7b7b7b',
      scaleX: -0.017,
      scaleY: 0.017,
    });
    that.layer.add(narrow);
    narrow.on( 'click', function (e) {
      that.parent.centre_canvas.zoomjian();
    });
  }

}
class Content_centre_canvas_canvas extends ContentCanvas{
  constructor(container='content_centre_canvas_div',strokeColor='#bcbcbc',parent){
    super(container,strokeColor,parent);
    let that = this;
  }

  stageTransformer(){
    let that = this;
    that.stage.on('click tap', function(e) {
      console.dir('click tap');
      console.dir(e);
      console.dir(e.target);
      // if click on empty area - remove all transformers
      if (e.target === that.stage) {
        that.stage.find('Transformer').destroy();
        that.layer.draw();
        return;
      }
      // do nothing if clicked NOT on our rectangles
      if (!e.target.attrs.className) {
        that.stage.find('Transformer').destroy();
        that.layer.draw();
        return;
      }
      // remove old transformers
      // TODO: we can skip it if current rect is already selected
      that.stage.find('Transformer').destroy();

      // create new transformer
      var tr = new Konva.Transformer();
      that.layer.add(tr);
      tr.attachTo(e.target);
      that.layer.draw();
    });
  }

  init2(){
    let that = this;
    /*
      填充. 颜色, 渐变或图片.
      描边. 颜色与宽度.
      阴影. 颜色, 偏移量, 透明度与模糊
      透明度
      x, y. 表示正多边形的中心坐标.
      sides. 表示正多边形的边数.
      radius. 表示半径.
      fill. 填充颜色.
      stroke. 描边的颜色.
      strokeWidth. 描边的宽度.
      shadowOffsetX 和 shadowOffsety. 描述背景的偏移量.
      shadowBlur. 表示模糊程度.
      opacity. 表示透明度( 取值在 0, 1 之间 ).
      rect.absolutePosition({
        x: 15,
        y: 10
      });
    */
    /*矩形*/
    let rect = new Konva.Rect({
      x: 100,
      y: 50,
      width: 200,
      height: 100,
      fill: 'red',
      stroke: 'black',
      shadowBlur:40,
      shadowOffsetX: 20,
      shadowOffsetY: 25,
      opacity: 0.5
    });
    this.layer.add( rect );
    /*圆形*/
    var circle = new Konva.Circle({
      x: 300,
      y: 150,
      radius: 100,
      fill: 'pink',
      stroke: 'blue',
      shadowBlur:40,
      shadowOffsetX: 20,
      shadowOffsetY: 25,
      opacity: 0.5
    });
    this.layer.add( circle );

    /*自定义绘图路径*/
    var triangle = new Konva.Shape({
      sceneFunc: function ( ctx ) {
        // 自定义绘图路径
        ctx.moveTo( 400, 250 );
        ctx.lineTo(400 - 250*2 / ( 2 * 1.732 ), 250*2 * 3 / 4 );
        ctx.lineTo(400 + 250*2 / ( 2 * 1.732 ),250*2 * 3 / 4 );
        ctx.closePath();
        // Konva.js 的独有方法
        ctx.fillStrokeShape( this );
      },
      fill: 'pink',
      stroke: 'red',
      shadowBlur:40,
      shadowOffsetX: 20,
      shadowOffsetY: 25,
      opacity: 0.5
    });
    this.layer.add( triangle );
    /*绘制正五边形*/
    var shape = new Konva.RegularPolygon({
      x: 400,
      y: 250,
      sides: 5,
      radius: 70,
      fill: 'red',
      stroke: 'black',
      strokeWidth: 4,
      shadowOffsetX: 20,
      shadowOffsetY: 25,
      shadowBlurBlur: 40,
      opacity: 0.5
    });
    this.layer.add( shape );
    /*弧*/
    var arc = new Konva.Arc({
      x: 500,
      y: 250,
      innerRadius: 40,
      outerRadius: 80,
      fill: 'red',
      stroke: 'black',
      strokeWidth: 5,
      angle: 60,
      rotation: -120,
      strokeWidth: 4,
      shadowOffsetX: 20,
      shadowOffsetY: 25,
      shadowBlurBlur: 40,
      opacity: 0.5
    });
    this.layer.add( arc );
    /*线*/
    var line = new Konva.Line({
      points: [73, 70, 340, 23, 450, 60, 500, 20],
      fill: 'black',
      stroke: 'red',
      tension: 1,
      pointerLength : 10,
      pointerWidth : 12,
      shadowBlur:40,
      shadowOffsetX: 20,
      shadowOffsetY: 25,
      opacity: 0.5
    });
    this.layer.add( line );

    /*形状*/
    var rect_Shape = new Konva.Shape({
      fill: 'red',
      width: 200,
      height: 100,
      sceneFunc: (ctx, shape) => {
        // ctx - is context wrapper
        // shape - is instance of Konva.Shape, so it equals to "rect" variable
        ctx.rect(0, 0, shape.getAttr('width'), shape.getAttr('height'));
        // automatically fill shape from props and draw hit region
        ctx.fillStrokeShape(shape);
      }
    });
    this.layer.add( rect_Shape );
    /*椭圆*/
    var ellipse = new Konva.Ellipse({
      radius : {
        x : 150,
        y : 150
      }  ,
      // x : 550,
      // y : 550,
      fill: 'red',
      // width: 600,
      // height:600,
      offset : 10,
      drawBorder: true,
      pixelRatio:2
      // radius : {
      //
      //   fill: 'red',
      //   width: 600,
      //   height:600,
      //   offset : 10,
      //   drawBorder: true,
      //   pixelRatio:2
      // }
    });
    this.layer.add( ellipse );
    /*Image*/
    Konva.Image.fromURL('images/timg.png', function(image){
      image.cache({
        x: 330,
        y: 330,
        width: 50,
        height: 100,
        offset : 80,
        drawBorder: true
      });
      that.layer.add(image);
      that.layer.draw();
    });
    // create label
    var label = new Konva.Label({
      x: 100,
      y: 100,
      //draggable: true
    });

    // add a tag to the label
    label.add(new Konva.Tag({
      fill: '#bbb',
      stroke: '#333',
      shadowColor: 'black',
      shadowBlur: 10,
      shadowOffset: [10, 10],
      shadowOpacity: 0.2,
      lineJoin: 'round',
      pointerDirection: 'up',
      pointerWidth: 20,
      pointerHeight: 20,
      cornerRadius: 5
    }));

    // add text to the label
    label.add(new Konva.Text({
      text: 'Hello World!',
      fontSize: 50,
      lineHeight: 1.2,
      padding: 10,
      fill: 'green'
    }));
    that.layer.add(label);

    //====
    /*path*/
    var path = new Konva.Path({
      x: 240,
      y: 40,
      data: 'M12.582,9.551C3.251,16.237,0.921,29.021,7.08,38.564l-2.36,1.689l4.893,2.262l4.893,2.262l-0.568-5.36l-0.567-5.359l-2.365,1.694c-4.657-7.375-2.83-17.185,4.352-22.33c7.451-5.338,17.817-3.625,23.156,3.824c5.337,7.449,3.625,17.813-3.821,23.152l2.857,3.988c9.617-6.893,11.827-20.277,4.935-29.896C35.591,4.87,22.204,2.658,12.582,9.551z',
      fill: 'green',
      scaleX: 2,
      scaleY: 2
    });
    that.layer.add(path);
    /*5边行RegularPolygon*/
    var hexagon = new Konva.RegularPolygon({
      x: 100,
      y: 200,
      sides: 6,
      radius: 70,
      fill: 'red',
      stroke: 'black',
      strokeWidth: 4
    });
    that.layer.add(hexagon);
    /*空心圆 ring*/
    var ring = new Konva.Ring({
      x: 500,
      y: 500,
      innerRadius: 40,
      outerRadius: 80,
      fill: 'red',
      stroke: 'black',
      strokeWidth: 5
    });
    that.layer.add(ring);
    /*形状*/
    var customShape = new Konva.Shape({
      x: 600,
      y: 400,
      fill: 'red',
      // a Konva.Canvas renderer is passed into the sceneFunc function
      sceneFunc (context, shape) {
        context.beginPath();
        context.moveTo(200, 50);
        context.lineTo(420, 80);
        context.quadraticCurveTo(300, 100, 260, 170);
        context.closePath();
        // Konva specific method
        context.fillStrokeShape(shape);
      }
    });
    that.layer.add(customShape);
    /*星星*/
    var star = new Konva.Star({
      x: 500,
      y: 400,
      numPoints: 5,
      innerRadius: 170,
      outerRadius: 70,
      fill: 'red',
      stroke: 'black',
      strokeWidth: 4
    });
    that.layer.add(star);
    /*标签*/
    var tag = new Konva.Tag({
      fill: '#bbb',
      stroke: '#333',
      shadowColor: 'black',
      shadowBlur: 10,
      shadowOffset: [10, 10],
      shadowOpacity: 0.2,
      lineJoin: 'round',
      pointerDirection: 'up',
      pointerWidth: 20,
      pointerHeight: 20,
      cornerRadius: 15,
      x: 600,
      y: 200,
    });
    that.layer.add(tag);
    /**/
    var text = new Konva.Text({
      x: 10,
      y: 15,
      text: 'Simple Text',
      fontSize: 30,
      fontFamily: 'Calibri',
      fill: 'green'
    });
    that.layer.add(text);
    /*TextPath*/
    var kerningPairs = {
      'A': {
        ' ': -0.05517578125,
        'T': -0.07421875,
        'V': -0.07421875,
      } ,
      'V': {
        ',': -0.091796875,
        ":": -0.037109375,
        ";": -0.037109375,
        "A": -0.07421875,
      }
    }
    var textpath = new Konva.TextPath({
      x: 100,
      y: 50,
      fill: '#333',
      fontSize: '24',
      fontFamily: 'Arial',
      text: 'All the world\'s a stage, and all the men and women merely players.',
      data: 'M10,10 C0,0 10,150 100,100 S300,150 400,50',
      kerningFunc(leftChar, rightChar) {
        return kerningPairs.hasOwnProperty(leftChar) ? pairs[leftChar][rightChar] || 0 : 0
      }
    });
    that.layer.add(textpath);
    that.layer.draw();
  }
  drawBorderline(){
    let that = this;
   /* if(that.list_group_body){
      that.list_group_body.remove();
    }*/
    let _canvas_=that.layer.canvas._canvas;
    paper.setup(_canvas_);
    that.bg();
  }
  bg(){
    let that = this;
    if(that.list_group_body){
      that.list_group_body.remove();
    }
    that.list_group_body = new paper.Path.Rectangle({
      from: [0, 0],
      to: [that.width, that.height],
      stroke: that.strokeColor,
      strokeWidth: 1,
      fillColor:'#c0c0c0',
    });
  }
  displayLine(){
    let that = this;
    let style_one={
      name:'displayLine',
      from: [
        that.width/2-that.parent.head_canvas.attr.project.size.width/2,
        that.height/2-that.parent.head_canvas.attr.project.size.height/2],
      to: [that.parent.head_canvas.attr.project.size.width, that.parent.head_canvas.attr.project.size.height],
      fillColor:that.parent.head_canvas.attr.project.background,
      strokeColor: '#7a7a7a',
      strokeWidth: 1
    };
    if(that.parent.head_canvas.attr.project.backgroundType.typeid==1){
      style_one.fillColor={
        gradient:{
          stops:
            [that.parent.head_canvas.attr.project.backgroundType.data.sc, that.parent.head_canvas.attr.project.backgroundType.data.ec]
        },
        origin: [
          that.parent.head_canvas.attr.project.size.width*that.parent.head_canvas.attr.project.backgroundType.data.sw,
          that.parent.head_canvas.attr.project.size.height*that.parent.head_canvas.attr.project.backgroundType.data.sh
        ],
        destination: [
          that.parent.head_canvas.attr.project.size.width*that.parent.head_canvas.attr.project.backgroundType.data.ew,
          that.parent.head_canvas.attr.project.size.height*that.parent.head_canvas.attr.project.backgroundType.data.eh
        ]
      };
    }else if(that.parent.head_canvas.attr.project.backgroundType.typeid==0){
      style_one.fillColor = that.parent.head_canvas.attr.project.backgroundType.data.sc;
    }else if(that.parent.head_canvas.attr.project.backgroundType.typeid==2){
      style_one.fillColor={
        gradient:{
          stops:
            [
              [that.parent.head_canvas.attr.project.backgroundType.data.sc,that.parent.head_canvas.attr.project.backgroundType.data.sr],
              [that.parent.head_canvas.attr.project.backgroundType.data.ec,that.parent.head_canvas.attr.project.backgroundType.data.er]
            ],
          radial: true
        },
        origin: [
          that.parent.head_canvas.attr.project.size.width*that.parent.head_canvas.attr.project.backgroundType.data.sw,
          that.parent.head_canvas.attr.project.size.height*that.parent.head_canvas.attr.project.backgroundType.data.sh
        ],
        destination: [
          that.parent.head_canvas.attr.project.size.width*that.parent.head_canvas.attr.project.backgroundType.data.ew,
          that.parent.head_canvas.attr.project.size.height*that.parent.head_canvas.attr.project.backgroundType.data.eh
        ]
      };
    }
    if(that.group.children[style_one.name]){
      that.group.children[style_one.name].remove();
      that.group.children[style_one.name] = new paper.Path.Rectangle(style_one);
    }else{
      var path_canvashb = new paper.Path.Rectangle(style_one);
      that.group.addChild(path_canvashb);
    }

  }
  yaoUtil(){
    let that = this
    that.canvasDom = new CanvasDom(that);
    //that.canvasDom.create();
    // let ttt={attrs:{
    //     from: [355, 355],
    //     to: [666, 666],
    //     //x:0,y:0,width:100,height:100,
    //     fillColor: 'red',strokeColor: 'black',strokeWidth:1,id:'Rect'},className:"Rect"};
    // let node = new paper.Path.Rectangle(ttt.attrs);
    // node.remove();
  }
  drawCell(){
    let that = this;
    if(that.group){
      that.group.remove();
    }
    that.group = new paper.Group();

    that.displayLine();
    //that.init2();
    //that.stageTransformer();
    that.yaoUtil();
    that.group.scale(that.parent.head_canvas.attr.project.bl);
    this.fn=()=>{
      paper.view.draw();
     /* let ttt22={attrs:{
          from: [0, 0],
          to: [333, 333],
          //x:0,y:0,width:100,height:100,
          fillColor: 'red',strokeColor: 'black',strokeWidth:1,id:'Rect'},className:"Rect"};
     let node = new paper.Path.Rectangle(ttt22.attrs);*/
    }
  }
  refreshSize(){
    let that = this;
    that.layer.destroyChildren();
    that.layer.draw();
    that.bg();
    that.drawCell();
    console.dir(that);
    //paper.view.remove();

    /*that.drawCell();
    paper.view.update();*/

    //that.yaoUtil();

    //that.stageTransformer();
    //that.yaoUtil();

    // that.bl=0.9;
    // that.bgColor='#7a7a7a';
    /*that.parent.centre_canvas.layer.destroyChildren();
    that.drawBorderline();
    //that.init2();
    that.displayLine();
    that.stageTransformer();
    that.yaoUtil();
    that.layer.draw();*/
    //paper.view.draw();
  }
  zoomjia(){
    let that = this;
    that.parent.head_canvas.attr.project.bl=that.parent.head_canvas.attr.project.bl+0.1;
    if(that.parent.head_canvas.attr.project.bl>8){
      that.parent.head_canvas.attr.project.bl=8;
    }
    that.refreshSize();
  }
  zoomjian(){
    let that = this;
    that.parent.head_canvas.attr.project.bl=that.parent.head_canvas.attr.project.bl-0.1;
    if(that.parent.head_canvas.attr.project.bl<0.1){
      that.parent.head_canvas.attr.project.bl=0.1;
    }
    that.refreshSize();
  }
}
class Content_body_right_canvas extends ContentCanvas{
  constructor(container='content_body_right_div',strokeColor='#bcbcbc',parent){
    super(container,strokeColor,parent);
  }
  drawCell(){
    let that = this;
    that.event();
  }
  event(){
    let that = this;
    var add = new Konva.Path({
      x: 4,
      y: 3,
      data: 'M243.174168 550.404463c-27.159206 0-38.39184-11.25247-38.39184-38.395447 0-27.159206 11.232634-38.411676 38.39184-38.411676h230.369074v-230.387106c0-27.159206 11.250667-38.409873 38.408069-38.409873 27.141174 0 38.39184 11.250667 38.391841 38.409873v230.387106h230.387106c27.141174 0 38.393643 11.25247 38.393644 38.411676 0 27.142977-11.25247 38.395447-38.393644 38.395447H550.343152v230.38891c0 27.157403-11.250667 38.409873-38.391841 38.409873-27.157403 0-38.40807-11.25247-38.408069-38.409873V550.404463h-230.369074zM102.390262 1024h819.122099c56.550874 0 102.390262-45.842995 102.390262-102.397475V102.399279c0-56.540054-45.839388-102.399279-102.390262-102.399279H102.390262C45.839388 0.001803 0 45.861028 0 102.401082v819.203246c0 56.552677 45.839388 102.395672 102.390262 102.395672z',
      fill: '#7b7b7b',
      scaleX: 0.014,
      scaleY: 0.014,
    });
    that.layer.add(add);

    var copy = new Konva.Path({
      x: 26,
      y: 3,
      data: 'M896 170.666667H298.666667c-70.4 0-128 57.6-128 128v597.333333c0 70.4 57.6 128 128 128h597.333333c70.4 0 128-57.6 128-128V298.666667c0-70.4-57.6-128-128-128m0 85.333333c23.125333 0 42.666667 19.541333 42.666667 42.666667v597.333333c0 23.125333-19.541333 42.666667-42.666667 42.666667H298.666667c-23.125333 0-42.666667-19.541333-42.666667-42.666667V298.666667c0-23.125333 19.541333-42.666667 42.666667-42.666667h597.333333 M170.666667 768h-42.666667c-23.125333 0-42.666667-19.541333-42.666667-42.666667V128c0-23.125333 19.541333-42.666667 42.666667-42.666667h597.333333c23.125333 0 42.666667 19.541333 42.666667 42.666667v42.496h85.333333V128c0-70.4-57.6-128-128-128H128C57.6 0 0 57.6 0 128v597.333333c0 70.4 57.6 128 128 128h42.666667V768z M554.666667 768V426.666667c0-23.466667 19.2-42.666667 42.666666-42.666667s42.666667 19.2 42.666667 42.666667v341.333333c0 23.466667-19.2 42.666667-42.666667 42.666667s-42.666667-19.2-42.666666-42.666667 M768 640H426.666667c-23.466667 0-42.666667-19.2-42.666667-42.666667s19.2-42.666667 42.666667-42.666666h341.333333c23.466667 0 42.666667 19.2 42.666667 42.666666s-19.2 42.666667-42.666667 42.666667',
      fill: '#7b7b7b',
      scaleX: 0.016,
      scaleY: 0.016,
    });
    that.layer.add(copy);

    var delet = new Konva.Path({
      x: 48,
      y: 3,
      data: 'M482.656 316.672c0-17.6 14.4-32 32-32l0 0c17.6 0 32 14.4 32 32l0 485.344c0 17.6-14.4 32-32 32l0 0c-17.6 0-32-14.4-32-32L482.656 316.672zM332 316.672c0-17.6 14.4-32 32-32l0 0c17.6 0 32 14.4 32 32l0 485.344c0 17.6-14.4 32-32 32l0 0c-17.6 0-32-14.4-32-32L332 316.672zM633.344 316.672c0-17.6 14.4-32 32-32l0 0c17.6 0 32 14.4 32 32l0 485.344c0 17.6-14.4 32-32 32l0 0c-17.6 0-32-14.4-32-32L633.344 316.672zM898.656 159.328l-125.952 0-46.016 0 0-40.224c0-31.328-28.096-55.776-64-55.776l-296 0c-35.904 0-64 24.512-64 55.776l0 40.224-46.016 0-131.328 0c-17.664 0-32 14.304-32 32s14.336 32 32 32l67.328 0 0 674.912c0 34.432 28.704 62.432 64 62.432l516 0c35.296 0 64-28 64-62.432l0-674.912 61.984 0c17.664 0 32-14.304 32-32S916.32 159.328 898.656 159.328zM366.656 127.328l296 0 0 32-296 0L366.656 127.328zM739.008 896.768c0 0-414.016 1.376-449.024 1.376s-33.312-36.128-33.312-36.128 0-570.976 0-608 31.328-30.688 31.328-30.688l78.688 0 296 0 72.32 0c0 0 37.728-2.272 37.728 30.688s0.512 579.968 0.512 610.976S739.008 896.768 739.008 896.768z',
      fill: '#7b7b7b',
      scaleX: 0.017,
      scaleY: 0.017,
    });
    that.layer.add(delet);

    let linetitle = new Konva.Line({
      points: [0, 22,  that.width,22],
      stroke: '#bcbcbc',
      tension: 0,
      strokeWidth: 1,
      opacity: 1
    });
    that.layer.add(linetitle);
  }




}
class Content_head_canvas extends ContentCanvas{
  constructor(container='content_head_div',strokeColor='#bcbcbc',parent){
    super(container,strokeColor,parent);

  }
  drawCell(){
    let that = this;
    that.logoback();
    that.logoimg();
    this.projectConfig_init();
    that.projectView();
    that.signal=function (that) {
      let head_name_text = that.layer.find('.head_name_text')[0];
      that.layer.destroyChildren();
      that.logoimg();
      that.projectView();
      that.layer.draw();
    }
  }
  logoback(){
    let that = this;
    let list_group_body = new Konva.Rect({
      x: 0,
      y: 0,
      width: 49,
      height: that.height,
      stroke: that.strokeColor,
      strokeWidth: 1,
      //fill: '#292929',
    });
    this.layer.add( list_group_body );
  }
  logoimg(){
    let that = this;
    var imageObj = new Image();
    imageObj.onload = function() {
      var image = new Konva.Image({
        x: 5,
        y: 5,
        image: imageObj,
        width: 49-10,
        height: that.height-10
      });
      that.layer.add( image );
      that.layer.draw();
    };
    imageObj.src = '/images/logo_new2.png'
  }
  projectConfig_init(){
    let that = this;
   /* var tt=
      {
      "attrs":{"width":578,"height":200},
      "className":"Stage",
        "children":[
          {
            "attrs":{},
            "className":"Layer",
            "children":[
              {"attrs":{"x":100,"y":100,"sides":6,"radius":70,"fill":"red","stroke":"black","strokeWidth":4},
                "className":"RegularPolygon"}
                ]}]
      };
    var json ={
      "attrs":{"width":578,"height":200},
      "className":"Stage",
      "children":[{
        "attrs":{},
        "className":"Layer",
        "children":[
          {"attrs":{
            "width":"auto","height":"auto",
            "text":"Text Shadow!","fontFamily":"Calibri","fontSize":95,"x":20,"y":20,
            "stroke":"red","strokeWidth":2,"shadowColor":"black","shadowBlur":2,"shadowOffsetX":10,"shadowOffsetY":10,"shadowOpacity":0.5
          },"className":"Text"},
          {"attrs":{"stroke":"green","strokeWidth":10,"lineJoin":"round","lineCap":"round","points":[{"x":50,"y":140},{"x":450,"y":160}],
              "shadowColor":"black","shadowBlur":10,"shadowOffsetX":5,"shadowOffsetY":5,"shadowOpacity":0.5
            },"className":"Line"},
          {"attrs":{"x":280,"y":100,"width":100,"height":50,"fill":"#00D2FF","stroke":"black","strokeWidth":4,"shadowColor":"black",
              "shadowBlur":10,"shadowOffsetX":5,"shadowOffsetY":5,"shadowOpacity":0.5,"rotation":0.3490658503988659,"id":"blueRectangle"},
            "className":"Rect"},{"attrs":{"x":100,"y":41,"width":106,"height":118,"id":"yodaImage"},"className":"Image"}]}]};*/


    that.attr={
      project:{
        name:'测试',
        size:{width:640, height:360},
        rate:'10sec',
        bl:1,
        chooseFromPresets:[
          {name:'Banner',zhname:'横幅',size:{width:468, height:60}},
          {name:'Leaderboard',zhname:'排行榜',size:{width:728, height:90}},
          {name:'Mobile leaderboard',zhname:'移动排行榜',size:{width:320, height:50}},
          {name:'Square',zhname:'正方形',size:{width:250, height:250}},
          {name:'Small Square',zhname:'小正方形',size:{width:200, height:200}},
          {name:'Large rectangle',zhname:'大矩形',size:{width:336, height:280}},
          {name:'Inline rectangle',zhname:'内嵌矩形',size:{width:300, height:250}},
          {name:'Skyscraper',zhname:'摩天大楼',size:{width:120, height:600}},
          {name:'Wide Skyscraper',zhname:'宽摩天楼',size:{width:160, height:600}},
          {name:'Half page',zhname:'半页',size:{width:300, height:600}},
          {name:'Large leaderboard',zhname:'大排行榜',size:{width:970, height:90}},
          {name:'Large Mobile Banner',zhname:'大移动横幅',size:{width:320, height:100}},
          {name:'Billboard',zhname:'广告牌',size:{width:970, height:250}},
          {name:'Portrait',zhname:'肖像',size:{width:300, height:1050}},
          {name:'Panorama',zhname:'展开图',size:{width:980, height:120}},
          {name:'Top Banner',zhname:'顶级横幅',size:{width:930, height:180}},
          {name:'Triple widescreen',zhname:'三重宽屏',size:{width:250, height:360}},
          {name:'NetBoard',zhname:'网板',size:{width:580, height:400}},
          ],
        //background:'#e6e6e6',//e6e6e6
        backgroundType:{
         /* typeid:0,//0正常1渐变2环形渐变
          data:''*/
          typeid:1,//0正常1渐变2环形渐变
          data:{
            sw:0.5,
            sh:0,
            ew:0.5,
            eh:1,
            sr:0,
            er:1,
            sc:'#e6e6e6',
            ec:'#e6e6e6'
          }
        },
        loop:true,
        description:'测试项目',
        tags:'odqoo',
        access:'private'//public unlisted private
      }
    };
    that.db_data={
      name:'home',
      icon:'',
      children:[
        {name:'Market',zhname:'市场',icon:'',
          children:[
            {name:'ANIMATED SETS',zhname:'动画集',icon:''},
            {name:'VIDEOS',zhname:'视频',icon:''},
            {name:'AUDIOS',zhname:'音频',icon:''},
            {name:'IMAGES',zhname:'图像',icon:''},
            {name:'BACKGROUNDS',zhname:'背景',icon:''},
            {name:'SHAPES',zhname:'形状',icon:''},
          ]
        },
        {name:'Project Library',zhname:'项目库',
          children:[]
        },

        {name:'Animated Stickers',zhname:'动画贴纸',icon:''},
        {name:'Pencil and Eraser',zhname:'铅笔和橡皮',icon:''},
        {name:'Family Pictogram',zhname:'家庭象形图',icon:''},
        {name:'Donuts and Milkshake',zhname:'甜甜圈和奶昔',icon:''},
      ]
    }
  }
  projectView(){
    //名字 分辨率
    let that = this;
    var text = new Konva.Text({
      x: 57,
      y: 2,
      text: that.attr.project.name==''?`未命名(${that.attr.project.access})`:that.attr.project.name+`(${that.attr.project.access})`,
      fontSize: 10,
      fontFamily: 'Calibri',
      fill: '#808080'
    });
    that.layer.add(text);
    text.addName('head_name_text');
    //text.name ='head_name_text';
    var textsize = new Konva.Text({
      x: 57,
      y: 20,
      text: `${that.attr.project.size.width}*${that.attr.project.size.height} ${that.attr.project.rate}`,
      fontSize: 9,
      fontFamily: 'Calibri',
      fill: '#808080'
    });
    that.layer.add(textsize);
    //textsize.name ='head_size_text';
    textsize.addName('head_size_text');
    var config = new Konva.Path({
      x: 260,
      y: 8,
      data: 'M991.67785 384.085702l-95.935979 0c-1.663896 0-3.278673 0.258896-4.879124 0.49835-5.835915-17.367553-12.803607-34.20094-20.866237-50.367131 1.279133-0.975211 2.592035-1.936095 3.77293-3.088338l67.829851-67.855434c12.486382-12.456706 12.486382-32.731472 0-45.188178L805.943682 82.404802c-12.486382-12.491499-32.760125-12.491499-45.212738 0l-67.859527 67.855434c-1.151219 1.151219-2.128477 2.463098-3.055592 3.742231-16.214287-8.055466-33.033347-14.999622-50.399877-20.86419 0.243547-1.601474 0.497327-3.216251 0.497327-4.880147L639.913275 32.327266c0-17.654079-14.326287-31.980365-31.980365-31.980365L416.067091 0.346901c-17.654079 0-31.980365 14.326287-31.980365 31.980365l0 95.92984c0 1.663896 0.258896 3.278673 0.49835 4.880147-17.366529 5.835915-34.20094 12.808724-50.367131 20.86419-0.975211-1.279133-1.936095-2.591011-3.088338-3.742231l-67.855434-67.855434c-12.456706-12.491499-32.731472-12.491499-45.188178 0l-135.680169 135.680169c-12.491499 12.456706-12.491499 32.731472 0 45.188178l67.855434 67.855434c1.151219 1.151219 2.463098 2.127454 3.742231 3.088338-8.055466 16.180518-14.999622 33.000602-20.86419 50.367131-1.601474-0.239454-3.216251-0.49835-4.880147-0.49835L32.327266 384.084679c-17.654079 0-31.980365 14.326287-31.980365 31.980365l0 191.866842c0 17.654079 14.326287 31.981389 31.980365 31.981389l95.92984 0c1.663896 0 3.278673-0.25378 4.880147-0.497327 5.835915 17.365506 12.808724 34.198893 20.86419 50.399877-1.279133 0.941442-2.591011 1.90335-3.742231 3.055592l-67.855434 67.859527c-12.491499 12.45159-12.491499 32.726356 0 45.212738l135.680169 135.655609c12.456706 12.486382 32.731472 12.486382 45.188178 0l67.855434-67.829851c1.151219-1.180895 2.127454-2.493797 3.088338-3.77293 16.180518 8.061606 33.000602 15.014972 50.367131 20.866237-0.239454 1.600451-0.49835 3.215228-0.49835 4.879124l0 95.935979c0 17.647939 14.326287 31.974225 31.980365 31.974225l191.866842 0c17.654079 0 31.980365-14.326287 31.980365-31.974225l0-95.935979c0-1.663896-0.25378-3.278673-0.497327-4.879124 17.365506-5.835915 34.198893-12.803607 50.399877-20.866237 0.941442 1.279133 1.90335 2.592035 3.055592 3.77293l67.859527 67.829851c12.452613 12.486382 32.726356 12.486382 45.212738 0L941.599292 805.943682c12.486382-12.486382 12.486382-32.761148 0-45.212738l-67.829851-67.859527c-1.180895-1.151219-2.493797-2.128477-3.77293-3.055592 8.061606-16.214287 15.014972-33.034371 20.866237-50.399877 1.600451 0.243547 3.215228 0.497327 4.879124 0.497327l95.935979 0c17.647939 0 31.974225-14.326287 31.974225-31.981389L1023.652076 416.067091C1023.653099 398.411989 1009.326812 384.085702 991.67785 384.085702L991.67785 384.085702zM512.00307 799.805892c-158.921499 0-287.808962-128.857786-287.808962-287.802822 0-158.921499 128.887462-287.808962 287.808962-287.808962 158.978804 0 287.802822 128.887462 287.802822 287.808962C799.805892 670.948105 670.981874 799.805892 512.00307 799.805892L512.00307 799.805892zM352.111476 512.00307c0-20.933775 4.157693-41.851177 12.169157-61.189617 8.007371-19.336394 19.859303-37.074384 34.659381-51.873438 14.800078-14.800078 32.537044-26.65201 51.873438-34.659381 19.338441-8.012488 40.256866-12.169157 61.189617-12.169157 20.926612 0 41.850154 4.157693 61.183478 12.169157 19.336394 8.007371 37.074384 19.859303 51.873438 34.659381 14.800078 14.799054 26.65201 32.537044 34.659381 51.873438 8.013511 19.338441 12.175297 40.256866 12.175297 61.189617 0 20.926612-4.161786 41.850154-12.175297 61.183478-8.007371 19.336394-19.859303 37.075407-34.659381 51.873438-14.799054 14.800078-32.537044 26.65201-51.873438 34.659381-19.333324 8.013511-40.256866 12.175297-61.183478 12.175297-20.933775 0-41.851177-4.161786-61.189617-12.175297-19.337417-8.007371-37.07336-19.859303-51.873438-34.659381-14.800078-14.799054-26.65201-32.537044-34.659381-51.873438C356.268146 553.853224 352.111476 532.929682 352.111476 512.00307L352.111476 512.00307zM352.111476 512.00307',
      fill: '#9099a4',
      scaleX: 0.02,
      scaleY: 0.02,
    });
    that.layer.add(config);
    config.on( 'click', function (e) {
      console.dir(that);
      //that.parent.attr_canvas.attrview();
      that.parent.attr_canvas.signal(that.parent.attr_canvas);
    });

    let linetitle = new Konva.Line({
      points: [300, 0,  300, that.height],
      stroke: '#bcbcbc',
      tension: 0,
      strokeWidth: 1,
      opacity: 1
    });
    that.layer.add( linetitle );

    var back = new Konva.Path({
      x: 310,
      y: 8,
      data: 'M530.496 371.072h-6.144V234.368c0-51.136-29.312-72.448-65.472-43.328L122.816 461.376c-36.096 28.992-36.096 76.48 0.128 105.472l333.504 267.648c36.16 28.992 67.968-0.448 67.968-43.584v-144.256h50.496c145.856 0 257.152 62.976 325.248 184.576 13.376 22.08 27.456 17.28 27.456 0-2.944-216.576-186.368-460.16-397.12-460.16z',
      fill: '#9099a4',
      scaleX: 0.02,
      scaleY: 0.02,
    });
    textsize.addName('back');
    that.layer.add(back);
    back.on( 'click', function (e) {
      console.dir('back');
      console.dir(that);
      if (historyUtil.appHistoryStep === 0) {
        return;
      }
      historyUtil.appHistoryStep -= 1;
      that.parent.centre_canvas.canvasDom.attr_children = historyUtil.appHistory[historyUtil.appHistoryStep];
      that.parent.centre_canvas.canvasDom.recoveryCache();
    });
    var qianjin = new Konva.Path({
      x: 358,
      y: 8,
      data: 'M530.496 371.072h-6.144V234.368c0-51.136-29.312-72.448-65.472-43.328L122.816 461.376c-36.096 28.992-36.096 76.48 0.128 105.472l333.504 267.648c36.16 28.992 67.968-0.448 67.968-43.584v-144.256h50.496c145.856 0 257.152 62.976 325.248 184.576 13.376 22.08 27.456 17.28 27.456 0-2.944-216.576-186.368-460.16-397.12-460.16z',
      fill: '#9099a4',
      scaleX: -0.02,
      scaleY: 0.02,
    });
    textsize.addName('qianjin');
    that.layer.add(qianjin);
    qianjin.on( 'click', function (e) {
      console.dir('qianjin');
      console.dir(that);
      if (historyUtil.appHistoryStep === historyUtil.appHistory.length - 1) {
        return;
      }
      historyUtil.appHistoryStep += 1;
      that.parent.centre_canvas.canvasDom.attr_children = historyUtil.appHistory[historyUtil.appHistoryStep];
      that.parent.centre_canvas.canvasDom.recoveryCache();
    });



    let linetitlefg2 = new Konva.Line({
      points: [370, 8,  370, that.height-8],
      stroke: '#bcbcbc',
      tension: 0,
      strokeWidth: 1,
      opacity: 1
    });
    that.layer.add( linetitlefg2 );

    let linetitlefg1 = new Konva.Line({
      points: [410, 8,  410, that.height-8],
      stroke: '#bcbcbc',
      tension: 0,
      strokeWidth: 1,
      opacity: 1
    });
    that.layer.add( linetitlefg1 );

    let linetitlefg3 = new Konva.Line({
      points: [450, 8,  450, that.height-8],
      stroke: '#bcbcbc',
      tension: 0,
      strokeWidth: 1,
      opacity: 1
    });
    that.layer.add( linetitlefg3 );

    var release = new Konva.Path({
      x: 377,
      y: 8,
      data: 'M945.93 130.759c-7.638-15.276-26.279-21.619-41.684-13.981l-811.934 403.249c-15.276 7.638-21.619 26.279-13.981 41.684 1.683 3.365 3.884 6.343 6.473 8.803 3.365 3.237 7.378 5.696 12.169 7.249l273.148 85.828 41.943-52.041-222.919-70.035 611.539-303.957-327.131 395.999c-0.778 0.907-1.423 1.812-2.071 2.848l-37.801 46.991v194.957c0 17.218 13.852 31.069 31.069 31.069s31.069-13.852 31.069-31.069v-175.54l297.097 93.206c3.495 1.036 6.991 1.553 10.485 1.423 15.017 0.388 28.609-10.227 31.457-25.502l113.79-621.507c0.388-2.071 0.517-4.272 0.517-6.343-0.13-4.402-1.036-9.062-3.237-13.333zM779.969 726.893l-240.396-75.472 326.741-395.611-86.346 471.082z',
      fill: '#9099a4',
      scaleX: 0.02,
      scaleY: 0.02,
    });
    that.layer.add(release);

    var updata = new Konva.Path({
      x: 418,
      y: 8,
      data: 'M992.171444 312.62966C975.189616 137.155482 827.415189 0 647.529412 0 469.849434 0 323.616239 133.860922 303.679205 306.210218 131.598564 333.839271 0 482.688318 0 662.588235c0 199.596576 161.815189 361.411765 361.411765 361.411765h184.014581V692.705882H294.530793l337.939795-361.411764 337.939796 361.411764H726.132229v331.294118H933.647059v-1.555371c185.470975-15.299199 331.294118-170.426291 331.294117-359.856394 0-168.969898-116.101408-310.367302-272.769732-349.958575z',
      fill: '#9099a4',
      scaleX: 0.02,
      scaleY: 0.02,
    });
    that.layer.add(updata);

    var sound = new Konva.Path({
      x: 458,
      y: 8,
      data: 'M512 685.226667c172.373333-1.877333 173.738667-173.056 173.909333-173.226667L685.909333 216.576C685.738667 216.405333 684.373333 45.226667 512 43.349333c-172.373333 1.877333-173.738667 173.056-173.909333 173.226667L338.090667 512C338.261333 512.170667 339.626667 683.52 512 685.226667zM389.290667 216.576c1.536-0.170667-1.536-122.026667 122.709333-122.026667 65.536 0 95.573333 33.962667 109.568 66.048l-112.469333 0c-14.165333 0-25.6 11.434667-25.6 25.6 0 14.165333 11.434667 25.6 25.6 25.6L634.88 211.797333l0 51.2L389.290667 262.997333 389.290667 216.576zM389.290667 314.197333 634.88 314.197333 634.88 512c-1.536 0.170667 1.536 122.026667-122.88 122.026667-124.416-0.170667-121.173333-122.026667-122.709333-122.026667L389.290667 314.197333z M834.389333 512c0-14.165333-11.434667-25.6-25.6-25.6-14.165333 0-25.6 11.434667-25.6 25.6-1.536 0.170667 1.536 269.482667-271.189333 269.824C239.274667 781.482667 242.346667 512.170667 240.810667 512l0-0.170667c0-14.165333-11.434667-25.6-25.6-25.6-14.165333 0-25.6 11.434667-25.6 25.6l0 0.170667c0.341333 0.170667 1.706667 301.738667 296.789333 320l0 97.450667-122.709333 0c-14.165333 0-25.6 11.434667-25.6 25.6 0 14.165333 11.434667 25.6 25.6 25.6l296.789333 0c14.165333 0 25.6-11.434667 25.6-25.6 0-14.165333-11.434667-25.6-25.6-25.6L537.6 929.450667l0-97.450667C832.682667 813.738667 834.048 512.170667 834.389333 512z',
      fill: '#9099a4',
      scaleX: 0.02,
      scaleY: 0.02,
    });
    that.layer.add(sound);

    var download = new Konva.Path({
      x: that.width-125-200,
      y: 8,
      data: 'M871.104 952.704H149.696c-47.232 0-85.76-38.208-86.208-85.44v-203.2a46.08 46.08 0 1 1 92.288 0v202.368l709.312-5.952v-183.232a46.08 46.08 0 1 1 92.352 0v190.016c0 0.832 0 1.536-0.128 2.24a86.4 86.4 0 0 1-86.208 83.2z M466.176 196.8V107.136c0-22.144 20.608-40.064 46.08-40.064 25.408 0 45.952 17.92 45.952 40.064v89.664m0 96.256v295.04c0 22.144-20.544 40-45.952 40-25.408 0-46.08-17.856-46.08-40v-296.32 M707.264 508.288c10.56 0 13.696 6.656 6.912 14.784l-189.76 229.888a15.36 15.36 0 0 1-24.448 0L310.208 523.072c-6.72-8.128-3.584-14.784 6.976-14.784h390.08z',
      fill: '#9099a4',
      scaleX: 0.02,
      scaleY: 0.02,
    });
    that.layer.add(download);

    let linetitlefg4 = new Konva.Line({
      points: [that.width-125-200+30, 8,  that.width-125-200+30, that.height-8],
      stroke: '#bcbcbc',
      tension: 0,
      strokeWidth: 1,
      opacity: 1
    });
    that.layer.add( linetitlefg4 );

    var share = new Konva.Path({
      x: that.width-125-200+40,
      y: 8,
      data: 'M778.602987 653.725862c-43.735084 0-82.508155 20.923542-107.114576 53.234435l-283.026028-168.531368c3.213181-12.398378 5.100158-25.314549 5.100158-38.715767 0-3.89061-0.302899-7.686053-0.573051-11.494799l283.161105-170.612773c24.713868 28.935006 61.412698 47.344285 102.452393 47.344285 74.43427 0 134.771473-60.338227 134.771473-134.76738 0-74.42506-60.338227-134.763286-134.771473-134.763286-74.424037 0-134.759193 60.334133-134.759193 134.763286 0 14.767332 2.445702 28.916587 6.837732 42.222637L369.926214 417.98579c-27.26497-43.37795-75.391061-72.290443-130.376373-72.290443-85.053118 0-154.017816 68.959581-154.017816 154.017816s68.963675 154.012699 154.017816 154.012699c45.589314 0 86.426395-19.925818 114.624621-51.3976L648.347364 754.476497c-2.829442 10.872628-4.490268 22.23235-4.490268 34.012651 0 74.43427 60.34232 134.76738 134.76738 134.76738 74.429153 0 134.763286-60.33311 134.763286-134.76738C913.388786 714.059995 853.037257 653.725862 778.602987 653.725862L778.602987 653.725862 778.602987 653.725862zM778.602987 653.725862',
      fill: '#9099a4',
      scaleX: 0.02,
      scaleY: 0.02,
    });
    that.layer.add(share);

  }
}
//名字 分辨率
class UP {
  constructor(){

    this.head_canvas=new Content_head_canvas(undefined,undefined,this);
    //this.head_canvas.parent=this;
    this.tools_canvas=new Content_body_left_tools_canvas(undefined,undefined,this);
    //this.tools_canvas.parent=this;
    this.attr_canvas=new Content_body_left_attr_canvas(undefined,undefined,this);
    //this.attr_canvas.parent=this;
    this.navigationbar_canvas=new Content_centre_navigationbar_canvas(undefined,undefined,this);
    //this.navigationbar_canvas.parent=this;
    this.centre_canvas=new Content_centre_canvas_canvas(undefined,undefined,this);
    //this.centre_canvas.parent=this;
    this.right_canvas=new Content_body_right_canvas(undefined,undefined,this);
    //this.right_canvas.parent=this;
    this.content_body_canvasTimeLine = new Content_body_canvasTimeLine(this);

  }
}
/*================================================================*/