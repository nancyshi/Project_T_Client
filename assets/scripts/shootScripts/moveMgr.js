// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        moveSpeed: 1,
        plane: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.node.on("touchstart",this.onTouchStart,this)
        this.node.on("touchmove",this.onTouchMove,this)
        this.node.on("touchcancel",this.onTouchCancel,this)
        this.node.on("touchend",this.onTouchEnd,this)
    },
    onDestroy() {
        this.node.off("touchstart",this.onTouchStart,this)
        this.node.off("touchmove",this.onTouchMove,this)
        this.node.off("touchcancel",this.onTouchCancel,this)
        this.node.off("touchend",this.onTouchEnd,this)
    },

    onTouchStart(event){},
    onTouchMove(event){
        var delta = event.getDelta()
        this.plane.x = this.plane.x + delta.x
        this.plane.y = this.plane.y + delta.y
    },
    onTouchCancel(event){},
    onTouchEnd(event) {},

    // update (dt) {},
});
