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
        circleBgPrefab: cc.Prefab,
        buttonsConfig:null,
        buttonPrefab: cc.Prefab,
        isUIShowed: false,
        uiNode: cc.Node,

        testButtonsConfig: null
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.nonde.on("touchstart",this.onTouchStart,this)
        this.node.on("touchmove",this.onTouchMove,this)
        this.node.on("touchend",this.onTouchEnd,this)
        
    },

    start () {

    },
    showUI(){},
    removeUI(){},

    onTouchStart(event){},
    onTouchMove(event){},
    onTouchEnd(event){
        if (this.isUIShowed == false){
            this.showUI()
        }
    },
    // update (dt) {},

    onDestroy(){
        this.node.off("touchstart",this.onTouchStart,this)
        this.node.off("touchmove",this.onTouchMove,this)
        this.node.off("touchend",this.onTouchEnd,this)
    }
});
