class ContentUI{
  constructor(){
    let that = this
    that.size={
      width:window.innerWidth<400?400:window.innerWidth,
      height:window.innerHeight<220?220:window.innerHeight,
      content_head_height:35,
      content_body_left_width:300,//左侧菜单
      content_body_left_tools_width:49,//125,//左侧菜单工具
      content_body_right_width:125,//49,
      content_body_Dividline_width:0.7,
      content_body_Dividline_height:2,
      content_body_canvasTimeLine_left_head_width:28,
      content_body_canvasTimeLine_right_foot_div:24,
      content_centre_navigationbar_height:22,
    }
    that.attr={
      id:'content_div',
      style:`position: absolute; overflow: hidden; z-index: 0; width: ${that.size.width}px; height: ${that.size.height}px;`,
      children:[
        {
          id:'content_head_div',
          style:`position: absolute; overflow: hidden; width: ${that.size.width}px; height: ${that.size.content_head_height}px; left: 0px; top: 0px; cursor: default;`,
        },
        {
          id:'content_body_div',
          style:`position: absolute; overflow: hidden; left: 0px; top: ${that.size.content_head_height}px; width: ${that.size.width}px; height: ${that.size.height-that.size.content_head_height}px;`,
          children: [
            {
              id:'content_body_Dividline_div',
              style:`z-index: 1; cursor: row-resize; position: absolute; left: 0px; top: ${(that.size.height-that.size.content_head_height)*that.size.content_body_Dividline_width}px; width: ${that.size.width}px; height: ${that.size.content_body_Dividline_height}px;`,
            },
            {
              id:'content_centre_div',
              style:`overflow: hidden; width: ${that.size.width-that.size.content_body_right_width-that.size.content_body_left_width}px; height: ${(that.size.height-that.size.content_head_height)*that.size.content_body_Dividline_width}px; position: absolute; left: ${that.size.content_body_left_width}px; top: 0px;`,
              children:[
                {
                  id:'content_centre_navigationbar_div',//导航栏
                  style:`overflow: hidden; width: ${that.size.width-that.size.content_body_right_width-that.size.content_body_left_width}px; height: ${that.size.content_centre_navigationbar_height}px; cursor: default; position: absolute; left: 0px; top: 0px;`,
                },
                {
                  id:'content_centre_canvas_div',
                  style:`position: absolute; left: 0px; top: ${that.size.content_centre_navigationbar_height}px; width: ${that.size.width-that.size.content_body_right_width-that.size.content_body_left_width}px; height: ${(that.size.height-that.size.content_head_height)*that.size.content_body_Dividline_width-that.size.content_centre_navigationbar_height}px;`,
                },
              ]
            },
            {
              id:'content_body_canvasTimeLine_div',
              style:`overflow: hidden; width: ${that.size.width}px; height: ${(that.size.height-that.size.content_head_height)*(1-that.size.content_body_Dividline_width)}px; position: absolute; left: 0px; top:${(that.size.height-that.size.content_head_height)*that.size.content_body_Dividline_width}px;`,
              children:[
                {
                  id:'content_body_canvasTimeLine_left_div',
                  style:`position: absolute;overflow: hidden;left: 0px;top: 0px;width: ${that.size.content_body_left_width}px;height: ${(that.size.height-that.size.content_head_height)*(1-that.size.content_body_Dividline_width)}px;`,
                  children:[
                    {
                      id:'content_body_canvasTimeLine_left_head_div',
                      style:`position: absolute; overflow: hidden; width: ${that.size.content_body_left_width}px; height: ${that.size.content_body_canvasTimeLine_left_head_width}px; left: 0px; top: 0px; cursor: default;`,
                    },
                    {
                      id:'content_body_canvasTimeLine_left_body_div',
                      style:`position: absolute; overflow: hidden; left: 0px; top: ${that.size.content_body_canvasTimeLine_left_head_width}px; width: ${that.size.content_body_left_width}px; height: ${(that.size.height-that.size.content_head_height)*(1-that.size.content_body_Dividline_width)-that.size.content_body_canvasTimeLine_left_head_width}px;`,
                    }
                  ]
                },
                {
                  id:'content_body_canvasTimeLine_right_div',
                  style:`position: absolute; overflow: hidden; left: ${that.size.content_body_left_width}px; top: 0px; width: ${that.size.width-that.size.content_body_left_width}px; height: ${(that.size.height-that.size.content_head_height)*(1-that.size.content_body_Dividline_width)}px;`,
                  children:[
                    {
                      id:'content_body_canvasTimeLine_right_body_div',
                      style:`position: absolute; overflow: hidden; width: ${that.size.width-that.size.content_body_left_width}px; height: ${(that.size.height-that.size.content_head_height)*(1-that.size.content_body_Dividline_width)-that.size.content_body_canvasTimeLine_left_head_width-that.size.content_body_canvasTimeLine_right_foot_div}px; left: 0px; top: ${that.size.content_body_canvasTimeLine_left_head_width}px; cursor: default;`,
                    },
                    {
                      id:'content_body_canvasTimeLine_right_head_div',
                      style:`position: absolute; overflow: hidden; width: ${that.size.width-that.size.content_body_left_width}px; height: ${(that.size.height-that.size.content_head_height)*(1-that.size.content_body_Dividline_width)}px; left: 0px; top: 0px;`,
                    },
                    {
                      id:'content_body_canvasTimeLine_right_foot_div',
                      style:`position: absolute; overflow: hidden; width: ${that.size.width-that.size.content_body_left_width}px; height: ${that.size.content_body_canvasTimeLine_right_foot_div}px; left: 0px; top: ${(that.size.height-that.size.content_head_height)*(1-that.size.content_body_Dividline_width)-that.size.content_body_canvasTimeLine_right_foot_div}px; cursor: default;`,
                    },

                  ]
                }
              ]
            },
            {
              id:'content_body_right_div',
              style:`overflow: hidden; width: ${that.size.width-that.size.content_body_right_width}px; height: ${(that.size.height-that.size.content_head_height)*that.size.content_body_Dividline_width}px; position: absolute; left: ${that.size.width-that.size.content_body_right_width}px; top: 0px;`,
            },
            {
              id:'content_body_left_div',
              style:`overflow: hidden; width: ${that.size.content_body_left_width}px; height: ${(that.size.height-that.size.content_head_height)*that.size.content_body_Dividline_width}px; position: absolute; left: 0px; top: 0px;`,
              children:[
                {
                  id:'content_body_left_tools_div',
                  style:`overflow: hidden; width: ${that.size.content_body_left_tools_width}px; height:${(that.size.height-that.size.content_head_height)*that.size.content_body_Dividline_width}px; cursor: default; position: absolute; left: 0px; top: 0px;`,
                },
                {
                  id:'content_body_left_attr_div',
                  style:`overflow: hidden; width: ${that.size.content_body_left_width-that.size.content_body_left_tools_width}px; height:${(that.size.height-that.size.content_head_height)*that.size.content_body_Dividline_width}px; position: absolute; left: ${that.size.content_body_left_tools_width}px; top: 0px;`,
                }
              ]
            }
          ]
        }
      ]
    }
    this.init();
    //this.windowListenerResize();
    this.signal= new Signal();
    this.signal.add(this.windowListenerResize);
  }
  init(){
    let that = this;
    let forFuc=(node,f_node)=>{
      let dom = document.createElement( 'div' );
      dom.id=node.id;
      /*if(node.id=='content_body_Dividline_div'){
        console.dir(node.id);
        dom.setAttribute('draggable',true);
        dom.addEventListener( 'drag', function (event) {
          that.size.content_body_Dividline_width=Math.abs((parseFloat(event.target.style.top)+event.offsetY)/(that.size.height-that.size.content_head_height));
          console.dir(that.size.content_body_Dividline_width);
          if(that.size.content_body_Dividline_width<=0){
            that.size.content_body_Dividline_width=0.1;
          }
          if(that.size.content_body_Dividline_width>=1){
            that.size.content_body_Dividline_width=0.9;
          }
          console.dir(that.size.content_body_Dividline_width);
          that.signal.dispatch(that);
          event.preventDefault();
        }, false );
      }*/
      dom.setAttribute('style',node.style);

      //dom.setAttribute('style',node.style+`background: rgb(${that.random(0,255)},${that.random(0,255)},${that.random(0,255)});`);
      f_node.appendChild(dom);
      if(node.children&&node.children.length){
        for(let i=0;i<node.children.length;i++){
          forFuc(node.children[i],dom);
        }
      }
    };
    forFuc(that.attr,document.body);
  }
  /**
   * 产生随机整数，包含下限值，但不包括上限值
   * @param {Number} lower 下限
   * @param {Number} upper 上限
   * @return {Number} 返回在下限到上限之间的一个随机整数
   */
  random(lower, upper) {
    return Math.floor(Math.random() * (upper - lower)) + lower;
  }
  windowListenerResize(that){
    that.size.width=window.innerWidth<400?400:window.innerWidth;
    that.size.height=window.innerHeight<220?220:window.innerHeight;

    that.attr={
      id:'content_div',
      style:`position: absolute; overflow: hidden; z-index: 0; width: ${that.size.width}px; height: ${that.size.height}px;`,
      children:[
        {
          id:'content_head_div',
          style:`position: absolute; overflow: hidden; width: ${that.size.width}px; height: ${that.size.content_head_height}px; left: 0px; top: 0px; cursor: default;`,
        },
        {
          id:'content_body_div',
          style:`position: absolute; overflow: hidden; left: 0px; top: ${that.size.content_head_height}px; width: ${that.size.width}px; height: ${that.size.height-that.size.content_head_height}px;`,
          children: [
            {
              id:'content_body_Dividline_div',
              style:`z-index: 1; cursor: row-resize; position: absolute; left: 0px; top: ${(that.size.height-that.size.content_head_height)*that.size.content_body_Dividline_width}px; width: ${that.size.width}px; height: ${that.size.content_body_Dividline_height}px;`,
            },
            {
              id:'content_centre_div',
              style:`overflow: hidden; width: ${that.size.width-that.size.content_body_right_width-that.size.content_body_left_width}px; height: ${(that.size.height-that.size.content_head_height)*that.size.content_body_Dividline_width}px; position: absolute; left: ${that.size.content_body_left_width}px; top: 0px;`,
              children:[
                {
                  id:'content_centre_navigationbar_div',//导航栏
                  style:`overflow: hidden; width: ${that.size.width-that.size.content_body_right_width-that.size.content_body_left_width}px; height: ${that.size.content_centre_navigationbar_height}px; cursor: default; position: absolute; left: 0px; top: 0px;`,
                },
                {
                  id:'content_centre_canvas_div',
                  style:`position: absolute; left: 0px; top: ${that.size.content_centre_navigationbar_height}px; width: ${that.size.width-that.size.content_body_right_width-that.size.content_body_left_width}px; height: ${(that.size.height-that.size.content_head_height)*that.size.content_body_Dividline_width-that.size.content_centre_navigationbar_height}px;`,
                },
              ]
            },
            {
              id:'content_body_canvasTimeLine_div',
              style:`overflow: hidden; width: ${that.size.width}px; height: ${(that.size.height-that.size.content_head_height)*(1-that.size.content_body_Dividline_width)}px; position: absolute; left: 0px; top:${(that.size.height-that.size.content_head_height)*that.size.content_body_Dividline_width}px;`,
              children:[
                {
                  id:'content_body_canvasTimeLine_left_div',
                  style:`position: absolute;overflow: hidden;left: 0px;top: 0px;width: ${that.size.content_body_left_width}px;height: ${(that.size.height-that.size.content_head_height)*(1-that.size.content_body_Dividline_width)}px;`,
                  children:[
                    {
                      id:'content_body_canvasTimeLine_left_head_div',
                      style:`position: absolute; overflow: hidden; width: ${that.size.content_body_left_width}px; height: ${that.size.content_body_canvasTimeLine_left_head_width}px; left: 0px; top: 0px; cursor: default;`,
                    },
                    {
                      id:'content_body_canvasTimeLine_left_body_div',
                      style:`position: absolute; overflow: hidden; left: 0px; top: ${that.size.content_body_canvasTimeLine_left_head_width}px; width: ${that.size.content_body_left_width}px; height: ${(that.size.height-that.size.content_head_height)*(1-that.size.content_body_Dividline_width)-that.size.content_body_canvasTimeLine_left_head_width}px;`,
                    }
                  ]
                },
                {
                  id:'content_body_canvasTimeLine_right_div',
                  style:`position: absolute; overflow: hidden; left: ${that.size.content_body_left_width}px; top: 0px; width: ${that.size.width-that.size.content_body_left_width}px; height: ${(that.size.height-that.size.content_head_height)*(1-that.size.content_body_Dividline_width)}px;`,
                  children:[
                    {
                      id:'content_body_canvasTimeLine_right_body_div',
                      style:`position: absolute; overflow: hidden; width: ${that.size.width-that.size.content_body_left_width}px; height: ${(that.size.height-that.size.content_head_height)*(1-that.size.content_body_Dividline_width)-that.size.content_body_canvasTimeLine_left_head_width-that.size.content_body_canvasTimeLine_right_foot_div}px; left: 0px; top: ${that.size.content_body_canvasTimeLine_left_head_width}px; cursor: default;`,
                    },
                    {
                      id:'content_body_canvasTimeLine_right_head_div',
                      style:`position: absolute; overflow: hidden; width: ${that.size.width-that.size.content_body_left_width}px; height: ${(that.size.height-that.size.content_head_height)*(1-that.size.content_body_Dividline_width)}px; left: 0px; top: 0px;`,
                    },
                    {
                      id:'content_body_canvasTimeLine_right_foot_div',
                      style:`position: absolute; overflow: hidden; width: ${that.size.width-that.size.content_body_left_width}px; height: ${that.size.content_body_canvasTimeLine_right_foot_div}px; left: 0px; top: ${(that.size.height-that.size.content_head_height)*(1-that.size.content_body_Dividline_width)-that.size.content_body_canvasTimeLine_right_foot_div}px; cursor: default;`,
                    }
                  ]
                }
              ]
            },
            {
              id:'content_body_right_div',
              style:`overflow: hidden; width: ${that.size.width-that.size.content_body_right_width}px; height: ${(that.size.height-that.size.content_head_height)*that.size.content_body_Dividline_width}px; position: absolute; left: ${that.size.width-that.size.content_body_right_width}px; top: 0px;`,
            },
            {
              id:'content_body_left_div',
              style:`overflow: hidden; width: ${that.size.content_body_left_width}px; height: ${(that.size.height-that.size.content_head_height)*that.size.content_body_Dividline_width}px; position: absolute; left: 0px; top: 0px;`,
              children:[
                {
                  id:'content_body_left_tools_div',
                  style:`overflow: hidden; width: ${that.size.content_body_left_tools_width}px; height:${(that.size.height-that.size.content_head_height)*that.size.content_body_Dividline_width}px; cursor: default; position: absolute; left: 0px; top: 0px;`,
                },
                {
                  id:'content_body_left_attr_div',
                  style:`overflow: hidden; width: ${that.size.content_body_left_width-that.size.content_body_left_tools_width}px; height:${(that.size.height-that.size.content_head_height)*that.size.content_body_Dividline_width}px; position: absolute; left: ${that.size.content_body_left_tools_width}px; top: 0px;`,
                }
              ]
            }
          ]
        }
      ]
    }
    let forFuc=(node)=>{
      let dom = document.getElementById(node.id);
      dom.setAttribute('style',node.style);

      //dom.setAttribute('style',node.style+`background: rgb(${that.random(0,255)},${that.random(0,255)},${that.random(0,255)});`);
      if(node.children&&node.children.length){
        for(let i=0;i<node.children.length;i++){
          forFuc(node.children[i]);
        }
      }
    };
    forFuc(that.attr);
  }
}