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
        buildTowerUIPrefab: cc.Prefab,
        currentUI: null

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on("touchend",this.onTouchEnd,this)
    },

    start () {

    },

    showUI() {
        var ui = cc.instantiate(this.buildTowerUIPrefab)
        ui.scale = 0
        ui.x = 0
        ui.y = 0
        this.currentUI = ui        
        this.node.addChild(ui)
        cc.tween(ui)
            .to(0.2,{scale:1})
            .start()
    },
    removeUI(){
        if (this.currentUI == null) {
            return
        }
        else {
            var self = this
            cc.tween(this.currentUI)
                .to(0.2,{scale: 0})
                .call(function(){
                    self.currentUI.removeFromParent()
                    self.currentUI = null
                })
                .start()
        }
    },

    onTouchEnd(event){
        if (this.currentUI == null) {
            this.showUI()
        }
        event.stopPropagation()
    },

    onDestroy(){
        this.node.off("touchend",this.onTouchEnd,this)
    },

    
    // update (dt) {},

});
