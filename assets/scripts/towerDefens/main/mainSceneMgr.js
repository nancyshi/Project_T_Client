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
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},

    gotoLevelScene(sceneName,completeCallBack = null) {
        var self = this
        cc.director.preloadScene(sceneName,null,function(err,res){
            var scene = res.scene
            var resNode = scene.getChildByName("Canvas").getChildByName("resNode")
            var resMgr = resNode.getComponent("resMgr")
            var gameMgr = scene.getChildByName("Canvas").getChildByName("gameMgrNode").getComponent("gameMgr")

            gameMgr.refreshPlanId = require("levelConfig")[sceneName].refreshPlanId
            gameMgr.maxHp = require("levelConfig")[sceneName].maxHp
            resMgr.completeCallBack = completeCallBack
            resMgr.loadNeededReses()
        })
    },

    onClick() {
        //for now will forced goto level_01
        var sceneName = "level_01"
        var callBack = function(gameMgr) {
            cc.director.loadScene(sceneName)
        }
        this.gotoLevelScene(sceneName,callBack)
    }

});
