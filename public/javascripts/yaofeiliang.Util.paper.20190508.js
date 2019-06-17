function getAngle(px,py,mx,my){//获得人物中心和鼠标坐标连线，与y轴正半轴之间的夹角
  var x = Math.abs(px-mx);
  var y = Math.abs(py-my);
  var z = Math.sqrt(Math.pow(x,2)+Math.pow(y,2));
  var cos = y/z;
  var radina = Math.acos(cos);//用反三角函数求弧度
  var angle = Math.floor(180/(Math.PI/radina));//将弧度转换成角度

  if(mx>px&&my>py){//鼠标在第四象限
    angle = 180 - angle;
  }
  if(mx==px&&my>py){//鼠标在y轴负方向上
    angle = 180;
  }
  if(mx>px&&my==py){//鼠标在x轴正方向上
    angle = 90;
  }
  if(mx<px&&my>py){//鼠标在第三象限
    angle = 180+angle;
  }
  if(mx<px&&my==py){//鼠标在x轴负方向
    angle = 270;
  }
  if(mx<px&&my<py){//鼠标在第二象限
    angle = 360 - angle;
  }
  return angle;
}
function calcNewPoint( p,  pCenter,  angle) {
  // calc arc
  let l = (angle * Math.PI) / 180;
  //sin/cos value
  let cosv = Math.cos(l);
  let sinv = Math.sin(l);

  // calc new point
  let newX =  ((p.x - pCenter.x) * cosv - (p.y - pCenter.y) * sinv + pCenter.x);
  let newY = ((p.x - pCenter.x) * sinv + (p.y - pCenter.y) * cosv + pCenter.y);
  return {x:newX, y:newY};
}

class HistoryUtil{
  constructor(){
    this.appHistory = [[]];//存储N次的obj状态arr
    this.appHistoryStep = 0;//当前次数
  };
  saveStateToHistory(state) {
    let that = this;
    that.appHistory = that.appHistory.slice(0, that.appHistoryStep + 1);
    //that.appHistory = that.appHistory.concat([state.concat()]);
    that.appHistory = that.appHistory.concat([state]);
    that.appHistoryStep += 1;
    console.dir(that);
  }
}


class CanvasDom {
  constructor(f_class){
    this.f_class=f_class;
    if(!this.f_class.attr_children){
      this.f_class.attr_children={};
    }

    this.domattr={attrs:{
        from: [0, 0],
        to: [0, 0],
      //x:0,y:0,width:100,height:100,
        fillColor: '#7b7b7b',strokeColor: 'black',strokeWidth:1,id:'Rect'},className:"Rect"};
  }

  saveCache(){
    let that = this;
    let temp_children = that.f_class.group.exportJSON();
    if(!that.attr_children||!that.attr_children.exportJSON||that.attr_children.exportJSON!=temp_children){
      that.attr_children = {exportJSON:temp_children};
      let temp_control_arr=[];
      for(let gi=0;gi<that.f_class.group.children.length;gi++){
        if(that.f_class.group.children[gi].name!="displayLine"){
          temp_control_arr.push({id:gi,data:that.f_class.group.children[gi].temp_control});
        }
      }
      //let temp ={temp_control:JSON.stringify(temp_control_arr), exportJSON:that.attr_children};
      that.attr_children.temp_control=JSON.stringify(temp_control_arr);
      historyUtil.saveStateToHistory(that.attr_children);
    }
  }
  recoveryCache(){
    let that = this;
    if(that.attr_children&&that.attr_children.exportJSON&&that.attr_children.exportJSON.length){
      that.off();
      let temp_exportJSON=JSON.parse(that.attr_children.exportJSON);
      let temp_control_arr=JSON.parse(that.attr_children.temp_control);
      that.f_class.group.importJSON(temp_exportJSON);
      for(let gi=0;gi<temp_control_arr.length;gi++){
        that.f_class.group.children[temp_control_arr[gi].id].temp_control=temp_control_arr[gi].data;
        that.f_class.group.children[temp_control_arr[gi].id].onMouseUp=function(event) {
          that.saveCache();
        };
        let node=that.f_class.group.children[temp_control_arr[gi].id];
        node.onMouseDown = function(event) {
          that.selectNode=node;
          that.nodeAttrs();
          that.off();
          that.eventNode(node,true);

        }
      }
      that.f_class.parent.content_body_canvasTimeLine.refresh(that.f_class.group.children[that.f_class.group.children.length]);
    }
  }

  init(){
    let that = this;
    that.path_attrs=undefined;
    that.evt();
  }
  nodeAttrs(){
    let that = this;
    console.dir(that)
    that.f_class.parent.attr_canvas.configAttrview(that.selectNode);
  }
  off(){
    let that = this;
    document.body.style.cursor = 'default';
    paper.view.onMouseDown = undefined;
    paper.view.onMouseDrag = undefined;
    paper.view.onMouseMove = undefined;
    paper.view.onMouseUp = undefined;
    //paper.view.onKeyDown = undefined;

    for(let gi=0;gi<that.f_class.group.children.length;gi++){
      if(that.f_class.group.children[gi]._node_Group){
        that.f_class.group.children[gi]._node_Group.remove();
      }
      if(that.f_class.group.children[gi]._curveSegments_Group){
        that.f_class.group.children[gi]._curveSegments_Group.remove();
      }
      if(that.f_class.group.children[gi].addSegmentscircle){
        that.f_class.group.children[gi].addSegmentscircle.remove();
      }
    }

  }
  evt(){
    let that = this;
    that.off();
    paper.view.onMouseDown = function(event) {
      that.evtDom(event.point,'mousedown');
    };
    paper.view.onMouseDrag = function(event) {
      that.evtDom(event.point,'mousedrag');
    };
    paper.view.onMouseMove = function(event) {
      that.evtDom(event.point,'mousemove');
    };
    paper.view.onMouseUp = function(event) {
      that.evtDom(event.point,'mouseup');
    };
    paper.view.onKeyDown = function(event) {
      console.dir(event.key)
      if (event.key == 'escape') {
        if(that.path_attrs){
          switch (that.f_class.parent.tools_canvas.attr.selectitem){
            case 4:
              if(that.path){
                that.path.remove();
              }
              var node = new paper.Path();
              for(let i=0;i<that.path_attrs.length-1;i++){
                if(i==0){
                  node.add(that.path_attrs[i].attr.from[0], that.path_attrs[i].attr.from[1]);
                  node.lineBy(that.path_attrs[i].attr.to[0]-that.path_attrs[i].attr.from[0], that.path_attrs[i].attr.to[1]-that.path_attrs[i].attr.from[1]);
                }else{
                  node.lineBy(that.path_attrs[i].attr.to[0]-that.path_attrs[i].attr.from[0], that.path_attrs[i].attr.to[1]-that.path_attrs[i].attr.from[1]);
                }
              }
              node.name='group_'+that.f_class.group.length;
              node.strokeColor='#7b7b7b';//node.strokeColor = 'black';
             /* node.fillColor='#7b7b7b';
              node.strokeWidth=1;*/
              that.f_class.group.addChild(node);
              that.path_attrs=undefined;
              node.onMouseDown = function(event) {
                that.selectNode=node;
                that.nodeAttrs();
                that.off();

                for(let gi=0;gi<that.f_class.group.children.length;gi++){
                  if(that.f_class.group.children[gi]._node_Group){
                    that.f_class.group.children[gi]._node_Group.remove();
                  }
                  if(that.f_class.group.children[gi]._curveSegments_Group){
                    that.f_class.group.children[gi]._curveSegments_Group.remove();
                  }
                  if(that.f_class.group.children[gi].addSegmentscircle){
                    that.f_class.group.children[gi].addSegmentscircle.remove();
                  }
                }
                if(that.f_class.parent.tools_canvas.attr.selectitem==2){
                  that.copySegments(node);
                  that.curveSegments_view(node,true);
                }else if(that.f_class.parent.tools_canvas.attr.selectitem==1){
                  that.eventNode(node,'nodeDrag');
                }else if(
                  that.f_class.parent.tools_canvas.attr.selectitem==3||
                  that.f_class.parent.tools_canvas.attr.selectitem==4||
                  that.f_class.parent.tools_canvas.attr.selectitem==5||
                  that.f_class.parent.tools_canvas.attr.selectitem==6||
                  that.f_class.parent.tools_canvas.attr.selectitem==7||
                  that.f_class.parent.tools_canvas.attr.selectitem==8||
                  that.f_class.parent.tools_canvas.attr.selectitem==9) {
                  if(!node.temp_control){
                    //node.jsonstr = node.exportJSON();
                    that.eventNode(node);
                    //console.dir( node.jsonstr);
                  }
                }else if(that.f_class.parent.tools_canvas.attr.selectitem==11){
                  that.copySegments(node);
                  that.curveSegments_view(node,false);
                  that.addSegments(node);
                }else if(that.f_class.parent.tools_canvas.attr.selectitem==12){
                  console.dir(12)
                  that.copySegments(node);
                  that.curveSegments_view(node,false);
                  that.deleteSegments(node);
                }

              }
              break;
          }
        }

      }else if (event.key == 'delete') {
        console.dir(event.key)
        console.dir(that.f_class.parent.content_body_canvasTimeLine.right.head.selectnode)
        for(let gi=0;gi<that.f_class.group.children.length;gi++){
          if(that.f_class.group.children[gi]._node_Group){
            that.f_class.group.children[gi]._node_Group.remove();
          }
          if(that.f_class.group.children[gi]._curveSegments_Group){
            that.f_class.group.children[gi]._curveSegments_Group.remove();
          }
          if(that.f_class.group.children[gi].addSegmentscircle){
            that.f_class.group.children[gi].addSegmentscircle.remove();
          }
        }
        if(that.f_class.parent.content_body_canvasTimeLine.right.head.selectnode){
          that.f_class.parent.content_body_canvasTimeLine.right.head.selectnode.remove();
        }
        //that.f_class.parent.content_body_canvasTimeLine.refresh();
      };
    }
  }
  evtDom(ePos,type){
    let that = this;
    switch (type) {
      case 'mousedown':
        that.createDom(ePos);
        break;
      case 'mousemove':
        that.moveDom(ePos);
        break;
      case 'mousedrag':
        that.mousedrag(ePos);
        break;
      case 'mouseup':
        that.upDom(ePos);
        break;
    }
  }
  createDom(ePos){
    let that = this;
    switch (that.f_class.parent.tools_canvas.attr.selectitem){
      case 1://选取
        let tempGroup = new paper.Group();
        for(let gi=that.f_class.group.children.length-1;gi>=0;gi--){
          if(that.f_class.group.children[gi].typename&&that.f_class.group.children[gi].typename=='temp_group'){
            //if(that.f_class.group.children[gi].className=='Group'){
            //
            for(let ci=that.f_class.group.children[gi].children.length-1;ci>=0;ci--){
              let temp_clone =that.f_class.group.children[gi].children[ci];
              if(!temp_clone.z_index){
                temp_clone.z_index=0;
              }
              tempGroup.insertChild(temp_clone.z_index,temp_clone);
            }
            that.f_class.group.children[gi].remove();
          }else{
            let temp_clone =that.f_class.group.children[gi];
            if(!temp_clone.z_index){
              temp_clone.z_index=0;
            }
            temp_clone.onMouseDown = undefined;
            temp_clone.onMouseDrag = undefined;
            temp_clone.onMouseMove = undefined;
            temp_clone.onMouseUp = undefined;
            tempGroup.insertChild(temp_clone.z_index,temp_clone);
          }
        }
        for(let gi=tempGroup.children.length-1;gi>=0;gi--){
          that.f_class.group.insertChild(tempGroup.children[gi].z_index, tempGroup.children[gi]);
        }


        //that.f_class.group=tempGroup;
        console.dir(that.f_class.group);
        that.path_attrs = {attr:{from: [ePos.x,ePos.y], to: [ePos.x,ePos.y],
            fillColor: '#7b7b7b',strokeColor: 'black',strokeWidth:1,id:'Rect',
            opacity:0.1,dashArray: [2, 6],
          },className:"Rect"};

        break;
      case 3://矩形
        that.path_attrs = {attr:{from: [ePos.x,ePos.y], to: [ePos.x,ePos.y],
          fillColor: '#7b7b7b',strokeColor: 'black',strokeWidth:1,id:'Rect',
            shadowColor:'#000000',shadowBlur:5,shadowOffset:{x:5,y:5}
          },className:"Rect"};
        break;
      case 4://线
        if(that.path_attrs){
          that.path_attrs.push({attr:{from: [ePos.x,ePos.y], to: [ePos.x,ePos.y],
              fillColor: '#7b7b7b',strokeColor: 'black',strokeWidth:1,id:'Line',
              shadowColor:'#000000',shadowBlur:5,shadowOffset:{x:5,y:5}},className:"Line"});
        }else{
          that.path_attrs = [{attr:{from: [ePos.x,ePos.y], to: [ePos.x,ePos.y],
              fillColor: '#7b7b7b',strokeColor: 'black',strokeWidth:1,id:'Line',
              shadowColor:'#000000',shadowBlur:5,shadowOffset:{x:5,y:5}},className:"Line"}];
        }
        break;
      case 5://圆
        that.path_attrs = {attr:{center: [ePos.x,ePos.y], radius: 0,
            fillColor: '#7b7b7b',strokeColor: 'black',strokeWidth:1,id:'Circle',
            shadowColor:'#000000',shadowBlur:5,shadowOffset:{x:5,y:5}},className:"Circle"};
        break;
      case 6://椭圆
        that.path_attrs = {attr:{center: [ePos.x,ePos.y], radius: [0,0],
            fillColor: '#7b7b7b',strokeColor: 'black',strokeWidth:1,id:'Circle',
            shadowColor:'#000000',shadowBlur:5,shadowOffset:{x:5,y:5}},className:"Circle"};
        break;
      case 7://圆弧
        that.path_attrs = {attr:{from: [ePos.x,ePos.y],through: [ePos.x,ePos.y], to: [ePos.x,ePos.y],
            fillColor: '#7b7b7b',strokeColor: 'black',strokeWidth:1,id:'Arc',
            shadowColor:'#000000',shadowBlur:5,shadowOffset:{x:5,y:5}},className:"Arc"};
        break;
      case 8://多边形
        that.path_attrs = {attr:{center: [ePos.x,ePos.y],sides:3, radius: 0,
            fillColor: '#7b7b7b',strokeColor: 'black',strokeWidth:1,id:'RegularPolygon',
            shadowColor:'#000000',shadowBlur:5,shadowOffset:{x:5,y:5}},className:"RegularPolygon"};
        break;
      case 9://星形
        that.path_attrs = {attr:{center: [ePos.x,ePos.y],points:5, radius1: 0, radius2: 0,
            fillColor: '#7b7b7b',strokeColor: 'black',strokeWidth:1,id:'Star',
            shadowColor:'#000000',shadowBlur:5,shadowOffset:{x:5,y:5}},className:"Star"};
        break;
      case 11://增加顶点
        console.dir('增加顶点');
        break;
      case 12://删除顶点
        console.dir('删除顶点');
        break;
    }
  }
  mousedrag(ePos){
    let that = this;
    switch (that.f_class.parent.tools_canvas.attr.selectitem){
      case 1:
        that.path_attrs.attr.to=[ePos.x,ePos.y];
        if(that.path){
          that.path.remove();
        }
        that.path = new paper.Path.Rectangle(that.path_attrs.attr);
        break;
      case 3:
        that.path_attrs.attr.to=[ePos.x,ePos.y];
        if(that.path){
          that.path.remove();
        }
        that.path = new paper.Path.Rectangle(that.path_attrs.attr);
        break;
      case 4:
        if(that.path){
          that.path.remove();
        }
        that.path_attrs[that.path_attrs.length-1].attr.to=[ePos.x,ePos.y];
        that.path = new paper.Group();
        for(let i=0;i<that.path_attrs.length;i++){
          that.path.addChild(new paper.Path.Line(that.path_attrs[i].attr));
        }
        break;
      case 5:
        var xdiff = ePos.x - that.path_attrs.attr.center[0];            // 计算两个点的横坐标之差
        var ydiff = ePos.y - that.path_attrs.attr.center[1];            // 计算两个点的纵坐标之差
        that.path_attrs.attr.radius=Math.pow((xdiff * xdiff + ydiff * ydiff), 0.5);
        if(that.path){
          that.path.remove();
        }
        that.path = new paper.Path.Circle(that.path_attrs.attr);
        break;
      case 6:
        var xdiff = ePos.x - that.path_attrs.attr.center[0];            // 计算两个点的横坐标之差
        var ydiff = ePos.y - that.path_attrs.attr.center[1];            // 计算两个点的纵坐标之差
        that.path_attrs.attr.radius=[xdiff,ydiff];
        if(that.path){
          that.path.remove();
        }
        that.path = new paper.Path.Ellipse(that.path_attrs.attr);
        break;
      case 7:
        that.path_attrs.attr.to=[ePos.x,ePos.y];
        if(that.path){
          that.path.remove();
        }
        that.path_attrs.attr.through[0]=that.path_attrs.attr.from[0]+(that.path_attrs.attr.to[0]-that.path_attrs.attr.from[0])/2+13;
        that.path_attrs.attr.through[1]=that.path_attrs.attr.from[1]+(that.path_attrs.attr.to[1]-that.path_attrs.attr.from[1])/2-13;
        that.path = new paper.Path.Arc(that.path_attrs.attr);
        break;
      case 8:
        var xdiff = ePos.x - that.path_attrs.attr.center[0];            // 计算两个点的横坐标之差
        var ydiff = ePos.y - that.path_attrs.attr.center[1];            // 计算两个点的纵坐标之差
        that.path_attrs.attr.radius=Math.pow((xdiff * xdiff + ydiff * ydiff), 0.5);
        if(that.path){
          that.path.remove();
        }
        that.path = new paper.Path.RegularPolygon(that.path_attrs.attr);
        break;
      case 9:
        var xdiff = ePos.x - that.path_attrs.attr.center[0];            // 计算两个点的横坐标之差
        var ydiff = ePos.y - that.path_attrs.attr.center[1];            // 计算两个点的纵坐标之差
        that.path_attrs.attr.radius2=Math.pow((xdiff * xdiff + ydiff * ydiff), 0.5);
        that.path_attrs.attr.radius1=that.path_attrs.attr.radius2/2;
        if(that.path){
          that.path.remove();
        }
        that.path = new paper.Path.Star(that.path_attrs.attr);
        break;
    }
  }
  moveDom(ePos){
    let that = this;
    if (that.path_attrs) {
      switch (that.f_class.parent.tools_canvas.attr.selectitem) {
        case 4:
          if (that.path) {
            that.path.remove();
          }
          that.path_attrs[that.path_attrs.length-1].attr.to=[ePos.x,ePos.y];
          that.path = new paper.Group();
          for (let i = 0; i < that.path_attrs.length; i++) {
            that.path.addChild(new paper.Path.Line(that.path_attrs[i].attr));
          }
          that.selectNode=that.path;
          break;
      }
    }
  }
  upDom(ePos){
    let that = this;
    if(that.path&&that.path_attrs){
      if(that.path_attrs.attr&&that.path_attrs.attr.from&&that.path_attrs.attr.to) {
        if(Math.abs(Math.abs(that.path_attrs.attr.from[0])-Math.abs(that.path_attrs.attr.to[0]))<10||
          Math.abs(Math.abs(that.path_attrs.attr.from[1])-Math.abs(that.path_attrs.attr.to[1]))<10){
          if(!that.path_attrs.attr.through){
            that.path.remove();
            return;
          }else{
            if(that.path_attrs.attr.from[0]==that.path_attrs.attr.to[0]&&that.path_attrs.attr.from[1]==that.path_attrs.attr.to[1]){
              that.path.remove();
              return;
            }
          }

        }
      }else{
        if(that.path_attrs.attr.radius1&&that.path_attrs.attr.radius2){
          if(Math.abs(that.path_attrs.attr.radius1)<10&&Math.abs(that.path_attrs.attr.radius2)<10){
            that.path.remove();
            return;
          }

        }else
        if(that.path_attrs.attr.radius.length&&that.path_attrs.attr.radius.length>1){
          if(Math.abs(that.path_attrs.attr.radius[0])<10||Math.abs(that.path_attrs.attr.radius[1])<10){
            that.path.remove();
            return;
          }
        }else
        if(that.path_attrs.attr.radius==0||(that.path_attrs.attr.radius&&that.path_attrs.attr.radius<10)){
          that.path.remove();
          return;
        }
      }
      let node;
      switch (that.f_class.parent.tools_canvas.attr.selectitem){
        case 1:
          that.path.remove();
          let temp_group = new paper.Path.Rectangle(that.path_attrs.attr);
          node = new paper.Group();
          node.clipped = true;
          node.typename='temp_group';
          //判断组合
          console.dir(that.f_class.group);
          let isclipped=false;
          let selectitems=[];
          for(let gi=that.f_class.group.children.length-1;gi>=0;gi--){
            if(that.f_class.group.children[gi].name!="displayLine"){
              let nodeisInside = that.f_class.group.children[gi].isInside(temp_group.bounds);
              if(nodeisInside){

                selectitems.push(gi)
              }

            }
          }
          for(let sgi=0;sgi<selectitems.length;sgi++){
            let temp_g_c=that.f_class.group.children[selectitems[sgi]];
            temp_g_c.onMouseDown=undefined;
            /*temp_g_c.onDoubleClick=function(event1){
              temp_g_c.onMouseDown = function(event) {
                that.selectNode=temp_g_c;
                that.nodeAttrs();
                that.off();
                for(let gi=0;gi<that.f_class.group.children.length;gi++){
                  if(that.f_class.group.children[gi]._node_Group){
                    that.f_class.group.children[gi]._node_Group.remove();
                  }
                  if(that.f_class.group.children[gi]._curveSegments_Group){
                    that.f_class.group.children[gi]._curveSegments_Group.remove();
                  }
                  if(that.f_class.group.children[gi].addSegmentscircle){
                    that.f_class.group.children[gi].addSegmentscircle.remove();
                  }
                }

                if(that.f_class.parent.tools_canvas.attr.selectitem==2){
                  that.copySegments(temp_g_c);
                  that.curveSegments_view(temp_g_c,true);
                }else if(that.f_class.parent.tools_canvas.attr.selectitem==1){
                  that.eventNode(temp_g_c,'nodeDrag');
                }else if(
                  that.f_class.parent.tools_canvas.attr.selectitem==3||
                  that.f_class.parent.tools_canvas.attr.selectitem==4||
                  that.f_class.parent.tools_canvas.attr.selectitem==5||
                  that.f_class.parent.tools_canvas.attr.selectitem==6||
                  that.f_class.parent.tools_canvas.attr.selectitem==7||
                  that.f_class.parent.tools_canvas.attr.selectitem==8||
                  that.f_class.parent.tools_canvas.attr.selectitem==9) {
                  if(!temp_g_c.temp_control){
                    that.eventNode(temp_g_c);
                  }
                }else if(that.f_class.parent.tools_canvas.attr.selectitem==11){
                  that.copySegments(temp_g_c);
                  that.curveSegments_view(temp_g_c,false);
                  that.addSegments(temp_g_c);
                }else if(that.f_class.parent.tools_canvas.attr.selectitem==12){
                  console.dir(12)
                  that.copySegments(temp_g_c);
                  that.curveSegments_view(temp_g_c,false);
                  that.deleteSegments(temp_g_c);
                }

              }
            }*/
            //node.insertChild(selectitems.length-1-sgi,that.f_class.group.children[selectitems[sgi]]);
            if(temp_g_c.className=='Raster'){
              isclipped = true;
            }
            node.insertChild(sgi,temp_g_c);
          }
          node.clipped = isclipped;
          temp_group.remove();
          that.off();
          if(node.children.length){
            //that.eventNode(node,'nodeDrag');
          }else{
            if(that.f_class.group.children[1]){
              that.f_class.parent.content_body_canvasTimeLine.refresh(that.f_class.group.children[1]);
            }
            return;
          }

          break;
        case 3:
          that.path.remove();
          node = new paper.Path.Rectangle(that.path_attrs.attr);
          break;
        case 4:
          if(that.path_attrs){
            that.path_attrs.push({attr:{from: [ePos.x,ePos.y], to: [ePos.x,ePos.y],
                fillColor: '#7b7b7b',strokeColor: 'black',strokeWidth:1,id:'Line'},className:"Line"});
          }else{
            that.path_attrs = [{attr:{from: [ePos.x,ePos.y], to: [ePos.x,ePos.y],
                fillColor: '#7b7b7b',strokeColor: 'black',strokeWidth:1,id:'Line'},className:"Line"}];
          }
          return;
          break;
        case 5:
          that.path.remove();
          node = new paper.Path.Circle(that.path_attrs.attr);
          break;
        case 6:
          that.path.remove();
          node = new paper.Path.Ellipse(that.path_attrs.attr);
          break;
        case 7:
          that.path.remove();
          node = new paper.Path.Arc(that.path_attrs.attr);
          break;
        case 8:
          that.path.remove();
          node = new paper.Path.RegularPolygon(that.path_attrs.attr);
          break;
        case 9:
          that.path.remove();
          node = new paper.Path.Star(that.path_attrs.attr);
          break;
      }
      node.name=that.path_attrs.attr.id+'_'+that.f_class.group.children.length;
      node.z_index=that.f_class.group.children.length;
      that.f_class.group.addChild(node);
      console.dir(that.f_class.group.exportJSON())

      that.selectNode=node;
      node.onMouseUp = function(event) {
        that.saveCache();
      }

      node.onMouseDown = function(event) {
        that.selectNode=node;
        that.nodeAttrs();
        that.off();
        for(let gi=0;gi<that.f_class.group.children.length;gi++){
          if(that.f_class.group.children[gi]._node_Group){
            that.f_class.group.children[gi]._node_Group.remove();
          }
          if(that.f_class.group.children[gi]._curveSegments_Group){
            that.f_class.group.children[gi]._curveSegments_Group.remove();
          }
          if(that.f_class.group.children[gi].addSegmentscircle){
            that.f_class.group.children[gi].addSegmentscircle.remove();
          }
        }
        if(that.f_class.parent.tools_canvas.attr.selectitem==2){
          that.copySegments(node);
          that.curveSegments_view(node,true);
        }else if(that.f_class.parent.tools_canvas.attr.selectitem==1){
          that.eventNode(node,'nodeDrag');
        }else if(
          that.f_class.parent.tools_canvas.attr.selectitem==3||
          that.f_class.parent.tools_canvas.attr.selectitem==4||
          that.f_class.parent.tools_canvas.attr.selectitem==5||
          that.f_class.parent.tools_canvas.attr.selectitem==6||
          that.f_class.parent.tools_canvas.attr.selectitem==7||
          that.f_class.parent.tools_canvas.attr.selectitem==8||
          that.f_class.parent.tools_canvas.attr.selectitem==9) {
          //if(!node.temp_control){
            that.eventNode(node);
          //}
        }else if(that.f_class.parent.tools_canvas.attr.selectitem==11){
          that.copySegments(node);
          that.curveSegments_view(node,false);
          that.addSegments(node);
        }else if(that.f_class.parent.tools_canvas.attr.selectitem==12){
          console.dir(12)
          that.copySegments(node);
          that.curveSegments_view(node,false);
          that.deleteSegments(node);
        }

      }
      that.f_class.parent.content_body_canvasTimeLine.refresh(node);
    }
    that.saveCache();
  }
  deleteSegments(node){
    let that = this;
    if(node._curveSegments_Group){
      let path_onMouseDown=function (event) {
        event.target.remove();
        node.removeSegment(event.target.tempitemid);
      };
      for(let li=0;li<node.segments.length;li++){
        node._curveSegments_Group.children['control_'+li].tempitemid=li;
        node._curveSegments_Group.children['control_'+li].onMouseDown=path_onMouseDown;
      }
    }
  }
  addSegments(node){
    let that = this;
    if(node.addSegmentscircle){
      node.addSegmentscircle.remove();
    }
    node.addSegmentscircle = new paper.Path.Circle({
      center: paper.view.center,
      radius: 5,
      fillColor: 'red'
    });
    node.onMouseDrag=function (event) {
      for(let gi=0;gi<that.f_class.group.children.length;gi++){
        if(that.f_class.group.children[gi]._node_Group){
          that.f_class.group.children[gi]._node_Group.remove();
        }
        if(that.f_class.group.children[gi]._curveSegments_Group){
          that.f_class.group.children[gi]._curveSegments_Group.remove();
        }
        if(that.f_class.group.children[gi].addSegmentscircle){
          that.f_class.group.children[gi].addSegmentscircle.remove();
        }
      }
      event.target.position.x+=event.delta.x;
      event.target.position.y+=event.delta.y;
    }
    node.onMouseMove=function (event) {
      var nearestPoint = node.getNearestPoint(event.point);
      console.dir(nearestPoint);
      console.dir(' x:'+nearestPoint.x+' y:'+nearestPoint.y)
      console.dir(node)
      node.addSegmentscircle.position = nearestPoint;
      let temp_length = node.getOffsetOf(nearestPoint);
      console.dir(temp_length);


    }
    node.addSegmentscircle.onMouseDown=function (event) {
      console.dir('node.addSegmentscircle.onMouseDown')
      node.divideAt(node.addSegmentscircle.position);
      //node.addSegments(node.addSegmentscircle.position);
      console.dir(' x:'+node.addSegmentscircle.position.x+' y:'+node.addSegmentscircle.position.y)
      //segments
      let temp_length = node.getOffsetOf(node.addSegmentscircle.position);
      let temp_item=0;
      for(let si=0;si<node.segments.length;si++){
        if(node.getOffsetOf(node.segments[si].point)>temp_length){
          temp_item=si;
          break;
        }else if(node.getOffsetOf(node.segments[si].point)==temp_length){
         return;
        }
      }
      console.dir(temp_item)
      node.insert(temp_item,node.addSegmentscircle.position)
      console.dir(node)

      that.copySegments(node);
      that.curveSegments_view(node,false);
    }

  }
  copySegments(node){
    let that = this;
      let _segemts=[];
      for(let li=0;li<node.segments.length;li++){
        let _segemt={
          i:{x:node.segments[li].handleIn.x,y:node.segments[li].handleIn.y},
          c:{x:node.segments[li].point.x,y:node.segments[li].point.y},
          o:{x:node.segments[li].handleOut.x,y:node.segments[li].handleOut.y},
        };
        if((_segemt.i.x==0&&_segemt.i.y==0)||(_segemt.i.x==0&&_segemt.i.y==0)){
          let qian,hou;
          if(li+1<node.segments.length){
            qian=li+1;
          }else{
            qian=0
          }
          if(li-1<0){
            hou=node.segments.length-1;
          }else{
            hou=li-1;
          }
          let f_x=1,f_y=1;
          let v_x,v_y;
          let fh_x=1,fh_y=1;
          let h_x,h_y;
          if(node.segments[li].point.y>node.segments[qian].point.y){
            f_y=-1;
            v_y=((node.segments[li].point.y-node.segments[qian].point.y)/4);
          }else{
            f_y=1;
            v_y=((node.segments[qian].point.y-node.segments[li].point.y)/4);
          }

          if(node.segments[li].point.x>node.segments[qian].point.x){
            f_x=-1;
            v_x=((node.segments[li].point.x-node.segments[qian].point.x)/4);
          }else{
            f_x=1;
            v_x=((node.segments[qian].point.x-node.segments[li].point.x)/4);
          }

          if(node.segments[hou].point.x>node.segments[li].point.x){
            fh_x=1
            h_x=((node.segments[hou].point.x-node.segments[li].point.x)/4);
          }else{
            fh_x=-1
            h_x=((node.segments[li].point.x-node.segments[hou].point.x)/4);
          }

          if(node.segments[hou].point.y>node.segments[li].point.y){
            fh_y=1
            h_y=((node.segments[hou].point.y-node.segments[li].point.y)/4);
          }else{
            fh_y=-1
            h_y=((node.segments[li].point.y-node.segments[hou].point.y)/4);
          }
          _segemt.o.x = f_x*v_x;
          _segemt.o.y = f_y*v_y;

          _segemt.i.x = fh_x*h_x;
          _segemt.i.y = fh_y*h_y;
        }
        _segemts.push(_segemt);
      }
      console.dir(_segemts);
      node._segemts=_segemts;

  }
  curveSegments_view(node,isevent,is_path_control){
    let that = this;
    if(node._curveSegments_Group){
      node._curveSegments_Group.remove();
    }
    let _node_Group = new paper.Group();
    let temp_path_onMouseEnter=function(e) {
      e.target.scale(1.6);
    };
    let temp_path_onMouseLeave=function(e) {
      e.target.scale(0.625);
    };
    for(let li=0;li<node._segemts.length;li++){

      if(isevent){
        if(is_path_control){
          if(li==0){
            let path_handleOut_Line = new paper.Path.Line({
              from: [node._segemts[li].c.x, node._segemts[li].c.y],
              to: [node._segemts[li].c.x+node._segemts[li].o.x, node._segemts[li].c.y+node._segemts[li].o.y],
              strokeColor: 'black',
              name:'control_handleOut_Line'+li
            });
            _node_Group.addChild(path_handleOut_Line);
            /*let path_handleIn_Line = new paper.Path.Line({
              from: [node._segemts[li].c.x, node._segemts[li].c.y],
              to: [node._segemts[li].c.x+node._segemts[li].i.x, node._segemts[li].c.y+node._segemts[li].i.y],
              strokeColor: 'black',
              name:'control_handleIn_Line'+li
            });
            _node_Group.addChild(path_handleIn_Line);*/

            let temp_path_handleOut =new paper.Path.Circle({
              center: [node._segemts[li].c.x+node._segemts[li].o.x, node._segemts[li].c.y+node._segemts[li].o.y],
              radius: 2,
              fillColor: '#2144f5',
              strokeColor: '#e9eae1',
              name:'control_handleOut'+li
            });
            _node_Group.addChild(temp_path_handleOut);
            /*let temp_path_handleIn =new paper.Path.Circle({
              center: [node._segemts[li].c.x+node._segemts[li].i.x, node._segemts[li].c.y+node._segemts[li].i.y],
              radius: 2,
              fillColor: '#2144f5',
              strokeColor: '#e9eae1',
              name:'control_handleIn'+li
            });
            _node_Group.addChild(temp_path_handleIn);*/

            temp_path_handleOut.onMouseEnter=temp_path_onMouseEnter;
            temp_path_handleOut.onMouseLeave=temp_path_onMouseLeave;
            /*temp_path_handleIn.onMouseEnter=temp_path_onMouseEnter;
            temp_path_handleIn.onMouseLeave=temp_path_onMouseLeave;*/
          }else{
            /*let path_handleOut_Line = new paper.Path.Line({
              from: [node._segemts[li].c.x, node._segemts[li].c.y],
              to: [node._segemts[li].c.x+node._segemts[li].o.x, node._segemts[li].c.y+node._segemts[li].o.y],
              strokeColor: 'black',
              name:'control_handleOut_Line'+li
            });
            _node_Group.addChild(path_handleOut_Line);*/
            let path_handleIn_Line = new paper.Path.Line({
              from: [node._segemts[li].c.x, node._segemts[li].c.y],
              to: [node._segemts[li].c.x+node._segemts[li].i.x, node._segemts[li].c.y+node._segemts[li].i.y],
              strokeColor: 'black',
              name:'control_handleIn_Line'+li
            });
            _node_Group.addChild(path_handleIn_Line);

            /*let temp_path_handleOut =new paper.Path.Circle({
              center: [node._segemts[li].c.x+node._segemts[li].o.x, node._segemts[li].c.y+node._segemts[li].o.y],
              radius: 2,
              fillColor: '#2144f5',
              strokeColor: '#e9eae1',
              name:'control_handleOut'+li
            });
            _node_Group.addChild(temp_path_handleOut);*/
            let temp_path_handleIn =new paper.Path.Circle({
              center: [node._segemts[li].c.x+node._segemts[li].i.x, node._segemts[li].c.y+node._segemts[li].i.y],
              radius: 2,
              fillColor: '#2144f5',
              strokeColor: '#e9eae1',
              name:'control_handleIn'+li
            });
            _node_Group.addChild(temp_path_handleIn);

            /*temp_path_handleOut.onMouseEnter=temp_path_onMouseEnter;
            temp_path_handleOut.onMouseLeave=temp_path_onMouseLeave;*/
            temp_path_handleIn.onMouseEnter=temp_path_onMouseEnter;
            temp_path_handleIn.onMouseLeave=temp_path_onMouseLeave;
          }

        }else{
          let path_handleOut_Line = new paper.Path.Line({
            from: [node._segemts[li].c.x, node._segemts[li].c.y],
            to: [node._segemts[li].c.x+node._segemts[li].o.x, node._segemts[li].c.y+node._segemts[li].o.y],
            strokeColor: 'black',
            name:'control_handleOut_Line'+li
          });
          _node_Group.addChild(path_handleOut_Line);
          let path_handleIn_Line = new paper.Path.Line({
            from: [node._segemts[li].c.x, node._segemts[li].c.y],
            to: [node._segemts[li].c.x+node._segemts[li].i.x, node._segemts[li].c.y+node._segemts[li].i.y],
            strokeColor: 'black',
            name:'control_handleIn_Line'+li
          });
          _node_Group.addChild(path_handleIn_Line);

          let temp_path_handleOut =new paper.Path.Circle({
            center: [node._segemts[li].c.x+node._segemts[li].o.x, node._segemts[li].c.y+node._segemts[li].o.y],
            radius: 2,
            fillColor: '#2144f5',
            strokeColor: '#e9eae1',
            name:'control_handleOut'+li
          });
          _node_Group.addChild(temp_path_handleOut);
          let temp_path_handleIn =new paper.Path.Circle({
            center: [node._segemts[li].c.x+node._segemts[li].i.x, node._segemts[li].c.y+node._segemts[li].i.y],
            radius: 2,
            fillColor: '#2144f5',
            strokeColor: '#e9eae1',
            name:'control_handleIn'+li
          });
          _node_Group.addChild(temp_path_handleIn);

          temp_path_handleOut.onMouseEnter=temp_path_onMouseEnter;
          temp_path_handleOut.onMouseLeave=temp_path_onMouseLeave;
          temp_path_handleIn.onMouseEnter=temp_path_onMouseEnter;
          temp_path_handleIn.onMouseLeave=temp_path_onMouseLeave;
        }

      }


      let temp_path_ =new paper.Path.Circle({
        center: [node._segemts[li].c.x, node._segemts[li].c.y],
        radius: 2,
        fillColor: '#2144f5',
        strokeColor: '#e9eae1',
        name:'control_'+li
      });
      _node_Group.addChild(temp_path_);
      temp_path_.onMouseEnter=temp_path_onMouseEnter;
      temp_path_.onMouseLeave=temp_path_onMouseLeave;
    }
    node._curveSegments_Group=_node_Group;

    let path_onMouseDown=function (event) {
      /*event.target.start_position_x=event.target.position.x;
      event.target.start_position_y=event.target.position.y;
      event.target.node_firstChild_position_x=event.target.parent.firstChild.position.x;
      event.target.node_firstChild_position_y=event.target.parent.firstChild.position.y;*/
    };
    let path_onMouseDrag=function (event) {
      node.temp_control=undefined;
      //node._segemts=undefined;
      for(let li=0;li<node.segments.length;li++){
        if(event.target.name=='control_'+li){
          event.target.position.x += event.delta.x;
          event.target.position.y += event.delta.y;
          node.segments[li].point.x+= event.delta.x;
          node.segments[li].point.y+= event.delta.y;
          if(_node_Group.children['control_handleIn'+li]){
            _node_Group.children['control_handleIn'+li].position.x += event.delta.x;
            _node_Group.children['control_handleIn'+li].position.y += event.delta.y;
          }
          if(_node_Group.children['control_handleOut'+li]){
            _node_Group.children['control_handleOut'+li].position.x += event.delta.x;
            _node_Group.children['control_handleOut'+li].position.y += event.delta.y;
          }

        }
        if(event.target.name=='control_handleIn'+li){
          event.target.position.x += event.delta.x;
          event.target.position.y += event.delta.y;
          node.segments[li].handleIn.x=event.target.position.x - _node_Group.children['control_'+li].position.x;
          node.segments[li].handleIn.y=event.target.position.y - _node_Group.children['control_'+li].position.y;
        }
        if(event.target.name=='control_handleOut'+li){
          event.target.position.x += event.delta.x;
          event.target.position.y += event.delta.y;
          node.segments[li].handleOut.x=event.target.position.x - _node_Group.children['control_'+li].position.x;
          node.segments[li].handleOut.y=event.target.position.y - _node_Group.children['control_'+li].position.y;
        }
        if(_node_Group.children['control_handleIn'+li]){
          node._segemts[li].c.x=_node_Group.children['control_handleIn'+li].position.x;
          node._segemts[li].c.y=_node_Group.children['control_handleIn'+li].position.y;
        }

        node._segemts[li].i.x=node.segments[li].handleIn.x;
        node._segemts[li].i.y=node.segments[li].handleIn.y;

        node._segemts[li].i.x=node.segments[li].handleOut.x;
        node._segemts[li].i.y=node.segments[li].handleOut.y;

        if(_node_Group.children['control_handleOut_Line'+li]){
          _node_Group.children['control_handleOut_Line'+li].segments[0].point.x=_node_Group.children['control_'+li].position.x;
          _node_Group.children['control_handleOut_Line'+li].segments[0].point.y=_node_Group.children['control_'+li].position.y;

          _node_Group.children['control_handleOut_Line'+li].segments[1].point.x=_node_Group.children['control_handleOut'+li].position.x;
          _node_Group.children['control_handleOut_Line'+li].segments[1].point.y=_node_Group.children['control_handleOut'+li].position.y;
        }

        if(_node_Group.children['control_handleIn_Line'+li]){
          _node_Group.children['control_handleIn_Line'+li].segments[0].point.x=_node_Group.children['control_'+li].position.x;
          _node_Group.children['control_handleIn_Line'+li].segments[0].point.y=_node_Group.children['control_'+li].position.y;

          _node_Group.children['control_handleIn_Line'+li].segments[1].point.x=_node_Group.children['control_handleIn'+li].position.x;
          _node_Group.children['control_handleIn_Line'+li].segments[1].point.y=_node_Group.children['control_handleIn'+li].position.y;
        }


      }

      //that.f_class.parent.content_body_canvasTimeLine.refresh(node);
      /*node._segemts=undefined;
      that.copySegments(node)*/
    };
    if(isevent){
      for(let li=0;li<node.segments.length;li++){
        if(_node_Group.children['control_'+li])
        _node_Group.children['control_'+li].onMouseDown=path_onMouseDown;
        if(_node_Group.children['control_'+li])
        _node_Group.children['control_'+li].onMouseDrag=path_onMouseDrag;
        if(_node_Group.children['control_handleIn'+li])
        _node_Group.children['control_handleIn'+li].onMouseDrag=path_onMouseDrag;
        if(_node_Group.children['control_handleOut'+li])
        _node_Group.children['control_handleOut'+li].onMouseDrag=path_onMouseDrag;
        if(_node_Group.children['control_'+li])
        _node_Group.children['control_'+li].onMouseUp = function(event) {
          that.saveCache();
        }
        if(_node_Group.children['control_handleIn'+li])
        _node_Group.children['control_handleIn'+li].onMouseUp = function(event) {
          that.saveCache();
        }
        if(_node_Group.children['control_handleOut'+li])
        _node_Group.children['control_handleOut'+li].onMouseUp = function(event) {
          that.saveCache();
        }

      }
    }
  }
  eventNode(node,nodeDrag){
    let that = this;
    that.selectnode=node;
    console.dir(node);
    let temp_control={
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
    if(node.temp_control){
      temp_control=node.temp_control;
    }else{
      node.temp_control=temp_control;
    }
    if(node._node_Group){
      node._node_Group.remove();
    }

    if(!nodeDrag){
      node.scale(temp_control.w,temp_control.h,temp_control.c);
      node.rotate(temp_control.angle,temp_control.c);
      node.position.x=node.position.x+temp_control.x;
      node.position.y=node.position.y+temp_control.y;
    }
    let temp_Rectangle = new paper.Path.Rectangle({
      from: temp_control.topLeft,
      to: temp_control.bottomRight,
      strokeColor: '#5dcbe9',
      dashArray: [2, 6],
      strokeWidth: 1,
    });
    temp_Rectangle.scale(temp_control.w,temp_control.h,temp_control.c);
    temp_Rectangle.rotate(temp_control.angle,temp_control.c);

    temp_Rectangle.position.x=temp_Rectangle.position.x+temp_control.x;
    temp_Rectangle.position.y=temp_Rectangle.position.y+temp_control.y;
    /*temp_Rectangle.position.x=node.position.x;
    temp_Rectangle.position.y=node.position.y;*/
    let t_x=node.position.x-temp_Rectangle.position.x;
    let t_y=node.position.y-temp_Rectangle.position.y;
    temp_control.x=temp_control.x+t_x;
    temp_control.y=temp_control.y+t_y;
    temp_Rectangle.position.x=temp_Rectangle.position.x+t_x;
    temp_Rectangle.position.y=temp_Rectangle.position.y+t_y;
    console.dir(t_x)
    console.dir(t_y)
     t_x=0;
     t_y=0;



    let temp_topLeft =new paper.Path.Circle({
      center: temp_control.topLeft,
      radius: 5,
      fillColor: '#eca442',
      strokeColor: '#e9eae1',
      name:'control_topLeft'
    });
    temp_topLeft.position.x=temp_control.c[0]+(temp_control.topLeft[0]-temp_control.c[0])*temp_control.w;
    temp_topLeft.position.y=temp_control.c[1]+(temp_control.topLeft[1]-temp_control.c[1])*temp_control.h;
    temp_topLeft.rotate(temp_control.angle,temp_control.c);
    temp_topLeft.position.x=temp_topLeft.position.x+temp_control.x;
    temp_topLeft.position.y=temp_topLeft.position.y+temp_control.y;

    temp_topLeft.position.x=temp_topLeft.position.x+t_x;
    temp_topLeft.position.y=temp_topLeft.position.y+t_y;


    let temp_topCenter =new paper.Path.Circle({
      center: temp_control.topCenter,
      radius: 5,
      fillColor: '#eca442',
      strokeColor: '#e9eae1',
      name:'control_topCenter'
    });
    temp_topCenter.position.x=temp_control.c[0]+(temp_control.topCenter[0]-temp_control.c[0])*temp_control.w;
    temp_topCenter.position.y=temp_control.c[1]+(temp_control.topCenter[1]-temp_control.c[1])*temp_control.h;
    temp_topCenter.rotate(temp_control.angle,temp_control.c);
    temp_topCenter.position.x=temp_topCenter.position.x+temp_control.x;
    temp_topCenter.position.y=temp_topCenter.position.y+temp_control.y;

    temp_topCenter.position.x=temp_topCenter.position.x+t_x;
    temp_topCenter.position.y=temp_topCenter.position.y+t_y;

    let temp_topRight =new paper.Path.Circle({
      center: temp_control.topRight,
      radius: 5,
      fillColor: '#eca442',
      strokeColor: '#e9eae1',
      name:'control_topRight'
    });
    temp_topRight.position.x=temp_control.c[0]+(temp_control.topRight[0]-temp_control.c[0])*temp_control.w;
    temp_topRight.position.y=temp_control.c[1]+(temp_control.topRight[1]-temp_control.c[1])*temp_control.h;
    temp_topRight.rotate(temp_control.angle,temp_control.c);
    temp_topRight.position.x=temp_topRight.position.x+temp_control.x;
    temp_topRight.position.y=temp_topRight.position.y+temp_control.y;

    temp_topRight.position.x=temp_topRight.position.x+t_x;
    temp_topRight.position.y=temp_topRight.position.y+t_y;

    let temp_leftCenter =new paper.Path.Circle({
      center: temp_control.leftCenter,
      radius: 5,
      fillColor: '#eca442',
      strokeColor: '#e9eae1',
      name:'control_leftCenter'
    });
    temp_leftCenter.position.x=temp_control.c[0]+(temp_control.leftCenter[0]-temp_control.c[0])*temp_control.w;
    temp_leftCenter.position.y=temp_control.c[1]+(temp_control.leftCenter[1]-temp_control.c[1])*temp_control.h;
    temp_leftCenter.rotate(temp_control.angle,temp_control.c);
    temp_leftCenter.position.x=temp_leftCenter.position.x+temp_control.x;
    temp_leftCenter.position.y=temp_leftCenter.position.y+temp_control.y;

    temp_leftCenter.position.x=temp_leftCenter.position.x+t_x;
    temp_leftCenter.position.y=temp_leftCenter.position.y+t_y;

    let temp_center =new paper.Path.Circle({
      center: temp_control.center,
      radius: 3,
      fillColor: '#black',
      strokeColor: '#e9eae1',
      name:'control_center'
    });
    temp_center.position.x=temp_control.c[0]+(temp_control.center[0]-temp_control.c[0])*temp_control.w;
    temp_center.position.y=temp_control.c[1]+(temp_control.center[1]-temp_control.c[1])*temp_control.h;
    temp_center.rotate(temp_control.angle,temp_control.c);
    temp_center.position.x=temp_center.position.x+temp_control.x;
    temp_center.position.y=temp_center.position.y+temp_control.y;

    temp_center.position.x=temp_center.position.x+t_x;
    temp_center.position.y=temp_center.position.y+t_y;

    let temp_rightCenter =new paper.Path.Circle({
      center: temp_control.rightCenter,
      radius: 5,
      fillColor: '#eca442',
      strokeColor: '#e9eae1',
      name:'control_rightCenter'
    });
    temp_rightCenter.position.x=temp_control.c[0]+(temp_control.rightCenter[0]-temp_control.c[0])*temp_control.w;
    temp_rightCenter.position.y=temp_control.c[1]+(temp_control.rightCenter[1]-temp_control.c[1])*temp_control.h;
    temp_rightCenter.rotate(temp_control.angle,temp_control.c);
    temp_rightCenter.position.x=temp_rightCenter.position.x+temp_control.x;
    temp_rightCenter.position.y=temp_rightCenter.position.y+temp_control.y;

    temp_rightCenter.position.x=temp_rightCenter.position.x+t_x;
    temp_rightCenter.position.y=temp_rightCenter.position.y+t_y;

    let temp_bottomLeft =new paper.Path.Circle({
      center: temp_control.bottomLeft,
      radius: 5,
      fillColor: '#eca442',
      strokeColor: '#e9eae1',
      name:'control_bottomLeft'
    });
    temp_bottomLeft.position.x=temp_control.c[0]+(temp_control.bottomLeft[0]-temp_control.c[0])*temp_control.w;
    temp_bottomLeft.position.y=temp_control.c[1]+(temp_control.bottomLeft[1]-temp_control.c[1])*temp_control.h;
    temp_bottomLeft.rotate(temp_control.angle,temp_control.c);
    temp_bottomLeft.position.x=temp_bottomLeft.position.x+temp_control.x;
    temp_bottomLeft.position.y=temp_bottomLeft.position.y+temp_control.y;

    temp_bottomLeft.position.x=temp_bottomLeft.position.x+t_x;
    temp_bottomLeft.position.y=temp_bottomLeft.position.y+t_y;

    let temp_bottomCenter =new paper.Path.Circle({
      center: temp_control.bottomCenter,
      radius: 5,
      fillColor: '#eca442',
      strokeColor: '#e9eae1',
      name:'control_bottomCenter'
    });
    temp_bottomCenter.position.x=temp_control.c[0]+(temp_control.bottomCenter[0]-temp_control.c[0])*temp_control.w;
    temp_bottomCenter.position.y=temp_control.c[1]+(temp_control.bottomCenter[1]-temp_control.c[1])*temp_control.h;
    temp_bottomCenter.rotate(temp_control.angle,temp_control.c);
    temp_bottomCenter.position.x=temp_bottomCenter.position.x+temp_control.x;
    temp_bottomCenter.position.y=temp_bottomCenter.position.y+temp_control.y;

    temp_bottomCenter.position.x=temp_bottomCenter.position.x+t_x;
    temp_bottomCenter.position.y=temp_bottomCenter.position.y+t_y;


    let temp_bottomRight =new paper.Path.Circle({
      center: temp_control.bottomRight,
      radius: 5,
      fillColor: '#eca442',
      strokeColor: '#e9eae1',
      name:'control_bottomRight'
    });
    temp_bottomRight.position.x=temp_control.c[0]+(temp_control.bottomRight[0]-temp_control.c[0])*temp_control.w;
    temp_bottomRight.position.y=temp_control.c[1]+(temp_control.bottomRight[1]-temp_control.c[1])*temp_control.h;
    temp_bottomRight.rotate(temp_control.angle,temp_control.c);
    temp_bottomRight.position.x=temp_bottomRight.position.x+temp_control.x;
    temp_bottomRight.position.y=temp_bottomRight.position.y+temp_control.y;

    temp_bottomRight.position.x=temp_bottomRight.position.x+t_x;
    temp_bottomRight.position.y=temp_bottomRight.position.y+t_y;

    let path_center_Line = new paper.Path.Line({
      from: temp_control.c,
      to: temp_control.center_control,
      strokeColor: 'black'
    });

    path_center_Line.rotate(temp_control.angle,temp_control.c);
    path_center_Line.position.x=path_center_Line.position.x+temp_control.x;
    path_center_Line.position.y=path_center_Line.position.y+temp_control.y;

    path_center_Line.position.x=path_center_Line.position.x+t_x;
    path_center_Line.position.y=path_center_Line.position.y+t_y;

    let temp_center_control = new paper.Path.Circle({
      center: temp_control.center_control,
      radius: 3,
      fillColor: '#eca442',
      strokeColor: '#e9eae1',
      name:'control_center_control'
    });
    temp_center_control.rotate(temp_control.angle,temp_control.c);
    temp_center_control.position.x=temp_center_control.position.x+temp_control.x;
    temp_center_control.position.y=temp_center_control.position.y+temp_control.y;

    temp_center_control.position.x=temp_center_control.position.x+t_x;
    temp_center_control.position.y=temp_center_control.position.y+t_y;

    let temp_path_onMouseEnter=function(e) {
      e.target.scale(1.6);
    };
    let temp_path_onMouseLeave=function(e) {
      e.target.scale(0.625);
    };

    let temp_path_onMouseUp = function(event) {
      //that.selectNode=node;
      that.nodeAttrs();
      that.saveCache();
    };

    let _node_Group = new paper.Group([
      temp_Rectangle,temp_topLeft,temp_topCenter,temp_topRight,temp_leftCenter,temp_center,
      temp_rightCenter,temp_bottomLeft,temp_bottomCenter,temp_bottomRight,path_center_Line,temp_center_control
    ]);
    node._node_Group=_node_Group;
    temp_topLeft.onMouseUp=temp_path_onMouseUp;
    temp_topLeft.onMouseEnter=temp_path_onMouseEnter;
    temp_topLeft.onMouseLeave=temp_path_onMouseLeave;
    temp_topCenter.onMouseUp=temp_path_onMouseUp;
    temp_topCenter.onMouseEnter=temp_path_onMouseEnter;
    temp_topCenter.onMouseLeave=temp_path_onMouseLeave;
    temp_topRight.onMouseUp=temp_path_onMouseUp;
    temp_topRight.onMouseEnter=temp_path_onMouseEnter;
    temp_topRight.onMouseLeave=temp_path_onMouseLeave;

    temp_leftCenter.onMouseUp=temp_path_onMouseUp;
    temp_leftCenter.onMouseEnter=temp_path_onMouseEnter;
    temp_leftCenter.onMouseLeave=temp_path_onMouseLeave;
    temp_center.onMouseEnter=temp_path_onMouseEnter;
    temp_center.onMouseLeave=temp_path_onMouseLeave;
    temp_rightCenter.onMouseUp=temp_path_onMouseUp;
    temp_rightCenter.onMouseEnter=temp_path_onMouseEnter;
    temp_rightCenter.onMouseLeave=temp_path_onMouseLeave;

    temp_bottomLeft.onMouseUp=temp_path_onMouseUp;
    temp_bottomLeft.onMouseEnter=temp_path_onMouseEnter;
    temp_bottomLeft.onMouseLeave=temp_path_onMouseLeave;
    temp_bottomCenter.onMouseUp=temp_path_onMouseUp;
    temp_bottomCenter.onMouseEnter=temp_path_onMouseEnter;
    temp_bottomCenter.onMouseLeave=temp_path_onMouseLeave;
    temp_bottomRight.onMouseUp=temp_path_onMouseUp;
    temp_bottomRight.onMouseEnter=temp_path_onMouseEnter;
    temp_bottomRight.onMouseLeave=temp_path_onMouseLeave;

    temp_center_control.onMouseUp=temp_path_onMouseUp;
    temp_center_control.onMouseEnter=temp_path_onMouseEnter;
    temp_center_control.onMouseLeave=temp_path_onMouseLeave;

    let path_onMouseDown=function (event) {
      console.dir(event.target.start_position_x);
      /*if(event.target.start_position_x==undefined){
        event.target.start_position_x=event.target.position.x;
        event.target.start_position_y=event.target.position.y;
      }*/
    };
    let path_onMouseDrag=function (event) {
      node.position.x=node.position.x-temp_control.x;
      node.position.y=node.position.y-temp_control.y;
      node.rotate(-temp_control.angle,temp_control.c);
      node.scale(1/temp_control.w,1/temp_control.h,temp_control.c);

      event.target.position.x+=event.delta.x;
      event.target.position.y+=event.delta.y;

      if(event.target.name=='control_center_control'){
        temp_control.angle = getAngle(
          temp_control.c[0]+temp_control.x,
          temp_control.c[1]+temp_control.y,
          event.target.position.x,
          event.target.position.y,
        );
      }else if(event.target.name=='control_topLeft'){
       let temp_point= calcNewPoint( {
          x:event.target.position.x,
          y:event.target.position.y,
        },  {
          x:temp_control.c[0]+temp_control.x,
          y:temp_control.c[1]+temp_control.y,
        },  -temp_control.angle);
        let w_bl=(temp_point.x-(temp_control.c[0]+temp_control.x)) /(temp_control.topLeft[0]-temp_control.c[0]);
        let h_bl=((temp_point.y-(temp_control.c[1]+temp_control.y)) /(temp_control.topLeft[1]-temp_control.c[1]));
        if(temp_control.topLeft[0]-temp_control.c[0]!=0){
          temp_control.w=w_bl;
        }
        if(temp_control.topLeft[1]-temp_control.c[1]!=0){
          temp_control.h=h_bl;
        }
      }else if(event.target.name=='control_topCenter'){
        let temp_point= calcNewPoint( {
          x:event.target.position.x,
          y:event.target.position.y,
        },  {
          x:temp_control.c[0]+temp_control.x,
          y:temp_control.c[1]+temp_control.y,
        },  -temp_control.angle);
        let w_bl=(temp_point.x-(temp_control.c[0]+temp_control.x)) /(temp_control.topCenter[0]-temp_control.c[0]);
        let h_bl=((temp_point.y-(temp_control.c[1]+temp_control.y)) /(temp_control.topCenter[1]-temp_control.c[1]));
        if(temp_control.topCenter[0]-temp_control.c[0]!=0){
          temp_control.w=w_bl;
        }
        if(temp_control.topCenter[1]-temp_control.c[1]!=0){
          temp_control.h=h_bl;
        }
      }else if(event.target.name=='control_topRight'){
        let temp_point= calcNewPoint( {
          x:event.target.position.x,
          y:event.target.position.y,
        },  {
          x:temp_control.c[0]+temp_control.x,
          y:temp_control.c[1]+temp_control.y,
        },  -temp_control.angle);
        let w_bl=(temp_point.x-(temp_control.c[0]+temp_control.x)) /(temp_control.topRight[0]-temp_control.c[0]);
        let h_bl=((temp_point.y-(temp_control.c[1]+temp_control.y)) /(temp_control.topRight[1]-temp_control.c[1]));
        if(temp_control.topRight[0]-temp_control.c[0]!=0){
          temp_control.w=w_bl;
        }
        if(temp_control.topRight[1]-temp_control.c[1]!=0){
          temp_control.h=h_bl;
        }
      }else if(event.target.name=='control_leftCenter'){
        let temp_point= calcNewPoint( {
          x:event.target.position.x,
          y:event.target.position.y,
        },  {
          x:temp_control.c[0]+temp_control.x,
          y:temp_control.c[1]+temp_control.y,
        },  -temp_control.angle);
        let w_bl=(temp_point.x-(temp_control.c[0]+temp_control.x)) /(temp_control.leftCenter[0]-temp_control.c[0]);
        let h_bl=((temp_point.y-(temp_control.c[1]+temp_control.y)) /(temp_control.leftCenter[1]-temp_control.c[1]));
        if(temp_control.leftCenter[0]-temp_control.c[0]!=0){
          temp_control.w=w_bl;
        }
        if(temp_control.leftCenter[1]-temp_control.c[1]!=0){
          temp_control.h=h_bl;
        }
      }else if(event.target.name=='control_rightCenter'){
        let temp_point= calcNewPoint( {
          x:event.target.position.x,
          y:event.target.position.y,
        },  {
          x:temp_control.c[0]+temp_control.x,
          y:temp_control.c[1]+temp_control.y,
        },  -temp_control.angle);
        let w_bl=(temp_point.x-(temp_control.c[0]+temp_control.x)) /(temp_control.rightCenter[0]-temp_control.c[0]);
        let h_bl=((temp_point.y-(temp_control.c[1]+temp_control.y)) /(temp_control.rightCenter[1]-temp_control.c[1]));
        if(temp_control.rightCenter[0]-temp_control.c[0]!=0){
          temp_control.w=w_bl;
        }
        if(temp_control.rightCenter[1]-temp_control.c[1]!=0){
          temp_control.h=h_bl;
        }
      }else if(event.target.name=='control_bottomLeft'){
        let temp_point= calcNewPoint( {
          x:event.target.position.x,
          y:event.target.position.y,
        },  {
          x:temp_control.c[0]+temp_control.x,
          y:temp_control.c[1]+temp_control.y,
        },  -temp_control.angle);
        let w_bl=(temp_point.x-(temp_control.c[0]+temp_control.x)) /(temp_control.bottomLeft[0]-temp_control.c[0]);
        let h_bl=((temp_point.y-(temp_control.c[1]+temp_control.y)) /(temp_control.bottomLeft[1]-temp_control.c[1]));
        if(temp_control.bottomLeft[0]-temp_control.c[0]!=0){
          temp_control.w=w_bl;
        }
        if(temp_control.bottomLeft[1]-temp_control.c[1]!=0){
          temp_control.h=h_bl;
        }
      }else if(event.target.name=='control_bottomLeft'){
        let temp_point= calcNewPoint( {
          x:event.target.position.x,
          y:event.target.position.y,
        },  {
          x:temp_control.c[0]+temp_control.x,
          y:temp_control.c[1]+temp_control.y,
        },  -temp_control.angle);
        let w_bl=(temp_point.x-(temp_control.c[0]+temp_control.x)) /(temp_control.bottomLeft[0]-temp_control.c[0]);
        let h_bl=((temp_point.y-(temp_control.c[1]+temp_control.y)) /(temp_control.bottomLeft[1]-temp_control.c[1]));
        if(temp_control.bottomLeft[0]-temp_control.c[0]!=0){
          temp_control.w=w_bl;
        }
        if(temp_control.bottomLeft[1]-temp_control.c[1]!=0){
          temp_control.h=h_bl;
        }
      }else if(event.target.name=='control_bottomCenter'){
        let temp_point= calcNewPoint( {
          x:event.target.position.x,
          y:event.target.position.y,
        },  {
          x:temp_control.c[0]+temp_control.x,
          y:temp_control.c[1]+temp_control.y,
        },  -temp_control.angle);
        let w_bl=(temp_point.x-(temp_control.c[0]+temp_control.x)) /(temp_control.bottomCenter[0]-temp_control.c[0]);
        let h_bl=((temp_point.y-(temp_control.c[1]+temp_control.y)) /(temp_control.bottomCenter[1]-temp_control.c[1]));
        if(temp_control.bottomCenter[0]-temp_control.c[0]!=0){
          temp_control.w=w_bl;
        }
        if(temp_control.bottomCenter[1]-temp_control.c[1]!=0){
          temp_control.h=h_bl;
        }
      }else if(event.target.name=='control_bottomRight'){
        let temp_point= calcNewPoint( {
          x:event.target.position.x,
          y:event.target.position.y,
        },  {
          x:temp_control.c[0]+temp_control.x,
          y:temp_control.c[1]+temp_control.y,
        },  -temp_control.angle);
        let w_bl=(temp_point.x-(temp_control.c[0]+temp_control.x)) /(temp_control.bottomRight[0]-temp_control.c[0]);
        let h_bl=((temp_point.y-(temp_control.c[1]+temp_control.y)) /(temp_control.bottomRight[1]-temp_control.c[1]));
        if(temp_control.bottomRight[0]-temp_control.c[0]!=0){
          temp_control.w=w_bl;
        }
        if(temp_control.bottomRight[1]-temp_control.c[1]!=0){
          temp_control.h=h_bl;
        }
      }


      that.eventNode(node);

      //that.f_class.parent.content_body_canvasTimeLine.refresh(node);
    };

    temp_topCenter.onMouseDown=path_onMouseDown;
    temp_topCenter.onMouseDrag=path_onMouseDrag;

    temp_topLeft.onMouseDown=path_onMouseDown;
    temp_topLeft.onMouseDrag=path_onMouseDrag;



    temp_topCenter.onMouseDown=path_onMouseDown;
    temp_topCenter.onMouseDrag=path_onMouseDrag;
    temp_topRight.onMouseDown=path_onMouseDown;
    temp_topRight.onMouseDrag=path_onMouseDrag;

    temp_leftCenter.onMouseDown=path_onMouseDown;
    temp_leftCenter.onMouseDrag=path_onMouseDrag;
    temp_center.onMouseDown=path_onMouseDown;
    temp_center.onMouseDrag=path_onMouseDrag;
    temp_rightCenter.onMouseDown=path_onMouseDown;
    temp_rightCenter.onMouseDrag=path_onMouseDrag;

    temp_bottomLeft.onMouseDown=path_onMouseDown;
    temp_bottomLeft.onMouseDrag=path_onMouseDrag;
    temp_bottomCenter.onMouseDown=path_onMouseDown;
    temp_bottomCenter.onMouseDrag=path_onMouseDrag;
    temp_bottomRight.onMouseDown=path_onMouseDown;
    temp_bottomRight.onMouseDrag=path_onMouseDrag;

    temp_center_control.onMouseDown=path_onMouseDown;
    temp_center_control.onMouseDrag=path_onMouseDrag;

    node.onMouseUp=temp_path_onMouseUp;

    node.onMouseDown=function (event){
      that.selectNode=node;
      that.nodeAttrs();
      for(let gi=0;gi<that.f_class.group.children.length;gi++){
        if(that.f_class.group.children[gi]._node_Group){
          that.f_class.group.children[gi]._node_Group.remove();
        }
        if(that.f_class.group.children[gi]._curveSegments_Group){
          that.f_class.group.children[gi]._curveSegments_Group.remove();
        }
        if(that.f_class.group.children[gi].addSegmentscircle){
          that.f_class.group.children[gi].addSegmentscircle.remove();
        }
      }
      that.eventNode(node,'nodeDrag');
      //that.f_class.parent.content_body_canvasTimeLine.refresh(node);
    }

    node.onMouseDrag=function (event) {

      for(let gi=0;gi<that.f_class.group.children.length;gi++){
        if(that.f_class.group.children[gi]._node_Group){
          that.f_class.group.children[gi]._node_Group.remove();
        }
        if(that.f_class.group.children[gi]._curveSegments_Group){
          that.f_class.group.children[gi]._curveSegments_Group.remove();
        }
        if(that.f_class.group.children[gi].addSegmentscircle){
          that.f_class.group.children[gi].addSegmentscircle.remove();
        }
      }
      event.target.position.x+=event.delta.x;
      event.target.position.y+=event.delta.y;
      temp_control.x=event.target.position.x-temp_control.center[0];
      temp_control.y=event.target.position.y-temp_control.center[1];
      /*temp_control.x=event.target.position.x-temp_control.center[0];
      temp_control.y=event.target.position.y-temp_control.center[1];*/
      that.eventNode(node,'nodeDrag');
      //that.f_class.parent.content_body_canvasTimeLine.refresh(node);
    }
  }
  imgDom(source){
    let that = this;
    var node_Raster = new paper.Raster({
      source: source,
      position: paper.view.center
    });
    node_Raster.scale(0.5);


    /*var circle = new paper.Path.Circle({
      center: paper.view.center,
      radius: 85,
      strokeColor: 'black'
    });




    var node = new paper.Group(circle,node_Raster)
    node.clipped = true;*/



    node_Raster.on('load', function() {
      node_Raster.name='img_'+that.f_class.group.children.length;
      that.f_class.group.addChild(node_Raster);
      console.dir(that.f_class.group.exportJSON())
      node_Raster.onMouseDown = function(event) {
        that.selectNode=node_Raster;
        that.nodeAttrs();
        that.off();
        for(let gi=0;gi<that.f_class.group.children.length;gi++){
          if(that.f_class.group.children[gi]._node_Group){
            that.f_class.group.children[gi]._node_Group.remove();
          }
          if(that.f_class.group.children[gi]._curveSegments_Group){
            that.f_class.group.children[gi]._curveSegments_Group.remove();
          }
          if(that.f_class.group.children[gi].addSegmentscircle){
            that.f_class.group.children[gi].addSegmentscircle.remove();
          }
        }
        that.eventNode(node_Raster,'nodeDrag');
      }
      that.f_class.parent.content_body_canvasTimeLine.refresh(node_Raster);
    });
  }
}